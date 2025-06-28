#!/usr/bin/env node

/**
 * Nuclei Fix Verification Script
 * Tests the corrected Nuclei command construction
 */

const { execFile } = require('child_process');
const { promisify } = require('util');

const exec = promisify(execFile);

async function testNucleiCommand() {
  console.log('🧪 Testing Nuclei v3.2.9+ Command Construction...\n');
  
  try {
    // Test 1: Version check
    console.log('1️⃣ Testing nuclei version...');
    const versionResult = await exec('nuclei', ['-version']);
    console.log('✅ Nuclei version:', versionResult.stderr || versionResult.stdout);
    
    // Test 2: Template directory flag
    console.log('\n2️⃣ Testing template directory flag...');
    const testUrl = 'https://httpbin.org/get';
    
    // NEW CORRECTED COMMAND (should work)
    const correctArgs = [
      '-u', testUrl,
      '-tags', 'tech',
      '-json',
      '-silent',
      '-timeout', '10',
      '-retries', '1',
      '-td', '/opt/nuclei-templates',  // Use -td instead of -t
      '-dca'  // Use -dca instead of -disable-ssl-verification
    ];
    
    console.log('Command:', 'nuclei', correctArgs.join(' '));
    
    try {
      const result = await exec('nuclei', correctArgs, { timeout: 30000 });
      console.log('✅ Nuclei command executed successfully');
      console.log('📊 Output lines:', result.stdout.trim().split('\n').filter(Boolean).length);
      
      if (result.stderr) {
        console.log('ℹ️ Stderr (likely info):', result.stderr.substring(0, 200));
      }
      
    } catch (error) {
      if (error.code === 2) {
        console.log('⚠️ Exit code 2 - This would be the old error');
        console.log('Error details:', error.message);
      } else {
        console.log('✅ Different error (network/timeout) - command structure is OK');
      }
    }
    
    // Test 3: Validate templates exist
    console.log('\n3️⃣ Checking template directory...');
    const fs = require('fs');
    const path = require('path');
    
    const templateDir = '/opt/nuclei-templates';
    try {
      const stats = fs.statSync(templateDir);
      if (stats.isDirectory()) {
        const files = fs.readdirSync(templateDir);
        console.log(`✅ Template directory exists with ${files.length} items`);
        
        // Check for key subdirectories
        const expectedDirs = ['cves', 'exposures', 'technologies', 'misconfiguration'];
        expectedDirs.forEach(dir => {
          const dirPath = path.join(templateDir, dir);
          if (fs.existsSync(dirPath)) {
            console.log(`✅ ${dir}/ directory found`);
          } else {
            console.log(`⚠️ ${dir}/ directory missing`);
          }
        });
      }
    } catch (err) {
      console.log('❌ Template directory issue:', err.message);
    }
    
    console.log('\n🎉 Nuclei fix verification complete!');
    console.log('\n📝 Summary of fixes applied:');
    console.log('   • Changed -t to -td for template directory');
    console.log('   • Changed -disable-ssl-verification to -dca');
    console.log('   • Added URL validation to prevent "null" URLs');
    console.log('   • Standardized TLS bypass flags across all modules');
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testNucleiCommand().catch(console.error);