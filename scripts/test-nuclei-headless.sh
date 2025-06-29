#!/bin/bash
set -e

echo "🧪 Testing Nuclei headless mode with system Chrome..."

# Test 1: Basic headless scan with tech templates
echo "Test 1: Basic tech scan..."
nuclei -headless -u https://projectdiscovery.io -tags tech -jsonl -silent -timeout 10 || {
    echo "❌ FAIL: Basic tech scan failed"
    exit 1
}

# Test 2: Misconfiguration templates
echo "Test 2: Misconfiguration scan..." 
nuclei -headless -u https://projectdiscovery.io -tags misconfiguration -jsonl -silent -timeout 10 || {
    echo "❌ FAIL: Misconfiguration scan failed"
    exit 1
}

# Test 3: Combined template tags
echo "Test 3: Combined template scan..."
nuclei -headless -u https://projectdiscovery.io -tags tech,misconfiguration,exposed-panels -jsonl -silent -timeout 10 || {
    echo "❌ FAIL: Combined template scan failed"
    exit 1
}

# Test 4: Verify Chrome path is accessible
echo "Test 4: Chrome accessibility..."
if [ ! -x "/usr/bin/chromium-browser" ]; then
    echo "❌ FAIL: Chromium browser not found at /usr/bin/chromium-browser"
    exit 1
fi

if [ ! -x "/usr/bin/chrome" ]; then
    echo "❌ FAIL: Chrome symlink not found at /usr/bin/chrome"
    exit 1
fi

# Test 5: Environment variables
echo "Test 5: Environment variables..."
if [ -z "$NUCLEI_PREFERRED_CHROME_PATH" ]; then
    echo "❌ FAIL: NUCLEI_PREFERRED_CHROME_PATH not set"
    exit 1
fi

echo "✅ SUCCESS: All Nuclei headless tests passed!"
echo "   - System Chrome integration working"
echo "   - Tech templates functional"
echo "   - Misconfiguration templates functional"
echo "   - Combined template scanning working"
echo "   - Environment properly configured"