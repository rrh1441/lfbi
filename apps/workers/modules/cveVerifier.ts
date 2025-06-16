/* ============================================================================
 * MODULE: cveVerifier.ts  (v1.0 – Automated CVE applicability testing)
 * Requires: axios ^1.7, globby ^14, child_process, util
 * ========================================================================== */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import axios from 'axios';
import { glob } from 'glob';
import { log as rootLog } from '../core/logger.js';

const exec = promisify(execFile);
const log = (...args: unknown[]) => rootLog('[cveVerifier]', ...args);

export interface CVECheckInput {
  host: string;          // https://74.208.42.246:443
  serverBanner: string;  // "Apache/2.4.62 (Ubuntu)"
  cves: string[];        // [ 'CVE-2020-11023', 'CVE-2021-40438' ]
}

export interface CVECheckResult {
  id: string;
  fixedIn?: string;      // e.g. "2.4.64-1ubuntu2.4"
  verified: boolean;     // exploit actually worked
  suppressed: boolean;   // ruled out by version mapping
  error?: string;        // execution / template error
}

// Cache for vendor fix data
const ubuntuFixCache = new Map<string, string | undefined>();
const nucleiTemplateCache = new Map<string, string | undefined>();

/* ------------------------------------------------------------------------ */
/* 1.  Distribution-level version mapping                                   */
/* ------------------------------------------------------------------------ */

async function getUbuntuFixedVersion(cve: string): Promise<string | undefined> {
  // Check cache first
  if (ubuntuFixCache.has(cve)) {
    return ubuntuFixCache.get(cve);
  }

  try {
    log(`Checking Ubuntu fix data for ${cve}`);
    const { data } = await axios.get(
      `https://ubuntu.com/security/${cve}.json`,
      { timeout: 8000 }
    );
    // API returns { packages:[{fixed_version:'2.4.52-1ubuntu4.4', ...}] }
    const httpd = data.packages?.find((p: any) => p.name === 'apache2');
    const fixedVersion = httpd?.fixed_version;
    
    // Cache the result
    ubuntuFixCache.set(cve, fixedVersion);
    
    if (fixedVersion) {
      log(`Ubuntu fix found for ${cve}: ${fixedVersion}`);
    } else {
      log(`No Ubuntu fix data found for ${cve}`);
    }
    
    return fixedVersion;
  } catch (error) {
    log(`Error fetching Ubuntu fix data for ${cve}: ${(error as Error).message}`);
    ubuntuFixCache.set(cve, undefined);
    return undefined;
  }
}

async function getRHELFixedVersion(cve: string): Promise<string | undefined> {
  try {
    // RHEL/CentOS security data - simplified approach
    const { data } = await axios.get(
      `https://access.redhat.com/hydra/rest/securitydata/cve/${cve}.json`,
      { timeout: 8000 }
    );
    
    // Look for httpd package fixes
    const httpdFix = data.affected_packages?.find((pkg: any) => 
      pkg.package_name?.includes('httpd')
    );
    
    return httpdFix?.fixed_in_version;
  } catch {
    return undefined;
  }
}

async function isVersionPatched(
  bannerVersion: string | undefined,
  fixed: string | undefined
): Promise<boolean> {
  if (!bannerVersion || !fixed) return false;
  
  // Very light semver comparison – works for x.y.z-ubuntuN
  const norm = (v: string) => {
    const cleaned = v.split('-')[0].split('~')[0]; // strip "-ubuntu..." and "~" 
    const parts = cleaned.split('.').map(Number);
    return { major: parts[0] || 0, minor: parts[1] || 0, patch: parts[2] || 0 };
  };
  
  const current = norm(bannerVersion);
  const fixedVer = norm(fixed);
  
  // Compare versions
  if (current.major > fixedVer.major) return true;
  if (current.major < fixedVer.major) return false;
  
  if (current.minor > fixedVer.minor) return true;
  if (current.minor < fixedVer.minor) return false;
  
  return current.patch >= fixedVer.patch;
}

/* ------------------------------------------------------------------------ */
/* 2.  Active exploit probe via Nuclei                                      */
/* ------------------------------------------------------------------------ */

async function nucleiSupports(cve: string): Promise<string | undefined> {
  // Check cache first
  if (nucleiTemplateCache.has(cve)) {
    return nucleiTemplateCache.get(cve);
  }

  try {
    // Look for nuclei templates in common locations
    const patterns = await glob(`**/${cve}.yaml`, {
      cwd: process.env.HOME || '.',
      ignore: ['node_modules/**', '.git/**']
    });
    
    // Prefer nuclei-templates directory structure
    const preferred = patterns.find((p: string) => 
      p.includes('nuclei-templates') && (
        p.includes('/cves/') || 
        p.includes('/http/') ||
        p.includes('/vulnerabilities/')
      )
    );
    
    const templatePath = preferred || patterns[0];
    
    // Cache the result
    nucleiTemplateCache.set(cve, templatePath);
    
    if (templatePath) {
      log(`Found Nuclei template for ${cve}: ${templatePath}`);
    } else {
      log(`No Nuclei template found for ${cve}`);
    }
    
    return templatePath;
  } catch (error) {
    log(`Error searching for Nuclei template ${cve}: ${(error as Error).message}`);
    nucleiTemplateCache.set(cve, undefined);
    return undefined;
  }
}

async function runNuclei(
  host: string,
  template: string
): Promise<boolean> {
  try {
    log(`Running Nuclei template ${template} against ${host}`);
    
    const { stdout } = await exec(
      'nuclei',
      ['-t', template, '-target', host, '-json', '-silent', '-rate-limit', '5'],
      { timeout: 15_000 }
    );
    
    const hasMatch = stdout.trim().length > 0;
    
    if (hasMatch) {
      log(`Nuclei confirmed vulnerability: ${template} matched ${host}`);
    } else {
      log(`Nuclei found no vulnerability: ${template} did not match ${host}`);
    }
    
    return hasMatch;
  } catch (error) {
    log(`Nuclei execution failed for ${template}: ${(error as Error).message}`);
    return false;
  }
}

/* ------------------------------------------------------------------------ */
/* 3.  Enhanced version parsing and service detection                       */
/* ------------------------------------------------------------------------ */

function extractServiceInfo(banner: string): { service: string; version: string } | null {
  // Apache patterns
  const apacheMatch = banner.match(/Apache\/(\d+\.\d+\.\d+)/i);
  if (apacheMatch) {
    return { service: 'apache', version: apacheMatch[1] };
  }
  
  // Nginx patterns
  const nginxMatch = banner.match(/nginx\/(\d+\.\d+\.\d+)/i);
  if (nginxMatch) {
    return { service: 'nginx', version: nginxMatch[1] };
  }
  
  // IIS patterns
  const iisMatch = banner.match(/IIS\/(\d+\.\d+)/i);
  if (iisMatch) {
    return { service: 'iis', version: iisMatch[1] };
  }
  
  return null;
}

/* ------------------------------------------------------------------------ */
/* 4.  Public API                                                           */
/* ------------------------------------------------------------------------ */

export async function verifyCVEs(
  opts: CVECheckInput
): Promise<CVECheckResult[]> {
  const results: CVECheckResult[] = [];
  
  log(`Starting CVE verification for ${opts.host} with ${opts.cves.length} CVEs`);
  
  // Extract service and version information
  const serviceInfo = extractServiceInfo(opts.serverBanner);
  const bannerVersion = serviceInfo?.version;
  
  if (!bannerVersion) {
    log(`Could not extract version from banner: ${opts.serverBanner}`);
  }

  for (const id of opts.cves) {
    const res: CVECheckResult = { id, verified: false, suppressed: false };

    try {
      // ---- Layer 1: Version-fix mapping ---------------------------------
      log(`Checking fix status for ${id}`);
      
      const [ubuntuFix, rhelFix] = await Promise.all([
        getUbuntuFixedVersion(id),
        getRHELFixedVersion(id)
      ]);
      
      // Use the first available fix version
      const fixed = ubuntuFix || rhelFix;
      res.fixedIn = fixed;
      
      if (fixed && bannerVersion) {
        res.suppressed = await isVersionPatched(bannerVersion, fixed);
        
        if (res.suppressed) {
          log(`CVE ${id} suppressed: version ${bannerVersion} >= fixed version ${fixed}`);
          results.push(res);
          continue;
        }
      }

      // ---- Layer 2: Active exploit probe --------------------------------
      log(`Checking for Nuclei template for ${id}`);
      
      const template = await nucleiSupports(id);
      if (!template) {
        log(`No Nuclei template available for ${id}, keeping in results`);
        results.push(res);
        continue;
      }
      
      // Run the exploit probe
      res.verified = await runNuclei(opts.host, template);
      
      if (res.verified) {
        log(`CVE ${id} VERIFIED: exploit successful`);
      } else {
        log(`CVE ${id} not exploitable via Nuclei template`);
      }
      
      results.push(res);
      
    } catch (error) {
      res.error = (error as Error).message;
      log(`Error processing CVE ${id}: ${res.error}`);
      results.push(res);
    }
  }
  
  const suppressed = results.filter(r => r.suppressed).length;
  const verified = results.filter(r => r.verified).length;
  const total = results.length;
  
  log(`CVE verification complete: ${total} total, ${suppressed} suppressed, ${verified} verified`);
  
  return results;
}

/**
 * Convenience function to get common CVE lists for services
 */
export function getCommonCVEsForService(service: string, version: string): string[] {
  const serviceCVEs: Record<string, string[]> = {
    apache: [
      'CVE-2021-40438', // Apache HTTP Server 2.4.48 and earlier SSRF
      'CVE-2021-41773', // Apache HTTP Server 2.4.49 Path Traversal  
      'CVE-2021-42013', // Apache HTTP Server 2.4.50 Path Traversal
      'CVE-2020-11993', // Apache HTTP Server 2.4.43 and earlier
      'CVE-2019-0190',  // Apache HTTP Server 2.4.17 to 2.4.38
      'CVE-2020-11023'  // jQuery (if mod_proxy_html enabled)
    ],
    nginx: [
      'CVE-2021-23017', // Nginx resolver off-by-one
      'CVE-2019-20372', // Nginx HTTP/2 implementation 
      'CVE-2017-7529'   // Nginx range filter integer overflow
    ],
    iis: [
      'CVE-2021-31207', // Microsoft IIS Server Elevation of Privilege
      'CVE-2020-0618',  // Microsoft IIS Server Remote Code Execution
      'CVE-2017-7269'   // Microsoft IIS 6.0 WebDAV ScStoragePathFromUrl
    ]
  };
  
  return serviceCVEs[service.toLowerCase()] || [];
}

/**
 * Extract CVE IDs from Nuclei JSON output  
 */
export function extractCVEsFromNucleiOutput(nucleiJson: string): string[] {
  const cves = new Set<string>();
  
  try {
    const lines = nucleiJson.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const result = JSON.parse(line);
      
      // Extract CVE from template-id or info.reference
      const templateId = result['template-id'] || result.templateID;
      const references = result.info?.reference || [];
      
      // Check template ID for CVE pattern
      const cveMatch = templateId?.match(/CVE-\d{4}-\d{4,}/);
      if (cveMatch) {
        cves.add(cveMatch[0]);
      }
      
      // Check references array
      if (Array.isArray(references)) {
        references.forEach((ref: string) => {
          const refCveMatch = ref.match(/CVE-\d{4}-\d{4,}/);
          if (refCveMatch) {
            cves.add(refCveMatch[0]);
          }
        });
      }
    }
  } catch (error) {
    log(`Error parsing Nuclei output for CVE extraction: ${(error as Error).message}`);
  }
  
  return Array.from(cves);
}

export default { verifyCVEs, getCommonCVEsForService, extractCVEsFromNucleiOutput };