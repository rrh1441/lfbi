/* =============================================================================
 * MODULE: techStackScan.ts (Enhanced v5 – Orchestration Layer)
 * =============================================================================
 * Main orchestration for technology fingerprinting with vulnerability intelligence,
 * SBOM generation, and supply‑chain risk scoring. Now simplified to focus on
 * coordination between specialized modules.
 * =============================================================================
 */

import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';
import { runNuclei as runNucleiWrapper, filterWebVulnUrls } from '../util/nucleiWrapper.js';
import { 
  createTechDetection, 
  DEFAULT_TECH_CONFIG, 
  type WappTech,
  detectEcosystem
} from './techDetection/index.js';
import { normalizeTechnology, type NormalizedComponent } from '../util/cpeNormalization.js';
import { batchVulnerabilityAnalysis, type ComponentVulnerabilityReport } from '../util/versionMatcher.js';
import { batchFindOSVVulnerabilities, mergeVulnerabilityResults } from '../util/osvIntegration.js';
import { createSBOMGenerator } from './sbomGenerator.js';
import { UnifiedCache } from './techCache/index.js';
import { createTechStackConfig } from './techStackConfig.js';
import { createTargetDiscovery } from './targetDiscovery.js';
import { createSecurityAnalysis } from './securityAnalysis.js';

// ───────────────── Configuration ────────────────────────────────────────────
const CONFIG = {
  MAX_CONCURRENCY: 6,
  TECH_CIRCUIT_BREAKER: 20,
  PAGE_TIMEOUT_MS: 25_000,
  MAX_VULN_IDS_PER_FINDING: 12,
} as const;

type Severity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
const RISK_TO_SEVERITY: Record<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', Severity> = {
  LOW: 'INFO',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

// ───────────────── Types ────────────────────────────────────────────────────
// Types imported from specialized modules
interface ClassifiedTarget {
  url: string;
  assetType: 'html' | 'nonHtml';
}

interface VulnRecord {
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

interface EnhancedSecAnalysis {
  eol: boolean;
  vulns: VulnRecord[];
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  advice: string[];
  versionAccuracy?: number;
  supplyChainScore: number;
  activeVerification?: {
    tested: number;
    exploitable: number;
    notExploitable: number;
  };
}

interface ScanMetrics {
  totalTargets: number;
  thirdPartyOrigins: number;
  uniqueTechs: number;
  supplyFindings: number;
  runMs: number;
  circuitBreakerTripped: boolean;
  cacheHitRate: number;
  dynamic_browser_skipped?: boolean;
}

// ───────────────── Unified Cache System ────────────────────────────────────
// Initialize configuration and unified cache
const techConfig = createTechStackConfig();
const unifiedCache = new UnifiedCache({
  maxEntries: 10_000,
  maxMemoryMB: techConfig.cacheMaxMemoryMB,
  defaultTtlMs: techConfig.cacheTtlMs,
});

const log = (...m: unknown[]) => rootLog('[techStackScan]', ...m);

// ─────────────── Helper functions ─────────────────
function summarizeVulnIds(v: VulnRecord[], max: number): string {
  const ids = v.slice(0, max).map(r => r.id);
  return v.length > max ? ids.join(', ') + ', …' : ids.join(', ');
}

// ───────────────── Main orchestration function ─────────────────────────────
export async function runTechStackScan(job: { 
  domain: string; 
  scanId: string;
  targets?: string[];
}): Promise<number> {
  const { domain, scanId, targets: providedTargets } = job;
  const start = Date.now();
  log(`techstack=start domain=${domain}`);
  
  // Check for nuclei wrapper (required for tech detection)
  let nucleiAvailable = false;
  try {
    const testResult = await runNucleiWrapper({ version: true });
    nucleiAvailable = testResult.success;
    log(`techstack=nuclei wrapper confirmed available`);
  } catch (error) {
    log(`techstack=nuclei wrapper not available: ${(error as Error).message}`);
    nucleiAvailable = false;
  }
  
  try {
    // Initialize specialized modules
    const targetDiscovery = createTargetDiscovery({
      maxThirdPartyRequests: 200,
      pageTimeout: CONFIG.PAGE_TIMEOUT_MS,
      maxDiscoveredEndpoints: 100,
      enablePuppeteer: true
    });

    const securityAnalysis = createSecurityAnalysis({
      cache: unifiedCache,
      maxConcurrency: 3,
      enableActiveVerification: true,
      enableEOLCheck: true
    });

    // 1. TARGET DISCOVERY
    log(`techstack=target_discovery starting for domain=${domain}`);
    const targetResult = await targetDiscovery.discoverTargets(scanId, domain, providedTargets);
    const htmlTargets = targetDiscovery.getHtmlTargets([...targetResult.primary, ...targetResult.thirdParty]);
    
    // Apply filtering to HTML targets for scanner compatibility
    const { webUrls: allTargets, skippedCount } = filterWebVulnUrls(htmlTargets);
    
    log(`techstack=targets primary=${targetResult.primary.length} thirdParty=${targetResult.thirdParty.length} ` +
        `total=${targetResult.total} html=${targetResult.metrics.htmlCount} ` +
        `finalHtml=${allTargets.length} nonHtml=${targetResult.metrics.nonHtmlCount} skipped=${skippedCount}`);
    
    // 2. TECHNOLOGY DETECTION
    const techDetection = createTechDetection({
      ...DEFAULT_TECH_CONFIG,
      maxConcurrency: CONFIG.MAX_CONCURRENCY,
      timeout: CONFIG.PAGE_TIMEOUT_MS,
      maxTargets: 5
    });

    log(`techstack=tech_detection starting unified detection for ${allTargets.length} targets`);
    const detectionResult = await techDetection.detectTechnologies(allTargets, {
      maxConcurrency: CONFIG.MAX_CONCURRENCY,
      timeout: CONFIG.PAGE_TIMEOUT_MS,
      circuitBreakerLimit: CONFIG.TECH_CIRCUIT_BREAKER,
      enableFavicons: true,
      enableNuclei: false,
      maxTargets: 5
    });
    
    // Build tech maps from detection results
    const techMap = new Map<string, WappTech>();
    const detectMap = new Map<string, WappTech[]>();
    
    for (const tech of detectionResult.technologies) {
      techMap.set(tech.slug, tech);
      
      if (!detectMap.has(tech.slug)) {
        detectMap.set(tech.slug, []);
      }
      detectMap.get(tech.slug)!.push(tech);
    }
    
    log(`techstack=tech_detection_complete techs=${detectionResult.technologies.length} ` +
        `duration=${detectionResult.totalDuration}ms methods=[${detectionResult.detectionMethods.join(',')}] ` +
        `circuit_breaker=${detectionResult.circuitBreakerTripped}`);
    
    // 3. SECURITY ANALYSIS
    log(`techstack=security_analysis starting for ${Array.from(techMap.values()).length} technologies`);
    const analysisMap = await securityAnalysis.batchAnalyzeSecurityEnhanced(
      Array.from(techMap.values()),
      detectMap,
      allTargets
    );

    // 4. ENHANCED VULNERABILITY ANALYSIS (NVD + OSV.dev)
    log(`techstack=vuln_analysis starting enhanced vulnerability analysis`);
    const normalizedComponents = Array.from(techMap.values()).map(tech => 
      normalizeTechnology(tech.name, tech.version, tech.confidence, 'fast-detection')
    );
    
    // Batch vulnerability analysis with NVD + OSV.dev
    const vulnerabilityReports = await batchVulnerabilityAnalysis(normalizedComponents);
    
    // Enhance with OSV.dev data for open source packages
    log(`techstack=osv_enhancement starting OSV.dev integration for ${normalizedComponents.length} components`);
    const osvVulnerabilities = await batchFindOSVVulnerabilities(normalizedComponents);
    
    // Merge NVD and OSV results
    for (let i = 0; i < vulnerabilityReports.length; i++) {
      const report = vulnerabilityReports[i];
      const osvVulns = osvVulnerabilities[i] || [];
      
      if (osvVulns.length > 0) {
        report.vulnerabilities = mergeVulnerabilityResults(report.vulnerabilities, osvVulns);
        log(`techstack=osv_merged component="${report.component.name}" ` +
            `nvd=${report.vulnerabilities.length - osvVulns.length} osv=${osvVulns.length} total=${report.vulnerabilities.length}`);
      }
    }
    
    // 5. SBOM GENERATION
    const sbomGenerator = createSBOMGenerator();
    const sbomResult = sbomGenerator.generate({
      vulnerabilityReports,
      targetName: domain,
      targetVersion: undefined,
      targetDescription: `Security scan of ${domain}`,
      scanId: scanId!,
      domain: domain
    });
    
    log(`techstack=sbom_generated components=${sbomResult.stats.componentCount} ` +
        `vulnerabilities=${sbomResult.stats.vulnerabilityCount} critical=${sbomResult.stats.criticalCount}`);
    
    // Store SBOM as artifact
    await insertArtifact({
      type: 'sbom',
      val_text: `SBOM generated: ${sbomResult.stats.componentCount} components, ${sbomResult.stats.vulnerabilityCount} vulnerabilities`,
      severity: sbomResult.stats.criticalCount > 0 ? 'CRITICAL' : sbomResult.stats.highCount > 0 ? 'HIGH' : 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        sbom_format: sbomResult.format,
        sbom_data: sbomGenerator.export(sbomResult.sbom, 'json'),
        stats: sbomResult.stats
      }
    });

    // 6. ARTIFACT AND FINDING GENERATION
    let artCount = 0, supplyFindings = 0;
    for (const [slug, tech] of techMap) {
      const analysis = analysisMap.get(slug)!;
      const artId = await insertArtifact({
        type: 'technology',
        val_text: `${tech.name}${tech.version ? ' v'+tech.version : ''}`,
        severity: RISK_TO_SEVERITY[analysis.risk],
        meta: { 
          scan_id: scanId, 
          scan_module: 'techStackScan',
          technology: tech, 
          security: analysis,
          ecosystem: detectEcosystem(tech),
          supply_chain_score: analysis.supplyChainScore,
          version_accuracy: analysis.versionAccuracy,
          active_verification: analysis.activeVerification
        }
      });
      artCount++;
      
      if (analysis.vulns.length) {
        const exploitableVulns = analysis.vulns.filter(v => v.exploitable === true);
        const testedVulns = analysis.vulns.filter(v => v.activelyTested === true);
        const list = summarizeVulnIds(analysis.vulns, CONFIG.MAX_VULN_IDS_PER_FINDING);
        
        let description = `${analysis.vulns.length} vulnerabilities detected: ${list}`;
        
        // Add exploitability info if we tested with Nuclei
        if (testedVulns.length > 0 && exploitableVulns.length > 0) {
          description = `${analysis.vulns.length} vulnerabilities detected (⚠️ ${exploitableVulns.length} CONFIRMED EXPLOITABLE): ${list}`;
        } else if (testedVulns.length > 0) {
          description = `${analysis.vulns.length} vulnerabilities detected (${testedVulns.length} tested, ${exploitableVulns.length} exploitable): ${list}`;
        }
        
        await insertFinding(
          artId,
          'EXPOSED_SERVICE',
          description,
          analysis.advice.join(' ')
        );
      } else if (analysis.advice.length) {
        await insertFinding(
          artId,
          'TECHNOLOGY_RISK',
          analysis.advice.join(' '),
          `Analysis for ${tech.name}${tech.version ? ' v'+tech.version : ''}. Supply chain score: ${analysis.supplyChainScore.toFixed(1)}/10.`
        );
      }
      
      if (analysis.supplyChainScore >= 7.0) {
        supplyFindings++;
      }
    }

    // 7. METRICS AND SUMMARY
    const securityMetrics = securityAnalysis.calculateSecurityMetrics(analysisMap);
    const runMs = Date.now() - start;
    
    const metrics: ScanMetrics = {
      totalTargets: targetResult.total,
      thirdPartyOrigins: targetResult.thirdParty.length,
      uniqueTechs: Array.from(techMap.values()).length,
      supplyFindings,
      runMs,
      circuitBreakerTripped: detectionResult.circuitBreakerTripped,
      cacheHitRate: 0,
      dynamic_browser_skipped: targetResult.metrics.thirdPartySkipped
    };

    await insertArtifact({
      type: 'scan_summary',
      val_text: `Technology scan completed: ${metrics.uniqueTechs} technologies, ${securityMetrics.totalVulnerabilities} vulnerabilities, ${metrics.supplyFindings} supply chain risks`,
      severity: securityMetrics.criticalTechnologies > 0 ? 'CRITICAL' : 
                securityMetrics.highRiskTechnologies > 0 ? 'HIGH' : 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        metrics,
        security_metrics: securityMetrics,
        scan_duration_ms: runMs
      }
    });

    log(`techstack=complete domain=${domain} artifacts=${artCount} techs=${metrics.uniqueTechs} ` +
        `vulns=${securityMetrics.totalVulnerabilities} supply_risks=${metrics.supplyFindings} ` +
        `runtime=${runMs}ms active_testing=${securityMetrics.activeTesting}`);

    return artCount;

  } catch (error) {
    log(`techstack=error domain=${domain} error="${(error as Error).message}"`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `Technology stack scan failed: ${(error as Error).message}`,
      severity: 'HIGH',
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        error: (error as Error).message,
        stack: (error as Error).stack
      }
    });
    
    return 0;
  }
}