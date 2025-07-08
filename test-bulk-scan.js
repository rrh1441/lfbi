#!/usr/bin/env node

// Test script for bulk scan endpoint
const companies = [
  { companyName: "Nox Metals", domain: "noxmetals.co" },
  { companyName: "Uplift AI", domain: "upliftai.org" },
  { companyName: "Realroots", domain: "therealroots.com" }
];

async function testBulkScan() {
  try {
    console.log('Testing bulk scan endpoint...');
    
    const response = await fetch('https://dealbrief-scanner.fly.dev/scan/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companies: companies
      })
    });
    
    const result = await response.json();
    console.log(`Status: ${response.status}`);
    console.log('Result:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

async function testCSVUpload() {
  try {
    console.log('\nTesting CSV upload endpoint...');
    
    const FormData = (await import('form-data')).default;
    const fs = (await import('fs')).default;
    
    const form = new FormData();
    form.append('file', fs.createReadStream('/Users/ryanheger/dealbrief-scanner/YC - Sheet1.csv'));
    
    const response = await fetch('https://dealbrief-scanner.fly.dev/scan/csv', {
      method: 'POST',
      body: form
    });
    
    const result = await response.json();
    console.log(`Status: ${response.status}`);
    console.log('Result:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('CSV Error:', error.message);
    return null;
  }
}

async function runTests() {
  console.log('🚀 Testing new bulk scan endpoints...\n');
  
  // Test bulk JSON endpoint
  await testBulkScan();
  
  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test CSV upload endpoint
  await testCSVUpload();
}

runTests().catch(console.error);