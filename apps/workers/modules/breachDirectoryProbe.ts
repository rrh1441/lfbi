/**
 * Breach Directory Probe Module
 * 
 * Queries breachdirectory.org API for domain breach intelligence
 * to identify compromised accounts and breach exposure statistics.
 */

import axios from 'axios';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';

// Configuration constants
const BREACH_DIRECTORY_API_BASE = 'https://breachdirectory.org/api_domain_search';
const API_TIMEOUT_MS = 30_000;
const MAX_SAMPLE_USERNAMES = 100;

// Enhanced logging
const log = (...args: unknown[]) => rootLog('[breachDirectoryProbe]', ...args);

interface BreachDirectoryResponse {
  breached_total?: number;
  sample_usernames?: string[];
  error?: string;
  message?: string;
}

interface BreachProbeSummary {
  domain: string;
  breached_total: number;
  sample_usernames: string[];
  high_risk_assessment: boolean;
  api_success: boolean;
}

/**
 * Query Breach Directory API for domain breach data
 */
async function queryBreachDirectory(domain: string, apiKey: string): Promise<BreachDirectoryResponse> {
  try {
    log(`Querying Breach Directory for domain: ${domain}`);
    
    const response = await axios.get(BREACH_DIRECTORY_API_BASE, {
      params: {
        domain: domain,
        plain: 'true',
        key: apiKey
      },
      timeout: API_TIMEOUT_MS,
      validateStatus: (status) => status < 500 // Accept 4xx as valid responses
    });
    
    if (response.status === 200) {
      const data = response.data as BreachDirectoryResponse;
      log(`Breach Directory response for ${domain}: ${data.breached_total || 0} breached accounts`);
      return data;
    } else if (response.status === 404) {
      log(`No breach data found for domain: ${domain}`);
      return { breached_total: 0, sample_usernames: [] };
    } else {
      log(`Breach Directory API returned status ${response.status} for ${domain}`);
      return { error: `API returned status ${response.status}` };
    }
    
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded on Breach Directory API');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key for Breach Directory');
    }
    
    throw new Error(`Breach Directory API error: ${error.message}`);
  }
}

/**
 * Analyze breach data and determine risk level
 */
function analyzeBreach(data: BreachDirectoryResponse): BreachProbeSummary {
  const breached_total = data.breached_total || 0;
  const sample_usernames = (data.sample_usernames || []).slice(0, MAX_SAMPLE_USERNAMES);
  
  // High risk assessment based on breach count and username patterns
  let high_risk_assessment = false;
  
  // Risk factors
  if (breached_total >= 100) {
    high_risk_assessment = true;
  }
  
  // Check for administrative/privileged account patterns
  const privilegedPatterns = [
    'admin', 'administrator', 'root', 'sa', 'sysadmin',
    'ceo', 'cto', 'cfo', 'founder', 'owner',
    'security', 'infosec', 'it', 'tech'
  ];
  
  const hasPrivilegedAccounts = sample_usernames.some(username => 
    privilegedPatterns.some(pattern => 
      username.toLowerCase().includes(pattern)
    )
  );
  
  if (hasPrivilegedAccounts && breached_total >= 10) {
    high_risk_assessment = true;
  }
  
  return {
    domain: '', // Will be set by caller
    breached_total,
    sample_usernames,
    high_risk_assessment,
    api_success: !data.error
  };
}

/**
 * Generate breach intelligence summary
 */
function generateBreachSummary(results: BreachProbeSummary[]): {
  total_breached_accounts: number;
  domains_with_breaches: number;
  high_risk_domains: number;
  privileged_accounts_found: boolean;
} {
  const summary = {
    total_breached_accounts: 0,
    domains_with_breaches: 0,
    high_risk_domains: 0,
    privileged_accounts_found: false
  };
  
  results.forEach(result => {
    if (result.api_success && result.breached_total > 0) {
      summary.total_breached_accounts += result.breached_total;
      summary.domains_with_breaches += 1;
      
      if (result.high_risk_assessment) {
        summary.high_risk_domains += 1;
      }
      
      // Check for privileged account indicators
      const privilegedPatterns = ['admin', 'ceo', 'root', 'sysadmin'];
      if (result.sample_usernames.some(username => 
        privilegedPatterns.some(pattern => username.toLowerCase().includes(pattern))
      )) {
        summary.privileged_accounts_found = true;
      }
    }
  });
  
  return summary;
}

/**
 * Main breach directory probe function
 */
export async function runBreachDirectoryProbe(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  const startTime = Date.now();
  
  log(`Starting Breach Directory probe for domain="${domain}"`);
  
  // Check for API key
  const apiKey = process.env.BREACH_DIRECTORY_API_KEY || process.env.BREACHDIRECTORY_KEY;
  if (!apiKey) {
    log('Breach Directory API key not found, skipping module');
    return 0;
  }
  
  try {
    // Query breach directory for primary domain
    const breachData = await queryBreachDirectory(domain, apiKey);
    
    if (breachData.error) {
      log(`Breach Directory query failed: ${breachData.error}`);
      return 0;
    }
    
    // Analyze results
    const analysis = analyzeBreach(breachData);
    analysis.domain = domain;
    
    // Generate summary for reporting
    const summary = generateBreachSummary([analysis]);
    
    log(`Breach Directory analysis complete: ${analysis.breached_total} breached accounts found`);
    
    // Create summary artifact
    const severity = analysis.breached_total >= 100 ? 'HIGH' : 
                    analysis.breached_total > 0 ? 'MEDIUM' : 'INFO';
    
    const artifactId = await insertArtifact({
      type: 'breach_directory_summary',
      val_text: `Breach Directory scan: ${analysis.breached_total} breached accounts found for ${domain}`,
      severity,
      meta: {
        scan_id: scanId,
        scan_module: 'breachDirectoryProbe',
        domain,
        breach_analysis: analysis,
        summary,
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    let findingsCount = 0;
    
    // Create findings based on breach count and risk assessment
    if (analysis.breached_total >= 100) {
      const description = `Domain ${domain} has ${analysis.breached_total} breached accounts in public databases`;
      const evidence = `Sample usernames: ${analysis.sample_usernames.slice(0, 10).join(', ')}${analysis.sample_usernames.length > 10 ? '...' : ''}`;
      
      await insertFinding(
        artifactId,
        'DOMAIN_BREACH_COUNT',
        description,
        evidence
      );
      
      findingsCount++;
    } else if (analysis.breached_total > 0 && analysis.high_risk_assessment) {
      const description = `Domain ${domain} has ${analysis.breached_total} breached accounts including privileged users`;
      const evidence = `Sample usernames: ${analysis.sample_usernames.slice(0, 10).join(', ')}`;
      
      await insertFinding(
        artifactId,
        'DOMAIN_BREACH_COUNT',
        description,
        evidence
      );
      
      findingsCount++;
    }
    
    const duration = Date.now() - startTime;
    log(`Breach Directory probe completed: ${findingsCount} findings in ${duration}ms`);
    
    return findingsCount;
    
  } catch (error) {
    const errorMsg = (error as Error).message;
    log(`Breach Directory probe failed: ${errorMsg}`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `Breach Directory probe failed: ${errorMsg}`,
      severity: 'MEDIUM',
      meta: {
        scan_id: scanId,
        scan_module: 'breachDirectoryProbe',
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    return 0;
  }
}