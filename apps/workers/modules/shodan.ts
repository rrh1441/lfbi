/*
 * =============================================================================
 * MODULE: shodan.ts (Refactored)
 * =============================================================================
 * This module uses the Shodan API to find exposed services and vulnerabilities
 * associated with a target domain and organization.
 *
 * Key Improvements from previous version:
 * 1.  **More Comprehensive Target List:** The number of subdomains and IPs pulled
 * from previous scan phases (e.g., spiderFoot) has been increased from 20
 * to 100 for more thorough scanning of larger organizations.
 * 2.  **Context-Aware Recommendations:** The recommendation engine is no longer
 * generic. It now provides specific, actionable advice based on the
 * discovered service, port, and version, including tailored hardening guides
 * and patch notifications for known CVEs.
 * =============================================================================
 */

import axios from 'axios';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

interface ShodanResult {
  ip_str: string;
  port: number;
  location: {
    country_name?: string;
    city?: string;
  };
  org?: string;
  isp?: string;
  product?: string;
  version?: string;
  // REFACTOR: vulns is an object with CVEs as keys for better structure.
  vulns?: Record<string, any>;
  ssl?: {
    cert?: {
      subject?: {
        CN?: string;
      };
      issuer?: {
        CN?: string;
      };
      expired?: boolean;
    };
  };
  http?: {
    title?: string;
    server?: string;
  };
  banner?: string;
  hostnames?: string[];
}

interface ShodanResponse {
  matches: ShodanResult[];
  total: number;
}

/**
 * REFACTOR: The recommendation function is now much more dynamic and context-aware.
 * It generates specific advice based on the service, version, and finding.
 */
function getShodanRecommendation(port: number, serviceInfo: { product: string; version: string; }, finding: string): string {
  const recommendations: Record<number, string> = {
    21: 'Disable FTP or enforce FTPS with strong authentication.',
    22: 'Secure SSH with key-based auth, disable password auth, use fail2ban, and consider changing the default port.',
    23: 'CRITICAL: Disable Telnet immediately. It is an insecure plaintext protocol. Use SSH instead.',
    25: 'Secure SMTP with modern authentication (SPF, DKIM, DMARC) and enforce STARTTLS.',
    53: 'Secure DNS server against cache poisoning and amplification attacks. Use DNSSEC if possible.',
    80: 'Migrate to HTTPS (port 443) and redirect all HTTP traffic. Implement HSTS.',
    110: 'Use POP3S (port 995) instead of plaintext POP3.',
    135: 'Block RPC ports from internet access. This is a common vector for worms.',
    139: 'Block NetBIOS/SMB ports from internet access. This is a critical security risk.',
    445: 'Block SMB from internet access. This is a critical security risk and a common ransomware vector.',
    143: 'Use IMAPS (port 993) instead of plaintext IMAP.',
    1433: 'Block SQL Server access from the internet. Access should be via a VPN or bastion host.',
    1521: 'Block Oracle DB access from the internet. Access should be via a VPN or bastion host.',
    3306: 'Block MySQL/MariaDB access from the internet. Access should be via a VPN or bastion host.',
    3389: 'Block RDP from the internet or protect it with a Gateway and Multi-Factor Authentication.',
    5432: 'Block PostgreSQL access from the internet. Access should be via a VPN or bastion host.',
    5900: 'Block VNC from the internet. It is often unencrypted. Use a secure remote access solution like SSH tunneling or a VPN.',
    6379: 'Block Redis from the internet. Enable password authentication and run in protected mode.',
    9200: 'Block Elasticsearch from the internet. Use authentication and role-based access control.',
  };

  if (finding.includes('vulnerability')) {
    const cve = finding.split(':')[1]?.trim();
    if (cve) {
      return `CRITICAL: Immediately patch the identified vulnerability ${cve} for ${serviceInfo.product} ${serviceInfo.version}. Review vendor advisories for mitigation steps.`;
    }
    return `CRITICAL: Immediately investigate and patch all identified vulnerabilities for ${serviceInfo.product} ${serviceInfo.version}.`;
  }
  
  if(finding.includes('Expired SSL certificate')) {
      return 'Renew the SSL/TLS certificate immediately to prevent trust errors and potential security warnings for users.';
  }

  return recommendations[port] || `Review the configuration for ${serviceInfo.product} on port ${port} and restrict internet access if it's not required. Follow security best practices for this service.`;
}


/**
 * REFACTOR: Increased the limit to 100 to get a more comprehensive list of targets.
 */
async function getDiscoveredTargets(scanId: string): Promise<string[]> {
  log('[shodan] Querying database for discovered targets...');
  try {
    const subdomainQuery = `
      SELECT DISTINCT val_text 
      FROM artifacts 
      WHERE meta->>'scan_id' = $1 
      AND type IN ('subdomain', 'ip', 'INTERNET_NAME', 'AFFILIATE_INTERNET_NAME')
      AND val_text IS NOT NULL
      LIMIT 100
    `;
    const result = await pool.query(subdomainQuery, [scanId]);
    const targets = result.rows.map(row => row.val_text.trim());
    log(`[shodan] Found ${targets.length} discovered targets from previous scans.`);
    return targets;
  } catch (error) {
    log('[shodan] [ERROR] Failed to get discovered targets from database:', (error as Error).message);
    return [];
  }
}

async function processShodanResults(matches: ShodanResult[], scanId: string, companyName: string, searchTarget: string): Promise<number> {
  let findingsCount = 0;
  for (const result of matches) {
    findingsCount++;
    const serviceInfo = {
      ip: result.ip_str,
      port: result.port,
      product: result.product || 'Unknown',
      version: result.version || 'Unknown',
      organization: result.org || 'Unknown',
      isp: result.isp || 'Unknown',
      location: result.location?.city && result.location?.country_name 
        ? `${result.location.city}, ${result.location.country_name}`
        : 'Unknown',
      banner: result.banner || '',
      hostnames: result.hostnames || [],
      search_target: searchTarget
    };

    let severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'INFO';
    const findingsList: string[] = [];
    
    const criticalPorts = [23, 139, 445, 3389, 5900];
    const highPorts = [21, 22, 1433, 1521, 3306, 5432, 6379, 9200];
    
    if (criticalPorts.includes(result.port)) {
        severity = 'HIGH';
    } else if (highPorts.includes(result.port)) {
        severity = 'MEDIUM';
    }

    if (result.vulns && Object.keys(result.vulns).length > 0) {
      severity = 'CRITICAL';
      for (const cve of Object.keys(result.vulns)) {
        findingsList.push(`Known vulnerability: ${cve}`);
      }
    }

    if (result.ssl?.cert?.expired) {
      severity = severity === 'INFO' ? 'LOW' : severity === 'MEDIUM' ? 'MEDIUM' : 'HIGH'; // Elevate severity
      findingsList.push('Expired SSL certificate detected');
    }

    const artifactId = await insertArtifact({
      type: 'shodan_service',
      val_text: `${result.ip_str}:${result.port} - ${serviceInfo.product} ${serviceInfo.version}`,
      severity,
      src_url: `https://www.shodan.io/host/${result.ip_str}`,
      meta: {
        scan_id: scanId,
        company: companyName,
        service_info: serviceInfo,
        shodan_vulns: result.vulns,
        scan_module: 'shodan'
      }
    });

    if (findingsList.length === 0) {
        findingsList.push(`Exposed service on port ${result.port}`);
    }

    for (const finding of findingsList) {
      await insertFinding(
        artifactId,
        'EXPOSED_SERVICE',
        // REFACTOR: Pass the full serviceInfo object to the recommendation engine.
        getShodanRecommendation(result.port, serviceInfo, finding),
        finding
      );
    }
  }
  return findingsCount;
}

async function searchByOrganization(companyName: string, scanId: string, apiKey: string): Promise<number> {
  const orgSearchUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}&query=org:"${companyName}"`;
  try {
    const orgResponse = await axios.get<ShodanResponse>(orgSearchUrl, { timeout: 30000 });
    log(`[shodan] Found ${orgResponse.data.matches.length} results for organization "${companyName}"`);
    // Limit processing for org searches to avoid noise, but get a good sample.
    return await processShodanResults(orgResponse.data.matches.slice(0, 50), scanId, companyName, `org:"${companyName}"`);
  } catch (orgError) {
    log('[shodan] Organization search failed:', (orgError as Error).message);
    return 0;
  }
}

export async function runShodanScan(job: { domain: string, scanId: string, companyName: string }): Promise<number> {
    const { domain, scanId, companyName } = job;
    const apiKey = process.env.SHODAN_API_KEY;
    if (!apiKey) {
        log('[shodan] [CRITICAL] SHODAN_API_KEY not found. Scan skipped.');
        await insertArtifact({
            type: 'scan_error',
            val_text: 'Shodan scan skipped - API key not configured',
            severity: 'HIGH',
            meta: { scan_id: scanId, scan_module: 'shodan' }
        });
        return 0;
    }

    log(`[shodan] Starting comprehensive scan for domain: ${domain}, company: ${companyName}`);
    let totalFindings = 0;
    const allTargets = new Set<string>([domain]);

    try {
        const discoveredTargets = await getDiscoveredTargets(scanId);
        discoveredTargets.forEach(t => allTargets.add(t));
        
        log(`[shodan] Scanning ${allTargets.size} unique targets.`);

        for (const target of allTargets) {
            const searchUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}&query=hostname:${target}`;
            try {
                log(`[shodan] Querying for: ${target}`);
                const response = await axios.get<ShodanResponse>(searchUrl, { timeout: 30000 });
                totalFindings += await processShodanResults(response.data.matches, scanId, companyName, target);
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                log(`[shodan] [ERROR] Search failed for ${target}:`, (error as Error).message);
            }
        }

        if (companyName && companyName !== domain) {
            totalFindings += await searchByOrganization(companyName, scanId, apiKey);
        }

        log(`[shodan] Scan completed. Total findings: ${totalFindings}`);
        await insertArtifact({
            type: 'scan_summary',
            val_text: `Shodan scan completed: ${totalFindings} findings`,
            severity: 'INFO',
            meta: {
                scan_id: scanId,
                scan_module: 'shodan',
                total_findings: totalFindings,
                targets_scanned: allTargets.size,
                timestamp: new Date().toISOString()
            }
        });
        return totalFindings;
    } catch (error) {
        log('[shodan] [CRITICAL] Scan failed with unexpected error:', (error as Error).message);
        await insertArtifact({
            type: 'scan_error',
            val_text: `Shodan scan failed: ${(error as Error).message}`,
            severity: 'HIGH',
            meta: { scan_id: scanId, scan_module: 'shodan' }
        });
        return 0;
    }
}
