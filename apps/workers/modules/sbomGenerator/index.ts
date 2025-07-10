// SBOM generation interface for techStackScan
import type { ComponentVulnerabilityReport } from '../../util/versionMatcher.js';

// Re-export types from existing SBOM generator
export type { ComponentVulnerabilityReport } from '../../util/versionMatcher.js';

// SBOM generation interface for different formats
export interface ISBOMGenerator {
  generate(input: SBOMGenerationInput): SBOMResult;
  export(sbom: any, format: 'json' | 'xml'): string;
  getStats(sbom: any): SBOMStats;
}

// Input data for SBOM generation
export interface SBOMGenerationInput {
  // Modern approach input
  vulnerabilityReports?: ComponentVulnerabilityReport[];
  // Legacy approach input  
  technologies?: Map<string, WappTech>;
  analyses?: Map<string, EnhancedSecAnalysis>;
  // Common metadata
  targetName: string;
  targetVersion?: string;
  targetDescription?: string;
  scanId?: string;
  domain: string;
}

// SBOM generation result
export interface SBOMResult {
  sbom: any;
  stats: SBOMStats;
  format: 'CycloneDX-1.5';
}

// SBOM statistics
export interface SBOMStats {
  componentCount: number;
  vulnerabilityCount: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
}

// Technology types (re-exported from techStackScan)
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

export interface EnhancedSecAnalysis {
  eol: boolean;
  vulns: VulnRecord[];
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  advice: string[];
  versionAccuracy?: number;
  supplyChainScore: number;
  packageIntelligence?: PackageIntelligence;
  activeVerification?: {
    tested: number;
    exploitable: number;
    notExploitable: number;
  };
}

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

export interface PackageIntelligence {
  popularity?: number;
  maintenance?: string;
  license?: string;
  licenseRisk?: 'LOW' | 'MEDIUM' | 'HIGH';
  openSSFScore?: number;
  dependents?: number;
}

// Export implementations
export { CycloneDXGenerator } from './cycloneDx.js';

// Utility function to create unified SBOM generator
export function createSBOMGenerator(): ISBOMGenerator {
  return new CycloneDXGenerator();
} 