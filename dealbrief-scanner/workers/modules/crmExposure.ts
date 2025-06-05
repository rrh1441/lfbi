import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import axios from "axios";
import { insertArtifact, insertFinding } from "../core/artifactStore.js";
import { uploadFile } from "../core/objectStore.js";
import { log } from "../core/logger.js";

const SERPER_URL = "https://google.serper.dev/search";

function generateCrmDorks(companyName: string, domain: string): string[] {
  const targetName = `"${companyName}"`;
  const targetDomain = `"${domain}"`;
  const target = `(${targetName} OR ${targetDomain})`;
  const extensions = "(ext:pdf OR ext:xlsx OR ext:csv OR ext:docx OR ext:ppt OR ext:zip)";

  const dorks: string[] = [];

  // HubSpot dorks
  dorks.push(`site:*.hubspotusercontent*.net inurl:/hubfs ${target} ${extensions}`);
  dorks.push(`site:*.hs-sites.com ${target} ${extensions}`);

  // Salesforce dorks
  dorks.push(`site:*.my.salesforce.com inurl:"/servlet/servlet.FileDownload?file=" ${target}`);
  dorks.push(`site:*.content.force.com inurl:"/sfc/servlet.shepherd/document" ${target}`);
  dorks.push(`site:*.visualforce.com ${target} ${extensions}`);
  dorks.push(`site:*.lightning.force.com ${target} ${extensions}`);

  return dorks;
}

export async function runCrmExposure(job: { companyName: string; domain: string }) {
  const { companyName, domain } = job;
  log("[crmExposure] Starting CRM exposure scan for", companyName);

  const headers = { "X-API-KEY": process.env.SERPER_KEY! };
  const seen = new Set<string>();
  const dorks = generateCrmDorks(companyName, domain);

  for (const query of dorks) {
    try {
      log("[crmExposure] Searching:", query);
      
      const { data } = await axios.post(
        SERPER_URL,
        { q: query, num: 25, gl: "us", hl: "en" },
        { headers }
      );

      for (const hit of data.organic ?? []) {
        const url: string = hit.link;
        if (seen.has(url)) continue;
        seen.add(url);

        const platform = url.includes("hubspot") ? "HubSpot" : "Salesforce";
        log("[crmExposure] Found", platform, "file:", url);

        await insertArtifact({
          type: "crm_exposure",
          val_text: `${platform} exposed file: ${path.basename(url)}`,
          severity: "MEDIUM",
          src_url: url,
          meta: { platform }
        });
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (err) {
      log("[crmExposure] Search error for query:", query, (err as Error).message);
    }
  }

  log("[crmExposure] CRM exposure scan completed for", companyName);
}
