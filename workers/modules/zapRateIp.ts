import axios from 'axios';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

async function testRateLimitBypass(domain: string) {
  const testUrl = `https://${domain}/api/login`;
  const headers = [
    { 'X-Forwarded-For': '127.0.0.1' },
    { 'X-Real-IP': '127.0.0.1' },
    { 'X-Originating-IP': '127.0.0.1' },
    { 'X-Remote-IP': '127.0.0.1' },
    { 'X-Client-IP': '127.0.0.1' },
    { 'X-Cluster-Client-IP': '127.0.0.1' },
    { 'X-Forwarded': '127.0.0.1' },
    { 'Forwarded-For': '127.0.0.1' }
  ];

  const results = [];
  
  for (const header of headers) {
    try {
      const response = await axios.post(testUrl, 
        { username: 'test', password: 'test' },
        { 
          headers: header,
          timeout: 10000,
          validateStatus: () => true // Don't throw on 4xx/5xx
        }
      );
      
      results.push({
        header: Object.keys(header)[0],
        status: response.status,
        bypassed: response.status !== 429
      });
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      results.push({
        header: Object.keys(header)[0],
        status: 'error',
        bypassed: false
      });
    }
  }
  
  return results;
}

export async function runZapRateIp(job: { domain: string; scanId: string }) {
  log('[zap-rate-ip] Starting IP rate limit bypass test for', job.domain);
  
  try {
    // Test common rate limit bypass headers
    const results = await testRateLimitBypass(job.domain);
    
    const bypassedHeaders = results.filter(r => r.bypassed);
    
    if (bypassedHeaders.length > 0) {
      await insertArtifact({
        type: 'vuln',
        val_text: 'Rate limit bypass via IP spoofing headers',
        severity: 'MEDIUM',
        src_url: `https://${job.domain}`,
        meta: {
          scan_id: job.scanId,
          tool: 'zap-rate-ip',
          bypassed_headers: bypassedHeaders.map(h => h.header),
          test_results: results
        }
      });
    } else {
      await insertArtifact({
        type: 'rate_limit_ip',
        val_text: `IP rate limiting properly configured for ${job.domain}`,
        severity: 'INFO',
        meta: {
          scan_id: job.scanId,
          tool: 'zap-rate-ip',
          test_results: results
        }
      });
    }
    
    log('[zap-rate-ip] Completed IP rate limit test for', job.domain);
  } catch (err) {
    log('[zap-rate-ip] Error during IP rate limit test:', (err as Error).message);
    await insertArtifact({
      type: 'rate_limit_ip',
      val_text: `IP rate limit test failed for ${job.domain}`,
      severity: 'INFO',
      meta: { 
        scan_id: job.scanId,
        error: (err as Error).message 
      }
    });
  }
} 