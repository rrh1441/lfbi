2025-06-29 09:04:42.209	
[2025-06-29T16:04:42.209Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Lodging Source: 20 verified findings, 24 artifacts across 20 security modules
2025-06-29 09:04:42.209	
[queue] Updated job nZUtO_TcJjj status: done - Comprehensive security scan completed - 20 verified findings across 20 security modules. Findings ready for processing.
2025-06-29 09:04:41.474	
[2025-06-29T16:04:41.473Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-06-29 09:04:41.469	
[2025-06-29T16:04:41.468Z] [worker] [processScan] Counted 24 artifacts for scan nZUtO_TcJjj
2025-06-29 09:04:41.372	
[2025-06-29T16:04:41.372Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: progress
2025-06-29 09:04:41.371	
[2025-06-29T16:04:41.370Z] [worker] [nZUtO_TcJjj] COMPLETED secret detection: 0 secrets found
2025-06-29 09:04:41.370	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-06-29 09:04:41.368	
[2025-06-29T16:04:41.368Z] [trufflehog] Finished secret scan for lodging-source.com Total secrets found: 0
2025-06-29 09:04:41.368	
[2025-06-29T16:04:41.368Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-nZUtO_TcJjj.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-nZUtO_TcJjj.json'
2025-06-29 09:04:41.368	
[2025-06-29T16:04:41.368Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-nZUtO_TcJjj.json
2025-06-29 09:04:41.368	
[2025-06-29T16:04:41.368Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-06-29 09:04:41.368	
[2025-06-29T16:04:41.367Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-06-29 09:04:41.368	
[2025-06-29T16:04:41.367Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-nZUtO_TcJjj.json'
2025-06-29 09:04:41.281	
[2025-06-29T16:04:41.281Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-nZUtO_TcJjj.json
2025-06-29 09:04:41.281	
[2025-06-29T16:04:41.280Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-06-29 09:04:37.993	
[2025-06-29T16:04:37.992Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/main.js
2025-06-29 09:04:32.490	
[2025-06-29T16:04:32.490Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/bundle.js
2025-06-29 09:04:31.580	
[2025-06-29T16:04:31.579Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-06-29 09:04:31.580	
[2025-06-29T16:04:31.579Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-06-29 09:04:31.580	
[2025-06-29T16:04:31.579Z] [trufflehog] Starting targeted secret scan for domain: lodging-source.com
2025-06-29 09:04:31.579	
[2025-06-29T16:04:31.578Z] [worker] [nZUtO_TcJjj] STARTING TruffleHog secret detection for lodging-source.com
2025-06-29 09:04:31.579	
[2025-06-29T16:04:31.578Z] [worker] === Running module: trufflehog (20/20) ===
2025-06-29 09:04:31.578	
[2025-06-29T16:04:31.578Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:04:31.577	
[2025-06-29T16:04:31.577Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: progress
2025-06-29 09:04:31.576	
[2025-06-29T16:04:31.575Z] [worker] [nZUtO_TcJjj] COMPLETED rate limiting tests: 1 rate limit issues found
2025-06-29 09:04:31.576	
[artifactStore] Inserted scan_summary artifact: Rate limit scan completed: 1 issues found...
2025-06-29 09:04:31.574	
[artifactStore] Inserted finding RATE_LIMIT_BYPASS for artifact 3662
2025-06-29 09:04:31.573	
[artifactStore] Inserted rate_limit_bypass artifact: Rate limit bypass possible on endpoint: //www.youtube.com/pl...
2025-06-29 09:04:31.571	
[2025-06-29T16:04:31.570Z] [rateLimitScan] [VULNERABLE] Found 12 bypass techniques for https://lodging-source.com//www.youtube.com/player_api
2025-06-29 09:04:30.521	
}
2025-06-29 09:04:30.521	
"ACCESSIBILITY_VIOLATION": 6
2025-06-29 09:04:30.521	
[2025-06-29T16:04:30.520Z] [SyncWorker] ✅ New findings synced: 6 {
2025-06-29 09:04:26.432	
[2025-06-29T16:04:26.432Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com//www.youtube.com/player_api. Testing for bypasses...
2025-06-29 09:04:26.432	
[2025-06-29T16:04:26.430Z] [rateLimitScan] Response distribution for https://lodging-source.com//www.youtube.com/player_api: { '404': 25 }
2025-06-29 09:04:25.514	
[2025-06-29T16:04:25.514Z] [rateLimitScan] Establishing baseline for https://lodging-source.com//www.youtube.com/player_api...
2025-06-29 09:04:25.514	
[2025-06-29T16:04:25.513Z] [rateLimitScan] Found 1 endpoints to test.
2025-06-29 09:04:25.512	
[2025-06-29T16:04:25.512Z] [rateLimitScan] Starting comprehensive rate limit scan for lodging-source.com
2025-06-29 09:04:25.512	
[2025-06-29T16:04:25.512Z] [worker] [nZUtO_TcJjj] STARTING rate-limit tests for lodging-source.com
2025-06-29 09:04:25.512	
[2025-06-29T16:04:25.511Z] [worker] === Running module: rate_limit_scan (19/20) ===
2025-06-29 09:04:25.511	
[2025-06-29T16:04:25.511Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:04:25.510	
[2025-06-29T16:04:25.510Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: progress
2025-06-29 09:04:25.509	
[2025-06-29T16:04:25.509Z] [worker] [nZUtO_TcJjj] COMPLETED Nuclei scan: 1 vulnerabilities found
2025-06-29 09:04:25.509	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 1 vulnerabilities found...
2025-06-29 09:04:25.507	
[2025-06-29T16:04:25.507Z] [nuclei] Completed vulnerability scan. Total findings: 1
2025-06-29 09:04:25.507	
[2025-06-29T16:04:25.507Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-06-29 09:04:25.507	
[2025-06-29T16:04:25.507Z] [nuclei] Failed to parse result line: flag provided but not defined: -disable-ssl-verification
2025-06-29 09:04:25.507	
[2025-06-29T16:04:25.506Z] [nuclei] [Tag Scan] No vulnerabilities found for https://lodging-source.com (exit code 2 - success)
2025-06-29 09:04:25.408	
[2025-06-29T16:04:25.408Z] [nuclei] [Tag Scan] Running on https://lodging-source.com with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-29 09:04:25.407	
[2025-06-29T16:04:25.407Z] [nuclei] --- Starting Phase 1: Tag-based scans on 1 targets ---
2025-06-29 09:04:25.407	
[2025-06-29T16:04:25.407Z] [nuclei] Template update complete.
2025-06-29 09:04:25.407	
[INF] No new updates found for nuclei templates
2025-06-29 09:04:25.407	
projectdiscovery.io
2025-06-29 09:04:25.407	
/_/ /_/\__,_/\___/_/\___/_/   v3.4.5
2025-06-29 09:04:25.407	
/ / / / /_/ / /__/ /  __/ /
2025-06-29 09:04:25.407	
/ __ \/ / / / ___/ / _ \/ /
2025-06-29 09:04:25.407	
____  __  _______/ /__  (_)
2025-06-29 09:04:25.407	
__     _
2025-06-29 09:04:25.407	
[2025-06-29T16:04:25.406Z] [nuclei] Template update stderr:
2025-06-29 09:04:24.992	
[2025-06-29T16:04:24.992Z] [nuclei] Templates are outdated (> 24 hours). Updating...
2025-06-29 09:04:24.991	
[INF] PDCP Directory: /root/.pdcp
2025-06-29 09:04:24.991	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-06-29 09:04:24.991	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-06-29 09:04:24.991	
[2025-06-29T16:04:24.991Z] [nuclei] Version check stderr: [INF] Nuclei Engine Version: v3.4.5
2025-06-29 09:04:24.991	
[2025-06-29T16:04:24.991Z] [nuclei] Nuclei binary found.
2025-06-29 09:04:24.888	
[2025-06-29T16:04:24.888Z] [nuclei] Starting enhanced vulnerability scan for lodging-source.com
2025-06-29 09:04:24.888	
[2025-06-29T16:04:24.887Z] [worker] [nZUtO_TcJjj] STARTING Nuclei vulnerability scan for lodging-source.com
2025-06-29 09:04:24.887	
[2025-06-29T16:04:24.887Z] [worker] === Running module: nuclei (18/20) ===
2025-06-29 09:04:24.887	
[2025-06-29T16:04:24.887Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:04:24.886	
[2025-06-29T16:04:24.886Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: progress
2025-06-29 09:04:24.884	
[2025-06-29T16:04:24.884Z] [worker] [nZUtO_TcJjj] COMPLETED database scan: 0 database issues found
2025-06-29 09:04:24.884	
[artifactStore] Inserted scan_summary artifact: Database port scan completed: 0 exposed services found...
2025-06-29 09:04:24.879	
[2025-06-29T16:04:24.878Z] [dbPortScan] Completed database scan, found 0 exposed services
2025-06-29 09:04:20.785	
[2025-06-29T16:04:20.784Z] [dbPortScan] [1/8] Scanning lodging-source.com:27017...
2025-06-29 09:04:20.768	
[2025-06-29T16:04:20.768Z] [dbPortScan] [1/8] Scanning lodging-source.com:11211...
2025-06-29 09:04:20.764	
[2025-06-29T16:04:20.764Z] [dbPortScan] [1/8] Scanning lodging-source.com:9200...
2025-06-29 09:04:20.756	
[2025-06-29T16:04:20.756Z] [dbPortScan] [1/8] Scanning lodging-source.com:8086...
2025-06-29 09:04:16.621	
[2025-06-29T16:04:16.619Z] [dbPortScan] [1/8] Scanning lodging-source.com:6379...
2025-06-29 09:04:16.613	
[2025-06-29T16:04:16.611Z] [dbPortScan] [1/8] Scanning lodging-source.com:5432...
2025-06-29 09:04:16.606	
[2025-06-29T16:04:16.605Z] [dbPortScan] [1/8] Scanning lodging-source.com:3306...
2025-06-29 09:04:16.602	
[2025-06-29T16:04:16.602Z] [dbPortScan] [1/8] Scanning lodging-source.com:1433...
2025-06-29 09:04:16.289	
[2025-06-29T16:04:16.288Z] [dbPortScan] Validating dependencies...
2025-06-29 09:04:16.288	
[2025-06-29T16:04:16.288Z] [dbPortScan] Starting enhanced database security scan for lodging-source.com
2025-06-29 09:04:16.288	
[2025-06-29T16:04:16.287Z] [worker] [nZUtO_TcJjj] STARTING database port scan for lodging-source.com
2025-06-29 09:04:16.288	
[2025-06-29T16:04:16.287Z] [worker] === Running module: db_port_scan (17/20) ===
2025-06-29 09:04:16.287	
[2025-06-29T16:04:16.287Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:04:16.286	
[2025-06-29T16:04:16.286Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: progress
2025-06-29 09:04:16.285	
[2025-06-29T16:04:16.284Z] [worker] [nZUtO_TcJjj] COMPLETED typosquat analysis: 0 active typosquats detected
2025-06-29 09:04:16.285	
[2025-06-29T16:04:16.284Z] [worker] Skipping removed typosquatScorer module - functionality merged into dnsTwist
2025-06-29 09:04:16.284	
[2025-06-29T16:04:16.284Z] [worker] [nZUtO_TcJjj] STARTING typosquat analysis for lodging-source.com
2025-06-29 09:04:16.284	
[2025-06-29T16:04:16.284Z] [worker] === Running module: typosquat_scorer (16/20) ===
2025-06-29 09:04:16.284	
[2025-06-29T16:04:16.284Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:04:16.283	
[2025-06-29T16:04:16.283Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: progress
2025-06-29 09:04:16.281	
[2025-06-29T16:04:16.281Z] [worker] [nZUtO_TcJjj] COMPLETED email bruteforce surface scan: 0 email attack vectors found
2025-06-29 09:04:16.281	
[2025-06-29T16:04:16.280Z] [emailBruteforceSurface] No email services detected
2025-06-29 09:04:16.281	
[2025-06-29T16:04:16.280Z] [emailBruteforceSurface] Nuclei email scan completed: 0 findings
2025-06-29 09:04:16.280	
[2025-06-29T16:04:16.280Z] [emailBruteforceSurface] Failed to parse Nuclei result: flag provided but not defined: -disable-ssl-verification
2025-06-29 09:04:16.280	
[2025-06-29T16:04:16.280Z] [emailBruteforceSurface] Nuclei scan completed with no vulnerabilities found (exit code 2)
2025-06-29 09:04:16.174	
[2025-06-29T16:04:16.174Z] [emailBruteforceSurface] Running Nuclei with 10 email templates against 50 targets
2025-06-29 09:04:16.173	
[2025-06-29T16:04:16.173Z] [emailBruteforceSurface] Generated 408 email service targets
2025-06-29 09:04:16.171	
[2025-06-29T16:04:16.171Z] [emailBruteforceSurface] Starting email bruteforce surface scan for domain="lodging-source.com"
2025-06-29 09:04:16.170	
[2025-06-29T16:04:16.170Z] [worker] [nZUtO_TcJjj] STARTING email bruteforce surface scan for lodging-source.com
2025-06-29 09:04:16.170	
[2025-06-29T16:04:16.170Z] [worker] === Running module: email_bruteforce_surface (15/20) ===
2025-06-29 09:04:16.170	
[2025-06-29T16:04:16.170Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:04:16.169	
[2025-06-29T16:04:16.169Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: progress
2025-06-29 09:04:16.166	
[2025-06-29T16:04:16.166Z] [worker] [nZUtO_TcJjj] COMPLETED RDP/VPN templates scan: 0 remote access vulnerabilities found
2025-06-29 09:04:16.166	
[2025-06-29T16:04:16.166Z] [rdpVpnTemplates] No RDP/VPN vulnerabilities detected
2025-06-29 09:04:16.166	
[2025-06-29T16:04:16.166Z] [rdpVpnTemplates] Nuclei RDP/VPN scan completed: 0 findings
2025-06-29 09:04:16.166	
[2025-06-29T16:04:16.166Z] [rdpVpnTemplates] Failed to parse Nuclei result: flag provided but not defined: -disable-ssl-verification
2025-06-29 09:04:16.165	
[2025-06-29T16:04:16.165Z] [rdpVpnTemplates] Nuclei scan completed with no vulnerabilities found (exit code 2)
2025-06-29 09:04:13.294	
[2025-06-29T16:04:13.294Z] [rdpVpnTemplates] Running Nuclei with 11 RDP/VPN templates against 22 targets
2025-06-29 09:04:13.291	
[2025-06-29T16:04:13.291Z] [rdpVpnTemplates] Generated 22 target URLs for RDP/VPN scanning
2025-06-29 09:04:13.289	
[2025-06-29T16:04:13.289Z] [rdpVpnTemplates] Starting RDP/VPN templates scan for domain="lodging-source.com"
2025-06-29 09:04:13.288	
[2025-06-29T16:04:13.288Z] [worker] [nZUtO_TcJjj] STARTING RDP/VPN vulnerability templates for lodging-source.com
2025-06-29 09:04:13.288	
[2025-06-29T16:04:13.288Z] [worker] === Running module: rdp_vpn_templates (14/20) ===
2025-06-29 09:04:13.288	
[2025-06-29T16:04:13.288Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:04:13.283	
[2025-06-29T16:04:13.282Z] [worker] [nZUtO_TcJjj] COMPLETED accessibility scan: 6 WCAG violations found
2025-06-29 09:04:13.282	
[2025-06-29T16:04:13.282Z] [accessibilityScan] Accessibility scan completed: 6 findings from 4/15 pages in 197417ms
2025-06-29 09:04:13.282	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3659
2025-06-29 09:04:13.281	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3659
2025-06-29 09:04:13.280	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3659
2025-06-29 09:04:13.279	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3659
2025-06-29 09:04:13.278	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3659
2025-06-29 09:04:13.276	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3659
2025-06-29 09:04:13.274	
[artifactStore] Inserted accessibility_summary artifact: Accessibility scan: 24 violations across 4 pages (8 critical...
2025-06-29 09:04:13.248	
[2025-06-29T16:04:13.247Z] [accessibilityScan] Accessibility analysis complete: 24 violations (8 critical, 16 serious)
2025-06-29 09:04:12.225	
[2025-06-29T16:04:12.224Z] [dynamicBrowser] Page operation completed in 2082ms
2025-06-29 09:04:10.143	
[2025-06-29T16:04:10.142Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/help
2025-06-29 09:04:08.998	
[2025-06-29T16:04:08.996Z] [dynamicBrowser] Page operation completed in 2092ms
2025-06-29 09:04:06.906	
[2025-06-29T16:04:06.904Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/search
2025-06-29 09:04:05.750	
[2025-06-29T16:04:05.749Z] [dynamicBrowser] Page operation completed in 2113ms
2025-06-29 09:04:03.636	
[2025-06-29T16:04:03.636Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/join
2025-06-29 09:04:02.498	
[2025-06-29T16:04:02.497Z] [dynamicBrowser] Page operation completed in 2095ms
2025-06-29 09:04:00.402	
[2025-06-29T16:04:00.402Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/register
2025-06-29 09:03:59.251	
[2025-06-29T16:03:59.250Z] [dynamicBrowser] Page operation completed in 2108ms
2025-06-29 09:03:57.143	
[2025-06-29T16:03:57.142Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/login
2025-06-29 09:03:56.002	
[2025-06-29T16:03:56.001Z] [dynamicBrowser] Page operation completed in 2104ms
2025-06-29 09:03:53.898	
[2025-06-29T16:03:53.897Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/signup
2025-06-29 09:03:52.746	
[2025-06-29T16:03:52.745Z] [dynamicBrowser] Page operation completed in 2156ms
2025-06-29 09:03:50.599	
[2025-06-29T16:03:50.589Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/pricing
2025-06-29 09:03:49.429	
[2025-06-29T16:03:49.428Z] [dynamicBrowser] Page operation completed in 2106ms
2025-06-29 09:03:47.322	
[2025-06-29T16:03:47.322Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/products
2025-06-29 09:03:46.171	
[2025-06-29T16:03:46.170Z] [dynamicBrowser] Page operation completed in 2099ms
2025-06-29 09:03:44.071	
[2025-06-29T16:03:44.071Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/services
2025-06-29 09:03:42.919	
[2025-06-29T16:03:42.918Z] [dynamicBrowser] Page operation completed in 2091ms
2025-06-29 09:03:40.829	
[2025-06-29T16:03:40.827Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/about
2025-06-29 09:03:39.681	
[2025-06-29T16:03:39.680Z] [dynamicBrowser] Page operation completed in 2210ms
2025-06-29 09:03:37.471	
[2025-06-29T16:03:37.470Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/contact
2025-06-29 09:03:36.282	
[2025-06-29T16:03:36.281Z] [dynamicBrowser] Page operation completed in 43963ms
2025-06-29 09:03:36.279	
[2025-06-29T16:03:36.278Z] [accessibilityScan] Accessibility test complete for https://www.lodging-source.com/: 6 violations, 22 passes
2025-06-29 09:03:26.253	
[2025-06-29T16:03:26.253Z] [dynamicBrowser] Metrics: browser_rss_mb=120, heap_used_mb=66, pages_open=1
2025-06-29 09:02:56.252	
[2025-06-29T16:02:56.252Z] [dynamicBrowser] Metrics: browser_rss_mb=120, heap_used_mb=66, pages_open=1
2025-06-29 09:02:52.320	
[2025-06-29T16:02:52.318Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com/
2025-06-29 09:02:51.127	
[2025-06-29T16:02:51.126Z] [dynamicBrowser] Page operation completed in 44602ms
2025-06-29 09:02:51.127	
[2025-06-29T16:02:51.126Z] [accessibilityScan] Accessibility test complete for https://www.lodging-source.com: 6 violations, 22 passes
2025-06-29 09:02:26.250	
[2025-06-29T16:02:26.250Z] [dynamicBrowser] Metrics: browser_rss_mb=120, heap_used_mb=64, pages_open=1
2025-06-29 09:02:06.524	
[2025-06-29T16:02:06.524Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com
2025-06-29 09:02:05.345	
[2025-06-29T16:02:05.344Z] [dynamicBrowser] Page operation completed in 13397ms
2025-06-29 09:02:05.343	
[2025-06-29T16:02:05.343Z] [accessibilityScan] Accessibility test complete for https://lodging-source.com/: 6 violations, 22 passes
2025-06-29 09:01:56.250	
[2025-06-29T16:01:56.249Z] [dynamicBrowser] Metrics: browser_rss_mb=117, heap_used_mb=62, pages_open=1
2025-06-29 09:01:51.948	
[2025-06-29T16:01:51.947Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/
2025-06-29 09:01:50.738	
[2025-06-29T16:01:50.738Z] [dynamicBrowser] Page operation completed in 38034ms
2025-06-29 09:01:50.737	
[2025-06-29T16:01:50.735Z] [accessibilityScan] Accessibility test complete for https://lodging-source.com: 6 violations, 22 passes
2025-06-29 09:01:34.904	
[2025-06-29T16:01:34.904Z] [dynamicBrowser] Page script error: undefined
2025-06-29 09:01:34.904	
[2025-06-29T16:01:34.904Z] [dynamicBrowser] Page script error: undefined
2025-06-29 09:01:26.248	
[2025-06-29T16:01:26.248Z] [dynamicBrowser] Metrics: browser_rss_mb=113, heap_used_mb=59, pages_open=1
2025-06-29 09:01:25.169	
[2025-06-29T16:01:25.169Z] [worker] [nZUtO_TcJjj] COMPLETED tech stack scan: 0 technologies detected
2025-06-29 09:01:25.169	
[2025-06-29T16:01:25.169Z] [techStackScan] techstack=complete arts=0 time=29340ms
2025-06-29 09:01:25.169	
[artifactStore] Inserted techscan_metrics artifact: Technology scan metrics: 0 technologies, 0 supply chain risk...
2025-06-29 09:01:25.166	
[artifactStore] Inserted sbom_cyclonedx artifact: Software Bill of Materials (CycloneDX 1.5) - 0 components...
2025-06-29 09:01:25.122	
[2025-06-29T16:01:25.122Z] [techStackScan] techstack=converted url="https://lodging-source.com//www.youtube.com/player_api" techs=0
2025-06-29 09:01:25.122	
[2025-06-29T16:01:25.122Z] [techStackScan] techstack=nuclei_output url="https://lodging-source.com//www.youtube.com/player_api" lines=1 stdout_size=57
2025-06-29 09:01:25.122	
[2025-06-29T16:01:25.122Z] [techStackScan] techstack=nuclei_success url="https://lodging-source.com//www.youtube.com/player_api" no_findings=true
2025-06-29 09:01:25.121	
[2025-06-29T16:01:25.121Z] [techStackScan] techstack=converted url="https://maxcdn.bootstrapcdn.com" techs=0
2025-06-29 09:01:25.121	
[2025-06-29T16:01:25.121Z] [techStackScan] techstack=nuclei_output url="https://maxcdn.bootstrapcdn.com" lines=1 stdout_size=57
2025-06-29 09:01:25.121	
[2025-06-29T16:01:25.121Z] [techStackScan] techstack=nuclei_success url="https://maxcdn.bootstrapcdn.com" no_findings=true
2025-06-29 09:01:25.002	
[2025-06-29T16:01:25.002Z] [techStackScan] techstack=converted url="https://lodging-source.com/direct//" techs=0
2025-06-29 09:01:25.002	
[2025-06-29T16:01:25.001Z] [techStackScan] techstack=nuclei_output url="https://lodging-source.com/direct//" lines=1 stdout_size=57
2025-06-29 09:01:25.001	
[2025-06-29T16:01:25.001Z] [techStackScan] techstack=nuclei_success url="https://lodging-source.com/direct//" no_findings=true
2025-06-29 09:01:24.645	
[2025-06-29T16:01:24.645Z] [techStackScan] techstack=converted url="https://lodging-source.com" techs=0
2025-06-29 09:01:24.645	
[2025-06-29T16:01:24.641Z] [techStackScan] techstack=nuclei_output url="https://lodging-source.com" lines=1 stdout_size=57
2025-06-29 09:01:24.641	
[2025-06-29T16:01:24.641Z] [techStackScan] techstack=nuclei_success url="https://lodging-source.com" no_findings=true
2025-06-29 09:01:24.638	
[2025-06-29T16:01:24.638Z] [techStackScan] techstack=converted url="https://lodging-source.com/direct/index.php" techs=0
2025-06-29 09:01:24.638	
[2025-06-29T16:01:24.638Z] [techStackScan] techstack=nuclei_output url="https://lodging-source.com/direct/index.php" lines=1 stdout_size=57
2025-06-29 09:01:24.638	
[2025-06-29T16:01:24.638Z] [techStackScan] techstack=nuclei_success url="https://lodging-source.com/direct/index.php" no_findings=true
2025-06-29 09:01:24.638	
[2025-06-29T16:01:24.638Z] [techStackScan] techstack=nuclei_skip url="null" reason="invalid_url"
2025-06-29 09:01:24.638	
[2025-06-29T16:01:24.637Z] [techStackScan] techstack=converted url="https://www.lodging-source.com" techs=0
2025-06-29 09:01:24.637	
[2025-06-29T16:01:24.637Z] [techStackScan] techstack=nuclei_output url="https://www.lodging-source.com" lines=1 stdout_size=57
2025-06-29 09:01:24.637	
[2025-06-29T16:01:24.637Z] [techStackScan] techstack=nuclei_success url="https://www.lodging-source.com" no_findings=true
2025-06-29 09:01:24.624	
[2025-06-29T16:01:24.624Z] [techStackScan] techstack=nuclei url="https://maxcdn.bootstrapcdn.com"
2025-06-29 09:01:24.623	
[2025-06-29T16:01:24.623Z] [techStackScan] techstack=converted url="https://lodging-source.com/index.html" techs=0
2025-06-29 09:01:24.622	
[2025-06-29T16:01:24.622Z] [techStackScan] techstack=nuclei_output url="https://lodging-source.com/index.html" lines=1 stdout_size=57
2025-06-29 09:01:24.622	
[2025-06-29T16:01:24.622Z] [techStackScan] techstack=nuclei_success url="https://lodging-source.com/index.html" no_findings=true
2025-06-29 09:01:24.617	
[2025-06-29T16:01:24.615Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct//"
2025-06-29 09:01:24.617	
[2025-06-29T16:01:24.615Z] [techStackScan] techstack=converted url="https://lodging-source.com/" techs=0
2025-06-29 09:01:24.617	
[2025-06-29T16:01:24.615Z] [techStackScan] techstack=nuclei_output url="https://lodging-source.com/" lines=1 stdout_size=57
2025-06-29 09:01:24.611	
[2025-06-29T16:01:24.611Z] [techStackScan] techstack=nuclei_success url="https://lodging-source.com/" no_findings=true
2025-06-29 09:01:24.605	
[2025-06-29T16:01:24.604Z] [techStackScan] techstack=nuclei url="https://lodging-source.com//www.youtube.com/player_api"
2025-06-29 09:01:24.604	
[2025-06-29T16:01:24.604Z] [techStackScan] techstack=converted url="https://lodging-source.com/home.html" techs=0
2025-06-29 09:01:24.603	
[2025-06-29T16:01:24.602Z] [techStackScan] techstack=nuclei_output url="https://lodging-source.com/home.html" lines=1 stdout_size=57
2025-06-29 09:01:24.602	
[2025-06-29T16:01:24.602Z] [techStackScan] techstack=nuclei_success url="https://lodging-source.com/home.html" no_findings=true
2025-06-29 09:01:20.629	
[2025-06-29T16:01:20.629Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/home.html"
2025-06-29 09:01:20.621	
[2025-06-29T16:01:20.621Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct/index.php"
2025-06-29 09:01:20.613	
[2025-06-29T16:01:20.613Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/"
2025-06-29 09:01:20.604	
[2025-06-29T16:01:20.603Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/index.html"
2025-06-29 09:01:20.591	
[2025-06-29T16:01:20.591Z] [techStackScan] techstack=nuclei url="https://www.lodging-source.com"
2025-06-29 09:01:20.583	
[2025-06-29T16:01:20.582Z] [techStackScan] techstack=nuclei url="https://lodging-source.com"
2025-06-29 09:01:20.582	
[2025-06-29T16:01:20.581Z] [techStackScan] techstack=targets primary=8 thirdParty=2 total=10
2025-06-29 09:01:20.476	
[2025-06-29T16:01:20.475Z] [dynamicBrowser] Page operation completed in 7751ms
2025-06-29 09:01:20.475	
[2025-06-29T16:01:20.475Z] [techStackScan] thirdParty=discovered domain=lodging-source.com origins=2
2025-06-29 09:01:12.705	
[2025-06-29T16:01:12.704Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com
2025-06-29 09:01:12.705	
[2025-06-29T16:01:12.704Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com
2025-06-29 09:01:10.422	
[2025-06-29T16:01:10.420Z] [dynamicBrowser] Browser launched successfully
2025-06-29 09:01:10.422	
[2025-06-29T16:01:10.420Z] [dynamicBrowser] Browser launched successfully
2025-06-29 09:01:00.647	
[2025-06-29T16:01:00.646Z] [techStackScan] buildTargets discovered=6 total=8
2025-06-29 09:01:00.643	
[2025-06-29T16:01:00.642Z] [techStackScan] techstack=nuclei confirmed available
2025-06-29 09:00:56.246	
[2025-06-29T16:00:56.246Z] [dynamicBrowser] Launching new browser instance
2025-06-29 09:00:56.246	
[2025-06-29T16:00:56.245Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-29 09:00:56.244	
[2025-06-29T16:00:56.244Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-29 09:00:56.243	
[2025-06-29T16:00:56.243Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-06-29 09:00:55.876	
[2025-06-29T16:00:55.875Z] [worker] [nZUtO_TcJjj] COMPLETED AbuseIPDB scan: 0 malicious/suspicious IPs found
2025-06-29 09:00:55.876	
[2025-06-29T16:00:55.875Z] [abuseIntelScan] No IP artifacts found for this scan
2025-06-29 09:00:55.876	
[2025-06-29T16:00:55.875Z] [abuseIntelScan] Found 0 IP artifacts for scan nZUtO_TcJjj
2025-06-29 09:00:55.875	
[2025-06-29T16:00:55.874Z] [worker] [nZUtO_TcJjj] COMPLETED denial-of-wallet scan: 0 cost amplification vulnerabilities found
2025-06-29 09:00:55.875	
[2025-06-29T16:00:55.874Z] [denialWalletScan] Denial-of-wallet scan completed: 0 findings in 3ms
2025-06-29 09:00:55.875	
[2025-06-29T16:00:55.874Z] [denialWalletScan] Filtered to 0 potential cost-amplification endpoints
2025-06-29 09:00:55.875	
[2025-06-29T16:00:55.874Z] [denialWalletScan] Found 6 endpoints from endpoint discovery
2025-06-29 09:00:55.873	
[2025-06-29T16:00:55.873Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=nZUtO_TcJjj
2025-06-29 09:00:55.873	
[2025-06-29T16:00:55.872Z] [worker] [nZUtO_TcJjj] STARTING AbuseIPDB intelligence scan for IPs
2025-06-29 09:00:55.873	
[2025-06-29T16:00:55.872Z] [worker] === Running module (Phase 2C): abuse_intel_scan ===
2025-06-29 09:00:55.872	
[2025-06-29T16:00:55.872Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:00:55.872	
[2025-06-29T16:00:55.871Z] [denialWalletScan] Starting denial-of-wallet scan for domain="lodging-source.com"
2025-06-29 09:00:55.871	
[2025-06-29T16:00:55.870Z] [worker] [nZUtO_TcJjj] STARTING denial-of-wallet vulnerability scan for lodging-source.com
2025-06-29 09:00:55.871	
[2025-06-29T16:00:55.870Z] [worker] === Running module (Phase 2C): denial_wallet_scan ===
2025-06-29 09:00:55.871	
[2025-06-29T16:00:55.870Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:00:55.866	
[2025-06-29T16:00:55.865Z] [accessibilityScan] Starting accessibility scan for domain="lodging-source.com"
2025-06-29 09:00:55.864	
[2025-06-29T16:00:55.864Z] [worker] [nZUtO_TcJjj] STARTING accessibility compliance scan for lodging-source.com
2025-06-29 09:00:55.864	
[2025-06-29T16:00:55.864Z] [worker] === Running module (Phase 2C): accessibility_scan ===
2025-06-29 09:00:55.864	
[2025-06-29T16:00:55.863Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:00:55.829	
[2025-06-29T16:00:55.829Z] [techStackScan] techstack=start domain=lodging-source.com
2025-06-29 09:00:55.829	
[2025-06-29T16:00:55.828Z] [worker] [nZUtO_TcJjj] STARTING tech stack scan for lodging-source.com
2025-06-29 09:00:55.828	
[2025-06-29T16:00:55.828Z] [worker] === Running module (Phase 2C): tech_stack_scan ===
2025-06-29 09:00:55.828	
[2025-06-29T16:00:55.828Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:00:55.821	
[2025-06-29T16:00:55.820Z] [worker] [nZUtO_TcJjj] COMPLETED endpoint discovery: 6 endpoint collections found
2025-06-29 09:00:55.820	
[2025-06-29T16:00:55.820Z] [endpointDiscovery] ⇢ done – 6 endpoints
2025-06-29 09:00:55.820	
[artifactStore] Inserted discovered_endpoints artifact: Discovered 6 unique endpoints for lodging-source.com...
2025-06-29 09:00:30.390	
}
2025-06-29 09:00:30.390	
"TYPOSQUAT_REDIRECT": 1
2025-06-29 09:00:30.390	
[2025-06-29T16:00:30.389Z] [SyncWorker] ✅ New findings synced: 1 {
2025-06-29 09:00:20.252	
[2025-06-29T16:00:20.251Z] [endpointDiscovery] +crawl_link /direct// (-)
2025-06-29 09:00:18.983	
[2025-06-29T16:00:18.983Z] [endpointDiscovery] +js_analysis //www.youtube.com/player_api (-)
2025-06-29 09:00:18.626	
[2025-06-29T16:00:18.626Z] [endpointDiscovery] +crawl_link /home.html (-)
2025-06-29 09:00:18.626	
[2025-06-29T16:00:18.626Z] [endpointDiscovery] +crawl_link /direct/index.php (-)
2025-06-29 09:00:18.626	
[2025-06-29T16:00:18.626Z] [endpointDiscovery] +crawl_link / (-)
2025-06-29 09:00:18.626	
[2025-06-29T16:00:18.625Z] [endpointDiscovery] +crawl_link /index.html (-)
2025-06-29 09:00:18.187	
[2025-06-29T16:00:18.185Z] [endpointDiscovery] ⇢ start lodging-source.com
2025-06-29 09:00:18.187	
[2025-06-29T16:00:18.185Z] [worker] [nZUtO_TcJjj] STARTING endpoint discovery for lodging-source.com
2025-06-29 09:00:18.185	
[2025-06-29T16:00:18.185Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 09:00:18.179	
[2025-06-29T16:00:18.179Z] [worker] === Running endpoint discovery ===
2025-06-29 09:00:18.179	
[2025-06-29T16:00:18.179Z] [worker] [nZUtO_TcJjj] COMPLETED DNS Twist: 5 typo-domains found
2025-06-29 09:00:18.179	
[2025-06-29T16:00:18.179Z] [dnstwist] Scan completed – 5 domains analysed
2025-06-29 09:00:18.179	
[artifactStore] Inserted finding TYPOSQUAT_REDIRECT for artifact 3655
2025-06-29 09:00:18.177	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgings...
2025-06-29 08:59:30.127	
}
2025-06-29 08:59:30.127	
]
2025-06-29 08:59:30.127	
"Lodging Source: dns_twist_phase2a (20%)"
2025-06-29 08:59:30.127	
"progress": [
2025-06-29 08:59:30.127	
[2025-06-29T15:59:30.126Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-29 08:58:47.388	
[2025-06-29T15:58:47.387Z] [worker] [nZUtO_TcJjj] COMPLETED document exposure: 0 discoveries
2025-06-29 08:58:47.388	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-06-29 08:58:47.370	
[2025-06-29T15:58:47.368Z] [documentExposure] Completed: 0 files found, 10 Serper calls (~$0.030)
2025-06-29 08:58:47.369	
[2025-06-29T15:58:47.368Z] [documentExposure] Reached search query limit (10) - stopping to control costs
2025-06-29 08:58:45.867	
[2025-06-29T15:58:45.867Z] [documentExposure] Serper returned 0 results for query 10
2025-06-29 08:58:38.350	
[2025-06-29T15:58:38.348Z] [documentExposure] Serper API call 10: ""Lodging Source" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-06-29 08:58:38.350	
[2025-06-29T15:58:38.348Z] [documentExposure] Serper API call 10: ""Lodging Source" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-06-29 08:58:36.183	
[2025-06-29T15:58:36.183Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-29 08:58:36.183	
[2025-06-29T15:58:36.183Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-29 08:58:32.878	
[2025-06-29T15:58:32.877Z] [documentExposure] Serper returned 7 results for query 9
2025-06-29 08:58:31.489	
[2025-06-29T15:58:31.487Z] [documentExposure] Serper API call 9: ""Lodging Source" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-06-29 08:58:30.308	
}
2025-06-29 08:58:30.308	
"PHISHING_SETUP": 4
2025-06-29 08:58:30.308	
"MISSING_TLS_CERTIFICATE": 1,
2025-06-29 08:58:30.308	
"TLS_CONFIGURATION_ISSUE": 2,
2025-06-29 08:58:30.308	
[2025-06-29T15:58:30.307Z] [SyncWorker] ✅ New findings synced: 7 {
2025-06-29 08:58:30.162	
}
2025-06-29 08:58:30.162	
]
2025-06-29 08:58:30.162	
"Lodging Source: dns_twist_phase2a (20%)"
2025-06-29 08:58:30.162	
"progress": [
2025-06-29 08:58:30.162	
[2025-06-29T15:58:30.162Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-29 08:58:28.799	
[2025-06-29T15:58:28.799Z] [documentExposure] Serper returned 8 results for query 8
2025-06-29 08:58:27.525	
[2025-06-29T15:58:27.523Z] [documentExposure] Serper API call 8: ""Lodging Source" (intitle:"index of" OR intitle:"directory listing")"
2025-06-29 08:58:26.022	
[2025-06-29T15:58:26.022Z] [documentExposure] Serper returned 10 results for query 7
2025-06-29 08:58:24.963	
[2025-06-29T15:58:24.962Z] [documentExposure] Serper API call 7: ""Lodging Source" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-06-29 08:58:22.728	
[2025-06-29T15:58:22.727Z] [documentExposure] Serper returned 1 results for query 6
2025-06-29 08:58:22.108	
[2025-06-29T15:58:22.107Z] [documentExposure] Serper API call 6: ""Lodging Source" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-06-29 08:58:20.605	
[2025-06-29T15:58:20.605Z] [documentExposure] Serper returned 2 results for query 5
2025-06-29 08:58:19.991	
[2025-06-29T15:58:19.989Z] [documentExposure] Serper API call 5: ""Lodging Source" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-06-29 08:58:18.488	
[2025-06-29T15:58:18.488Z] [documentExposure] Serper returned 10 results for query 4
2025-06-29 08:58:17.664	
[2025-06-29T15:58:17.661Z] [documentExposure] Serper API call 4: ""Lodging Source" ("database" OR "backup" OR "dump") filetype:sql"
2025-06-29 08:58:15.993	
[2025-06-29T15:58:15.993Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-29 08:58:15.205	
[2025-06-29T15:58:15.205Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-29 08:58:14.189	
[2025-06-29T15:58:14.182Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-29 08:58:11.376	
[2025-06-29T15:58:11.376Z] [documentExposure] Serper returned 19 results for query 3
2025-06-29 08:58:10.490	
[2025-06-29T15:58:10.488Z] [documentExposure] Serper API call 3: ""Lodging Source" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-06-29 08:58:08.777	
[2025-06-29T15:58:08.776Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-29 08:58:08.162	
[2025-06-29T15:58:08.161Z] [documentExposure] process error: Request failed with status code 403
2025-06-29 08:58:07.153	
[2025-06-29T15:58:07.152Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-29 08:58:06.534	
[2025-06-29T15:58:06.533Z] [documentExposure] process error: timeout of 30000ms exceeded
2025-06-29 08:58:04.593	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3653
2025-06-29 08:58:04.591	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-29 08:58:04.479	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3652
2025-06-29 08:58:04.477	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgin.g...
2025-06-29 08:58:04.250	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3651
2025-06-29 08:58:04.249	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-29 08:58:03.752	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3650
2025-06-29 08:58:03.750	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-29 08:58:03.451	
[2025-06-29T15:58:03.450Z] [dnstwist] Batch 1/1
2025-06-29 08:58:03.451	
[2025-06-29T15:58:03.450Z] [dnstwist] Found 5 registered typosquat candidates to analyze
2025-06-29 08:57:41.298	
[2025-06-29T15:57:41.298Z] [worker] [nZUtO_TcJjj] COMPLETED TLS scan: 3 TLS issues found
2025-06-29 08:57:41.298	
[2025-06-29T15:57:41.298Z] [tlsScan] Scan complete. Hosts: lodging-source.com, www.lodging-source.com. Findings: 3
2025-06-29 08:57:41.298	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 3 issue(s) found...
2025-06-29 08:57:41.290	
[artifactStore] Inserted finding MISSING_TLS_CERTIFICATE for artifact 3648
2025-06-29 08:57:41.289	
[artifactStore] Inserted tls_no_certificate artifact: lodging-source.com - no valid SSL/TLS certificate on any hos...
2025-06-29 08:57:41.288	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 3647
2025-06-29 08:57:41.286	
[artifactStore] Inserted tls_configuration artifact: www.lodging-source.com - Incomplete SSL certificate chain (m...
2025-06-29 08:57:41.263	
[2025-06-29T15:57:41.262Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-29 08:57:40.987	
[2025-06-29T15:57:40.987Z] [tlsScan] Cross-validation complete for www.lodging-source.com: 0 additional findings
2025-06-29 08:57:30.512	
[2025-06-29T15:57:30.511Z] [tlsScan] Python validator: www.lodging-source.com - INVALID
2025-06-29 08:57:30.307	
}
2025-06-29 08:57:30.307	
"CRITICAL_INFOSTEALER": 1
2025-06-29 08:57:30.307	
"MEDIUM_EMAIL_EXPOSED": 56,
2025-06-29 08:57:30.307	
"HIGH_PASSWORD_EXPOSED": 6,
2025-06-29 08:57:30.307	
[2025-06-29T15:57:30.307Z] [SyncWorker] ✅ New compromised credentials synced: 63 {
2025-06-29 08:57:30.254	
[2025-06-29T15:57:30.254Z] [tlsScan] Scanning www.lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-29 08:57:30.254	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 3646
2025-06-29 08:57:30.253	
[artifactStore] Inserted tls_configuration artifact: lodging-source.com - Incomplete SSL certificate chain (missi...
2025-06-29 08:57:30.251	
[2025-06-29T15:57:30.250Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-29 08:57:30.182	
}
2025-06-29 08:57:30.182	
"EXPOSED_SERVICE": 1
2025-06-29 08:57:30.182	
"EMAIL_SECURITY_WEAKNESS": 1,
2025-06-29 08:57:30.182	
"EMAIL_EXPOSURE": 1,
2025-06-29 08:57:30.182	
"PASSWORD_BREACH": 1,
2025-06-29 08:57:30.182	
"INFOSTEALER_BREACH": 1,
2025-06-29 08:57:30.182	
[2025-06-29T15:57:30.182Z] [SyncWorker] ✅ New findings synced: 5 {
2025-06-29 08:57:30.045	
}
2025-06-29 08:57:30.045	
]
2025-06-29 08:57:30.045	
"Lodging Source: dns_twist_phase2a (20%)"
2025-06-29 08:57:30.045	
"progress": [
2025-06-29 08:57:30.045	
[2025-06-29T15:57:30.044Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-29 08:57:30.008	
[2025-06-29T15:57:30.008Z] [tlsScan] Cross-validation complete for lodging-source.com: 0 additional findings
2025-06-29 08:57:26.504	
[2025-06-29T15:57:26.504Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-29 08:57:25.311	
[2025-06-29T15:57:25.311Z] [documentExposure] Serper returned 10 results for query 2
2025-06-29 08:57:24.238	
[2025-06-29T15:57:24.238Z] [documentExposure] Serper API call 2: ""Lodging Source" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-06-29 08:57:22.738	
[2025-06-29T15:57:22.737Z] [documentExposure] Serper returned 0 results for query 1
2025-06-29 08:57:21.474	
[2025-06-29T15:57:21.474Z] [worker] [nZUtO_TcJjj] COMPLETED Shodan infrastructure scan: 2 services found
2025-06-29 08:57:21.474	
[2025-06-29T15:57:21.473Z] [Shodan] Done — 2 rows persisted, 1 API calls used for 1 targets
2025-06-29 08:57:21.473	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 2 items...
2025-06-29 08:57:21.470	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 3644
2025-06-29 08:57:21.468	
[artifactStore] Inserted shodan_service artifact: 70.35.206.233:443 Apache httpd 2.4.62...
2025-06-29 08:57:21.465	
[2025-06-29T15:57:21.464Z] [Shodan] API call 1 - search query
2025-06-29 08:57:21.031	
[2025-06-29T15:57:21.031Z] [documentExposure] Serper API call 1: "site:lodging-source.com (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-06-29 08:57:19.739	
[2025-06-29T15:57:19.739Z] [worker] [nZUtO_TcJjj] COMPLETED email security scan: 1 email issues found
2025-06-29 08:57:19.739	
[2025-06-29T15:57:19.739Z] [spfDmarc] Completed email security scan, found 1 issues
2025-06-29 08:57:19.739	
[artifactStore] Inserted bimi_missing artifact: BIMI record not found...
2025-06-29 08:57:19.709	
[2025-06-29T15:57:19.708Z] [spfDmarc] Checking for BIMI record...
2025-06-29 08:57:19.709	
[2025-06-29T15:57:19.707Z] [spfDmarc] Found DKIM record with selector: default
2025-06-29 08:57:19.674	
[2025-06-29T15:57:19.674Z] [spfDmarc] Probing for common DKIM selectors...
2025-06-29 08:57:19.552	
[2025-06-29T15:57:19.551Z] [tlsScan] Python validator: lodging-source.com - INVALID
2025-06-29 08:57:19.307	
[2025-06-29T15:57:19.305Z] [spfDmarc] Performing recursive SPF check...
2025-06-29 08:57:19.297	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 3642
2025-06-29 08:57:19.290	
[artifactStore] Inserted dmarc_weak artifact: DMARC policy is not enforcing...
2025-06-29 08:57:19.193	
[2025-06-29T15:57:19.192Z] [dnstwist] WHOIS enrichment disabled (saves ~$0.30-0.75 per scan) - set ENABLE_WHOIS_ENRICHMENT=true to enable
2025-06-29 08:57:19.192	
[2025-06-29T15:57:19.191Z] [dnstwist] Starting typosquat scan for lodging-source.com
2025-06-29 08:57:19.191	
[2025-06-29T15:57:19.191Z] [worker] [nZUtO_TcJjj] STARTING DNS Twist scan for lodging-source.com
2025-06-29 08:57:19.191	
[2025-06-29T15:57:19.190Z] [worker] === Running module (Phase 2A): dns_twist ===
2025-06-29 08:57:19.190	
[2025-06-29T15:57:19.189Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 08:57:19.184	
[2025-06-29T15:57:19.182Z] [spfDmarc] Checking DMARC record...
2025-06-29 08:57:19.179	
[2025-06-29T15:57:19.179Z] [spfDmarc] Starting email security scan for lodging-source.com
2025-06-29 08:57:19.179	
[2025-06-29T15:57:19.178Z] [worker] [nZUtO_TcJjj] STARTING SPF/DMARC email security scan for lodging-source.com
2025-06-29 08:57:19.179	
[2025-06-29T15:57:19.178Z] [worker] === Running module (Phase 2A): spf_dmarc ===
2025-06-29 08:57:19.178	
[2025-06-29T15:57:19.178Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 08:57:19.178	
[2025-06-29T15:57:19.178Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-06-29 08:57:19.176	
[2025-06-29T15:57:19.175Z] [worker] [nZUtO_TcJjj] STARTING document exposure scan for Lodging Source
2025-06-29 08:57:19.176	
[2025-06-29T15:57:19.175Z] [worker] === Running module (Phase 2A): document_exposure ===
2025-06-29 08:57:19.175	
[2025-06-29T15:57:19.175Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 08:57:19.162	
[2025-06-29T15:57:19.162Z] [tlsScan] Scanning lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-29 08:57:19.162	

2025-06-29 08:57:19.162	
OpenSSL 3.5.0 8 Apr 2025
2025-06-29 08:57:19.162	
[2025-06-29T15:57:19.161Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-06-29 08:57:19.150	
[2025-06-29T15:57:19.149Z] [worker] [nZUtO_TcJjj] STARTING TLS security scan for lodging-source.com
2025-06-29 08:57:19.150	
[2025-06-29T15:57:19.149Z] [worker] === Running module (Phase 2A): tls_scan ===
2025-06-29 08:57:19.149	
[2025-06-29T15:57:19.149Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 08:57:19.113	
[2025-06-29T15:57:19.113Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-06-29 08:57:19.112	
[2025-06-29T15:57:19.112Z] [worker] [nZUtO_TcJjj] COMPLETED Censys platform scan: 0 services found
2025-06-29 08:57:19.112	
[nZUtO_TcJjj] Censys scan skipped - CENSYS_PAT and CENSYS_ORG_ID not configured (saves ~$2-10 per scan)
2025-06-29 08:57:19.111	
[2025-06-29T15:57:19.111Z] [worker] [nZUtO_TcJjj] STARTING Censys platform scan for lodging-source.com
2025-06-29 08:57:19.111	
[2025-06-29T15:57:19.111Z] [worker] === Running module (Phase 2A): censys ===
2025-06-29 08:57:19.111	
[2025-06-29T15:57:19.111Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 08:57:19.111	
[2025-06-29T15:57:19.110Z] [Shodan] Start scan for lodging-source.com
2025-06-29 08:57:19.110	
[2025-06-29T15:57:19.110Z] [worker] [nZUtO_TcJjj] STARTING Shodan scan for lodging-source.com
2025-06-29 08:57:19.110	
[2025-06-29T15:57:19.110Z] [worker] === Running module (Phase 2A): shodan ===
2025-06-29 08:57:19.110	
[2025-06-29T15:57:19.110Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 08:57:19.107	
[2025-06-29T15:57:19.107Z] [worker] [nZUtO_TcJjj] COMPLETED SpiderFoot discovery: 7 targets found
2025-06-29 08:57:19.107	
[2025-06-29T15:57:19.107Z] [SpiderFoot] ✔️ Completed – 7 artifacts
2025-06-29 08:57:19.107	
[artifactStore] Inserted scan_summary artifact: SpiderFoot scan completed: 7 artifacts...
2025-06-29 08:57:19.106	
[artifactStore] Inserted intel artifact: GoDaddy.com, LLC...
2025-06-29 08:57:19.104	
Registry Domain ID: 1...
2025-06-29 08:57:19.104	
[artifactStore] Inserted intel artifact:    Domain Name: LODGING-SOURCE.COM
2025-06-29 08:57:19.102	
[artifactStore] Inserted intel artifact: 74.208.42.246...
2025-06-29 08:57:19.101	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-29 08:57:19.100	
[artifactStore] Inserted intel artifact: support@lodging-source.com...
2025-06-29 08:57:19.098	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-29 08:57:19.097	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-29 08:57:19.094	
[2025-06-29T15:57:19.094Z] [SpiderFoot] Raw output size: 8032 bytes
2025-06-29 08:57:12.611	
[2025-06-29T15:57:12.611Z] [worker] [nZUtO_TcJjj] COMPLETED Breach Directory probe: 3 breach findings
2025-06-29 08:57:12.611	
[2025-06-29T15:57:12.611Z] [breachDirectoryProbe] Breach probe completed: 3 findings in 1732ms
2025-06-29 08:57:12.611	
[artifactStore] Inserted finding EMAIL_EXPOSURE for artifact 3633
2025-06-29 08:57:12.608	
[artifactStore] Inserted finding PASSWORD_BREACH for artifact 3633
2025-06-29 08:57:12.605	
[artifactStore] Inserted finding INFOSTEALER_BREACH for artifact 3633
2025-06-29 08:57:12.601	
[artifactStore] Inserted breach_directory_summary artifact: Breach probe: 63 total breached accounts (BD: 0, LC: 63) for...
2025-06-29 08:57:12.591	
[2025-06-29T15:57:12.590Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=63, Total=63
2025-06-29 08:57:12.588	
[2025-06-29T15:57:12.587Z] [breachDirectoryProbe] LeakCheck response for lodging-source.com: 63 breached accounts, quota remaining: 999999
2025-06-29 08:57:11.988	
[2025-06-29T15:57:11.987Z] [breachDirectoryProbe] Querying LeakCheck for domain: lodging-source.com
2025-06-29 08:57:11.636	
[2025-06-29T15:57:11.636Z] [breachDirectoryProbe] Breach Directory response for lodging-source.com: 0 breached accounts
2025-06-29 08:57:10.881	
[2025-06-29T15:57:10.881Z] [breachDirectoryProbe] Querying Breach Directory for domain: lodging-source.com
2025-06-29 08:57:10.879	
[2025-06-29T15:57:10.879Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="lodging-source.com" (BreachDirectory + LeakCheck)
2025-06-29 08:57:10.878	
[2025-06-29T15:57:10.878Z] [worker] [nZUtO_TcJjj] STARTING Breach Directory intelligence probe for lodging-source.com
2025-06-29 08:57:10.878	
[2025-06-29T15:57:10.878Z] [worker] === Running module (Phase 1): breach_directory_probe ===
2025-06-29 08:57:10.877	
[2025-06-29T15:57:10.877Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 08:57:10.863	
[2025-06-29T15:57:10.863Z] [SpiderFoot] Command: python3 /opt/spiderfoot/sf.py -q -s lodging-source.com -m sfp_crtsh,sfp_sublist3r,sfp_chaos,sfp_r7_dns,sfp_haveibeenpwnd,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei,sfp_whois,sfp_dnsresolve -o json
2025-06-29 08:57:10.862	
[2025-06-29T15:57:10.861Z] [SpiderFoot] API keys: HIBP ✅, Chaos ✅ (Shodan/Censys handled by dedicated modules)
2025-06-29 08:57:10.855	
[2025-06-29T15:57:10.855Z] [SpiderFoot] Starting scan for lodging-source.com (scanId=nZUtO_TcJjj)
2025-06-29 08:57:10.854	
[2025-06-29T15:57:10.854Z] [worker] [nZUtO_TcJjj] STARTING SpiderFoot discovery for lodging-source.com
2025-06-29 08:57:10.854	
[2025-06-29T15:57:10.854Z] [worker] === Running module (Phase 1): spiderfoot ===
2025-06-29 08:57:10.854	
[2025-06-29T15:57:10.854Z] [worker] [updateScanMasterStatus] Updated scan nZUtO_TcJjj with: status, current_module, progress
2025-06-29 08:57:10.847	
[queue] Updated job nZUtO_TcJjj status: processing - Comprehensive security discovery in progress...
2025-06-29 08:57:10.680	
[2025-06-29T15:57:10.679Z] [worker] Processing comprehensive security scan for Lodging Source (lodging-source.com)
2025-06-29 08:57:10.679	
[2025-06-29T15:57:10.679Z] [worker] ✅ JOB PICKED UP: Processing scan job nZUtO_TcJjj for Lodging Source (lodging-source.com)
2025-06-29 08:57:10.679	
[2025-06-29T15:57:10.678Z] [worker] Processing scan job: nZUtO_TcJjj
2025-06-29 08:57:10.678	
}
2025-06-29 08:57:10.678	
createdAt: '2025-06-29T15:57:04.832Z'
2025-06-29 08:57:10.678	
originalDomain: 'lodging-source.com',
2025-06-29 08:57:10.678	
domain: 'lodging-source.com',
2025-06-29 08:57:10.678	
companyName: 'Lodging Source',
2025-06-29 08:57:10.678	
id: 'nZUtO_TcJjj',
2025-06-29 08:57:10.678	
[queue] Parsed job: {
2025-06-29 08:57:10.678	
[queue] Job string to parse: {"id":"nZUtO_TcJjj","companyName":"Lodging Source","domain":"lodging-source.com","originalDomain":"lodging-source.com","createdAt":"2025-06-29T15:57:04.832Z"}
2025-06-29 08:57:10.678	
} Type: object
2025-06-29 08:57:10.678	
createdAt: '2025-06-29T15:57:04.832Z'
2025-06-29 08:57:10.678	
originalDomain: 'lodging-source.com',
2025-06-29 08:57:10.678	
domain: 'lodging-source.com',
2025-06-29 08:57:10.678	
companyName: 'Lodging Source',
2025-06-29 08:57:10.678	
id: 'nZUtO_TcJjj',
2025-06-29 08:57:10.678	
[queue] Raw job data from Redis: {
2025-06-29 08:57:05.670	
{
  "level": 30,
  "time": 1751212625670,
  "pid": 660,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "res": {
    "statusCode": 200
  },
  "responseTime": 844.5119640007615,
  "msg": "request completed"
}
2025-06-29 08:57:05.666	
[2025-06-29T15:57:05.666Z] [api] ✅ Successfully created scan job nZUtO_TcJjj for Lodging Source
2025-06-29 08:57:05.666	
[queue] enqueued nZUtO_TcJjj
2025-06-29 08:57:04.922	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-06-29 08:57:04.922	
(node:660) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-06-29 08:57:04.832	
[2025-06-29T15:57:04.832Z] [api] Attempting to create scan job nZUtO_TcJjj for Lodging Source (lodging-source.com) [original: lodging-source.com]
2025-06-29 08:57:04.825	
{
  "level": 30,
  "time": 1751212624824,
  "pid": 660,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "req": {
    "method": "POST",
    "url": "/scans",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 49750
  },
  "msg": "incoming request"
}