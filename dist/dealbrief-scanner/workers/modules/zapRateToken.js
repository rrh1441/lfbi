import { log } from '../core/logger.js';
import { insertArtifact } from '../core/artifactStore.js';
export async function runZapRateToken(job) {
    log('[zap-rate-token]', job.domain);
    // ZAP token rate limiting implementation
    // This would integrate with OWASP ZAP for token-based rate limit testing
    await insertArtifact({
        type: 'rate_limit_token',
        val_text: `Token rate limiting test for ${job.domain}`,
        severity: 'INFO'
    });
}
//# sourceMappingURL=zapRateToken.js.map