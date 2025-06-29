/**
 * Enhanced Nuclei v3.4.5 TypeScript Wrapper with Two-Pass Scanning
 * 
 * Provides a clean interface for all modules to use the unified nuclei script.
 * Implements ChatGPT-recommended two-pass scanning approach:
 * 1. Baseline scan with core tags for general vulnerabilities
 * 2. Technology-specific scan based on detected technologies
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as fs from 'node:fs/promises';
import { log as rootLog } from '../core/logger.js';

const execFileAsync = promisify(execFile);

// Base flags applied to every Nuclei execution for consistency
export const NUCLEI_BASE_FLAGS = ['-headless', '-silent', '-jsonl'];

// ═══════════════════════════════════════════════════════════════════════════════
// Two-Pass Scanning Configuration (ChatGPT Recommended)
// ═══════════════════════════════════════════════════════════════════════════════

// Baseline tags run on EVERY target for general security assessment
export const BASELINE_TAGS = [
  'misconfiguration',
  'default-logins', 
  'exposed-panels',
  'exposure',
  'tech'
];

// General vulnerability tags for second pass
export const GENERAL_VULN_TAGS = [
  'cve',
  'rce', 
  'sqli',
  'xss',
  'lfi',
  'rfi',
  'dos'
];

// Technology-specific tag mapping (enhanced based on ChatGPT recommendations)
export const TECH_TAG_MAPPING: Record<string, string[]> = {
  // Web Servers
  'apache': ['apache'],
  'nginx': ['nginx'],
  'iis': ['iis'],
  'httpd': ['apache'], // Apache httpd
  
  // Programming Languages & Frameworks
  'php': ['php'],
  'nodejs': ['nodejs', 'express'],
  'node.js': ['nodejs', 'express'],
  'express': ['nodejs', 'express'],
  'laravel': ['laravel', 'symfony'],
  'symfony': ['laravel', 'symfony'],
  'django': ['django'],
  'flask': ['flask'],
  'ruby': ['ruby', 'rails'],
  'rails': ['ruby', 'rails'],
  
  // Content Management Systems
  'wordpress': ['wordpress', 'wp-plugin', 'wp-theme'],
  'drupal': ['drupal'],
  'joomla': ['joomla'],
  'magento': ['magento'],
  
  // Application Servers
  'tomcat': ['tomcat', 'jboss', 'weblogic'],
  'jboss': ['tomcat', 'jboss', 'weblogic'],
  'weblogic': ['tomcat', 'jboss', 'weblogic'],
  
  // Databases
  'mysql': ['mysql'],
  'mariadb': ['mysql'],
  'postgresql': ['postgresql'],
  'postgres': ['postgresql'],
  
  // Search & Analytics
  'elasticsearch': ['elastic', 'kibana'],
  'elastic': ['elastic', 'kibana'],
  'kibana': ['elastic', 'kibana'],
  
  // Network Services
  'ssh': ['ssh'],
  'openssh': ['ssh'],
  'dropbear': ['ssh'],
  
  // Other Technologies
  'docker': ['docker'],
  'kubernetes': ['kubernetes'],
  'jenkins': ['jenkins'],
  'confluence': ['confluence'],
  'jira': ['jira']
};

interface NucleiOptions {
  // Target specification
  url?: string;
  targetList?: string;
  
  // Template specification  
  templates?: string[];
  tags?: string[];
  
  // Output options
  output?: string;
  jsonl?: boolean;
  silent?: boolean;
  verbose?: boolean;
  
  // Execution options
  concurrency?: number;
  timeout?: number;
  retries?: number;
  
  // Browser options
  headless?: boolean;
  
  // Security options
  insecure?: boolean;
  followRedirects?: boolean;
  maxRedirects?: number;
  
  // Performance options
  rateLimit?: number;
  bulkSize?: number;
  disableClustering?: boolean;
  
  // Debug options
  stats?: boolean;
  debug?: boolean;
  
  // Environment
  httpProxy?: string;
  updateTemplates?: boolean;
}

interface NucleiResult {
  template: string;
  'template-url': string;
  'template-id': string;
  'template-path': string;
  info: {
    name: string;
    author: string[];
    tags: string[];
    description?: string;
    reference?: string[];
    severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
    classification?: {
      'cvss-metrics'?: string;
      'cvss-score'?: number;
      'cve-id'?: string;
      'cwe-id'?: string;
      epss?: {
        score: number;
        percentile: number;
      };
    };
  };
  type: string;
  host: string;
  'matched-at': string;
  'extracted-results'?: string[];
  'curl-command'?: string;
  matcher?: {
    name: string;
    status: number;
  };
  timestamp: string;
}

interface NucleiExecutionResult {
  results: NucleiResult[];
  stdout: string;
  stderr: string;
  exitCode: number;
  success: boolean;
}

interface TwoPassScanResult {
  baselineResults: NucleiResult[];
  techSpecificResults: NucleiResult[];
  detectedTechnologies: string[];
  totalFindings: number;
  scanDurationMs: number;
}

/**
 * Enhanced logging function
 */
const log = (...args: unknown[]) => rootLog('[nucleiWrapper]', ...args);

/**
 * Execute Nuclei using the unified wrapper script
 */
export async function runNuclei(options: NucleiOptions): Promise<NucleiExecutionResult> {
  // Build arguments - only include what we need
  const args: string[] = ['-headless', '-silent', '-jsonl', '-insecure'];
  
  if (options.url) {
    args.push('-u', options.url);
  }
  
  if (options.targetList) {
    args.push('-list', options.targetList);
  }
  
  if (options.templates && options.templates.length > 0) {
    for (const template of options.templates) {
      args.push('-t', template);
    }
  }
  
  if (options.tags && options.tags.length > 0) {
    args.push('-tags', options.tags.join(','));
  }
  
  if (options.output) {
    args.push('-o', options.output);
  }
  
  if (options.verbose) {
    args.push('-verbose');
  }
  
  if (options.concurrency) {
    args.push('-c', options.concurrency.toString());
  }
  
  if (options.timeout) {
    args.push('-timeout', options.timeout.toString());
  }
  
  if (options.retries) {
    args.push('-retries', options.retries.toString());
  }
  
  if (options.updateTemplates) {
    args.push('-update-templates');
  }
  
  log(`Executing unified nuclei: run_nuclei ${args.join(' ')}`);
  
  let stdout = '';
  let stderr = '';
  let exitCode = 0;
  let success = false;
  
  try {
    const result = await execFileAsync('run_nuclei', args, {
      timeout: (options.timeout || 30) * 1000, // Convert to ms
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer
      env: { ...process.env, NO_COLOR: '1' }
    });
    
    stdout = result.stdout;
    stderr = result.stderr;
    exitCode = 0;
    success = true;
    
  } catch (error: any) {
    stdout = error.stdout || '';
    stderr = error.stderr || '';
    exitCode = error.code || 1;
    
    // Only exit code 0 is success in v3.4.5
    log(`Nuclei execution failed with exit code ${exitCode}: ${error.message}`);
    success = false;
  }
  
  // Log stderr if present (may contain warnings)
  if (stderr) {
    log(`Nuclei stderr: ${stderr}`);
  }
  
  // Parse JSONL results
  const results: NucleiResult[] = [];
  if (stdout.trim()) {
    const lines = stdout.trim().split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      // Skip non-JSON lines (banners, warnings, etc.)
      if (!line.startsWith('{')) continue;
      
      try {
        const result = JSON.parse(line) as NucleiResult;
        results.push(result);
      } catch (parseError) {
        log(`Failed to parse Nuclei result line: ${line.slice(0, 200)}`);
      }
    }
  }
  
  log(`Nuclei execution completed: ${results.length} results, exit code ${exitCode}`);
  
  return {
    results,
    stdout,
    stderr,
    exitCode,
    success
  };
}

/**
 * Convenience function for simple URL scanning with tags
 */
export async function scanUrl(
  url: string, 
  tags: string[], 
  options: Partial<NucleiOptions> = {}
): Promise<NucleiExecutionResult> {
  return runNuclei({
    url,
    tags,
    timeout: 30,
    retries: 2,
    concurrency: 6,
    ...options
  });
}

/**
 * Convenience function for scanning a list of targets
 */
export async function scanTargetList(
  targetFile: string,
  templates: string[],
  options: Partial<NucleiOptions> = {}
): Promise<NucleiExecutionResult> {
  return runNuclei({
    targetList: targetFile,
    templates,
    timeout: 30,
    retries: 2,
    concurrency: 6,
    ...options
  });
}

/**
 * Create a temporary targets file from array of URLs
 */
export async function createTargetsFile(targets: string[], prefix = 'nuclei-targets'): Promise<string> {
  const filename = `/tmp/${prefix}-${Date.now()}.txt`;
  await fs.writeFile(filename, targets.join('\n'));
  return filename;
}

/**
 * Cleanup temporary files
 */
export async function cleanupFile(filepath: string): Promise<void> {
  try {
    await fs.unlink(filepath);
  } catch (error) {
    // Ignore cleanup errors
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Two-Pass Scanning Implementation
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Extract technology names from baseline scan results
 */
export function extractTechnologies(baselineResults: NucleiResult[]): string[] {
  const technologies = new Set<string>();
  
  for (const result of baselineResults) {
    const tags = result.info?.tags || [];
    const templateId = result['template-id'] || '';
    const name = result.info?.name?.toLowerCase() || '';
    
    // Extract from tags
    for (const tag of tags) {
      const lowerTag = tag.toLowerCase();
      if (TECH_TAG_MAPPING[lowerTag]) {
        technologies.add(lowerTag);
      }
    }
    
    // Extract from template ID and name
    const textToCheck = `${templateId} ${name}`.toLowerCase();
    for (const tech of Object.keys(TECH_TAG_MAPPING)) {
      if (textToCheck.includes(tech)) {
        technologies.add(tech);
      }
    }
    
    // Extract from extracted results (version info, etc.)
    const extractedResults = result['extracted-results'] || [];
    for (const extracted of extractedResults) {
      if (typeof extracted === 'string') {
        const lowerExtracted = extracted.toLowerCase();
        for (const tech of Object.keys(TECH_TAG_MAPPING)) {
          if (lowerExtracted.includes(tech)) {
            technologies.add(tech);
          }
        }
      }
    }
  }
  
  return Array.from(technologies);
}

/**
 * Build technology-specific tags based on detected technologies
 */
export function buildTechSpecificTags(detectedTechnologies: string[]): string[] {
  const techTags = new Set<string>();
  
  // Add general vulnerability tags
  GENERAL_VULN_TAGS.forEach(tag => techTags.add(tag));
  
  // Add technology-specific tags
  for (const tech of detectedTechnologies) {
    const tags = TECH_TAG_MAPPING[tech.toLowerCase()];
    if (tags) {
      tags.forEach(tag => techTags.add(tag));
    }
  }
  
  return Array.from(techTags);
}

/**
 * Perform two-pass nuclei scan: baseline + technology-specific
 */
export async function runTwoPassScan(
  target: string,
  options: Partial<NucleiOptions> = {}
): Promise<TwoPassScanResult> {
  const startTime = Date.now();
  log(`Starting two-pass scan for ${target}`);
  
  // ─────────────── PASS 1: Baseline Scan ───────────────
  log(`Pass 1: Running baseline scan with tags: ${BASELINE_TAGS.join(',')}`);
  
  const baselineScan = await runNuclei({
    url: target,
    tags: BASELINE_TAGS,
    timeout: 30,
    retries: 2,
    concurrency: 6,
    ...options
  });
  
  if (!baselineScan.success) {
    log(`Baseline scan failed for ${target}: exit code ${baselineScan.exitCode}`);
    return {
      baselineResults: [],
      techSpecificResults: [],
      detectedTechnologies: [],
      totalFindings: 0,
      scanDurationMs: Date.now() - startTime
    };
  }
  
  // ─────────────── Technology Detection ───────────────
  const detectedTechnologies = extractTechnologies(baselineScan.results);
  log(`Detected technologies: ${detectedTechnologies.join(', ') || 'none'}`);
  
  if (detectedTechnologies.length === 0) {
    log(`No technologies detected, skipping second pass`);
    return {
      baselineResults: baselineScan.results,
      techSpecificResults: [],
      detectedTechnologies: [],
      totalFindings: baselineScan.results.length,
      scanDurationMs: Date.now() - startTime
    };
  }
  
  // ─────────────── PASS 2: Technology-Specific Scan ───────────────
  const techTags = buildTechSpecificTags(detectedTechnologies);
  log(`Pass 2: Running tech-specific scan with tags: ${techTags.join(',')}`);
  
  const techScan = await runNuclei({
    url: target,
    tags: techTags,
    timeout: 30,
    retries: 2,
    concurrency: 6,
    ...options
  });
  
  if (!techScan.success) {
    log(`Technology-specific scan failed for ${target}: exit code ${techScan.exitCode}`);
  }
  
  const totalFindings = baselineScan.results.length + (techScan.success ? techScan.results.length : 0);
  
  log(`Two-pass scan completed: ${totalFindings} total findings (baseline: ${baselineScan.results.length}, tech-specific: ${techScan.success ? techScan.results.length : 0})`);
  
  return {
    baselineResults: baselineScan.results,
    techSpecificResults: techScan.success ? techScan.results : [],
    detectedTechnologies,
    totalFindings,
    scanDurationMs: Date.now() - startTime
  };
}

/**
 * Perform two-pass scan on multiple targets
 */
export async function runTwoPassScanMultiple(
  targets: string[],
  options: Partial<NucleiOptions> = {}
): Promise<TwoPassScanResult> {
  const startTime = Date.now();
  log(`Starting two-pass scan for ${targets.length} targets`);
  
  const allBaselineResults: NucleiResult[] = [];
  const allTechResults: NucleiResult[] = [];
  const allDetectedTechs = new Set<string>();
  
  for (const target of targets) {
    try {
      const result = await runTwoPassScan(target, options);
      allBaselineResults.push(...result.baselineResults);
      allTechResults.push(...result.techSpecificResults);
      result.detectedTechnologies.forEach(tech => allDetectedTechs.add(tech));
    } catch (error) {
      log(`Failed to scan ${target}: ${(error as Error).message}`);
    }
  }
  
  return {
    baselineResults: allBaselineResults,
    techSpecificResults: allTechResults,
    detectedTechnologies: Array.from(allDetectedTechs),
    totalFindings: allBaselineResults.length + allTechResults.length,
    scanDurationMs: Date.now() - startTime
  };
}

/**
 * Enhanced scan function that automatically uses two-pass approach
 */
export async function scanUrlEnhanced(
  url: string,
  options: Partial<NucleiOptions> = {}
): Promise<TwoPassScanResult> {
  return runTwoPassScan(url, options);
}

/**
 * Enhanced scan function for target lists with two-pass approach
 */
export async function scanTargetListEnhanced(
  targetFile: string,
  options: Partial<NucleiOptions> = {}
): Promise<TwoPassScanResult> {
  // Read targets from file
  const targetsContent = await fs.readFile(targetFile, 'utf-8');
  const targets = targetsContent.split('\n').filter(line => line.trim());
  
  return runTwoPassScanMultiple(targets, options);
}