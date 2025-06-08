/* ──────────────────────────────────────────────────────────────────────────
   apps/workers/modules/spiderFoot.ts
   --------------------------------------------------------------------------
   Executes SpiderFoot from a worker, saves results, inserts artifacts.
   This version wraps the scan command in `sh -c` so that output redirection
   works and positional arguments are parsed correctly.
   ------------------------------------------------------------------------ */

   import { execFile, exec as execRaw } from 'node:child_process';
   import { promisify } from 'node:util';
   import fs from 'node:fs/promises';
   import { insertArtifact } from '../core/artifactStore.js';
   import { log } from '../core/logger.js';
   
   const execFileAsync = promisify(execFile); // direct binary, no shell
   const execAsync     = promisify(execRaw);  // via shell
   
   // SpiderFoot modules that require API keys
   const TARGET_MODULES = [
     'sfp_crtsh',
     'sfp_censys',
     'sfp_sublist3r',
     'sfp_shodan',
     'sfp_chaos',
     'sfp_r7_dns',
     'sfp_haveibeenpwnd',
     'sfp_psbdmp',
     'sfp_skymem',
     'sfp_sslcert',
     'sfp_nuclei'
   ].join(',');
   
   type Severity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
   
   /* Configure SpiderFoot ─────────────────────────────────────────────────── */
   async function configureSpiderFoot(): Promise<boolean> {
     try {
       await execFileAsync('mkdir', ['-p', '/tmp/spiderfoot-config']);
   
       const config = {
         shodan_api_key:       process.env.SHODAN_API_KEY  ?? '',
         censys_api_key:       process.env.CENSYS_API_KEY  ?? '',
         haveibeenpwnd_api_key:process.env.HIBP_API_KEY    ?? '',
         chaos_api_key:        process.env.CHAOS_API_KEY   ?? '',
         dbconnectstr:         'sqlite:////tmp/spiderfoot.db',
         webport:              '5001',
         webhost:              '127.0.0.1'
       };
   
       // Mask keys in log
       const masked = (v: string) => (v ? '✅ SET' : '❌ NOT SET');
       console.log('[spiderfoot] API key status:',
         `Shodan ${masked(config.shodan_api_key)},`,
         `Censys ${masked(config.censys_api_key)},`,
         `HIBP ${masked(config.haveibeenpwnd_api_key)},`,
         `Chaos ${masked(config.chaos_api_key)}`);
   
       const confText = Object.entries(config)
         .map(([k, v]) => `${k}=${v}`)
         .join('\n');
       await fs.writeFile('/tmp/spiderfoot-config/spiderfoot.conf', confText);
   
       log('[spiderfoot] Configuration written');
       return true;
     } catch (err) {
       log('[spiderfoot] Configuration error:', (err as Error).message);
       return false;
     }
   }
   
   /* Run SpiderFoot ───────────────────────────────────────────────────────── */
   export async function runSpiderFoot(
     job: { domain: string; scanId?: string }
   ): Promise<number> {
     const { domain, scanId } = job;
     console.log('[SpiderFoot] 🚀 Starting scan for', domain, 'ID:', scanId);
   
     /* locate SpiderFoot binary */
     let spiderFootCommand = '';
     try {
       await execFileAsync('which', ['sf']);
       spiderFootCommand = 'sf';
     } catch {
       try {
         await execFileAsync('which', ['spiderfoot.py']);
         spiderFootCommand = 'spiderfoot.py';
       } catch {
         console.error('[SpiderFoot] SpiderFoot not installed');
         await insertArtifact({
           type: 'scan_error',
           val_text: 'SpiderFoot binary not found in PATH',
           severity: 'HIGH',
           meta: { scan_id: scanId, timestamp: new Date().toISOString() }
         });
         return 0;
       }
     }
   
     await configureSpiderFoot();
   
     /* build shell command */
     const spiderfootOutputPath = `/tmp/spiderfoot-${domain}.json`;
     const cmd =
       `${spiderFootCommand} -q -s ${domain} -m ${TARGET_MODULES} -o json ` +
       `> ${spiderfootOutputPath}`;
   
     try {
       const start = Date.now();
       const { stdout, stderr } = await execAsync(cmd, {
         timeout: 180_000,
         env: { ...process.env, SF_CONFDIR: '/tmp/spiderfoot-config' },
         shell: '/bin/sh',
         maxBuffer: 20 * 1024 * 1024 // 20 MiB
       });
       console.log('[SpiderFoot] ✔️ Completed in', Date.now() - start, 'ms');
       if (stderr) console.warn('[SpiderFoot] stderr:', stderr.slice(0, 500));
   
       /* Parse results */
       let results: any[] = [];
       try {
         results = JSON.parse(await fs.readFile(spiderfootOutputPath, 'utf8'));
       } catch {
         if (stdout.trim()) results = JSON.parse(stdout);
       }
   
       /* Process results … (unchanged from previous implementation) */
       let artifactsCreated = 0;
       const linkUrls: string[] = [];
   
       for (const row of results) {
         /* choose severity first so it has the right literal type */
         const sev: Severity =
           /VULNERABILITY|MALICIOUS/.test(row.type) ? 'HIGH' : 'INFO';
   
         const base = {
           severity: sev,                 // <- typed as Severity, not string
           src_url:  row.sourceUrl ?? domain,
           meta: {
             scan_id:         scanId,
             spiderfoot_type: row.type,
             source_module:   row.module,
             confidence:      row.confidence ?? 100
           }
         } as const;                      // keeps literal types
   
         let created = false;
   
         switch (row.type) {
           case 'AFFILIATE_INTERNET_NAME':
           case 'INTERNET_NAME':
             await insertArtifact({ ...base, type: 'subdomain', val_text: row.data });
             created = true; break;
           case 'IP_ADDRESS':
             await insertArtifact({ ...base, type: 'ip', val_text: row.data });
             created = true; break;
           case 'EMAILADDR':
             await insertArtifact({ ...base, type: 'email', val_text: row.data });
             created = true; break;
           case 'VULNERABILITY_CVE':
             await insertArtifact({ ...base, type: 'vuln', val_text: `CVE: ${row.data}`, meta: { ...base.meta, cve_id: row.data } });
             created = true; break;
           case 'MALICIOUS_IPADDR':
           case 'MALICIOUS_INTERNET_NAME':
             await insertArtifact({ ...base, type: 'threat', val_text: `Indicator: ${row.data}` });
             created = true; break;
           case 'LEAKSITE_CONTENT':
           case 'PASTESITE_CONTENT':
             await insertArtifact({ ...base, type: 'breach', val_text: row.data, meta: { ...base.meta, breach_source: row.sourceUrl } });
             created = true; break;
           case 'LINKED_URL_EXTERNAL':
           case 'LINKED_URL_INTERNAL':
             linkUrls.push(row.data);
             break;
         }
         if (created) artifactsCreated++;
       }
   
       if (linkUrls.length) {
         await fs.writeFile('/tmp/spiderfoot-links.json', JSON.stringify(linkUrls, null, 2));
         log('[SpiderFoot] Saved', linkUrls.length, 'links for TruffleHog');
       }
   
       await insertArtifact({
         type: 'scan_summary',
         val_text: `SpiderFoot scan completed: ${artifactsCreated} artifacts`,
         severity: 'INFO',
         meta: {
           scan_id:          scanId,
           results_processed: results.length,
           artifacts_created: artifactsCreated,
           links_discovered:  linkUrls.length,
           timestamp:         new Date().toISOString()
         }
       });
   
       return artifactsCreated;
     } catch (err: any) {
       console.error('[SpiderFoot] ❌ Scan failed:', err.message);
       await insertArtifact({
         type: 'error',
         val_text: `SpiderFoot scan failed for ${domain}: ${err.message}`,
         severity: 'INFO',
         meta: {
           scan_id: scanId,
           error:   err.message,
           stderr:  err.stderr,
           stdout:  err.stdout
         }
       });
       return 0;
     }
   }
   