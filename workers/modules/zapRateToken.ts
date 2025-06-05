import axios from 'axios';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

async function testTokenRateLimit(domain: string) {
  const testUrl = `https://${domain}/api/login`;
  const results = [];
  
  // Test with different token formats
  const tokenTests = [
    { header: 'Authorization', value: 'Bearer invalid_token_12345' },
    { header: 'Authorization', value: 'Basic dGVzdDp0ZXN0' }, // test:test
    { header: 'X-API-Key', value: 'test_api_key_12345' },
    { header: 'X-Auth-Token', value: 'token_12345' },
    { header: 'X-Token', value: 'abc123' },
    { header: 'Authorization', value: 'Token abc123' },
    { header: 'X-Access-Token', value: 'access_token_123' }
  ];

  for (const test of tokenTests) {
    try {
      // Make multiple requests with the same token to test rate limiting
      const responses = [];
      for (let i = 0; i < 5; i++) {
        const response = await axios.post(testUrl, 
          { username: 'test', password: 'test' },
          { 
            headers: { [test.header]: test.value },
            timeout: 10000,
            validateStatus: () => true
          }
        );
        responses.push(response.status);
        
        // Short delay between requests
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Check if rate limiting is applied
      const rateLimited = responses.some(status => status === 429);
      const hasConsistentResponse = new Set(responses).size === 1;
      
      results.push({
        token_type: test.header,
        responses,
        rate_limited: rateLimited,
        consistent: hasConsistentResponse,
        bypassed: !rateLimited && responses[0] !== 401 && responses[0] !== 403
      });
      
      // Delay between different token types
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      results.push({
        token_type: test.header,
        responses: ['error'],
        rate_limited: false,
        consistent: false,
        bypassed: false
      });
    }
  }
  
  return results;
}

async function testTokenRotation(domain: string) {
  const testUrl = `https://${domain}/api/login`;
  const tokens = [
    'Bearer token_1',
    'Bearer token_2', 
    'Bearer token_3',
    'Bearer token_4',
    'Bearer token_5'
  ];
  
  const results = [];
  
  // Test if rotating tokens bypasses rate limits
  for (let i = 0; i < 10; i++) {
    const token = tokens[i % tokens.length];
    try {
      const response = await axios.post(testUrl,
        { username: 'test', password: 'test' },
        { 
          headers: { 'Authorization': token },
          timeout: 10000,
          validateStatus: () => true
        }
      );
      
      results.push({
        request_num: i + 1,
        token_used: token,
        status: response.status,
        rate_limited: response.status === 429
      });
      
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      results.push({
        request_num: i + 1,
        token_used: token,
        status: 'error',
        rate_limited: false
      });
    }
  }
  
  return results;
}

export async function runZapRateToken(job: { domain: string }) {
  log('[zap-rate-token] Starting token rate limit bypass test for', job.domain);
  
  try {
    // Test token-based rate limiting
    const tokenResults = await testTokenRateLimit(job.domain);
    const rotationResults = await testTokenRotation(job.domain);
    
    const bypassedTokens = tokenResults.filter(r => r.bypassed);
    const rotationBypassed = !rotationResults.some(r => r.rate_limited);
    
    if (bypassedTokens.length > 0 || rotationBypassed) {
      await insertArtifact({
        type: 'vuln',
        val_text: 'Rate limit bypass via token manipulation',
        severity: 'MEDIUM',
        src_url: `https://${job.domain}`,
        meta: {
          tool: 'zap-rate-token',
          bypassed_tokens: bypassedTokens.map(t => t.token_type),
          rotation_bypassed: rotationBypassed,
          token_test_results: tokenResults,
          rotation_test_results: rotationResults
        }
      });
    } else {
      await insertArtifact({
        type: 'rate_limit_token',
        val_text: `Token rate limiting properly configured for ${job.domain}`,
        severity: 'INFO',
        meta: {
          tool: 'zap-rate-token',
          token_test_results: tokenResults,
          rotation_test_results: rotationResults
        }
      });
    }
    
    log('[zap-rate-token] Completed token rate limit test for', job.domain);
  } catch (err) {
    log('[zap-rate-token] Error during token rate limit test:', (err as Error).message);
    await insertArtifact({
      type: 'rate_limit_token',
      val_text: `Token rate limit test failed for ${job.domain}`,
      severity: 'INFO',
      meta: { error: (err as Error).message }
    });
  }
} 