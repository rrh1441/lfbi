import { config } from 'dotenv';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { UpstashQueue } from '../workers/core/queue.js';
import { nanoid } from 'nanoid';
import { pool } from '../workers/core/artifactStore.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });
const queue = new UpstashQueue(process.env.REDIS_URL!);

function log(...args: any[]) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]`, ...args);
}

// Register static file serving for the public directory
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
  prefix: '/', // serve files from root
});

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Create a new scan
fastify.post('/scan', async (request, reply) => {
  try {
    const { companyName, domain } = request.body as { companyName: string; domain: string };
    
    if (!companyName || !domain) {
      log('[api] Scan creation failed: Missing required fields - companyName or domain');
      reply.status(400);
      return { error: 'Company name and domain are required' };
    }

    const scanId = nanoid(11);
    
    // Validate scanId is a non-empty string
    if (!scanId || typeof scanId !== 'string' || scanId.trim().length === 0) {
      log('[api] CRITICAL: Failed to generate valid scanId');
      reply.status(500);
      return { error: 'Failed to generate scan ID', details: 'Internal server error during scan ID generation' };
    }
    
    const job = {
      id: scanId,
      companyName,
      domain,
      createdAt: new Date().toISOString()
    };

    log(`[api] Attempting to create scan job ${scanId} for ${companyName} (${domain})`);
    
    try {
      await queue.addJob(scanId, job);
      log(`[api] ✅ Successfully created scan job ${scanId} for ${companyName}`);
    } catch (queueError) {
      log('[api] CRITICAL: Failed to add job to queue:', (queueError as Error).message);
      reply.status(500);
      return { 
        error: 'Failed to queue scan job', 
        details: `Queue operation failed: ${(queueError as Error).message}`,
        scanId: null
      };
    }

    return {
      scanId,
      status: 'queued',
      companyName,
      domain,
      message: 'Scan started successfully'
    };

  } catch (error) {
    log('[api] CRITICAL: Unexpected error in POST /scan:', (error as Error).message);
    log('[api] Error stack:', (error as Error).stack);
    reply.status(500);
    return { 
      error: 'Internal server error during scan creation', 
      details: (error as Error).message,
      scanId: null
    };
  }
});

// Get scan status
fastify.get('/scan/:scanId/status', async (request, reply) => {
  const { scanId } = request.params as { scanId: string };
  
  const status = await queue.getStatus(scanId);
  
  if (!status) {
    reply.status(404);
    return { error: 'Scan not found' };
  }

  return {
    scanId,
    ...status
  };
});

// Get raw artifacts from scan
fastify.get('/scan/:scanId/artifacts', async (request, reply) => {
  const { scanId } = request.params as { scanId: string };
  
  try {
    log(`[api] Retrieving artifacts for scan: ${scanId}`);
    
    const artifactsResult = await pool.query(`
      SELECT id, type, val_text, severity, src_url, sha256, mime, created_at, meta
      FROM artifacts 
      WHERE meta->>'scan_id' = $1
      ORDER BY severity DESC, created_at DESC
    `, [scanId]);
    
    log(`[api] Found ${artifactsResult.rows.length} artifacts for scan ${scanId}`);
    
    if (artifactsResult.rows.length === 0) {
      reply.status(404);
      return { error: 'No artifacts found for this scan' };
    }

    return {
      scanId,
      artifacts: artifactsResult.rows,
      count: artifactsResult.rows.length,
      retrievedAt: new Date().toISOString()
    };
  } catch (error) {
    log('[api] Error retrieving artifacts:', (error as Error).message);
    reply.status(500);
    return { error: 'Failed to retrieve artifacts', details: (error as Error).message };
  }
});

// Get findings from scan
fastify.get('/scan/:scanId/findings', async (request, reply) => {
  const { scanId } = request.params as { scanId: string };
  
  try {
    log(`[api] Retrieving findings for scan: ${scanId}`);
    
    const findingsResult = await pool.query(`
      SELECT f.id, f.finding_type, f.description, f.recommendation, f.created_at,
             a.type as artifact_type, a.val_text, a.severity, a.src_url
      FROM findings f
      JOIN artifacts a ON f.artifact_id = a.id
      WHERE a.meta->>'scan_id' = $1
      ORDER BY a.severity DESC, f.created_at DESC
    `, [scanId]);
    
    log(`[api] Found ${findingsResult.rows.length} findings for scan ${scanId}`);
    
    if (findingsResult.rows.length === 0) {
      reply.status(404);
      return { error: 'No findings found for this scan' };
    }

    return {
      scanId,
      findings: findingsResult.rows,
      count: findingsResult.rows.length,
      retrievedAt: new Date().toISOString()
    };
  } catch (error) {
    log('[api] Error retrieving findings:', (error as Error).message);
    reply.status(500);
    return { error: 'Failed to retrieve findings', details: (error as Error).message };
  }
});

// Webhook callback endpoint (for future use)
fastify.post('/scan/:id/callback', async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    log('[api] Received callback for scan', id);
    return { received: true };
  } catch (error) {
    log('[api] Error handling callback:', (error as Error).message);
    return reply.status(500).send({ error: 'Callback failed' });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    log('[api] Server listening on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
