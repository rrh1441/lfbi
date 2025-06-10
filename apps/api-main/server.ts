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
  const { companyName, domain } = request.body as { companyName: string; domain: string };
  
  if (!companyName || !domain) {
    reply.status(400);
    return { error: 'Company name and domain are required' };
  }

  const scanId = nanoid(11);
  const job = {
    id: scanId,
    companyName,
    domain,
    createdAt: new Date().toISOString()
  };

  await queue.addJob(scanId, job);
  log('[api] Created scan job', scanId, 'for', companyName);

  return {
    scanId,
    status: 'queued',
    companyName,
    domain,
    message: 'Scan started successfully'
  };
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
    const artifactsResult = await pool.query(`
      SELECT id, type, val_text, severity, src_url, sha256, mime, created_at, meta
      FROM artifacts 
      WHERE meta->>'scan_id' = $1
      ORDER BY severity DESC, created_at DESC
    `, [scanId]);
    
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
    const findingsResult = await pool.query(`
      SELECT f.id, f.finding_type, f.title, f.description, f.created_at,
             a.type as artifact_type, a.val_text, a.severity, a.src_url
      FROM findings f
      JOIN artifacts a ON f.artifact_id = a.id
      WHERE a.meta->>'scan_id' = $1
      ORDER BY a.severity DESC, f.created_at DESC
    `, [scanId]);
    
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
