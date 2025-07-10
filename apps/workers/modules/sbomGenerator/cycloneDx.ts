// CycloneDX SBOM generator implementation
import type { 
  ISBOMGenerator, 
  SBOMGenerationInput, 
  SBOMResult, 
  SBOMStats,
  WappTech,
  EnhancedSecAnalysis,
  ComponentVulnerabilityReport
} from './index.js';

// Import existing SBOM generation functions
import { 
  generateSBOM as generateCycloneDXSBOM, 
  exportSBOMAsJSON, 
  getSBOMStats 
} from '../../util/sbomGenerator.js';

// CycloneDX component interface
interface CycloneDXComponent {
  type: 'library' | 'framework' | 'application';
  'bom-ref': string;
  name: string;
  version?: string;
  scope?: string;
  licenses?: Array<{ license: { name: string } }>;
  purl?: string;
  vulnerabilities?: Array<{
    id: string;
    source: { name: string; url: string };
    ratings: Array<{ score: number; severity: string; method: string }>;
  }>;
}

export class CycloneDXGenerator implements ISBOMGenerator {
  
  generate(input: SBOMGenerationInput): SBOMResult {
    // Prioritize modern approach if vulnerability reports are provided
    if (input.vulnerabilityReports) {
      return this.generateFromVulnerabilityReports(input);
    } 
    
    // Fall back to legacy approach with technologies and analyses
    if (input.technologies && input.analyses) {
      return this.generateFromLegacyData(input);
    }
    
    throw new Error('Invalid SBOM generation input: must provide either vulnerabilityReports or technologies+analyses');
  }

  export(sbom: any, format: 'json' | 'xml'): string {
    if (format === 'json') {
      return exportSBOMAsJSON(sbom);
    }
    
    // XML format not implemented yet in existing util
    throw new Error('XML export not yet implemented');
  }

  getStats(sbom: any): SBOMStats {
    return getSBOMStats(sbom);
  }

  private generateFromVulnerabilityReports(input: SBOMGenerationInput): SBOMResult {
    const { vulnerabilityReports, targetName, targetVersion, targetDescription, scanId, domain } = input;
    
    // Use existing modern SBOM generator
    const sbom = generateCycloneDXSBOM(vulnerabilityReports!, {
      targetName,
      targetVersion,
      targetDescription,
      scanId,
      domain
    });
    
    const stats = this.getStats(sbom);
    
    return {
      sbom,
      stats,
      format: 'CycloneDX-1.5'
    };
  }

  private generateFromLegacyData(input: SBOMGenerationInput): SBOMResult {
    const { technologies, analyses, domain } = input;
    
    const components: CycloneDXComponent[] = [];
    
    for (const [slug, tech] of technologies!.entries()) {
      const analysis = analyses!.get(slug);
      const ecosystem = this.detectEcosystem(tech);
      
      const component: CycloneDXComponent = {
        type: 'library',
        'bom-ref': `${ecosystem}/${tech.slug}@${tech.version || 'unknown'}`,
        name: tech.name,
        version: tech.version,
        scope: 'runtime'
      };

      // Add PURL if ecosystem detected
      if (ecosystem && tech.version) {
        component.purl = `pkg:${ecosystem.toLowerCase()}/${tech.slug}@${tech.version}`;
      }

      // Add license information
      if (analysis?.packageIntelligence?.license) {
        component.licenses = [{
          license: { name: analysis.packageIntelligence.license }
        }];
      }

      // Add vulnerabilities
      if (analysis?.vulns.length) {
        component.vulnerabilities = analysis.vulns.map(vuln => ({
          id: vuln.id,
          source: {
            name: vuln.source,
            url: vuln.source === 'OSV' ? 'https://osv.dev' : 'https://github.com/advisories'
          },
          ratings: vuln.cvss ? [{
            score: vuln.cvss,
            severity: vuln.cvss >= 9 ? 'critical' : vuln.cvss >= 7 ? 'high' : vuln.cvss >= 4 ? 'medium' : 'low',
            method: 'CVSSv3'
          }] : []
        }));
      }

      components.push(component);
    }

    const sbom = {
      bomFormat: 'CycloneDX',
      specVersion: '1.5',
      version: 1,
      metadata: {
        timestamp: new Date().toISOString(),
        tools: [{
          vendor: 'DealBrief',
          name: 'techStackScan',
          version: '4.0'
        }],
        component: {
          type: 'application',
          name: domain,
          version: '1.0.0'
        }
      },
      components
    };

    // Calculate stats manually for legacy approach
    const stats = this.calculateLegacyStats(components);
    
    return {
      sbom,
      stats,
      format: 'CycloneDX-1.5'
    };
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

  private calculateLegacyStats(components: CycloneDXComponent[]): SBOMStats {
    let vulnerabilityCount = 0;
    let criticalCount = 0;
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    for (const component of components) {
      if (component.vulnerabilities) {
        vulnerabilityCount += component.vulnerabilities.length;
        
        for (const vuln of component.vulnerabilities) {
          for (const rating of vuln.ratings) {
            switch (rating.severity) {
              case 'critical':
                criticalCount++;
                break;
              case 'high':
                highCount++;
                break;
              case 'medium':
                mediumCount++;
                break;
              case 'low':
                lowCount++;
                break;
            }
          }
        }
      }
    }

    return {
      componentCount: components.length,
      vulnerabilityCount,
      criticalCount,
      highCount,
      mediumCount,
      lowCount
    };
  }
} 