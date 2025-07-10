// GitHub Security Advisory client
import axios from 'axios';
import type { UnifiedCache, CacheKey } from '../techCache/index.js';
import type { WappTech, VulnRecord } from './index.js';
import { log as rootLog } from '../../core/logger.js';

const log = (...m: unknown[]) => rootLog('[githubClient]', ...m);

export interface GitHubClientConfig {
  apiTimeout: number;
  cache: UnifiedCache;
  githubToken?: string;
}

export class GitHubClient {
  constructor(private config: GitHubClientConfig) {}

  async getVulnerabilities(tech: WappTech): Promise<VulnRecord[]> {
    const ecosystem = this.detectEcosystem(tech);
    if (!ecosystem || !tech.version) return [];
    
    const cacheKey: CacheKey = { type: 'github', ecosystem, package: tech.slug, version: tech.version };
    const cached = await this.config.cache.get<VulnRecord[]>(cacheKey);
    if (cached !== null) return cached;

    const token = this.config.githubToken || process.env.GITHUB_TOKEN;
    if (!token) {
      log('GitHub token not available, skipping GitHub advisory lookup');
      return [];
    }

    try {
      const query = `
        query($ecosystem: SecurityAdvisoryEcosystem!, $package: String!) {
          securityVulnerabilities(first: 20, ecosystem: $ecosystem, package: $package) {
            nodes {
              advisory {
                ghsaId
                summary
                severity
                cvss {
                  score
                }
              }
              vulnerableVersionRange
            }
          }
        }
      `;

      const { data } = await axios.post('https://api.github.com/graphql', {
        query,
        variables: {
          ecosystem: this.mapEcosystemToGitHub(ecosystem),
          package: tech.slug
        }
      }, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: this.config.apiTimeout
      });

      const vulns: VulnRecord[] = (data.data?.securityVulnerabilities?.nodes || [])
        .filter((node: any) => {
          // Check if version is in vulnerable range
          return this.isVersionInRange(tech.version!, node.vulnerableVersionRange);
        })
        .map((node: any) => ({
          id: node.advisory.ghsaId,
          source: 'GITHUB' as const,
          cvss: node.advisory.cvss?.score,
          summary: node.advisory.summary,
          affectedVersionRange: node.vulnerableVersionRange
        }));

      await this.config.cache.set(cacheKey, vulns);
      return vulns;
    } catch (error) {
      log(`github=error tech="${tech.slug}" error="${(error as Error).message}"`);
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

  private mapEcosystemToGitHub(ecosystem: string): string {
    const map: Record<string, string> = {
      'npm': 'NPM',
      'PyPI': 'PIP',
      'Packagist': 'COMPOSER',
      'RubyGems': 'RUBYGEMS',
      'Maven': 'MAVEN',
      'NuGet': 'NUGET',
      'Go': 'GO',
      'crates.io': 'RUST'
    };
    return map[ecosystem] || ecosystem.toUpperCase();
  }

  private isVersionInRange(version: string, range: string): boolean {
    if (!range || !version) return false;
    
    try {
      // Handle different range formats
      if (range.includes('>=') && range.includes('<')) {
        const match = range.match(/>=([^\s,]+)(?:,\s*<([^\s,]+))?/);
        if (match) {
          const [, min, max] = match;
          return (!min || this.compareVersions(version, min) >= 0) && 
                 (!max || this.compareVersions(version, max) < 0);
        }
      }
      
      if (range.startsWith('>=')) {
        return this.compareVersions(version, range.slice(2)) >= 0;
      }
      
      if (range.startsWith('<')) {
        return this.compareVersions(version, range.slice(1)) < 0;
      }
      
      if (range.startsWith('=')) {
        return this.compareVersions(version, range.slice(1)) === 0;
      }
      
      // Direct version comparison
      return this.compareVersions(version, range) === 0;
    } catch {
      return false;
    }
  }

  private compareVersions(a: string, b: string): number {
    const normalize = (v: string) => v.replace(/[^\d.]/g, '').split('.').map(n => parseInt(n) || 0);
    const [aParts, bParts] = [normalize(a), normalize(b)];
    const maxLength = Math.max(aParts.length, bParts.length);
    
    for (let i = 0; i < maxLength; i++) {
      const diff = (aParts[i] || 0) - (bParts[i] || 0);
      if (diff !== 0) return diff;
    }
    
    return 0;
  }
} 