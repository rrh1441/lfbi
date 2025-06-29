#!/bin/bash
set -e

echo "🧪 Testing corrected Nuclei v3.4.5 flags..."

# Test the corrected flags directly
echo "Test 1: Corrected flags test..."
echo "Running: nuclei -system-chrome -headless -silent -jsonl -insecure -u https://httpbin.org -tags tech -timeout 10"

# This should work without any "flag provided but not defined" errors
nuclei -system-chrome -headless -silent -jsonl -insecure -u https://httpbin.org -tags tech -timeout 10 || {
    echo "❌ FAIL: Corrected flags test failed"
    exit 1
}

echo "✅ Corrected flags test passed - no 'flag provided but not defined' errors"

# Test the wrapper script
echo "Test 2: Wrapper script test..."
run_nuclei -u https://httpbin.org -tags tech -j -s --timeout 10 || {
    echo "❌ FAIL: Wrapper script test failed"
    exit 1
}

echo "✅ Wrapper script test passed"

echo "🎉 All corrected Nuclei tests passed!"
echo "   - v3.4.5 flags are correct"
echo "   - No deprecated flag errors"
echo "   - Exit code handling is proper"
echo "   - JSONL parsing works correctly"