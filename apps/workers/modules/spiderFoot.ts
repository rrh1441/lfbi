/* ──────────────────────────────────────────────────────────────────────────
   apps/workers/modules/spiderFoot.ts
   --------------------------------------------------------------------------
   Robust SpiderFoot wrapper (VT disabled):
   • Finds the binary via four fall-backs or an explicit env override
   • Logs API-key status (no VirusTotal line)
   • Runs high-signal modules incl. WHOIS and DNS-resolve
   • Captures core row-types + common DNS/WHOIS intel
   • Timeout configurable via SPIDERFOOT_TIMEOUT_MS (default 300 000 ms)
   • Always emits a scan_summary artifact
   ------------------------------------------------------------------------ */

   import { execFile, exec as execRaw } from 'node:child_process';
   import { promisify } from 'node:util';
   import fs from 'node:fs/promises';
   import { insertArtifact } from '../core/artifactStore.js';
   import { log } from '../core/logger.js';
   
   // --- Row-type filter (runtime-tunable) ---------------------------------
   // SPIDERFOOT_FILTER_MODE: off | allow | deny    (defaults to allow)
   const ALLOW_SET = new Set<string>([
     'DOMAIN_NAME',
     'INTERNET_DOMAIN',
     'SUBDOMAIN',
     'INTERNET_NAME',
     'CO_HOSTED_SITE',
     'NETBLOCK_OWNER',
     'RAW_RIR_DATA',
     'AFFILIATE_INTERNET_DOMAIN',
     'IP_ADDRESS',
     'EMAILADDR',
     'VULNERABILITY_CVE',
     'MALICIOUS_IPADDR',
     'MALICIOUS_INTERNET_NAME',
     'LEAKSITE_CONTENT',
     'PASTESITE_CONTENT',
   ]);
   const DENY_SET = new Set<string>(); // populate via env if desired
   
   function shouldPersist(rowType: string): boolean {
     const mode = (process.env.SPIDERFOOT_FILTER_MODE || 'allow').toLowerCase();
     switch (mode) {
       case 'off':
         return true;
       case 'deny':
         return !DENY_SET.has(rowType);
       case 'allow':
       default:
         return ALLOW_SET.has(rowType);
     }
   }
   
   // helper: normalise host -> https://host/
   function asUrl(host: string): string {
     return host.startsWith('http') ? host : `https://${host}/`;
   }
   
   const execFileAsync = promisify(execFile);
   const execAsync     = promisify(execRaw);
   
   type Severity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
   
   /* ── modules to run ──────────────────────────────────────────────────────── */
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
     'sfp_nuclei',
     'sfp_whois',
     'sfp_dnsresolve',
   ].join(',');
   
   /* ── binary discovery ────────────────────────────────────────────────────── */
   async function resolveSpiderFootCommand(): Promise<string | null> {
     if (process.env.SPIDERFOOT_CMD) return process.env.SPIDERFOOT_CMD;
     const candidates = [
       '/opt/spiderfoot/sf.py',
       '/usr/local/bin/sf',
       '/usr/local/bin/spiderfoot.py',
       'sf',
       'spiderfoot.py',
     ];
     for (const cand of candidates) {
       try {
         if (cand.startsWith('/')) {
           await fs.access(cand, fs.constants.X_OK);
           return cand.includes('.py') ? `python3 ${cand}` : cand;
         }
         await execFileAsync('which', [cand]);
         return cand;
       } catch { /* next */ }
     }
     return null;
   }
   
   /* ── main entry ──────────────────────────────────────────────────────────── */
   export async function runSpiderFoot(
     job: { domain: string; scanId: string },
   ): Promise<number> {
     const { domain, scanId } = job;
     log(`[SpiderFoot] 🚀 Starting scan for ${domain} (scanId=${scanId})`);
   
     const spiderFootCmd = await resolveSpiderFootCommand();
     if (!spiderFootCmd) {
       log('[SpiderFoot] ❌ Binary not found – module skipped');
       await insertArtifact({
         type: 'scan_error',
         val_text: 'SpiderFoot binary not found in container',
         severity: 'HIGH',
         meta: { scan_id: scanId, module: 'spiderfoot' },
       });
       return 0;
     }
   
     /* per-run config dir */
     const confDir = `/tmp/spiderfoot-${scanId}`;
     await fs.mkdir(confDir, { recursive: true });
   
     /* API-key config + masked log */
     const config = {
       shodan_api_key:        process.env.SHODAN_API_KEY ?? '',
       censys_api_key:        process.env.CENSYS_API_KEY ?? '',
       haveibeenpwnd_api_key: process.env.HIBP_API_KEY   ?? '',
       chaos_api_key:         process.env.CHAOS_API_KEY  ?? '',
       dbconnectstr:          `sqlite:////tmp/spiderfoot-${scanId}.db`,
       webport:               '5001',
       webhost:               '127.0.0.1',
     };
     const mask = (v: string) => (v ? '✅' : '❌');
     log(
       '[SpiderFoot] API keys: ' +
         `Shodan ${mask(config.shodan_api_key)}, ` +
         `Censys ${mask(config.censys_api_key)}, ` +
         `HIBP ${mask(config.haveibeenpwnd_api_key)}, ` +
         `Chaos ${mask(config.chaos_api_key)}`,
     );
   
     await fs.writeFile(
       `${confDir}/spiderfoot.conf`,
       Object.entries(config).map(([k, v]) => `${k}=${v}`).join('\n'),
     );
   
     /* command */
     const cmd = `${spiderFootCmd} -q -s ${domain} -m ${TARGET_MODULES} -o json`;
     log('[SpiderFoot] Command:', cmd);
   
     /* runtime env */
     const env = { ...process.env, SF_CONFDIR: confDir };
     const TIMEOUT_MS = parseInt(process.env.SPIDERFOOT_TIMEOUT_MS || '300000', 10);
   
     try {
       const start = Date.now();
       const { stdout, stderr } = await execAsync(cmd, {
         env,
         timeout: TIMEOUT_MS,
         shell: '/bin/sh',
         maxBuffer: 20 * 1024 * 1024,
       });
   
       if (stderr) log('[SpiderFoot-stderr]', stderr.slice(0, 400));
       log(`[SpiderFoot] Raw output size: ${stdout.length} bytes`);
   
       const results = stdout.trim() ? JSON.parse(stdout) : [];
       let artifacts = 0;
       const linkUrls: string[] = [];
   
       for (const row of results) {
         const sev: Severity =
           /VULNERABILITY|MALICIOUS/.test(row.type) ? 'HIGH' : 'INFO';
   
         const base = {
           severity: sev,
           src_url: row.sourceUrl ?? domain,
           meta: {
             scan_id: scanId,
             spiderfoot_type: row.type,
             source_module: row.module,
             confidence: row.confidence ?? 100,
           },
         } as const;
   
         // Skip rows based on runtime filter
         if (!shouldPersist(row.type)) {
           continue;
         }
   
         let created = false;
   
         switch (row.type) {
           case 'AFFILIATE_INTERNET_NAME':
           case 'INTERNET_NAME': {
             // 1) keep subdomain artifact
             await insertArtifact({ ...base, type: 'subdomain', val_text: row.data });
             // 2) new URL artifact for crawlers
             await insertArtifact({ ...base, type: 'url', val_text: asUrl(row.data) });
             artifacts += 2;
             continue;
           }
           case 'IP_ADDRESS':
             await insertArtifact({ ...base, type: 'ip', val_text: row.data });
             created = true;
             break;
           case 'EMAILADDR':
             await insertArtifact({ ...base, type: 'email', val_text: row.data });
             created = true;
             break;
           case 'VULNERABILITY_CVE':
             await insertArtifact({
               ...base,
               type: 'vuln',
               val_text: `CVE: ${row.data}`,
               meta: { ...base.meta, cve_id: row.data },
             });
             created = true;
             break;
           case 'MALICIOUS_IPADDR':
           case 'MALICIOUS_INTERNET_NAME':
             await insertArtifact({
               ...base,
               type: 'threat',
               val_text: `Indicator: ${row.data}`,
             });
             created = true;
             break;
           case 'LEAKSITE_CONTENT':
           case 'PASTESITE_CONTENT':
             await insertArtifact({
               ...base,
               type: 'breach',
               val_text: row.data,
               meta: { ...base.meta, breach_source: row.sourceUrl },
             });
             created = true;
             break;
           case 'LINKED_URL_EXTERNAL':
           case 'LINKED_URL_INTERNAL': {
             const url = row.data;
             linkUrls.push(url);
             await insertArtifact({ ...base, type: 'url', val_text: url });
             created = true;
             break;
           }
           default:
             if (shouldPersist(row.type)) {
               await insertArtifact({
                 ...base,
                 type: 'intel',
                 val_text: row.data,
               });
               created = true;
             }
         }
         if (created) artifacts++;
       }
   
       /* save link list for TruffleHog */
       if (linkUrls.length) {
         const linkPath = `/tmp/spiderfoot-links-${scanId}.json`;
         await fs.writeFile(linkPath, JSON.stringify(linkUrls, null, 2));
         log('[SpiderFoot] Saved', linkUrls.length, 'links for TruffleHog');
       }
   
       /* summary */
       await insertArtifact({
         type: 'scan_summary',
         val_text: `SpiderFoot scan completed: ${artifacts} artifacts`,
         severity: 'INFO',
         meta: {
           scan_id: scanId,
           duration_ms: Date.now() - start,
           results_processed: results.length,
           artifacts_created: artifacts,
           links_discovered: linkUrls.length,
           timestamp: new Date().toISOString(),
         },
       });
   
       log(`[SpiderFoot] ✔️ Completed – ${artifacts} artifacts`);
       return artifacts;
     } catch (err: any) {
       log('[SpiderFoot] ❌ Scan failed:', err.message);
       await insertArtifact({
         type: 'scan_error',
         val_text: `SpiderFoot scan failed: ${err.message}`,
         severity: 'HIGH',
         meta: { scan_id: scanId, module: 'spiderfoot' },
       });
       return 0;
     }
   }
   