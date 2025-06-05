import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import axios from 'axios';
import { insertArtifact } from '../core/artifactStore.js';
import { uploadFile } from '../core/objectStore.js';
import { log } from '../core/logger.js';

const SERPER_URL = 'https://google.serper.dev/search';
const DORKS = await fs.readFile(
  new URL('../templates/dorks.txt', import.meta.url),
  'utf8'
)
  .then((t) =>
    t
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
  )
  .catch(() => []);

/** download url to tmp file; returns [sha256, mime, localPath] */
async function download(url: string): Promise<[string, string, string]> {
  const res = await axios.get<ArrayBuffer>(url, {
    responseType: 'arraybuffer',
    timeout: 15000
  });
  const buf = Buffer.from(res.data);
  const sha = crypto.createHash('sha256').update(buf).digest('hex');
  const ext = path.extname(url).split('?')[0].replace(/[^a-z0-9.]/gi, '');
  const tmp = `/tmp/${sha}${ext}`;
  await fs.writeFile(tmp, buf);
  return [sha, res.headers['content-type'] ?? 'application/octet-stream', tmp];
}

export async function runFileHunt(job: { companyName: string; domain: string }) {
  const { companyName, domain } = job;
  log('[fileHunt]', companyName);

  const headers = { 'X-API-KEY': process.env.SERPER_KEY! };
  const seen = new Set<string>();

  for (const q of DORKS) {
    const query = q
      .replace(/COMPANY_NAME/g, `"${companyName}"`)
      .replace(/DOMAIN/g, `"${domain}"`);
    const { data } = await axios.post(
      SERPER_URL,
      { q: query, num: 10, gl: 'us', hl: 'en' },
      { headers }
    );
    for (const hit of data.organic ?? []) {
      const url: string = hit.link;
      if (seen.has(url)) continue;
      seen.add(url);

      const isBinary = /\.(pdf|docx?|xlsx?|csv|zip|tgz|sql|log|txt)$/i.test(url);
      if (!isBinary) continue;

      try {
        const [sha, mime, tmp] = await download(url);
        const key = `raw/${sha}${path.extname(url).split('?')[0]}`;
        await uploadFile(tmp, key, mime);
        await insertArtifact({
          type: 'file',
          val_text: sha,
          severity: 'MEDIUM',
          src_url: url,
          sha256: sha,
          mime
        });
        await fs.unlink(tmp);
      } catch (err) {
        log('[fileHunt] download error', url, (err as Error).message);
      }
    }
  }
}
