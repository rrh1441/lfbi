/* =============================================================================
 * MODULE: securityAnalysis.ts
 * =============================================================================
 * Enhanced security analysis for technology stacks.
 * Integrates vulnerability analysis, EOL checks, and active verification.
 * =============================================================================
 */

import pLimit from 'p-limit';
import { log as rootLog } from '../core/logger.js';
import { calculateVersionAccuracy } from './techDetection/index.js';
import type { WappTech } from './techDetection/index.js';
import { 
  VulnerabilityAnalysis, 
  createVulnerabilityAnalysis,
  type VulnRecord, 
  type EnhancedSecAnalysis,
  type VulnerabilityAnalysisConfig 
} from './vulnerabilityAnalysis.js';

const log = (...m: unknown[]) => rootLog('[securityAnalysis]', ...m);

// Configuration
const CONFIG = {
  MAX_CONCURRENCY: 3,
  MAX_VULN_IDS_PER_FINDING: 12,
} as const;

export interface SecurityAnalysisConfig extends VulnerabilityAnalysisConfig {
  maxConcurrency?: number;
  enableActiveVerification?: boolean;
  enableEOLCheck?: boolean;
}

export class SecurityAnalysis {
  private vulnerabilityAnalysis: VulnerabilityAnalysis;
  private config: SecurityAnalysisConfig;

  constructor(config: SecurityAnalysisConfig) {
    this.config = config;
    this.vulnerabilityAnalysis = createVulnerabilityAnalysis(config);
  }

  /* Enhanced security analysis with active testing */
  async analyzeSecurityEnhanced(
    t: WappTech, 
    detections: WappTech[], 
    targets?: string[]
  ): Promise<EnhancedSecAnalysis> {
    const limit = pLimit(this.config.maxConcurrency || CONFIG.MAX_CONCURRENCY);
    
    // Get passive vulnerability data from APIs
    const [eol, osv, gh] = await Promise.all([
      limit(() => this.config.enableEOLCheck !== false ? 
        this.vulnerabilityAnalysis.isEol(t.slug, t.version) : 
        Promise.resolve(false)
      ),
      limit(() => this.vulnerabilityAnalysis.getOSVVulns(t)),
      limit(() => this.vulnerabilityAnalysis.getGitHubVulns(t))
    ]);
    
    // Apply post-processing before deduplication
    const osvProcessed = this.vulnerabilityAnalysis.postProcessVulnerabilities(osv, t.name, t.version);
    const ghProcessed = this.vulnerabilityAnalysis.postProcessVulnerabilities(gh, t.name, t.version);
    
    // Merge and deduplicate passive results
    const passiveVulns = this.vulnerabilityAnalysis.dedupeVulns([...osvProcessed, ...ghProcessed]);
    
    // Get CVE IDs for active testing
    const cveIds = passiveVulns
      .filter(v => v.id.startsWith('CVE-'))
      .map(v => v.id);
    
    // Run active Nuclei verification if enabled and we have CVEs
    let nucleiResults = new Map<string, any>();
    let activeVerification = {
      tested: 0,
      exploitable: 0,
      notExploitable: 0
    };

    if (this.config.enableActiveVerification !== false && 
        cveIds.length > 0 && targets && targets.length > 0) {
      // Use the first available target for testing
      const target = targets[0];
      nucleiResults = await this.vulnerabilityAnalysis.runNucleiCVETests(target, cveIds, t.name);
      
      if (nucleiResults.size === 0) {
        log(`nuclei=skipped tech="${t.name}" reason="not available or no templates"`);
      } else {
        // Calculate active verification stats
        activeVerification.tested = nucleiResults.size;
        for (const [, result] of nucleiResults) {
          if (result.exploitable) {
            activeVerification.exploitable++;
          } else {
            activeVerification.notExploitable++;
          }
        }
      }
    }
    
    // Enrich vulnerabilities with both passive and active data
    const enrichedVulns = passiveVulns.map(vuln => {
      const nucleiResult = nucleiResults.get(vuln.id);
      
      return {
        ...vuln,
        activelyTested: !!nucleiResult,
        exploitable: nucleiResult?.exploitable,
        verificationDetails: nucleiResult?.details
      };
    });
    
    // Get EPSS and KEV data
    const epssMap = await this.vulnerabilityAnalysis.getEPSSScores(cveIds);
    const kevSet = await this.vulnerabilityAnalysis.getKEVList();
    
    const fullyEnriched = enrichedVulns.map(v => ({
      ...v,
      epss: epssMap.get(v.id),
      cisaKev: kevSet.has(v.id)
    }));
    
    // Apply filtering
    const merged = this.vulnerabilityAnalysis.mergeGhsaWithCve(fullyEnriched);
    const filtered = this.vulnerabilityAnalysis.filterLowValue(merged);
    
    // Log filtering stats for debugging
    log(`analysis=stats tech="${t.name}" version="${t.version}" ` +
        `raw=${passiveVulns.length} enriched=${enrichedVulns.length} merged=${merged.length} filtered=${filtered.length}`);
    
    // Calculate supply chain score
    const scScore = this.vulnerabilityAnalysis.supplyChainScore(filtered);
    
    // Enhanced risk assessment considering active testing
    let risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    const advice: string[] = [];
    
    if (eol) { 
      risk = 'HIGH'; 
      advice.push(`Upgrade – version ${t.version} is EOL.`); 
    }
    
    if (filtered.length) {
      // Count actively exploitable vulnerabilities (if tested)
      const exploitableCount = filtered.filter(v => v.exploitable === true).length;
      const testedCount = filtered.filter(v => v.activelyTested).length;
      
      // Base risk on standard criteria (CVSS, EPSS, KEV)
      const hasHighRisk = filtered.some(v => 
        v.cisaKev || 
        (v.epss ?? 0) >= 0.85 || 
        (v.cvss ?? 0) >= 9
      );
      
      risk = hasHighRisk ? 'HIGH' : risk === 'LOW' ? 'MEDIUM' : risk;
      
      // UPGRADE to CRITICAL if we have confirmed exploitable vulns
      if (exploitableCount > 0) {
        risk = 'CRITICAL';
        advice.push(`⚠️ CRITICAL: ${exploitableCount} vulnerabilities confirmed as actively exploitable!`);
      }
      
      // Build appropriate advice message
      if (testedCount > 0) {
        advice.push(`Patch – ${filtered.length} vulnerabilities found (${testedCount} tested by Nuclei: ${exploitableCount} exploitable).`);
      } else {
        advice.push(`Patch – ${filtered.length} vulnerabilities found.`);
      }
      
      if (filtered.some(v => v.cisaKev)) {
        advice.push('CISA Known-Exploited vulnerability present.');
      }
    }
    
    if (scScore >= 7.0) {
      advice.push('High supply-chain risk detected.');
    }

    return {
      eol,
      vulns: filtered,
      risk,
      advice,
      versionAccuracy: calculateVersionAccuracy([t]),
      supplyChainScore: scScore,
      activeVerification: activeVerification.tested > 0 ? activeVerification : undefined
    };
  }

  /* Batch analyze multiple technologies */
  async batchAnalyzeSecurityEnhanced(
    technologies: WappTech[],
    detectMap: Map<string, WappTech[]>,
    targets?: string[]
  ): Promise<Map<string, EnhancedSecAnalysis>> {
    const analysisMap = new Map<string, EnhancedSecAnalysis>();
    const limit = pLimit(this.config.maxConcurrency || CONFIG.MAX_CONCURRENCY);
    
    await Promise.all(technologies.map(tech => limit(async () => {
      const detections = detectMap.get(tech.slug) ?? [tech];
      const analysis = await this.analyzeSecurityEnhanced(tech, detections, targets);
      analysisMap.set(tech.slug, analysis);
    })));
    
    return analysisMap;
  }

  /* Summarize vulnerability IDs for reporting */
  summarizeVulnIds(vulns: VulnRecord[], max?: number): string {
    const maxIds = max || CONFIG.MAX_VULN_IDS_PER_FINDING;
    const ids = vulns.slice(0, maxIds).map(r => r.id);
    return vulns.length > maxIds ? ids.join(', ') + ', …' : ids.join(', ');
  }

  /* Calculate security metrics across all technologies */
  calculateSecurityMetrics(analysisMap: Map<string, EnhancedSecAnalysis>) {
    let totalVulns = 0;
    let criticalTechs = 0;
    let highRiskTechs = 0;
    let eolTechs = 0;
    let exploitableVulns = 0;
    let testedVulns = 0;

    for (const [, analysis] of analysisMap) {
      totalVulns += analysis.vulns.length;
      
      if (analysis.risk === 'CRITICAL') criticalTechs++;
      else if (analysis.risk === 'HIGH') highRiskTechs++;
      
      if (analysis.eol) eolTechs++;
      
      exploitableVulns += analysis.vulns.filter(v => v.exploitable === true).length;
      testedVulns += analysis.vulns.filter(v => v.activelyTested === true).length;
    }

    return {
      totalTechnologies: analysisMap.size,
      totalVulnerabilities: totalVulns,
      criticalTechnologies: criticalTechs,
      highRiskTechnologies: highRiskTechs,
      eolTechnologies: eolTechs,
      exploitableVulnerabilities: exploitableVulns,
      testedVulnerabilities: testedVulns,
      activeTesting: testedVulns > 0
    };
  }
}

// Create default security analysis instance
export function createSecurityAnalysis(config: SecurityAnalysisConfig) {
  return new SecurityAnalysis(config);
}

// Export types for convenience
export type { EnhancedSecAnalysis, VulnRecord } from './vulnerabilityAnalysis.js'; 