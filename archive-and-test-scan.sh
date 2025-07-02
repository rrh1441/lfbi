#!/bin/bash

# Archive and Test Scan Script
# Archives current findings and runs a new scan to test updated dnsTwist module

set -e  # Exit on any error

echo "🚀 Starting archive and test scan process..."
echo ""

# Step 1: Archive current findings
echo "=== STEP 1: ARCHIVING CURRENT FINDINGS ==="
echo "Archiving existing scan data to preserve current findings..."

fly ssh console -a dealbrief-scanner --machine 148e21dae24d98 -C "node /app/archive-database.js"

if [ $? -eq 0 ]; then
    echo "✅ Archive completed successfully!"
else
    echo "❌ Archive failed!"
    exit 1
fi

echo ""

# Step 2: Deploy updated code
echo "=== STEP 2: DEPLOYING UPDATED CODE ==="
echo "Deploying the updated dnsTwist module with enhanced registrar reporting..."

fly deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully!"
else
    echo "❌ Deployment failed!"
    exit 1
fi

echo ""

# Step 3: Wait for deployment to settle
echo "=== STEP 3: WAITING FOR DEPLOYMENT ==="
echo "Waiting 30 seconds for deployment to settle..."
sleep 30

# Step 4: Run test scan
echo "=== STEP 4: RUNNING TEST SCAN ==="
echo "Starting a new test scan to verify the updated dnsTwist module..."

# Get the scanner URL from fly app info
SCANNER_URL=$(fly info -a dealbrief-scanner | grep "Hostname" | awk '{print $2}' | head -1)

if [ -z "$SCANNER_URL" ]; then
    echo "⚠️  Could not detect scanner URL, using default..."
    SCANNER_URL="dealbrief-scanner.fly.dev"
fi

echo "Using scanner URL: https://$SCANNER_URL"

# Start the test scan
SCAN_RESPONSE=$(curl -s -X POST "https://$SCANNER_URL/api/scan" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Scan - Enhanced Registrar Reporting",
    "domain": "lodging-source.com",
    "enabledModules": ["dnstwist"]
  }')

SCAN_ID=$(echo "$SCAN_RESPONSE" | grep -o '"scanId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$SCAN_ID" ]; then
    echo "❌ Failed to start scan. Response:"
    echo "$SCAN_RESPONSE"
    exit 1
fi

echo "✅ Test scan started with ID: $SCAN_ID"
echo ""

# Step 5: Monitor scan progress
echo "=== STEP 5: MONITORING SCAN PROGRESS ==="
echo "Monitoring scan progress..."

SCAN_COMPLETE=false
ATTEMPTS=0
MAX_ATTEMPTS=60  # 10 minutes max

while [ "$SCAN_COMPLETE" = false ] && [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
    sleep 10
    ATTEMPTS=$((ATTEMPTS + 1))
    
    STATUS_RESPONSE=$(curl -s "https://$SCANNER_URL/api/scan/$SCAN_ID/status")
    STATUS=$(echo "$STATUS_RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    PROGRESS=$(echo "$STATUS_RESPONSE" | grep -o '"progress":[^,}]*' | cut -d':' -f2)
    
    echo "⏳ Scan progress: $PROGRESS% (Status: $STATUS)"
    
    if [ "$STATUS" = "completed" ] || [ "$STATUS" = "failed" ] || [ "$STATUS" = "error" ]; then
        SCAN_COMPLETE=true
    fi
done

echo ""

# Step 6: Check results
echo "=== STEP 6: CHECKING RESULTS ==="

if [ "$STATUS" = "completed" ]; then
    echo "✅ Scan completed successfully!"
    
    # Get scan results
    echo "Fetching scan results..."
    RESULTS=$(curl -s "https://$SCANNER_URL/api/scan/$SCAN_ID/results")
    
    # Check for DNS Twist findings
    TYPOSQUAT_FINDINGS=$(echo "$RESULTS" | grep -c "PHISHING_SETUP\|TYPOSQUAT_REDIRECT" || echo "0")
    
    echo "📊 Scan Results Summary:"
    echo "   • Scan ID: $SCAN_ID"
    echo "   • Status: $STATUS"
    echo "   • Typosquat findings: $TYPOSQUAT_FINDINGS"
    
    if [ "$TYPOSQUAT_FINDINGS" -gt 0 ]; then
        echo ""
        echo "🔍 Checking for enhanced registrar details in findings..."
        
        # Check if findings contain registrar information
        if echo "$RESULTS" | grep -q "Original registrar:.*Typosquat registrar:"; then
            echo "✅ Enhanced registrar reporting is working!"
            echo ""
            echo "Sample finding with registrar details:"
            echo "$RESULTS" | grep -A 2 -B 2 "Original registrar:" | head -10
        else
            echo "⚠️  Enhanced registrar reporting may not be working as expected"
            echo "   Findings found but registrar details not detected"
        fi
    else
        echo "ℹ️  No typosquat findings in this scan (this may be normal)"
    fi
    
else
    echo "❌ Scan failed or timed out"
    echo "   Status: $STATUS"
    echo "   You can check the scan manually at: https://$SCANNER_URL/scan/$SCAN_ID"
fi

echo ""

# Step 7: Summary and next steps
echo "=== 🎉 PROCESS COMPLETE ==="
echo ""
echo "📋 Summary:"
echo "   ✅ Previous findings archived"
echo "   ✅ Updated code deployed"
echo "   ✅ Test scan executed (ID: $SCAN_ID)"
echo "   📊 Scan status: $STATUS"
echo ""
echo "🔗 Useful links:"
echo "   • Scan details: https://$SCANNER_URL/scan/$SCAN_ID"
echo "   • Scanner dashboard: https://$SCANNER_URL"
echo ""
echo "🔍 To check archived data:"
echo "   fly ssh console -a dealbrief-scanner"
echo "   psql \$DATABASE_URL -c \"SELECT COUNT(*) FROM artifacts_archive;\""
echo ""
echo "📝 To run another test scan:"
echo "   curl -X POST https://$SCANNER_URL/api/scan -H \"Content-Type: application/json\" \\"
echo "   -d '{\"companyName\":\"Test\",\"domain\":\"your-domain.com\",\"enabledModules\":[\"dnstwist\"]}'"

echo ""
echo "✨ Archive and test process completed!"