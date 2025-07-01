#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Testing ZAP Integration with DealBrief Pipeline"

# Ensure artifacts directory exists
mkdir -p ./artifacts

# Run setup script first
echo "📦 Setting up ZAP..."
./scripts/setup-zap.sh

# Test the ZAP module directly in TypeScript
echo "🧪 Testing ZAP module integration..."

# Create a test script that calls the ZAP module
cat > ./test-zap-module.ts << 'EOF'
import { runZAPScan } from './apps/workers/modules/zapScan.js';
import { initializeDatabase } from './apps/workers/core/artifactStore.js';
import { config } from 'dotenv';

config();

async function testZAP() {
  console.log('🔬 Testing ZAP module integration...');
  
  try {
    // Initialize database
    await initializeDatabase();
    console.log('✅ Database initialized');
    
    // Run ZAP scan
    const scanId = `test-zap-${Date.now()}`;
    console.log(`🎯 Running ZAP scan with ID: ${scanId}`);
    
    const findings = await runZAPScan({
      domain: 'lodging-source.com',
      scanId
    });
    
    console.log(`✅ ZAP scan completed: ${findings} findings`);
    
    if (findings > 0) {
      console.log('🎉 SUCCESS: ZAP integration working - found vulnerabilities');
    } else {
      console.log('ℹ️  ZAP scan completed but no vulnerabilities found (this is normal for clean sites)');
    }
    
  } catch (error) {
    console.error('❌ ZAP integration test failed:', error);
    process.exit(1);
  }
}

testZAP();
EOF

# Run the test
echo "▶️  Running ZAP integration test..."
npx ts-node ./test-zap-module.ts

# Cleanup
rm -f ./test-zap-module.ts

echo ""
echo "✅ ZAP integration test completed!"
echo ""
echo "Next steps:"
echo "  - ZAP is now integrated with the DealBrief pipeline"
echo "  - ZAP will run as part of regular scans in Phase 2D"
echo "  - Artifacts will be saved to the database and artifacts directory"