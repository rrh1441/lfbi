const { Pool } = require('pg');
const fs = require('fs');

// Create database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DB_URL
});

async function executeSQLFile() {
  try {
    console.log('=== EXECUTING CLIENT_SIDE_SECRET_EXPOSURE RISK MODEL FIX ===');
    
    // Read the SQL file
    const sqlContent = fs.readFileSync('/Users/ryanheger/dealbrief-scanner/implement-client-secret-risk-fix.sql', 'utf8');
    
    console.log('SQL file content:');
    console.log(sqlContent);
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Split SQL into individual statements (ignore comments)
    const statements = [
      // 1. Add new attack type to attack_meta table
      `INSERT INTO public.attack_meta (attack_type_code, prevalence, raw_weight) VALUES 
        ('CLIENT_SIDE_SECRET_EXPOSURE', '0.8', '600000')
      ON CONFLICT (attack_type_code) DO UPDATE SET 
        prevalence = EXCLUDED.prevalence,
        raw_weight = EXCLUDED.raw_weight;`,
      
      // 2. Add updated risk constants
      `INSERT INTO public.risk_constants (key, value) VALUES
        ('CLIENT_SECRET_CRITICAL', 600000),
        ('CLIENT_SECRET_HIGH',     300000),
        ('CLIENT_SECRET_MEDIUM',   100000)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`,
      
      // 3. Update existing findings
      `UPDATE findings 
      SET attack_type_code = 'CLIENT_SIDE_SECRET_EXPOSURE'
      WHERE finding_type = 'CLIENT_SIDE_SECRET_EXPOSURE' 
        AND attack_type_code IS NULL;`,
      
      // 4. Verification query 1
      `SELECT 
        f.finding_type,
        f.attack_type_code,
        COUNT(*) as finding_count,
        am.prevalence,
        am.raw_weight
      FROM findings f
      LEFT JOIN attack_meta am ON f.attack_type_code = am.attack_type_code
      WHERE f.finding_type = 'CLIENT_SIDE_SECRET_EXPOSURE'
      GROUP BY f.finding_type, f.attack_type_code, am.prevalence, am.raw_weight
      ORDER BY finding_count DESC;`,
      
      // 5. Verification query 2
      `SELECT 
        f.scan_id,
        f.finding_type,
        f.attack_type_code,
        COUNT(*) as finding_count,
        am.raw_weight,
        (COUNT(*) * am.raw_weight) as total_financial_impact
      FROM findings f
      JOIN attack_meta am ON f.attack_type_code = am.attack_type_code
      WHERE f.scan_id = 'YgvqoxIo6Uc'
        AND f.finding_type = 'CLIENT_SIDE_SECRET_EXPOSURE'
      GROUP BY f.scan_id, f.finding_type, f.attack_type_code, am.raw_weight;`
    ];
    
    // Execute statements
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      console.log(`\n--- Executing Statement ${i + 1} ---`);
      console.log(stmt);
      
      try {
        const result = await pool.query(stmt);
        
        if (result.command === 'INSERT') {
          console.log(`✅ INSERT successful: ${result.rowCount} rows affected`);
        } else if (result.command === 'UPDATE') {
          console.log(`✅ UPDATE successful: ${result.rowCount} rows affected`);
        } else if (result.command === 'SELECT') {
          console.log(`✅ SELECT successful: ${result.rowCount} rows returned`);
          if (result.rows.length > 0) {
            console.log('Results:');
            console.table(result.rows);
          } else {
            console.log('No results returned');
          }
        }
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message);
        if (i < 3) { // Only throw for the first 3 statements (the modifications)
          throw error;
        }
      }
    }
    
    console.log('\n=== CLIENT_SIDE_SECRET_EXPOSURE RISK MODEL FIX COMPLETED ===');
    
  } catch (error) {
    console.error('❌ Failed to execute SQL fix:', error);
  } finally {
    await pool.end();
  }
}

executeSQLFile();