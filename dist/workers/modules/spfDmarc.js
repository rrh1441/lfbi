import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
const exec = promisify(execFile);
export async function runSpfDmarc(job) {
    log('[spfDmarc] Starting email security scan for', job.domain);
    let findingsCount = 0;
    try {
        // Check DMARC record
        log('[spfDmarc] Checking DMARC record');
        const { stdout: dmarcOut } = await exec('dig', [
            'txt',
            `_dmarc.${job.domain}`,
            '+short'
        ], { timeout: 10000 });
        if (!dmarcOut.trim()) {
            const artifactId = await insertArtifact({
                type: 'dmarc_missing',
                val_text: `${job.domain} - DMARC record missing`,
                severity: 'MEDIUM',
                meta: {
                    scan_id: job.scanId,
                    scan_module: 'spfDmarc'
                }
            });
            await insertFinding(artifactId, 'EMAIL_SECURITY', 'Implement DMARC policy to prevent email spoofing. Start with p=none for monitoring, then progress to p=quarantine or p=reject.', 'DMARC record not found - domain vulnerable to email spoofing');
            findingsCount++;
        }
        else if (/p=none/i.test(dmarcOut)) {
            const artifactId = await insertArtifact({
                type: 'dmarc_weak',
                val_text: `${job.domain} - DMARC policy set to none`,
                severity: 'LOW',
                meta: {
                    dmarc_record: dmarcOut.trim(),
                    scan_id: job.scanId,
                    scan_module: 'spfDmarc'
                }
            });
            await insertFinding(artifactId, 'EMAIL_SECURITY', 'Strengthen DMARC policy from p=none to p=quarantine or p=reject after monitoring email flow.', 'DMARC policy set to none - provides limited protection against email spoofing');
            findingsCount++;
        }
        else {
            log('[spfDmarc] DMARC record found with enforcement policy');
        }
        // Check SPF record
        log('[spfDmarc] Checking SPF record');
        const { stdout: spfOut } = await exec('dig', [
            'txt',
            job.domain,
            '+short'
        ], { timeout: 10000 });
        const spfRecord = spfOut.split('\n').find(line => line.includes('v=spf1'));
        if (!spfRecord) {
            const artifactId = await insertArtifact({
                type: 'spf_missing',
                val_text: `${job.domain} - SPF record missing`,
                severity: 'MEDIUM',
                meta: {
                    scan_id: job.scanId,
                    scan_module: 'spfDmarc'
                }
            });
            await insertFinding(artifactId, 'EMAIL_SECURITY', 'Implement SPF record to specify authorized mail servers. Use tools like SPF Record Generator to create proper policy.', 'SPF record not found - domain vulnerable to email spoofing');
            findingsCount++;
        }
        else {
            // Check for common SPF issues
            if (spfRecord.includes('~all') || spfRecord.includes('?all')) {
                const artifactId = await insertArtifact({
                    type: 'spf_weak',
                    val_text: `${job.domain} - SPF policy too permissive`,
                    severity: 'LOW',
                    meta: {
                        spf_record: spfRecord.trim(),
                        scan_id: job.scanId,
                        scan_module: 'spfDmarc'
                    }
                });
                await insertFinding(artifactId, 'EMAIL_SECURITY', 'Strengthen SPF policy by using "-all" instead of "~all" or "?all" for better email authentication.', 'SPF policy uses soft fail (~all) or neutral (?all) - allows spoofed emails');
                findingsCount++;
            }
            // Check for too many DNS lookups (SPF limit is 10)
            const includeCount = (spfRecord.match(/include:/g) || []).length;
            const redirectCount = (spfRecord.match(/redirect=/g) || []).length;
            const totalLookups = includeCount + redirectCount;
            if (totalLookups > 8) {
                const artifactId = await insertArtifact({
                    type: 'spf_complex',
                    val_text: `${job.domain} - SPF record may exceed DNS lookup limit`,
                    severity: 'LOW',
                    meta: {
                        spf_record: spfRecord.trim(),
                        lookup_count: totalLookups,
                        scan_id: job.scanId,
                        scan_module: 'spfDmarc'
                    }
                });
                await insertFinding(artifactId, 'EMAIL_SECURITY', 'Simplify SPF record to stay under 10 DNS lookups limit. Use IP addresses instead of includes where possible.', `SPF record has ${totalLookups} DNS lookups - may exceed RFC limit of 10`);
                findingsCount++;
            }
        }
        // Check DKIM (basic check for common selectors)
        log('[spfDmarc] Checking common DKIM selectors');
        const commonSelectors = ['default', 'selector1', 'selector2', 'google', 'k1'];
        let dkimFound = false;
        for (const selector of commonSelectors) {
            try {
                const { stdout: dkimOut } = await exec('dig', [
                    'txt',
                    `${selector}._domainkey.${job.domain}`,
                    '+short'
                ], { timeout: 5000 });
                if (dkimOut.trim() && dkimOut.includes('k=')) {
                    dkimFound = true;
                    break;
                }
            }
            catch (dkimError) {
                // Continue checking other selectors
            }
        }
        if (!dkimFound) {
            const artifactId = await insertArtifact({
                type: 'dkim_missing',
                val_text: `${job.domain} - DKIM not detected`,
                severity: 'LOW',
                meta: {
                    selectors_checked: commonSelectors,
                    scan_id: job.scanId,
                    scan_module: 'spfDmarc'
                }
            });
            await insertFinding(artifactId, 'EMAIL_SECURITY', 'Implement DKIM signing for email authentication. Configure DKIM in your email service or mail server.', 'DKIM signatures not detected for common selectors');
            findingsCount++;
        }
        log('[spfDmarc] Completed email security scan, found', findingsCount, 'issues');
        return findingsCount;
    }
    catch (error) {
        log('[spfDmarc] Error during scan:', error.message);
        return 0;
    }
}
//# sourceMappingURL=spfDmarc.js.map