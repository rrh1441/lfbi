/**
 * TypeScript wrapper for the Python WHOIS resolver (RDAP + Whoxy)
 * Provides 87% cost savings vs WhoisXML
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

interface WhoisRecord {
  domain: string;
  registrant_name?: string;
  registrant_org?: string;
  registrar?: string;
  creation_date?: string;
  source: 'rdap' | 'whoxy';
  fetched_at: string;
}

interface WhoisStats {
  rdap_calls: number;
  whoxy_calls: number;
  estimated_cost: number;
  saved_vs_whoisxml: number;
}

/**
 * Resolve WHOIS data for multiple domains using hybrid RDAP+Whoxy approach
 * Cost: ~$0.002/call (vs $0.015/call for WhoisXML) = 87% savings
 */
export async function resolveWhoisBatch(domains: string[]): Promise<{ records: WhoisRecord[]; stats: WhoisStats }> {
  if (!process.env.WHOXY_API_KEY) {
    log('[whoisWrapper] WHOXY_API_KEY not set - WHOIS resolution disabled');
    return { 
      records: domains.map(d => ({
        domain: d,
        source: 'rdap' as const,
        fetched_at: new Date().toISOString()
      })),
      stats: { rdap_calls: 0, whoxy_calls: 0, estimated_cost: 0, saved_vs_whoisxml: 0 }
    };
  }

  const tempFile = join('/tmp', `whois_domains_${Date.now()}.json`);
  
  try {
    // Write domains to temp file
    await writeFile(tempFile, JSON.stringify(domains));
    
    // Call Python resolver
    const pythonScript = join(process.cwd(), 'apps/workers/modules/whoisResolver.py');
    const { stdout, stderr } = await exec('python3', ['-c', `
import json
import asyncio
import sys
sys.path.append('${process.cwd()}/apps/workers/modules')
from whoisResolver import WhoisResolver

async def main():
    with open('${tempFile}', 'r') as f:
        domains = json.load(f)
    
    resolver = WhoisResolver()
    records = await resolver.resolve_many(domains)
    
    # Convert dataclass to dict
    result = []
    for record in records:
        result.append({
            'domain': record.domain,
            'registrant_name': record.registrant_name,
            'registrant_org': record.registrant_org,
            'registrar': record.registrar,
            'creation_date': record.creation_date,
            'source': record.source,
            'fetched_at': record.fetched_at.isoformat()
        })
    
    # Print stats and results
    print(json.dumps({
        'records': result,
        'stats': {
            'rdap_calls': resolver.rdap_calls,
            'whoxy_calls': resolver.whoxy_calls,
            'estimated_cost': resolver.whoxy_calls * 0.002,
            'saved_vs_whoisxml': len(domains) * 0.015 - (resolver.whoxy_calls * 0.002)
        }
    }))

asyncio.run(main())
    `], { timeout: 60_000 });

    if (stderr) {
      log('[whoisWrapper] Python stderr:', stderr);
    }

    const result = JSON.parse(stdout);
    
    log(`[whoisWrapper] WHOIS resolution: ${result.stats.rdap_calls} RDAP (free) + ${result.stats.whoxy_calls} Whoxy (~$${result.stats.estimated_cost.toFixed(3)})`);
    log(`[whoisWrapper] Saved $${result.stats.saved_vs_whoisxml.toFixed(3)} vs WhoisXML`);
    
    return result;
    
  } catch (error) {
    log('[whoisWrapper] Error resolving WHOIS data:', (error as Error).message);
    
    // Fallback to empty records
    return {
      records: domains.map(d => ({
        domain: d,
        source: 'rdap' as const,
        fetched_at: new Date().toISOString()
      })),
      stats: { rdap_calls: 0, whoxy_calls: 0, estimated_cost: 0, saved_vs_whoisxml: 0 }
    };
    
  } finally {
    // Cleanup temp file
    await unlink(tempFile).catch(() => {});
  }
}

/**
 * Legacy single domain resolver for backward compatibility
 */
export async function resolveWhoisSingle(domain: string): Promise<WhoisRecord | null> {
  const result = await resolveWhoisBatch([domain]);
  return result.records[0] || null;
}