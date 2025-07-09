/**
 * ggshield runner utility for lightweight secret scanning
 * Replaces TruffleHog for web assets to reduce memory usage
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

export interface GGShieldResult {
  policy_break_count: number;
  policy_breaks: GGShieldPolicyBreak[];
  secrets_engine_version: string;
}

export interface GGShieldPolicyBreak {
  policy: string;
  break_type: string;
  matches: GGShieldMatch[];
}

export interface GGShieldMatch {
  match: string;
  match_type: string;
  line_start: number;
  line_end: number;
  column_start: number;
  column_end: number;
  detector: {
    name: string;
    display_name: string;
  };
  validity: string;
}

/**
 * Scan buffer content with ggshield for secrets
 * @param buffer - Content to scan as Buffer
 * @returns JSON output from ggshield
 */
export async function ggshieldScan(buffer: Buffer): Promise<string> {
  try {
    log('[ggshield] Scanning buffer of', buffer.length, 'bytes');
    
    // Use spawn with stdin instead of exec with input
    const { spawn } = await import('node:child_process');
    
    return new Promise((resolve, reject) => {
      const child = spawn('bash', ['-c', 'ggshield secret scan stdin --json --no-banner'], {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      let stdout = '';
      let stderr = '';
      
      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      
      child.on('close', (code) => {
        if (stderr) {
          log('[ggshield] [STDERR]:', stderr);
        }
        
        // ggshield returns non-zero exit code when secrets are found
        if (code === 0 || code === 1) {
          resolve(stdout);
        } else {
          log('[ggshield] [ERROR] Process exited with code:', code);
          resolve(''); // Return empty string on error
        }
      });
      
      child.on('error', (error) => {
        log('[ggshield] [ERROR]:', error.message);
        resolve(''); // Return empty string on error
      });
      
      // Write buffer to stdin and close
      child.stdin.write(buffer);
      child.stdin.end();
      
      // Set timeout
      setTimeout(() => {
        child.kill();
        resolve('');
      }, 30000);
    });
  } catch (error) {
    log('[ggshield] [ERROR]:', (error as Error).message);
    return ''; // Return empty string on error to avoid breaking the pipeline
  }
}

/**
 * Parse ggshield JSON output and convert to TruffleHog-compatible format
 * This maintains compatibility with existing processTrufflehogOutput function
 * @param ggshieldOutput - JSON output from ggshield
 * @returns TruffleHog-compatible JSON lines
 */
export function convertGGShieldToTruffleHogFormat(ggshieldOutput: string): string {
  if (!ggshieldOutput.trim()) {
    return '';
  }
  
  try {
    const result: GGShieldResult = JSON.parse(ggshieldOutput);
    const truffleHogLines: string[] = [];
    
    for (const policyBreak of result.policy_breaks) {
      for (const match of policyBreak.matches) {
        // Convert ggshield match to TruffleHog format
        const truffleHogMatch = {
          DetectorName: match.detector.display_name || match.detector.name,
          Raw: match.match,
          Verified: match.validity === 'valid',
          SourceMetadata: {
            Data: {
              Filesystem: {
                file: 'web_asset',
                line: match.line_start
              }
            }
          }
        };
        
        truffleHogLines.push(JSON.stringify(truffleHogMatch));
      }
    }
    
    return truffleHogLines.join('\n');
  } catch (error) {
    log('[ggshield] [ERROR] Failed to parse ggshield output:', (error as Error).message);
    return '';
  }
}

/**
 * Complete ggshield scan with format conversion
 * @param buffer - Content to scan
 * @returns TruffleHog-compatible JSON output
 */
export async function ggshieldScanAndConvert(buffer: Buffer): Promise<string> {
  const ggshieldOutput = await ggshieldScan(buffer);
  return convertGGShieldToTruffleHogFormat(ggshieldOutput);
}