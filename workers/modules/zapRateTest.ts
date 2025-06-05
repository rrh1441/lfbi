import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
import axios from 'axios';

const exec = promisify(execFile);

export async function runZapRateTest(job: { domain: string; scanId?: string }): Promise<number> {
  log('[zapRateTest] Starting rate limiting tests for', job.domain);
  
  let findingsCount = 0;
  
  try {
    // Test common endpoints for rate limiting
    const testEndpoints = [
      '/api/login',
      '/api/register', 
      '/api/auth',
      '/api/token',
      '/login',
      '/signup',
      '/forgot-password',
      '/api/forgot-password',
      '/api/users',
      '/api/data'
    ];
    
    const baseUrls = [
      `https://${job.domain}`,
      `http://${job.domain}`
    ];
    
    for (const baseUrl of baseUrls) {
      for (const endpoint of testEndpoints) {
        try {
          const url = `${baseUrl}${endpoint}`;
          log(`[zapRateTest] Testing rate limits on ${url}`);
          
          // Perform rapid requests to test rate limiting
          const rapidRequests = [];
          for (let i = 0; i < 20; i++) {
            rapidRequests.push(
              axios.post(url, 
                { test: 'rate_limit_check', attempt: i },
                { 
                  timeout: 5000,
                  validateStatus: () => true, // Accept all status codes
                  headers: {
                    'User-Agent': 'DealBrief-Scanner/1.0',
                    'Content-Type': 'application/json'
                  }
                }
              ).catch(error => ({ error: true, message: error.message }))
            );
          }
          
          const responses = await Promise.all(rapidRequests);
          
          // Analyze responses for rate limiting
          let successCount = 0;
          let blockedCount = 0;
          const statusCodes = new Set<number>();
          
          responses.forEach(response => {
            if ('error' in response) return;
            
            statusCodes.add(response.status);
            
            if (response.status === 429 || response.status === 503) {
              blockedCount++;
            } else if (response.status < 500) {
              successCount++;
            }
          });
          
          // If most requests succeeded, rate limiting might be weak
          if (successCount > 15) {
            const artifactId = await insertArtifact({
              type: 'rate_limit_issue',
              val_text: `Weak rate limiting detected on ${endpoint}`,
              severity: 'MEDIUM',
              src_url: url,
              meta: {
                scan_id: job.scanId,
                scan_module: 'zapRateTest',
                endpoint,
                successful_requests: successCount,
                total_requests: 20,
                status_codes: Array.from(statusCodes)
              }
            });
            
            await insertFinding(
              artifactId,
              'RATE_LIMITING',
              'Implement proper rate limiting to prevent abuse. Use techniques like token bucket, sliding window, or per-IP limits.',
              `Endpoint ${endpoint} allows ${successCount}/20 rapid requests without proper rate limiting`
            );
            
            findingsCount++;
            log(`[zapRateTest] Weak rate limiting found on ${endpoint}: ${successCount}/20 requests succeeded`);
          }
          
          // Rate limit between endpoint tests
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (error) {
          // Endpoint not accessible, continue
        }
      }
    }
    
    // Test for CAPTCHA bypass on common forms
    try {
      const formEndpoints = ['/login', '/register', '/contact'];
      
      for (const endpoint of formEndpoints) {
        const url = `https://${job.domain}${endpoint}`;
        
        try {
          // Test if forms accept automated submissions without CAPTCHA
          const formTest = await axios.post(url, {
            email: 'test@example.com',
            password: 'test123',
            username: 'testuser'
          }, {
            timeout: 10000,
            validateStatus: () => true,
            headers: {
              'User-Agent': 'DealBrief-Scanner/1.0',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          
          // If form accepts submission without error, might lack CAPTCHA
          if (formTest.status === 200 && !formTest.data.includes('captcha')) {
            const artifactId = await insertArtifact({
              type: 'captcha_missing',
              val_text: `Form lacks CAPTCHA protection: ${endpoint}`,
              severity: 'LOW',
              src_url: url,
              meta: {
                scan_id: job.scanId,
                scan_module: 'zapRateTest',
                endpoint,
                response_status: formTest.status
              }
            });
            
            await insertFinding(
              artifactId,
              'FORM_SECURITY',
              'Implement CAPTCHA or similar bot protection on forms to prevent automated abuse.',
              `Form at ${endpoint} may lack CAPTCHA protection against automated submissions`
            );
            
            findingsCount++;
          }
        } catch (formError) {
          // Form not accessible or protected, which is good
        }
      }
    } catch (error) {
      log('[zapRateTest] CAPTCHA testing failed:', (error as Error).message);
    }
    
    log('[zapRateTest] Rate limiting tests completed, found', findingsCount, 'issues');
    return findingsCount;
    
  } catch (error) {
    log('[zapRateTest] Error during rate limit testing:', (error as Error).message);
    return 0;
  }
} 