/**
 * Accessibility Scan Module
 * 
 * Performs real WCAG 2.1 AA compliance testing to identify accessibility violations
 * that create genuine ADA lawsuit risk for companies.
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import axios from 'axios';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';

// Configuration constants
const PAGE_TIMEOUT_MS = 30_000;
const AXE_TIMEOUT_MS = 15_000;
const MAX_PAGES_TO_TEST = 15;
const BROWSER_VIEWPORT = { width: 1200, height: 800 };
const AXE_CORE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js';

// Enhanced logging
const log = (...args: unknown[]) => rootLog('[accessibilityScan]', ...args);

interface AccessibilityViolation {
  ruleId: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  help: string;
  helpUrl: string;
  elements: {
    selector: string;
    html: string;
    target: string[];
  }[];
  pageUrl: string;
}

interface AccessibilityPageResult {
  url: string;
  tested: boolean;
  violations: AccessibilityViolation[];
  passes: number;
  incomplete: number;
  error?: string;
}

interface AccessibilityScanSummary {
  totalPages: number;
  pagesSuccessful: number;
  totalViolations: number;
  criticalViolations: number;
  seriousViolations: number;
  worstPage: string;
  commonIssues: string[];
}

/**
 * Smart page discovery - finds testable pages across common patterns and sitemap
 */
async function discoverTestablePages(domain: string): Promise<string[]> {
  const discoveredPages = new Set<string>();
  
  // 1. Essential pages (always test)
  const essentialPages = [
    `https://${domain}`,
    `https://${domain}/`,
    `https://www.${domain}`,
    `https://www.${domain}/`
  ];
  
  // 2. Common page patterns
  const commonPaths = [
    '/contact', '/about', '/services', '/products', '/pricing',
    '/signup', '/login', '/register', '/join',
    '/search', '/help', '/support', '/faq',
    '/privacy', '/terms', '/accessibility-statement'
  ];
  
  // 3. Sitemap discovery
  try {
    const sitemaps = [`https://${domain}/sitemap.xml`, `https://www.${domain}/sitemap.xml`];
    for (const sitemapUrl of sitemaps) {
      try {
        const { data } = await axios.get(sitemapUrl, { timeout: 10000 });
        const urlMatches = data.match(/<loc>(.*?)<\/loc>/g);
        if (urlMatches) {
          urlMatches.forEach((match: string) => {
            const url = match.replace(/<\/?loc>/g, '');
            if (isTestableUrl(url)) {
              discoveredPages.add(url);
            }
          });
        }
      } catch {
        // Continue if sitemap fails
      }
    }
  } catch {
    // Sitemap not available, continue with common paths
  }
  
  // Add essential and common paths
  const baseUrls = [`https://${domain}`, `https://www.${domain}`];
  baseUrls.forEach(base => {
    essentialPages.forEach(page => discoveredPages.add(page));
    commonPaths.forEach(path => discoveredPages.add(base + path));
  });
  
  // Limit to prevent excessive testing
  return Array.from(discoveredPages).slice(0, MAX_PAGES_TO_TEST);
}

/**
 * Check if URL is testable (filter out non-HTML resources)
 */
function isTestableUrl(url: string): boolean {
  const skipPatterns = [
    /\.(pdf|doc|docx|zip|exe|dmg)$/i,
    /\.(jpg|jpeg|png|gif|svg|ico)$/i,
    /\.(css|js|xml|json)$/i,
    /mailto:|tel:|javascript:/i
  ];
  
  return !skipPatterns.some(pattern => pattern.test(url));
}

/**
 * Test accessibility for a single page using axe-core
 */
async function testPageAccessibility(page: Page, url: string): Promise<AccessibilityPageResult> {
  try {
    log(`Testing accessibility for: ${url}`);
    
    // Navigate to page
    const response = await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: PAGE_TIMEOUT_MS 
    });
    
    if (!response || response.status() >= 400) {
      return { 
        url, 
        tested: false, 
        violations: [], 
        passes: 0, 
        incomplete: 0, 
        error: `HTTP ${response?.status()}` 
      };
    }
    
    // Wait for page to stabilize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Inject axe-core
    await page.addScriptTag({ url: AXE_CORE_CDN });
    
    // Run accessibility scan
    const results = await page.evaluate(async () => {
      // Configure axe for WCAG 2.1 AA
      const config = {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa']
        },
        rules: {
          'color-contrast': { enabled: true },
          'image-alt': { enabled: true },
          'button-name': { enabled: true },
          'link-name': { enabled: true },
          'form-field-multiple-labels': { enabled: true },
          'keyboard-navigation': { enabled: true },
          'focus-order-semantics': { enabled: true },
          'landmark-one-main': { enabled: true },
          'page-has-heading-one': { enabled: true }
        }
      };
      
      return await (window as any).axe.run(document, config);
    });
    
    // Transform results
    const violations: AccessibilityViolation[] = results.violations.map((violation: any) => ({
      ruleId: violation.id,
      impact: violation.impact || 'minor',
      description: violation.description,
      help: violation.help,
      helpUrl: violation.helpUrl,
      elements: violation.nodes.map((node: any) => ({
        selector: node.target.join(' '),
        html: node.html,
        target: node.target
      })),
      pageUrl: url
    }));
    
    log(`Accessibility test complete for ${url}: ${violations.length} violations, ${results.passes.length} passes`);
    
    return {
      url,
      tested: true,
      violations,
      passes: results.passes.length,
      incomplete: results.incomplete.length
    };
    
  } catch (error) {
    log(`Accessibility test error for ${url}: ${(error as Error).message}`);
    return { 
      url, 
      tested: false, 
      violations: [], 
      passes: 0, 
      incomplete: 0, 
      error: (error as Error).message 
    };
  }
}

/**
 * Analyze scan results to generate summary
 */
function analyzeScanResults(pageResults: AccessibilityPageResult[]): AccessibilityScanSummary {
  const successful = pageResults.filter(p => p.tested);
  const allViolations = successful.flatMap(p => p.violations);
  
  const criticalViolations = allViolations.filter(v => v.impact === 'critical');
  const seriousViolations = allViolations.filter(v => v.impact === 'serious');
  
  // Find worst page
  const worstPage = successful.reduce((worst, current) => 
    current.violations.length > worst.violations.length ? current : worst
  , successful[0] || { url: 'none', violations: [] });
  
  // Find most common issues
  const issueFrequency = new Map<string, number>();
  allViolations.forEach(v => {
    issueFrequency.set(v.ruleId, (issueFrequency.get(v.ruleId) || 0) + 1);
  });
  
  const commonIssues = Array.from(issueFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([rule]) => rule);
  
  return {
    totalPages: pageResults.length,
    pagesSuccessful: successful.length,
    totalViolations: allViolations.length,
    criticalViolations: criticalViolations.length,
    seriousViolations: seriousViolations.length,
    worstPage: worstPage.url,
    commonIssues
  };
}

/**
 * Create accessibility artifact with scan summary
 */
async function createAccessibilityArtifact(
  scanId: string, 
  domain: string, 
  summary: AccessibilityScanSummary, 
  pageResults: AccessibilityPageResult[]
): Promise<number> {
  
  let severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' = 'INFO';
  if (summary.criticalViolations > 0) severity = 'HIGH';
  else if (summary.seriousViolations > 5) severity = 'HIGH';
  else if (summary.seriousViolations > 0 || summary.totalViolations > 10) severity = 'MEDIUM';
  else if (summary.totalViolations > 0) severity = 'LOW';
  
  return await insertArtifact({
    type: 'accessibility_summary',
    val_text: `Accessibility scan: ${summary.totalViolations} violations across ${summary.pagesSuccessful} pages (${summary.criticalViolations} critical, ${summary.seriousViolations} serious)`,
    severity,
    meta: {
      scan_id: scanId,
      scan_module: 'accessibilityScan',
      domain,
      summary,
      page_results: pageResults,
      legal_risk_assessment: {
        ada_lawsuit_risk: severity === 'HIGH' ? 'HIGH' : severity === 'MEDIUM' ? 'MEDIUM' : 'LOW',
        wcag_compliance: summary.totalViolations === 0 ? 'COMPLIANT' : 'NON_COMPLIANT',
        recommended_action: severity === 'HIGH' 
          ? 'Immediate remediation required to reduce legal risk'
          : severity === 'MEDIUM'
          ? 'Schedule accessibility improvements within 60 days'
          : 'Consider accessibility improvements in next development cycle'
      }
    }
  });
}

/**
 * Generate findings for accessibility violations
 */
async function createAccessibilityFindings(artifactId: number, pageResults: AccessibilityPageResult[]): Promise<number> {
  let findingsCount = 0;
  
  // Group violations by rule for cleaner reporting
  const violationsByRule = new Map<string, AccessibilityViolation[]>();
  
  pageResults.forEach(page => {
    page.violations.forEach(violation => {
      if (!violationsByRule.has(violation.ruleId)) {
        violationsByRule.set(violation.ruleId, []);
      }
      violationsByRule.get(violation.ruleId)!.push(violation);
    });
  });
  
  // Create findings for each rule violation
  for (const [ruleId, violations] of violationsByRule) {
    const impact = violations[0].impact;
    const severity = impact === 'critical' ? 'HIGH' : impact === 'serious' ? 'MEDIUM' : 'LOW';
    
    const affectedPages = [...new Set(violations.map(v => v.pageUrl))];
    const totalElements = violations.reduce((sum, v) => sum + v.elements.length, 0);
    
    const description = `${violations[0].description} (${totalElements} elements across ${affectedPages.length} pages)`;
    const evidence = `Rule: ${ruleId} | Impact: ${impact} | Help: ${violations[0].helpUrl}`;
    
    await insertFinding(
      artifactId,
      'ACCESSIBILITY_VIOLATION',
      description,
      evidence
    );
    
    findingsCount++;
  }
  
  return findingsCount;
}

/**
 * Main accessibility scan function
 */
export async function runAccessibilityScan(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  const startTime = Date.now();
  
  log(`Starting accessibility scan for domain="${domain}"`);
  
  let browser: Browser | undefined;
  const pageResults: AccessibilityPageResult[] = [];
  
  try {
    // Launch browser with enhanced stability options
    browser = await puppeteer.launch({
      headless: true,
      // Enhanced args for better stability and performance
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--disable-web-security',
        '--disable-dev-shm-usage',      // Overcome limited resource problems
        '--disable-accelerated-2d-canvas',  // Disable hardware acceleration
        '--disable-gpu',                // Disable GPU hardware acceleration
        '--window-size=1920x1080'       // Set consistent window size
      ],
      // Increase protocol timeout for better stability
      protocolTimeout: 90000,
      // Browser launch timeout
      timeout: 60000,
      // Enable dumpio for debugging in development
      dumpio: process.env.NODE_ENV === 'development' || process.env.DEBUG_PUPPETEER === 'true'
    });
    
    const page = await browser.newPage();
    await page.setViewport(BROWSER_VIEWPORT);
    
    // Discover pages to test
    const pagesToTest = await discoverTestablePages(domain);
    log(`Discovered ${pagesToTest.length} pages to test for accessibility`);
    
    // Test each page
    for (const url of pagesToTest) {
      const result = await testPageAccessibility(page, url);
      pageResults.push(result);
      
      // Rate limiting between pages
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Analyze results
    const summary = analyzeScanResults(pageResults);
    log(`Accessibility analysis complete: ${summary.totalViolations} violations (${summary.criticalViolations} critical, ${summary.seriousViolations} serious)`);
    
    // Create artifacts and findings
    const artifactId = await createAccessibilityArtifact(scanId, domain, summary, pageResults);
    const findingsCount = await createAccessibilityFindings(artifactId, pageResults);
    
    const duration = Date.now() - startTime;
    log(`Accessibility scan completed: ${findingsCount} findings from ${summary.pagesSuccessful}/${summary.totalPages} pages in ${duration}ms`);
    
    return findingsCount;
    
  } catch (error) {
    const errorMsg = (error as Error).message;
    log(`Accessibility scan failed: ${errorMsg}`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `Accessibility scan failed: ${errorMsg}`,
      severity: 'MEDIUM',
      meta: { 
        scan_id: scanId, 
        scan_module: 'accessibilityScan',
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    return 0;
    
  } finally {
    await browser?.close();
  }
}