import { runZAPScan } from './apps/workers/modules/zapScan.js';

async function testZAP() {
  console.log('🔬 Testing ZAP module integration...');
  
  try {
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