/* =============================================================================
 * MODULE: techDetection/fallbackDetection.ts
 * =============================================================================
 * Fallback technology detection using HTTP header analysis.
 * Used when primary FastTech detection fails or finds no technologies.
 * =============================================================================
 */

import pLimit from 'p-limit';
import { detectFromHeaders as detectFromHeadersUtil } from '../../util/fastTechDetection.js';
import { log as rootLog } from '../../core/logger.js';
import type { WappTech, TechDetectionConfig } from './index.js';
import type { FastDetectionResult } from './fastDetection.js';

const log = (...m: unknown[]) => rootLog('[fallbackDetection]', ...m);

// ───────────────── Manual Header Analysis ─────────────────────────────────────
function analyzeHttpHeaders(headers: Headers, url: string): WappTech[] {
  const technologies: WappTech[] = [];
  
  // Server header analysis
  const server = headers.get('server');
  if (server) {
    if (/nginx/i.test(server)) {
      technologies.push({
        name: 'Nginx',
        slug: 'nginx',
        confidence: 100,
        categories: [{ id: 22, name: 'Web Servers', slug: 'web-servers' }]
      });
    }
    if (/apache/i.test(server)) {
      technologies.push({
        name: 'Apache',
        slug: 'apache',
        confidence: 100,
        categories: [{ id: 22, name: 'Web Servers', slug: 'web-servers' }]
      });
    }
    if (/cloudflare/i.test(server)) {
      technologies.push({
        name: 'Cloudflare',
        slug: 'cloudflare',
        confidence: 100,
        categories: [{ id: 31, name: 'CDN', slug: 'cdn' }]
      });
    }
    if (/microsoft-iis/i.test(server)) {
      technologies.push({
        name: 'Microsoft IIS',
        slug: 'microsoft-iis',
        confidence: 100,
        categories: [{ id: 22, name: 'Web Servers', slug: 'web-servers' }]
      });
    }
  }
  
  // X-Powered-By header
  const poweredBy = headers.get('x-powered-by');
  if (poweredBy) {
    if (/php/i.test(poweredBy)) {
      const versionMatch = poweredBy.match(/php\/?([\d.]+)/i);
      technologies.push({
        name: 'PHP',
        slug: 'php',
        version: versionMatch?.[1],
        confidence: 100,
        categories: [{ id: 27, name: 'Programming Languages', slug: 'programming-languages' }]
      });
    }
    if (/asp\.net/i.test(poweredBy)) {
      const versionMatch = poweredBy.match(/asp\.net\/?([\d.]+)/i);
      technologies.push({
        name: 'ASP.NET',
        slug: 'asp-net',
        version: versionMatch?.[1],
        confidence: 100,
        categories: [{ id: 18, name: 'Web Frameworks', slug: 'web-frameworks' }]
      });
    }
    if (/express/i.test(poweredBy)) {
      technologies.push({
        name: 'Express',
        slug: 'express',
        confidence: 100,
        categories: [{ id: 18, name: 'Web Frameworks', slug: 'web-frameworks' }]
      });
    }
  }
  
  // Framework-specific headers
  const nextVersion = headers.get('x-nextjs-cache');
  if (nextVersion || headers.get('x-nextjs-matched-path')) {
    technologies.push({
      name: 'Next.js',
      slug: 'next-js',
      confidence: 100,
      categories: [{ id: 18, name: 'Web Frameworks', slug: 'web-frameworks' }]
    });
  }
  
  // Security headers that indicate technologies
  const xssProtection = headers.get('x-xss-protection');
  const contentType = headers.get('x-content-type-options');
  if (xssProtection || contentType) {
    technologies.push({
      name: 'Security Headers',
      slug: 'security-headers',
      confidence: 75,
      categories: [{ id: 19, name: 'Security', slug: 'security' }]
    });
  }
  
  // Content-Type analysis
  const contentTypeHeader = headers.get('content-type');
  if (contentTypeHeader) {
    if (/application\/json/i.test(contentTypeHeader)) {
      technologies.push({
        name: 'JSON API',
        slug: 'json-api',
        confidence: 75,
        categories: [{ id: 19, name: 'Miscellaneous', slug: 'miscellaneous' }]
      });
    }
    if (/application\/xml/i.test(contentTypeHeader)) {
      technologies.push({
        name: 'XML API',
        slug: 'xml-api',
        confidence: 75,
        categories: [{ id: 19, name: 'Miscellaneous', slug: 'miscellaneous' }]
      });
    }
  }
  
  // Cache headers that indicate CDN/caching solutions
  const cfRay = headers.get('cf-ray');
  const cfCacheStatus = headers.get('cf-cache-status');
  if (cfRay || cfCacheStatus) {
    technologies.push({
      name: 'Cloudflare',
      slug: 'cloudflare',
      confidence: 100,
      categories: [{ id: 31, name: 'CDN', slug: 'cdn' }]
    });
  }
  
  const xCache = headers.get('x-cache');
  const xCacheHits = headers.get('x-cache-hits');
  if (xCache || xCacheHits) {
    technologies.push({
      name: 'Varnish',
      slug: 'varnish',
      confidence: 80,
      categories: [{ id: 23, name: 'Caching', slug: 'caching' }]
    });
  }
  
  return technologies;
}

// ───────────────── Single URL Header Detection ─────────────────────────────────
export async function detectFromHeaders(
  url: string, 
  config: TechDetectionConfig
): Promise<FastDetectionResult> {
  const start = Date.now();
  
  try {
    log(`fallbackDetection=single url="${url}"`);
    
    // Try utility function first
    try {
      const utilResult = await detectFromHeadersUtil(url);
      if (utilResult && utilResult.length > 0) {
        log(`fallbackDetection=util_success url="${url}" techs=${utilResult.length}`);
        
        return {
          url,
          technologies: utilResult.map(tech => ({
            name: tech.name,
            slug: tech.slug,
            version: tech.version,
            confidence: tech.confidence,
            categories: tech.categories.map((cat: string) => ({
              id: 0,
              name: cat,
              slug: cat.toLowerCase().replace(/[^a-z0-9]/g, '-')
            }))
          })),
          duration: Date.now() - start
        };
      }
    } catch (utilError) {
      log(`fallbackDetection=util_failed url="${url}" error="${(utilError as Error).message}"`);
    }
    
    // Fall back to manual header analysis
    log(`fallbackDetection=manual url="${url}"`);
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.timeout);
    
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SecurityScanner/1.0)'
        }
      });
      
      clearTimeout(timeout);
      
      const technologies = analyzeHttpHeaders(response.headers, url);
      
      log(`fallbackDetection=manual_success url="${url}" techs=${technologies.length} duration=${Date.now() - start}ms`);
      
      return {
        url,
        technologies,
        duration: Date.now() - start
      };
      
    } catch (fetchError) {
      clearTimeout(timeout);
      throw fetchError;
    }
    
  } catch (error) {
    log(`fallbackDetection=error url="${url}" error="${(error as Error).message}"`);
    
    return {
      url,
      technologies: [],
      duration: Date.now() - start,
      error: (error as Error).message
    };
  }
}

// ───────────────── Batch Header Detection ─────────────────────────────────────
export async function detectFromHeadersBatch(
  urls: string[], 
  config: TechDetectionConfig
): Promise<FastDetectionResult[]> {
  if (urls.length === 0) return [];
  
  const limit = pLimit(config.maxConcurrency);
  const start = Date.now();
  
  log(`fallbackDetection=batch starting urls=${urls.length} concurrency=${config.maxConcurrency}`);
  
  const results = await Promise.all(
    urls.map(url => 
      limit(() => detectFromHeaders(url, config))
    )
  );
  
  const totalDuration = Date.now() - start;
  const successCount = results.filter(r => !r.error).length;
  const totalTechs = results.reduce((sum, r) => sum + r.technologies.length, 0);
  
  log(`fallbackDetection=batch_complete urls=${urls.length} success=${successCount} total_techs=${totalTechs} duration=${totalDuration}ms`);
  
  return results;
} 