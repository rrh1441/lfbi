

2025-07-08 09:43:42.035	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-07-08 09:43:42.006	
[2025-07-08T16:43:42.006Z] [documentExposure] Completed: 0 files found, 10 parallel Serper calls (~$0.030)
2025-07-08 09:43:42.006	
[2025-07-08T16:43:42.005Z] [techStackScan] buildTargets discovered=44 total=46 (html=46, nonHtml=0)
2025-07-08 09:43:41.994	
[2025-07-08T16:43:41.993Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:41.992	
[2025-07-08T16:43:41.992Z] [techStackScan] techstack=nuclei wrapper confirmed available
2025-07-08 09:43:41.992	
[2025-07-08T16:43:41.992Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:43:41.991	
[INF] PDCP Directory: /root/.pdcp
2025-07-08 09:43:41.991	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-08 09:43:41.991	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-08 09:43:41.991	
[2025-07-08T16:43:41.991Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-08 09:43:41.962	
[2025-07-08T16:43:41.960Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-08 09:43:41.957	
[2025-07-08T16:43:41.956Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:43:41.951	
[2025-07-08T16:43:41.948Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://upliftai.org -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 1
2025-07-08 09:43:41.945	
[2025-07-08T16:43:41.945Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-08 09:43:41.945	
[2025-07-08T16:43:41.944Z] [nucleiWrapper] Starting two-pass scan for https://upliftai.org
2025-07-08 09:43:41.945	
[2025-07-08T16:43:41.944Z] [nuclei] Smart guard: techs=none timeout=20s headless=false
2025-07-08 09:43:41.944	
[2025-07-08T16:43:41.944Z] [nuclei] [Enhanced Two-Pass Scan] Running on https://upliftai.org
2025-07-08 09:43:41.944	
[2025-07-08T16:43:41.944Z] [nuclei] --- Starting Enhanced Two-Pass Scans on 1 targets ---
2025-07-08 09:43:41.944	
[2025-07-08T16:43:41.943Z] [nuclei] Nuclei binary validated successfully.
2025-07-08 09:43:41.942	
[2025-07-08T16:43:41.941Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:43:41.941	
[INF] PDCP Directory: /root/.pdcp
2025-07-08 09:43:41.941	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-08 09:43:41.941	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-08 09:43:41.941	
[2025-07-08T16:43:41.940Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-08 09:43:41.775	
[2025-07-08T16:43:41.774Z] [abuseIntelScan] No IP artifacts found for this scan
2025-07-08 09:43:41.774	
[2025-07-08T16:43:41.774Z] [abuseIntelScan] Found 0 IP artifacts for scan A2OlrVX7H9E
2025-07-08 09:43:41.771	
[2025-07-08T16:43:41.771Z] [worker] [A2OlrVX7H9E] WAITING for dns_twist scan to complete...
2025-07-08 09:43:41.771	
[2025-07-08T16:43:41.771Z] [worker] [A2OlrVX7H9E] COMPLETED shodan scan: 4 findings found
2025-07-08 09:43:41.771	
[2025-07-08T16:43:41.771Z] [worker] [A2OlrVX7H9E] WAITING for shodan scan to complete...
2025-07-08 09:43:41.771	
[2025-07-08T16:43:41.771Z] [worker] [A2OlrVX7H9E] COMPLETED breach_directory_probe scan: 0 findings found
2025-07-08 09:43:41.771	
[2025-07-08T16:43:41.771Z] [worker] [A2OlrVX7H9E] WAITING for breach_directory_probe scan to complete...
2025-07-08 09:43:41.771	
[2025-07-08T16:43:41.770Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=A2OlrVX7H9E
2025-07-08 09:43:41.770	
[2025-07-08T16:43:41.770Z] [worker] [A2OlrVX7H9E] STARTING AbuseIPDB intelligence scan for IPs (parallel after endpoint discovery)
2025-07-08 09:43:41.770	
[2025-07-08T16:43:41.770Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:43:41.759	
[2025-07-08T16:43:41.759Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-08 09:43:41.759	
[2025-07-08T16:43:41.759Z] [techStackScan] techstack=start domain=upliftai.org
2025-07-08 09:43:41.759	
[2025-07-08T16:43:41.758Z] [worker] [A2OlrVX7H9E] STARTING tech stack scan for upliftai.org (parallel after endpoint discovery)
2025-07-08 09:43:41.758	
[2025-07-08T16:43:41.757Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:43:41.747	
[2025-07-08T16:43:41.747Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-08 09:43:41.747	
[2025-07-08T16:43:41.746Z] [nuclei] Starting enhanced vulnerability scan for upliftai.org
2025-07-08 09:43:41.746	
[2025-07-08T16:43:41.746Z] [worker] [A2OlrVX7H9E] STARTING Nuclei vulnerability scan for upliftai.org (parallel after endpoint discovery)
2025-07-08 09:43:41.746	
[2025-07-08T16:43:41.746Z] [worker] [A2OlrVX7H9E] COMPLETED endpoint discovery: 44 endpoint collections found
2025-07-08 09:43:41.746	
[2025-07-08T16:43:41.746Z] [endpointDiscovery] ⇢ done – 44 endpoints
2025-07-08 09:43:39.527	
[2025-07-08T16:43:39.526Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:34.292	
[2025-07-08T16:43:34.292Z] [accessibilityScan] Testing accessibility for: https://upliftai.org/voice-initiative
2025-07-08 09:43:33.177	
[2025-07-08T16:43:33.176Z] [dynamicBrowser] Page operation completed in 13271ms
2025-07-08 09:43:33.177	
[2025-07-08T16:43:33.176Z] [accessibilityScan] Accessibility test complete for https://upliftai.org/voice-technology: 0 violations, 27 passes
2025-07-08 09:43:28.680	
[2025-07-08T16:43:28.680Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:24.977	
[2025-07-08T16:43:24.977Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:22.177	
[2025-07-08T16:43:22.177Z] [documentExposure] process error: Request failed with status code 404
2025-07-08 09:43:22.142	
[2025-07-08T16:43:22.141Z] [dynamicBrowser] Metrics: browser_rss_mb=230, heap_used_mb=80, pages_open=1
2025-07-08 09:43:19.905	
[2025-07-08T16:43:19.905Z] [accessibilityScan] Testing accessibility for: https://upliftai.org/voice-technology
2025-07-08 09:43:19.407	
[2025-07-08T16:43:19.407Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:19.345	
[2025-07-08T16:43:19.345Z] [documentExposure] process error: Request failed with status code 403
2025-07-08 09:43:19.136	
[2025-07-08T16:43:19.136Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:18.784	
[2025-07-08T16:43:18.782Z] [dynamicBrowser] Page operation completed in 5165ms
2025-07-08 09:43:18.784	
[2025-07-08T16:43:18.782Z] [accessibilityScan] Accessibility test complete for https://upliftai.org/homex: 1 violations, 27 passes
2025-07-08 09:43:17.425	
[2025-07-08T16:43:17.425Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:16.237	
[2025-07-08T16:43:16.237Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:14.671	
[2025-07-08T16:43:14.671Z] [tlsScan] Scan complete. Hosts: upliftai.org, www.upliftai.org. Findings: 0
2025-07-08 09:43:14.671	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 0 issue(s) found...
2025-07-08 09:43:14.668	
[2025-07-08T16:43:14.668Z] [tlsScan] Skipping false positive: "No SSL certificate presented" - Python validator confirmed valid certificate
2025-07-08 09:43:14.668	
[2025-07-08T16:43:14.668Z] [tlsScan] Cross-validation complete for www.upliftai.org: 0 additional findings
2025-07-08 09:43:13.618	
[2025-07-08T16:43:13.618Z] [accessibilityScan] Testing accessibility for: https://upliftai.org/homex
2025-07-08 09:43:13.515	
[2025-07-08T16:43:13.515Z] [accessibilityScan] accessibility=running_full_scan domain="upliftai.org" reason="changes_detected"
2025-07-08 09:43:13.515	
[2025-07-08T16:43:13.515Z] [accessibilityScan] accessibility=change_detected domain="upliftai.org" url="https://upliftai.org/voice-technology" reason="content_changed"
2025-07-08 09:43:13.467	
[2025-07-08T16:43:13.466Z] [dynamicBrowser] Page operation completed in 564ms
2025-07-08 09:43:12.722	
[2025-07-08T16:43:12.722Z] [dynamicBrowser] Page operation completed in 838ms
2025-07-08 09:43:11.581	
[2025-07-08T16:43:11.581Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:11.508	
[2025-07-08T16:43:11.508Z] [dynamicBrowser] Page operation completed in 7628ms
2025-07-08 09:43:11.246	
[2025-07-08T16:43:11.245Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:11.091	
[2025-07-08T16:43:11.091Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:09.980	
[2025-07-08T16:43:09.980Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:06.959	
[2025-07-08T16:43:06.958Z] [tlsScan] Python validator: www.upliftai.org - VALID
2025-07-08 09:43:06.671	
[2025-07-08T16:43:06.667Z] [tlsScan] Scanning www.upliftai.org with hybrid validation (sslscan + Python)...
2025-07-08 09:43:06.671	
[2025-07-08T16:43:06.667Z] [tlsScan] Skipping false positive: "No SSL certificate presented" - Python validator confirmed valid certificate
2025-07-08 09:43:06.671	
[2025-07-08T16:43:06.667Z] [tlsScan] Cross-validation complete for upliftai.org: 0 additional findings
2025-07-08 09:43:04.246	
[2025-07-08T16:43:04.245Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:03.839	
[2025-07-08T16:43:03.839Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-08 09:43:03.721	
[2025-07-08T16:43:03.721Z] [dynamicBrowser] Page operation completed in 1019ms
2025-07-08 09:43:03.649	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-07-08 09:43:03.646	
[2025-07-08T16:43:03.644Z] [trufflehog] Finished secret scan for upliftai.org Total secrets found: 0
2025-07-08 09:43:03.646	
[2025-07-08T16:43:03.644Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-A2OlrVX7H9E.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-A2OlrVX7H9E.json'
2025-07-08 09:43:03.642	
[2025-07-08T16:43:03.641Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-A2OlrVX7H9E.json
2025-07-08 09:43:03.642	
[2025-07-08T16:43:03.641Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-07-08 09:43:03.642	
[2025-07-08T16:43:03.640Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-07-08 09:43:03.642	
[2025-07-08T16:43:03.640Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-A2OlrVX7H9E.json'
2025-07-08 09:43:03.642	
[2025-07-08T16:43:03.640Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-A2OlrVX7H9E.json
2025-07-08 09:43:03.642	
[2025-07-08T16:43:03.640Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-07-08 09:43:03.051	
[2025-07-08T16:43:03.050Z] [documentExposure] Query 3 returned 19 results
2025-07-08 09:43:02.573	
[2025-07-08T16:43:02.572Z] [dynamicBrowser] Page operation completed in 3170ms
2025-07-08 09:43:02.353	
[2025-07-08T16:43:02.353Z] [documentExposure] Query 8 returned 8 results
2025-07-08 09:43:02.349	
[2025-07-08T16:43:02.349Z] [documentExposure] Query 9 returned 19 results
2025-07-08 09:43:02.215	
[2025-07-08T16:43:02.215Z] [documentExposure] Query 4 returned 1 results
2025-07-08 09:43:02.214	
[2025-07-08T16:43:02.214Z] [documentExposure] Query 7 returned 20 results
2025-07-08 09:43:01.263	
[2025-07-08T16:43:01.263Z] [documentExposure] Query 2 returned 20 results
2025-07-08 09:43:01.231	
[2025-07-08T16:43:01.231Z] [documentExposure] Query 1 returned 0 results
2025-07-08 09:43:01.229	
[2025-07-08T16:43:01.229Z] [documentExposure] Query 10 returned 0 results
2025-07-08 09:43:01.228	
[2025-07-08T16:43:01.228Z] [documentExposure] Query 6 returned 6 results
2025-07-08 09:43:01.227	
[2025-07-08T16:43:01.227Z] [documentExposure] Query 5 returned 2 results
2025-07-08 09:43:00.363	
[2025-07-08T16:43:00.363Z] [breachDirectoryProbe] Breach probe completed: 0 findings in 1770ms
2025-07-08 09:43:00.360	
[2025-07-08T16:43:00.360Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=0, Total=0
2025-07-08 09:43:00.360	
[2025-07-08T16:43:00.360Z] [breachDirectoryProbe] LeakCheck response for upliftai.org: 0 breached accounts, quota remaining: 999999
2025-07-08 09:43:00.352	
[2025-07-08T16:43:00.352Z] [documentExposure] Serper API call 10: ""Uplift AI" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-07-08 09:43:00.347	
[2025-07-08T16:43:00.345Z] [documentExposure] Serper API call 9: ""Uplift AI" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-07-08 09:43:00.347	
[2025-07-08T16:43:00.343Z] [documentExposure] Serper API call 8: ""Uplift AI" (intitle:"index of" OR intitle:"directory listing")"
2025-07-08 09:43:00.338	
[2025-07-08T16:43:00.338Z] [documentExposure] Serper API call 7: ""Uplift AI" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-07-08 09:43:00.334	
[2025-07-08T16:43:00.334Z] [documentExposure] Serper API call 6: ""Uplift AI" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-07-08 09:43:00.332	
[2025-07-08T16:43:00.332Z] [documentExposure] Serper API call 5: ""Uplift AI" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-07-08 09:43:00.329	
[2025-07-08T16:43:00.328Z] [documentExposure] Serper API call 4: ""Uplift AI" ("database" OR "backup" OR "dump") filetype:sql"
2025-07-08 09:43:00.326	
[2025-07-08T16:43:00.326Z] [documentExposure] Serper API call 3: ""Uplift AI" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-07-08 09:43:00.326	
[2025-07-08T16:43:00.325Z] [documentExposure] Serper API call 2: ""Uplift AI" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-07-08 09:43:00.326	
[2025-07-08T16:43:00.325Z] [documentExposure] Serper API call 1: "site:upliftai.org (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-07-08 09:43:00.326	
[2025-07-08T16:43:00.325Z] [documentExposure] Starting 10 parallel Serper queries
2025-07-08 09:43:00.062	
[2025-07-08T16:43:00.060Z] [dnstwist] ✅ Serper API: Found result for upliftai.org - "Urdu AI Early Prototype - Uplift AI..."
2025-07-08 09:42:59.899	
[2025-07-08T16:42:59.899Z] [Shodan] Done — 4 services found, 4 unique after deduplication, 4 API calls for 1 targets
2025-07-08 09:42:59.899	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 4 services found, 4 unique after deduplication...
2025-07-08 09:42:59.896	
[2025-07-08T16:42:59.896Z] [Shodan] API call 4 - search query
2025-07-08 09:42:59.774	
[2025-07-08T16:42:59.771Z] [breachDirectoryProbe] Querying LeakCheck for domain: upliftai.org
2025-07-08 09:42:59.438	
[2025-07-08T16:42:59.438Z] [spfDmarc] Completed email security scan, found 1 issues
2025-07-08 09:42:59.421	
[2025-07-08T16:42:59.421Z] [breachDirectoryProbe] Breach Directory response for upliftai.org: 0 breached accounts
2025-07-08 09:42:59.336	
[2025-07-08T16:42:59.335Z] [accessibilityScan] accessibility=hash_computation domain="upliftai.org" pages=15
2025-07-08 09:42:59.336	
[2025-07-08T16:42:59.335Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-07-08 09:42:59.305	
[2025-07-08T16:42:59.304Z] [endpointDiscovery] +crawl_link / (-)
2025-07-08 09:42:59.305	
[2025-07-08T16:42:59.304Z] [endpointDiscovery] +crawl_link /cart (-)
2025-07-08 09:42:59.279	
[2025-07-08T16:42:59.279Z] [spfDmarc] Checking for BIMI record...
2025-07-08 09:42:59.279	
[2025-07-08T16:42:59.278Z] [spfDmarc] Found DKIM record with selector: selector1
2025-07-08 09:42:59.278	
[2025-07-08T16:42:59.277Z] [Shodan] API call 3 - search query
2025-07-08 09:42:59.210	
[2025-07-08T16:42:59.210Z] [dnstwist] 🔍 Calling Serper API for upliftai.org
2025-07-08 09:42:59.210	
[2025-07-08T16:42:59.210Z] [dnstwist] Fetching original site content for AI comparison
2025-07-08 09:42:59.210	
[2025-07-08T16:42:59.210Z] [whoisWrapper] Saved $0.015 vs WhoisXML
2025-07-08 09:42:59.210	
[2025-07-08T16:42:59.210Z] [whoisWrapper] WHOIS resolution: 1 RDAP (free) + 0 Whoxy (~$0.000)
2025-07-08 09:42:59.210	
Saved $0.015 vs WhoisXML
2025-07-08 09:42:59.210	
[2025-07-08T16:42:59.210Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 0 Whoxy (~$0.000)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.187Z] [endpointDiscovery] +sitemap.xml /se-apply (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.187Z] [endpointDiscovery] +sitemap.xml /jobs (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.187Z] [endpointDiscovery] +sitemap.xml /about (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.187Z] [endpointDiscovery] +sitemap.xml /playground (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /talent (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /orator (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /home (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /preventive-health (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /agricultural-advisories (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /chatbot-privacy-policy (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /demo (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /voice-initiative (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /voice-technology (-)
2025-07-08 09:42:59.187	
[2025-07-08T16:42:59.186Z] [endpointDiscovery] +sitemap.xml /homex (-)
2025-07-08 09:42:58.911	
[2025-07-08T16:42:58.911Z] [tlsScan] Python validator: upliftai.org - VALID
2025-07-08 09:42:58.885	
[2025-07-08T16:42:58.885Z] [spfDmarc] Probing for common DKIM selectors...
2025-07-08 09:42:58.883	
[2025-07-08T16:42:58.881Z] [endpointDiscovery] +robots.txt /*&reversePaginate=* (-)
2025-07-08 09:42:58.883	
[2025-07-08T16:42:58.881Z] [endpointDiscovery] +robots.txt /*?reversePaginate=* (-)
2025-07-08 09:42:58.881	
[2025-07-08T16:42:58.881Z] [endpointDiscovery] +robots.txt /*&format=ical (-)
2025-07-08 09:42:58.881	
[2025-07-08T16:42:58.881Z] [endpointDiscovery] +robots.txt /*?format=ical (-)
2025-07-08 09:42:58.881	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*&format=json-pretty (-)
2025-07-08 09:42:58.881	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*?format=json-pretty (-)
2025-07-08 09:42:58.881	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*&format=main-content (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*?format=main-content (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*&format=page-context (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*?format=page-context (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*&format=json (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*?format=json (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*&view=* (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*?view=* (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*&month=* (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.880Z] [endpointDiscovery] +robots.txt /*?month=* (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /*&tag=* (-)
2025-07-08 09:42:58.880	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /*?tag=* (-)
2025-07-08 09:42:58.879	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /*&author=* (-)
2025-07-08 09:42:58.879	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /*?author=* (-)
2025-07-08 09:42:58.879	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /static/ (-)
2025-07-08 09:42:58.879	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /api/ui-extensions/ (-)
2025-07-08 09:42:58.879	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /api/ (-)
2025-07-08 09:42:58.879	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /commerce/digital-download/ (-)
2025-07-08 09:42:58.879	
[2025-07-08T16:42:58.879Z] [endpointDiscovery] +robots.txt /account/ (-)
2025-07-08 09:42:58.877	
[2025-07-08T16:42:58.876Z] [endpointDiscovery] +robots.txt /account$ (-)
2025-07-08 09:42:58.877	
[2025-07-08T16:42:58.876Z] [endpointDiscovery] +robots.txt /search (-)
2025-07-08 09:42:58.876	
[2025-07-08T16:42:58.876Z] [endpointDiscovery] +robots.txt /config (-)
2025-07-08 09:42:58.737	
[2025-07-08T16:42:58.737Z] [spfDmarc] Performing recursive SPF check...
2025-07-08 09:42:58.628	
[2025-07-08T16:42:58.627Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-07-08 09:42:58.612	
[2025-07-08T16:42:58.611Z] [tlsScan] Scanning upliftai.org with hybrid validation (sslscan + Python)...
2025-07-08 09:42:58.612	

2025-07-08 09:42:58.612	
OpenSSL 3.5.1 1 Jul 2025
2025-07-08 09:42:58.612	
[2025-07-08T16:42:58.611Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-07-08 09:42:58.612	
[2025-07-08T16:42:58.610Z] [worker] [A2OlrVX7H9E] WAITING for endpoint discovery to complete for dependent modules...
2025-07-08 09:42:58.612	
[2025-07-08T16:42:58.609Z] [accessibilityScan] Starting accessibility scan for domain="upliftai.org"
2025-07-08 09:42:58.609	
[2025-07-08T16:42:58.609Z] [worker] [A2OlrVX7H9E] STARTING accessibility compliance scan for upliftai.org (immediate parallel)
2025-07-08 09:42:58.608	
[2025-07-08T16:42:58.608Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-07-08 09:42:58.608	
[2025-07-08T16:42:58.608Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-07-08 09:42:58.608	
[2025-07-08T16:42:58.608Z] [trufflehog] Starting targeted secret scan for domain: upliftai.org
2025-07-08 09:42:58.608	
[2025-07-08T16:42:58.608Z] [worker] [A2OlrVX7H9E] STARTING TruffleHog secret scan for upliftai.org (immediate parallel)
2025-07-08 09:42:58.603	
[2025-07-08T16:42:58.601Z] [spfDmarc] Checking DMARC record...
2025-07-08 09:42:58.603	
[2025-07-08T16:42:58.601Z] [spfDmarc] Starting email security scan for upliftai.org
2025-07-08 09:42:58.603	
[2025-07-08T16:42:58.600Z] [worker] [A2OlrVX7H9E] STARTING SPF/DMARC email security scan for upliftai.org (immediate parallel)
2025-07-08 09:42:58.596	
[2025-07-08T16:42:58.596Z] [worker] [A2OlrVX7H9E] STARTING TLS security scan for upliftai.org (immediate parallel)
2025-07-08 09:42:58.596	
[2025-07-08T16:42:58.595Z] [endpointDiscovery] ⇢ start upliftai.org
2025-07-08 09:42:58.596	
[2025-07-08T16:42:58.595Z] [worker] [A2OlrVX7H9E] STARTING endpoint discovery for upliftai.org (immediate parallel)
2025-07-08 09:42:58.596	
[2025-07-08T16:42:58.595Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-07-08 09:42:58.595	
[2025-07-08T16:42:58.595Z] [worker] [A2OlrVX7H9E] STARTING document exposure scan for Uplift AI (immediate parallel)
2025-07-08 09:42:58.595	
[2025-07-08T16:42:58.595Z] [dnstwist] Using hybrid RDAP+Whoxy resolver (87% cheaper than WhoisXML) for original domain: upliftai.org
2025-07-08 09:42:58.595	
[2025-07-08T16:42:58.595Z] [dnstwist] Starting typosquat scan for upliftai.org
2025-07-08 09:42:58.595	
[2025-07-08T16:42:58.595Z] [worker] [A2OlrVX7H9E] STARTING DNS Twist scan for upliftai.org (immediate parallel)
2025-07-08 09:42:58.595	
[2025-07-08T16:42:58.595Z] [Shodan] Start scan for upliftai.org
2025-07-08 09:42:58.595	
[2025-07-08T16:42:58.594Z] [worker] [A2OlrVX7H9E] STARTING Shodan intelligence scan for upliftai.org (immediate parallel)
2025-07-08 09:42:58.593	
[2025-07-08T16:42:58.593Z] [breachDirectoryProbe] Querying Breach Directory for domain: upliftai.org
2025-07-08 09:42:58.593	
[2025-07-08T16:42:58.593Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="upliftai.org" (BreachDirectory + LeakCheck)
2025-07-08 09:42:58.593	
[2025-07-08T16:42:58.593Z] [worker] [A2OlrVX7H9E] STARTING Breach Directory intelligence probe for upliftai.org (immediate parallel)
2025-07-08 09:42:58.593	
[queue] Updated job A2OlrVX7H9E status: processing - Comprehensive security discovery in progress...
2025-07-08 09:42:58.461	
[2025-07-08T16:42:58.461Z] [worker] [A2OlrVX7H9E] 🎯 Using TIER_1 tier with 12 modules: dns_twist, document_exposure, shodan, breach_directory_probe, endpoint_discovery, tech_stack_scan, abuse_intel_scan, accessibility_scan, nuclei, tls_scan, spf_dmarc, trufflehog
2025-07-08 09:42:58.461	
[2025-07-08T16:42:58.461Z] [worker] Processing comprehensive security scan for Uplift AI (upliftai.org)
2025-07-08 09:42:58.461	
[2025-07-08T16:42:58.461Z] [worker] ✅ JOB PICKED UP: Processing scan job A2OlrVX7H9E for Uplift AI (upliftai.org)
2025-07-08 09:42:58.461	
[2025-07-08T16:42:58.461Z] [worker] Processing scan job: A2OlrVX7H9E
2025-07-08 09:42:58.461	
[queue] Job A2OlrVX7H9E successfully retrieved by worker 286565eb5406d8
2025-07-08 09:42:58.461	
}
2025-07-08 09:42:58.461	
createdAt: '2025-07-08T15:25:30.835Z'
2025-07-08 09:42:58.461	
originalDomain: 'upliftai.org',
2025-07-08 09:42:58.461	
domain: 'upliftai.org',
2025-07-08 09:42:58.461	
companyName: 'Uplift AI',
2025-07-08 09:42:58.461	
id: 'A2OlrVX7H9E',
2025-07-08 09:42:58.461	
[queue] Parsed job: {
2025-07-08 09:42:58.461	
[queue] Job string to parse: {"id":"A2OlrVX7H9E","companyName":"Uplift AI","domain":"upliftai.org","originalDomain":"upliftai.org","createdAt":"2025-07-08T15:25:30.835Z"}
2025-07-08 09:42:58.461	
} Type: object
2025-07-08 09:42:58.461	
createdAt: '2025-07-08T15:25:30.835Z'
2025-07-08 09:42:58.461	
originalDomain: 'upliftai.org',
2025-07-08 09:42:58.461	
domain: 'upliftai.org',
2025-07-08 09:42:58.461	
companyName: 'Uplift AI',
2025-07-08 09:42:58.461	
id: 'A2OlrVX7H9E',
2025-07-08 09:42:58.461	
[queue] Raw job data from Redis: {
2025-07-08 09:42:58.073	
[2025-07-08T16:42:58.073Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Nox Metals: 2 verified findings, 11 artifacts across 12 security modules
2025-07-08 09:42:58.073	
[queue] Updated job 2PgGZQ3Q9tu status: done - Comprehensive security scan completed - 2 verified findings across 12 security modules. Findings ready for processing.
2025-07-08 09:42:57.692	
[2025-07-08T16:42:57.692Z] [worker] [updateScanMasterStatus] Updated scan 2PgGZQ3Q9tu with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-07-08 09:42:57.683	
[2025-07-08T16:42:57.683Z] [worker] [processScan] Counted 11 artifacts for scan 2PgGZQ3Q9tu
2025-07-08 09:42:57.681	
[2025-07-08T16:42:57.681Z] [worker] [2PgGZQ3Q9tu] COMPLETED abuse_intel_scan scan: 0 findings found
2025-07-08 09:42:57.681	
[2025-07-08T16:42:57.681Z] [worker] [2PgGZQ3Q9tu] WAITING for abuse_intel_scan scan to complete...
2025-07-08 09:42:57.681	
[2025-07-08T16:42:57.681Z] [worker] [2PgGZQ3Q9tu] COMPLETED tech_stack_scan scan: 2 findings found
2025-07-08 09:42:57.681	
[2025-07-08T16:42:57.681Z] [worker] [2PgGZQ3Q9tu] WAITING for tech_stack_scan scan to complete...
2025-07-08 09:42:57.681	
[2025-07-08T16:42:57.681Z] [worker] [2PgGZQ3Q9tu] COMPLETED nuclei scan: 0 findings found
2025-07-08 09:42:57.681	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-07-08 09:42:57.660	
[2025-07-08T16:42:57.660Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-07-08 09:42:57.660	
[2025-07-08T16:42:57.660Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-07-08 09:42:57.660	
[2025-07-08T16:42:57.660Z] [nuclei] [Two-Pass Scan] No findings for https://noxmetals.co
2025-07-08 09:42:57.660	
[2025-07-08T16:42:57.660Z] [nucleiWrapper] Two-pass scan completed: 0 findings persisted as artifacts (baseline: 0, common+tech: 0)
2025-07-08 09:42:57.660	
[2025-07-08T16:42:57.660Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:42:57.653	
[2025-07-08T16:42:57.652Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-08 09:42:37.647	
[2025-07-08T16:42:37.646Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-08 09:42:37.647	
[2025-07-08T16:42:37.646Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:42:37.643	
[2025-07-08T16:42:37.643Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://noxmetals.co -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 1
2025-07-08 09:42:37.643	
[2025-07-08T16:42:37.643Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-08 09:42:37.643	
[2025-07-08T16:42:37.642Z] [nucleiWrapper] Detected technologies: none
2025-07-08 09:42:37.643	
[2025-07-08T16:42:37.642Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:42:37.636	
[2025-07-08T16:42:37.635Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-08 09:42:20.152	
[2025-07-08T16:42:20.152Z] [techStackScan] techstack=complete arts=2 time=2634ms
2025-07-08 09:42:20.145	
[2025-07-08T16:42:20.145Z] [techStackScan] techstack=sbom_generated components=2 vulnerabilities=0 critical=0
2025-07-08 09:42:20.145	
[2025-07-08T16:42:20.145Z] [sbomGenerator] SBOM generated: 2 components, 0 vulnerabilities
2025-07-08 09:42:20.145	
[2025-07-08T16:42:20.145Z] [sbomGenerator] Generating SBOM for noxmetals.co with 2 components
2025-07-08 09:42:20.145	
[2025-07-08T16:42:20.144Z] [osvIntegration] No components suitable for OSV.dev queries
2025-07-08 09:42:20.145	
[2025-07-08T16:42:20.144Z] [techStackScan] techstack=osv_enhancement starting OSV.dev integration for 2 components
2025-07-08 09:42:20.145	
[2025-07-08T16:42:20.144Z] [versionMatcher] Batch vulnerability analysis completed: 0 vulnerabilities across 2 components in 7ms
2025-07-08 09:42:20.145	
[2025-07-08T16:42:20.144Z] [versionMatcher] Vulnerability matching completed for Security Headers: 0 matches in 7ms
2025-07-08 09:42:20.144	
[2025-07-08T16:42:20.144Z] [nvdMirror] Local CVE query completed: 0 results in 4ms
2025-07-08 09:42:20.144	
extra argument: "DISTINCT"
2025-07-08 09:42:20.144	
JOIN cpe_matches cm ON v.cve_id = cm.cve_id WHERE cm.cpe_uri LIKE '%:security:Security Headers:%' AND cm.vulnerable = 1 ORDER BY v.cvss_v3_score DESC, v.published_date DESC LIMIT 100
2025-07-08 09:42:20.144	
FROM vulnerabilities v
2025-07-08 09:42:20.144	
v.severity, v.cisa_kev, v.epss_score, v.references_json
2025-07-08 09:42:20.144	
v.cvss_v3_score, v.cvss_v3_vector, v.cvss_v2_score, v.cvss_v2_vector,
2025-07-08 09:42:20.144	
SELECT DISTINCT v.cve_id, v.description, v.published_date, v.last_modified_date,
2025-07-08 09:42:20.144	
[2025-07-08T16:42:20.144Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:42:20.144	
extra argument: "DISTINCT"
2025-07-08 09:42:20.144	
JOIN cpe_matches cm ON v.cve_id = cm.cve_id WHERE cm.cpe_uri LIKE '%:security:Security Headers:%' AND cm.vulnerable = 1 ORDER BY v.cvss_v3_score DESC, v.published_date DESC LIMIT 100
2025-07-08 09:42:20.144	
FROM vulnerabilities v
2025-07-08 09:42:20.144	
v.severity, v.cisa_kev, v.epss_score, v.references_json
2025-07-08 09:42:20.144	
v.cvss_v3_score, v.cvss_v3_vector, v.cvss_v2_score, v.cvss_v2_vector,
2025-07-08 09:42:20.144	
SELECT DISTINCT v.cve_id, v.description, v.published_date, v.last_modified_date,
2025-07-08 09:42:20.144	
[2025-07-08T16:42:20.144Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:42:20.144	
[2025-07-08T16:42:20.144Z] [versionMatcher] Vulnerability matching completed for Cloudflare: 0 matches in 7ms
2025-07-08 09:42:20.144	
[2025-07-08T16:42:20.144Z] [nvdMirror] Local CVE query completed: 0 results in 7ms
2025-07-08 09:42:20.144	
extra argument: "DISTINCT"
2025-07-08 09:42:20.144	
JOIN cpe_matches cm ON v.cve_id = cm.cve_id WHERE cm.cpe_uri LIKE '%:cloudflare:Cloudflare:%' AND cm.vulnerable = 1 ORDER BY v.cvss_v3_score DESC, v.published_date DESC LIMIT 100
2025-07-08 09:42:20.144	
FROM vulnerabilities v
2025-07-08 09:42:20.144	
v.severity, v.cisa_kev, v.epss_score, v.references_json
2025-07-08 09:42:20.144	
v.cvss_v3_score, v.cvss_v3_vector, v.cvss_v2_score, v.cvss_v2_vector,
2025-07-08 09:42:20.144	
SELECT DISTINCT v.cve_id, v.description, v.published_date, v.last_modified_date,
2025-07-08 09:42:20.144	
[2025-07-08T16:42:20.144Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:42:20.144	
extra argument: "DISTINCT"
2025-07-08 09:42:20.144	
JOIN cpe_matches cm ON v.cve_id = cm.cve_id WHERE cm.cpe_uri LIKE '%:cloudflare:Cloudflare:%' AND cm.vulnerable = 1 ORDER BY v.cvss_v3_score DESC, v.published_date DESC LIMIT 100
2025-07-08 09:42:20.144	
FROM vulnerabilities v
2025-07-08 09:42:20.144	
v.severity, v.cisa_kev, v.epss_score, v.references_json
2025-07-08 09:42:20.144	
v.cvss_v3_score, v.cvss_v3_vector, v.cvss_v2_score, v.cvss_v2_vector,
2025-07-08 09:42:20.144	
SELECT DISTINCT v.cve_id, v.description, v.published_date, v.last_modified_date,
2025-07-08 09:42:20.144	
[2025-07-08T16:42:20.144Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:42:20.137	
[2025-07-08T16:42:20.137Z] [versionMatcher] Finding vulnerabilities for Security Headers@unknown
2025-07-08 09:42:20.137	
[2025-07-08T16:42:20.137Z] [versionMatcher] Finding vulnerabilities for Cloudflare@unknown
2025-07-08 09:42:20.137	
[2025-07-08T16:42:20.137Z] [versionMatcher] Starting batch vulnerability analysis for 2 components
2025-07-08 09:42:20.137	
[2025-07-08T16:42:20.137Z] [cpeNormalization] normalized tech="Security Headers" version="undefined" cpe="undefined" purl="undefined" confidence=70
2025-07-08 09:42:20.137	
[2025-07-08T16:42:20.137Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:20.137	
[2025-07-08T16:42:20.137Z] [techStackScan] techstack=vuln_analysis starting enhanced vulnerability analysis for 2 technologies
2025-07-08 09:42:20.137	
[2025-07-08T16:42:20.136Z] [techStackScan] analysis=stats tech="Security Headers" version="undefined" raw=0 enriched=0 merged=0 filtered=0
2025-07-08 09:42:20.137	
[2025-07-08T16:42:20.136Z] [techStackScan] analysis=stats tech="Cloudflare" version="undefined" raw=0 enriched=0 merged=0 filtered=0
2025-07-08 09:42:20.136	
[2025-07-08T16:42:20.135Z] [techStackScan] techstack=fast_detection_complete total_techs=2 total_duration=0ms avg_per_url=0ms
2025-07-08 09:42:20.135	
[2025-07-08T16:42:20.135Z] [faviconDetection] Batch favicon detection completed: 0 technologies detected across 3 URLs in 750ms
2025-07-08 09:42:20.135	
[2025-07-08T16:42:20.135Z] [faviconDetection] No favicon found for https://www.noxmetals.co
2025-07-08 09:42:20.135	
[2025-07-08T16:42:20.135Z] [faviconDetection] Failed to fetch favicon from https://www.noxmetals.co/apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-08 09:42:19.901	
[2025-07-08T16:42:19.901Z] [faviconDetection] Fetching favicon from https://www.noxmetals.co/apple-touch-icon-precomposed.png
2025-07-08 09:42:19.901	
[2025-07-08T16:42:19.901Z] [faviconDetection] Failed to fetch favicon from https://www.noxmetals.co/apple-touch-icon.png: Request failed with status code 404
2025-07-08 09:42:19.698	
[2025-07-08T16:42:19.698Z] [faviconDetection] Fetching favicon from https://www.noxmetals.co/apple-touch-icon.png
2025-07-08 09:42:19.698	
[2025-07-08T16:42:19.698Z] [faviconDetection] Failed to fetch favicon from https://www.noxmetals.co/favicon.png: Request failed with status code 404
2025-07-08 09:42:19.469	
[2025-07-08T16:42:19.469Z] [faviconDetection] No favicon found for https://noxmetals.co
2025-07-08 09:42:19.469	
[2025-07-08T16:42:19.469Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co/apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-08 09:42:19.464	
[2025-07-08T16:42:19.464Z] [faviconDetection] No favicon found for https://noxmetals.co/
2025-07-08 09:42:19.464	
[2025-07-08T16:42:19.464Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co//apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-08 09:42:19.448	
[2025-07-08T16:42:19.447Z] [faviconDetection] Fetching favicon from https://noxmetals.co//apple-touch-icon-precomposed.png
2025-07-08 09:42:19.448	
[2025-07-08T16:42:19.447Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co//apple-touch-icon.png: Request failed with status code 404
2025-07-08 09:42:19.447	
[2025-07-08T16:42:19.447Z] [faviconDetection] Fetching favicon from https://noxmetals.co/apple-touch-icon-precomposed.png
2025-07-08 09:42:19.447	
[2025-07-08T16:42:19.446Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co/apple-touch-icon.png: Request failed with status code 404
2025-07-08 09:42:19.431	
[2025-07-08T16:42:19.431Z] [faviconDetection] Fetching favicon from https://noxmetals.co//apple-touch-icon.png
2025-07-08 09:42:19.431	
[2025-07-08T16:42:19.431Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co//favicon.png: Request failed with status code 404
2025-07-08 09:42:19.427	
[2025-07-08T16:42:19.427Z] [faviconDetection] Fetching favicon from https://noxmetals.co/apple-touch-icon.png
2025-07-08 09:42:19.427	
[2025-07-08T16:42:19.426Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co/favicon.png: Request failed with status code 404
2025-07-08 09:42:19.413	
[2025-07-08T16:42:19.413Z] [faviconDetection] Fetching favicon from https://www.noxmetals.co/favicon.png
2025-07-08 09:42:19.413	
[2025-07-08T16:42:19.413Z] [faviconDetection] Failed to fetch favicon from https://www.noxmetals.co/favicon.ico: Request failed with status code 404
2025-07-08 09:42:19.410	
[2025-07-08T16:42:19.410Z] [faviconDetection] Fetching favicon from https://noxmetals.co/favicon.png
2025-07-08 09:42:19.410	
[2025-07-08T16:42:19.410Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co/favicon.ico: Request failed with status code 404
2025-07-08 09:42:19.408	
[2025-07-08T16:42:19.408Z] [faviconDetection] Fetching favicon from https://noxmetals.co//favicon.png
2025-07-08 09:42:19.408	
[2025-07-08T16:42:19.408Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co//favicon.ico: Request failed with status code 404
2025-07-08 09:42:19.390	
[2025-07-08T16:42:19.390Z] [faviconDetection] Fetching favicon from https://noxmetals.co//favicon.ico
2025-07-08 09:42:19.390	
[2025-07-08T16:42:19.390Z] [faviconDetection] Starting favicon-based tech detection for https://noxmetals.co/
2025-07-08 09:42:19.388	
[2025-07-08T16:42:19.387Z] [faviconDetection] Fetching favicon from https://www.noxmetals.co/favicon.ico
2025-07-08 09:42:19.388	
[2025-07-08T16:42:19.387Z] [faviconDetection] Starting favicon-based tech detection for https://www.noxmetals.co
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.385Z] [faviconDetection] Fetching favicon from https://noxmetals.co/favicon.ico
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.385Z] [faviconDetection] Starting favicon-based tech detection for https://noxmetals.co
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.385Z] [faviconDetection] Starting batch favicon detection for 3 URLs
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.385Z] [techStackScan] techstack=favicon_detection starting favicon analysis for 3 URLs
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.385Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.385Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.385Z] [techStackScan] techstack=webtech_success url="https://noxmetals.co/wordpress" techs=2 duration=0ms
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.385Z] [cpeNormalization] normalized tech="Security Headers" version="undefined" cpe="undefined" purl="undefined" confidence=70
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.384Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.385	
[2025-07-08T16:42:19.384Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [techStackScan] techstack=webtech_success url="https://noxmetals.co/cdn-cgi/l/email-protection" techs=3 duration=0ms
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [techStackScan] techstack=webtech_success url="https://noxmetals.co/" techs=2 duration=0ms
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [techStackScan] techstack=webtech_success url="https://www.noxmetals.co" techs=2 duration=0ms
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [techStackScan] techstack=webtech_success url="https://noxmetals.co" techs=2 duration=0ms
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [fastTechDetection] Batch fast tech detection completed: 11 techs across 5 URLs in 519ms
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [fastTechDetection] Header detection found 2 techs, skipping WebTech for https://www.noxmetals.co
2025-07-08 09:42:19.384	
[2025-07-08T16:42:19.384Z] [fastTechDetection] Header detection found 2 technologies for https://www.noxmetals.co
2025-07-08 09:42:19.166	
[2025-07-08T16:42:19.166Z] [fastTechDetection] Header detection found 2 techs, skipping WebTech for https://noxmetals.co/
2025-07-08 09:42:19.166	
[2025-07-08T16:42:19.166Z] [fastTechDetection] Header detection found 2 technologies for https://noxmetals.co/
2025-07-08 09:42:19.156	
[2025-07-08T16:42:19.156Z] [fastTechDetection] Header detection found 2 techs, skipping WebTech for https://noxmetals.co
2025-07-08 09:42:19.156	
[2025-07-08T16:42:19.156Z] [fastTechDetection] Header detection found 2 technologies for https://noxmetals.co
2025-07-08 09:42:18.902	
[2025-07-08T16:42:18.902Z] [fastTechDetection] Header detection found 3 techs, skipping WebTech for https://noxmetals.co/cdn-cgi/l/email-protection
2025-07-08 09:42:18.902	
[2025-07-08T16:42:18.902Z] [fastTechDetection] Header detection found 3 technologies for https://noxmetals.co/cdn-cgi/l/email-protection
2025-07-08 09:42:18.902	
[2025-07-08T16:42:18.901Z] [fastTechDetection] Header detection found 2 techs, skipping WebTech for https://noxmetals.co/wordpress
2025-07-08 09:42:18.902	
[2025-07-08T16:42:18.901Z] [fastTechDetection] Header detection found 2 technologies for https://noxmetals.co/wordpress
2025-07-08 09:42:18.876	
[2025-07-08T16:42:18.876Z] [fastTechDetection] Checking headers for quick tech detection: https://noxmetals.co/wordpress
2025-07-08 09:42:18.874	
[2025-07-08T16:42:18.874Z] [fastTechDetection] Checking headers for quick tech detection: https://noxmetals.co/cdn-cgi/l/email-protection
2025-07-08 09:42:18.871	
[2025-07-08T16:42:18.871Z] [fastTechDetection] Checking headers for quick tech detection: https://noxmetals.co/
2025-07-08 09:42:18.868	
[2025-07-08T16:42:18.868Z] [fastTechDetection] Checking headers for quick tech detection: https://www.noxmetals.co
2025-07-08 09:42:18.865	
[2025-07-08T16:42:18.865Z] [fastTechDetection] Checking headers for quick tech detection: https://noxmetals.co
2025-07-08 09:42:18.865	
[2025-07-08T16:42:18.865Z] [fastTechDetection] Starting batch fast tech detection for 5 URLs
2025-07-08 09:42:18.865	
[2025-07-08T16:42:18.865Z] [techStackScan] techstack=fast_detection starting WebTech scan for 7 targets
2025-07-08 09:42:18.865	
[2025-07-08T16:42:18.865Z] [techStackScan] techstack=bypass_nuclei targets=[https://www.google-analytics.com] (~2min time savings by skipping expensive non-HTML assets)
2025-07-08 09:42:18.864	
[2025-07-08T16:42:18.864Z] [techStackScan] techstack=targets primary=5 thirdParty=3 total=8 html=7 finalHtml=7 nonHtml=1 skipped=0
2025-07-08 09:42:18.832	
[2025-07-08T16:42:18.831Z] [dynamicBrowser] Page operation completed in 1060ms
2025-07-08 09:42:18.832	
[2025-07-08T16:42:18.831Z] [techStackScan] thirdParty=discovered domain=noxmetals.co total=3 (html=2, nonHtml=1)
2025-07-08 09:42:17.640	
[2025-07-08T16:42:17.640Z] [techStackScan] buildTargets discovered=3 total=5 (html=5, nonHtml=0)
2025-07-08 09:42:17.636	
[2025-07-08T16:42:17.635Z] [techStackScan] techstack=nuclei wrapper confirmed available
2025-07-08 09:42:17.635	
[2025-07-08T16:42:17.635Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:42:17.635	
[INF] PDCP Directory: /root/.pdcp
2025-07-08 09:42:17.635	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-08 09:42:17.635	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-08 09:42:17.635	
[2025-07-08T16:42:17.635Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-08 09:42:17.635	
[2025-07-08T16:42:17.635Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-08 09:42:17.635	
[2025-07-08T16:42:17.635Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:42:17.630	
[2025-07-08T16:42:17.630Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://noxmetals.co -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 1
2025-07-08 09:42:17.630	
[2025-07-08T16:42:17.630Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-08 09:42:17.630	
[2025-07-08T16:42:17.629Z] [nucleiWrapper] Starting two-pass scan for https://noxmetals.co
2025-07-08 09:42:17.629	
[2025-07-08T16:42:17.629Z] [nuclei] Smart guard: techs=none timeout=20s headless=false
2025-07-08 09:42:17.629	
[2025-07-08T16:42:17.629Z] [nuclei] [Enhanced Two-Pass Scan] Running on https://noxmetals.co
2025-07-08 09:42:17.629	
[2025-07-08T16:42:17.629Z] [nuclei] --- Starting Enhanced Two-Pass Scans on 1 targets ---
2025-07-08 09:42:17.629	
[2025-07-08T16:42:17.629Z] [nuclei] Nuclei binary validated successfully.
2025-07-08 09:42:17.629	
[2025-07-08T16:42:17.629Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:42:17.629	
[INF] PDCP Directory: /root/.pdcp
2025-07-08 09:42:17.629	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-08 09:42:17.629	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-08 09:42:17.629	
[2025-07-08T16:42:17.628Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-08 09:42:17.526	
[2025-07-08T16:42:17.526Z] [abuseIntelScan] No IP artifacts found for this scan
2025-07-08 09:42:17.526	
[2025-07-08T16:42:17.526Z] [abuseIntelScan] Found 0 IP artifacts for scan 2PgGZQ3Q9tu
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for nuclei scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] COMPLETED accessibility_scan scan: 0 findings found
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for accessibility_scan scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] COMPLETED trufflehog scan: 0 findings found
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for trufflehog scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] COMPLETED spf_dmarc scan: 2 findings found
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for spf_dmarc scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] COMPLETED tls_scan scan: 0 findings found
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for tls_scan scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] COMPLETED document_exposure scan: 0 findings found
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for document_exposure scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] COMPLETED dns_twist scan: 0 findings found
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for dns_twist scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] COMPLETED shodan scan: 0 findings found
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for shodan scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] COMPLETED breach_directory_probe scan: 0 findings found
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] WAITING for breach_directory_probe scan to complete...
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=2PgGZQ3Q9tu
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [worker] [2PgGZQ3Q9tu] STARTING AbuseIPDB intelligence scan for IPs (parallel after endpoint discovery)
2025-07-08 09:42:17.524	
[2025-07-08T16:42:17.523Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:42:17.520	
[2025-07-08T16:42:17.518Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-08 09:42:17.520	
[2025-07-08T16:42:17.518Z] [techStackScan] techstack=start domain=noxmetals.co
2025-07-08 09:42:17.520	
[2025-07-08T16:42:17.518Z] [worker] [2PgGZQ3Q9tu] STARTING tech stack scan for noxmetals.co (parallel after endpoint discovery)
2025-07-08 09:42:17.520	
[2025-07-08T16:42:17.518Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:42:17.514	
[2025-07-08T16:42:17.514Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-08 09:42:17.514	
[2025-07-08T16:42:17.514Z] [nuclei] Starting enhanced vulnerability scan for noxmetals.co
2025-07-08 09:42:17.514	
[2025-07-08T16:42:17.514Z] [worker] [2PgGZQ3Q9tu] STARTING Nuclei vulnerability scan for noxmetals.co (parallel after endpoint discovery)
2025-07-08 09:42:17.514	
[2025-07-08T16:42:17.514Z] [worker] [2PgGZQ3Q9tu] COMPLETED endpoint discovery: 3 endpoint collections found
2025-07-08 09:42:17.514	
[2025-07-08T16:42:17.514Z] [endpointDiscovery] ⇢ done – 3 endpoints
2025-07-08 09:42:15.008	
[2025-07-08T16:42:15.008Z] [endpointDiscovery] +wordlist_enum /wordpress (403)
2025-07-08 09:42:02.751	
[2025-07-08T16:42:02.751Z] [dnstwist] Scan completed – 0 domains analysed
2025-07-08 09:42:02.751	
[2025-07-08T16:42:02.751Z] [dnstwist] Found 0 registered typosquat candidates to analyze
2025-07-08 09:41:56.734	
{
  "level": 30,
  "time": 1751992916734,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-h",
  "res": {
    "statusCode": 404
  },
  "responseTime": 2.5104720001108944,
  "msg": "request completed"
}
2025-07-08 09:41:56.734	
[2025-07-08T16:41:56.733Z] [api] Found 0 artifacts for scan HxOv8V2c7Pr
2025-07-08 09:41:56.732	
[2025-07-08T16:41:56.731Z] [api] Retrieving artifacts for scan: HxOv8V2c7Pr
2025-07-08 09:41:56.732	
{
  "level": 30,
  "time": 1751992916731,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-h",
  "req": {
    "method": "GET",
    "url": "/scan/HxOv8V2c7Pr/artifacts",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 54870
  },
  "msg": "incoming request"
}
2025-07-08 09:41:52.810	
{
  "level": 30,
  "time": 1751992912810,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-g",
  "res": {
    "statusCode": 404
  },
  "responseTime": 2.642562000080943,
  "msg": "request completed"
}
2025-07-08 09:41:52.810	
[2025-07-08T16:41:52.810Z] [api] Found 0 artifacts for scan Y_JYyek5sSb
2025-07-08 09:41:52.808	
[2025-07-08T16:41:52.807Z] [api] Retrieving artifacts for scan: Y_JYyek5sSb
2025-07-08 09:41:52.807	
{
  "level": 30,
  "time": 1751992912807,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-g",
  "req": {
    "method": "GET",
    "url": "/scan/Y_JYyek5sSb/artifacts",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 42034
  },
  "msg": "incoming request"
}
2025-07-08 09:41:48.124	
}
2025-07-08 09:41:48.124	
"EMAIL_SECURITY_GAP": 2
2025-07-08 09:41:48.124	
[2025-07-08T16:41:48.124Z] [SyncWorker] ✅ New findings synced: 2 {
2025-07-08 09:41:45.343	
{
  "level": 30,
  "time": 1751992905342,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-f",
  "res": {
    "statusCode": 404
  },
  "responseTime": 3.1749120000749826,
  "msg": "request completed"
}
2025-07-08 09:41:45.342	
[2025-07-08T16:41:45.342Z] [api] Found 0 artifacts for scan DgkbPrPLxl2
2025-07-08 09:41:45.340	
[2025-07-08T16:41:45.339Z] [api] Retrieving artifacts for scan: DgkbPrPLxl2
2025-07-08 09:41:45.339	
{
  "level": 30,
  "time": 1751992905339,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-f",
  "req": {
    "method": "GET",
    "url": "/scan/DgkbPrPLxl2/artifacts",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 63894
  },
  "msg": "incoming request"
}
2025-07-08 09:41:44.523	
[2025-07-08T16:41:44.523Z] [accessibilityScan] accessibility=skipped domain="noxmetals.co" reason="no_changes_detected"
2025-07-08 09:41:44.523	
[2025-07-08T16:41:44.523Z] [accessibilityScan] accessibility=no_change_detected domain="noxmetals.co" pages=5
2025-07-08 09:41:44.504	
[2025-07-08T16:41:44.504Z] [dynamicBrowser] Page operation completed in 128ms
2025-07-08 09:41:44.247	
[2025-07-08T16:41:44.246Z] [dynamicBrowser] Page operation completed in 389ms
2025-07-08 09:41:43.695	
[2025-07-08T16:41:43.695Z] [dnstwist] ✅ Serper API: Found result for noxmetals.co - "NOX METALS..."
2025-07-08 09:41:43.680	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-07-08 09:41:43.678	
[2025-07-08T16:41:43.677Z] [documentExposure] Completed: 0 files found, 10 parallel Serper calls (~$0.030)
2025-07-08 09:41:43.644	
[2025-07-08T16:41:43.644Z] [dynamicBrowser] Page operation completed in 469ms
2025-07-08 09:41:43.592	
[2025-07-08T16:41:43.592Z] [documentExposure] Query 6 returned 0 results
2025-07-08 09:41:43.582	
[2025-07-08T16:41:43.581Z] [documentExposure] Query 3 returned 19 results
2025-07-08 09:41:43.511	
[2025-07-08T16:41:43.511Z] [documentExposure] Query 2 returned 19 results
2025-07-08 09:41:43.474	
[2025-07-08T16:41:43.474Z] [documentExposure] Query 7 returned 20 results
2025-07-08 09:41:43.399	
[2025-07-08T16:41:43.399Z] [documentExposure] Query 8 returned 7 results
2025-07-08 09:41:43.285	
[2025-07-08T16:41:43.285Z] [documentExposure] Query 4 returned 3 results
2025-07-08 09:41:43.223	
[2025-07-08T16:41:43.223Z] [documentExposure] Query 9 returned 8 results
2025-07-08 09:41:43.084	
[2025-07-08T16:41:43.083Z] [documentExposure] Query 10 returned 0 results
2025-07-08 09:41:43.070	
[2025-07-08T16:41:43.070Z] [dynamicBrowser] Page operation completed in 252ms
2025-07-08 09:41:43.023	
[2025-07-08T16:41:43.023Z] [documentExposure] Query 5 returned 1 results
2025-07-08 09:41:42.995	
[2025-07-08T16:41:42.995Z] [documentExposure] Query 1 returned 0 results
2025-07-08 09:41:42.706	
[2025-07-08T16:41:42.706Z] [breachDirectoryProbe] Breach probe completed: 0 findings in 2323ms
2025-07-08 09:41:42.704	
[2025-07-08T16:41:42.704Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=0, Total=0
2025-07-08 09:41:42.704	
[2025-07-08T16:41:42.703Z] [breachDirectoryProbe] LeakCheck response for noxmetals.co: 0 breached accounts, quota remaining: 999999
2025-07-08 09:41:42.663	
[2025-07-08T16:41:42.662Z] [dynamicBrowser] Page operation completed in 433ms
2025-07-08 09:41:42.184	
[2025-07-08T16:41:42.183Z] [documentExposure] Serper API call 10: ""Nox Metals" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-07-08 09:41:42.181	
[2025-07-08T16:41:42.181Z] [documentExposure] Serper API call 9: ""Nox Metals" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-07-08 09:41:42.179	
[2025-07-08T16:41:42.178Z] [documentExposure] Serper API call 8: ""Nox Metals" (intitle:"index of" OR intitle:"directory listing")"
2025-07-08 09:41:42.176	
[2025-07-08T16:41:42.176Z] [documentExposure] Serper API call 7: ""Nox Metals" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-07-08 09:41:42.174	
[2025-07-08T16:41:42.173Z] [documentExposure] Serper API call 6: ""Nox Metals" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-07-08 09:41:42.170	
[2025-07-08T16:41:42.170Z] [documentExposure] Serper API call 5: ""Nox Metals" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-07-08 09:41:42.169	
[2025-07-08T16:41:42.167Z] [documentExposure] Serper API call 4: ""Nox Metals" ("database" OR "backup" OR "dump") filetype:sql"
2025-07-08 09:41:42.169	
[2025-07-08T16:41:42.165Z] [documentExposure] Serper API call 3: ""Nox Metals" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-07-08 09:41:42.169	
[2025-07-08T16:41:42.163Z] [documentExposure] Serper API call 2: ""Nox Metals" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-07-08 09:41:42.169	
[2025-07-08T16:41:42.161Z] [documentExposure] Serper API call 1: "site:noxmetals.co (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-07-08 09:41:42.168	
[2025-07-08T16:41:42.161Z] [documentExposure] Starting 10 parallel Serper queries
2025-07-08 09:41:42.146	
[2025-07-08T16:41:42.146Z] [dnstwist] 🔍 Calling Serper API for noxmetals.co
2025-07-08 09:41:42.146	
[2025-07-08T16:41:42.146Z] [dnstwist] Fetching original site content for AI comparison
2025-07-08 09:41:42.134	
[2025-07-08T16:41:42.133Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-08 09:41:42.134	
[2025-07-08T16:41:42.133Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-08 09:41:42.134	
Saved $0.028 vs WhoisXML
2025-07-08 09:41:42.134	
[2025-07-08T16:41:42.132Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-08 09:41:42.126	
[2025-07-08T16:41:42.126Z] [tlsScan] Scan complete. Hosts: noxmetals.co, www.noxmetals.co. Findings: 0
2025-07-08 09:41:42.126	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 0 issue(s) found...
2025-07-08 09:41:41.910	
[2025-07-08T16:41:41.910Z] [tlsScan] Skipping false positive: "No SSL certificate presented" - Python validator confirmed valid certificate
2025-07-08 09:41:41.910	
[2025-07-08T16:41:41.910Z] [tlsScan] Cross-validation complete for www.noxmetals.co: 0 additional findings
2025-07-08 09:41:41.910	
[2025-07-08T16:41:41.909Z] [tlsScan] Python validator: www.noxmetals.co - VALID
2025-07-08 09:41:41.890	
[2025-07-08T16:41:41.890Z] [breachDirectoryProbe] Querying LeakCheck for domain: noxmetals.co
2025-07-08 09:41:41.256	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-07-08 09:41:41.248	
[2025-07-08T16:41:41.248Z] [trufflehog] Finished secret scan for noxmetals.co Total secrets found: 0
2025-07-08 09:41:41.248	
[2025-07-08T16:41:41.248Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-2PgGZQ3Q9tu.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-2PgGZQ3Q9tu.json'
2025-07-08 09:41:41.248	
[2025-07-08T16:41:41.248Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-2PgGZQ3Q9tu.json
2025-07-08 09:41:41.248	
[2025-07-08T16:41:41.247Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-07-08 09:41:41.247	
[2025-07-08T16:41:41.247Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-07-08 09:41:41.247	
[2025-07-08T16:41:41.247Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-2PgGZQ3Q9tu.json'
2025-07-08 09:41:41.247	
[2025-07-08T16:41:41.247Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-2PgGZQ3Q9tu.json
2025-07-08 09:41:41.247	
[2025-07-08T16:41:41.247Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-07-08 09:41:41.243	
[2025-07-08T16:41:41.243Z] [endpointDiscovery] +crawl_link /cdn-cgi/l/email-protection (-)
2025-07-08 09:41:41.216	
[2025-07-08T16:41:41.215Z] [spfDmarc] Completed email security scan, found 2 issues
2025-07-08 09:41:41.185	
[2025-07-08T16:41:41.185Z] [spfDmarc] Checking for BIMI record...
2025-07-08 09:41:41.109	
[2025-07-08T16:41:41.109Z] [breachDirectoryProbe] Breach Directory response for noxmetals.co: 0 breached accounts
2025-07-08 09:41:41.094	
[2025-07-08T16:41:41.094Z] [accessibilityScan] accessibility=hash_computation domain="noxmetals.co" pages=15
2025-07-08 09:41:41.094	
[2025-07-08T16:41:41.094Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-07-08 09:41:41.080	
[2025-07-08T16:41:41.079Z] [tlsScan] Scanning www.noxmetals.co with hybrid validation (sslscan + Python)...
2025-07-08 09:41:41.080	
[2025-07-08T16:41:41.079Z] [tlsScan] Skipping false positive: "No SSL certificate presented" - Python validator confirmed valid certificate
2025-07-08 09:41:41.080	
[2025-07-08T16:41:41.078Z] [tlsScan] Cross-validation complete for noxmetals.co: 0 additional findings
2025-07-08 09:41:40.838	
[2025-07-08T16:41:40.838Z] [Shodan] Done — 0 services found, 0 unique after deduplication, 2 API calls for 1 targets
2025-07-08 09:41:40.838	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 0 services found, 0 unique after deduplication...
2025-07-08 09:41:40.836	
[2025-07-08T16:41:40.836Z] [Shodan] API call 2 - search query
2025-07-08 09:41:40.711	
[2025-07-08T16:41:40.707Z] [endpointDiscovery] +robots.txt / (-)
2025-07-08 09:41:40.637	
[2025-07-08T16:41:40.637Z] [spfDmarc] Probing for common DKIM selectors...
2025-07-08 09:41:40.598	
[2025-07-08T16:41:40.598Z] [tlsScan] Python validator: noxmetals.co - VALID
2025-07-08 09:41:40.439	
[2025-07-08T16:41:40.438Z] [spfDmarc] Performing recursive SPF check...
2025-07-08 09:41:40.422	
[2025-07-08T16:41:40.422Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-07-08 09:41:40.411	
[2025-07-08T16:41:40.411Z] [tlsScan] Scanning noxmetals.co with hybrid validation (sslscan + Python)...
2025-07-08 09:41:40.411	

2025-07-08 09:41:40.411	
OpenSSL 3.5.1 1 Jul 2025
2025-07-08 09:41:40.411	
[2025-07-08T16:41:40.411Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-07-08 09:41:40.410	
[2025-07-08T16:41:40.408Z] [worker] [2PgGZQ3Q9tu] WAITING for endpoint discovery to complete for dependent modules...
2025-07-08 09:41:40.402	
[2025-07-08T16:41:40.401Z] [accessibilityScan] Starting accessibility scan for domain="noxmetals.co"
2025-07-08 09:41:40.401	
[2025-07-08T16:41:40.401Z] [worker] [2PgGZQ3Q9tu] STARTING accessibility compliance scan for noxmetals.co (immediate parallel)
2025-07-08 09:41:40.399	
[2025-07-08T16:41:40.399Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-07-08 09:41:40.399	
[2025-07-08T16:41:40.399Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-07-08 09:41:40.399	
[2025-07-08T16:41:40.399Z] [trufflehog] Starting targeted secret scan for domain: noxmetals.co
2025-07-08 09:41:40.399	
[2025-07-08T16:41:40.399Z] [worker] [2PgGZQ3Q9tu] STARTING TruffleHog secret scan for noxmetals.co (immediate parallel)
2025-07-08 09:41:40.394	
[2025-07-08T16:41:40.393Z] [spfDmarc] Checking DMARC record...
2025-07-08 09:41:40.393	
[2025-07-08T16:41:40.392Z] [spfDmarc] Starting email security scan for noxmetals.co
2025-07-08 09:41:40.393	
[2025-07-08T16:41:40.392Z] [worker] [2PgGZQ3Q9tu] STARTING SPF/DMARC email security scan for noxmetals.co (immediate parallel)
2025-07-08 09:41:40.389	
[2025-07-08T16:41:40.389Z] [worker] [2PgGZQ3Q9tu] STARTING TLS security scan for noxmetals.co (immediate parallel)
2025-07-08 09:41:40.387	
[2025-07-08T16:41:40.387Z] [endpointDiscovery] ⇢ start noxmetals.co
2025-07-08 09:41:40.387	
[2025-07-08T16:41:40.387Z] [worker] [2PgGZQ3Q9tu] STARTING endpoint discovery for noxmetals.co (immediate parallel)
2025-07-08 09:41:40.387	
[2025-07-08T16:41:40.387Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-07-08 09:41:40.387	
[2025-07-08T16:41:40.387Z] [worker] [2PgGZQ3Q9tu] STARTING document exposure scan for Nox Metals (immediate parallel)
2025-07-08 09:41:40.387	
[2025-07-08T16:41:40.387Z] [dnstwist] Using hybrid RDAP+Whoxy resolver (87% cheaper than WhoisXML) for original domain: noxmetals.co
2025-07-08 09:41:40.387	
[2025-07-08T16:41:40.386Z] [dnstwist] Starting typosquat scan for noxmetals.co
2025-07-08 09:41:40.387	
[2025-07-08T16:41:40.386Z] [worker] [2PgGZQ3Q9tu] STARTING DNS Twist scan for noxmetals.co (immediate parallel)
2025-07-08 09:41:40.386	
[2025-07-08T16:41:40.386Z] [Shodan] Start scan for noxmetals.co
2025-07-08 09:41:40.386	
[2025-07-08T16:41:40.386Z] [worker] [2PgGZQ3Q9tu] STARTING Shodan intelligence scan for noxmetals.co (immediate parallel)
2025-07-08 09:41:40.384	
[2025-07-08T16:41:40.384Z] [breachDirectoryProbe] Querying Breach Directory for domain: noxmetals.co
2025-07-08 09:41:40.384	
[2025-07-08T16:41:40.383Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="noxmetals.co" (BreachDirectory + LeakCheck)
2025-07-08 09:41:40.384	
[2025-07-08T16:41:40.383Z] [worker] [2PgGZQ3Q9tu] STARTING Breach Directory intelligence probe for noxmetals.co (immediate parallel)
2025-07-08 09:41:40.384	
[queue] Updated job 2PgGZQ3Q9tu status: processing - Comprehensive security discovery in progress...
2025-07-08 09:41:40.248	
[2025-07-08T16:41:40.247Z] [worker] [2PgGZQ3Q9tu] 🎯 Using TIER_1 tier with 12 modules: dns_twist, document_exposure, shodan, breach_directory_probe, endpoint_discovery, tech_stack_scan, abuse_intel_scan, accessibility_scan, nuclei, tls_scan, spf_dmarc, trufflehog
2025-07-08 09:41:40.247	
[2025-07-08T16:41:40.247Z] [worker] Processing comprehensive security scan for Nox Metals (noxmetals.co)
2025-07-08 09:41:40.247	
[2025-07-08T16:41:40.247Z] [worker] ✅ JOB PICKED UP: Processing scan job 2PgGZQ3Q9tu for Nox Metals (noxmetals.co)
2025-07-08 09:41:40.247	
[2025-07-08T16:41:40.247Z] [worker] Processing scan job: 2PgGZQ3Q9tu
2025-07-08 09:41:40.247	
[queue] Job 2PgGZQ3Q9tu successfully retrieved by worker 286565eb5406d8
2025-07-08 09:41:40.247	
}
2025-07-08 09:41:40.247	
createdAt: '2025-07-08T15:17:35.619Z'
2025-07-08 09:41:40.247	
originalDomain: 'noxmetals.co',
2025-07-08 09:41:40.247	
domain: 'noxmetals.co',
2025-07-08 09:41:40.247	
companyName: 'Nox Metals',
2025-07-08 09:41:40.247	
id: '2PgGZQ3Q9tu',
2025-07-08 09:41:40.247	
[queue] Parsed job: {
2025-07-08 09:41:40.247	
[queue] Job string to parse: {"id":"2PgGZQ3Q9tu","companyName":"Nox Metals","domain":"noxmetals.co","originalDomain":"noxmetals.co","createdAt":"2025-07-08T15:17:35.619Z"}
2025-07-08 09:41:40.247	
} Type: object
2025-07-08 09:41:40.247	
createdAt: '2025-07-08T15:17:35.619Z'
2025-07-08 09:41:40.247	
originalDomain: 'noxmetals.co',
2025-07-08 09:41:40.247	
domain: 'noxmetals.co',
2025-07-08 09:41:40.247	
companyName: 'Nox Metals',
2025-07-08 09:41:40.247	
id: '2PgGZQ3Q9tu',
2025-07-08 09:41:40.247	
[queue] Raw job data from Redis: {
2025-07-08 09:41:40.102	
{
  "level": 30,
  "time": 1751992900102,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-e",
  "res": {
    "statusCode": 404
  },
  "responseTime": 38.74009700026363,
  "msg": "request completed"
}
2025-07-08 09:41:40.102	
[2025-07-08T16:41:40.101Z] [api] Found 0 findings for scan DgkbPrPLxl2
2025-07-08 09:41:40.065	
[2025-07-08T16:41:40.063Z] [api] Retrieving findings for scan: DgkbPrPLxl2
2025-07-08 09:41:40.063	
{
  "level": 30,
  "time": 1751992900063,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-e",
  "req": {
    "method": "GET",
    "url": "/scan/DgkbPrPLxl2/findings",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 63884
  },
  "msg": "incoming request"
}
2025-07-08 09:41:39.893	
[2025-07-08T16:41:39.892Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Nox Metals: 2 verified findings, 11 artifacts across 12 security modules
2025-07-08 09:41:39.893	
[queue] Updated job wawuQahOOFA status: done - Comprehensive security scan completed - 2 verified findings across 12 security modules. Findings ready for processing.
2025-07-08 09:41:39.500	
[2025-07-08T16:41:39.499Z] [worker] [updateScanMasterStatus] Updated scan wawuQahOOFA with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-07-08 09:41:39.489	
[2025-07-08T16:41:39.489Z] [worker] [processScan] Counted 11 artifacts for scan wawuQahOOFA
2025-07-08 09:41:39.487	
[2025-07-08T16:41:39.486Z] [worker] [wawuQahOOFA] COMPLETED abuse_intel_scan scan: 0 findings found
2025-07-08 09:41:39.487	
[2025-07-08T16:41:39.486Z] [worker] [wawuQahOOFA] WAITING for abuse_intel_scan scan to complete...
2025-07-08 09:41:39.487	
[2025-07-08T16:41:39.486Z] [worker] [wawuQahOOFA] COMPLETED tech_stack_scan scan: 2 findings found
2025-07-08 09:41:39.487	
[2025-07-08T16:41:39.486Z] [worker] [wawuQahOOFA] WAITING for tech_stack_scan scan to complete...
2025-07-08 09:41:39.486	
[2025-07-08T16:41:39.486Z] [worker] [wawuQahOOFA] COMPLETED nuclei scan: 0 findings found
2025-07-08 09:41:39.486	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-07-08 09:41:39.467	
[2025-07-08T16:41:39.467Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-07-08 09:41:39.467	
[2025-07-08T16:41:39.467Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-07-08 09:41:39.467	
[2025-07-08T16:41:39.467Z] [nuclei] [Two-Pass Scan] No findings for https://noxmetals.co
2025-07-08 09:41:39.467	
[2025-07-08T16:41:39.467Z] [nucleiWrapper] Two-pass scan completed: 0 findings persisted as artifacts (baseline: 0, common+tech: 0)
2025-07-08 09:41:39.467	
[2025-07-08T16:41:39.466Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:41:39.459	
[2025-07-08T16:41:39.459Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-08 09:41:19.457	
[2025-07-08T16:41:19.456Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-08 09:41:19.457	
[2025-07-08T16:41:19.456Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:41:19.453	
[2025-07-08T16:41:19.453Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://noxmetals.co -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 1
2025-07-08 09:41:19.453	
[2025-07-08T16:41:19.453Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-08 09:41:19.453	
[2025-07-08T16:41:19.453Z] [nucleiWrapper] Detected technologies: none
2025-07-08 09:41:19.453	
[2025-07-08T16:41:19.453Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:41:19.445	
[2025-07-08T16:41:19.445Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-08 09:41:06.549	
{
  "level": 30,
  "time": 1751992866549,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-d",
  "res": {
    "statusCode": 200
  },
  "responseTime": 370.0908059999347,
  "msg": "request completed"
}
2025-07-08 09:41:06.179	
{
  "level": 30,
  "time": 1751992866178,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-d",
  "req": {
    "method": "GET",
    "url": "/scan/DgkbPrPLxl2/status",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 38042
  },
  "msg": "incoming request"
}
2025-07-08 09:41:03.435	
Error: in prepare, all VALUES must have the same number of terms
2025-07-08 09:41:03.435	
('total_cves', (SELECT COUNT(*) FROM vulnerabilities));
2025-07-08 09:41:03.435	
('last_sync', '2025-07-08T16:41:03.429Z', CURRENT_TIMESTAMP),
2025-07-08 09:41:03.435	
INSERT OR REPLACE INTO sync_metadata (key, value, updated_at) VALUES
2025-07-08 09:41:03.435	
[2025-07-08T16:41:03.435Z] [nvdMirror] NVD sync failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite
2025-07-08 09:41:03.435	
Error: in prepare, all VALUES must have the same number of terms
2025-07-08 09:41:03.435	
('total_cves', (SELECT COUNT(*) FROM vulnerabilities));
2025-07-08 09:41:03.435	
('last_sync', '2025-07-08T16:41:03.429Z', CURRENT_TIMESTAMP),
2025-07-08 09:41:03.435	
INSERT OR REPLACE INTO sync_metadata (key, value, updated_at) VALUES
2025-07-08 09:41:03.435	
[2025-07-08T16:41:03.435Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite
2025-07-08 09:41:03.430	
[2025-07-08T16:41:03.428Z] [nvdMirror] NVD API request failed: Request failed with status code 404
2025-07-08 09:41:03.061	
[2025-07-08T16:41:03.061Z] [techStackScan] techstack=complete arts=2 time=3979ms
2025-07-08 09:41:03.051	
[2025-07-08T16:41:03.051Z] [techStackScan] techstack=sbom_generated components=2 vulnerabilities=0 critical=0
2025-07-08 09:41:03.051	
[2025-07-08T16:41:03.050Z] [sbomGenerator] SBOM generated: 2 components, 0 vulnerabilities
2025-07-08 09:41:03.050	
[2025-07-08T16:41:03.050Z] [sbomGenerator] Generating SBOM for noxmetals.co with 2 components
2025-07-08 09:41:03.050	
[2025-07-08T16:41:03.050Z] [osvIntegration] No components suitable for OSV.dev queries
2025-07-08 09:41:03.049	
[2025-07-08T16:41:03.049Z] [techStackScan] techstack=osv_enhancement starting OSV.dev integration for 2 components
2025-07-08 09:41:03.049	
[2025-07-08T16:41:03.049Z] [versionMatcher] Batch vulnerability analysis completed: 0 vulnerabilities across 2 components in 87ms
2025-07-08 09:41:03.049	
[2025-07-08T16:41:03.049Z] [versionMatcher] Vulnerability matching completed for Cloudflare: 0 matches in 86ms
2025-07-08 09:41:03.049	
[2025-07-08T16:41:03.049Z] [nvdMirror] Local CVE query completed: 0 results in 7ms
2025-07-08 09:41:03.049	
extra argument: "DISTINCT"
2025-07-08 09:41:03.049	
JOIN cpe_matches cm ON v.cve_id = cm.cve_id WHERE cm.cpe_uri LIKE '%:cloudflare:Cloudflare:%' AND cm.vulnerable = 1 ORDER BY v.cvss_v3_score DESC, v.published_date DESC LIMIT 100
2025-07-08 09:41:03.049	
FROM vulnerabilities v
2025-07-08 09:41:03.049	
v.severity, v.cisa_kev, v.epss_score, v.references_json
2025-07-08 09:41:03.049	
v.cvss_v3_score, v.cvss_v3_vector, v.cvss_v2_score, v.cvss_v2_vector,
2025-07-08 09:41:03.049	
SELECT DISTINCT v.cve_id, v.description, v.published_date, v.last_modified_date,
2025-07-08 09:41:03.049	
[2025-07-08T16:41:03.049Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:41:03.049	
extra argument: "DISTINCT"
2025-07-08 09:41:03.049	
JOIN cpe_matches cm ON v.cve_id = cm.cve_id WHERE cm.cpe_uri LIKE '%:cloudflare:Cloudflare:%' AND cm.vulnerable = 1 ORDER BY v.cvss_v3_score DESC, v.published_date DESC LIMIT 100
2025-07-08 09:41:03.049	
FROM vulnerabilities v
2025-07-08 09:41:03.049	
v.severity, v.cisa_kev, v.epss_score, v.references_json
2025-07-08 09:41:03.049	
v.cvss_v3_score, v.cvss_v3_vector, v.cvss_v2_score, v.cvss_v2_vector,
2025-07-08 09:41:03.049	
SELECT DISTINCT v.cve_id, v.description, v.published_date, v.last_modified_date,
2025-07-08 09:41:03.049	
[2025-07-08T16:41:03.049Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:41:03.047	
[2025-07-08T16:41:03.046Z] [nvdMirror] Syncing CVEs modified since 2025-06-08T16:41:03.046Z...
2025-07-08 09:41:03.047	
extra argument: "value"
2025-07-08 09:41:03.047	
SELECT value FROM sync_metadata WHERE key = 'last_sync'
2025-07-08 09:41:03.047	
[2025-07-08T16:41:03.046Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:41:03.047	
extra argument: "value"
2025-07-08 09:41:03.047	
SELECT value FROM sync_metadata WHERE key = 'last_sync'
2025-07-08 09:41:03.047	
[2025-07-08T16:41:03.046Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:41:03.043	
[2025-07-08T16:41:03.042Z] [nvdMirror] Update already in progress, skipping...
2025-07-08 09:41:03.039	
[2025-07-08T16:41:03.039Z] [nvdMirror] Starting NVD data sync...
2025-07-08 09:41:03.039	
[2025-07-08T16:41:03.039Z] [nvdMirror] NVD mirror is stale, initiating background sync...
2025-07-08 09:41:03.039	
extra argument: "*"
2025-07-08 09:41:03.039	
SELECT * FROM sync_metadata WHERE key = 'last_sync'
2025-07-08 09:41:03.039	
[2025-07-08T16:41:03.039Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:41:03.039	
extra argument: "*"
2025-07-08 09:41:03.039	
SELECT * FROM sync_metadata WHERE key = 'last_sync'
2025-07-08 09:41:03.039	
[2025-07-08T16:41:03.039Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-08 09:41:03.033	
[2025-07-08T16:41:03.033Z] [nvdMirror] NVD mirror database initialized successfully
2025-07-08 09:41:03.001	
Error: in prepare, database is locked (5)
2025-07-08 09:41:03.001	
('total_cves', '0');
2025-07-08 09:41:03.001	
('version', '1.0'),
2025-07-08 09:41:03.001	
('last_sync', '1970-01-01T00:00:00Z'),
2025-07-08 09:41:03.001	
INSERT OR REPLACE INTO sync_metadata (key, value) VALUES
2025-07-08 09:41:03.001	
-- Insert initial metadata
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_lookup ON cpe_matches(cpe_uri, vulnerable);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_cpe_uri ON cpe_matches(cpe_uri);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_cve_id ON cpe_matches(cve_id);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_cisa_kev ON vulnerabilities(cisa_kev);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_cvss_v3 ON vulnerabilities(cvss_v3_score);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_published ON vulnerabilities(published_date);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_severity ON vulnerabilities(severity);
2025-07-08 09:41:03.001	
-- Performance indexes
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
2025-07-08 09:41:03.001	
value TEXT NOT NULL,
2025-07-08 09:41:03.001	
key TEXT PRIMARY KEY,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS sync_metadata (
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
UNIQUE(cve_id, cpe_uri, version_start_including, version_start_excluding, version_end_including, version_end_excluding)
2025-07-08 09:41:03.001	
FOREIGN KEY (cve_id) REFERENCES vulnerabilities(cve_id),
2025-07-08 09:41:03.001	
vulnerable INTEGER DEFAULT 1,
2025-07-08 09:41:03.001	
version_end_excluding TEXT,
2025-07-08 09:41:03.001	
version_end_including TEXT,
2025-07-08 09:41:03.001	
version_start_excluding TEXT,
2025-07-08 09:41:03.001	
version_start_including TEXT,
2025-07-08 09:41:03.001	
cpe_uri TEXT NOT NULL,
2025-07-08 09:41:03.001	
cve_id TEXT NOT NULL,
2025-07-08 09:41:03.001	
id INTEGER PRIMARY KEY AUTOINCREMENT,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS cpe_matches (
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
2025-07-08 09:41:03.001	
references_json TEXT,
2025-07-08 09:41:03.001	
epss_score REAL,
2025-07-08 09:41:03.001	
cisa_kev INTEGER DEFAULT 0,
2025-07-08 09:41:03.001	
severity TEXT NOT NULL,
2025-07-08 09:41:03.001	
cvss_v2_vector TEXT,
2025-07-08 09:41:03.001	
cvss_v2_score REAL,
2025-07-08 09:41:03.001	
cvss_v3_vector TEXT,
2025-07-08 09:41:03.001	
cvss_v3_score REAL,
2025-07-08 09:41:03.001	
last_modified_date TEXT NOT NULL,
2025-07-08 09:41:03.001	
published_date TEXT NOT NULL,
2025-07-08 09:41:03.001	
description TEXT NOT NULL,
2025-07-08 09:41:03.001	
cve_id TEXT PRIMARY KEY,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS vulnerabilities (
2025-07-08 09:41:03.001	
[2025-07-08T16:41:02.999Z] [versionMatcher] Vulnerability matching failed for Security Headers: Command failed: sqlite3 /tmp/nvd_mirror.sqlite
2025-07-08 09:41:03.001	
Error: in prepare, database is locked (5)
2025-07-08 09:41:03.001	
('total_cves', '0');
2025-07-08 09:41:03.001	
('version', '1.0'),
2025-07-08 09:41:03.001	
('last_sync', '1970-01-01T00:00:00Z'),
2025-07-08 09:41:03.001	
INSERT OR REPLACE INTO sync_metadata (key, value) VALUES
2025-07-08 09:41:03.001	
-- Insert initial metadata
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_lookup ON cpe_matches(cpe_uri, vulnerable);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_cpe_uri ON cpe_matches(cpe_uri);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_cve_id ON cpe_matches(cve_id);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_cisa_kev ON vulnerabilities(cisa_kev);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_cvss_v3 ON vulnerabilities(cvss_v3_score);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_published ON vulnerabilities(published_date);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_severity ON vulnerabilities(severity);
2025-07-08 09:41:03.001	
-- Performance indexes
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
2025-07-08 09:41:03.001	
value TEXT NOT NULL,
2025-07-08 09:41:03.001	
key TEXT PRIMARY KEY,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS sync_metadata (
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
UNIQUE(cve_id, cpe_uri, version_start_including, version_start_excluding, version_end_including, version_end_excluding)
2025-07-08 09:41:03.001	
FOREIGN KEY (cve_id) REFERENCES vulnerabilities(cve_id),
2025-07-08 09:41:03.001	
vulnerable INTEGER DEFAULT 1,
2025-07-08 09:41:03.001	
version_end_excluding TEXT,
2025-07-08 09:41:03.001	
version_end_including TEXT,
2025-07-08 09:41:03.001	
version_start_excluding TEXT,
2025-07-08 09:41:03.001	
version_start_including TEXT,
2025-07-08 09:41:03.001	
cpe_uri TEXT NOT NULL,
2025-07-08 09:41:03.001	
cve_id TEXT NOT NULL,
2025-07-08 09:41:03.001	
id INTEGER PRIMARY KEY AUTOINCREMENT,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS cpe_matches (
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
2025-07-08 09:41:03.001	
references_json TEXT,
2025-07-08 09:41:03.001	
epss_score REAL,
2025-07-08 09:41:03.001	
cisa_kev INTEGER DEFAULT 0,
2025-07-08 09:41:03.001	
severity TEXT NOT NULL,
2025-07-08 09:41:03.001	
cvss_v2_vector TEXT,
2025-07-08 09:41:03.001	
cvss_v2_score REAL,
2025-07-08 09:41:03.001	
cvss_v3_vector TEXT,
2025-07-08 09:41:03.001	
cvss_v3_score REAL,
2025-07-08 09:41:03.001	
last_modified_date TEXT NOT NULL,
2025-07-08 09:41:03.001	
published_date TEXT NOT NULL,
2025-07-08 09:41:03.001	
description TEXT NOT NULL,
2025-07-08 09:41:03.001	
cve_id TEXT PRIMARY KEY,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS vulnerabilities (
2025-07-08 09:41:03.001	
[2025-07-08T16:41:02.999Z] [nvdMirror] Failed to initialize NVD mirror: Command failed: sqlite3 /tmp/nvd_mirror.sqlite
2025-07-08 09:41:03.001	
Error: in prepare, database is locked (5)
2025-07-08 09:41:03.001	
('total_cves', '0');
2025-07-08 09:41:03.001	
('version', '1.0'),
2025-07-08 09:41:03.001	
('last_sync', '1970-01-01T00:00:00Z'),
2025-07-08 09:41:03.001	
INSERT OR REPLACE INTO sync_metadata (key, value) VALUES
2025-07-08 09:41:03.001	
-- Insert initial metadata
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_lookup ON cpe_matches(cpe_uri, vulnerable);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_cpe_uri ON cpe_matches(cpe_uri);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_cpe_matches_cve_id ON cpe_matches(cve_id);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_cisa_kev ON vulnerabilities(cisa_kev);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_cvss_v3 ON vulnerabilities(cvss_v3_score);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_published ON vulnerabilities(published_date);
2025-07-08 09:41:03.001	
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_severity ON vulnerabilities(severity);
2025-07-08 09:41:03.001	
-- Performance indexes
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
2025-07-08 09:41:03.001	
value TEXT NOT NULL,
2025-07-08 09:41:03.001	
key TEXT PRIMARY KEY,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS sync_metadata (
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
UNIQUE(cve_id, cpe_uri, version_start_including, version_start_excluding, version_end_including, version_end_excluding)
2025-07-08 09:41:03.001	
FOREIGN KEY (cve_id) REFERENCES vulnerabilities(cve_id),
2025-07-08 09:41:03.001	
vulnerable INTEGER DEFAULT 1,
2025-07-08 09:41:03.001	
version_end_excluding TEXT,
2025-07-08 09:41:03.001	
version_end_including TEXT,
2025-07-08 09:41:03.001	
version_start_excluding TEXT,
2025-07-08 09:41:03.001	
version_start_including TEXT,
2025-07-08 09:41:03.001	
cpe_uri TEXT NOT NULL,
2025-07-08 09:41:03.001	
cve_id TEXT NOT NULL,
2025-07-08 09:41:03.001	
id INTEGER PRIMARY KEY AUTOINCREMENT,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS cpe_matches (
2025-07-08 09:41:03.001	
);
2025-07-08 09:41:03.001	
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
2025-07-08 09:41:03.001	
references_json TEXT,
2025-07-08 09:41:03.001	
epss_score REAL,
2025-07-08 09:41:03.001	
cisa_kev INTEGER DEFAULT 0,
2025-07-08 09:41:03.001	
severity TEXT NOT NULL,
2025-07-08 09:41:03.001	
cvss_v2_vector TEXT,
2025-07-08 09:41:03.001	
cvss_v2_score REAL,
2025-07-08 09:41:03.001	
cvss_v3_vector TEXT,
2025-07-08 09:41:03.001	
cvss_v3_score REAL,
2025-07-08 09:41:03.001	
last_modified_date TEXT NOT NULL,
2025-07-08 09:41:03.001	
published_date TEXT NOT NULL,
2025-07-08 09:41:03.001	
description TEXT NOT NULL,
2025-07-08 09:41:03.001	
cve_id TEXT PRIMARY KEY,
2025-07-08 09:41:03.001	
CREATE TABLE IF NOT EXISTS vulnerabilities (
2025-07-08 09:41:03.001	
[2025-07-08T16:41:02.999Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite
2025-07-08 09:41:02.975	
[2025-07-08T16:41:02.971Z] [nvdMirror] Initializing NVD mirror database...
2025-07-08 09:41:02.974	
[2025-07-08T16:41:02.971Z] [versionMatcher] Finding vulnerabilities for Security Headers@unknown
2025-07-08 09:41:02.964	
[2025-07-08T16:41:02.963Z] [nvdMirror] Initializing NVD mirror database...
2025-07-08 09:41:02.964	
[2025-07-08T16:41:02.963Z] [versionMatcher] Finding vulnerabilities for Cloudflare@unknown
2025-07-08 09:41:02.964	
[2025-07-08T16:41:02.962Z] [versionMatcher] Starting batch vulnerability analysis for 2 components
2025-07-08 09:41:02.964	
[2025-07-08T16:41:02.962Z] [cpeNormalization] normalized tech="Security Headers" version="undefined" cpe="undefined" purl="undefined" confidence=70
2025-07-08 09:41:02.964	
[2025-07-08T16:41:02.962Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:02.961	
[2025-07-08T16:41:02.961Z] [techStackScan] techstack=vuln_analysis starting enhanced vulnerability analysis for 2 technologies
2025-07-08 09:41:02.961	
[2025-07-08T16:41:02.961Z] [techStackScan] analysis=stats tech="Cloudflare" version="undefined" raw=0 enriched=0 merged=0 filtered=0
2025-07-08 09:41:02.496	
[2025-07-08T16:41:02.496Z] [techStackScan] analysis=stats tech="Security Headers" version="undefined" raw=0 enriched=0 merged=0 filtered=0
2025-07-08 09:41:01.878	
[2025-07-08T16:41:01.878Z] [techStackScan] techstack=fast_detection_complete total_techs=2 total_duration=0ms avg_per_url=0ms
2025-07-08 09:41:01.878	
[2025-07-08T16:41:01.878Z] [faviconDetection] Batch favicon detection completed: 0 technologies detected across 3 URLs in 871ms
2025-07-08 09:41:01.878	
[2025-07-08T16:41:01.878Z] [faviconDetection] No favicon found for https://www.noxmetals.co
2025-07-08 09:41:01.878	
[2025-07-08T16:41:01.878Z] [faviconDetection] Failed to fetch favicon from https://www.noxmetals.co/apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-08 09:41:01.674	
[2025-07-08T16:41:01.674Z] [faviconDetection] No favicon found for https://noxmetals.co
2025-07-08 09:41:01.674	
[2025-07-08T16:41:01.674Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co/apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-08 09:41:01.661	
[2025-07-08T16:41:01.660Z] [faviconDetection] Fetching favicon from https://www.noxmetals.co/apple-touch-icon-precomposed.png
2025-07-08 09:41:01.661	
[2025-07-08T16:41:01.660Z] [faviconDetection] Failed to fetch favicon from https://www.noxmetals.co/apple-touch-icon.png: Request failed with status code 404
2025-07-08 09:41:01.619	
[2025-07-08T16:41:01.619Z] [faviconDetection] No favicon found for https://noxmetals.co/
2025-07-08 09:41:01.619	
[2025-07-08T16:41:01.619Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co//apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-08 09:41:01.508	
[2025-07-08T16:41:01.507Z] [faviconDetection] Fetching favicon from https://noxmetals.co/apple-touch-icon-precomposed.png
2025-07-08 09:41:01.507	
[2025-07-08T16:41:01.507Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co/apple-touch-icon.png: Request failed with status code 404
2025-07-08 09:41:01.428	
[2025-07-08T16:41:01.427Z] [faviconDetection] Fetching favicon from https://noxmetals.co//apple-touch-icon-precomposed.png
2025-07-08 09:41:01.428	
[2025-07-08T16:41:01.427Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co//apple-touch-icon.png: Request failed with status code 404
2025-07-08 09:41:01.377	
[2025-07-08T16:41:01.377Z] [faviconDetection] Fetching favicon from https://www.noxmetals.co/apple-touch-icon.png
2025-07-08 09:41:01.377	
[2025-07-08T16:41:01.377Z] [faviconDetection] Failed to fetch favicon from https://www.noxmetals.co/favicon.png: Request failed with status code 404
2025-07-08 09:41:01.332	
[2025-07-08T16:41:01.331Z] [faviconDetection] Fetching favicon from https://noxmetals.co/apple-touch-icon.png
2025-07-08 09:41:01.332	
[2025-07-08T16:41:01.331Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co/favicon.png: Request failed with status code 404
2025-07-08 09:41:01.245	
[2025-07-08T16:41:01.245Z] [faviconDetection] Fetching favicon from https://noxmetals.co//apple-touch-icon.png
2025-07-08 09:41:01.245	
[2025-07-08T16:41:01.245Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co//favicon.png: Request failed with status code 404
2025-07-08 09:41:01.059	
[2025-07-08T16:41:01.059Z] [faviconDetection] Fetching favicon from https://noxmetals.co/favicon.png
2025-07-08 09:41:01.059	
[2025-07-08T16:41:01.059Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co/favicon.ico: Request failed with status code 404
2025-07-08 09:41:01.053	
[2025-07-08T16:41:01.053Z] [faviconDetection] Fetching favicon from https://noxmetals.co//favicon.png
2025-07-08 09:41:01.052	
[2025-07-08T16:41:01.052Z] [faviconDetection] Failed to fetch favicon from https://noxmetals.co//favicon.ico: Request failed with status code 404
2025-07-08 09:41:01.044	
[2025-07-08T16:41:01.044Z] [faviconDetection] Fetching favicon from https://www.noxmetals.co/favicon.png
2025-07-08 09:41:01.044	
[2025-07-08T16:41:01.044Z] [faviconDetection] Failed to fetch favicon from https://www.noxmetals.co/favicon.ico: Request failed with status code 404
2025-07-08 09:41:01.012	
[2025-07-08T16:41:01.011Z] [faviconDetection] Fetching favicon from https://noxmetals.co//favicon.ico
2025-07-08 09:41:01.011	
[2025-07-08T16:41:01.011Z] [faviconDetection] Starting favicon-based tech detection for https://noxmetals.co/
2025-07-08 09:41:01.009	
[2025-07-08T16:41:01.009Z] [faviconDetection] Fetching favicon from https://www.noxmetals.co/favicon.ico
2025-07-08 09:41:01.009	
[2025-07-08T16:41:01.009Z] [faviconDetection] Starting favicon-based tech detection for https://www.noxmetals.co
2025-07-08 09:41:01.007	
[2025-07-08T16:41:01.007Z] [faviconDetection] Fetching favicon from https://noxmetals.co/favicon.ico
2025-07-08 09:41:01.007	
[2025-07-08T16:41:01.007Z] [faviconDetection] Starting favicon-based tech detection for https://noxmetals.co
2025-07-08 09:41:01.007	
[2025-07-08T16:41:01.007Z] [faviconDetection] Starting batch favicon detection for 3 URLs
2025-07-08 09:41:01.007	
[2025-07-08T16:41:01.007Z] [techStackScan] techstack=favicon_detection starting favicon analysis for 3 URLs
2025-07-08 09:41:01.007	
[2025-07-08T16:41:01.007Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.007	
[2025-07-08T16:41:01.007Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.007	
[2025-07-08T16:41:01.007Z] [techStackScan] techstack=webtech_success url="https://noxmetals.co/wordpress" techs=2 duration=0ms
2025-07-08 09:41:01.007	
[2025-07-08T16:41:01.007Z] [cpeNormalization] normalized tech="Security Headers" version="undefined" cpe="undefined" purl="undefined" confidence=70
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [techStackScan] techstack=webtech_success url="https://noxmetals.co/cdn-cgi/l/email-protection" techs=3 duration=0ms
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [techStackScan] techstack=webtech_success url="https://noxmetals.co/" techs=2 duration=0ms
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.006	
[2025-07-08T16:41:01.006Z] [techStackScan] techstack=webtech_success url="https://www.noxmetals.co" techs=2 duration=0ms
2025-07-08 09:41:01.005	
[2025-07-08T16:41:01.005Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.005	
[2025-07-08T16:41:01.005Z] [cpeNormalization] normalized tech="Cloudflare" version="undefined" cpe="undefined" purl="undefined" confidence=100
2025-07-08 09:41:01.005	
[2025-07-08T16:41:01.005Z] [techStackScan] techstack=webtech_success url="https://noxmetals.co" techs=2 duration=0ms
2025-07-08 09:41:01.005	
[2025-07-08T16:41:01.005Z] [fastTechDetection] Batch fast tech detection completed: 11 techs across 5 URLs in 384ms
2025-07-08 09:41:01.005	
[2025-07-08T16:41:01.005Z] [fastTechDetection] Header detection found 2 techs, skipping WebTech for https://www.noxmetals.co
2025-07-08 09:41:01.005	
[2025-07-08T16:41:01.005Z] [fastTechDetection] Header detection found 2 technologies for https://www.noxmetals.co
2025-07-08 09:41:00.943	
[2025-07-08T16:41:00.943Z] [fastTechDetection] Header detection found 2 techs, skipping WebTech for https://noxmetals.co/
2025-07-08 09:41:00.943	
[2025-07-08T16:41:00.943Z] [fastTechDetection] Header detection found 2 technologies for https://noxmetals.co/
2025-07-08 09:41:00.936	
[2025-07-08T16:41:00.935Z] [fastTechDetection] Header detection found 2 techs, skipping WebTech for https://noxmetals.co
2025-07-08 09:41:00.936	
[2025-07-08T16:41:00.935Z] [fastTechDetection] Header detection found 2 technologies for https://noxmetals.co
2025-07-08 09:41:00.660	
[2025-07-08T16:41:00.659Z] [fastTechDetection] Header detection found 2 techs, skipping WebTech for https://noxmetals.co/wordpress
2025-07-08 09:41:00.660	
[2025-07-08T16:41:00.659Z] [fastTechDetection] Header detection found 2 technologies for https://noxmetals.co/wordpress
2025-07-08 09:41:00.658	
[2025-07-08T16:41:00.658Z] [fastTechDetection] Header detection found 3 techs, skipping WebTech for https://noxmetals.co/cdn-cgi/l/email-protection
2025-07-08 09:41:00.655	
[2025-07-08T16:41:00.655Z] [fastTechDetection] Header detection found 3 technologies for https://noxmetals.co/cdn-cgi/l/email-protection
2025-07-08 09:41:00.635	
[2025-07-08T16:41:00.634Z] [fastTechDetection] Checking headers for quick tech detection: https://noxmetals.co/wordpress
2025-07-08 09:41:00.630	
[2025-07-08T16:41:00.629Z] [fastTechDetection] Checking headers for quick tech detection: https://noxmetals.co/cdn-cgi/l/email-protection
2025-07-08 09:41:00.626	
[2025-07-08T16:41:00.625Z] [fastTechDetection] Checking headers for quick tech detection: https://noxmetals.co/
2025-07-08 09:41:00.626	
[2025-07-08T16:41:00.624Z] [fastTechDetection] Checking headers for quick tech detection: https://www.noxmetals.co
2025-07-08 09:41:00.626	
[2025-07-08T16:41:00.621Z] [fastTechDetection] Checking headers for quick tech detection: https://noxmetals.co
2025-07-08 09:41:00.626	
[2025-07-08T16:41:00.621Z] [fastTechDetection] Starting batch fast tech detection for 5 URLs
2025-07-08 09:41:00.626	
[2025-07-08T16:41:00.621Z] [techStackScan] techstack=fast_detection starting WebTech scan for 7 targets
2025-07-08 09:41:00.626	
[2025-07-08T16:41:00.621Z] [techStackScan] techstack=bypass_nuclei targets=[https://www.google-analytics.com] (~2min time savings by skipping expensive non-HTML assets)
2025-07-08 09:41:00.620	
[2025-07-08T16:41:00.620Z] [techStackScan] techstack=targets primary=5 thirdParty=3 total=8 html=7 finalHtml=7 nonHtml=1 skipped=0
2025-07-08 09:41:00.598	
[2025-07-08T16:41:00.598Z] [dynamicBrowser] Page operation completed in 1026ms
2025-07-08 09:41:00.598	
[2025-07-08T16:41:00.597Z] [techStackScan] thirdParty=discovered domain=noxmetals.co total=3 (html=2, nonHtml=1)
2025-07-08 09:40:59.448	
[2025-07-08T16:40:59.447Z] [techStackScan] buildTargets discovered=3 total=5 (html=5, nonHtml=0)
2025-07-08 09:40:59.440	
[2025-07-08T16:40:59.438Z] [techStackScan] techstack=nuclei wrapper confirmed available
2025-07-08 09:40:59.440	
[2025-07-08T16:40:59.438Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:40:59.440	
[INF] PDCP Directory: /root/.pdcp
2025-07-08 09:40:59.440	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-08 09:40:59.440	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-08 09:40:59.440	
[2025-07-08T16:40:59.438Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-08 09:40:59.440	
[2025-07-08T16:40:59.438Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-08 09:40:59.440	
[2025-07-08T16:40:59.438Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:40:59.436	
[2025-07-08T16:40:59.435Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://noxmetals.co -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 1
2025-07-08 09:40:59.435	
[2025-07-08T16:40:59.435Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-08 09:40:59.435	
[2025-07-08T16:40:59.435Z] [nucleiWrapper] Starting two-pass scan for https://noxmetals.co
2025-07-08 09:40:59.435	
[2025-07-08T16:40:59.435Z] [nuclei] Smart guard: techs=none timeout=20s headless=false
2025-07-08 09:40:59.435	
[2025-07-08T16:40:59.435Z] [nuclei] [Enhanced Two-Pass Scan] Running on https://noxmetals.co
2025-07-08 09:40:59.435	
[2025-07-08T16:40:59.434Z] [nuclei] --- Starting Enhanced Two-Pass Scans on 1 targets ---
2025-07-08 09:40:59.435	
[2025-07-08T16:40:59.434Z] [nuclei] Nuclei binary validated successfully.
2025-07-08 09:40:59.435	
[2025-07-08T16:40:59.434Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-08 09:40:59.435	
[INF] PDCP Directory: /root/.pdcp
2025-07-08 09:40:59.435	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-08 09:40:59.435	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-08 09:40:59.435	
[2025-07-08T16:40:59.434Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-08 09:40:59.092	
[2025-07-08T16:40:59.091Z] [abuseIntelScan] No IP artifacts found for this scan
2025-07-08 09:40:59.092	
[2025-07-08T16:40:59.091Z] [abuseIntelScan] Found 0 IP artifacts for scan wawuQahOOFA
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] WAITING for nuclei scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] COMPLETED accessibility_scan scan: 0 findings found
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] WAITING for accessibility_scan scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] COMPLETED trufflehog scan: 0 findings found
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] WAITING for trufflehog scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] COMPLETED spf_dmarc scan: 2 findings found
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] WAITING for spf_dmarc scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] COMPLETED tls_scan scan: 0 findings found
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] WAITING for tls_scan scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] COMPLETED document_exposure scan: 0 findings found
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] WAITING for document_exposure scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] COMPLETED dns_twist scan: 0 findings found
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.087Z] [worker] [wawuQahOOFA] WAITING for dns_twist scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.086Z] [worker] [wawuQahOOFA] COMPLETED shodan scan: 0 findings found
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.086Z] [worker] [wawuQahOOFA] WAITING for shodan scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.086Z] [worker] [wawuQahOOFA] COMPLETED breach_directory_probe scan: 0 findings found
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.086Z] [worker] [wawuQahOOFA] WAITING for breach_directory_probe scan to complete...
2025-07-08 09:40:59.087	
[2025-07-08T16:40:59.086Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=wawuQahOOFA
2025-07-08 09:40:59.086	
[2025-07-08T16:40:59.086Z] [worker] [wawuQahOOFA] STARTING AbuseIPDB intelligence scan for IPs (parallel after endpoint discovery)
2025-07-08 09:40:59.086	
[2025-07-08T16:40:59.086Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:40:59.083	
[2025-07-08T16:40:59.082Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-08 09:40:59.083	
[2025-07-08T16:40:59.082Z] [techStackScan] techstack=start domain=noxmetals.co
2025-07-08 09:40:59.082	
[2025-07-08T16:40:59.081Z] [worker] [wawuQahOOFA] STARTING tech stack scan for noxmetals.co (parallel after endpoint discovery)
2025-07-08 09:40:59.082	
[2025-07-08T16:40:59.081Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-08 09:40:59.076	
[2025-07-08T16:40:59.075Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-08 09:40:59.075	
[2025-07-08T16:40:59.075Z] [nuclei] Starting enhanced vulnerability scan for noxmetals.co
2025-07-08 09:40:59.075	
[2025-07-08T16:40:59.074Z] [worker] [wawuQahOOFA] STARTING Nuclei vulnerability scan for noxmetals.co (parallel after endpoint discovery)
2025-07-08 09:40:59.075	
[2025-07-08T16:40:59.074Z] [worker] [wawuQahOOFA] COMPLETED endpoint discovery: 3 endpoint collections found
2025-07-08 09:40:59.075	
[2025-07-08T16:40:59.074Z] [endpointDiscovery] ⇢ done – 3 endpoints
2025-07-08 09:40:56.515	
[2025-07-08T16:40:56.515Z] [endpointDiscovery] +wordlist_enum /wordpress (403)
2025-07-08 09:40:48.132	
}
2025-07-08 09:40:48.132	
"EMAIL_SECURITY_GAP": 2
2025-07-08 09:40:48.132	
[2025-07-08T16:40:48.132Z] [SyncWorker] ✅ New findings synced: 2 {
2025-07-08 09:40:47.938	
}
2025-07-08 09:40:47.938	
]
2025-07-08 09:40:47.938	
"Realroots: failed"
2025-07-08 09:40:47.938	
"completed": [
2025-07-08 09:40:47.938	
[2025-07-08T16:40:47.937Z] [SyncWorker] ✅ Recently completed scans: 1 {
2025-07-08 09:40:45.903	
[2025-07-08T16:40:45.903Z] [dnstwist] Scan completed – 0 domains analysed
2025-07-08 09:40:45.903	
[2025-07-08T16:40:45.903Z] [dnstwist] Found 0 registered typosquat candidates to analyze
2025-07-08 09:40:28.292	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-07-08 09:40:28.290	
[2025-07-08T16:40:28.289Z] [documentExposure] Completed: 0 files found, 10 parallel Serper calls (~$0.030)
2025-07-08 09:40:26.810	
[2025-07-08T16:40:26.809Z] [documentExposure] Query 8 returned 9 results
2025-07-08 09:40:26.736	
[2025-07-08T16:40:26.736Z] [accessibilityScan] accessibility=skipped domain="noxmetals.co" reason="no_changes_detected"
2025-07-08 09:40:26.736	
[2025-07-08T16:40:26.736Z] [accessibilityScan] accessibility=no_change_detected domain="noxmetals.co" pages=5
2025-07-08 09:40:26.718	
[2025-07-08T16:40:26.718Z] [dynamicBrowser] Page operation completed in 149ms
2025-07-08 09:40:26.452	
[2025-07-08T16:40:26.451Z] [dynamicBrowser] Page operation completed in 360ms
2025-07-08 09:40:25.953	
[2025-07-08T16:40:25.953Z] [dynamicBrowser] Page operation completed in 564ms
2025-07-08 09:40:25.560	
[2025-07-08T16:40:25.559Z] [documentExposure] Query 7 returned 20 results
2025-07-08 09:40:25.262	
[2025-07-08T16:40:25.261Z] [dynamicBrowser] Page operation completed in 334ms
2025-07-08 09:40:24.892	
[2025-07-08T16:40:24.892Z] [documentExposure] Query 2 returned 19 results
2025-07-08 09:40:24.841	
[2025-07-08T16:40:24.840Z] [documentExposure] Query 3 returned 19 results
2025-07-08 09:40:24.744	
[2025-07-08T16:40:24.743Z] [dynamicBrowser] Page operation completed in 391ms
2025-07-08 09:40:24.646	
[2025-07-08T16:40:24.646Z] [documentExposure] Query 6 returned 0 results
2025-07-08 09:40:24.590	
[2025-07-08T16:40:24.590Z] [documentExposure] Query 9 returned 8 results
2025-07-08 09:40:24.524	
[2025-07-08T16:40:24.521Z] [documentExposure] Query 10 returned 0 results
2025-07-08 09:40:24.453	
[2025-07-08T16:40:24.453Z] [documentExposure] Query 4 returned 3 results
2025-07-08 09:40:24.393	
[2025-07-08T16:40:24.393Z] [documentExposure] Query 5 returned 1 results
2025-07-08 09:40:24.355	
[2025-07-08T16:40:24.352Z] [documentExposure] Query 1 returned 0 results
2025-07-08 09:40:24.298	
[2025-07-08T16:40:24.297Z] [dnstwist] ✅ Serper API: Found result for noxmetals.co - "NOX METALS..."
2025-07-08 09:40:24.116	
[2025-07-08T16:40:24.116Z] [breachDirectoryProbe] Breach probe completed: 0 findings in 2860ms
2025-07-08 09:40:24.090	
[2025-07-08T16:40:24.090Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=0, Total=0
2025-07-08 09:40:24.090	
[2025-07-08T16:40:24.089Z] [breachDirectoryProbe] LeakCheck response for noxmetals.co: 0 breached accounts, quota remaining: 999999
2025-07-08 09:40:24.072	
[2025-07-08T16:40:24.071Z] [dynamicBrowser] Browser launched successfully
2025-07-08 09:40:24.000	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-07-08 09:40:23.999	
[2025-07-08T16:40:23.998Z] [trufflehog] Finished secret scan for noxmetals.co Total secrets found: 0
2025-07-08 09:40:23.999	
[2025-07-08T16:40:23.998Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-wawuQahOOFA.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-wawuQahOOFA.json'
2025-07-08 09:40:23.999	
[2025-07-08T16:40:23.998Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-wawuQahOOFA.json
2025-07-08 09:40:23.999	
[2025-07-08T16:40:23.998Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-07-08 09:40:23.999	
[2025-07-08T16:40:23.997Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-07-08 09:40:23.998	
[2025-07-08T16:40:23.997Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-wawuQahOOFA.json'
2025-07-08 09:40:23.997	
[2025-07-08T16:40:23.997Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-wawuQahOOFA.json
2025-07-08 09:40:23.997	
[2025-07-08T16:40:23.997Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-07-08 09:40:23.589	
[2025-07-08T16:40:23.589Z] [documentExposure] Serper API call 10: ""Nox Metals" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-07-08 09:40:23.587	
[2025-07-08T16:40:23.587Z] [documentExposure] Serper API call 9: ""Nox Metals" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-07-08 09:40:23.586	
[2025-07-08T16:40:23.585Z] [documentExposure] Serper API call 8: ""Nox Metals" (intitle:"index of" OR intitle:"directory listing")"
2025-07-08 09:40:23.582	
[2025-07-08T16:40:23.582Z] [documentExposure] Serper API call 7: ""Nox Metals" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-07-08 09:40:23.578	
[2025-07-08T16:40:23.577Z] [documentExposure] Serper API call 6: ""Nox Metals" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-07-08 09:40:23.575	
[2025-07-08T16:40:23.575Z] [documentExposure] Serper API call 5: ""Nox Metals" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-07-08 09:40:23.573	
[2025-07-08T16:40:23.572Z] [documentExposure] Serper API call 4: ""Nox Metals" ("database" OR "backup" OR "dump") filetype:sql"
2025-07-08 09:40:23.570	
[2025-07-08T16:40:23.569Z] [documentExposure] Serper API call 3: ""Nox Metals" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-07-08 09:40:23.565	
[2025-07-08T16:40:23.564Z] [documentExposure] Serper API call 2: ""Nox Metals" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-07-08 09:40:23.560	
[2025-07-08T16:40:23.559Z] [documentExposure] Serper API call 1: "site:noxmetals.co (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-07-08 09:40:23.560	
[2025-07-08T16:40:23.559Z] [documentExposure] Starting 10 parallel Serper queries
2025-07-08 09:40:23.496	
[2025-07-08T16:40:23.495Z] [dnstwist] 🔍 Calling Serper API for noxmetals.co
2025-07-08 09:40:23.496	
[2025-07-08T16:40:23.495Z] [dnstwist] Fetching original site content for AI comparison
2025-07-08 09:40:23.494	
[2025-07-08T16:40:23.494Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-08 09:40:23.494	
[2025-07-08T16:40:23.494Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-08 09:40:23.494	
Saved $0.028 vs WhoisXML
2025-07-08 09:40:23.494	
[2025-07-08T16:40:23.493Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-08 09:40:23.491	
[2025-07-08T16:40:23.491Z] [tlsScan] Scan complete. Hosts: noxmetals.co, www.noxmetals.co. Findings: 0
2025-07-08 09:40:23.491	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 0 issue(s) found...
2025-07-08 09:40:23.249	
[2025-07-08T16:40:23.249Z] [tlsScan] Skipping false positive: "No SSL certificate presented" - Python validator confirmed valid certificate
2025-07-08 09:40:23.249	
[2025-07-08T16:40:23.248Z] [tlsScan] Cross-validation complete for www.noxmetals.co: 0 additional findings
2025-07-08 09:40:23.155	
[2025-07-08T16:40:23.154Z] [breachDirectoryProbe] Querying LeakCheck for domain: noxmetals.co
2025-07-08 09:40:22.382	
[2025-07-08T16:40:22.382Z] [endpointDiscovery] +crawl_link /cdn-cgi/l/email-protection (-)
2025-07-08 09:40:22.326	
[2025-07-08T16:40:22.325Z] [spfDmarc] Completed email security scan, found 2 issues
2025-07-08 09:40:22.308	
[2025-07-08T16:40:22.308Z] [tlsScan] Python validator: www.noxmetals.co - VALID
2025-07-08 09:40:22.304	
[2025-07-08T16:40:22.304Z] [spfDmarc] Checking for BIMI record...
2025-07-08 09:40:22.199	
[2025-07-08T16:40:22.198Z] [breachDirectoryProbe] Breach Directory response for noxmetals.co: 0 breached accounts
2025-07-08 09:40:22.139	
[2025-07-08T16:40:22.139Z] [tlsScan] Scanning www.noxmetals.co with hybrid validation (sslscan + Python)...
2025-07-08 09:40:22.139	
[2025-07-08T16:40:22.139Z] [tlsScan] Skipping false positive: "No SSL certificate presented" - Python validator confirmed valid certificate
2025-07-08 09:40:22.138	
[2025-07-08T16:40:22.138Z] [tlsScan] Cross-validation complete for noxmetals.co: 0 additional findings
2025-07-08 09:40:22.124	
[2025-07-08T16:40:22.122Z] [dynamicBrowser] Launching new browser instance
2025-07-08 09:40:22.124	
[2025-07-08T16:40:22.122Z] [dynamicBrowser] Initializing page semaphore with max 2 concurrent pages
2025-07-08 09:40:22.116	
[2025-07-08T16:40:22.116Z] [dynamicBrowser] Initializing page semaphore with max 2 concurrent pages
2025-07-08 09:40:22.115	
[2025-07-08T16:40:22.115Z] [accessibilityScan] accessibility=hash_computation domain="noxmetals.co" pages=15
2025-07-08 09:40:22.115	
[2025-07-08T16:40:22.115Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-07-08 09:40:21.775	
[2025-07-08T16:40:21.775Z] [spfDmarc] Probing for common DKIM selectors...
2025-07-08 09:40:21.766	
[2025-07-08T16:40:21.765Z] [Shodan] Done — 0 services found, 0 unique after deduplication, 1 API calls for 1 targets
2025-07-08 09:40:21.765	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 0 services found, 0 unique after deduplication...
2025-07-08 09:40:21.763	
[2025-07-08T16:40:21.763Z] [Shodan] API call 1 - search query
2025-07-08 09:40:21.760	
[2025-07-08T16:40:21.759Z] [endpointDiscovery] +robots.txt / (-)
2025-07-08 09:40:21.730	
[2025-07-08T16:40:21.729Z] [tlsScan] Python validator: noxmetals.co - VALID