/*
 * =============================================================================
 * MODULE: endpointDiscovery.ts (Refactored v3)
 * =============================================================================
 * This module discovers web endpoints through passive, active, and
 * brute-force methods.
 *
 * Key Improvements from previous version:
 * 1.  **Authentication Probing:** Now checks for protected endpoints by sending
 * requests with an expanded list of common authentication headers.
 * 2.  **User-Agent Rotation:** Rotates through different User-Agent strings to
 * increase stealth and avoid simple blocking.
 * 3.  **Request Spacing:** Adds configurable delays between batches of
 * concurrent requests to reduce server load and detection risk.
 * 4.  **Resource Limits:** Imposes a max file size limit on downloaded JS files
 * to prevent resource exhaustion.
 * 5.  **Comprehensive Discovery:** Fully implements passive (robots.txt,
 * sitemap.xml), active (crawling, JS analysis), and brute-force discovery.
 * =============================================================================
 */

import axios from 'axios';
import { parse } from 'node-html-parser';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

// --- Configuration ---
const MAX_CRAWL_DEPTH = 2;
const MAX_CONCURRENT_REQUESTS = 5;
const REQUEST_TIMEOUT = 8000;
const DELAY_BETWEEN_CHUNKS_MS = 500;
const MAX_JS_FILE_SIZE_BYTES = 1024 * 1024; // 1MB limit.

const ENDPOINT_WORDLIST = ["api","admin","app","assets","auth","blog","board","cgi-bin","data","dev","docs","files","forum","img","include","js","lib","login","media","modules","news","pages","scripts","server","src","static","uploads","user","v1","v2","v3","web","wp-admin","wp-content","wp-includes","about","account","api-docs","backup","bin","config","contact","css","dashboard","db","dist","download","en","graphql","home","images","includes","index.php","json","jsp","lib","local","logs","main","phpmyadmin","private","public","register","search","services","setup","sitemap","sitemap.xml","sql","support","swagger","swagger-ui.html","system","test","upload","vendor","videos","web.config","wordpress"];

// REFACTOR: Expanded auth header coverage.
const AUTH_PROBE_HEADERS = [
    { 'Authorization': 'Bearer test' },
    { 'X-API-Key': 'test' },
    { 'x-access-token': 'test' },
    { 'X-Auth-Token': 'test' },
    { 'Cookie': 'session=test' },
    { 'X-Forwarded-User': 'test' }
];

// REFACTOR: Added User-Agent rotation for stealth.
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15',
    'curl/7.81.0',
    'python-requests/2.27.1',
    'Go-http-client/1.1'
];

interface DiscoveredEndpoint {
  url: string;
  path: string;
  confidence: 'high' | 'medium' | 'low';
  source: 'robots.txt' | 'sitemap.xml' | 'crawl_link' | 'js_analysis' | 'wordlist_enum' | 'auth_probe';
  statusCode?: number;
}

const discoveredEndpoints = new Map<string, DiscoveredEndpoint>();

// --- Helper Functions ---
function getRandomUserAgent(): string {
    return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function addEndpoint(endpoint: Omit<DiscoveredEndpoint, 'url'>, baseUrl: string) {
    const fullUrl = `${baseUrl}${endpoint.path}`;
    if (!discoveredEndpoints.has(endpoint.path)) {
        log(`[endpointDiscovery] Discovered [${endpoint.source}]: ${endpoint.path} (Status: ${endpoint.statusCode || 'N/A'})`);
        discoveredEndpoints.set(endpoint.path, { ...endpoint, url: fullUrl });
    }
}

// --- Passive Discovery ---

async function parseRobotsTxt(baseUrl: string) {
    try {
        const { data } = await axios.get(`${baseUrl}/robots.txt`, { timeout: REQUEST_TIMEOUT, headers: { 'User-Agent': getRandomUserAgent() } });
        const lines = data.split('\n');
        for (const line of lines) {
            const parts = line.split(':').map((p: string) => p.trim());
            if (parts.length < 2) continue;
            const directive = parts[0].toLowerCase();
            const path = parts[1].split(' ')[0];
            if ((directive === 'disallow' || directive === 'allow') && path.startsWith('/')) {
                addEndpoint({ path, confidence: 'medium', source: 'robots.txt' }, baseUrl);
            } else if (directive === 'sitemap') {
                const sitemapUrl = new URL(parts[1], baseUrl).toString();
                await parseSitemap(sitemapUrl, baseUrl);
            }
        }
    } catch (error) {
        log(`[endpointDiscovery] Could not fetch or parse robots.txt for ${baseUrl}`);
    }
}

async function parseSitemap(sitemapUrl: string, baseUrl: string) {
    try {
        const { data } = await axios.get(sitemapUrl, { timeout: REQUEST_TIMEOUT, headers: { 'User-Agent': getRandomUserAgent() } });
        const root = parse(data);
        const locs = root.querySelectorAll('loc').map(el => el.text);
        for (const loc of locs) {
            try {
                const url = new URL(loc);
                addEndpoint({ path: url.pathname, confidence: 'high', source: 'sitemap.xml' }, baseUrl);
            } catch { /* Ignore invalid URLs */ }
        }
        const nestedSitemaps = root.querySelectorAll('sitemap > loc').map(el => el.text);
        for (const nested of nestedSitemaps) {
            await parseSitemap(nested, baseUrl);
        }
    } catch (error) {
        log(`[endpointDiscovery] Could not fetch or parse sitemap: ${sitemapUrl}`);
    }
}

// --- Active Discovery & Analysis ---

async function analyzeJsFile(jsUrl: string, baseUrl: string) {
    try {
        const { data: jsContent } = await axios.get(jsUrl, { 
            timeout: REQUEST_TIMEOUT,
            maxContentLength: MAX_JS_FILE_SIZE_BYTES,
            headers: { 'User-Agent': getRandomUserAgent() }
        });
        const pathRegex = /['"](\/[a-zA-Z0-9\/\-_.]*(api|user|auth|v1|v2|v3|graphql|jwt|token)[a-zA-Z0-9\/\-_.]*)['"]/g;
        let match;
        while ((match = pathRegex.exec(jsContent)) !== null) {
            addEndpoint({ path: match[1], confidence: 'medium', source: 'js_analysis' }, baseUrl);
        }
    } catch (error) {
        log(`[endpointDiscovery] Failed to analyze JS file: ${jsUrl}`);
    }
}

async function crawlPage(url: string, depth: number, baseUrl: string, visited: Set<string>) {
    if (depth > MAX_CRAWL_DEPTH || visited.has(url)) return;
    visited.add(url);
    log(`[endpointDiscovery] Crawling [Depth ${depth}]: ${url}`);
    try {
        const { data: html } = await axios.get(url, { timeout: REQUEST_TIMEOUT, headers: { 'User-Agent': getRandomUserAgent() } });
        const root = parse(html);
        const pageLinks = new Set<string>();
        root.querySelectorAll('a[href]').forEach(link => {
            try {
                const absoluteUrl = new URL(link.getAttribute('href')!, baseUrl).toString();
                if (absoluteUrl.startsWith(baseUrl)) {
                    addEndpoint({ path: new URL(absoluteUrl).pathname, confidence: 'low', source: 'crawl_link' }, baseUrl);
                    pageLinks.add(absoluteUrl);
                }
            } catch { /* Ignore malformed hrefs */ }
        });
        root.querySelectorAll('script[src]').forEach(script => {
            try {
                const absoluteUrl = new URL(script.getAttribute('src')!, baseUrl).toString();
                if (absoluteUrl.startsWith(baseUrl)) {
                     analyzeJsFile(absoluteUrl, baseUrl);
                }
            } catch { /* Ignore malformed srcs */ }
        });
        for (const pageLink of pageLinks) {
            await crawlPage(pageLink, depth + 1, baseUrl, visited);
        }
    } catch (error) {
        log(`[endpointDiscovery] Failed to crawl page: ${url}`);
    }
}

async function bruteForceEndpoints(baseUrl: string) {
    const promises = ENDPOINT_WORDLIST.flatMap(word => {
        const path = `/${word}`;
        const userAgentHeader = { 'User-Agent': getRandomUserAgent() };
        
        // Basic probe without authentication
        const basicProbe = {
            promise: axios.head(`${baseUrl}${path}`, { timeout: REQUEST_TIMEOUT, validateStatus: () => true, headers: userAgentHeader }),
            path,
            source: 'wordlist_enum' as const
        };
        
        // Additional probes with authentication headers
        const authProbes = AUTH_PROBE_HEADERS.map(header => ({
            promise: axios.get(`${baseUrl}${path}`, { timeout: REQUEST_TIMEOUT, headers: { ...header, ...userAgentHeader }, validateStatus: () => true }),
            path,
            source: 'auth_probe' as const
        }));
        
        return [basicProbe, ...authProbes];
    });

    for (let i = 0; i < promises.length; i += MAX_CONCURRENT_REQUESTS) {
        const chunk = promises.slice(i, i + MAX_CONCURRENT_REQUESTS);
        const results = await Promise.allSettled(chunk.map(p => p.promise));

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                const response = result.value;
                const { path, source } = chunk[index];
                if (response.status < 400 || response.status === 401 || response.status === 403) {
                    addEndpoint({ path, confidence: 'low', source, statusCode: response.status }, baseUrl);
                }
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CHUNKS_MS));
    }
}


// --- Main Execution Logic ---

export async function runEndpointDiscovery(job: { domain: string; scanId?: string }): Promise<number> {
    log(`[endpointDiscovery] Starting enhanced endpoint discovery for ${job.domain}`);
    const baseUrl = `https://${job.domain}`;
    discoveredEndpoints.clear();

    log('[endpointDiscovery] --- Starting Passive Discovery Phase ---');
    await parseRobotsTxt(baseUrl);
    await parseSitemap(`${baseUrl}/sitemap.xml`, baseUrl);
    
    log('[endpointDiscovery] --- Starting Active Crawling Phase ---');
    await crawlPage(baseUrl, 1, baseUrl, new Set<string>());

    log('[endpointDiscovery] --- Starting Brute-Force & Auth Probe Phase ---');
    await bruteForceEndpoints(baseUrl);

    const endpointsArray = Array.from(discoveredEndpoints.values());

    if (endpointsArray.length > 0) {
        await insertArtifact({
            type: 'discovered_endpoints',
            val_text: `Discovered ${endpointsArray.length} unique endpoints for ${job.domain}`,
            severity: 'INFO',
            meta: {
                scan_id: job.scanId,
                scan_module: 'endpointDiscovery',
                endpoints: endpointsArray
            }
        });
    }

    log(`[endpointDiscovery] Completed, found ${endpointsArray.length} unique endpoints.`);
    return endpointsArray.length;
}
