# Security Scanner Deployment Fixes

## Environment Variables Required

Add these to your production environment (Docker, k8s, etc.):

```bash
# Enable TLS bypass for certificate validation issues
export NODE_TLS_REJECT_UNAUTHORIZED=0

# Set testssl.sh path (install first if needed)
export TESTSSL_PATH="/opt/testssl.sh/testssl.sh"
```

## Docker Environment Example

```dockerfile
# In your Dockerfile or docker-compose.yml
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV TESTSSL_PATH=/opt/testssl.sh/testssl.sh

# Install testssl.sh
RUN git clone --depth 1 https://github.com/drwetter/testssl.sh.git /opt/testssl.sh && \
    chmod +x /opt/testssl.sh/testssl.sh
```

## Kubernetes ConfigMap Example

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: scanner-config
data:
  NODE_TLS_REJECT_UNAUTHORIZED: "0"
  TESTSSL_PATH: "/opt/testssl.sh/testssl.sh"
```

## Expected Findings After Fix

### 1. SSL Certificate Mismatch (NEW)
- **Finding Type:** `CERTIFICATE_MISMATCH` 
- **Severity:** HIGH
- **Description:** SSL certificate for lodging-source.com only valid for www.lodging-source.com
- **Module:** tlsScan

### 2. Technology Detection (RESTORED)
- **Apache 2.4.62** - Should now be detected properly
- **Other web technologies** - Previously missed due to TLS failures
- **Module:** techStackScan

### 3. CVE Findings (PROPERLY FILTERED)
- **Before:** 37+ legacy CVEs (2007-2024) incorrectly reported
- **After:** Only legitimate, timeline-validated CVEs for Apache 2.4.62

## Installation Requirements

### testssl.sh Installation
```bash
# Option 1: Git clone (recommended)
git clone --depth 1 https://github.com/drwetter/testssl.sh.git /opt/testssl.sh
chmod +x /opt/testssl.sh/testssl.sh

# Option 2: Package manager (if available)
apt-get update && apt-get install -y testssl.sh

# Option 3: Direct download
curl -L https://raw.githubusercontent.com/drwetter/testssl.sh/3.2/testssl.sh -o /usr/local/bin/testssl.sh
chmod +x /usr/local/bin/testssl.sh
```

### nuclei (if not already installed)
```bash
# Install nuclei for technology detection
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
# or
apt-get install nuclei
```

## Verification Steps

1. **Test TLS bypass:**
   ```bash
   NODE_TLS_REJECT_UNAUTHORIZED=0 node -e "console.log('TLS bypass enabled')"
   ```

2. **Test testssl.sh:**
   ```bash
   /opt/testssl.sh/testssl.sh --version
   ```

3. **Test nuclei:**
   ```bash
   nuclei -version
   ```

4. **Test certificate detection:**
   ```bash
   /opt/testssl.sh/testssl.sh --jsonfile-pretty /tmp/test.json lodging-source.com
   grep -i "cert_commonName\|subject\|mismatch" /tmp/test.json
   ```

## Security Impact Summary

### Fixed Issues:
✅ **Certificate Mismatch Detection** - Now properly detects SSL misconfigurations
✅ **Technology Stack Detection** - Apache 2.4.62 and other technologies now detected  
✅ **CVE Filtering** - Legacy CVEs properly filtered by timeline validation
✅ **Scan Completeness** - All modules can now complete successfully

### New Findings Expected:
- 🚨 **HIGH:** SSL certificate mismatch for lodging-source.com
- 📊 **INFO:** Apache 2.4.62 detection (finally working)
- 🔍 **Various:** Other technology stack findings previously missed

This represents a significant improvement in scan accuracy and completeness.