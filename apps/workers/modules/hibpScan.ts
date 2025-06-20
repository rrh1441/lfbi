/**
 * Have I Been Pwned (HIBP) Breach Detection Module
 * 
 * Standalone module that queries HIBP API directly for breach detection
 * using domain and email artifacts discovered during scans.
 */

import axios from 'axios';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';

// Configuration constants
const HIBP_API_BASE = 'https://haveibeenpwned.com/api/v3';
const RATE_LIMIT_RPM = 10; // 10 requests per minute
const REQUEST_DELAY_MS = (60 * 1000) / RATE_LIMIT_RPM; // 6 seconds between requests
const API_TIMEOUT_MS = 15_000;
const MAX_EMAILS_PER_DOMAIN = 50; // Limit to prevent excessive API usage

// Enhanced logging
const log = (...args: unknown[]) => rootLog('[hibpScan]', ...args);

interface BreachData {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  LogoPath: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
  IsMalware: boolean;
}

interface PasteData {
  Source: string;
  Id: string;
  Title: string;
  Date: string;
  EmailCount: number;
}

interface HIBPResult {
  email: string;
  breaches: BreachData[];
  pastes: PasteData[];
  error?: string;
}

interface HIBPScanSummary {
  totalEmails: number;
  emailsChecked: number;
  totalBreaches: number;
  totalPastes: number;
  highRiskBreaches: number;
  recentBreaches: number;
  verifiedBreaches: number;
  apiErrors: number;
}

/**
 * Get domain and email artifacts from current scan
 */
async function getEmailTargets(scanId: string, primaryDomain: string): Promise<string[]> {
  const emails = new Set<string>();
  
  try {
    // Get email artifacts from SpiderFoot and other modules
    const { rows: emailRows } = await pool.query(
      `SELECT val_text FROM artifacts 
       WHERE type='email' AND meta->>'scan_id'=$1`,
      [scanId]
    );
    
    emailRows.forEach(row => {
      const email = row.val_text.trim().toLowerCase();
      if (isValidEmail(email)) {
        emails.add(email);
      }
    });
    
    // Get domain artifacts and generate common email patterns
    const { rows: domainRows } = await pool.query(
      `SELECT val_text FROM artifacts 
       WHERE type IN ('hostname', 'subdomain') AND meta->>'scan_id'=$1`,
      [scanId]
    );
    
    const domains = new Set([primaryDomain]);
    domainRows.forEach(row => {
      const domain = row.val_text.trim().toLowerCase();
      if (isValidDomain(domain)) {
        domains.add(domain);
      }
    });
    
    // Generate common email patterns for discovered domains
    const commonPrefixes = [
      'admin', 'administrator', 'info', 'contact', 'support', 'help',
      'sales', 'marketing', 'team', 'office', 'mail', 'webmaster',
      'noreply', 'no-reply', 'ceo', 'founder', 'hello', 'security'
    ];
    
    domains.forEach(domain => {
      commonPrefixes.forEach(prefix => {
        emails.add(`${prefix}@${domain}`);
      });
    });
    
    log(`Generated ${emails.size} email targets from ${domains.size} domains`);
    return Array.from(emails).slice(0, MAX_EMAILS_PER_DOMAIN);
    
  } catch (error) {
    log(`Error getting email targets: ${(error as Error).message}`);
    return [];
  }
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate domain format
 */
function isValidDomain(domain: string): boolean {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

/**
 * Query HIBP API for breaches associated with an email
 */
async function checkEmailBreaches(email: string, apiKey: string): Promise<BreachData[]> {
  try {
    const response = await axios.get(
      `${HIBP_API_BASE}/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      {
        headers: {
          'hibp-api-key': apiKey,
          'User-Agent': 'DealBrief-Scanner/1.0'
        },
        timeout: API_TIMEOUT_MS,
        validateStatus: (status) => status < 500 // Accept 404 as valid (no breaches)
      }
    );
    
    if (response.status === 404) {
      return []; // No breaches found
    }
    
    return response.data || [];
    
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key');
    } else if (error.response?.status === 404) {
      return []; // No breaches found
    }
    
    throw new Error(`HIBP API error: ${error.message}`);
  }
}

/**
 * Query HIBP API for pastes associated with an email
 */
async function checkEmailPastes(email: string, apiKey: string): Promise<PasteData[]> {
  try {
    const response = await axios.get(
      `${HIBP_API_BASE}/pasteaccount/${encodeURIComponent(email)}`,
      {
        headers: {
          'hibp-api-key': apiKey,
          'User-Agent': 'DealBrief-Scanner/1.0'
        },
        timeout: API_TIMEOUT_MS,
        validateStatus: (status) => status < 500 // Accept 404 as valid (no pastes)
      }
    );
    
    if (response.status === 404) {
      return []; // No pastes found
    }
    
    return response.data || [];
    
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key');
    } else if (error.response?.status === 404) {
      return []; // No pastes found
    }
    
    throw new Error(`HIBP API error: ${error.message}`);
  }
}

/**
 * Check a single email against HIBP with rate limiting
 */
async function checkSingleEmail(email: string, apiKey: string): Promise<HIBPResult> {
  const result: HIBPResult = {
    email,
    breaches: [],
    pastes: []
  };
  
  try {
    log(`Checking email: ${email}`);
    
    // Check breaches
    result.breaches = await checkEmailBreaches(email, apiKey);
    
    // Rate limiting between API calls
    await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS));
    
    // Check pastes
    result.pastes = await checkEmailPastes(email, apiKey);
    
    log(`Email ${email}: ${result.breaches.length} breaches, ${result.pastes.length} pastes`);
    
  } catch (error) {
    result.error = (error as Error).message;
    log(`Error checking email ${email}: ${result.error}`);
  }
  
  return result;
}

/**
 * Analyze breach severity and impact
 */
function analyzeBreachSeverity(breach: BreachData): {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  riskFactors: string[];
} {
  const riskFactors: string[] = [];
  let severity: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  
  // High-risk data classes
  const highRiskData = ['Passwords', 'Social security numbers', 'Credit cards', 
                       'Bank account numbers', 'Government IDs', 'Passport numbers'];
  const mediumRiskData = ['Email addresses', 'Phone numbers', 'Physical addresses', 
                         'Dates of birth', 'Names'];
  
  // Check data classes
  const dataClasses = breach.DataClasses || [];
  const hasHighRiskData = dataClasses.some(dc => 
    highRiskData.some(hrd => dc.toLowerCase().includes(hrd.toLowerCase())));
  const hasMediumRiskData = dataClasses.some(dc => 
    mediumRiskData.some(mrd => dc.toLowerCase().includes(mrd.toLowerCase())));
  
  if (hasHighRiskData) {
    severity = 'HIGH';
    riskFactors.push('Contains sensitive data (passwords, SSN, financial)');
  } else if (hasMediumRiskData) {
    severity = 'MEDIUM';
    riskFactors.push('Contains personal information');
  }
  
  // Large breach impact
  if (breach.PwnCount > 10000000) { // 10M+ accounts
    severity = 'HIGH';
    riskFactors.push('Large-scale breach (10M+ accounts affected)');
  } else if (breach.PwnCount > 1000000) { // 1M+ accounts
    if (severity === 'LOW') severity = 'MEDIUM';
    riskFactors.push('Significant breach size (1M+ accounts)');
  }
  
  // Recent breach
  const breachDate = new Date(breach.BreachDate);
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  
  if (breachDate > twoYearsAgo) {
    if (severity === 'LOW') severity = 'MEDIUM';
    riskFactors.push('Recent breach (within 2 years)');
  }
  
  // Verification status
  if (!breach.IsVerified) {
    riskFactors.push('Unverified breach data');
  }
  
  if (breach.IsSensitive) {
    severity = 'HIGH';
    riskFactors.push('Marked as sensitive by HIBP');
  }
  
  return { severity, riskFactors };
}

/**
 * Generate scan summary
 */
function generateScanSummary(results: HIBPResult[]): HIBPScanSummary {
  const summary: HIBPScanSummary = {
    totalEmails: results.length,
    emailsChecked: results.filter(r => !r.error).length,
    totalBreaches: 0,
    totalPastes: 0,
    highRiskBreaches: 0,
    recentBreaches: 0,
    verifiedBreaches: 0,
    apiErrors: results.filter(r => r.error).length
  };
  
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  results.forEach(result => {
    if (!result.error) {
      summary.totalBreaches += result.breaches.length;
      summary.totalPastes += result.pastes.length;
      
      result.breaches.forEach(breach => {
        const { severity } = analyzeBreachSeverity(breach);
        if (severity === 'HIGH') summary.highRiskBreaches++;
        if (breach.IsVerified) summary.verifiedBreaches++;
        if (new Date(breach.BreachDate) > oneYearAgo) summary.recentBreaches++;
      });
    }
  });
  
  return summary;
}

/**
 * Main HIBP scan function
 */
export async function runHibpScan(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  const startTime = Date.now();
  
  log(`Starting HIBP scan for domain="${domain}"`);
  
  // Check for API key
  const apiKey = process.env.HIBP_API_KEY || 'd34daf76812d4c6dac79ceefbad9f7b2';
  if (!apiKey) {
    log('HIBP API key not found in environment variables');
    await insertArtifact({
      type: 'scan_error',
      val_text: 'HIBP scan failed: API key not configured',
      severity: 'MEDIUM',
      meta: { scan_id: scanId, scan_module: 'hibpScan' }
    });
    return 0;
  }
  
  try {
    // Get email targets
    const emailTargets = await getEmailTargets(scanId, domain);
    
    if (emailTargets.length === 0) {
      log('No email targets found for HIBP scan');
      return 0;
    }
    
    log(`Checking ${emailTargets.length} email addresses against HIBP`);
    
    // Check each email with rate limiting
    const results: HIBPResult[] = [];
    for (let i = 0; i < emailTargets.length; i++) {
      const email = emailTargets[i];
      const result = await checkSingleEmail(email, apiKey);
      results.push(result);
      
      // Rate limiting between emails (except for last one)
      if (i < emailTargets.length - 1) {
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS));
      }
    }
    
    // Generate summary
    const summary = generateScanSummary(results);
    log(`HIBP scan complete: ${summary.totalBreaches} breaches, ${summary.totalPastes} pastes found`);
    
    // Create summary artifact
    const severity = summary.highRiskBreaches > 0 ? 'HIGH' : 
                    summary.totalBreaches > 0 ? 'MEDIUM' : 'INFO';
    
    const artifactId = await insertArtifact({
      type: 'hibp_summary',
      val_text: `HIBP scan: ${summary.totalBreaches} breaches and ${summary.totalPastes} pastes found across ${summary.emailsChecked} emails`,
      severity,
      meta: {
        scan_id: scanId,
        scan_module: 'hibpScan',
        domain,
        summary,
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    // Create findings for significant breaches
    let findingsCount = 0;
    
    for (const result of results) {
      if (result.error || (result.breaches.length === 0 && result.pastes.length === 0)) {
        continue;
      }
      
      // Create findings for high-impact breaches
      for (const breach of result.breaches) {
        const { severity: breachSeverity, riskFactors } = analyzeBreachSeverity(breach);
        
        if (breachSeverity === 'HIGH' || breach.PwnCount > 100000) {
          const description = `Email ${result.email} found in ${breach.Title} breach (${breach.PwnCount.toLocaleString()} accounts affected)`;
          const evidence = `Breach Date: ${breach.BreachDate} | Data Classes: ${breach.DataClasses.join(', ')} | Risk Factors: ${riskFactors.join(', ')}`;
          
          await insertFinding(
            artifactId,
            'DATA_BREACH_EXPOSURE',
            description,
            evidence
          );
          
          findingsCount++;
        }
      }
      
      // Create findings for paste exposures
      if (result.pastes.length > 0) {
        const recentPastes = result.pastes.filter(paste => {
          const pasteDate = new Date(paste.Date);
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          return pasteDate > oneYearAgo;
        });
        
        if (recentPastes.length > 0) {
          const description = `Email ${result.email} found in ${recentPastes.length} recent paste(s)`;
          const evidence = `Sources: ${recentPastes.map(p => `${p.Source} (${p.Date})`).join(', ')}`;
          
          await insertFinding(
            artifactId,
            'PASTE_EXPOSURE',
            description,
            evidence
          );
          
          findingsCount++;
        }
      }
    }
    
    const duration = Date.now() - startTime;
    log(`HIBP scan completed: ${findingsCount} findings in ${duration}ms`);
    
    return findingsCount;
    
  } catch (error) {
    const errorMsg = (error as Error).message;
    log(`HIBP scan failed: ${errorMsg}`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `HIBP scan failed: ${errorMsg}`,
      severity: 'MEDIUM',
      meta: {
        scan_id: scanId,
        scan_module: 'hibpScan',
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    return 0;
  }
}