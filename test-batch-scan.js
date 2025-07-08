#!/usr/bin/env node

// Test script to manually trigger individual scans for each company
// Since group scan endpoint doesn't exist, we'll call individual scans

const companies = [
  { name: "Nox Metals", domain: "noxmetals.co" },
  { name: "Uplift AI", domain: "upliftai.org" },
  { name: "Realroots", domain: "therealroots.com" }
];

async function testScan(company) {
  try {
    const response = await fetch('http://localhost:3000/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: company.name,
        domain: company.domain
      })
    });
    
    const result = await response.json();
    console.log(`${company.name}: ${response.status} - ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.error(`${company.name}: Error - ${error.message}`);
    return null;
  }
}

async function runTests() {
  console.log('Testing individual scan endpoints...');
  
  for (const company of companies) {
    console.log(`\nTesting scan for ${company.name} (${company.domain})...`);
    await testScan(company);
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

runTests().catch(console.error);