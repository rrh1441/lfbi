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
let lastSuccessfulCredentialsSync = new Date(0);

// Declare global type for lastFindingsLogTime
declare global {
    var lastFindingsLogTime: number | undefined;
}

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
             AND (status NOT IN ('completed', 'failed') OR updated_at > NOW() - INTERVAL '1 hour')
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
            
            // Only log when there are meaningful progress updates
            // Avoid logging old completed scans from previous sessions
            const recentCompletions = recordsToUpsert.filter(scan => 
                (scan.status === 'completed' || scan.status === 'failed') &&
                new Date(scan.last_updated).getTime() > Date.now() - (30 * 60 * 1000) && // Within last 30 minutes
                new Date(scan.last_updated).getTime() > Date.now() - (10 * 60 * 1000) // And after startup window
            );
            
            const activeProgress = recordsToUpsert.filter(scan => 
                scan.status === 'processing' &&
                scan.current_module && 
                scan.progress % 20 === 0 && // Only log every 20% progress
                new Date(scan.last_updated).getTime() > Date.now() - (10 * 60 * 1000) // And recent
            );
            
            if (recentCompletions.length > 0) {
                logProgress(`Recently completed scans: ${recentCompletions.length}`, {
                    completed: recentCompletions.map(s => `${s.company_name}: ${s.status}`)
                });
            }
            
            if (activeProgress.length > 0) {
                logProgress(`Active scans progress: ${activeProgress.length}`, {
                    progress: activeProgress.map(s => `${s.company_name}: ${s.current_module} (${s.progress}%)`)
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
                // Check what findings already exist in Supabase to avoid logging duplicates
                const existingIds = recordsToUpsert.map(f => f.id);
                const { data: existingFindings } = await supabase
                    .from('findings')
                    .select('id')
                    .in('id', existingIds);
                
                const existingIdSet = new Set(existingFindings?.map(f => f.id) || []);
                const newFindings = recordsToUpsert.filter(f => !existingIdSet.has(f.id));
                
                const { data, error } = await supabase
                    .from('findings')
                    .upsert(recordsToUpsert, { onConflict: 'id', ignoreDuplicates: true });

                if (error) {
                    logError('Error upserting findings to Supabase', error);
                    return; // Don't update timestamp on error
                }
                
                // Only log when there are actually NEW findings
                if (newFindings.length > 0) {
                    const findingsByType = newFindings.reduce((acc, f) => {
                        acc[f.type] = (acc[f.type] || 0) + 1;
                        return acc;
                    }, {} as Record<string, number>);
                    
                    logProgress(`New findings synced: ${newFindings.length}`, findingsByType);
                }
            }
            
            // Always update timestamp to prevent re-processing same batch
            lastSuccessfulFindingSync = new Date(rows[rows.length - 1].created_at);
        }
    } catch (error) {
        logError('Error in syncFindingsTable', error);
    }
}

async function syncCompromisedCredentialsTable() {
    try {
        // Query for breach_directory_summary artifacts created after last successful sync
        const query = `
            SELECT id, meta, created_at 
            FROM artifacts 
            WHERE type = 'breach_directory_summary' 
            AND created_at > $1
            AND meta->'breach_analysis'->'leakcheck_results' IS NOT NULL
            ORDER BY created_at ASC
            LIMIT 50`;
        
        const { rows } = await flyPostgresPool.query(query, [lastSuccessfulCredentialsSync]);

        if (rows.length > 0) {
            const credentialsToInsert = [];
            
            for (const artifact of rows) {
                const breachAnalysis = artifact.meta?.breach_analysis;
                const scanId = artifact.meta?.scan_id;
                const domain = breachAnalysis?.domain;
                
                if (breachAnalysis?.leakcheck_results && scanId) {
                    for (const credential of breachAnalysis.leakcheck_results) {
                        // Calculate risk level
                        let riskLevel = 'MEDIUM_EMAIL_EXPOSED';
                        if (credential.has_cookies || credential.has_autofill || credential.has_browser_data ||
                            (credential.source?.name && (
                                credential.source.name.toLowerCase().includes('stealer') ||
                                credential.source.name.toLowerCase().includes('redline') ||
                                credential.source.name.toLowerCase().includes('raccoon') ||
                                credential.source.name.toLowerCase().includes('vidar')
                            ))) {
                            riskLevel = 'CRITICAL_INFOSTEALER';
                        } else if (credential.has_password) {
                            riskLevel = 'HIGH_PASSWORD_EXPOSED';
                        }
                        
                        // Determine email type
                        let emailType = 'PERSONAL_EMAIL';
                        if (credential.email && domain && credential.email.includes('@' + domain)) {
                            emailType = 'CORPORATE_EMAIL';
                        }
                        
                        credentialsToInsert.push({
                            scan_id: scanId,
                            company_domain: domain,
                            username: credential.username,
                            email: credential.email,
                            breach_source: credential.source?.name || 'Unknown',
                            breach_date: credential.source?.breach_date || null,
                            has_password: credential.has_password || false,
                            has_cookies: credential.has_cookies || false,
                            has_autofill: credential.has_autofill || false,
                            has_browser_data: credential.has_browser_data || false,
                            field_count: credential.field_count || 0,
                            risk_level: riskLevel,
                            email_type: emailType,
                            first_name: credential.first_name,
                            last_name: credential.last_name,
                            created_at: artifact.created_at
                        });
                    }
                }
            }
            
            if (credentialsToInsert.length > 0) {
                // Check for existing records to avoid duplicates
                const scanIds = [...new Set(credentialsToInsert.map(c => c.scan_id))];
                const { data: existingCredentials } = await supabase
                    .from('compromised_credentials')
                    .select('scan_id, email, username')
                    .in('scan_id', scanIds);
                
                const existingSet = new Set(existingCredentials?.map(c => `${c.scan_id}-${c.email}-${c.username}`) || []);
                const newCredentials = credentialsToInsert.filter(c => 
                    !existingSet.has(`${c.scan_id}-${c.email}-${c.username}`)
                );
                
                if (newCredentials.length > 0) {
                    const { data, error } = await supabase
                        .from('compromised_credentials')
                        .insert(newCredentials);

                    if (error) {
                        logError('Error inserting compromised credentials to Supabase', error);
                        return; // Don't update timestamp on error
                    }
                    
                    // Log summary by risk level
                    const credentialsByRisk = newCredentials.reduce((acc, c) => {
                        acc[c.risk_level] = (acc[c.risk_level] || 0) + 1;
                        return acc;
                    }, {} as Record<string, number>);
                    
                    logProgress(`New compromised credentials synced: ${newCredentials.length}`, credentialsByRisk);
                }
            }
            
            // Update timestamp to prevent re-processing
            lastSuccessfulCredentialsSync = new Date(rows[rows.length - 1].created_at);
        }
    } catch (error) {
        logError('Error in syncCompromisedCredentialsTable', error);
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
    await syncCompromisedCredentialsTable();
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
    
    // Initialize sync timestamps to prevent logging old data on startup
    // Only sync data from the last 10 minutes to avoid noise from previous deployments
    const recentTime = new Date(Date.now() - (10 * 60 * 1000)); // 10 minutes ago
    lastSuccessfulScanSync = recentTime;
    lastSuccessfulFindingSync = recentTime;
    lastSuccessfulCredentialsSync = recentTime;
    
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