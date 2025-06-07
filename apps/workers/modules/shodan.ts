import axios from 'axios';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';

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
  vulns?: string[];
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
}

interface ShodanResponse {
  matches: ShodanResult[];
  total: number;
}

export async function runShodanScan(domain: string, scanId: string, companyName: string): Promise<number> {
  const apiKey = process.env.SHODAN_API_KEY;
  if (!apiKey) {
    console.error('[shodan] ❌ CRITICAL: API key not found in environment variables');
    console.error('[shodan] Please ensure SHODAN_API_KEY is set in your environment');
    
    // Create error artifact for visibility
    await insertArtifact({
      type: 'scan_error',
      val_text: 'Shodan scan skipped - API key not configured',
      severity: 'HIGH',
      meta: {
        scan_id: scanId,
        company: companyName,
        scan_module: 'shodan',
        error_type: 'missing_api_key',
        timestamp: new Date().toISOString()
      }
    });
    return 0;
  }

  console.log(`[shodan] ✅ API key found, starting comprehensive scan for ${domain}`);
  console.log(`[shodan] Company: ${companyName}, Scan ID: ${scanId}`);
  console.log(`[shodan] Timestamp: ${new Date().toISOString()}`);
  
  try {
    let totalFindings = 0;

    // Get discovered subdomains and IPs from SpiderFoot
    const discoveredTargets = await getDiscoveredTargets(scanId);
    const allTargets = [domain, ...discoveredTargets];
    
    console.log(`[shodan] Scanning ${allTargets.length} targets: ${allTargets.slice(0, 5).join(', ')}${allTargets.length > 5 ? '...' : ''}`);

    // Search each target
    for (const target of allTargets) {
      const searchUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}&query=hostname:${target}`;
      
      try {
        console.log(`[shodan] 🔍 Querying Shodan API for: ${target}`);
        const startTime = Date.now();
        
        const response = await axios.get<ShodanResponse>(searchUrl, {
          timeout: 30000,
          headers: {
            'User-Agent': 'DealBrief-Scanner/1.0'
          }
        });

        const queryTime = Date.now() - startTime;
        console.log(`[shodan] ✅ Query completed in ${queryTime}ms`);
        console.log(`[shodan] 📊 Results: ${response.data.matches.length} matches found for ${target}`);
        console.log(`[shodan] Total available results: ${response.data.total}`);
        totalFindings += await processShodanResults(response.data.matches, scanId, companyName, target);
        
        // Rate limiting - wait between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        const err = error as any;
        console.error(`[shodan] ❌ Search failed for ${target}`);
        console.error(`[shodan] Error type: ${err.code || 'Unknown'}`);
        console.error(`[shodan] Error message: ${err.message}`);
        
        if (err.response) {
          console.error(`[shodan] Response status: ${err.response.status}`);
          console.error(`[shodan] Response data: ${JSON.stringify(err.response.data)}`);
          
          // Check for common API errors
          if (err.response.status === 401) {
            console.error('[shodan] ⚠️  401 Unauthorized - Check API key validity');
          } else if (err.response.status === 403) {
            console.error('[shodan] ⚠️  403 Forbidden - Check API permissions or rate limits');
          } else if (err.response.status === 429) {
            console.error('[shodan] ⚠️  429 Rate Limited - Too many requests');
          }
        }
      }
    }

    // Also search for organization name
    if (companyName && companyName !== domain) {
      totalFindings += await searchByOrganization(companyName, scanId, apiKey);
    }

    console.log(`[shodan] ✅ Scan completed successfully`);
    console.log(`[shodan] 📊 Summary: ${totalFindings} total findings across ${allTargets.length} targets`);
    console.log(`[shodan] Timestamp: ${new Date().toISOString()}`);
    
    // Create success artifact for tracking
    await insertArtifact({
      type: 'scan_summary',
      val_text: `Shodan scan completed: ${totalFindings} findings`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        company: companyName,
        scan_module: 'shodan',
        total_findings: totalFindings,
        targets_scanned: allTargets.length,
        timestamp: new Date().toISOString()
      }
    });
    
    return totalFindings;

  } catch (error) {
    console.error('[shodan] ❌ CRITICAL: Scan failed with unexpected error');
    console.error('[shodan] Error:', (error as Error).message);
    console.error('[shodan] Stack:', (error as Error).stack);
    
    // Create error artifact
    await insertArtifact({
      type: 'scan_error',
      val_text: `Shodan scan failed: ${(error as Error).message}`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        company: companyName,
        scan_module: 'shodan',
        error: true
      }
    });

    throw error;
  }
}

async function getDiscoveredTargets(scanId: string): Promise<string[]> {
  console.log('[shodan] 🔍 Querying database for discovered targets...');
  
  try {
    // Get subdomains discovered by SpiderFoot
    const subdomainQuery = `
      SELECT DISTINCT val_text 
      FROM artifacts 
      WHERE meta->>'scan_id' = $1 
      AND type IN ('subdomain', 'ip', 'INTERNET_NAME', 'AFFILIATE_INTERNET_NAME')
      AND val_text IS NOT NULL
      LIMIT 20
    `;
    
    const result = await pool.query(subdomainQuery, [scanId]);
    const targets = result.rows.map(row => row.val_text.trim());
    
    console.log(`[shodan] ✅ Found ${targets.length} discovered targets from previous scans`);
    if (targets.length > 0) {
      console.log(`[shodan] Sample targets: ${targets.slice(0, 3).join(', ')}${targets.length > 3 ? '...' : ''}`);
    }
    return targets;
    
  } catch (error) {
    console.error('[shodan] ❌ Failed to get discovered targets from database');
    console.error('[shodan] Error:', (error as Error).message);
    console.log('[shodan] ℹ️  Continuing with primary domain only');
    return [];
  }
}

async function processShodanResults(matches: ShodanResult[], scanId: string, companyName: string, searchTarget: string): Promise<number> {
  let findings = 0;
  
  for (const result of matches) {
    // Store IP and service information
    const serviceInfo = {
      ip: result.ip_str,
      port: result.port,
      product: result.product || 'Unknown',
      version: result.version || 'Unknown',
      organization: result.org || 'Unknown',
      isp: result.isp || 'Unknown',
      location: result.location.city && result.location.country_name 
        ? `${result.location.city}, ${result.location.country_name}`
        : 'Unknown',
      banner: result.banner || '',
      search_target: searchTarget
    };

    // Determine severity based on findings
    let severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'INFO';
    let findingsList: string[] = [];

    // Check for common vulnerable ports
    const vulnerablePorts = [21, 22, 23, 25, 53, 80, 110, 135, 139, 143, 443, 993, 995, 1433, 1521, 3306, 3389, 5432, 5900, 6379];
    if (vulnerablePorts.includes(result.port)) {
      findingsList.push(`Exposed service on port ${result.port}`);
      severity = 'MEDIUM';
    }

    // Check for critical services
    const criticalPorts = [22, 23, 3389, 5900]; // SSH, Telnet, RDP, VNC
    if (criticalPorts.includes(result.port)) {
      severity = 'HIGH';
      findingsList.push(`Critical remote access service exposed on port ${result.port}`);
    }

    // Check for known vulnerabilities
    if (result.vulns && result.vulns.length > 0) {
      severity = 'CRITICAL';
      for (const vuln of result.vulns) {
        findingsList.push(`Known vulnerability: ${vuln}`);
      }
    }

    // Check for expired SSL certificates
    if (result.ssl?.cert?.expired) {
      severity = severity === 'INFO' ? 'MEDIUM' : severity;
      findingsList.push('Expired SSL certificate detected');
    }

    // Create artifact
    const artifactId = await insertArtifact({
      type: 'shodan_service',
      val_text: `${result.ip_str}:${result.port} - ${serviceInfo.product} ${serviceInfo.version}`,
      severity,
      src_url: `https://www.shodan.io/host/${result.ip_str}`,
      meta: {
        scan_id: scanId,
        company: companyName,
        service_info: serviceInfo,
        scan_module: 'shodan'
      }
    });

    // Create findings for issues discovered
    for (const finding of findingsList) {
      await insertFinding(
        artifactId,
        'vulnerability',
        getShodanRecommendation(result.port, finding),
        finding
      );
    }

    findings++;
  }
  
  return findings;
}

async function searchByOrganization(companyName: string, scanId: string, apiKey: string): Promise<number> {
  const orgSearchUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}&query=org:"${companyName}"`;
  
  try {
    const orgResponse = await axios.get<ShodanResponse>(orgSearchUrl, {
      timeout: 30000,
      headers: {
        'User-Agent': 'DealBrief-Scanner/1.0'
      }
    });

    console.log(`[shodan] Found ${orgResponse.data.matches.length} results for organization "${companyName}"`);
    return await processShodanResults(orgResponse.data.matches.slice(0, 10), scanId, companyName, `org:"${companyName}"`);
    
  } catch (orgError) {
    console.log('[shodan] Organization search failed:', (orgError as Error).message);
    return 0;
  }
}

function getShodanRecommendation(port: number, finding: string): string {
  const recommendations: Record<number, string> = {
    21: 'Disable FTP or use SFTP/FTPS with strong authentication',
    22: 'Secure SSH with key-based auth, disable password auth, change default port',
    23: 'Disable Telnet immediately - use SSH instead',
    25: 'Secure SMTP with authentication and encryption (TLS)',
    53: 'Secure DNS server, prevent DNS amplification attacks',
    80: 'Migrate to HTTPS (port 443) and disable HTTP',
    110: 'Use POP3S (port 995) instead of plain POP3',
    135: 'Block RPC ports from internet access',
    139: 'Block NetBIOS ports from internet access',
    143: 'Use IMAPS (port 993) instead of plain IMAP',
    993: 'Ensure strong SSL/TLS configuration for IMAPS',
    995: 'Ensure strong SSL/TLS configuration for POP3S',
    1433: 'Block SQL Server from internet, use VPN access',
    1521: 'Block Oracle DB from internet, use VPN access',
    3306: 'Block MySQL from internet, use VPN access',
    3389: 'Block RDP from internet or use VPN with MFA',
    5432: 'Block PostgreSQL from internet, use VPN access',
    5900: 'Block VNC from internet, use secure tunneling',
    6379: 'Block Redis from internet, enable authentication'
  };

  if (finding.includes('vulnerability')) {
    return 'Immediately patch the identified vulnerability and review security posture';
  }

  return recommendations[port] || 'Review service configuration and restrict internet access if not required';
} 