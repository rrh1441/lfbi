/* =============================================================================
 * MODULE: techDetection/index.ts 
 * =============================================================================
 * Unified technology detection interface that orchestrates multiple detection
 * methods including FastTech (WebTech), Nuclei, header analysis, and favicons.
 * =============================================================================
 */

import { log as rootLog } from '../../core/logger.js';
import { detectTechnologiesBatch } from './fastDetection.js';
import { detectFromHeadersBatch } from './fallbackDetection.js';

const log = (...m: unknown[]) => rootLog('[techDetection]', ...m);

// ───────────────── Core Types ────────────────────────────────────────────
export interface WappTech {
  name: string;
  slug: string;
  version?: string;
  confidence: number;
  cpe?: string;
  purl?: string;
  vendor?: string;
  ecosystem?: string;
  categories: { id: number; name: string; slug: string }[];
}

export interface TechDetectionResult {
  technologies: WappTech[];
  totalDuration: number;
  detectionMethods: string[];
  circuitBreakerTripped: boolean;
}

export interface TechDetectionConfig {
  maxConcurrency: number;
  timeout: number;
  circuitBreakerLimit: number;
  enableFavicons: boolean;
  enableNuclei: boolean;
  maxTargets: number;
}

// ───────────────── Circuit Breaker ─────────────────────────────────────────
export class TechnologyScanCircuitBreaker {
  private timeouts = 0;
  private tripped = false;
  
  constructor(private limit: number) {}
  
  recordTimeout() {
    if (this.tripped) return;
    if (++this.timeouts >= this.limit) {
      this.tripped = true;
      log('circuitBreaker=tripped');
    }
  }
  
  isTripped() { 
    return this.tripped; 
  }
  
  reset() {
    this.timeouts = 0;
    this.tripped = false;
  }
}

// ───────────────── Asset Classification ─────────────────────────────────────
export function classifyTargetAssetType(url: string): 'html' | 'nonHtml' {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    const hostname = urlObj.hostname.toLowerCase();
    
    // Known expensive non-HTML patterns that should bypass detection
    const expensiveNonHtmlPatterns = [
      /player_api/i,
      /\/api\/player/i,
      /\/player\//i,
      /maxcdn\.bootstrapcdn/i,
      /cdn\.jsdelivr/i,
      /cdnjs\.cloudflare/i,
      /unpkg\.com/i,
      /\/direct\//i,
      /\/assets\/direct/i,
      /\/static\/direct/i,
      /\/v\d+\/api/i,
      /\/rest\/api/i,
      /\/graphql/i,
      /\/api\/v\d+/i,
      /analytics/i,
      /tracking/i,
      /metrics/i,
      /telemetry/i,
      /stream/i,
      /media/i,
      /video/i,
      /audio/i
    ];
    
    // Check pathname and hostname patterns
    if (expensiveNonHtmlPatterns.some(pattern => 
      pattern.test(pathname) || pattern.test(hostname))) {
      return 'nonHtml';
    }
    
    // File extensions that are definitely non-HTML
    const nonHtmlExtensions = /\.(js|css|png|jpg|jpeg|gif|svg|ico|pdf|zip|exe|dmg|mp4|mp3|woff|woff2|ttf|eot|json|xml)$/i;
    if (nonHtmlExtensions.test(pathname)) {
      return 'nonHtml';
    }
    
    return 'html';
  } catch {
    return 'html'; // Safe default
  }
}

// ───────────────── Ecosystem Detection ─────────────────────────────────────
export function detectEcosystem(tech: WappTech): string | null {
  const cats = tech.categories.map((c) => c.slug.toLowerCase());
  const name = tech.name.toLowerCase();

  // Enhanced patterns for better ecosystem detection
  if (cats.some((c) => /javascript|node\.?js|npm|react|vue|angular/.test(c)) || 
      /react|vue|angular|express|lodash|webpack|babel/.test(name)) return 'npm';
  
  if (cats.some((c) => /python|django|flask|pyramid/.test(c)) || 
      /django|flask|requests|numpy|pandas|fastapi/.test(name)) return 'PyPI';
  
  if (cats.some((c) => /php|laravel|symfony|wordpress|drupal|composer/.test(c)) || 
      /laravel|symfony|composer|codeigniter/.test(name)) return 'Packagist';
  
  if (cats.some((c) => /ruby|rails|gem/.test(c)) || 
      /rails|sinatra|jekyll/.test(name)) return 'RubyGems';
  
  if (cats.some((c) => /java|maven|gradle|spring/.test(c)) || 
      /spring|hibernate|struts|maven/.test(name)) return 'Maven';
  
  if (cats.some((c) => /\.net|nuget|csharp/.test(c)) || 
      /entityframework|mvc|blazor/.test(name)) return 'NuGet';
  
  if (cats.some((c) => /go|golang/.test(c)) || 
      /gin|echo|fiber|gorm/.test(name)) return 'Go';
  
  if (cats.some((c) => /rust|cargo/.test(c)) || 
      /actix|rocket|tokio/.test(name)) return 'crates.io';

  return null;
}

// ───────────────── Version Accuracy ─────────────────────────────────────────
export function calculateVersionAccuracy(detections: WappTech[]): number {
  const versioned = detections.filter(t => t.version);
  if (versioned.length === 0) return 0;
  
  const avgConfidence = versioned.reduce((sum, t) => sum + t.confidence, 0) / versioned.length;
  return Math.min(avgConfidence / 100, 1.0);
}

// ───────────────── Main Detection Interface ─────────────────────────────────
export interface TechDetectionInterface {
  detectTechnologies(targets: string[], config: TechDetectionConfig): Promise<TechDetectionResult>;
  classifyTargets(urls: string[]): { html: string[]; nonHtml: string[] };
}

// Default configuration
export const DEFAULT_TECH_CONFIG: TechDetectionConfig = {
  maxConcurrency: 6,
  timeout: 30000,
  circuitBreakerLimit: 20,
  enableFavicons: true,
  enableNuclei: false, // Tech detection via Nuclei is optional
  maxTargets: 5 // Limit for performance
};

// ───────────────── Main Detection Class ─────────────────────────────────────
export class UnifiedTechDetection implements TechDetectionInterface {
  private circuitBreaker: TechnologyScanCircuitBreaker;
  
  constructor(private config: TechDetectionConfig = DEFAULT_TECH_CONFIG) {
    this.circuitBreaker = new TechnologyScanCircuitBreaker(config.circuitBreakerLimit);
  }

  /**
   * Classify targets into HTML vs non-HTML for optimized processing
   */
  classifyTargets(urls: string[]): { html: string[]; nonHtml: string[] } {
    const html: string[] = [];
    const nonHtml: string[] = [];
    
    for (const url of urls) {
      if (classifyTargetAssetType(url) === 'html') {
        html.push(url);
      } else {
        nonHtml.push(url);
      }
    }
    
    return { html, nonHtml };
  }

  /**
   * Main technology detection orchestrator
   */
  async detectTechnologies(targets: string[], config?: Partial<TechDetectionConfig>): Promise<TechDetectionResult> {
    const finalConfig = { ...this.config, ...config };
    const start = Date.now();
    const detectionMethods: string[] = [];
    
    // Reset circuit breaker for new detection
    this.circuitBreaker.reset();
    
    // Classify targets for optimal processing
    const { html: htmlTargets } = this.classifyTargets(targets);
    const limitedTargets = htmlTargets.slice(0, finalConfig.maxTargets);
    
    log(`detection=start targets=${targets.length} html=${htmlTargets.length} limited=${limitedTargets.length}`);
    
    // Primary detection via FastTech (WebTech)
    const techMap = new Map<string, WappTech>();
    
    try {
      log(`detection=fast_tech starting for ${limitedTargets.length} targets`);
      const fastResults = await detectTechnologiesBatch(limitedTargets, finalConfig);
      detectionMethods.push('FastTech');
      
      // Process fast detection results
      for (const result of fastResults) {
        if (result.error) {
          log(`detection=fast_tech_error url="${result.url}" error="${result.error}"`);
          this.circuitBreaker.recordTimeout();
          continue;
        }
        
        for (const tech of result.technologies) {
          // Add ecosystem detection
          const techWithEcosystem = {
            ...tech,
            ecosystem: detectEcosystem(tech)
          };
          techMap.set(tech.slug, techWithEcosystem);
        }
      }
      
      log(`detection=fast_tech_complete techs=${techMap.size}`);
      
    } catch (error) {
      log(`detection=fast_tech_failed error="${(error as Error).message}"`);
      this.circuitBreaker.recordTimeout();
    }
    
    // Fallback to header analysis if no technologies detected
    if (techMap.size === 0 && !this.circuitBreaker.isTripped()) {
      try {
        log(`detection=fallback_headers starting for ${Math.min(limitedTargets.length, 3)} targets`);
        const headerResults = await detectFromHeadersBatch(limitedTargets.slice(0, 3), finalConfig);
        detectionMethods.push('HeaderAnalysis');
        
        for (const result of headerResults) {
          if (result.error) {
            log(`detection=header_error url="${result.url}" error="${result.error}"`);
            continue;
          }
          
          for (const tech of result.technologies) {
            const techWithEcosystem = {
              ...tech,
              ecosystem: detectEcosystem(tech)
            };
            techMap.set(tech.slug, techWithEcosystem);
          }
        }
        
        log(`detection=fallback_complete techs=${techMap.size}`);
        
      } catch (error) {
        log(`detection=fallback_failed error="${(error as Error).message}"`);
      }
    }
    
    const totalDuration = Date.now() - start;
    const technologies = Array.from(techMap.values());
    
    log(`detection=complete techs=${technologies.length} duration=${totalDuration}ms methods=[${detectionMethods.join(',')}]`);
    
    return {
      technologies,
      totalDuration,
      detectionMethods,
      circuitBreakerTripped: this.circuitBreaker.isTripped()
    };
  }
}

// ───────────────── Factory Function ─────────────────────────────────────────
export function createTechDetection(config?: Partial<TechDetectionConfig>): TechDetectionInterface {
  return new UnifiedTechDetection({ ...DEFAULT_TECH_CONFIG, ...config });
} 