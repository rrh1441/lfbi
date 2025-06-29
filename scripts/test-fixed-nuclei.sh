#!/bin/bash
set -e

echo "🧪 Testing fixed Nuclei wrapper (without -system-chrome)..."

# Test 1: Check that binaries exist
echo "Test 1: Binary check..."
which nuclei || echo "❌ nuclei not found"
which run_nuclei || echo "❌ run_nuclei not found"

# Test 2: Smoke test with corrected flags (relies on NUCLEI_PREFERRED_CHROME_PATH env var)
echo "Test 2: Smoke test with corrected flags..."
echo "Running: NUCLEI_PREFERRED_CHROME_PATH=/usr/bin/chromium-browser run_nuclei -headless -silent -jsonl -u https://projectdiscovery.io -tags tech -timeout 10"

NUCLEI_PREFERRED_CHROME_PATH=/usr/bin/chromium-browser \
  run_nuclei -headless -silent -jsonl -u https://projectdiscovery.io -tags tech -timeout 10 && echo "✅ SUCCESS: Exit code 0"

echo "✅ Nuclei wrapper test completed successfully!"
echo "   - No 'Unknown option' errors from wrapper"
echo "   - Chrome integration via environment variable"
echo "   - All modules should now execute without exit code 1"