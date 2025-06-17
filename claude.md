//New Malware module

Excellent context! This completely changes the integration pattern. Here's the **updated prompt** that reflects the artifact pipeline architecture:

## 🔄 **Enhanced AbuseIntel-GPT Prompt**

```markdown
SYSTEM
You are **AbuseIntel-GPT**, an autonomous scanner module for DealBrief's artifact pipeline.

Your mission
• **Query artifact store** for all `type:"ip"` artifacts from the current scan
• **Check each IP** against AbuseIPDB v2 "/check" endpoint  
• **Generate risk findings** for IPs with material security threats
• **Link findings** back to original artifacts for traceability

Input integration
• **Consume artifacts**: Query `SELECT * FROM artifacts WHERE type='ip' AND scan_id=$scanId`
• **Process sequentially**: Respect rate limits across all discovered IPs (~60 typical)
• **Reference originals**: Use `artefact_id` from source IP artifact in findings

Technical constraints
• **Rate-limit**: 30 requests/minute (2.0±0.2s jittered delays between calls)
• **Timeout**: 10s per request, log failure and continue
• **API key**: Require ABUSEIPDB_API_KEY environment variable
• **Deduplication**: Skip duplicate IPs within same scan
• **IPv6 handling**: Process both IPv4 and IPv6 addresses

Risk assessment thresholds
• abuseConfidenceScore **< 25** → no finding (log as clean)
• **25-69** → severity `MEDIUM`, finding_type `SUSPICIOUS_IP`  
• **≥ 70** → severity `HIGH`, finding_type `MALICIOUS_IP`

Pipeline integration
• **Input**: Scan ID parameter to identify current scan artifacts
• **Processing**: Sequential IP checks with rate limiting
• **Output**: Insert findings via `insertFinding(artifactId, findingType, description, evidence)`
• **Metrics**: Log final stats: `{ totalIPs, suspicious, malicious, errors, scanTimeMs }`

Error handling
• **Missing API key**: Emit scan_warning artifact and exit gracefully
• **API failures**: Log error, continue with remaining IPs
• **Invalid IPs**: Skip with warning, don't count against rate limit
• **Rate limit hit**: Exponential backoff with 3 retries max

Example integration flow:
```typescript
export async function runAbuseIntelScan(job: { scanId: string }): Promise<number> {
  const ipArtifacts = await getIPArtifacts(job.scanId);
  let findings = 0;
  
  for (const artifact of ipArtifacts) {
    const risk = await checkAbuseIPDB(artifact.data);
    if (risk.confidence >= 25) {
      await insertFinding(artifact.id, risk.findingType, risk.description, risk.evidence);
      findings++;
    }
    await jitteredDelay();
  }
  
  return findings;
}
```

Output schema (per finding):
```json
{
  "artefact_id": "string // UUID from source IP artifact",
  "ip": "string",
  "finding_type": "MALICIOUS_IP | SUSPICIOUS_IP", 
  "severity": "HIGH | MEDIUM",
  "description": "string // ≤120 chars, actionable",
  "evidence": {
    "abuseConfidenceScore": 0,
    "totalReports": 0, 
    "lastReportedAt": "YYYY-MM-DD",
    "categories": ["string", ...]
  },
  "recommendation": "string // ≤120 chars, specific action"
}
```

Success criteria:
• Processes ~60 IPs in <3 minutes (respecting rate limits)
• Links all findings back to source artifacts for traceability  
• Handles API failures gracefully without stopping scan
• Stays well under 1000/day AbuseIPDB quota limit
```

## 🎯 **Key Changes:**

1. **Artifact Pipeline Integration** - Module now queries artifact store instead of receiving IPs directly
2. **Scan Context** - Takes `scanId` parameter to find relevant IP artifacts  
3. **Traceability** - Links findings back to original source artifacts
4. **Volume Awareness** - Acknowledges ~60 IP typical volume and quota constraints
5. **Pipeline Flow** - Clear integration with existing DealBrief artifact/finding system


# TECHSTACK SCAN ENHANCEMENT PROMPT

## CONTEXT
You are upgrading an existing TypeScript module called "techStackScan.ts" that fingerprints technologies with Wappalyzer and correlates vulnerabilities. Enhance it with modern intelligence sources and production-grade reliability.

## CORE REQUIREMENTS

### 1. SIMPLIFIED INTELLIGENCE STACK (OSV.dev + GitHub Only)
- **Remove all NVD API dependencies** - OSV.dev already mirrors NVD data with better coverage
- **Use OSV.dev** as primary vulnerability source (https://api.osv.dev/v1/query)
- **Use GitHub Security Advisory Database** via GraphQL API as secondary source
- **Add EPSS scores** from https://api.first.org/data/v1/epss?cve=CVE-xxxx
- **Add CISA-KEV data** from https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
- **No Snyk API** - replaced with free alternatives

### 2. STABILITY & PERFORMANCE ENHANCEMENTS
- **Replace Promise.allSettled loops** with p-limit queue (MAX_CONCURRENCY = 6)
- **Add circuit breaker**: if >20 Wappalyzer timeouts occur, abort remaining targets and emit scan_warning
- **Parallelize SBOM intelligence gathering** - use p-limit for 60-70% speed improvement
- **Add intelligent caching layer** with 24h TTL and hit-rate tracking (in-memory Map, not filesystem)

### 3. RUNTIME THIRD-PARTY DISCOVERY
- **Use Puppeteer** to collect third-party sub-resource origins for the apex domain
- **Deduplicate by eTLD+1** to avoid subdomain noise
- **Throttle to ≤200 requests** per crawl with 25s overall timeout
- **Replace deprecated page.waitForTimeout()** with standard setTimeout approach

### 4. ENHANCED VERSION CONFIDENCE
- **Calculate dynamic versionAccuracy metric**: `score = 1 – (stddev(major.minor.patch) / 10)` from all URLs reporting same slug
- **Warn when accuracy < 0.6** instead of fixed 70% threshold
- **Add proper null safety** for stats access in findings

### 5. SUPPLY-CHAIN RISK SCORING
- **Calculate numeric SupplyChainScore per component**: `0.4*CVSSmax + 0.4*(EPSS*10) + 0.2*(KEV?10:0)` → 0-10 scale
- **Flag findings for components** with score ≥ 7
- **Properly normalize EPSS** from 0-1 to 0-10 scale to match CVSS

### 6. SBOM GENERATION (CycloneDX 1.5)
- **Generate custom CycloneDX 1.5 SBOM** instead of relying on Syft (which doesn't work with live URLs)
- **Include vulnerability data** from OSV + GitHub in SBOM
- **Add component intelligence** from deps.dev for metadata
- **Include SPDX license information** and risk classification

### 7. GITHUB API OPTIMIZATION
- **Batch GraphQL queries** with max 25 packages per request, 20 vulnerabilities per package (≤500 nodes total)
- **Add 1s delays between batches** to respect rate limits
- **Only require GITHUB_TOKEN** environment variable (optional but recommended)

### 8. LOGGING & METRICS
- **Use JSON-style logging**: `key=value` format throughout
- **Emit techscan_metrics artifact** at scan end: `{ totalTargets, thirdPartyOrigins, uniqueTechs, supplyFindings, runMs, circuitBreakerTripped, cacheHitRate }`
- **Track performance metrics** and cache efficiency

### 9. ERROR HANDLING & TYPE SAFETY
- **Remove all unused imports** (writeFile, readFile, mkdir, spawn)
- **Fix non-null assertions** - add proper guards for undefined stats access
- **Clean VulnRecord interface**: only allow `source: 'OSV' | 'GITHUB'`
- **Eliminate orphaned code fragments** and ensure clean class structure

### 10. PACKAGE INTELLIGENCE SOURCES (Free Alternatives)
- **deps.dev API**: Package metadata, popularity, maintenance info
- **OpenSSF Scorecard**: Security scoring for GitHub repositories  
- **License analysis**: SPDX parsing with risk classification
- **Ecosystem detection**: Map Wappalyzer categories to package ecosystems (npm, PyPI, etc.)

## IMPLEMENTATION NOTES

### Required Dependencies:
```typescript
import pLimit from 'p-limit';
import puppeteer from 'puppeteer';
// All other imports should be Node.js built-ins or existing project modules


//New Module
ADVERSARIAL MEDIA SCAN MODULE CREATION PROMPT
CONTEXT
You are creating a new TypeScript module called "adversarialMediaScan.ts" for DealBrief's security scanning platform. This module performs reputational risk detection by searching for adverse media coverage about target companies using Serper.dev's search API.
MODULE PURPOSE

Detect reputational risks through adverse media monitoring
Categorize threats by risk type (litigation, breaches, scandals, etc.)
Generate actionable findings for security due diligence
Integrate seamlessly with DealBrief's artifact/finding pipeline

CORE REQUIREMENTS
1. SERPER.DEV INTEGRATION

Use regular search endpoint: https://google.serper.dev/search (consistent with other modules)
Require SERPER_KEY: Environment variable, fail gracefully if missing
Handle API responses: Process data.organic results from search endpoint
Rate limiting: Add delays between multiple queries to respect API limits
Error resilience: Continue with partial results if some queries fail

2. SEARCH STRATEGY

Multi-query approach: Use 3-4 targeted search queries instead of single large query
Precise targeting: Use quoted company names and domains for accuracy
Comprehensive coverage: Search for lawsuits, breaches, scandals, bankruptcies, recalls
Time-bounded: Focus on recent articles within configurable window (default 24 months)
Result deduplication: Remove duplicate articles by URL across queries

3. RISK CATEGORIZATION
Create clear classification for adverse media into these categories:

Litigation / Regulatory: Lawsuits, fines, regulatory actions, settlements
Data Breach / Cyber Incident: Hacks, data leaks, ransomware, security failures
Executive Misconduct: Fraud, harassment, scandals involving leadership
Financial Distress: Bankruptcy, layoffs, financial troubles, defaults
Product Safety / Customer Harm: Recalls, injuries, product defects
Social / Environmental Controversy: ESG issues, discrimination, pollution

4. FUNCTION SIGNATURE
typescriptexport async function runAdversarialMediaScan(job: { 
  company: string; 
  domain: string; 
  scanId: string 
}): Promise<number>
5. IMPLEMENTATION REQUIREMENTS
Configuration Constants:
typescriptconst SERPER_ENDPOINT = 'https://google.serper.dev/search';
const WINDOW_DAYS = 730; // 24 months lookback
const API_TIMEOUT_MS = 15_000;
const MAX_RESULTS_PER_QUERY = 20;
const MAX_FINDINGS_PER_CATEGORY = 5;
const QUERY_DELAY_MS = 1000; // Between queries
Search Query Examples:
typescriptconst searchQueries = [
  `"${company}" (lawsuit OR "legal action" OR fine OR settlement OR sued)`,
  `"${domain}" (breach OR hack OR "data breach" OR "security incident" OR ransomware)`,
  `"${company}" (bankruptcy OR layoffs OR "financial distress" OR recall OR scandal)`,
  `"${company}" CEO OR founder (fraud OR misconduct OR harassment OR arrested)`
];
Required Interfaces:
typescriptinterface SerperSearchResult {
  title: string;
  link: string;
  snippet: string;
  date?: string;
  source?: string;
}

interface CategorizedArticle extends SerperSearchResult {
  category: string;
  relevanceScore: number;
}
6. PROCESSING LOGIC

Validate inputs: Ensure company and domain are provided
Check API key: Fail gracefully with scan_error artifact if missing
Execute search queries: Process each query with error handling and delays
Filter results: Remove old articles outside time window
Deduplicate: Remove duplicate URLs across all queries
Categorize articles: Classify each article into risk categories
Generate artifacts: Create summary artifact with all findings
Create findings: Generate individual findings for top articles per category

7. ERROR HANDLING & RESILIENCE

API failures: Log errors but continue with other queries
Invalid responses: Handle missing fields gracefully
Rate limiting: Implement delays and respect API quotas
Input validation: Check for required parameters
Partial success: Return results even if some queries fail

8. LOGGING & METRICS
Use structured logging with key=value format:
typescriptlog(`mediaScan=start company="${company}" domain="${domain}"`);
log(`mediaScan=query query="${query}" results=${results.length}`);
log(`mediaScan=categorized total=${articles.length} categories=${Object.keys(categories).length}`);
log(`mediaScan=complete findings=${findingsCount} duration=${duration}ms`);
9. INTEGRATION WITH DEALBRIEF PIPELINE
Import Requirements:
typescriptimport axios from 'axios';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
Artifact Creation:
typescriptconst artifactId = await insertArtifact({
  type: 'adverse_media_summary',
  val_text: `Found ${totalArticles} adverse media articles across ${categoryCount} risk categories`,
  severity: totalArticles > 10 ? 'HIGH' : totalArticles > 0 ? 'MEDIUM' : 'INFO',
  meta: {
    scan_id: scanId,
    scan_module: 'adversarialMediaScan',
    total_articles: totalArticles,
    categories: categorizedResults,
    scan_duration_ms: duration,
    queries_successful: successfulQueries,
    queries_total: totalQueries
  }
});
Finding Generation:
typescript// Generate findings for top articles in each category
for (const [category, articles] of Object.entries(categorizedResults)) {
  const topArticles = articles
    .sort((a, b) => new Date(b.date || '1970-01-01').getTime() - new Date(a.date || '1970-01-01').getTime())
    .slice(0, MAX_FINDINGS_PER_CATEGORY);

  for (const article of topArticles) {
    await insertFinding(
      artifactId,
      'ADVERSE_MEDIA',
      `${category}: ${article.title}`,
      `Source: ${article.source || 'Unknown'} | Link: ${article.link}`
    );
  }
}
10. REQUIRED HELPER FUNCTIONS
Article Classification:
typescriptfunction classifyArticle(title: string, snippet: string): string {
  const text = (title + ' ' + snippet).toLowerCase();
  
  // Clear conditional logic for each category
  if (/lawsuit|litigation|regulator|fine|settlement|sued|court/.test(text)) {
    return 'Litigation / Regulatory';
  }
  // ... etc for each category
  
  return 'Other'; // or filter out
}
Date Filtering:
typescriptfunction isRecentArticle(dateStr: string | undefined, windowDays: number): boolean {
  if (!dateStr) return true; // Include if no date info
  
  const articleDate = new Date(dateStr).getTime();
  const cutoffDate = Date.now() - (windowDays * 24 * 60 * 60 * 1000);
  
  return articleDate > cutoffDate;
}
Deduplication:
typescriptfunction deduplicateArticles(articles: SerperSearchResult[]): SerperSearchResult[] {
  const seen = new Set<string>();
  return articles.filter(article => {
    if (seen.has(article.link)) return false;
    seen.add(article.link);
    return true;
  });
}
SUCCESS CRITERIA

✅ Compiles cleanly with TypeScript
✅ Integrates properly with DealBrief artifact/finding system
✅ Uses Serper.dev search endpoint consistently with other modules
✅ Handles API failures gracefully without stopping scans
✅ Categorizes adverse media into meaningful risk buckets
✅ Generates actionable findings with proper evidence links
✅ Implements proper rate limiting and error handling
✅ Provides structured logging and performance metrics
✅ Returns count of findings generated

Generate a complete, production-ready adversarialMediaScan.ts module that implements all these requirements for adverse media detection and risk assessment.

# ACCESSIBILITY SCAN MODULE CREATION PROMPT

## CONTEXT
You are creating a new TypeScript module called "accessibilityScan.ts" for DealBrief's security scanning platform. This module performs **real WCAG 2.1 AA compliance testing** to identify accessibility violations that create genuine ADA lawsuit risk for companies.

## MODULE PURPOSE
- **Detect measurable accessibility violations** that could trigger ADA lawsuits
- **Generate objective, actionable findings** with specific remediation guidance
- **Test multiple pages** to assess overall accessibility posture
- **Focus on high-impact violations** that affect user accessibility
- **Provide legal risk assessment** based on violation severity and prevalence

## LEGAL CONTEXT
ADA compliance failures create **real legal liability**:
- Target, Domino's, Netflix all faced major ADA lawsuits
- Average settlement: $50K-$500K+ legal costs
- Violations are **objectively measurable** unlike other compliance areas
- WCAG 2.1 AA is the accepted legal standard

## CORE REQUIREMENTS

### 1. REAL ACCESSIBILITY TESTING (Not Documentation)
- **Use axe-core engine** for industry-standard WCAG 2.1 AA testing
- **Browser automation** with Puppeteer for accurate DOM analysis
- **Multiple page testing** - homepage, key user flows, forms
- **Comprehensive rule coverage** - color contrast, keyboard nav, screen readers, etc.
- **No keyword searching** - actual technical violation detection

### 2. PAGE SELECTION STRATEGY
Test strategically important pages that represent legal risk:
```typescript
const pageCategories = {
  essential: ['/', '/home', '/index.html'], // Homepage variants
  userForms: ['/contact', '/signup', '/login', '/register', '/checkout'],
  content: ['/about', '/services', '/products', '/blog'],
  legal: ['/privacy', '/terms', '/accessibility'],
  ecommerce: ['/shop', '/cart', '/payment', '/account']
};
```

### 3. FUNCTION SIGNATURE
```typescript
export async function runAccessibilityScan(job: { 
  domain: string; 
  scanId: string 
}): Promise<number>
```

### 4. IMPLEMENTATION REQUIREMENTS

#### Dependencies & Setup:
```typescript
import puppeteer from 'puppeteer';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

// Inject axe-core from CDN for consistency
const AXE_CORE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js';
```

#### Configuration Constants:
```typescript
const PAGE_TIMEOUT_MS = 30_000;
const AXE_TIMEOUT_MS = 15_000;
const MAX_PAGES_TO_TEST = 15;
const BROWSER_VIEWPORT = { width: 1200, height: 800 };
const CRITICAL_RULES = [
  'color-contrast',
  'image-alt', 
  'button-name',
  'link-name',
  'form-field-multiple-labels',
  'keyboard-navigation'
];
```

#### Required Interfaces:
```typescript
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
```

### 5. PAGE DISCOVERY & TESTING LOGIC

#### Smart Page Discovery:
```typescript
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
    }
  } catch {
    // Sitemap not available, continue with common paths
  }
  
  // Add common paths
  const baseUrls = [`https://${domain}`, `https://www.${domain}`];
  baseUrls.forEach(base => {
    essentialPages.forEach(page => discoveredPages.add(page));
    commonPaths.forEach(path => discoveredPages.add(base + path));
  });
  
  // Limit to prevent excessive testing
  return Array.from(discoveredPages).slice(0, MAX_PAGES_TO_TEST);
}

function isTestableUrl(url: string): boolean {
  // Filter out non-HTML resources
  const skipPatterns = [
    /\.(pdf|doc|docx|zip|exe|dmg)$/i,
    /\.(jpg|jpeg|png|gif|svg|ico)$/i,
    /\.(css|js|xml|json)$/i,
    /mailto:|tel:|javascript:/i
  ];
  
  return !skipPatterns.some(pattern => pattern.test(url));
}
```

#### Core Testing Function:
```typescript
async function testPageAccessibility(page: Page, url: string): Promise<AccessibilityPageResult> {
  try {
    log(`accessibility=testing url="${url}"`);
    
    // Navigate to page
    const response = await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: PAGE_TIMEOUT_MS 
    });
    
    if (!response || response.status() >= 400) {
      return { url, tested: false, violations: [], passes: 0, incomplete: 0, error: `HTTP ${response?.status()}` };
    }
    
    // Wait for page to stabilize
    await page.waitForTimeout(2000);
    
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
      
      return await axe.run(document, config);
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
    
    log(`accessibility=complete url="${url}" violations=${violations.length} passes=${results.passes.length}`);
    
    return {
      url,
      tested: true,
      violations,
      passes: results.passes.length,
      incomplete: results.incomplete.length
    };
    
  } catch (error) {
    log(`accessibility=error url="${url}" error="${(error as Error).message}"`);
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
```

### 6. MAIN SCAN ORCHESTRATION

```typescript
export async function runAccessibilityScan(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  log(`accessibility=start domain="${domain}"`);
  
  let browser: Browser | undefined;
  const pageResults: AccessibilityPageResult[] = [];
  
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    
    const page = await browser.newPage();
    await page.setViewport(BROWSER_VIEWPORT);
    
    // Discover pages to test
    const pagesToTest = await discoverTestablePages(domain);
    log(`accessibility=discovery domain="${domain}" pages=${pagesToTest.length}`);
    
    // Test each page
    for (const url of pagesToTest) {
      const result = await testPageAccessibility(page, url);
      pageResults.push(result);
      
      // Rate limiting between pages
      await page.waitForTimeout(1000);
    }
    
    // Analyze results
    const summary = analyzeScanResults(pageResults);
    
    // Create artifacts and findings
    const artifactId = await createAccessibilityArtifact(scanId, domain, summary, pageResults);
    const findingsCount = await createAccessibilityFindings(artifactId, pageResults);
    
    log(`accessibility=complete domain="${domain}" findings=${findingsCount} pages=${summary.pagesSuccessful}/${summary.totalPages}`);
    return findingsCount;
    
  } catch (error) {
    log(`accessibility=error domain="${domain}" error="${(error as Error).message}"`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `Accessibility scan failed: ${(error as Error).message}`,
      severity: 'HIGH',
      meta: { scan_id: scanId, scan_module: 'accessibilityScan' }
    });
    
    return 0;
    
  } finally {
    await browser?.close();
  }
}
```

### 7. RESULTS ANALYSIS & REPORTING

```typescript
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

async function createAccessibilityFindings(artifactId: string, pageResults: AccessibilityPageResult[]): Promise<number> {
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
    
    await insertFinding(
      artifactId,
      'ACCESSIBILITY_VIOLATION',
      `${violations[0].description} (${totalElements} elements across ${affectedPages.length} pages)`,
      `Rule: ${ruleId} | Impact: ${impact} | Help: ${violations[0].helpUrl}`
    );
    
    findingsCount++;
  }
  
  return findingsCount;
}
```

### 8. ERROR HANDLING & RESILIENCE
- **Browser crashes**: Restart browser and continue with remaining pages
- **Page load failures**: Log and continue with next page
- **Axe-core injection failures**: Skip page and report error
- **Network timeouts**: Configurable timeouts with graceful degradation
- **Rate limiting**: Built-in delays between page tests

### 9. LOGGING & METRICS
Use structured logging throughout:
```typescript
log(`accessibility=start domain="${domain}"`);
log(`accessibility=discovery pages=${pageCount}`);
log(`accessibility=testing url="${url}"`);
log(`accessibility=violation rule="${ruleId}" impact="${impact}" elements=${elementCount}`);
log(`accessibility=complete violations=${totalViolations} critical=${criticalCount}`);
```

## SUCCESS CRITERIA
- ✅ Tests real accessibility violations (not just documentation)
- ✅ Uses industry-standard axe-core engine for WCAG 2.1 AA compliance
- ✅ Tests multiple pages representing user journeys
- ✅ Generates specific, actionable findings with remediation guidance
- ✅ Handles errors gracefully without stopping scan
- ✅ Provides clear legal risk assessment based on violation impact
- ✅ Integrates seamlessly with DealBrief artifact/finding pipeline
- ✅ Completes scan of 15 pages in under 5 minutes
- ✅ Produces measurable, objective results that support legal compliance

Generate a complete, production-ready accessibilityScan.ts module that performs real WCAG 2.1 AA compliance testing and identifies genuine ADA lawsuit risks.

New Module

CONTEXT
You are creating a production-grade Denial-of-Wallet (DoW) scanner for DealBrief's security platform. This module identifies endpoints that can drive unbounded cloud spending when abused, focusing on real economic impact over theoretical vulnerabilities.
MODULE PURPOSE

Detect cost amplification vulnerabilities where small requests trigger expensive backend operations
Calculate quantified financial risk with 24-hour burn projections
Identify authentication bypass opportunities for cost-based attacks
Generate actionable findings with specific cost mitigation guidance
Integrate seamlessly with DealBrief's artifact pipeline

ENHANCED REQUIREMENTS
1. INTEGRATION WITH DEALBRIEF PIPELINE
typescriptexport async function runDenialWalletScan(job: { 
  domain: string; 
  scanId: string 
}): Promise<number>

// Input: Query artifacts from endpointDiscovery
const endpointArtifacts = await pool.query(
  `SELECT meta FROM artifacts 
   WHERE type='discovered_endpoints' AND meta->>'scan_id'=$1`,
  [scanId]
);

const endpoints: EndpointReport[] = endpointArtifacts[0]?.meta?.endpoints || [];
2. ENHANCED SERVICE DETECTION & COST MODELING
Comprehensive Service Cost Table:
typescriptconst SERVICE_COSTS = {
  // AI/ML Services (High Cost)
  'openai': { pattern: /openai\.com\/v1\/(chat|completions|embeddings)/, cost: 0.015, multiplier: 'tokens' },
  'anthropic': { pattern: /anthropic\.com\/v1\/(complete|messages)/, cost: 0.030, multiplier: 'tokens' },
  'cohere': { pattern: /api\.cohere\.ai\/v1/, cost: 0.020, multiplier: 'tokens' },
  'huggingface': { pattern: /api-inference\.huggingface\.co/, cost: 0.010, multiplier: 'requests' },
  
  // Cloud Functions (Variable Cost)  
  'aws_lambda': { pattern: /lambda.*invoke|x-amz-function/, cost: 0.0000208, multiplier: 'memory_mb' },
  'gcp_functions': { pattern: /cloudfunctions\.googleapis\.com/, cost: 0.0000240, multiplier: 'memory_mb' },
  'azure_functions': { pattern: /azurewebsites\.net.*api/, cost: 0.0000200, multiplier: 'memory_mb' },
  
  // Database Operations
  'dynamodb': { pattern: /dynamodb.*PutItem|UpdateItem/, cost: 0.000001, multiplier: 'requests' },
  'firestore': { pattern: /firestore\.googleapis\.com/, cost: 0.000002, multiplier: 'requests' },
  'cosmosdb': { pattern: /documents\.azure\.com/, cost: 0.000003, multiplier: 'requests' },
  
  // Storage Operations
  's3_put': { pattern: /s3.*PutObject|POST.*s3/, cost: 0.000005, multiplier: 'requests' },
  'gcs_upload': { pattern: /storage\.googleapis\.com.*upload/, cost: 0.000005, multiplier: 'requests' },
  
  // External APIs (Medium Cost)
  'stripe': { pattern: /api\.stripe\.com\/v1/, cost: 0.009, multiplier: 'requests' },
  'twilio': { pattern: /api\.twilio\.com/, cost: 0.075, multiplier: 'requests' },
  'sendgrid': { pattern: /api\.sendgrid\.com/, cost: 0.0001, multiplier: 'emails' },
  
  // Image/Video Processing
  'imagekit': { pattern: /ik\.imagekit\.io/, cost: 0.005, multiplier: 'transformations' },
  'cloudinary': { pattern: /res\.cloudinary\.com/, cost: 0.003, multiplier: 'transformations' },
  
  // Search Services
  'elasticsearch': { pattern: /elastic.*search|\.es\..*\.amazonaws\.com/, cost: 0.0001, multiplier: 'requests' },
  'algolia': { pattern: /.*-dsn\.algolia\.net/, cost: 0.001, multiplier: 'searches' },
  
  // Default for unknown state-changing endpoints
  'unknown_stateful': { pattern: /.*/, cost: 0.0005, multiplier: 'requests' }
};
3. INTELLIGENT RESPONSE ANALYSIS
Backend Service Detection:
typescriptinterface BackendIndicators {
  responseTimeMs: number;        // >500ms suggests complex processing
  serverHeaders: string[];       // AWS/GCP/Azure headers
  errorPatterns: string[];       // Service-specific error messages
  costIndicators: string[];      // Pricing-related headers
  authPatterns: string[];        // API key patterns in responses
}

async function analyzeEndpointResponse(url: string): Promise<BackendIndicators> {
  // Analyze response headers, timing, error messages for backend clues
  // Look for:
  // - X-AWS-*, X-Google-*, X-Azure-* headers
  // - Response times indicating complex processing
  // - Error messages mentioning quotas, billing, etc.
  // - Function execution logs in responses
}
4. SAFER RPS TESTING WITH CIRCUIT BREAKERS
Conservative Testing Approach:
typescriptconst TESTING_CONFIG = {
  INITIAL_RPS: 5,           // Start conservative
  MAX_RPS: 100,             // Lower ceiling for safety
  TEST_DURATION_SECONDS: 10, // Shorter bursts
  BACKOFF_MULTIPLIER: 1.5,  // Gentler scaling
  CIRCUIT_BREAKER_THRESHOLD: 0.15, // Stop at 15% failure rate
  COOLDOWN_SECONDS: 30,     // Wait between test phases
  RESPECT_ROBOTS_TXT: true  // Check robots.txt first
};

async function measureSustainedRPS(endpoint: string): Promise<number> {
  // 1. Check robots.txt for crawl-delay or disallow
  // 2. Start with conservative 5 RPS
  // 3. Gradually increase with safety monitoring
  // 4. Stop immediately on 429 responses or error spikes
  // 5. Include jitter and respectful timing
  // 6. Monitor for defensive responses (redirects, CAPTCHAs)
}
5. ENHANCED COST CALCULATION WITH UNCERTAINTY
Probabilistic Cost Modeling:
typescriptinterface CostEstimate {
  unit_cost_usd: number;
  confidence: 'high' | 'medium' | 'low';  // Based on detection strength
  cost_range_24h: {
    min: number;    // Conservative estimate
    likely: number; // Most probable cost
    max: number;    // Worst-case scenario
  };
  risk_factors: string[];  // What makes this expensive
}

function calculateCostWithUncertainty(
  serviceType: string,
  sustainedRPS: number,
  responseAnalysis: BackendIndicators
): CostEstimate {
  // Factor in:
  // - Service detection confidence
  // - Response time implications
  // - Error rate patterns
  // - Authentication bypass probability
}
6. MODERN AUTHENTICATION BYPASS DETECTION
Enhanced Auth Classification:
typescriptenum AuthGuardType {
  NONE = 'none',                    // No protection
  WEAK_API_KEY = 'weak_api_key',   // API key in URL/header
  SHARED_SECRET = 'shared_secret',  // Same key for all users
  CORS_BYPASS = 'cors_bypass',     // CORS misconfig allows bypass
  JWT_NONE_ALG = 'jwt_none_alg',   // JWT with none algorithm
  RATE_LIMIT_ONLY = 'rate_limit_only', // Only rate limiting
  USER_SCOPED = 'user_scoped',     // Proper per-user auth
  OAUTH_PROTECTED = 'oauth_protected' // OAuth2/OIDC
}

async function classifyAuthBypass(endpoint: string): Promise<{
  authType: AuthGuardType;
  bypassProbability: number;  // 0.0 - 1.0
  bypassMethods: string[];    // Specific bypass techniques
}> {
  // Test for:
  // - Anonymous access
  // - Predictable API keys
  // - CORS misconfiguration
  // - JWT algorithm confusion
  // - Rate limit bypass
}
7. RISK PRIORITIZATION & IMPACT MODELING
Financial Impact Assessment:
typescriptinterface DoWRiskAssessment {
  // Core metrics
  unit_cost_usd: number;
  sustained_rps: number;
  auth_bypass_probability: number;
  
  // Time-based projections
  cost_1_hour: number;
  cost_24_hour: number;
  cost_monthly: number;
  
  // Risk-adjusted values
  expected_annual_loss: {
    p10: number;  // 10th percentile
    p50: number;  // Median
    p90: number;  // 90th percentile
  };
  
  // Attack feasibility
  attack_complexity: 'trivial' | 'low' | 'medium' | 'high';
  discovery_likelihood: number;
  
  // Business impact
  business_disruption: 'none' | 'minor' | 'moderate' | 'severe';
  reputation_impact: 'minimal' | 'moderate' | 'significant';
}
8. COMPREHENSIVE ERROR HANDLING & SAFETY
Production Safety Measures:
typescriptconst SAFETY_CONTROLS = {
  MAX_CONCURRENT_TESTS: 3,      // Limit parallel testing
  TOTAL_REQUEST_LIMIT: 1000,    // Hard cap per scan
  TIMEOUT_SECONDS: 30,          // Request timeout
  RETRY_ATTEMPTS: 2,            // Limited retries
  BLACKLIST_STATUS: [429, 503], // Stop immediately on these
  RESPECT_HEADERS: [            // Honor protective headers
    'retry-after',
    'x-ratelimit-remaining', 
    'x-ratelimit-reset'
  ]
};

class DoWSafetyController {
  async checkSafetyLimits(): Promise<boolean>;
  async handleRateLimit(response: Response): Promise<void>;
  async emergencyStop(reason: string): Promise<void>;
}
9. EVIDENCE COLLECTION & FINDING QUALITY
Comprehensive Evidence Gathering:
typescriptinterface DoWEvidence {
  endpoint_analysis: {
    url: string;
    methods_tested: string[];
    response_patterns: string[];
    auth_attempts: string[];
  };
  
  cost_calculation: {
    service_detected: string;
    detection_method: string;
    cost_basis: string;
    confidence_level: string;
  };
  
  rate_limit_testing: {
    max_rps_achieved: number;
    test_duration_seconds: number;
    failure_threshold_hit: boolean;
    protective_responses: string[];
  };
  
  remediation_guidance: {
    immediate_actions: string[];
    long_term_fixes: string[];
    cost_cap_recommendations: string[];
  };
}
10. INTEGRATION & METRICS
Structured Artifact Creation:
typescriptawait insertArtifact({
  type: 'denial_wallet_risk',
  val_text: `${endpoint.url} - DoW risk: $${riskAssessment.cost_24_hour.toFixed(2)}/day (${riskAssessment.attack_complexity} complexity)`,
  severity: riskAssessment.cost_24_hour > 1000 ? 'CRITICAL' : 
            riskAssessment.cost_24_hour > 100 ? 'HIGH' : 'MEDIUM',
  meta: {
    scan_id: scanId,
    scan_module: 'denialWalletScan',
    risk_assessment: riskAssessment,
    evidence: evidence,
    testing_metadata: {
      total_requests_sent: totalRequests,
      testing_duration_ms: testDuration,
      safety_stops_triggered: safetyStops
    }
  }
});
SUCCESS CRITERIA

✅ Integrates with DealBrief artifact pipeline via scanId
✅ Safely tests endpoints without overwhelming targets
✅ Detects modern cloud services and AI APIs accurately
✅ Calculates realistic cost projections with uncertainty ranges
✅ Identifies authentication bypass opportunities systematically
✅ Provides specific, actionable remediation guidance
✅ Handles errors gracefully with comprehensive safety controls
✅ Generates findings with strong evidentiary support
✅ Completes scans within reasonable time and request limits
✅ Produces quantified financial risk suitable for business decisions

Generate a complete, production-ready denialWalletScan.ts module that safely identifies cost amplification vulnerabilities with accurate financial impact modeling.
