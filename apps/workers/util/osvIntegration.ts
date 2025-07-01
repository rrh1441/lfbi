/**
 * OSV.dev API Integration
 * 
 * Provides secondary vulnerability source alongside NVD, with better coverage
 * for open source packages and ecosystems like npm, PyPI, Maven, etc.
 */

import axios from 'axios';
import { log as rootLog } from '../core/logger.js';
import { type NormalizedComponent } from './cpeNormalization.js';
import { type VulnerabilityMatch } from './versionMatcher.js';

const log = (...args: unknown[]) => rootLog('[osvIntegration]', ...args);

export interface OSVVulnerability {
  id: string;
  summary: string;
  details?: string;
  published: string;
  modified: string;
  aliases?: string[];
  severity?: Array<{
    type: string;
    score: string;
  }>;
  affected: Array<{
    package: {
      ecosystem: string;
      name: string;
      purl?: string;
    };
    ranges: Array<{
      type: string;
      events: Array<{
        introduced?: string;
        fixed?: string;
        limit?: string;
      }>;
    }>;
    versions?: string[];
    database_specific?: any;
    ecosystem_specific?: any;
  }>;
  references?: Array<{
    type: string;
    url: string;
  }>;
  database_specific?: any;
}

export interface OSVQuery {
  package?: {
    ecosystem: string;
    name: string;
  };
  version?: string;
  commit?: string;
}

export interface OSVBatchQuery {
  queries: OSVQuery[];
}

export interface OSVQueryResult {
  vulnerabilities: OSVVulnerability[];
  source: 'osv';
  queryTimeMs: number;
}

/**
 * Query OSV.dev for vulnerabilities affecting a specific package
 */
export async function queryOSVPackage(
  ecosystem: string,
  name: string,
  version?: string
): Promise<OSVQueryResult> {
  const startTime = Date.now();
  
  try {
    log(`Querying OSV.dev for ${ecosystem}/${name}@${version || 'latest'}`);
    
    const query: OSVQuery = {
      package: {
        ecosystem: ecosystem.toLowerCase(),
        name: name
      }
    };
    
    if (version) {
      query.version = version;
    }
    
    const response = await axios.post('https://api.osv.dev/v1/query', query, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DealBrief-Scanner/1.0 (+https://dealbrief.com)'
      }
    });
    
    const vulnerabilities = response.data.vulns || [];
    const queryTimeMs = Date.now() - startTime;
    
    log(`OSV.dev query completed: ${vulnerabilities.length} vulnerabilities in ${queryTimeMs}ms`);
    
    return {
      vulnerabilities,
      source: 'osv',
      queryTimeMs
    };
    
  } catch (error) {
    const queryTimeMs = Date.now() - startTime;
    log(`OSV.dev query failed for ${ecosystem}/${name}:`, (error as Error).message);
    
    return {
      vulnerabilities: [],
      source: 'osv',
      queryTimeMs
    };
  }
}

/**
 * Batch query OSV.dev for multiple packages
 */
export async function batchQueryOSV(queries: OSVQuery[]): Promise<OSVQueryResult[]> {
  const startTime = Date.now();
  
  try {
    log(`Batch querying OSV.dev for ${queries.length} packages`);
    
    // OSV.dev supports batch queries with up to 1000 entries
    const batchSize = 100; // Conservative batch size
    const results: OSVQueryResult[] = [];
    
    for (let i = 0; i < queries.length; i += batchSize) {
      const batch = queries.slice(i, i + batchSize);
      
      const batchQuery: OSVBatchQuery = {
        queries: batch
      };
      
      try {
        const response = await axios.post('https://api.osv.dev/v1/querybatch', batchQuery, {
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'DealBrief-Scanner/1.0 (+https://dealbrief.com)'
          }
        });
        
        const batchResults = response.data.results || [];
        
        // Convert batch results to individual query results
        for (let j = 0; j < batchResults.length; j++) {
          const queryResult = batchResults[j];
          results.push({
            vulnerabilities: queryResult.vulns || [],
            source: 'osv',
            queryTimeMs: 0 // Will be set below
          });
        }
        
        // Rate limiting between batches
        if (i + batchSize < queries.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
      } catch (batchError) {
        log(`OSV.dev batch query failed for batch ${i}:`, (batchError as Error).message);
        
        // Add empty results for failed batch
        for (let j = 0; j < batch.length; j++) {
          results.push({
            vulnerabilities: [],
            source: 'osv',
            queryTimeMs: 0
          });
        }
      }
    }
    
    const totalQueryTimeMs = Date.now() - startTime;
    
    // Update query times
    results.forEach(result => {
      result.queryTimeMs = totalQueryTimeMs / results.length;
    });
    
    const totalVulns = results.reduce((sum, r) => sum + r.vulnerabilities.length, 0);
    log(`OSV.dev batch query completed: ${totalVulns} vulnerabilities across ${queries.length} packages in ${totalQueryTimeMs}ms`);
    
    return results;
    
  } catch (error) {
    log(`OSV.dev batch query failed:`, (error as Error).message);
    
    // Return empty results for all queries
    return queries.map(() => ({
      vulnerabilities: [],
      source: 'osv' as const,
      queryTimeMs: Date.now() - startTime
    }));
  }
}

/**
 * Convert OSV vulnerability to VulnerabilityMatch format
 */
export function convertOSVToVulnerabilityMatch(
  osvVuln: OSVVulnerability,
  component: NormalizedComponent
): VulnerabilityMatch {
  
  // Extract severity from OSV data
  let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'MEDIUM';
  let cvssScore: number | undefined;
  
  if (osvVuln.severity) {
    for (const sev of osvVuln.severity) {
      if (sev.type === 'CVSS_V3') {
        const score = parseFloat(sev.score);
        if (!isNaN(score)) {
          cvssScore = score;
          if (score >= 9.0) severity = 'CRITICAL';
          else if (score >= 7.0) severity = 'HIGH';
          else if (score >= 4.0) severity = 'MEDIUM';
          else severity = 'LOW';
          break;
        }
      }
    }
  }
  
  // Extract version ranges
  let affectedVersionRange = {};
  if (osvVuln.affected && osvVuln.affected.length > 0) {
    const affected = osvVuln.affected[0];
    if (affected.ranges && affected.ranges.length > 0) {
      const range = affected.ranges[0];
      for (const event of range.events) {
        if (event.introduced) {
          affectedVersionRange = { ...affectedVersionRange, startIncluding: event.introduced };
        }
        if (event.fixed) {
          affectedVersionRange = { ...affectedVersionRange, endExcluding: event.fixed };
        }
        if (event.limit) {
          affectedVersionRange = { ...affectedVersionRange, endIncluding: event.limit };
        }
      }
    }
  }
  
  // Calculate match confidence
  let matchConfidence = 85; // OSV.dev has good accuracy
  
  // Higher confidence for exact package matches
  if (osvVuln.affected?.some(a => 
    a.package.name.toLowerCase() === component.name.toLowerCase() &&
    a.package.ecosystem.toLowerCase() === (component.ecosystem || '').toLowerCase()
  )) {
    matchConfidence = 95;
  }
  
  return {
    cveId: osvVuln.id,
    severity,
    cvssScore,
    description: osvVuln.summary,
    publishedDate: osvVuln.published,
    affectedVersionRange,
    matchConfidence,
    matchReason: 'OSV.dev package database match',
    cisaKev: false, // OSV.dev doesn't track CISA KEV directly
    epssScore: undefined // OSV.dev doesn't include EPSS scores
  };
}

/**
 * Find vulnerabilities for a component using OSV.dev
 */
export async function findOSVVulnerabilities(
  component: NormalizedComponent
): Promise<VulnerabilityMatch[]> {
  
  if (!component.ecosystem || !component.name) {
    log(`Skipping OSV.dev query for ${component.name} - missing ecosystem info`);
    return [];
  }
  
  try {
    // Map internal ecosystem names to OSV.dev ecosystem names
    const ecosystemMap: Record<string, string> = {
      'npm': 'npm',
      'pypi': 'PyPI',
      'gem': 'RubyGems',
      'maven': 'Maven',
      'composer': 'Packagist',
      'nuget': 'NuGet',
      'cargo': 'crates.io',
      'golang': 'Go',
      'pub': 'Pub'
    };
    
    const osvEcosystem = ecosystemMap[component.ecosystem.toLowerCase()];
    if (!osvEcosystem) {
      log(`Unsupported ecosystem for OSV.dev: ${component.ecosystem}`);
      return [];
    }
    
    const result = await queryOSVPackage(
      osvEcosystem,
      component.name,
      component.version
    );
    
    // Convert OSV vulnerabilities to our format
    const matches = result.vulnerabilities.map(vuln => 
      convertOSVToVulnerabilityMatch(vuln, component)
    );
    
    log(`OSV.dev found ${matches.length} vulnerabilities for ${component.name}`);
    
    return matches;
    
  } catch (error) {
    log(`OSV.dev vulnerability lookup failed for ${component.name}:`, (error as Error).message);
    return [];
  }
}

/**
 * Batch find vulnerabilities for multiple components using OSV.dev
 */
export async function batchFindOSVVulnerabilities(
  components: NormalizedComponent[]
): Promise<VulnerabilityMatch[][]> {
  
  const startTime = Date.now();
  
  // Filter components that have ecosystem information
  const osvComponents = components.filter(c => c.ecosystem && c.name);
  
  if (osvComponents.length === 0) {
    log('No components suitable for OSV.dev queries');
    return components.map(() => []);
  }
  
  log(`Batch querying OSV.dev for ${osvComponents.length} components`);
  
  // Map ecosystem names
  const ecosystemMap: Record<string, string> = {
    'npm': 'npm',
    'pypi': 'PyPI',
    'gem': 'RubyGems',
    'maven': 'Maven',
    'composer': 'Packagist',
    'nuget': 'NuGet',
    'cargo': 'crates.io',
    'golang': 'Go',
    'pub': 'Pub'
  };
  
  // Build OSV queries
  const queries: OSVQuery[] = osvComponents.map(component => {
    const osvEcosystem = ecosystemMap[component.ecosystem!.toLowerCase()];
    return {
      package: {
        ecosystem: osvEcosystem,
        name: component.name
      },
      version: component.version
    };
  }).filter(q => q.package.ecosystem); // Filter out unsupported ecosystems
  
  if (queries.length === 0) {
    log('No components with supported ecosystems for OSV.dev');
    return components.map(() => []);
  }
  
  // Execute batch query
  const results = await batchQueryOSV(queries);
  
  // Convert results back to vulnerability matches
  const allMatches: VulnerabilityMatch[][] = [];
  let resultIndex = 0;
  
  for (const component of components) {
    if (component.ecosystem && component.name) {
      const osvEcosystem = ecosystemMap[component.ecosystem.toLowerCase()];
      if (osvEcosystem && resultIndex < results.length) {
        const result = results[resultIndex];
        const matches = result.vulnerabilities.map(vuln => 
          convertOSVToVulnerabilityMatch(vuln, component)
        );
        allMatches.push(matches);
        resultIndex++;
      } else {
        allMatches.push([]);
      }
    } else {
      allMatches.push([]);
    }
  }
  
  const duration = Date.now() - startTime;
  const totalVulns = allMatches.reduce((sum, matches) => sum + matches.length, 0);
  
  log(`OSV.dev batch query completed: ${totalVulns} vulnerabilities across ${components.length} components in ${duration}ms`);
  
  return allMatches;
}

/**
 * Merge NVD and OSV vulnerability results, deduplicating by CVE ID
 */
export function mergeVulnerabilityResults(
  nvdMatches: VulnerabilityMatch[],
  osvMatches: VulnerabilityMatch[]
): VulnerabilityMatch[] {
  
  const merged = [...nvdMatches];
  const seenCVEs = new Set(nvdMatches.map(m => m.cveId));
  
  // Add OSV matches that aren't already covered by NVD
  for (const osvMatch of osvMatches) {
    if (!seenCVEs.has(osvMatch.cveId)) {
      merged.push(osvMatch);
      seenCVEs.add(osvMatch.cveId);
    }
  }
  
  // Sort by severity and score
  merged.sort((a, b) => {
    const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
    const aSeverity = severityOrder[a.severity];
    const bSeverity = severityOrder[b.severity];
    
    if (aSeverity !== bSeverity) {
      return bSeverity - aSeverity;
    }
    
    return (b.cvssScore || 0) - (a.cvssScore || 0);
  });
  
  log(`Merged vulnerability results: ${nvdMatches.length} NVD + ${osvMatches.length} OSV = ${merged.length} unique`);
  
  return merged;
}