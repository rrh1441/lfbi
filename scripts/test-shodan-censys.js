#!/usr/bin/env node

// Test script to verify Shodan and Censys are working
import axios from 'axios';
import { config } from 'dotenv';

config();

async function testShodan() {
  console.log('\n🔍 Testing Shodan API...');
  const apiKey = process.env.SHODAN_API_KEY;
  
  if (!apiKey) {
    console.error('❌ SHODAN_API_KEY not found in environment');
    return false;
  }
  
  console.log('✅ API key found');
  
  try {
    // Test API info endpoint
    const infoUrl = `https://api.shodan.io/api-info?key=${apiKey}`;
    const response = await axios.get(infoUrl);
    
    console.log('✅ API connection successful');
    console.log('📊 API Info:', {
      plan: response.data.plan,
      query_credits: response.data.query_credits,
      scan_credits: response.data.scan_credits
    });
    
    // Test a simple search
    const searchUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}&query=apache&facets=country:10`;
    const searchResponse = await axios.get(searchUrl);
    
    console.log('✅ Search test successful');
    console.log(`📊 Found ${searchResponse.data.total} results`);
    
    return true;
  } catch (error) {
    console.error('❌ Shodan test failed:', error.response?.data || error.message);
    return false;
  }
}

async function testCensys() {
  console.log('\n🔍 Testing Censys API...');
  const apiKey = process.env.CENSYS_API_KEY;
  const apiSecret = process.env.CENSYS_SECRET;
  
  if (!apiKey || !apiSecret) {
    console.error('❌ CENSYS_API_KEY or CENSYS_SECRET not found in environment');
    return false;
  }
  
  console.log('✅ API credentials found');
  
  try {
    // Test account endpoint
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const response = await axios.get('https://search.censys.io/api/v1/account', {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    console.log('✅ API connection successful');
    console.log('📊 Account Info:', {
      email: response.data.email,
      quota: response.data.quota
    });
    
    return true;
  } catch (error) {
    console.error('❌ Censys test failed:', error.response?.data || error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Testing Shodan and Censys API connections...\n');
  
  const shodanOk = await testShodan();
  const censysOk = await testCensys();
  
  console.log('\n📋 Summary:');
  console.log(`  Shodan: ${shodanOk ? '✅ Working' : '❌ Failed'}`);
  console.log(`  Censys: ${censysOk ? '✅ Working' : '❌ Failed'}`);
  
  if (!shodanOk || !censysOk) {
    console.log('\n⚠️  Some APIs are not working. Check your API keys and try again.');
    process.exit(1);
  } else {
    console.log('\n✅ All APIs are working correctly!');
  }
}

main().catch(console.error);