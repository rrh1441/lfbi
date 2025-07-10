// OSV.dev vulnerability client
import axios from 'axios';
import semver from 'semver';
import type { UnifiedCache, CacheKey } from '../techCache/index.js';
import type { WappTech, VulnRecord } from './index.js';
import { log as rootLog } from '../../core/logger.js';

const log = (...m: unknown[]) => rootLog('[osvClient]', ...m);

export interface OSVClientConfig {
  apiTimeout: number;
  cache: UnifiedCache;
}

export class OSVClient {
  constructor(private config: OSVClientConfig) {}

  async getVulnerabilities(tech: WappTech): Promise<VulnRecord[]> {
    if (!tech.version) return [];
    
    const ecosystem = this.detectEcosystem(tech);
    if (!ecosystem) return [];

    const cacheKey: CacheKey = { type: 'osv', ecosystem, package: tech.slug, version: tech.version };
    const cached = await this.config.cache.get<VulnRecord[]>(cacheKey);
    if (cached !== null) return cached;

    try {
      const { data } = await axios.post('https://api.osv.dev/v1/query', {
        version: tech.version,
        package: { name: tech.slug, ecosystem }
      }, { timeout: this.config.apiTimeout });

      const vulns: VulnRecord[] = (data.vulns || [])
        .filter((v: any) => {
          // First check if it affects this version
          const affects = v.affected?.some((a: any) => {
            const pkg = a.package;
            if (pkg?.ecosystem !== ecosystem || pkg?.name !== tech.slug) return false;
            
            // Check version ranges
            return a.ranges?.some((r: any) => {
              if (r.type === 'SEMVER') {
                return r.events?.some((e: any, i: number) => {
                  if (e.introduced === '0' && i + 1 < r.events.length) {
                    const nextEvent = r.events[i + 1];
                    if (nextEvent.fixed) {
                      return semver.lt(tech.version!, nextEvent.fixed);
                    }
                  }
                  return false;
                });
              }
              return false;
            });
          });

          if (!affects) return false;

          // CVE timeline validation will be done in the validator module
          return true;
        })
        .map((v: any) => ({
          id: v.id,
          source: 'OSV' as const,
          cvss: v.database_specific?.cvss_score || this.extractCVSSFromSeverity(v.severity),
          summary: v.summary,
          publishedDate: v.published ? new Date(v.published) : undefined,
          affectedVersionRange: v.affected?.[0]?.ranges?.[0]?.events?.map((e: any) => 
            e.introduced ? `>=${e.introduced}` : e.fixed ? `<${e.fixed}` : ''
          ).filter(Boolean).join(', ')
        }));

      await this.config.cache.set(cacheKey, vulns);
      return vulns;
    } catch (error) {
      log(`osv=error tech="${tech.slug}" error="${(error as Error).message}"`);
      await this.config.cache.set(cacheKey, []);
      return [];
    }
  }

  private detectEcosystem(tech: WappTech): string | null {
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

  private extractCVSSFromSeverity(severity?: string): number | undefined {
    if (!severity) return undefined;
    const s = severity.toLowerCase();
    if (s.includes('critical')) return 9.0;
    if (s.includes('high')) return 7.5;
    if (s.includes('medium') || s.includes('moderate')) return 5.0;
    if (s.includes('low')) return 3.0;
    return undefined;
  }
} 