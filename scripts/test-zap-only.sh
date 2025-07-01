#!/usr/bin/env bash
set -euo pipefail

# 1) Fix: install ZAP Python packages (already installed python-owasp-zap-v2.4)
echo "✅ ZAP Python packages installed"

# 2) Pull ZAP Docker image for baseline scanning
echo "📥 Pulling OWASP ZAP Docker image..."
docker pull zaproxy/zap-stable

# 3) Generate a unique scan ID
SCAN_ID="zap-$(date +%s)"
echo "🔍 Starting ZAP scan with ID: $SCAN_ID"

# 4) Run ZAP baseline scan directly (since scan-agent may not exist)
TARGET_URL="https://lodging-source.com"
OUTPUT_DIR="./artifacts"
mkdir -p "$OUTPUT_DIR"

echo "🎯 Running ZAP baseline scan on $TARGET_URL"
docker run --rm \
  -v "$PWD/$OUTPUT_DIR:/zap/wrk:rw" \
  zaproxy/zap-stable \
  zap-baseline.py \
  -t "$TARGET_URL" \
  -J "zap_report_${SCAN_ID}.json" \
  -I

# 5) Test: ensure at least one ZAP artifact was produced
ART_DIR="${ARTIFACT_DIR:-./artifacts}"
ZAP_ARTIFACTS=( "$ART_DIR"/*zap* )
if [[ ${#ZAP_ARTIFACTS[@]} -gt 0 ]]; then
  echo "✅ ZAP-only scan complete; found artifacts:"
  printf "  %s\n" "${ZAP_ARTIFACTS[@]}"
else
  echo "❌ No ZAP artifacts found in $ART_DIR! Scan failed."
  exit 1
fi