// EPSS (Exploit Prediction Scoring System) enrichment client
import axios from 'axios';
import type { UnifiedCache, CacheKey } from '../techCache/index.js';
import { log as rootLog } from '../../core/logger.js';

const log = (...m: unknown[]) => rootLog('[epssEnrichment]', ...m);

export interface EPSSConfig {
  apiTimeout: number;
  batchSize: number;
  cache: UnifiedCache;
}

export class EPSSEnrichment {
  constructor(private config: EPSSConfig) {}

  async getEPSSScores(cveIds: string[]): Promise<Map<string, number>> {
    const uncached = cveIds.filter(async id => {
      const cacheKey: CacheKey = { type: 'epss', cveId: id };
      return await this.config.cache.get(cacheKey) === null;
    });
    
    const batched: Map<string, number> = new Map();
    
    // Already cached results
    for (const id of cveIds) {
      const cacheKey: CacheKey = { type: 'epss', cveId: id };
      const cached = await this.config.cache.get<number>(cacheKey);
      if (cached !== null) {
        batched.set(id, cached ?? 0);
      }
    }
    
    // Batch query first.org 100‑ids per request
    for (let i = 0; i < uncached.length; i += this.config.batchSize) {
      const chunk = uncached.slice(i, i + this.config.batchSize);
      try {
        const { data } = await axios.get(
          `https://api.first.org/data/v1/epss?cve=${chunk.join(',')}`, 
          { timeout: this.config.apiTimeout }
        );
        
        (data.data as any[]).forEach((d: any) => {
          const score = Number(d.epss) || 0;
          const cacheKey: CacheKey = { type: 'epss', cveId: d.cve };
          this.config.cache.set(cacheKey, score);
          batched.set(d.cve, score);
        });
        
        log(`epss=batch chunk=${chunk.length} found=${data.data?.length || 0}`);
      } catch (error) {
        log(`epss=error chunk=${chunk.join(',')} error="${(error as Error).message}"`);
        // Cache empty results to avoid re-querying
        chunk.forEach(cveId => {
          const cacheKey: CacheKey = { type: 'epss', cveId };
          this.config.cache.set(cacheKey, 0);
          batched.set(cveId, 0);
        });
      }
    }
    
    return batched;
  }
} 