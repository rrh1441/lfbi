import axios from 'axios';
import { parse } from 'node-html-parser';
import { insertArtifact } from '../core/artifactStore.js';
export async function runEndpointDiscovery(job) {
    console.log(`[endpointDiscovery] Starting endpoint discovery for ${job.domain}`);
    const discoveredEndpoints = [];
    let findingsCount = 0;
    const baseUrls = [`https://${job.domain}`, `http://${job.domain}`];
    let detectedTechnology = 'unknown';
    try {
        // PHASE 1: PASSIVE DISCOVERY
        console.log(`[endpointDiscovery] Phase 1: Passive discovery`);
        for (const baseUrl of baseUrls) {
            try {
                // Check robots.txt
                const robotsResponse = await axios.get(`${baseUrl}/robots.txt`, {
                    timeout: 10000,
                    validateStatus: () => true,
                    headers: { 'User-Agent': 'DealBrief-Scanner/1.0' }
                });
                if (robotsResponse.status === 200) {
                    const robotsLines = robotsResponse.data.split('\n');
                    robotsLines.forEach((line) => {
                        const match = line.match(/(?:Disallow|Allow):\s*(.+)/i);
                        if (match && match[1] !== '/') {
                            discoveredEndpoints.push({
                                url: `${baseUrl}${match[1]}`,
                                path: match[1],
                                method: 'GET',
                                confidence: 'high',
                                source: 'passive'
                            });
                        }
                    });
                    console.log(`[endpointDiscovery] Found ${robotsLines.length} entries in robots.txt`);
                }
                // Check sitemap.xml
                const sitemapResponse = await axios.get(`${baseUrl}/sitemap.xml`, {
                    timeout: 10000,
                    validateStatus: () => true,
                    headers: { 'User-Agent': 'DealBrief-Scanner/1.0' }
                });
                if (sitemapResponse.status === 200) {
                    const urlMatches = sitemapResponse.data.match(/<loc>(.*?)<\/loc>/g) || [];
                    urlMatches.forEach((match) => {
                        const url = match.replace(/<\/?loc>/g, '');
                        const path = new URL(url).pathname;
                        discoveredEndpoints.push({
                            url,
                            path,
                            method: 'GET',
                            confidence: 'high',
                            source: 'passive'
                        });
                    });
                    console.log(`[endpointDiscovery] Found ${urlMatches.length} URLs in sitemap.xml`);
                }
                // Technology detection via main page
                const mainPageResponse = await axios.get(baseUrl, {
                    timeout: 10000,
                    validateStatus: () => true,
                    headers: { 'User-Agent': 'DealBrief-Scanner/1.0' }
                });
                if (mainPageResponse.status === 200) {
                    const content = mainPageResponse.data.toLowerCase();
                    const headers = JSON.stringify(mainPageResponse.headers).toLowerCase();
                    // Detect technology
                    if (content.includes('wp-content') || content.includes('wordpress') || headers.includes('wordpress')) {
                        detectedTechnology = 'wordpress';
                    }
                    else if (content.includes('drupal') || headers.includes('drupal')) {
                        detectedTechnology = 'drupal';
                    }
                    else if (content.includes('joomla')) {
                        detectedTechnology = 'joomla';
                    }
                    else if (headers.includes('express') || content.includes('express')) {
                        detectedTechnology = 'express';
                    }
                    else if (headers.includes('react') || content.includes('react')) {
                        detectedTechnology = 'react';
                    }
                    console.log(`[endpointDiscovery] Detected technology: ${detectedTechnology}`);
                }
                // Check common config/sensitive files
                const commonFiles = [
                    '/.env', '/.git/config', '/config.php', '/wp-config.php',
                    '/admin', '/administrator', '/wp-admin', '/api', '/v1',
                    '/swagger.json', '/openapi.json', '/.well-known/security.txt'
                ];
                for (const file of commonFiles) {
                    try {
                        const fileResponse = await axios.head(`${baseUrl}${file}`, {
                            timeout: 5000,
                            validateStatus: () => true,
                            headers: { 'User-Agent': 'DealBrief-Scanner/1.0' }
                        });
                        if (fileResponse.status === 200 || fileResponse.status === 403) {
                            discoveredEndpoints.push({
                                url: `${baseUrl}${file}`,
                                path: file,
                                method: 'GET',
                                confidence: 'high',
                                source: 'passive',
                                statusCode: fileResponse.status
                            });
                        }
                    }
                    catch (error) {
                        // File doesn't exist or not accessible
                    }
                }
                break; // If HTTPS works, don't try HTTP
            }
            catch (error) {
                console.log(`[endpointDiscovery] ${baseUrl} not accessible, trying next...`);
            }
        }
        // PHASE 2: ACTIVE CRAWLING
        console.log(`[endpointDiscovery] Phase 2: Active crawling`);
        const crawledUrls = new Set();
        const urlsToProcess = [baseUrls[0]]; // Start with main URL
        let depth = 0;
        const maxDepth = 2;
        while (urlsToProcess.length > 0 && depth < maxDepth) {
            const currentUrls = [...urlsToProcess];
            urlsToProcess.length = 0;
            for (const url of currentUrls) {
                if (crawledUrls.has(url))
                    continue;
                crawledUrls.add(url);
                try {
                    const response = await axios.get(url, {
                        timeout: 10000,
                        validateStatus: (status) => status < 500,
                        headers: { 'User-Agent': 'DealBrief-Scanner/1.0' }
                    });
                    if (response.status === 200 && response.headers['content-type']?.includes('text/html')) {
                        const document = parse(response.data);
                        // Extract links
                        const links = document.querySelectorAll('a[href]');
                        links.forEach(link => {
                            const href = link.getAttribute('href');
                            if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#')) {
                                const fullUrl = new URL(href, url).toString();
                                if (fullUrl.includes(job.domain)) {
                                    urlsToProcess.push(fullUrl);
                                    const path = new URL(fullUrl).pathname;
                                    discoveredEndpoints.push({
                                        url: fullUrl,
                                        path,
                                        method: 'GET',
                                        confidence: 'medium',
                                        source: 'crawl'
                                    });
                                }
                            }
                        });
                        // Extract forms and their action URLs
                        const forms = document.querySelectorAll('form');
                        forms.forEach(form => {
                            const action = form.getAttribute('action');
                            const method = form.getAttribute('method') || 'GET';
                            if (action) {
                                const fullUrl = new URL(action, url).toString();
                                if (fullUrl.includes(job.domain)) {
                                    const path = new URL(fullUrl).pathname;
                                    // Extract form parameters
                                    const inputs = form.querySelectorAll('input[name], select[name], textarea[name]');
                                    const parameters = inputs.map(input => input.getAttribute('name')).filter(Boolean);
                                    discoveredEndpoints.push({
                                        url: fullUrl,
                                        path,
                                        method: method.toUpperCase(),
                                        confidence: 'high',
                                        source: 'crawl',
                                        parameters
                                    });
                                }
                            }
                        });
                        // Extract JavaScript files and analyze for endpoints
                        const scripts = document.querySelectorAll('script[src]');
                        for (const script of scripts) {
                            const src = script.getAttribute('src');
                            if (src && !src.startsWith('http') && !src.includes('jquery') && !src.includes('bootstrap')) {
                                try {
                                    const scriptUrl = new URL(src, url).toString();
                                    const scriptResponse = await axios.get(scriptUrl, {
                                        timeout: 5000,
                                        validateStatus: () => true,
                                        headers: { 'User-Agent': 'DealBrief-Scanner/1.0' }
                                    });
                                    if (scriptResponse.status === 200) {
                                        // Look for API endpoints in JavaScript
                                        const apiMatches = scriptResponse.data.match(/['"]\/api\/[^'"]+['"]/g) || [];
                                        apiMatches.forEach((match) => {
                                            const path = match.replace(/['"]/g, '');
                                            discoveredEndpoints.push({
                                                url: `${baseUrls[0]}${path}`,
                                                path,
                                                method: 'GET',
                                                confidence: 'medium',
                                                source: 'crawl',
                                                technology: 'api'
                                            });
                                        });
                                    }
                                }
                                catch (error) {
                                    // JavaScript file not accessible
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    // URL not accessible
                }
                // Rate limit crawling
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            depth++;
        }
        // PHASE 3: LIGHT DIRECTORY ENUMERATION
        console.log(`[endpointDiscovery] Phase 3: Technology-specific enumeration`);
        let techWordlist = [];
        switch (detectedTechnology) {
            case 'wordpress':
                techWordlist = [
                    '/wp-admin', '/wp-login.php', '/wp-json', '/wp-json/wp/v2',
                    '/wp-content/uploads', '/xmlrpc.php', '/wp-cron.php'
                ];
                break;
            case 'drupal':
                techWordlist = [
                    '/admin', '/user/login', '/api', '/rest', '/jsonapi'
                ];
                break;
            case 'express':
            case 'react':
                techWordlist = [
                    '/api', '/v1', '/v2', '/auth', '/login', '/register',
                    '/admin', '/dashboard', '/health', '/status'
                ];
                break;
            default:
                techWordlist = [
                    '/api', '/admin', '/login', '/auth', '/health'
                ];
        }
        for (const path of techWordlist) {
            try {
                const response = await axios.head(`${baseUrls[0]}${path}`, {
                    timeout: 5000,
                    validateStatus: () => true,
                    headers: { 'User-Agent': 'DealBrief-Scanner/1.0' }
                });
                if (response.status < 500 && response.status !== 404) {
                    discoveredEndpoints.push({
                        url: `${baseUrls[0]}${path}`,
                        path,
                        method: 'GET',
                        confidence: 'low',
                        source: 'directory_enum',
                        technology: detectedTechnology,
                        statusCode: response.status
                    });
                }
            }
            catch (error) {
                // Endpoint not accessible
            }
            // Rate limit enumeration
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        // Remove duplicates and store findings
        const uniqueEndpoints = Array.from(new Map(discoveredEndpoints.map(ep => [ep.path, ep])).values());
        console.log(`[endpointDiscovery] Discovered ${uniqueEndpoints.length} unique endpoints`);
        // Store discovered endpoints in database
        const artifactId = await insertArtifact({
            type: 'discovered_endpoints',
            val_text: `Discovered ${uniqueEndpoints.length} endpoints via comprehensive reconnaissance`,
            severity: 'INFO',
            meta: {
                scan_id: job.scanId,
                scan_module: 'endpointDiscovery',
                detected_technology: detectedTechnology,
                endpoints: uniqueEndpoints,
                discovery_stats: {
                    passive: uniqueEndpoints.filter(ep => ep.source === 'passive').length,
                    crawl: uniqueEndpoints.filter(ep => ep.source === 'crawl').length,
                    directory_enum: uniqueEndpoints.filter(ep => ep.source === 'directory_enum').length
                }
            }
        });
        findingsCount = 1;
        console.log(`[endpointDiscovery] Endpoint discovery completed`);
        return findingsCount;
    }
    catch (error) {
        console.log('[endpointDiscovery] Error during endpoint discovery:', error.message);
        return 0;
    }
}
//# sourceMappingURL=endpointDiscovery.js.map