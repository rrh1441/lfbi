import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
import axios from 'axios';

const exec = promisify(execFile);

interface DiscoveredEndpoint {
  url: string;
  path: string;
  method: string;
  confidence: 'high' | 'medium' | 'low';
  source: 'passive' | 'crawl' | 'directory_enum';
  technology?: string;
  parameters?: string[];
  statusCode?: number;
}

export async function runZapRateTest(job: { domain: string; scanId?: string }): Promise<number> {
  log('[zapRateTest] Starting rate limiting tests for', job.domain);
  
  let findingsCount = 0;
  
  try {
    // Get discovered endpoints from the database
    let discoveredEndpoints: DiscoveredEndpoint[] = [];
    
    if (job.scanId) {
      const endpointResult = await pool.query(`
        SELECT meta FROM artifacts 
        WHERE type = 'discovered_endpoints' 
        AND meta->>'scan_id' = $1
        ORDER BY created_at DESC 
        LIMIT 1
      `, [job.scanId]);
      
      if (endpointResult.rows.length > 0) {
        discoveredEndpoints = endpointResult.rows[0].meta.endpoints || [];
        log(`[zapRateTest] Found ${discoveredEndpoints.length} discovered endpoints to test`);
      }
    }
    
    // If no discovered endpoints, use minimal fallback
    if (discoveredEndpoints.length === 0) {
      log('[zapRateTest] No discovered endpoints found, using minimal fallback');
      const baseUrls = [`https://${job.domain}`, `http://${job.domain}`];
      
      // Only test the main pages and common WordPress endpoints if detected
      const fallbackEndpoints = ['/'];
      
      for (const baseUrl of baseUrls) {
        for (const endpoint of fallbackEndpoints) {
          discoveredEndpoints.push({
            url: `${baseUrl}${endpoint}`,
            path: endpoint,
            method: 'GET',
            confidence: 'low',
            source: 'directory_enum'
          });
        }
      }
    }
    
    // Filter endpoints suitable for rate limiting tests
    const testableEndpoints = discoveredEndpoints.filter(endpoint => {
      // Focus on form endpoints and API endpoints
      return (
        endpoint.method === 'POST' || 
        (endpoint.parameters && endpoint.parameters.length > 0) ||
        endpoint.path.includes('login') ||
        endpoint.path.includes('register') ||
        endpoint.path.includes('forgot') ||
        endpoint.path.includes('api') ||
        endpoint.path.includes('auth')
      );
    });
    
    if (testableEndpoints.length === 0) {
      log('[zapRateTest] No suitable endpoints found for rate limiting tests');
      return 0;
    }
    
    log(`[zapRateTest] Testing ${testableEndpoints.length} suitable endpoints for rate limiting`);
    
    for (const endpoint of testableEndpoints) {
      try {
        log(`[zapRateTest] Testing rate limits on ${endpoint.url}`);
        
        // Determine test data based on endpoint parameters
        let testData: any = { test: 'rate_limit_check' };
        
        if (endpoint.parameters) {
          endpoint.parameters.forEach(param => {
            if (param.toLowerCase().includes('email')) {
              testData[param] = 'test@example.com';
            } else if (param.toLowerCase().includes('password')) {
              testData[param] = 'test123';
            } else if (param.toLowerCase().includes('username') || param.toLowerCase().includes('user')) {
              testData[param] = 'testuser';
            } else {
              testData[param] = 'test_value';
            }
          });
        }
        
        // Perform rapid requests to test rate limiting
        const rapidRequests = [];
        const requestCount = endpoint.confidence === 'high' ? 25 : 15; // More tests for high-confidence endpoints
        
        for (let i = 0; i < requestCount; i++) {
          const requestPromise = endpoint.method === 'POST' 
            ? axios.post(endpoint.url, testData, {
                timeout: 5000,
                validateStatus: () => true,
                headers: {
                  'User-Agent': 'DealBrief-Scanner/1.0',
                  'Content-Type': 'application/json'
                }
              })
            : axios.get(endpoint.url, {
                timeout: 5000,
                validateStatus: () => true,
                headers: {
                  'User-Agent': 'DealBrief-Scanner/1.0'
                }
              });
          
          rapidRequests.push(
            requestPromise.catch(error => ({ error: true, message: error.message }))
          );
        }
        
        const responses = await Promise.all(rapidRequests);
        
        // Analyze responses for rate limiting
        let successCount = 0;
        let blockedCount = 0;
        let errorCount = 0;
        const statusCodes = new Set<number>();
        
        responses.forEach(response => {
          if ('error' in response) {
            errorCount++;
            return;
          }
          
          statusCodes.add(response.status);
          
          if (response.status === 429 || response.status === 503) {
            blockedCount++;
          } else if (response.status < 500 && response.status !== 404) {
            successCount++;
          }
        });
        
        // Only report if endpoint actually exists (not all 404s)
        const validResponses = responses.length - errorCount;
        const notFoundResponses = responses.filter(r => !('error' in r) && r.status === 404).length;
        
        if (validResponses > 0 && notFoundResponses < validResponses * 0.8) {
          // Determine severity based on success rate and endpoint confidence
          const successRate = successCount / validResponses;
          let severity: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
          
          if (successRate > 0.8 && endpoint.confidence === 'high') {
            severity = 'MEDIUM';
          } else if (successRate > 0.9 && endpoint.method === 'POST') {
            severity = 'MEDIUM';
          }
          
          if (successCount > requestCount * 0.75) {
            const artifactId = await insertArtifact({
              type: 'rate_limit_issue',
              val_text: `Weak rate limiting detected on ${endpoint.path}`,
              severity,
              src_url: endpoint.url,
              meta: {
                scan_id: job.scanId,
                scan_module: 'zapRateTest',
                endpoint: endpoint.path,
                endpoint_method: endpoint.method,
                endpoint_confidence: endpoint.confidence,
                successful_requests: successCount,
                total_requests: requestCount,
                blocked_requests: blockedCount,
                status_codes: Array.from(statusCodes),
                success_rate: successRate
              }
            });
            
            await insertFinding(
              artifactId,
              'RATE_LIMITING',
              'Implement proper rate limiting to prevent abuse. Use techniques like token bucket, sliding window, or per-IP limits.',
              `Endpoint ${endpoint.path} (${endpoint.method}) allows ${successCount}/${requestCount} rapid requests without proper rate limiting`
            );
            
            findingsCount++;
            log(`[zapRateTest] Weak rate limiting found on ${endpoint.path}: ${successCount}/${requestCount} requests succeeded`);
          }
        }
        
        // Rate limit between endpoint tests
        await new Promise(resolve => setTimeout(resolve, 3000));
        
      } catch (error) {
        log(`[zapRateTest] Error testing ${endpoint.path}:`, (error as Error).message);
      }
    }
    
    log('[zapRateTest] Rate limiting tests completed, found', findingsCount, 'issues');
    return findingsCount;
    
  } catch (error) {
    log('[zapRateTest] Error during rate limit testing:', (error as Error).message);
    return 0;
  }
} 