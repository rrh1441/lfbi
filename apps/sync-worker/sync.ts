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

const flyPostgresPool = new Pool({ connectionString: FLY_POSTGRES_CONNECTION_STRING });
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SYNC_INTERVAL_MS = 60 * 1000; // Sync every 1 minute
let lastSuccessfulScanSync = new Date(0);
let lastSuccessfulFindingSync = new Date(0);

async function syncScansMaster() {
    console.log(`SyncWorker: Checking for updated scans since ${lastSuccessfulScanSync.toISOString()}`);
    try {
        const { rows } = await flyPostgresPool.query(
            `SELECT 
                scan_id, 
                company_name, 
                domain, 
                status, 
                created_at, 
                updated_at, 
                completed_at,
                error_message,
                total_findings_count,
                max_severity
             FROM scans_master 
             WHERE updated_at > $1 
             ORDER BY updated_at ASC
             LIMIT 100`, // Batching
            [lastSuccessfulScanSync]
        );

        if (rows.length > 0) {
            const recordsToUpsert = rows.map(r => ({
                scan_id: r.scan_id,
                company_name: r.company_name,
                domain: r.domain,
                status: r.status,
                progress: '0', // Default progress
                current_module: null,
                total_modules: '10', // Default total modules
                started_at: r.created_at,
                last_updated: r.updated_at,
                completed_at: r.completed_at,
                error_message: r.error_message,
                created_at: r.created_at,
                updated_at: r.updated_at,
            }));

            const { data, error } = await supabase
                .from('scan_status') // Your Supabase table name
                .upsert(recordsToUpsert, { onConflict: 'scan_id', ignoreDuplicates: false });

            if (error) {
                console.error('SyncWorker: Error upserting scans to Supabase:', error);
                return; // Don't update timestamp on error
            }
            
            lastSuccessfulScanSync = new Date(rows[rows.length - 1].updated_at);
            console.log(`SyncWorker: Synced ${rows.length} scans to Supabase. Next sync after ${lastSuccessfulScanSync.toISOString()}`);
        } else {
            console.log('SyncWorker: No new/updated scans to sync.');
        }
    } catch (error) {
        console.error('SyncWorker: Error in syncScansMaster:', error);
    }
}

async function syncFindings() {
    console.log(`SyncWorker: Checking for new findings since ${lastSuccessfulFindingSync.toISOString()}`);
    try {
        const { rows } = await flyPostgresPool.query(
            `SELECT 
                f.id as original_finding_id,
                a.meta->>'scan_id' as scan_id,
                f.finding_type,
                f.description,
                f.recommendation,
                a.severity as severity, -- Get severity from the associated artifact
                f.created_at
             FROM findings f
             JOIN artifacts a ON f.artifact_id = a.id
             WHERE f.created_at > $1
             ORDER BY f.created_at ASC
             LIMIT 200`, // Batching
            [lastSuccessfulFindingSync]
        );

        if (rows.length > 0) {
            const recordsToUpsert = rows.map(f => ({
                // Assuming Supabase 'findings' table has 'id' as PK and you want to use original_finding_id
                id: f.original_finding_id, 
                scan_id: f.scan_id,
                type: f.finding_type,
                description: f.description,
                recommendation: f.recommendation,
                severity: f.severity,
                created_at: f.created_at,
            }));

            const { data, error } = await supabase
                .from('findings') // Your Supabase table name
                .upsert(recordsToUpsert, { onConflict: 'id', ignoreDuplicates: false });

            if (error) {
                console.error('SyncWorker: Error upserting findings to Supabase:', error);
                return; // Don't update timestamp on error
            }
            
            lastSuccessfulFindingSync = new Date(rows[rows.length - 1].created_at);
            console.log(`SyncWorker: Synced ${rows.length} findings to Supabase. Next sync after ${lastSuccessfulFindingSync.toISOString()}`);
        } else {
            console.log('SyncWorker: No new findings to sync.');
        }
    } catch (error) {
        console.error('SyncWorker: Error in syncFindings:', error);
    }
}

async function runSyncCycle() {
    console.log('SyncWorker: --- Starting Sync Cycle ---');
    await syncScansMaster();
    await syncFindings();
    console.log('SyncWorker: --- Sync Cycle Finished ---');
}

async function startSyncWorker() {
    console.log('SyncWorker: Initializing...');
    // Perform an initial check to catch up if worker was down
    await runSyncCycle(); 

    setInterval(runSyncCycle, SYNC_INTERVAL_MS);
    console.log(`SyncWorker: Started. Will sync every ${SYNC_INTERVAL_MS / 1000} seconds.`);
}

startSyncWorker().catch(error => {
    console.error('SyncWorker: CRITICAL - Failed to start:', error);
    process.exit(1);
}); 