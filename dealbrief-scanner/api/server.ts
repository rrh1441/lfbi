import Fastify from 'fastify';
import { config } from 'dotenv';
import { UpstashQueue } from '../workers/core/queue.js';
import { nanoid } from 'nanoid';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

config();

const app = Fastify({ logger: true });
const queue = new UpstashQueue(process.env.REDIS_URL!);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

app.post('/scan', async (req, reply) => {
  const { companyName, domain, ownerName, userId } =
    (req.body as Record<string, string>) ?? {};

  if (!companyName || !domain || !userId) {
    return reply.code(400).send({
      error: 'companyName, domain and userId are required'
    });
  }

  const jobId = nanoid(12);
  await queue.enqueue({
    id: jobId,
    companyName,
    domain,
    ownerName: ownerName ?? '',
    userId,
    enqueuedAt: Date.now()
  });

  return { jobId };
});

app.get<{ Params: { id: string } }>('/scan/:id/status', async (req, reply) => {
  const state = await queue.status(req.params.id);
  if (!state) return reply.code(404).send({ error: 'job not found' });
  return state;
});

app.post<{ Params: { id: string } }>(
  '/scan/:id/callback',
  async (req, reply) => {
    const { id } = req.params;
    const body = req.body as { userId: string; jsonUrl: string; pdfUrl: string };
    const { data, error } = await supabase
      .from('reports')
      .insert({
        id,
        user_id: body.userId,
        json_url: body.jsonUrl,
        pdf_url: body.pdfUrl
      })
      .select('*')
      .single();

    if (error) return reply.code(500).send(error);
    return data;
  }
);

const port = Number(process.env.PORT || 8080);
app.listen({ port, host: '0.0.0.0' }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
