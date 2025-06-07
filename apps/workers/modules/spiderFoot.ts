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
    
    // Log API key availability (without exposing the keys)
    console.log('[spiderfoot] ℹ️  API key configuration status:');
    console.log('[spiderfoot] - Shodan API key:', config.shodan_api_key ? '✅ SET' : '❌ NOT SET');
    console.log('[spiderfoot] - Censys API key:', config.censys_api_key ? '✅ SET' : '❌ NOT SET');
    console.log('[spiderfoot] - HIBP API key:', config.haveibeenpwnd_api_key ? '✅ SET' : '❌ NOT SET');
    
    // Warn if critical API keys are missing
    if (!config.shodan_api_key) {
      console.warn('[spiderfoot] ⚠️  WARNING: Shodan API key not configured - Shodan module will not work');
    }
    if (!config.censys_api_key) {
      console.warn('[spiderfoot] ⚠️  WARNING: Censys API key not configured - Censys module will not work');
    }
    
    // Write SpiderFoot configuration
    const configContent = Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    await fs.writeFile('/tmp/spiderfoot-config/spiderfoot.conf', configContent);
    
    // Log the config file content (without API keys)
    const maskedConfig = configContent.replace(/(_api_key=)[^=\n]+/g, '$1***MASKED***');
    log('[spiderfoot] Configuration content:', maskedConfig);
    
    log('[spiderfoot] Configuration written with API keys');
    return true;
  } catch (err) {
    log('[spiderfoot] Configuration error:', (err as Error).message);
    return false;
  }
}

export async function runSpiderFoot(job: { domain: string; scanId?: string }): Promise<number> {
  const { domain, scanId } = job;
  console.log('[SpiderFoot] 🚀 Starting scan for', domain);
  console.log('[SpiderFoot] Scan ID:', scanId);
  console.log('[SpiderFoot] Timestamp:', new Date().toISOString());
  
  // Check if SpiderFoot command exists
  let spiderFootCommand = '';
  try {
    await exec('which', ['sf']);
    spiderFootCommand = 'sf';
    console.log('[SpiderFoot] ✅ sf command found in PATH');
  } catch (whichErr) {
    console.warn('[SpiderFoot] ⚠️  sf command not found, checking for spiderfoot.py');
    try {
      await exec('which', ['spiderfoot.py']);
      spiderFootCommand = 'spiderfoot.py';
      console.log('[SpiderFoot] ✅ spiderfoot.py found in PATH');
    } catch (pyErr) {
      console.error('[SpiderFoot] ❌ CRITICAL: SpiderFoot not installed');
      console.error('[SpiderFoot] Neither sf nor spiderfoot.py found in PATH');
      console.error('[SpiderFoot] PATH:', process.env.PATH);
      console.error('[SpiderFoot] This is likely due to SpiderFoot not being installed in the Docker image');
      
      await insertArtifact({
        type: 'scan_error',
        val_text: `SpiderFoot not installed - required binary not found in PATH`,
        severity: 'HIGH',
        meta: { 
          scan_id: scanId,
          error_type: 'spiderfoot_not_installed',
          path: process.env.PATH,
          timestamp: new Date().toISOString(),
          impact: 'Censys integration unavailable, reduced subdomain discovery'
        }
      });
      return 0;
    }
  }
  
  // Configure SpiderFoot with API keys
  await configureSpiderFoot();
  
  try {
    console.log('[SpiderFoot] 📋 Modules to be executed:', TARGET_MODULES.split(',').join(', '));
    console.log('[SpiderFoot] 🔧 Executing command:', spiderFootCommand);
    const startTime = Date.now();
    
    // Run SpiderFoot with configuration
    const { stdout, stderr } = await exec(spiderFootCommand, [
      '-q',                              // Quiet mode
      domain,                            // Target domain
      '-m', TARGET_MODULES,              // Modules to use
      '-F', 'json',                      // Output format
      '-c', '/tmp/spiderfoot-config/spiderfoot.conf',  // Config file
      '-o', `/tmp/spiderfoot-${domain}.json`  // Output file
    ]);
    
    const executionTime = Date.now() - startTime;
    console.log('[SpiderFoot] ✅ Command completed successfully in', executionTime, 'ms');
    console.log('[SpiderFoot] stdout length:', stdout.length, 'bytes');
    if (stderr) {
      console.warn('[SpiderFoot] ⚠️  stderr output:', stderr.substring(0, 500));
    }
    
    // Parse SpiderFoot results
    let results = [];
    try {
      const resultData = await fs.readFile(`/tmp/spiderfoot-${domain}.json`, 'utf8');
      results = JSON.parse(resultData);
      log('[SpiderFoot] Parsed', results.length, 'results from output file');
    } catch (parseErr) {
      log('[SpiderFoot] Failed to read output file, trying stdout');
      // Try parsing stdout if file doesn't exist
      if (stdout.trim()) {
        results = JSON.parse(stdout);
        log('[SpiderFoot] Parsed', results.length, 'results from stdout');
      } else {
        log('[SpiderFoot] No results found in stdout or file');
      }
    }
    
    // Log detailed results summary
    if (results.length > 0) {
      console.log('[SpiderFoot] 📊 Results summary:');
      const typeCount = results.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      Object.entries(typeCount).forEach(([type, count]) => {
        console.log(`[SpiderFoot]   - ${type}: ${count}`);
      });
      
      const moduleCount = results.reduce((acc, r) => {
        acc[r.module] = (acc[r.module] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('[SpiderFoot] 📦 Results by module:');
      Object.entries(moduleCount).forEach(([module, count]) => {
        console.log(`[SpiderFoot]   - ${module}: ${count}`);
      });
    } else {
      console.warn('[SpiderFoot] ⚠️  No results returned from scan');
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
    
    console.log('[SpiderFoot] ✅ Scan completed successfully');
    console.log('[SpiderFoot] 📊 Summary:');
    console.log(`[SpiderFoot]   - Total results processed: ${results.length}`);
    console.log(`[SpiderFoot]   - Artifacts created: ${artifactsCreated}`);
    console.log(`[SpiderFoot]   - Links discovered: ${linkUrls.length}`);
    console.log('[SpiderFoot] Timestamp:', new Date().toISOString());
    
    // Create success artifact for tracking
    await insertArtifact({
      type: 'scan_summary',
      val_text: `SpiderFoot scan completed: ${artifactsCreated} artifacts created`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'spiderfoot',
        results_processed: results.length,
        artifacts_created: artifactsCreated,
        links_discovered: linkUrls.length,
        timestamp: new Date().toISOString()
      }
    });
    
    return artifactsCreated;
    
  } catch (err: any) {
    console.error('[SpiderFoot] ❌ CRITICAL: Scan failed for', domain);
    console.error('[SpiderFoot] Error type:', err.code || 'Unknown');
    console.error('[SpiderFoot] Error message:', err.message);
    console.error('[SpiderFoot] Error signal:', err.signal);
    
    if (err.stdout) {
      console.error('[SpiderFoot] stdout (first 1000 chars):', err.stdout.substring(0, 1000));
    }
    if (err.stderr) {
      console.error('[SpiderFoot] stderr (first 1000 chars):', err.stderr.substring(0, 1000));
      
      // Check for common SpiderFoot errors
      if (err.stderr.includes('No module named')) {
        console.error('[SpiderFoot] ⚠️  Missing Python dependency detected');
      }
      if (err.stderr.includes('Permission denied')) {
        console.error('[SpiderFoot] ⚠️  Permission issue detected');
      }
      if (err.stderr.includes('command not found')) {
        console.error('[SpiderFoot] ⚠️  SpiderFoot binary not found - installation issue');
      }
    }
    
    await insertArtifact({
      type: 'error',
      val_text: `SpiderFoot scan failed for ${domain}: ${err.message}`,
      severity: 'INFO',
      meta: { 
        scan_id: scanId,
        error: err.message,
        error_code: err.code,
        error_signal: err.signal,
        stderr: err.stderr,
        stdout: err.stdout
      }
    });
    
    return 0;
  }
} 