/* =============================================================================
 * MODULE: techDetection/fastDetection.ts
 * =============================================================================
 * Fast technology detection using WebTech/FastTech wrapper.
 * Provides batch processing and result normalization.
 * =============================================================================
 */

import pLimit from 'p-limit';
import { detectTechnologiesFast as fastTechDetect, detectMultipleUrlsFast, type FastTechResult } from '../../util/fastTechDetection.js';
import { normalizeTechnology } from '../../util/cpeNormalization.js';
import { log as rootLog } from '../../core/logger.js';
import type { WappTech, TechDetectionConfig } from './index.js';

const log = (...m: unknown[]) => rootLog('[fastDetection]', ...m);

// ───────────────── Types ────────────────────────────────────────────────────
export interface FastDetectionResult {
  url: string;
  technologies: WappTech[];
  duration: number;
  error?: string;
}

// ───────────────── Conversion Helper ─────────────────────────────────────────
function convertFastTechToWappTech(fastTech: FastTechResult): WappTech {
  // Normalize the technology to get CPE/PURL identifiers
  const normalized = normalizeTechnology(
    fastTech.name,
    fastTech.version,
    fastTech.confidence,
    'webtech'
  );
  
  return {
    name: fastTech.name,
    slug: fastTech.slug,
    version: fastTech.version,
    confidence: fastTech.confidence,
    cpe: normalized.cpe,
    purl: normalized.purl,
    vendor: normalized.vendor,
    ecosystem: normalized.ecosystem,
    categories: fastTech.categories.map((cat: string) => ({
      id: 0,
      name: cat,
      slug: cat.toLowerCase().replace(/[^a-z0-9]/g, '-')
    }))
  };
}

// ───────────────── Single URL Detection ─────────────────────────────────────
export async function detectTechnologiesFast(
  url: string, 
  config: TechDetectionConfig
): Promise<FastDetectionResult> {
  const start = Date.now();
  
  try {
    log(`fastDetection=single url="${url}"`);
    
    // Use the existing fast detection utility
    const result = await fastTechDetect(url);
    
    if (result.error || !result.technologies) {
      return {
        url,
        technologies: [],
        duration: Date.now() - start,
        error: result.error || 'No technologies detected'
      };
    }
    
    // Convert to WappTech format
    const technologies = result.technologies.map(convertFastTechToWappTech);
    
    log(`fastDetection=success url="${url}" techs=${technologies.length} duration=${Date.now() - start}ms`);
    
    return {
      url,
      technologies,
      duration: Date.now() - start
    };
    
  } catch (error) {
    log(`fastDetection=error url="${url}" error="${(error as Error).message}"`);
    
    return {
      url,
      technologies: [],
      duration: Date.now() - start,
      error: (error as Error).message
    };
  }
}

// ───────────────── Batch URL Detection ─────────────────────────────────────
export async function detectTechnologiesBatch(
  urls: string[], 
  config: TechDetectionConfig
): Promise<FastDetectionResult[]> {
  if (urls.length === 0) return [];
  
  const start = Date.now();
  log(`fastDetection=batch starting urls=${urls.length} concurrency=${config.maxConcurrency}`);
  
  try {
    // Use the existing batch detection utility
    const batchResults = await detectMultipleUrlsFast(urls);
    
    // Convert batch results to our format
    const results: FastDetectionResult[] = batchResults.map(result => {
      if (result.error) {
        return {
          url: result.url,
          technologies: [],
          duration: result.duration,
          error: result.error
        };
      }
      
      // Convert technologies to WappTech format
      const technologies = result.technologies.map(convertFastTechToWappTech);
      
      return {
        url: result.url,
        technologies,
        duration: result.duration
      };
    });
    
    const totalDuration = Date.now() - start;
    const successCount = results.filter(r => !r.error).length;
    const totalTechs = results.reduce((sum, r) => sum + r.technologies.length, 0);
    
    log(`fastDetection=batch_complete urls=${urls.length} success=${successCount} total_techs=${totalTechs} duration=${totalDuration}ms`);
    
    return results;
    
  } catch (error) {
    log(`fastDetection=batch_error error="${(error as Error).message}"`);
    
    // Return error results for all URLs
    return urls.map(url => ({
      url,
      technologies: [],
      duration: Date.now() - start,
      error: (error as Error).message
    }));
  }
}

// ───────────────── Parallel Detection with Concurrency Control ─────────────
export async function detectTechnologiesParallel(
  urls: string[], 
  config: TechDetectionConfig
): Promise<FastDetectionResult[]> {
  if (urls.length === 0) return [];
  
  const limit = pLimit(config.maxConcurrency);
  const start = Date.now();
  
  log(`fastDetection=parallel starting urls=${urls.length} concurrency=${config.maxConcurrency}`);
  
  const results = await Promise.all(
    urls.map(url => 
      limit(() => detectTechnologiesFast(url, config))
    )
  );
  
  const totalDuration = Date.now() - start;
  const successCount = results.filter(r => !r.error).length;
  const totalTechs = results.reduce((sum, r) => sum + r.technologies.length, 0);
  
  log(`fastDetection=parallel_complete urls=${urls.length} success=${successCount} total_techs=${totalTechs} duration=${totalDuration}ms`);
  
  return results;
} 