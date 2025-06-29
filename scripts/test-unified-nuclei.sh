#!/bin/bash
set -e

echo "🧪 Testing unified Nuclei wrapper script..."

# Test 1: Basic functionality test
echo "Test 1: Version check and help..."
run_nuclei --help > /dev/null
echo "✅ Help command works"

# Test 2: Simple URL scan with tech templates
echo "Test 2: Basic tech scan..."
run_nuclei -u https://httpbin.org -tags tech -j -s --timeout 10 || {
    echo "❌ FAIL: Basic tech scan failed"
    exit 1
}
echo "✅ Basic tech scan completed"

# Test 3: Test deprecated flag conversion
echo "Test 3: Deprecated flag conversion..."
run_nuclei -u https://httpbin.org -tags tech -json -s --timeout 10 || {
    echo "❌ FAIL: Deprecated flag conversion failed"
    exit 1
}
echo "✅ Deprecated flag conversion works"

# Test 4: Test insecure flag (replaces -disable-ssl-verification)
echo "Test 4: Insecure flag test..."
run_nuclei -u https://self-signed.badssl.com -tags tech --insecure -j -s --timeout 10 || {
    echo "❌ FAIL: Insecure flag test failed"
    exit 1
}
echo "✅ Insecure flag works"

# Test 5: Test headless mode with system Chrome
echo "Test 5: Headless mode test..."
run_nuclei -u https://httpbin.org -tags tech --headless --system-chrome -j -s --timeout 15 || {
    echo "❌ FAIL: Headless mode test failed"
    exit 1
}
echo "✅ Headless mode works"

echo "🎉 All unified Nuclei wrapper tests passed!"
echo "   - Command line interface working"
echo "   - Deprecated flag conversion functional"
echo "   - Modern flags operational"
echo "   - Headless Chrome integration confirmed"
echo "   - SSL/TLS handling appropriate"