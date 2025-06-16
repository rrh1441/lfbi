import { Pool } from 'pg';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config(); // Load from environment variables

const FLY_POSTGRES_CONNECTION_STRING = process.env.DATABASE_URL || process.env.DB_URL;
const SUPABASE_URL = process.env.SUPABASE_URL; // From Vercel, will be NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to set this as a secret in Fly.io for this worker

if (!FLY_POSTGRES_CONNECTION_STRING || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SyncWorker: Missing critical environment variables (DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY). Exiting.');
    process.exit(1);
}

// Environment loaded - minimal logging

const flyPostgresPool = new Pool({ connectionString: FLY_POSTGRES_CONNECTION_STRING });
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SYNC_INTERVAL_MS = 60 * 1000; // Sync every 1 minute
let lastSuccessfulScanSync = new Date(0);
let lastSuccessfulFindingSync = new Date(0);

function logDebug(message: string, data?: any) {
    // Reduced logging - only log meaningful progress updates
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [SyncWorker] ${message}`, data ? JSON.stringify(data, null, 2) : '');
}

function logProgress(message: string, data?: any) {
    // For important progress updates only
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [SyncWorker] ✅ ${message}`, data ? JSON.stringify(data, null, 2) : '');
}

function logError(message: string, error?: any) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [SyncWorker] ERROR: ${message}`, error ? error.message || error : '');
    if (error?.stack) {
        console.error(error.stack);
    }
}

async function testSupabaseConnection(): Promise<boolean> {
    try {
        const { data, error } = await supabase.from('scan_status').select('count').limit(1);
        
        if (error) {
            logError('Supabase connection test failed', error);
            return false;
        }
        
        return true;
    } catch (error) {
        logError('Supabase connection test exception', error);
        return false;
    }
}

async function testFlyPostgresConnection(): Promise<boolean> {
    try {
        await flyPostgresPool.query('SELECT 1');
        return true;
    } catch (error) {
        logError('Fly Postgres connection test failed', error);
        return false;
    }
}

async function syncScansMasterTable() {
    try {
        const { rows } = await flyPostgresPool.query(
            `SELECT 
                scan_id, 
                company_name, 
                domain, 
                status, 
                progress,
                current_module,
                total_modules,
                created_at, 
                updated_at, 
                completed_at,
                error_message,
                total_findings_count,
                max_severity,
                total_artifacts_count
             FROM scans_master 
             WHERE updated_at > $1 
             ORDER BY updated_at ASC
             LIMIT 100`, // Batching
            [lastSuccessfulScanSync]
        );

        if (rows.length > 0) {
            const recordsToUpsert = rows.map(pgScan => ({
                scan_id: pgScan.scan_id,
                company_name: pgScan.company_name,
                domain: pgScan.domain,
                status: pgScan.status,
                progress: parseInt(pgScan.progress, 10),
                current_module: pgScan.current_module,
                total_modules: parseInt(pgScan.total_modules, 10),
                started_at: pgScan.created_at,
                last_updated: pgScan.updated_at,
                completed_at: pgScan.completed_at,
                error_message: pgScan.error_message,
                total_findings_count: pgScan.total_findings_count,
                max_severity: pgScan.max_severity,
                total_artifacts_count: pgScan.total_artifacts_count || 0,
            }));
            
            const { data, error } = await supabase
                .from('scan_status')
                .upsert(recordsToUpsert, { onConflict: 'scan_id', ignoreDuplicates: false });

            if (error) {
                logError('Error upserting scans to Supabase', error);
                return; // Don't update timestamp on error
            }
            
            // Only log when there are meaningful progress updates (module completion)
            const completedModules = recordsToUpsert.filter(scan => 
                scan.status === 'completed' || 
                (scan.current_module && scan.progress > 0)
            );
            
            if (completedModules.length > 0) {
                logProgress(`Module progress updated for ${completedModules.length} scans`, {
                    completed: completedModules.map(s => `${s.company_name}: ${s.current_module} (${s.progress}/${s.total_modules})`)
                });
            }
            
            lastSuccessfulScanSync = new Date(rows[rows.length - 1].updated_at);
        }
    } catch (error) {
        logError('Error in syncScansMasterTable', error);
    }
}

async function syncFindingsTable() {
    try {
        // Check if findings table has scan_id column directly
        const findingsStructure = await flyPostgresPool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'findings'
            ORDER BY ordinal_position
        `);
        
        const hasScanIdColumn = findingsStructure.rows.some(row => row.column_name === 'scan_id');
        
        let query: string;
        if (hasScanIdColumn) {
            // If findings table has scan_id directly
            query = `
                SELECT 
                    id as original_finding_id,
                    scan_id,
                    finding_type,
                    description,
                    recommendation,
                    severity,
                    created_at
                FROM findings
                WHERE created_at > $1
                ORDER BY created_at ASC
                LIMIT 200`;
        } else {
            // If we need to join with artifacts
            query = `
                SELECT 
                    f.id as original_finding_id,
                    a.meta->>'scan_id' as scan_id,
                    f.finding_type,
                    f.description,
                    f.recommendation,
                    a.severity as severity,
                    f.created_at
                FROM findings f
                JOIN artifacts a ON f.artifact_id = a.id
                WHERE f.created_at > $1
                ORDER BY f.created_at ASC
                LIMIT 200`;
        }
        
        const { rows } = await flyPostgresPool.query(query, [lastSuccessfulFindingSync]);

        if (rows.length > 0) {
            const recordsToUpsert = rows
                .filter(f => f.scan_id) // Only sync findings with scan_id
                .map(f => ({
                    id: f.original_finding_id, 
                    scan_id: f.scan_id,
                    type: f.finding_type,
                    description: f.description,
                    recommendation: f.recommendation,
                    severity: f.severity,
                    created_at: f.created_at,
                }));
            
            if (recordsToUpsert.length > 0) {
                const { data, error } = await supabase
                    .from('findings')
                    .upsert(recordsToUpsert, { onConflict: 'id', ignoreDuplicates: false });

                if (error) {
                    logError('Error upserting findings to Supabase', error);
                    return; // Don't update timestamp on error
                }
                
                // Only log when findings are successfully inserted
                const findingsByType = recordsToUpsert.reduce((acc, f) => {
                    acc[f.type] = (acc[f.type] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);
                
                logProgress(`Findings inserted: ${recordsToUpsert.length} total`, findingsByType);
            }
            
            lastSuccessfulFindingSync = new Date(rows[rows.length - 1].created_at);
        }
    } catch (error) {
        logError('Error in syncFindingsTable', error);
    }
}

async function runSyncCycle() {
    // Test connections first
    const flyConnectionOk = await testFlyPostgresConnection();
    const supabaseConnectionOk = await testSupabaseConnection();
    
    if (!flyConnectionOk) {
        logError('Fly Postgres connection failed, skipping sync cycle');
        return;
    }
    
    if (!supabaseConnectionOk) {
        logError('Supabase connection failed, skipping sync cycle');
        return;
    }
    
    await syncScansMasterTable();
    await syncFindingsTable();
}

async function startSyncWorker() {
    // Test connections on startup
    const flyConnectionOk = await testFlyPostgresConnection();
    const supabaseConnectionOk = await testSupabaseConnection();
    
    if (!flyConnectionOk || !supabaseConnectionOk) {
        logError('Critical: One or more connections failed on startup');
        process.exit(1);
    }
    
    logProgress('Sync Worker started - monitoring for module completions and findings');
    
    // Perform an initial check to catch up if worker was down
    await runSyncCycle(); 

    setInterval(runSyncCycle, SYNC_INTERVAL_MS);
}

// Graceful shutdown
process.on('SIGTERM', () => {
    logProgress('Sync Worker shutting down');
    process.exit(0);
});

process.on('SIGINT', () => {
    logProgress('Sync Worker shutting down');
    process.exit(0);
});

startSyncWorker().catch(error => {
    logError('CRITICAL - Failed to start sync worker', error);
    process.exit(1);
}); 