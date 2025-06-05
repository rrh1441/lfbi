import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const supabaseUrl = 'https://cssqcaieeixukjxqpynp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzc3FjYWllZWl4dWtqeHFweW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTcwODU5NSwiZXhwIjoyMDYxMjg0NTk1fQ.SZI80-RDucQjMMS_4NcAx16LwDOek1zi_DVVdBwjZX8';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function saveReport() {
  try {
    console.log('📥 Fetching Tesla security report...');
    
    // Fetch report and summary
    const [reportResponse, summaryResponse] = await Promise.all([
      fetch('https://dealbrief-scanner.fly.dev/scan/X1JBCITpx_H/report'),
      fetch('https://dealbrief-scanner.fly.dev/scan/X1JBCITpx_H/summary')
    ]);
    
    const reportData = await reportResponse.json();
    const summaryData = await summaryResponse.json();
    
    console.log(`📊 Report: ${reportData.report.length} chars`);
    console.log(`📋 Summary: ${summaryData.summary.length} chars`);
    
    // Insert the data
    const { data, error } = await supabase
      .from('security_reports')
      .insert([
        {
          scan_id: 'X1JBCITpx_H',
          company_name: 'Tesla Inc',
          report_content: reportData.report,
          executive_summary: summaryData.summary,
          generated_at: reportData.generatedAt
        }
      ])
      .select();
    
    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }
    
    console.log('✅ SUCCESS! Tesla report saved to Supabase!');
    console.log('📋 Table: security_reports');
    console.log('🔍 Scan ID: X1JBCITpx_H');
    console.log('🌐 View at: https://cssqcaieeixukjxqpynp.supabase.co/project/default/editor');
    
    return data;
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

saveReport()
  .then(() => process.exit(0))
  .catch(() => process.exit(1)); 