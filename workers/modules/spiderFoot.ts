import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

// SpiderFoot modules that require API keys
const TARGET_MODULES = [
  'sfp_crtsh',           // Certificate transparency logs
  'sfp_censys',          // Censys search (requires API key)
  'sfp_sublist3r',       // Subdomain discovery
  'sfp_shodan',          // Shodan search (requires API key)
  'sfp_chaos',           // Chaos subdomain discovery
  'sfp_r7_dns',          // Rapid7 DNS
  'sfp_haveibeenpwnd',   // HaveIBeenPwned (requires API key)
  'sfp_searchcode',      // Code search
  'sfp_psbdmp',          // Pastebin dumps
  'sfp_skymem',          // Skymem search
  'sfp_sslcert',         // SSL certificate discovery
  'sfp_nuclei'           // Nuclei vulnerability scanning
].join(',');

async function configureSpiderFoot() {
  try {
    // Create SpiderFoot config directory
    await exec('mkdir', ['-p', '/tmp/spiderfoot-config']);
    
    // Configure API keys for SpiderFoot
    const config = {
      // Shodan API configuration
      'shodan_api_key': process.env.SHODAN_API_KEY || '',
      
      // Censys API configuration  
      'censys_api_key': process.env.CENSYS_API_KEY || '',
      
      // HaveIBeenPwned API configuration
      'haveibeenpwnd_api_key': process.env.HIBP_API_KEY || '',
      
      // General settings
      'dbconnectstr': 'sqlite:////tmp/spiderfoot.db',
      'webport': '5001',
      'webhost': '127.0.0.1'
    };
    
    // Write SpiderFoot configuration
    const configContent = Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    await fs.writeFile('/tmp/spiderfoot-config/spiderfoot.conf', configContent);
    
    log('[spiderfoot] Configuration written with API keys');
    return true;
  } catch (err) {
    log('[spiderfoot] Configuration error:', (err as Error).message);
    return false;
  }
}

export async function runSpiderFoot(job: { domain: string; scanId?: string }): Promise<number> {
  const { domain, scanId } = job;
  log('[SpiderFoot] Starting scan for', domain);
  
  // Configure SpiderFoot with API keys
  await configureSpiderFoot();
  
  try {
    // Run SpiderFoot with configuration
    const { stdout } = await exec('sf', [
      '-q',                              // Quiet mode
      domain,                            // Target domain
      '-m', TARGET_MODULES,              // Modules to use
      '-F', 'json',                      // Output format
      '-c', '/tmp/spiderfoot-config/spiderfoot.conf',  // Config file
      '-o', `/tmp/spiderfoot-${domain}.json`  // Output file
    ]);
    
    // Parse SpiderFoot results
    let results = [];
    try {
      const resultData = await fs.readFile(`/tmp/spiderfoot-${domain}.json`, 'utf8');
      results = JSON.parse(resultData);
    } catch (parseErr) {
      // Try parsing stdout if file doesn't exist
      if (stdout.trim()) {
        results = JSON.parse(stdout);
      }
    }
    
    // Process results and create artifacts
    const linkUrls = [];
    let artifactsCreated = 0;
    
    for (const row of results) {
      let created = false;
      
      switch (row.type) {
        case 'AFFILIATE_INTERNET_NAME':
        case 'INTERNET_NAME':
          await insertArtifact({
            type: 'subdomain',
            val_text: row.data,
            severity: 'INFO',
            src_url: domain,
            meta: {
              scan_id: scanId,
              spiderfoot_type: row.type,
              source_module: row.module,
              confidence: row.confidence || 100
            }
          });
          created = true;
          break;
          
        case 'IP_ADDRESS':
          await insertArtifact({
            type: 'ip',
            val_text: row.data,
            severity: 'INFO',
            src_url: domain,
            meta: {
              scan_id: scanId,
              spiderfoot_type: row.type,
              source_module: row.module,
              confidence: row.confidence || 100
            }
          });
          created = true;
          break;
          
        case 'LEAKSITE_CONTENT':
        case 'PASTESITE_CONTENT':
          await insertArtifact({
            type: 'breach',
            val_text: row.data,
            severity: 'HIGH',
            src_url: row.sourceUrl || domain,
            meta: {
              scan_id: scanId,
              spiderfoot_type: row.type,
              source_module: row.module,
              confidence: row.confidence || 100,
              breach_source: row.sourceUrl
            }
          });
          created = true;
          break;
          
        case 'LINKED_URL_EXTERNAL':
        case 'LINKED_URL_INTERNAL':
          linkUrls.push(row.data);
          break;
          
        case 'VULNERABILITY_CVE':
          await insertArtifact({
            type: 'vuln',
            val_text: `CVE vulnerability: ${row.data}`,
            severity: 'HIGH',
            src_url: domain,
            meta: {
              scan_id: scanId,
              spiderfoot_type: row.type,
              source_module: row.module,
              cve_id: row.data,
              confidence: row.confidence || 100
            }
          });
          created = true;
          break;
          
        case 'MALICIOUS_IPADDR':
        case 'MALICIOUS_INTERNET_NAME':
          await insertArtifact({
            type: 'threat',
            val_text: `Malicious indicator: ${row.data}`,
            severity: 'HIGH',
            src_url: domain,
            meta: {
              scan_id: scanId,
              spiderfoot_type: row.type,
              source_module: row.module,
              indicator: row.data,
              confidence: row.confidence || 100
            }
          });
          created = true;
          break;
          
        case 'EMAILADDR':
          await insertArtifact({
            type: 'email',
            val_text: row.data,
            severity: 'INFO',
            src_url: domain,
            meta: {
              scan_id: scanId,
              spiderfoot_type: row.type,
              source_module: row.module,
              confidence: row.confidence || 100
            }
          });
          created = true;
          break;
      }
      
      if (created) artifactsCreated++;
    }
    
    // Save links for TruffleHog to use
    if (linkUrls.length > 0) {
      await fs.writeFile('/tmp/spiderfoot-links.json', JSON.stringify(linkUrls, null, 2));
      log('[SpiderFoot] Saved', linkUrls.length, 'links for TruffleHog scanning');
    }
    
    log('[SpiderFoot] Processed', results.length, 'results for', domain, '- created', artifactsCreated, 'artifacts');
    return artifactsCreated;
    
  } catch (err) {
    log('[SpiderFoot] Scan error for', domain, ':', (err as Error).message);
    await insertArtifact({
      type: 'error',
      val_text: `SpiderFoot scan failed for ${domain}`,
      severity: 'INFO',
      meta: { 
        scan_id: scanId,
        error: (err as Error).message 
      }
    });
    
    return 0;
  }
} 