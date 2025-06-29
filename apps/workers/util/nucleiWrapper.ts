/**
 * Unified Nuclei v3.4.5 TypeScript Wrapper
 * 
 * Provides a clean interface for all modules to use the unified nuclei script.
 * Eliminates deprecated flags and ensures consistent behavior across all scans.
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as fs from 'node:fs/promises';
import { log as rootLog } from '../core/logger.js';

const execFileAsync = promisify(execFile);

// Base flags applied to every Nuclei execution for consistency
export const NUCLEI_BASE_FLAGS = ['-system-chrome', '-headless', '-insecure', '-silent', '-jsonl'];

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
  systemChrome?: boolean;
  
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

/**
 * Enhanced logging function
 */
const log = (...args: unknown[]) => rootLog('[nucleiWrapper]', ...args);

/**
 * Execute Nuclei using the unified wrapper script
 */
export async function runNuclei(options: NucleiOptions): Promise<NucleiExecutionResult> {
  // Prepend the constant flags
  const args: string[] = [...NUCLEI_BASE_FLAGS];
  
  // Build arguments based on options
  if (options.url) {
    args.push('-u', options.url);
  }
  
  if (options.targetList) {
    args.push('-list', options.targetList);
  }
  
  if (options.templates && options.templates.length > 0) {
    args.push('-t', options.templates.join(','));
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
  
  // Single-dash flag corrections
  if (options.timeout) {
    args.push('-timeout', options.timeout.toString());
  }
  
  if (options.retries) {
    args.push('-retries', options.retries.toString());
  }
  
  if (options.followRedirects) {
    args.push('-follow-redirects');
  }
  
  if (options.maxRedirects) {
    args.push('-max-redirects', options.maxRedirects.toString());
  }
  
  if (options.rateLimit) {
    args.push('-rate-limit', options.rateLimit.toString());
  }
  
  if (options.bulkSize) {
    args.push('-bulk-size', options.bulkSize.toString());
  }
  
  if (options.disableClustering) {
    args.push('-disable-clustering');
  }
  
  if (options.stats) {
    args.push('-stats');
  }
  
  if (options.debug) {
    args.push('-debug');
  }
  
  if (options.httpProxy) {
    args.push('-proxy', options.httpProxy);
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