// Vulnerability intelligence interface for techStackScan
import type { UnifiedCache, CacheKey } from '../techCache/index.js';

// Vulnerability intelligence interface
export interface IVulnerabilityAnalyzer {
  analyze(tech: WappTech): Promise<VulnReport[]>;
  validateTimeline(cve: string, version: string): boolean;
  getEPSSScores(cveIds: string[]): Promise<Map<string, number>>;
  getKEVList(): Promise<Set<string>>;
}

// Technology interface
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

// Vulnerability record interface
export interface VulnRecord {
  id: string;
  source: 'OSV' | 'GITHUB';
  cvss?: number;
  epss?: number;
  cisaKev?: boolean;
  summary?: string;
  publishedDate?: Date;
  affectedVersionRange?: string;
  activelyTested?: boolean;
  exploitable?: boolean;
  verificationDetails?: any;
}

// Vulnerability report interface
export interface VulnReport {
  technology: WappTech;
  vulnerabilities: VulnRecord[];
  riskScore: number;
  timeline: {
    validated: boolean;
    reason?: string;
  };
}

// Configuration for vulnerability analysis
export interface VulnAnalysisConfig {
  apiTimeout: number;
  maxRiskVulnAgeYears: number;
  dropVulnAgeYears: number;
  dropVulnEpssCut: number;
  epssCache: UnifiedCache;
}

// Export implementations
export { OSVClient } from './osvClient.js';
export { GitHubClient } from './githubClient.js';
export { EPSSEnrichment } from './epssEnrichment.js';
export { CVEValidator } from './cveValidation.js';

// Utility function to create unified vulnerability analyzer
export function createVulnerabilityAnalyzer(config: VulnAnalysisConfig): IVulnerabilityAnalyzer {
  return new CompositeVulnerabilityAnalyzer(config);
}

// Composite analyzer that uses all sources
class CompositeVulnerabilityAnalyzer implements IVulnerabilityAnalyzer {
  constructor(private config: VulnAnalysisConfig) {}

  async analyze(tech: WappTech): Promise<VulnRecord[]> {
    // This will be implemented to use OSV + GitHub clients
    throw new Error('Not yet implemented');
  }

  validateTimeline(cve: string, version: string): boolean {
    // This will be implemented using CVEValidator
    throw new Error('Not yet implemented');
  }

  async getEPSSScores(cveIds: string[]): Promise<Map<string, number>> {
    // This will be implemented using EPSSEnrichment
    throw new Error('Not yet implemented');
  }

  async getKEVList(): Promise<Set<string>> {
    // This will be implemented with caching
    throw new Error('Not yet implemented');
  }
} 