const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DB_URL
});

console.log('=== CHECKING FINDINGS TABLE SCHEMA ===');

// Check table schema
pool.query(`
  SELECT column_name, data_type, is_nullable, column_default 
  FROM information_schema.columns 
  WHERE table_name = 'findings' 
  ORDER BY ordinal_position;
`)
.then(result => {
  console.log('✅ FINDINGS TABLE SCHEMA:');
  console.log('Columns:');
  result.rows.forEach(row => {
    console.log(`  - ${row.column_name} (${row.data_type}) ${row.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
  });
  console.log('\n');
  
  // Check sample data
  return pool.query('SELECT * FROM findings LIMIT 3;');
})
.then(result => {
  console.log('✅ SAMPLE DATA (first 3 rows):');
  if (result.rows.length === 0) {
    console.log('❌ NO DATA FOUND IN FINDINGS TABLE');
  } else {
    result.rows.forEach((row, i) => {
      console.log(`Row ${i+1}:`);
      Object.keys(row).forEach(key => {
        console.log(`  ${key}: ${row[key]}`);
      });
      console.log('---');
    });
  }
  
  pool.end();
})
.catch(err => {
  console.error('Database error:', err.message);
  pool.end();
});