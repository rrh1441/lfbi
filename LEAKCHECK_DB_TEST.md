# LeakCheck Database Test Guide

This document explains how to test the LeakCheck data structure against the actual DealBrief database.

## Quick Start

1. **Set up database connection**:
   ```bash
   export DATABASE_URL='postgresql://username:password@host:port/database'
   ```

2. **Run the test**:
   ```bash
   ./scripts/run-leakcheck-test.sh
   ```

## What the Test Does

The test script (`test-leakcheck-data.js`) performs comprehensive validation of:

### 1. Database Connectivity
- Tests PostgreSQL connection
- Verifies table schema structure
- Confirms JSON metadata support

### 2. Data Structure Validation
- Tests LeakCheck artifact insertion patterns
- Validates JSON metadata structure for breach data
- Confirms query performance for retrieval patterns

### 3. LeakCheck Data Model
Tests this structure for storing credential exposure data:
```javascript
{
  type: 'credential_exposure',
  val_text: 'Found N credential exposures for domain.com',
  severity: 'HIGH|MEDIUM|LOW',
  meta: {
    scan_id: 'unique-scan-identifier',
    scan_module: 'leakCheckCredentials',
    domain: 'target-domain.com',
    exposures: [
      {
        email: 'user@domain.com',
        source: 'Breach Name',
        date_found: 'YYYY-MM-DD',
        breach_name: 'Human Readable Breach Name'
      }
    ],
    total_exposures: 5,
    unique_emails: 3,
    data_sources: ['Source1', 'Source2'],
    risk_score: 8.5
  }
}
```

### 4. Query Patterns
Tests these LeakCheck-specific queries:
- Domain-specific credential exposure retrieval
- Breach source frequency analysis
- Risk scoring and aggregation
- Time-based exposure tracking

## Database Connection Options

### Option 1: Local PostgreSQL
```bash
export DATABASE_URL='postgresql://username:password@localhost:5432/dealbrief'
```

### Option 2: Supabase (Recommended)
```bash
export DATABASE_URL='postgresql://postgres:[your-password]@[your-project].supabase.co:5432/postgres'
```

### Option 3: Environment File
Create `.env` in project root:
```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

## Running the Test

### Automated (Recommended)
```bash
# Run the complete test suite with setup validation
./scripts/run-leakcheck-test.sh
```

### Manual
```bash
# 1. Build the project first
pnpm build:workers

# 2. Initialize database tables
node scripts/init-db.js

# 3. Run the LeakCheck test
node scripts/test-leakcheck-data.js
```

## Expected Output

Successful test run will show:
```
🔍 Testing LeakCheck data structure in database...

1. Testing database connection...
✅ Database connected successfully

2. Checking artifacts table structure...
✅ Artifacts table schema confirmed

3. Searching for LeakCheck-related artifacts...
ℹ️  No LeakCheck-related artifacts found yet

4. Analyzing artifact metadata structure...
✅ Found artifacts with metadata structure

5. Sampling recent artifacts...
✅ Recent artifact samples analyzed

6. Testing LeakCheck data insert pattern...
✅ Successfully inserted test LeakCheck artifact with ID: 1234

7. Testing LeakCheck data retrieval patterns...
✅ Domain-specific credential exposure query working
✅ Breach source frequency analysis working
✅ Risk summary analysis working

🎉 LeakCheck data structure test completed successfully!
```

## Troubleshooting

### Connection Issues
- **ECONNREFUSED**: Database server not running or wrong host/port
- **Authentication failed**: Check username/password in DATABASE_URL
- **Database not found**: Verify database name exists

### Permission Issues
- Ensure database user has CREATE, INSERT, SELECT permissions
- For Supabase: use service role key, not anonymous key

### Build Issues
- Run `pnpm install` if dependencies missing
- Run `pnpm build:workers` if dist folder missing

## Integration with LeakCheck Module

Once the test passes, you can use the validated patterns in your LeakCheck implementation:

```javascript
// Use the tested artifact structure
const leakCheckArtifact = {
  type: 'credential_exposure',
  val_text: `Found ${exposures.length} credential exposures for ${domain}`,
  severity: calculateSeverity(exposures),
  meta: {
    scan_id: scanId,
    scan_module: 'leakCheckCredentials',
    domain: domain,
    exposures: exposures,
    total_exposures: exposures.length,
    unique_emails: [...new Set(exposures.map(e => e.email))].length,
    data_sources: [...new Set(exposures.map(e => e.source))],
    risk_score: calculateRiskScore(exposures)
  }
};

// Insert using the tested function
const artifactId = await insertArtifact(leakCheckArtifact);
```

## Files Created

- `/scripts/test-leakcheck-data.js` - Main test script
- `/scripts/run-leakcheck-test.sh` - Automated test runner
- `/LEAKCHECK_DB_TEST.md` - This documentation

These files provide everything needed to test and validate the LeakCheck data structure against your actual database.