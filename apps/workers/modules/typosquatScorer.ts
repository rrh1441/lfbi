/**
 * Typosquat Scorer Module
 * 
 * Uses dnstwist to generate typosquatting domains and WhoisXML API to analyze
 * registration dates and ASN data to identify active typosquatting threats.
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import axios from 'axios';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';

const execFileAsync = promisify(execFile);

// Configuration constants
const DNSTWIST_TIMEOUT_MS = 180_000; // 3 minutes
const WHOIS_TIMEOUT_MS = 30_000;
const MAX_DOMAINS_TO_CHECK = 100;
const ACTIVE_SQUAT_DAYS_THRESHOLD = 90;
const REDIS_CACHE_TTL = 86400; // 24 hours

// Enhanced logging
const log = (...args: unknown[]) => rootLog('[typosquatScorer]', ...args);

interface DnsTwistResult {
  domain: string;
  'domain-name': string;
  'dns-a'?: string[];
  'dns-aaaa'?: string[];
  'dns-mx'?: string[];
  'dns-ns'?: string[];
  'geoip-country'?: string;
  'geoip-country-code'?: string;
  'whois-registrar'?: string;
  'whois-created'?: string;
  fuzzer: string;
  'similarity-score'?: number;
}

interface WhoisData {
  domain: string;
  createdDate?: string;
  registrar?: string;
  registrant?: {
    organization?: string;
    country?: string;
  };
  administrativeContact?: {
    organization?: string;
    country?: string;
  };
  technicalContact?: {
    organization?: string;
    country?: string;
  };
  nameServers?: string[];
  status?: string[];
}

interface ASNInfo {
  ip: string;
  asn: number;
  organization: string;
  country: string;
}

interface TyposquatAnalysis {
  domain: string;
  fuzzer: string;
  similarity_score: number;
  created_date?: string;
  days_since_creation?: number;
  registrar?: string;
  target_asn?: number;
  domain_asn?: number;
  asn_match: boolean;
  is_active_squat: boolean;
  risk_score: number;
  evidence: string[];
}

interface TyposquatSummary {
  total_domains_checked: number;
  active_squats_found: number;
  suspicious_domains: number;
  avg_risk_score: number;
  top_risk_domains: string[];
}

/**
 * Run dnstwist to generate typosquatting domains
 */
async function runDnsTwist(domain: string): Promise<DnsTwistResult[]> {
  try {
    log(`Running dnstwist for domain: ${domain}`);
    
    const { stdout, stderr } = await execFileAsync('dnstwist', [
      '--format', 'json',
      '--registered',
      '--threads', '10',
      domain
    ], {
      timeout: DNSTWIST_TIMEOUT_MS,
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer
    });
    
    if (stderr) {
      log(`dnstwist stderr: ${stderr.slice(0, 500)}`);
    }
    
    const results = JSON.parse(stdout) as DnsTwistResult[];
    log(`dnstwist found ${results.length} potential typosquat domains`);
    
    return results.slice(0, MAX_DOMAINS_TO_CHECK);
    
  } catch (error) {
    log(`dnstwist execution failed: ${(error as Error).message}`);
    return [];
  }
}

/**
 * Get ASN information for an IP address
 */
async function getASNInfo(ip: string): Promise<ASNInfo | null> {
  try {
    // Use a simple IP-to-ASN service
    const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 10000
    });
    
    return {
      ip,
      asn: response.data.asn || 0,
      organization: response.data.org || '',
      country: response.data.country || ''
    };
    
  } catch (error) {
    log(`Failed to get ASN for IP ${ip}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Get target domain ASN for comparison
 */
async function getTargetASN(domain: string): Promise<number | null> {
  try {
    // Resolve domain to IP
    const { stdout } = await execFileAsync('dig', [
      '+short', domain, 'A'
    ], { timeout: 10000 });
    
    const ips = stdout.trim().split('\n').filter(line => 
      /^\d+\.\d+\.\d+\.\d+$/.test(line.trim())
    );
    
    if (ips.length === 0) {
      return null;
    }
    
    const asnInfo = await getASNInfo(ips[0]);
    return asnInfo?.asn || null;
    
  } catch (error) {
    log(`Failed to get target ASN for ${domain}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Query WhoisXML API for domain information
 */
async function getWhoisData(domain: string, apiKey: string): Promise<WhoisData | null> {
  try {
    const response = await axios.get('https://www.whoisxmlapi.com/whoisserver/WhoisService', {
      params: {
        apiKey,
        domainName: domain,
        outputFormat: 'JSON'
      },
      timeout: WHOIS_TIMEOUT_MS
    });
    
    const whoisRecord = response.data.WhoisRecord;
    if (!whoisRecord) {
      return null;
    }
    
    return {
      domain,
      createdDate: whoisRecord.createdDate,
      registrar: whoisRecord.registrarName,
      registrant: whoisRecord.registrant,
      administrativeContact: whoisRecord.administrativeContact,
      technicalContact: whoisRecord.technicalContact,
      nameServers: whoisRecord.nameServers?.hostNames || [],
      status: whoisRecord.status || []
    };
    
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error('WhoisXML API rate limit exceeded');
    }
    log(`WhoisXML API error for ${domain}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Calculate days since domain creation
 */
function calculateDaysSinceCreation(createdDate: string): number {
  try {
    const created = new Date(createdDate);
    const now = new Date();
    const diffTime = now.getTime() - created.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    return Infinity;
  }
}

/**
 * Analyze typosquat domain for active squatting indicators
 */
async function analyzeTyposquat(
  result: DnsTwistResult, 
  targetASN: number | null, 
  apiKey: string
): Promise<TyposquatAnalysis> {
  const domain = result['domain-name'];
  const analysis: TyposquatAnalysis = {
    domain,
    fuzzer: result.fuzzer,
    similarity_score: result['similarity-score'] || 0,
    asn_match: true,
    is_active_squat: false,
    risk_score: 0,
    evidence: []
  };
  
  try {
    // Get WHOIS data
    const whoisData = await getWhoisData(domain, apiKey);
    
    if (whoisData?.createdDate) {
      analysis.created_date = whoisData.createdDate;
      analysis.days_since_creation = calculateDaysSinceCreation(whoisData.createdDate);
      analysis.registrar = whoisData.registrar;
      
      // Check if recently created
      if (analysis.days_since_creation <= ACTIVE_SQUAT_DAYS_THRESHOLD) {
        analysis.evidence.push(`Recently registered (${analysis.days_since_creation} days ago)`);
      }
    }
    
    // Get ASN information if domain has A records
    if (result['dns-a'] && result['dns-a'].length > 0 && targetASN) {
      const domainASN = await getASNInfo(result['dns-a'][0]);
      if (domainASN) {
        analysis.domain_asn = domainASN.asn;
        analysis.target_asn = targetASN;
        analysis.asn_match = domainASN.asn === targetASN;
        
        if (!analysis.asn_match) {
          analysis.evidence.push(`Different ASN (${domainASN.asn} vs ${targetASN})`);
        }
      }
    }
    
    // Determine if this is an active squat
    const isRecentlyCreated = (analysis.days_since_creation || Infinity) <= ACTIVE_SQUAT_DAYS_THRESHOLD;
    const isDifferentASN = !analysis.asn_match && analysis.target_asn && analysis.domain_asn;
    
    analysis.is_active_squat = isRecentlyCreated && isDifferentASN;
    
    // Calculate risk score (0-100)
    let riskScore = 0;
    
    // Similarity score contribution (0-40 points)
    riskScore += (analysis.similarity_score / 100) * 40;
    
    // Recent registration (0-30 points)
    if (analysis.days_since_creation) {
      const recencyScore = Math.max(0, (ACTIVE_SQUAT_DAYS_THRESHOLD - analysis.days_since_creation) / ACTIVE_SQUAT_DAYS_THRESHOLD);
      riskScore += recencyScore * 30;
    }
    
    // ASN difference (0-20 points)
    if (isDifferentASN) {
      riskScore += 20;
    }
    
    // Active content (0-10 points)
    if (result['dns-a'] || result['dns-mx']) {
      riskScore += 10;
      analysis.evidence.push('Has active DNS records');
    }
    
    analysis.risk_score = Math.round(riskScore);
    
    if (analysis.is_active_squat) {
      analysis.evidence.push('ACTIVE TYPOSQUAT DETECTED');
    }
    
  } catch (error) {
    log(`Error analyzing ${domain}: ${(error as Error).message}`);
  }
  
  return analysis;
}

/**
 * Main typosquat scorer function
 */
export async function runTyposquatScorer(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  const startTime = Date.now();
  
  log(`Starting typosquat analysis for domain="${domain}"`);
  
  // Check for WhoisXML API key
  const apiKey = process.env.WHOISXML_API_KEY || process.env.WHOISXML_KEY;
  if (!apiKey) {
    log('WhoisXML API key not found, skipping typosquat analysis');
    return 0;
  }
  
  try {
    // Run dnstwist to find potential typosquats
    const dnstwistResults = await runDnsTwist(domain);
    
    if (dnstwistResults.length === 0) {
      log('No typosquat domains found by dnstwist');
      return 0;
    }
    
    // Get target domain ASN for comparison
    const targetASN = await getTargetASN(domain);
    log(`Target domain ASN: ${targetASN || 'unknown'}`);
    
    // Analyze each potential typosquat
    const analyses: TyposquatAnalysis[] = [];
    
    for (const result of dnstwistResults) {
      if (result['domain-name'] === domain) {
        continue; // Skip the original domain
      }
      
      const analysis = await analyzeTyposquat(result, targetASN, apiKey);
      analyses.push(analysis);
      
      // Rate limiting for WhoisXML API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Generate summary
    const activeSquats = analyses.filter(a => a.is_active_squat);
    const suspiciousDomains = analyses.filter(a => a.risk_score >= 50);
    const avgRiskScore = analyses.length > 0 ? 
      analyses.reduce((sum, a) => sum + a.risk_score, 0) / analyses.length : 0;
    
    const summary: TyposquatSummary = {
      total_domains_checked: analyses.length,
      active_squats_found: activeSquats.length,
      suspicious_domains: suspiciousDomains.length,
      avg_risk_score: Math.round(avgRiskScore),
      top_risk_domains: analyses
        .sort((a, b) => b.risk_score - a.risk_score)
        .slice(0, 10)
        .map(a => a.domain)
    };
    
    log(`Typosquat analysis complete: ${activeSquats.length} active squats, ${suspiciousDomains.length} suspicious domains`);
    
    // Create summary artifact
    const severity = activeSquats.length > 0 ? 'HIGH' : 
                    suspiciousDomains.length > 0 ? 'MEDIUM' : 'LOW';
    
    const artifactId = await insertArtifact({
      type: 'typosquat_summary',
      val_text: `Typosquat analysis: ${activeSquats.length} active typosquats detected from ${analyses.length} domains checked`,
      severity,
      meta: {
        scan_id: scanId,
        scan_module: 'typosquatScorer',
        domain,
        summary,
        all_analyses: analyses,
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    let findingsCount = 0;
    
    // Create findings for active typosquats
    for (const analysis of activeSquats) {
      const description = `Active typosquat detected: ${analysis.domain} (${analysis.days_since_creation} days old, risk score: ${analysis.risk_score})`;
      const evidence = `Evidence: ${analysis.evidence.join(', ')} | Fuzzer: ${analysis.fuzzer}`;
      
      await insertFinding(
        artifactId,
        'ACTIVE_TYPOSQUAT',
        description,
        evidence
      );
      
      findingsCount++;
    }
    
    const duration = Date.now() - startTime;
    log(`Typosquat scorer completed: ${findingsCount} findings in ${duration}ms`);
    
    return findingsCount;
    
  } catch (error) {
    const errorMsg = (error as Error).message;
    log(`Typosquat scorer failed: ${errorMsg}`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `Typosquat scorer failed: ${errorMsg}`,
      severity: 'MEDIUM',
      meta: {
        scan_id: scanId,
        scan_module: 'typosquatScorer',
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    return 0;
  }
}