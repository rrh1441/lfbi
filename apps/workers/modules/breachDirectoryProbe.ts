/**
 * Breach Directory Probe Module
 * 
 * Queries BreachDirectory and LeakCheck APIs for comprehensive domain breach intelligence
 * to identify compromised accounts and breach exposure statistics.
 */

import axios from 'axios';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';

// Configuration constants
const BREACH_DIRECTORY_API_BASE = 'https://BreachDirectory.com/api_usage';
const LEAKCHECK_API_BASE = 'https://leakcheck.io/api/v2';
const API_TIMEOUT_MS = 30_000;
const MAX_SAMPLE_USERNAMES = 100;
const LEAKCHECK_RATE_LIMIT_MS = 350; // 3 requests per second = ~333ms + buffer

// Enhanced logging
const log = (...args: unknown[]) => rootLog('[breachDirectoryProbe]', ...args);

interface BreachDirectoryResponse {
  breached_total?: number;
  sample_usernames?: string[];
  error?: string;
  message?: string;
}

interface LeakCheckResponse {
  success: boolean;
  found: number;
  quota: number;
  result: Array<{
    email: string;
    source: {
      name: string;
      breach_date: string;
      unverified: number;
      passwordless: number;
      compilation: number;
    };
    first_name?: string;
    last_name?: string;
    username?: string;
    fields: string[];
  }>;
  error?: string;
}

interface BreachProbeSummary {
  domain: string;
  breached_total: number;
  sample_usernames: string[];
  high_risk_assessment: boolean;
  breach_directory_success: boolean;
  leakcheck_total: number;
  leakcheck_sources: string[];
  leakcheck_success: boolean;
  combined_total: number;
  leakcheck_results: Array<{
    email: string | null;
    username: string | null;
    source: {
      name: string;
      breach_date: string | null;
      unverified: number;
      passwordless: number;
      compilation: number;
    };
    has_password: boolean;
    has_cookies: boolean;
    has_autofill: boolean;
    has_browser_data: boolean;
    field_count: number;
    first_name: string | null;
    last_name: string | null;
  }>;
}

/**
 * Query Breach Directory API for domain breach data
 */
async function queryBreachDirectory(domain: string, apiKey: string): Promise<BreachDirectoryResponse> {
  try {
    log(`Querying Breach Directory for domain: ${domain}`);
    
    const response = await axios.get(BREACH_DIRECTORY_API_BASE, {
      params: {
        method: 'domain',
        key: apiKey,
        query: domain
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
    } else if (response.status === 403) {
      // Enhanced logging for 403 Forbidden responses
      const responseData = response.data || {};
      const errorMessage = responseData.error || responseData.message || 'Access forbidden';
      log(`Breach Directory API returned 403 Forbidden for ${domain}: ${errorMessage}`);
      log(`Response data: ${JSON.stringify(responseData)}`);
      log(`This may indicate an invalid API key, insufficient permissions, or rate limiting`);
      return { error: `API access forbidden (403): ${errorMessage}` };
    } else {
      // Enhanced generic error handling with response data
      const responseData = response.data || {};
      const errorMessage = responseData.error || responseData.message || `HTTP ${response.status}`;
      log(`Breach Directory API returned status ${response.status} for ${domain}: ${errorMessage}`);
      log(`Response data: ${JSON.stringify(responseData)}`);
      return { error: `API returned status ${response.status}: ${errorMessage}` };
    }
    
  } catch (error: any) {
    if (error.response?.status === 429) {
      const responseData = error.response?.data || {};
      const errorMessage = responseData.error || responseData.message || 'Rate limit exceeded';
      log(`Rate limit exceeded on Breach Directory API: ${errorMessage}`);
      log(`Response data: ${JSON.stringify(responseData)}`);
      throw new Error('Rate limit exceeded on Breach Directory API');
    } else if (error.response?.status === 401) {
      const responseData = error.response?.data || {};
      const errorMessage = responseData.error || responseData.message || 'Unauthorized';
      log(`Invalid API key for Breach Directory: ${errorMessage}`);
      log(`Response data: ${JSON.stringify(responseData)}`);
      throw new Error('Invalid API key for Breach Directory');
    } else if (error.response?.status === 403) {
      // Additional 403 handling in catch block for network-level errors
      const responseData = error.response?.data || {};
      const errorMessage = responseData.error || responseData.message || 'Access forbidden';
      log(`Breach Directory API access forbidden (403): ${errorMessage}`);
      log(`Response data: ${JSON.stringify(responseData)}`);
      log(`Check API key validity and permissions`);
      throw new Error(`API access forbidden: ${errorMessage}`);
    } else if (error.response) {
      // Generic response error with enhanced logging
      const responseData = error.response.data || {};
      const errorMessage = responseData.error || responseData.message || error.message;
      log(`Breach Directory API error (${error.response.status}): ${errorMessage}`);
      log(`Response data: ${JSON.stringify(responseData)}`);
      throw new Error(`Breach Directory API error: ${errorMessage}`);
    }
    
    // Network or other non-response errors
    log(`Breach Directory network/connection error: ${error.message}`);
    throw new Error(`Breach Directory API error: ${error.message}`);
  }
}

/**
 * Query LeakCheck API for domain breach data
 */
async function queryLeakCheck(domain: string, apiKey: string): Promise<LeakCheckResponse> {
  try {
    log(`Querying LeakCheck for domain: ${domain}`);
    
    const response = await axios.get(`${LEAKCHECK_API_BASE}/query/${domain}`, {
      headers: {
        'Accept': 'application/json',
        'X-API-Key': apiKey
      },
      params: {
        type: 'domain',
        limit: 1000 // Max allowed
      },
      timeout: API_TIMEOUT_MS,
      validateStatus: (status) => status < 500 // Accept 4xx as valid responses
    });
    
    if (response.status === 200) {
      const data = response.data as LeakCheckResponse;
      log(`LeakCheck response for ${domain}: ${data.found || 0} breached accounts, quota remaining: ${data.quota}`);
      return data;
    } else if (response.status === 422) {
      log(`LeakCheck could not determine search type for domain: ${domain}`);
      return { success: false, found: 0, quota: 0, result: [], error: 'Could not determine search type' };
    } else if (response.status === 403) {
      const responseData = response.data || {};
      const errorMessage = responseData.error || 'Limit reached or plan required';
      log(`LeakCheck API returned 403 Forbidden for ${domain}: ${errorMessage}`);
      return { success: false, found: 0, quota: 0, result: [], error: `API access forbidden (403): ${errorMessage}` };
    } else if (response.status === 429) {
      log(`LeakCheck API rate limit exceeded for ${domain}`);
      return { success: false, found: 0, quota: 0, result: [], error: 'Rate limit exceeded' };
    } else {
      const responseData = response.data || {};
      const errorMessage = responseData.error || `HTTP ${response.status}`;
      log(`LeakCheck API returned status ${response.status} for ${domain}: ${errorMessage}`);
      return { success: false, found: 0, quota: 0, result: [], error: `API returned status ${response.status}: ${errorMessage}` };
    }
    
  } catch (error: any) {
    if (error.response?.status === 429) {
      log(`Rate limit exceeded on LeakCheck API`);
      return { success: false, found: 0, quota: 0, result: [], error: 'Rate limit exceeded' };
    } else if (error.response?.status === 401) {
      log(`Invalid API key for LeakCheck`);
      return { success: false, found: 0, quota: 0, result: [], error: 'Invalid API key' };
    } else if (error.response?.status === 403) {
      log(`LeakCheck API access forbidden (403) - check plan and quota`);
      return { success: false, found: 0, quota: 0, result: [], error: 'Access forbidden - check plan and quota' };
    } else if (error.response) {
      const responseData = error.response.data || {};
      const errorMessage = responseData.error || error.message;
      log(`LeakCheck API error (${error.response.status}): ${errorMessage}`);
      return { success: false, found: 0, quota: 0, result: [], error: `API error: ${errorMessage}` };
    }
    
    log(`LeakCheck network/connection error: ${error.message}`);
    return { success: false, found: 0, quota: 0, result: [], error: `Network error: ${error.message}` };
  }
}

/**
 * Analyze combined breach data from both sources
 */
function analyzeCombinedBreach(
  breachDirectoryData: BreachDirectoryResponse,
  leakCheckData: LeakCheckResponse
): BreachProbeSummary {
  const breached_total = breachDirectoryData.breached_total || 0;
  const sample_usernames = (breachDirectoryData.sample_usernames || []).slice(0, MAX_SAMPLE_USERNAMES);
  
  // LeakCheck data processing
  const leakcheck_total = leakCheckData.found || 0;
  const leakcheck_sources = leakCheckData.result
    .map(entry => entry.source.name)
    .filter((name, index, array) => array.indexOf(name) === index) // Remove duplicates
    .slice(0, 20); // Limit to first 20 unique sources
  
  // Process LeakCheck results for enhanced analysis (NO sensitive data stored)
  const leakCheckResults = leakCheckData.result
    .map(entry => ({
      email: entry.email || null,
      username: entry.username || (entry.email ? entry.email.split('@')[0] : null),
      source: {
        name: entry.source?.name || 'Unknown',
        breach_date: entry.source?.breach_date || null,
        unverified: entry.source?.unverified || 0,
        passwordless: entry.source?.passwordless || 0,
        compilation: entry.source?.compilation || 0
      },
      // Only store field existence flags, NOT actual values
      has_password: entry.fields?.includes('password') || false,
      has_cookies: entry.fields?.includes('cookies') || entry.fields?.includes('cookie') || false,
      has_autofill: entry.fields?.includes('autofill') || entry.fields?.includes('autofill_data') || false,
      has_browser_data: entry.fields?.includes('browser_data') || entry.fields?.includes('browser') || false,
      field_count: entry.fields?.length || 0,
      first_name: entry.first_name || null,
      last_name: entry.last_name || null
    }))
    .slice(0, 100); // Limit to 100 for performance

  // Add usernames from LeakCheck to sample usernames for backward compatibility
  const leakCheckUsernames = leakCheckResults
    .map(entry => entry.username)
    .filter(username => username !== null)
    .slice(0, 50);
  
  const combinedUsernames = [...sample_usernames, ...leakCheckUsernames]
    .filter((name, index, array) => array.indexOf(name) === index) // Remove duplicates
    .slice(0, MAX_SAMPLE_USERNAMES);
  
  const combined_total = breached_total + leakcheck_total;
  
  // High risk assessment based on breach count and username patterns
  let high_risk_assessment = false;
  
  // Risk factors
  if (combined_total >= 100) {
    high_risk_assessment = true;
  }
  
  // Check for administrative/privileged account patterns
  const privilegedPatterns = [
    'admin', 'administrator', 'root', 'sa', 'sysadmin',
    'ceo', 'cto', 'cfo', 'founder', 'owner',
    'security', 'infosec', 'it', 'tech'
  ];
  
  const hasPrivilegedAccounts = combinedUsernames.some(username => 
    privilegedPatterns.some(pattern => 
      username.toLowerCase().includes(pattern)
    )
  );
  
  if (hasPrivilegedAccounts && combined_total >= 10) {
    high_risk_assessment = true;
  }
  
  // Check for recent breaches in LeakCheck data
  const recentBreaches = leakCheckData.result.filter(entry => {
    if (!entry.source?.breach_date) return false;
    const breachYear = parseInt(entry.source.breach_date.split('-')[0]);
    return !isNaN(breachYear) && breachYear >= 2020; // Breaches from 2020 onwards
  });
  
  if (recentBreaches.length >= 10) {
    high_risk_assessment = true;
  }
  
  return {
    domain: '', // Will be set by caller
    breached_total,
    sample_usernames: combinedUsernames,
    high_risk_assessment,
    breach_directory_success: !breachDirectoryData.error,
    leakcheck_total,
    leakcheck_sources,
    leakcheck_success: leakCheckData.success,
    combined_total,
    leakcheck_results: leakCheckResults // Add full results with security flags
  };
}

/**
 * Generate breach intelligence summary
 */
function generateBreachSummary(results: BreachProbeSummary[]): {
  total_breached_accounts: number;
  leakcheck_total_accounts: number;
  combined_total_accounts: number;
  domains_with_breaches: number;
  high_risk_domains: number;
  privileged_accounts_found: boolean;
  unique_breach_sources: string[];
} {
  const summary = {
    total_breached_accounts: 0,
    leakcheck_total_accounts: 0,
    combined_total_accounts: 0,
    domains_with_breaches: 0,
    high_risk_domains: 0,
    privileged_accounts_found: false,
    unique_breach_sources: [] as string[]
  };
  
  const allSources = new Set<string>();
  
  results.forEach(result => {
    if ((result.breach_directory_success && result.breached_total > 0) || 
        (result.leakcheck_success && result.leakcheck_total > 0)) {
      
      summary.total_breached_accounts += result.breached_total;
      summary.leakcheck_total_accounts += result.leakcheck_total;
      summary.combined_total_accounts += result.combined_total;
      summary.domains_with_breaches += 1;
      
      if (result.high_risk_assessment) {
        summary.high_risk_domains += 1;
      }
      
      // Add unique breach sources from LeakCheck
      result.leakcheck_sources.forEach(source => allSources.add(source));
      
      // Check for privileged account indicators
      const privilegedPatterns = ['admin', 'ceo', 'root', 'sysadmin'];
      if (result.sample_usernames.some(username => 
        privilegedPatterns.some(pattern => username.toLowerCase().includes(pattern))
      )) {
        summary.privileged_accounts_found = true;
      }
    }
  });
  
  summary.unique_breach_sources = Array.from(allSources);
  
  return summary;
}

/**
 * Main breach directory probe function
 */
export async function runBreachDirectoryProbe(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  const startTime = Date.now();
  
  log(`Starting comprehensive breach probe for domain="${domain}" (BreachDirectory + LeakCheck)`);
  
  // Check for API keys
  const breachDirectoryApiKey = process.env.BREACH_DIRECTORY_API_KEY;
  const leakCheckApiKey = process.env.LEAKCHECK_API_KEY;
  
  if (!breachDirectoryApiKey && !leakCheckApiKey) {
    log('No breach API keys found - need BREACH_DIRECTORY_API_KEY or LEAKCHECK_API_KEY environment variable');
    return 0;
  }
  
  try {
    let breachData: BreachDirectoryResponse = { breached_total: 0, sample_usernames: [] };
    let leakCheckData: LeakCheckResponse = { success: false, found: 0, quota: 0, result: [] };
    
    // Query BreachDirectory if API key available
    if (breachDirectoryApiKey) {
      try {
        breachData = await queryBreachDirectory(domain, breachDirectoryApiKey);
        if (breachData.error) {
          log(`BreachDirectory query failed: ${breachData.error}`);
          breachData = { breached_total: 0, sample_usernames: [], error: breachData.error };
        }
      } catch (error) {
        log(`BreachDirectory query error: ${(error as Error).message}`);
        breachData = { breached_total: 0, sample_usernames: [], error: (error as Error).message };
      }
    } else {
      log('BreachDirectory API key not found, skipping BreachDirectory query');
    }
    
    // Query LeakCheck if API key available  
    if (leakCheckApiKey) {
      try {
        // Add rate limiting delay if we queried BreachDirectory first
        if (breachDirectoryApiKey) {
          await new Promise(resolve => setTimeout(resolve, LEAKCHECK_RATE_LIMIT_MS));
        }
        
        leakCheckData = await queryLeakCheck(domain, leakCheckApiKey);
        if (leakCheckData.error) {
          log(`LeakCheck query failed: ${leakCheckData.error}`);
        }
      } catch (error) {
        log(`LeakCheck query error: ${(error as Error).message}`);
        leakCheckData = { success: false, found: 0, quota: 0, result: [], error: (error as Error).message };
      }
    } else {
      log('LeakCheck API key not found, skipping LeakCheck query');
    }
    
    // Analyze combined results
    const analysis = analyzeCombinedBreach(breachData, leakCheckData);
    analysis.domain = domain;
    
    // Generate summary for reporting
    const summary = generateBreachSummary([analysis]);
    
    log(`Combined breach analysis complete: BD=${analysis.breached_total}, LC=${analysis.leakcheck_total}, Total=${analysis.combined_total}`);
    
    // Determine artifact severity based on highest risk finding that will be created
    let severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO' = 'INFO';
    if (analysis.leakcheck_results && analysis.leakcheck_results.length > 0) {
      const hasInfostealer = analysis.leakcheck_results.some(cred => 
        cred.source?.name?.toLowerCase().includes('stealer') ||
        cred.source?.name?.toLowerCase().includes('redline') ||
        cred.source?.name?.toLowerCase().includes('raccoon') ||
        cred.source?.name?.toLowerCase().includes('vidar'));
      const hasCookies = analysis.leakcheck_results.some(cred => 
        cred.has_password && (cred.has_cookies || cred.has_autofill || cred.has_browser_data));
      const hasPasswords = analysis.leakcheck_results.some(cred => cred.has_password);
      
      if (hasInfostealer || hasCookies) {
        severity = 'CRITICAL';
      } else if (hasPasswords) {
        severity = 'MEDIUM';
      } else {
        severity = 'INFO';
      }
    } else if (analysis.combined_total >= 100) {
      severity = 'HIGH';
    } else if (analysis.combined_total > 0) {
      severity = 'MEDIUM';
    }
    
    const artifactId = await insertArtifact({
      type: 'breach_directory_summary',
      val_text: `Breach probe: ${analysis.combined_total} total breached accounts (BD: ${analysis.breached_total}, LC: ${analysis.leakcheck_total}) for ${domain}`,
      severity,
      meta: {
        scan_id: scanId,
        scan_module: 'breachDirectoryProbe',
        domain,
        breach_analysis: analysis,
        summary,
        breach_sources: analysis.leakcheck_sources,
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    let findingsCount = 0;
    
    // Analyze credentials by risk level for one comprehensive finding
    if (analysis.leakcheck_results && analysis.leakcheck_results.length > 0) {
      const credentialAnalysis = {
        critical_infostealer: 0,
        critical_cookies: 0,
        medium_password: 0,
        infostealer_users: [] as string[],
        cookie_users: [] as string[],
        password_users: [] as string[],
        infostealer_sources: new Set<string>(),
        corporate_emails: 0,
        personal_emails: 0
      };
      
      analysis.leakcheck_results.forEach(credential => {
        // Skip username-only entries (no finding value)
        if (!credential.has_password && !credential.has_cookies && !credential.has_autofill && 
            !credential.has_browser_data && !credential.source?.name?.toLowerCase().includes('stealer')) {
          return; // Skip email-only entries
        }
        
        // Calculate risk level with new severity logic
        const isInfostealer = credential.source?.name && (
          credential.source.name.toLowerCase().includes('stealer') ||
          credential.source.name.toLowerCase().includes('redline') ||
          credential.source.name.toLowerCase().includes('raccoon') ||
          credential.source.name.toLowerCase().includes('vidar')
        );
        
        if (isInfostealer) {
          // CRITICAL: Infostealer sources
          credentialAnalysis.critical_infostealer++;
          if (credential.source?.name) {
            credentialAnalysis.infostealer_sources.add(credential.source.name);
          }
          if (credential.username) {
            credentialAnalysis.infostealer_users.push(credential.username);
          }
        } else if (credential.has_password && (credential.has_cookies || credential.has_autofill || credential.has_browser_data)) {
          // CRITICAL: Password + session/browser data
          credentialAnalysis.critical_cookies++;
          if (credential.username) {
            credentialAnalysis.cookie_users.push(credential.username);
          }
        } else if (credential.has_password) {
          // MEDIUM: Password only
          credentialAnalysis.medium_password++;
          if (credential.username) {
            credentialAnalysis.password_users.push(credential.username);
          }
        }
        
        // Track email types
        if (credential.email && credential.email.includes('@' + domain)) {
          credentialAnalysis.corporate_emails++;
        } else {
          credentialAnalysis.personal_emails++;
        }
      });
      
      // Also track username-only entries for INFO findings
      const usernameOnlyUsers: string[] = [];
      analysis.leakcheck_results.forEach(credential => {
        // Include username-only entries (email-only with no additional data)
        if (!credential.has_password && !credential.has_cookies && !credential.has_autofill && 
            !credential.has_browser_data && !credential.source?.name?.toLowerCase().includes('stealer')) {
          if (credential.username) {
            usernameOnlyUsers.push(credential.username);
          }
        }
      });
      
      // Create separate findings for each breach category
      
      // 1. CRITICAL: Infostealer victims 
      if (credentialAnalysis.critical_infostealer > 0) {
        await insertFinding(
          artifactId,
          'INFOSTEALER_BREACH',
          `${credentialAnalysis.critical_infostealer} employees compromised by infostealer malware`,
          `Usernames: ${credentialAnalysis.infostealer_users.join(', ')} | Sources: ${Array.from(credentialAnalysis.infostealer_sources).join(', ')} | Risk: Session hijacking, account takeover`
        );
        findingsCount++;
      }
      
      // 2. CRITICAL: Username + password + session/cookie data
      if (credentialAnalysis.critical_cookies > 0) {
        await insertFinding(
          artifactId,
          'PASSWORD_COOKIE_BREACH', 
          `${credentialAnalysis.critical_cookies} employees with passwords and session data exposed`,
          `Usernames: ${credentialAnalysis.cookie_users.join(', ')} | Risk: Immediate account takeover with saved sessions`
        );
        findingsCount++;
      }
      
      // 3. MEDIUM: Username + password only
      if (credentialAnalysis.medium_password > 0) {
        await insertFinding(
          artifactId,
          'PASSWORD_BREACH',
          `${credentialAnalysis.medium_password} employees with password exposure`,
          `Usernames: ${credentialAnalysis.password_users.join(', ')} | Risk: Credential stuffing, brute force attacks`
        );
        findingsCount++;
      }
      
      // 4. INFO: Username only (email addresses without additional data)
      if (usernameOnlyUsers.length > 0) {
        await insertFinding(
          artifactId,
          'EMAIL_EXPOSURE',
          `${usernameOnlyUsers.length} employee email addresses found in breach databases`,
          `Usernames: ${usernameOnlyUsers.join(', ')} | Risk: Phishing, social engineering targeting`
        );
        findingsCount++;
      }
    }
    
    const duration = Date.now() - startTime;
    log(`Breach probe completed: ${findingsCount} findings in ${duration}ms`);
    
    return findingsCount;
    
  } catch (error) {
    const errorMsg = (error as Error).message;
    log(`Breach probe failed: ${errorMsg}`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `Breach probe failed: ${errorMsg}`,
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