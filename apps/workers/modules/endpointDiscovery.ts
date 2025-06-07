import axios from 'axios';
import { parse } from 'node-html-parser';
import { Parser } from 'acorn';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

interface DiscoveredEndpoint {
  url: string;
  path: string;
  confidence: 'high' | 'medium' | 'low';
  source: 'robots' | 'sitemap' | 'crawl_link' | 'crawl_form' | 'js_analysis' | 'archive_passive' | 'wordlist_enum';
  method?: string;
  technology?: string;
  statusCode?: number;
  contentType?: string;
  jsonKeysPreview?: string[];
  archivedUrl?: string;
}

const TOP_200_COMMON_DIRS = ["api","admin","app","assets","auth","blog","board","cgi-bin","data","dev","docs","files","forum","img","include","js","lib","login","media","modules","news","pages","scripts","server","src","static","uploads","user","v1","v2","v3","web","wp-admin","wp-content","wp-includes"];

async function fetchWaybackEndpoints(domain: string): Promise<string[]> {
    try {
        const url = `http://web.archive.org/cdx/search/cdx?url=*.${domain}/*&output=json&fl=original&collapse=urlkey&limit=500&filter=statuscode:200&filter=mimetype:text/html|application/json`;
        const { data } = await axios.get(url, { timeout: 15000 });
        if (Array.isArray(data) && data.length > 0) {
            return data.slice(1).map(item => item[0]); // Skip header row
        }
    } catch (error) {
        log(`[endpointDiscovery] Wayback Machine query failed for ${domain}:`, (error as Error).message);
    }
    return [];
}

function extractEndpointsFromJS(jsContent: string): string[] {
    const endpoints = new Set<string>();
    try {
        const ast = Parser.parse(jsContent, { ecmaVersion: 2020, silent: true, locations: false });
        // Simplified traversal - in a real scenario, use a proper traversal library
        JSON.stringify(ast, (key, value) => {
            if (key === 'value' && typeof value === 'string' && value.startsWith('/')) {
                if (value.includes('api') || value.includes('user') || value.includes('data')) {
                   endpoints.add(value.split('?')[0]);
                }
            }
            if (key === 'callee' && value && value.name && ['fetch', 'axios'].includes(value.name)) {
                // This is a placeholder for deeper analysis of fetch/axios calls
            }
            return value;
        });
    } catch(e) {
        // Fallback to regex if parsing fails
        const regex = /['"](\/[^'"]*\/api\/[^'"]*)['"]/g;
        let match;
        while((match = regex.exec(jsContent)) !== null) {
            endpoints.add(match[1]);
        }
    }
    return Array.from(endpoints);
}

async function checkEndpoint(url: string): Promise<{ status: number, contentType: string, jsonKeys: string[] } | null> {
    try {
        const response = await axios.get(url, { timeout: 7000, validateStatus: () => true, headers: { 'User-Agent': 'DealBrief-Scanner/1.0' } });
        if (response.status !== 404) {
            const contentType = response.headers['content-type'] || 'unknown';
            let jsonKeys: string[] = [];
            if (contentType.includes('application/json') && typeof response.data === 'object') {
                jsonKeys = Object.keys(response.data).slice(0, 10);
            }
            return { status: response.status, contentType, jsonKeys };
        }
    } catch (error) {
        // Network errors etc.
    }
    return null;
}

export async function runEndpointDiscovery(job: { domain: string; scanId?: string }): Promise<number> {
    log(`[endpointDiscovery] Starting enhanced endpoint discovery for ${job.domain}`);
    const discoveredEndpoints = new Map<string, DiscoveredEndpoint>();
    const baseUrl = `https://${job.domain}`;

    // ... (Passive Discovery: robots.txt, sitemap.xml)
    
    // JS Analysis from crawled pages
    // ... inside crawl loop ...
    // const scripts = document.querySelectorAll('script[src]');
    // for (const script of scripts) {
    //    const jsEndpoints = extractEndpointsFromJS(jsContent);
    //    // add to discoveredEndpoints
    // }

    // Wayback Machine
    const waybackUrls = await fetchWaybackEndpoints(job.domain);
    for (const url of waybackUrls) {
        const liveUrl = new URL(url).pathname;
        const result = await checkEndpoint(`${baseUrl}${liveUrl}`);
        if (result) {
            discoveredEndpoints.set(liveUrl, {
                url: `${baseUrl}${liveUrl}`,
                path: liveUrl,
                confidence: 'low',
                source: 'archive_passive',
                statusCode: result.status,
                contentType: result.contentType,
                archivedUrl: url
            });
        }
        await new Promise(r => setTimeout(r, 200)); // Rate limit
    }

    // Smarter Wordlist Enumeration
    const apiPrefixes = ['/api', ''];
    const versions = ['/v1', '/v2', '/v3', ''];
    for (const prefix of apiPrefixes) {
        for (const version of versions) {
            for (const word of TOP_200_COMMON_DIRS) {
                const path = `${prefix}${version}/${word}`;
                if (discoveredEndpoints.has(path)) continue;

                const result = await checkEndpoint(`${baseUrl}${path}`);
                if (result) {
                     discoveredEndpoints.set(path, {
                        url: `${baseUrl}${path}`,
                        path,
                        confidence: 'low',
                        source: 'wordlist_enum',
                        statusCode: result.status,
                        contentType: result.contentType,
                        jsonKeysPreview: result.jsonKeys
                    });
                }
                 await new Promise(r => setTimeout(r, 100)); // Rate limit
            }
        }
    }

    const endpointsArray = Array.from(discoveredEndpoints.values());

    await insertArtifact({
      type: 'discovered_endpoints',
      val_text: `Discovered ${endpointsArray.length} unique endpoints`,
      severity: 'INFO',
      meta: {
        scan_id: job.scanId,
        scan_module: 'endpointDiscovery',
        endpoints: endpointsArray
      }
    });

    log(`[endpointDiscovery] Completed, found ${endpointsArray.length} endpoints.`);
    return endpointsArray.length > 0 ? 1 : 0;
} 