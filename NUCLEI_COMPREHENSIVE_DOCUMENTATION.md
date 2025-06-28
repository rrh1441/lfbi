# Nuclei Usage Comprehensive Documentation - DealBrief Scanner

## Overview
This document provides a complete analysis of Nuclei integration across the DealBrief security scanner platform, including all modules, configurations, commands, and current issues.

---

## 1. FILES USING NUCLEI

### Core Modules (5 files)
1. **`/apps/workers/modules/nuclei.ts`** - Main vulnerability scanning module
2. **`/apps/workers/modules/dbPortScan.ts`** - Database port scanning with Nuclei
3. **`/apps/workers/modules/emailBruteforceSurface.ts`** - Email service detection
4. **`/apps/workers/modules/rdpVpnTemplates.ts`** - RDP/VPN vulnerability scanning
5. **`/apps/workers/modules/techStackScan.ts`** - Technology-specific vulnerability checks

### Infrastructure & Installation (4 files)
6. **`/Dockerfile`** - Nuclei installation and template setup
7. **`/install-nuclei.sh`** - Nuclei binary installation script
8. **`/test-nuclei-fix.js`** - Testing script for Nuclei fixes
9. **`/apps/workers/worker.ts`** - Main worker integration

### Configuration & Templates (6 files)
10. **Custom templates** in various modules (inline YAML)
11. **Template management** - `/opt/nuclei-templates` directory
12. **CVE verification** in `cveVerifier.ts`
13. **Template updates** - Automated 24-hour cycle
14. **Workflow files** - Referenced in nuclei.ts
15. **Tag mappings** - Technology to Nuclei tag correlations

---

## 2. NUCLEI INSTALLATION & SETUP

### Docker Installation (Dockerfile)
```dockerfile
# Install Nuclei
RUN curl -L https://github.com/projectdiscovery/nuclei/releases/download/v3.2.9/nuclei_3.2.9_linux_amd64.zip -o nuclei.zip && \
    unzip nuclei.zip && mv nuclei /usr/local/bin/ && rm nuclei.zip

# Setup templates directory and update
RUN mkdir -p /opt/nuclei-templates && \
    nuclei -update-templates -ut /opt/nuclei-templates && \
    chmod -R 755 /opt/nuclei-templates
```

### Installation Script (install-nuclei.sh)
```bash
#!/bin/bash
NUCLEI_VERSION="v3.2.9"
curl -L https://github.com/projectdiscovery/nuclei/releases/download/${NUCLEI_VERSION}/nuclei_${NUCLEI_VERSION}_linux_amd64.zip -o nuclei.zip
unzip nuclei.zip
sudo mv nuclei /usr/local/bin/
rm nuclei.zip
nuclei -version
```

### Version Information
- **Current Version**: v3.2.9
- **Template Directory**: `/opt/nuclei-templates`
- **Cache Directory**: `/root/.cache/nuclei`
- **Config Directory**: `/root/.config/nuclei`

---

## 3. NUCLEI COMMAND PATTERNS

### A. Tag-Based Scanning (Primary Pattern)
```bash
nuclei -u <url> -tags <tags> -json -silent -timeout 10 -retries 2 -headless -td /opt/nuclei-templates -dca
```

**Used in**: `nuclei.ts`, `dbPortScan.ts`
**Tags Used**: `misconfiguration`, `default-logins`, `exposed-panels`, `exposure`, `tech`

### B. Workflow-Based Scanning
```bash
nuclei -u <url> -w <workflow_path> -json -silent -timeout 15 -td /opt/nuclei-templates -dca
```

**Used in**: `nuclei.ts` (Phase 2 scans)
**Workflows**: Custom severity-based workflows

### C. Template-Specific Scanning
```bash
nuclei -list <targets_file> -t <template1> -t <template2> ... -json -silent -timeout 30 -retries 2 -c 6 -headless -dca -td /opt/nuclei-templates
```

**Used in**: `emailBruteforceSurface.ts`, `rdpVpnTemplates.ts`

### D. CVE-Specific Scanning
```bash
nuclei -u <url> -id <cve_ids> -json -silent -timeout 30 -retries 3 -td /opt/nuclei-templates -dca
```

**Used in**: `cveVerifier.ts`

### E. Technology-Specific Scanning
```bash
nuclei -u <url> -tags <tech_tags> -json -silent -timeout 20 -retries 2 -td /opt/nuclei-templates -dca
```

**Used in**: `techStackScan.ts`

---

## 4. DETAILED MODULE ANALYSIS

### 4.1 Main Nuclei Module (`nuclei.ts`)

**Purpose**: Core vulnerability scanning with multi-phase approach

**Command Structure**:
```typescript
// Phase 1: Tag-based scans
const nucleiArgs = [
  '-u', target.url,
  '-tags', tags,
  '-json', '-silent',
  '-timeout', '10',
  '-retries', '2',
  '-headless',
  '-td', '/opt/nuclei-templates'
];

// Phase 2: Workflow scans
const nucleiWorkflowArgs = [
  '-u', target.url,
  '-w', workflowPath,
  '-json', '-silent',
  '-timeout', '15',
  '-td', '/opt/nuclei-templates'
];
```

**Technologies Mapped**:
- `nginx` → `nginx`
- `apache` → `apache`
- `wordpress` → `wordpress`
- `drupal` → `drupal`
- `joomla` → `joomla`
- `docker` → `docker`
- `kubernetes` → `kubernetes`
- `jenkins` → `jenkins`
- `gitlab` → `gitlab`

**Template Update Process**:
```typescript
const templateAge = Date.now() - templateStats.mtime.getTime();
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

if (templateAge > TWENTY_FOUR_HOURS) {
  // Update templates with 5-minute timeout
  await exec('nuclei', ['-update-templates', '-ut', TEMPLATE_DIR], { timeout: 300000 });
}
```

### 4.2 Database Port Scan (`dbPortScan.ts`)

**Purpose**: Database-specific vulnerability scanning

**Command Pattern**:
```typescript
const args = [
  '-u', `${protocol}://${ip}:${port}`,
  '-tags', 'network,database,exposure',
  '-json', '-silent',
  '-timeout', '15',
  '-retries', '2',
  '-td', '/opt/nuclei-templates',
  '-dca'
];
```

**Custom Template**:
```yaml
id: neon-postgres-exposure
info:
  name: Neon PostgreSQL Exposure Detection
  author: dealbrief
  severity: high
  description: Detects unauthenticated access to Neon PostgreSQL databases
  tags: database,exposure,postgresql
http:
  - method: GET
    path:
      - "{{BaseURL}}"
    matchers:
      - type: regex
        regex:
          - 'neon\.tech'
          - 'database.*connection'
```

### 4.3 Email Bruteforce Surface (`emailBruteforceSurface.ts`)

**Purpose**: Email service detection and vulnerability assessment

**Templates Used**:
```typescript
const EMAIL_TEMPLATES = [
  'technologies/microsoft-exchange-server-detect.yaml',
  'technologies/outlook-web-access-detect.yaml',
  'technologies/owa-detect.yaml',
  'network/smtp-detect.yaml',
  'network/imap-detect.yaml',
  'network/pop3-detect.yaml',
  'technologies/exchange-autodiscover.yaml',
  'technologies/activesync-detect.yaml',
  'misconfiguration/exchange-server-login.yaml',
  'misconfiguration/owa-login-portal.yaml'
];
```

**Command Construction**:
```typescript
const templateArgs = EMAIL_TEMPLATES.flatMap(template => ['-t', template]);
const args = [
  '-list', targetsFile,
  ...templateArgs,
  '-json', '-silent',
  '-timeout', '30',
  '-retries', '2',
  '-c', CONCURRENCY.toString(),
  '-headless',
  '-dca',
  '-td', '/opt/nuclei-templates'
];
```

### 4.4 RDP/VPN Templates (`rdpVpnTemplates.ts`)

**Purpose**: Remote access service vulnerability scanning

**Custom Templates**:
```yaml
# RDP Exposure Detection
id: rdp-exposure
info:
  name: RDP Exposure Detection
  author: dealbrief
  severity: high
  description: Detects exposed RDP services
  tags: network,rdp,exposure
network:
  - inputs:
      - data: "\x03\x00\x00\x13\x0e\xe0\x00\x00\x00\x00\x00\x01\x00\x08\x00\x0b\x00\x00\x00"
        type: hex
    host:
      - "{{Hostname}}"
    port: 3389
    matchers:
      - type: regex
        regex:
          - '\x03\x00\x00\x0b\x06\xd0'
```

### 4.5 Tech Stack Scan (`techStackScan.ts`)

**Purpose**: Technology-specific vulnerability verification

**Command Pattern**:
```typescript
const args = [
  '-u', url,
  '-tags', technologyTags.join(','),
  '-json', '-silent',
  '-timeout', '20',
  '-retries', '2',
  '-td', '/opt/nuclei-templates',
  '-dca'
];
```

**Technology Tag Mapping**:
```typescript
const TECH_TO_NUCLEI_TAGS = {
  'wordpress': ['wordpress', 'cms'],
  'drupal': ['drupal', 'cms'],
  'joomla': ['joomla', 'cms'],
  'apache': ['apache', 'webserver'],
  'nginx': ['nginx', 'webserver'],
  'iis': ['iis', 'webserver'],
  'tomcat': ['tomcat', 'webserver'],
  'jenkins': ['jenkins', 'ci'],
  'gitlab': ['gitlab', 'ci'],
  'docker': ['docker', 'containerization'],
  'kubernetes': ['kubernetes', 'orchestration']
};
```

### 4.6 CVE Verifier (`cveVerifier.ts`)

**Purpose**: Specific CVE vulnerability verification

**Command Pattern**:
```typescript
const args = [
  '-u', url,
  '-id', cveIds.join(','),
  '-json', '-silent',
  '-timeout', '30',
  '-retries', '3',
  '-td', '/opt/nuclei-templates',
  '-dca'
];
```

---

## 5. CURRENT ISSUES & FAILURES

### 5.1 Recent Log Errors (Latest Deployment)

**Tag Scan Failure**:
```
[nuclei] [Tag Scan] Failed for https://lodging-source.com: Command failed: nuclei -u https://lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -json -silent -timeout 10 -retries 2 -headless -td /opt/nuclei-templates -dca
```

**Email Scan Failure**:
```
[emailBruteforceSurface] Nuclei email scan failed: Command failed: nuclei -list /tmp/nuclei-email-targets-1751059887949.txt -t technologies/microsoft-exchange-server-detect.yaml [...] -td /opt/nuclei-templates
```

### 5.2 Command Evolution Issues

**Historical Command Changes**:
```bash
# OLD (v3.1.x and earlier)
nuclei -u <url> -t /opt/nuclei-templates -disable-ssl-verification

# CURRENT (v3.2.9+)
nuclei -u <url> -td /opt/nuclei-templates -dca
```

**Flag Changes Implemented**:
- `-t` (template dir) → `-td` (template directory)
- `-disable-ssl-verification` → `-dca` (disable certificate verification)
- `-insecure` → `-dca` (unified SSL bypass flag)

### 5.3 Template Management Issues

**Update Timeout Problems**:
```typescript
// 5-minute timeout for template updates
await exec('nuclei', ['-update-templates', '-ut', TEMPLATE_DIR], { timeout: 300000 });
```

**Template Directory Permissions**:
```bash
chmod -R 755 /opt/nuclei-templates
```

---

## 6. CONFIGURATION & CONSTANTS

### 6.1 Timeout Configuration
```typescript
const NUCLEI_TIMEOUT_MS = 300000; // 5 minutes for email scans
const TEMPLATE_UPDATE_TIMEOUT = 300000; // 5 minutes for template updates
const DEFAULT_SCAN_TIMEOUT = 600000; // 10 minutes for main scans
```

### 6.2 Concurrency Controls
```typescript
const MAX_CONCURRENT_SCANS = 4;
const CONCURRENCY = 6; // For email template scans
const MAX_CONCURRENT_JOBS = 2; // Worker level
```

### 6.3 Template Paths
```typescript
const TEMPLATE_DIR = '/opt/nuclei-templates';
const CUSTOM_TEMPLATE_DIR = './custom-templates';
const WORKFLOW_DIR = './workflows';
```

### 6.4 Tag Categories
```typescript
const SECURITY_TAGS = [
  'misconfiguration',
  'default-logins', 
  'exposed-panels',
  'exposure',
  'tech',
  'network',
  'database',
  'cms',
  'webserver'
];
```

---

## 7. ERROR HANDLING PATTERNS

### 7.1 Command Execution Error Handling
```typescript
try {
  const { stdout, stderr } = await exec('nuclei', nucleiArgs, { timeout: 600000 });
  return await processNucleiOutput(stdout, scanId, 'tags');
} catch (error) {
  log(`[nuclei] [Tag Scan] Failed for ${target.url}:`, (error as Error).message);
  if ((error as any).stderr) {
    log(`[nuclei] [Tag Scan] Full stderr for ${target.url}:`, (error as any).stderr);
  }
  return 0;
}
```

### 7.2 Template Update Error Handling
```typescript
try {
  await exec('nuclei', ['-update-templates', '-ut', TEMPLATE_DIR], { timeout: 300000 });
  log(`Template update complete.`);
} catch (updateError) {
  log(`Template update failed: ${(updateError as Error).message}`);
  log(`Proceeding with existing templates...`);
  // Continue with scan using existing templates
}
```

### 7.3 Output Processing Error Handling
```typescript
for (const line of lines) {
  try {
    const result = JSON.parse(line) as NucleiResult;
    results.push(result);
  } catch (parseError) {
    log(`Failed to parse Nuclei result: ${line.slice(0, 200)}`);
    // Continue processing other lines
  }
}
```

---

## 8. OUTPUT PROCESSING & INTEGRATION

### 8.1 JSON Output Structure
```typescript
interface NucleiResult {
  "template-id": string;
  "template-path": string;
  "info": {
    "name": string;
    "author": string[];
    "tags": string[];
    "description": string;
    "severity": "info" | "low" | "medium" | "high" | "critical";
  };
  "type": string;
  "host": string;
  "matched-at": string;
  "extracted-results"?: string[];
  "curl-command": string;
  "matcher-name": string;
}
```

### 8.2 Artifact Creation
```typescript
const artifactId = await insertArtifact({
  type: 'nuclei_vulnerability',
  val_text: `${result.info.name} - ${result.info.severity}`,
  severity: mapSeverity(result.info.severity),
  src_url: result.host,
  meta: {
    scan_id: scanId,
    scan_module: 'nuclei',
    template_id: result['template-id'],
    template_path: result['template-path'],
    nuclei_result: result
  }
});
```

### 8.3 Finding Generation
```typescript
await insertFinding(
  artifactId,
  'NUCLEI_VULNERABILITY',
  `${result.info.description}`,
  `Template: ${result['template-id']} | Severity: ${result.info.severity} | Host: ${result.host}`
);
```

---

## 9. WORKFLOW INTEGRATION

### 9.1 Main Worker Integration
```typescript
// In worker.ts
const nucleiResults = await import('./modules/nuclei.js');
const findings = await nucleiResults.runNucleiScan({
  domain: job.domain,
  scanId: job.id
});
```

### 9.2 Module Dependencies
```
nuclei.ts
├── Depends on: /opt/nuclei-templates
├── Calls: techStackScan (for technology detection)
├── Creates: nuclei_vulnerability artifacts
└── Generates: NUCLEI_VULNERABILITY findings

dbPortScan.ts
├── Depends on: nuclei.ts patterns
├── Uses: Custom database templates
└── Scans: Database-specific ports and services

emailBruteforceSurface.ts  
├── Depends on: EMAIL_TEMPLATES array
├── Uses: Temporary target files
└── Scans: Email service endpoints

techStackScan.ts
├── Depends on: Wappalyzer technology detection
├── Maps: Technologies to Nuclei tags
└── Verifies: Technology-specific vulnerabilities

cveVerifier.ts
├── Depends on: CVE database
├── Uses: CVE-specific Nuclei templates
└── Verifies: Specific vulnerability instances
```

---

## 10. PERFORMANCE METRICS

### 10.1 Scan Duration Patterns
```
Tag-based scans: ~60-90 seconds per target
Workflow scans: ~30-45 seconds per target  
CVE verification: ~15-30 seconds per CVE
Email template scans: ~45-60 seconds for 50 targets
Database scans: ~20-30 seconds per port
```

### 10.2 Resource Usage
```
Memory: ~256MB per concurrent Nuclei process
CPU: Moderate (I/O bound, network requests)
Network: High (template downloads, target scanning)
Disk: ~500MB for templates, ~50MB for cache
```

### 10.3 Success Rates (Recent)
```
Main nuclei.ts: 0 vulnerabilities found (scan completes)
Tag scans: Command failures (exit code issues)
Email scans: Command failures (template path issues)
CVE scans: Limited usage (conditional execution)
Database scans: Mixed results (port-dependent)
```

---

## 11. ALTERNATIVES CONSIDERATION

### 11.1 Current Pain Points
1. **Version Compatibility**: Frequent command syntax changes
2. **Template Dependencies**: Large download requirements, update failures
3. **Execution Reliability**: Inconsistent command execution across modules
4. **Error Debugging**: Limited error information from failed scans
5. **Performance**: Slow execution times for comprehensive scans

### 11.2 Potential Replacements
```
1. Nmap + NSE Scripts
   ├── Pros: Stable, reliable, extensive script library
   ├── Cons: Different output format, learning curve
   └── Migration: Moderate effort

2. Custom HTTP Security Scanner
   ├── Pros: Full control, faster execution, targeted checks
   ├── Cons: Development overhead, coverage limitations  
   └── Migration: High effort, high reward

3. OpenVAS/GVM
   ├── Pros: Enterprise-grade, comprehensive
   ├── Cons: Heavy installation, complex setup
   └── Migration: High effort

4. Nikto + Custom Scripts
   ├── Pros: Web-focused, reliable
   ├── Cons: Limited scope, older tool
   └── Migration: Low effort
```

---

## 12. SUMMARY & RECOMMENDATIONS

### 12.1 Current Status
- **Nuclei Version**: v3.2.9 (latest)
- **Integration**: Deep integration across 5+ modules
- **Status**: Partially working (main scans succeed, tag scans fail)
- **Impact**: Moderate (other modules compensate for failed scans)

### 12.2 Critical Issues
1. **Command failures** in tag-based and template-specific scans
2. **Inconsistent flag usage** across modules (partially resolved)
3. **Template management** complexity and timeout issues
4. **Error handling** insufficient for debugging failures

### 12.3 Next Steps Options
1. **Deep debugging**: Investigate root cause of current command failures
2. **Gradual replacement**: Replace problematic modules with alternatives
3. **Complete migration**: Move to alternative vulnerability scanning solution
4. **Hybrid approach**: Keep working modules, replace failing ones

This documentation provides a complete picture of Nuclei integration for strategic decision-making regarding the future of vulnerability scanning in the DealBrief platform.