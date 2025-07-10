// CVE timeline validation to prevent false positives
import { log as rootLog } from '../../core/logger.js';

const log = (...m: unknown[]) => rootLog('[cveValidation]', ...m);

export interface CVEValidationConfig {
  maxRiskVulnAgeYears: number;
  dropVulnAgeYears: number;
}

export class CVEValidator {
  constructor(private config: CVEValidationConfig) {}

  validateTimeline(cveId: string, publishedDate?: Date, softwareVersion?: string): boolean {
    if (!cveId.startsWith('CVE-')) return true;
    
    try {
      const cveYear = parseInt(cveId.split('-')[1]);
      const currentYear = new Date().getFullYear();
      const ageYears = currentYear - cveYear;
      
      // Drop ancient vulnerabilities unless specifically flagged
      if (ageYears > this.config.dropVulnAgeYears) {
        log(`cve=timeline_drop cve="${cveId}" age=${ageYears}y reason="too_old"`);
        return false;
      }
      
      // For software versions, estimate release year and validate timeline
      if (softwareVersion) {
        const estimatedReleaseYear = this.estimateVersionReleaseYear(softwareVersion);
        if (estimatedReleaseYear && cveYear < estimatedReleaseYear - 2) {
          log(`cve=timeline_drop cve="${cveId}" version="${softwareVersion}" estimated_release=${estimatedReleaseYear} cve_year=${cveYear} reason="anachronistic"`);
          return false;
        }
      }
      
      // Published date validation
      if (publishedDate) {
        const publishYear = publishedDate.getFullYear();
        if (Math.abs(publishYear - cveYear) > 3) {
          log(`cve=timeline_warning cve="${cveId}" cve_year=${cveYear} publish_year=${publishYear} reason="date_mismatch"`);
          // Don't drop, just warn - there can be legitimate delays
        }
      }
      
      return true;
    } catch (error) {
      log(`cve=timeline_error cve="${cveId}" error="${(error as Error).message}"`);
      return true; // Allow through on parsing errors
    }
  }

  private estimateVersionReleaseYear(version: string): number | null {
    if (!version) return null;
    
    try {
      // Extract first number as potential year or major version
      const match = version.match(/(\d+)/);
      if (!match) return null;
      
      const firstNum = parseInt(match[1]);
      
      // If it looks like a year (2000-2024)
      if (firstNum >= 2000 && firstNum <= 2024) {
        return firstNum;
      }
      
      // For major versions, make rough estimates
      if (firstNum >= 10) {
        return 2015 + Math.floor(firstNum / 5); // Rough approximation
      }
      
      if (firstNum >= 5) {
        return 2010 + firstNum * 2;
      }
      
      return 2005 + firstNum * 3;
    } catch {
      return null;
    }
  }
} 