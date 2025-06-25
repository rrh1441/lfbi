2025-06-25 13:23:10.234	
}
2025-06-25 13:23:10.234	
"RATE_LIMIT_BYPASS": 2
2025-06-25 13:23:10.234	
"ACCESSIBILITY_VIOLATION": 3,
2025-06-25 13:23:10.234	
"PHISHING_SETUP": 9,
2025-06-25 13:23:10.234	
"EMAIL_SECURITY_WEAKNESS": 2,
2025-06-25 13:23:10.234	
[2025-06-25T20:23:10.222Z] [SyncWorker] ✅ New findings synced: 16 {
2025-06-25 13:22:39.201	
[2025-06-25T20:22:39.201Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Boring Marketing: 16 verified findings, 35 artifacts across 20 security modules
2025-06-25 13:22:39.201	
[queue] Updated job Gn3GbtabDi1 status: done - Comprehensive security scan completed - 16 verified findings across 20 security modules. Findings ready for processing.
2025-06-25 13:22:38.762	
[2025-06-25T20:22:38.762Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-06-25 13:22:38.759	
[2025-06-25T20:22:38.759Z] [worker] [processScan] Counted 35 artifacts for scan Gn3GbtabDi1
2025-06-25 13:22:38.758	
[2025-06-25T20:22:38.758Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: progress
2025-06-25 13:22:38.756	
[2025-06-25T20:22:38.756Z] [worker] [Gn3GbtabDi1] COMPLETED secret detection: 0 secrets found
2025-06-25 13:22:38.756	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-06-25 13:22:38.754	
[2025-06-25T20:22:38.754Z] [trufflehog] Finished secret scan for boringmarketing.com Total secrets found: 0
2025-06-25 13:22:38.754	
[2025-06-25T20:22:38.754Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-Gn3GbtabDi1.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-Gn3GbtabDi1.json'
2025-06-25 13:22:38.754	
[2025-06-25T20:22:38.754Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-Gn3GbtabDi1.json
2025-06-25 13:22:38.754	
[2025-06-25T20:22:38.754Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-06-25 13:22:38.754	
[2025-06-25T20:22:38.753Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-06-25 13:22:38.754	
[2025-06-25T20:22:38.753Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-Gn3GbtabDi1.json'
2025-06-25 13:22:38.753	
[2025-06-25T20:22:38.753Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-Gn3GbtabDi1.json
2025-06-25 13:22:38.753	
[2025-06-25T20:22:38.751Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-06-25 13:22:33.899	
[2025-06-25T20:22:33.899Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-06-25 13:22:33.899	
[2025-06-25T20:22:33.899Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-06-25 13:22:33.899	
[2025-06-25T20:22:33.899Z] [trufflehog] Starting targeted secret scan for domain: boringmarketing.com
2025-06-25 13:22:33.898	
[2025-06-25T20:22:33.898Z] [worker] [Gn3GbtabDi1] STARTING TruffleHog secret detection for boringmarketing.com
2025-06-25 13:22:33.898	
[2025-06-25T20:22:33.898Z] [worker] === Running module: trufflehog (20/20) ===
2025-06-25 13:22:33.898	
[2025-06-25T20:22:33.898Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:22:33.897	
[2025-06-25T20:22:33.897Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: progress
2025-06-25 13:22:33.894	
[2025-06-25T20:22:33.894Z] [worker] [Gn3GbtabDi1] COMPLETED rate limiting tests: 2 rate limit issues found
2025-06-25 13:22:33.894	
[artifactStore] Inserted scan_summary artifact: Rate limit scan completed: 2 issues found...
2025-06-25 13:22:33.892	
[artifactStore] Inserted finding RATE_LIMIT_BYPASS for artifact 3138
2025-06-25 13:22:33.891	
[artifactStore] Inserted rate_limit_bypass artifact: Rate limit bypass possible on endpoint: /api...
2025-06-25 13:22:33.871	
[2025-06-25T20:22:33.870Z] [rateLimitScan] [VULNERABLE] Found 12 bypass techniques for https://boringmarketing.com/api
2025-06-25 13:22:24.211	
[2025-06-25T20:22:24.211Z] [rateLimitScan] Baseline rate limit detected on https://boringmarketing.com/api. Testing for bypasses...
2025-06-25 13:22:24.211	
[2025-06-25T20:22:24.211Z] [rateLimitScan] Response distribution for https://boringmarketing.com/api: { '404': 25 }
2025-06-25 13:22:20.112	
[2025-06-25T20:22:20.111Z] [rateLimitScan] Establishing baseline for https://boringmarketing.com/api...
2025-06-25 13:22:20.112	
[artifactStore] Inserted finding RATE_LIMIT_BYPASS for artifact 3137
2025-06-25 13:22:20.110	
[artifactStore] Inserted rate_limit_bypass artifact: Rate limit bypass possible on endpoint: /api/...
2025-06-25 13:22:20.091	
[2025-06-25T20:22:20.090Z] [rateLimitScan] [VULNERABLE] Found 12 bypass techniques for https://boringmarketing.com/api/
2025-06-25 13:22:07.415	
[2025-06-25T20:22:07.414Z] [rateLimitScan] Baseline rate limit detected on https://boringmarketing.com/api/. Testing for bypasses...
2025-06-25 13:22:07.414	
[2025-06-25T20:22:07.413Z] [rateLimitScan] Response distribution for https://boringmarketing.com/api/: { '404': 25 }
2025-06-25 13:21:58.419	
[2025-06-25T20:21:58.418Z] [rateLimitScan] Establishing baseline for https://boringmarketing.com/api/...
2025-06-25 13:21:58.418	
[2025-06-25T20:21:58.418Z] [rateLimitScan] Found 2 endpoints to test.
2025-06-25 13:21:58.417	
[2025-06-25T20:21:58.417Z] [rateLimitScan] Starting comprehensive rate limit scan for boringmarketing.com
2025-06-25 13:21:58.416	
[2025-06-25T20:21:58.416Z] [worker] [Gn3GbtabDi1] STARTING rate-limit tests for boringmarketing.com
2025-06-25 13:21:58.416	
[2025-06-25T20:21:58.416Z] [worker] === Running module: rate_limit_scan (19/20) ===
2025-06-25 13:21:58.416	
[2025-06-25T20:21:58.416Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:21:58.415	
[2025-06-25T20:21:58.415Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: progress
2025-06-25 13:21:58.414	
[2025-06-25T20:21:58.413Z] [worker] [Gn3GbtabDi1] COMPLETED Nuclei scan: 0 vulnerabilities found
2025-06-25 13:21:58.414	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-06-25 13:21:58.412	
[2025-06-25T20:21:58.411Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-06-25 13:21:58.412	
[2025-06-25T20:21:58.411Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-06-25 13:21:58.412	
[2025-06-25T20:21:58.411Z] [nuclei] [Tag Scan] Failed for https://boringmarketing.com: Command failed: nuclei -u https://boringmarketing.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-25 13:21:57.932	
[2025-06-25T20:21:57.932Z] [nuclei] [Tag Scan] Running on https://boringmarketing.com with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-25 13:21:57.932	
[2025-06-25T20:21:57.932Z] [nuclei] --- Starting Phase 1: Tag-based scans on 1 targets ---
2025-06-25 13:21:57.932	
[2025-06-25T20:21:57.932Z] [nuclei] Template update complete.
2025-06-25 13:21:57.931	
[INF] No new updates found for nuclei templates
2025-06-25 13:21:57.931	
projectdiscovery.io
2025-06-25 13:21:57.931	
/_/ /_/\__,_/\___/_/\___/_/   v3.2.9
2025-06-25 13:21:57.931	
/ / / / /_/ / /__/ /  __/ /
2025-06-25 13:21:57.931	
/ __ \/ / / / ___/ / _ \/ /
2025-06-25 13:21:57.931	
____  __  _______/ /__  (_)
2025-06-25 13:21:57.931	
__     _
2025-06-25 13:21:57.931	
[2025-06-25T20:21:57.931Z] [nuclei] Template update stderr:
2025-06-25 13:21:55.291	
[2025-06-25T20:21:55.291Z] [nuclei] Templates are outdated (> 24 hours). Updating...
2025-06-25 13:21:55.291	
[INF] PDCP Directory: /root/.pdcp
2025-06-25 13:21:55.291	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-06-25 13:21:55.291	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-06-25 13:21:55.291	
[2025-06-25T20:21:55.290Z] [nuclei] Version check stderr: [INF] Nuclei Engine Version: v3.2.9
2025-06-25 13:21:55.291	
[2025-06-25T20:21:55.290Z] [nuclei] Nuclei binary found.
2025-06-25 13:21:53.780	
[2025-06-25T20:21:53.780Z] [nuclei] Starting enhanced vulnerability scan for boringmarketing.com
2025-06-25 13:21:53.780	
[2025-06-25T20:21:53.780Z] [worker] [Gn3GbtabDi1] STARTING Nuclei vulnerability scan for boringmarketing.com
2025-06-25 13:21:53.780	
[2025-06-25T20:21:53.779Z] [worker] === Running module: nuclei (18/20) ===
2025-06-25 13:21:53.779	
[2025-06-25T20:21:53.779Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:21:53.776	
[2025-06-25T20:21:53.776Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: progress
2025-06-25 13:21:53.773	
[2025-06-25T20:21:53.773Z] [worker] [Gn3GbtabDi1] COMPLETED database scan: 0 database issues found
2025-06-25 13:21:53.773	
[artifactStore] Inserted scan_summary artifact: Database port scan completed: 0 exposed services found...
2025-06-25 13:21:53.612	
[2025-06-25T20:21:53.611Z] [dbPortScan] Completed database scan, found 0 exposed services
2025-06-25 13:21:31.375	
[2025-06-25T20:21:31.373Z] [dbPortScan] [1/8] Scanning boringmarketing.com:27017...
2025-06-25 13:21:31.289	
[2025-06-25T20:21:31.288Z] [dbPortScan] [1/8] Scanning boringmarketing.com:11211...
2025-06-25 13:21:31.131	
[2025-06-25T20:21:31.130Z] [dbPortScan] [1/8] Scanning boringmarketing.com:9200...
2025-06-25 13:21:30.973	
[2025-06-25T20:21:30.973Z] [dbPortScan] [1/8] Scanning boringmarketing.com:8086...
2025-06-25 13:21:12.169	
[2025-06-25T20:21:12.169Z] [dbPortScan] [1/8] Scanning boringmarketing.com:6379...
2025-06-25 13:21:12.093	
[2025-06-25T20:21:12.093Z] [dbPortScan] [1/8] Scanning boringmarketing.com:5432...
2025-06-25 13:21:12.015	
[2025-06-25T20:21:12.015Z] [dbPortScan] [1/8] Scanning boringmarketing.com:3306...
2025-06-25 13:21:12.012	
[2025-06-25T20:21:12.012Z] [dbPortScan] [1/8] Scanning boringmarketing.com:1433...
2025-06-25 13:21:10.056	
}
2025-06-25 13:21:10.056	
]
2025-06-25 13:21:10.056	
"Boring Marketing: db_port_scan (80%)"
2025-06-25 13:21:10.056	
"progress": [
2025-06-25 13:21:10.056	
[2025-06-25T20:21:10.056Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-25 13:21:09.777	
[2025-06-25T20:21:09.777Z] [dbPortScan] Validating dependencies...
2025-06-25 13:21:09.777	
[2025-06-25T20:21:09.776Z] [dbPortScan] Starting enhanced database security scan for boringmarketing.com
2025-06-25 13:21:09.776	
[2025-06-25T20:21:09.776Z] [worker] [Gn3GbtabDi1] STARTING database port scan for boringmarketing.com
2025-06-25 13:21:09.776	
[2025-06-25T20:21:09.776Z] [worker] === Running module: db_port_scan (17/20) ===
2025-06-25 13:21:09.776	
[2025-06-25T20:21:09.776Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:21:09.774	
[2025-06-25T20:21:09.774Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: progress
2025-06-25 13:21:09.772	
[2025-06-25T20:21:09.772Z] [worker] [Gn3GbtabDi1] COMPLETED typosquat analysis: 0 active typosquats detected
2025-06-25 13:21:09.772	
[2025-06-25T20:21:09.772Z] [worker] Skipping removed typosquatScorer module - functionality merged into dnsTwist
2025-06-25 13:21:09.772	
[2025-06-25T20:21:09.772Z] [worker] [Gn3GbtabDi1] STARTING typosquat analysis for boringmarketing.com
2025-06-25 13:21:09.772	
[2025-06-25T20:21:09.772Z] [worker] === Running module: typosquat_scorer (16/20) ===
2025-06-25 13:21:09.772	
[2025-06-25T20:21:09.772Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:21:09.771	
[2025-06-25T20:21:09.771Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: progress
2025-06-25 13:21:09.693	
[2025-06-25T20:21:09.693Z] [worker] [Gn3GbtabDi1] COMPLETED email bruteforce surface scan: 0 email attack vectors found
2025-06-25 13:21:09.693	
[2025-06-25T20:21:09.693Z] [emailBruteforceSurface] No email services detected
2025-06-25 13:21:09.693	
[2025-06-25T20:21:09.693Z] [emailBruteforceSurface] Nuclei email scan failed: Command failed: nuclei -list /tmp/nuclei-email-targets-1750882867453.txt -t technologies/microsoft-exchange-server-detect.yaml -t technologies/outlook-web-access-detect.yaml -t technologies/owa-detect.yaml -t network/smtp-detect.yaml -t network/imap-detect.yaml -t network/pop3-detect.yaml -t technologies/exchange-autodiscover.yaml -t technologies/activesync-detect.yaml -t misconfiguration/exchange-server-login.yaml -t misconfiguration/owa-login-portal.yaml -json -silent -no-color -timeout 30 -retries 2 -rate-limit 50 -c 6 -disable-update-check -insecure
2025-06-25 13:21:07.453	
[2025-06-25T20:21:07.453Z] [emailBruteforceSurface] Running Nuclei with 10 email templates against 50 targets
2025-06-25 13:21:07.453	
[2025-06-25T20:21:07.452Z] [emailBruteforceSurface] Generated 408 email service targets
2025-06-25 13:21:07.292	
[2025-06-25T20:21:07.292Z] [emailBruteforceSurface] Starting email bruteforce surface scan for domain="boringmarketing.com"
2025-06-25 13:21:07.292	
[2025-06-25T20:21:07.291Z] [worker] [Gn3GbtabDi1] STARTING email bruteforce surface scan for boringmarketing.com
2025-06-25 13:21:07.292	
[2025-06-25T20:21:07.291Z] [worker] === Running module: email_bruteforce_surface (15/20) ===
2025-06-25 13:21:07.291	
[2025-06-25T20:21:07.291Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:21:07.289	
[2025-06-25T20:21:07.289Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: progress
2025-06-25 13:21:07.212	
[2025-06-25T20:21:07.212Z] [worker] [Gn3GbtabDi1] COMPLETED RDP/VPN templates scan: 0 remote access vulnerabilities found
2025-06-25 13:21:07.212	
[2025-06-25T20:21:07.211Z] [rdpVpnTemplates] No RDP/VPN vulnerabilities detected
2025-06-25 13:21:07.211	
[2025-06-25T20:21:07.211Z] [rdpVpnTemplates] Nuclei RDP/VPN scan failed: Command failed: nuclei -list /tmp/nuclei-rdpvpn-targets-1750882864813.txt -t network/rdp-detect.yaml -t network/rdp-bluekeep-detect.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2018-13379.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2019-5591.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2020-12812.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2019-1579.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2020-2021.yaml -t vulnerabilities/citrix/citrix-adc-cve-2019-19781.yaml -t vulnerabilities/pulse/pulse-connect-secure-cve-2019-11510.yaml -t technologies/rdp-detect.yaml -t technologies/vpn-detect.yaml -json -silent -no-color -timeout 30 -retries 2 -rate-limit 50 -c 6 -disable-update-check -insecure
2025-06-25 13:21:04.814	
[2025-06-25T20:21:04.814Z] [rdpVpnTemplates] Running Nuclei with 11 RDP/VPN templates against 22 targets
2025-06-25 13:21:04.813	
[2025-06-25T20:21:04.813Z] [rdpVpnTemplates] Generated 22 target URLs for RDP/VPN scanning
2025-06-25 13:21:04.810	
[2025-06-25T20:21:04.809Z] [rdpVpnTemplates] Starting RDP/VPN templates scan for domain="boringmarketing.com"
2025-06-25 13:21:04.809	
[2025-06-25T20:21:04.809Z] [worker] [Gn3GbtabDi1] STARTING RDP/VPN vulnerability templates for boringmarketing.com
2025-06-25 13:21:04.809	
[2025-06-25T20:21:04.809Z] [worker] === Running module: rdp_vpn_templates (14/20) ===
2025-06-25 13:21:04.809	
[2025-06-25T20:21:04.809Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:21:04.740	
[2025-06-25T20:21:04.739Z] [worker] [Gn3GbtabDi1] COMPLETED accessibility scan: 3 WCAG violations found
2025-06-25 13:21:04.740	
[2025-06-25T20:21:04.739Z] [accessibilityScan] Accessibility scan completed: 3 findings from 7/15 pages in 186765ms
2025-06-25 13:21:04.739	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3134
2025-06-25 13:21:04.738	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3134
2025-06-25 13:21:04.737	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3134
2025-06-25 13:21:04.734	
[artifactStore] Inserted accessibility_summary artifact: Accessibility scan: 16 violations across 7 pages (0 critical...
2025-06-25 13:21:04.612	
[2025-06-25T20:21:04.611Z] [accessibilityScan] Accessibility analysis complete: 16 violations (0 critical, 9 serious)
2025-06-25 13:21:03.291	
[2025-06-25T20:21:03.290Z] [dynamicBrowser] Page operation completed in 8234ms
2025-06-25 13:20:58.732	
[2025-06-25T20:20:58.732Z] [dynamicBrowser] Metrics: browser_rss_mb=161, heap_used_mb=61, pages_open=1
2025-06-25 13:20:55.056	
[2025-06-25T20:20:55.056Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/register
2025-06-25 13:20:52.492	
[2025-06-25T20:20:52.491Z] [dynamicBrowser] Page operation completed in 7993ms
2025-06-25 13:20:44.498	
[2025-06-25T20:20:44.498Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/login
2025-06-25 13:20:41.930	
[2025-06-25T20:20:41.930Z] [dynamicBrowser] Page operation completed in 9281ms
2025-06-25 13:20:32.649	
[2025-06-25T20:20:32.649Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/signup
2025-06-25 13:20:28.252	
[2025-06-25T20:20:28.252Z] [dynamicBrowser] Page operation completed in 7813ms
2025-06-25 13:20:20.489	
[2025-06-25T20:20:20.439Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/pricing
2025-06-25 13:20:20.489	
[2025-06-25T20:20:20.439Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/pricing
2025-06-25 13:20:19.134	
[2025-06-25T20:20:19.133Z] [dynamicBrowser] Page operation completed in 9335ms
2025-06-25 13:20:19.134	
[2025-06-25T20:20:19.133Z] [dynamicBrowser] Page operation completed in 9335ms
2025-06-25 13:20:09.798	
[2025-06-25T20:20:09.798Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/products
2025-06-25 13:20:08.253	
[2025-06-25T20:20:08.253Z] [dynamicBrowser] Page operation completed in 6161ms
2025-06-25 13:20:02.093	
[2025-06-25T20:20:02.092Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/services
2025-06-25 13:20:00.092	
[2025-06-25T20:20:00.091Z] [dynamicBrowser] Page operation completed in 8076ms
2025-06-25 13:19:58.730	
[2025-06-25T20:19:58.729Z] [dynamicBrowser] Metrics: browser_rss_mb=161, heap_used_mb=59, pages_open=1
2025-06-25 13:19:52.015	
[2025-06-25T20:19:52.015Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/about
2025-06-25 13:19:48.414	
[2025-06-25T20:19:48.414Z] [dynamicBrowser] Page operation completed in 11042ms
2025-06-25 13:19:37.372	
[2025-06-25T20:19:37.372Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/contact
2025-06-25 13:19:33.452	
[2025-06-25T20:19:33.451Z] [dynamicBrowser] Page operation completed in 18722ms
2025-06-25 13:19:33.451	
[2025-06-25T20:19:33.451Z] [accessibilityScan] Accessibility test complete for https://www.boringmarketing.com/: 2 violations, 21 passes
2025-06-25 13:19:28.729	
[2025-06-25T20:19:28.729Z] [dynamicBrowser] Metrics: browser_rss_mb=161, heap_used_mb=58, pages_open=1
2025-06-25 13:19:14.729	
[2025-06-25T20:19:14.729Z] [accessibilityScan] Testing accessibility for: https://www.boringmarketing.com/
2025-06-25 13:19:10.173	
[2025-06-25T20:19:10.173Z] [dynamicBrowser] Page operation completed in 18323ms
2025-06-25 13:19:10.173	
[2025-06-25T20:19:10.173Z] [accessibilityScan] Accessibility test complete for https://www.boringmarketing.com: 2 violations, 21 passes
2025-06-25 13:18:58.729	
[2025-06-25T20:18:58.728Z] [dynamicBrowser] Metrics: browser_rss_mb=162, heap_used_mb=68, pages_open=1
2025-06-25 13:18:51.851	
[2025-06-25T20:18:51.850Z] [accessibilityScan] Testing accessibility for: https://www.boringmarketing.com
2025-06-25 13:18:48.491	
[2025-06-25T20:18:48.491Z] [dynamicBrowser] Page operation completed in 9651ms
2025-06-25 13:18:48.491	
[2025-06-25T20:18:48.491Z] [dynamicBrowser] Page operation completed in 9651ms
2025-06-25 13:18:48.491	
[2025-06-25T20:18:48.490Z] [accessibilityScan] Accessibility test complete for https://boringmarketing.com/: 2 violations, 21 passes
2025-06-25 13:18:48.491	
[2025-06-25T20:18:48.490Z] [accessibilityScan] Accessibility test complete for https://boringmarketing.com/: 2 violations, 21 passes
2025-06-25 13:18:38.841	
[2025-06-25T20:18:38.840Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com/
2025-06-25 13:18:37.680	
[2025-06-25T20:18:37.679Z] [dynamicBrowser] Page operation completed in 6278ms
2025-06-25 13:18:37.679	
[2025-06-25T20:18:37.679Z] [accessibilityScan] Accessibility test complete for https://boringmarketing.com: 2 violations, 21 passes
2025-06-25 13:18:31.402	
[2025-06-25T20:18:31.401Z] [accessibilityScan] Testing accessibility for: https://boringmarketing.com
2025-06-25 13:18:30.258	
[2025-06-25T20:18:30.258Z] [dynamicBrowser] Page operation completed in 3638ms
2025-06-25 13:18:30.258	
[2025-06-25T20:18:30.256Z] [accessibilityScan] Accessibility test complete for https://develop.d1l0jjgp0jj24v.amplifyapp.com//privacy: 3 violations, 22 passes
2025-06-25 13:18:28.721	
[2025-06-25T20:18:28.721Z] [dynamicBrowser] Metrics: browser_rss_mb=162, heap_used_mb=67, pages_open=1
2025-06-25 13:18:26.622	
[2025-06-25T20:18:26.620Z] [accessibilityScan] Testing accessibility for: https://develop.d1l0jjgp0jj24v.amplifyapp.com//privacy
2025-06-25 13:18:25.473	
[2025-06-25T20:18:25.473Z] [dynamicBrowser] Page operation completed in 5922ms
2025-06-25 13:18:25.473	
[2025-06-25T20:18:25.473Z] [accessibilityScan] Accessibility test complete for https://develop.d1l0jjgp0jj24v.amplifyapp.com//terms: 3 violations, 22 passes
2025-06-25 13:18:21.617	
[2025-06-25T20:18:21.617Z] [worker] [Gn3GbtabDi1] COMPLETED tech stack scan: 0 technologies detected
2025-06-25 13:18:21.617	
[2025-06-25T20:18:21.617Z] [techStackScan] techstack=complete arts=0 time=23675ms
2025-06-25 13:18:21.616	
[artifactStore] Inserted techscan_metrics artifact: Technology scan metrics: 0 technologies, 0 supply chain risk...
2025-06-25 13:18:21.614	
[artifactStore] Inserted sbom_cyclonedx artifact: Software Bill of Materials (CycloneDX 1.5) - 0 components...
2025-06-25 13:18:21.594	
"
2025-06-25 13:18:21.594	
[2025-06-25T20:18:21.594Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com/api" error="Command failed: nuclei -u https://boringmarketing.com/api -silent -json -tags tech -no-color
2025-06-25 13:18:21.591	
"
2025-06-25 13:18:21.591	
[2025-06-25T20:18:21.591Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com/terms" error="Command failed: nuclei -u https://boringmarketing.com/terms -silent -json -tags tech -no-color
2025-06-25 13:18:21.590	
"
2025-06-25 13:18:21.590	
[2025-06-25T20:18:21.590Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com/privacy" error="Command failed: nuclei -u https://boringmarketing.com/privacy -silent -json -tags tech -no-color
2025-06-25 13:18:21.583	
"
2025-06-25 13:18:21.583	
[2025-06-25T20:18:21.582Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com//privacy" error="Command failed: nuclei -u https://boringmarketing.com//privacy -silent -json -tags tech -no-color
2025-06-25 13:18:21.155	
"
2025-06-25 13:18:21.155	
[2025-06-25T20:18:21.154Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com//terms" error="Command failed: nuclei -u https://boringmarketing.com//terms -silent -json -tags tech -no-color
2025-06-25 13:18:21.138	
"
2025-06-25 13:18:21.138	
[2025-06-25T20:18:21.138Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com/test/" error="Command failed: nuclei -u https://boringmarketing.com/test/ -silent -json -tags tech -no-color
2025-06-25 13:18:21.119	
[2025-06-25T20:18:21.119Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com/api"
2025-06-25 13:18:21.118	
"
2025-06-25 13:18:21.118	
[2025-06-25T20:18:21.118Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com/api/" error="Command failed: nuclei -u https://boringmarketing.com/api/ -silent -json -tags tech -no-color
2025-06-25 13:18:21.112	
[2025-06-25T20:18:21.110Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com/privacy"
2025-06-25 13:18:21.112	
"
2025-06-25 13:18:21.112	
[2025-06-25T20:18:21.110Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com/" error="Command failed: nuclei -u https://boringmarketing.com/ -silent -json -tags tech -no-color
2025-06-25 13:18:21.098	
[2025-06-25T20:18:21.097Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com/terms"
2025-06-25 13:18:21.098	
"
2025-06-25 13:18:21.098	
[2025-06-25T20:18:21.097Z] [techStackScan] techstack=nuclei_error url="https://www.boringmarketing.com" error="Command failed: nuclei -u https://www.boringmarketing.com -silent -json -tags tech -no-color
2025-06-25 13:18:21.076	
[2025-06-25T20:18:21.074Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com//privacy"
2025-06-25 13:18:21.076	
"
2025-06-25 13:18:21.076	
[2025-06-25T20:18:21.074Z] [techStackScan] techstack=nuclei_error url="https://boringmarketing.com" error="Command failed: nuclei -u https://boringmarketing.com -silent -json -tags tech -no-color
2025-06-25 13:18:19.552	
[2025-06-25T20:18:19.551Z] [accessibilityScan] Testing accessibility for: https://develop.d1l0jjgp0jj24v.amplifyapp.com//terms
2025-06-25 13:18:18.348	
[2025-06-25T20:18:18.348Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com//terms"
2025-06-25 13:18:18.336	
[2025-06-25T20:18:18.335Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com/test/"
2025-06-25 13:18:18.325	
[2025-06-25T20:18:18.324Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com/api/"
2025-06-25 13:18:18.317	
[2025-06-25T20:18:18.316Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com/"
2025-06-25 13:18:18.314	
[2025-06-25T20:18:18.313Z] [techStackScan] techstack=nuclei url="https://www.boringmarketing.com"
2025-06-25 13:18:18.312	
[2025-06-25T20:18:18.310Z] [techStackScan] techstack=nuclei url="https://boringmarketing.com"
2025-06-25 13:18:18.312	
[2025-06-25T20:18:18.306Z] [techStackScan] techstack=targets primary=10 thirdParty=0 total=10
2025-06-25 13:18:18.276	
[2025-06-25T20:18:18.276Z] [dynamicBrowser] Page operation completed in 4961ms
2025-06-25 13:18:18.275	
[2025-06-25T20:18:18.275Z] [techStackScan] thirdParty=discovered domain=boringmarketing.com origins=0
2025-06-25 13:18:18.243	
[2025-06-25T20:18:18.242Z] [dynamicBrowser] Page operation completed in 4925ms
2025-06-25 13:18:18.238	
[2025-06-25T20:18:18.237Z] [accessibilityScan] Accessibility test complete for https://develop.d1l0jjgp0jj24v.amplifyapp.com/: 2 violations, 21 passes
2025-06-25 13:18:13.318	
[2025-06-25T20:18:13.317Z] [accessibilityScan] Testing accessibility for: https://develop.d1l0jjgp0jj24v.amplifyapp.com/
2025-06-25 13:18:11.220	
[2025-06-25T20:18:11.218Z] [dynamicBrowser] Browser launched successfully
2025-06-25 13:17:59.832	
[2025-06-25T20:17:59.831Z] [techStackScan] buildTargets discovered=8 total=10
2025-06-25 13:17:59.827	
[2025-06-25T20:17:59.826Z] [techStackScan] techstack=nuclei binary confirmed
2025-06-25 13:17:59.373	
[2025-06-25T20:17:59.371Z] [worker] [Gn3GbtabDi1] COMPLETED denial-of-wallet scan: 0 cost amplification vulnerabilities found
2025-06-25 13:17:59.373	
[2025-06-25T20:17:59.371Z] [denialWalletScan] Denial-of-wallet scan completed: 0 findings in 1393ms
2025-06-25 13:17:58.720	
[2025-06-25T20:17:58.720Z] [dynamicBrowser] Launching new browser instance
2025-06-25 13:17:58.720	
[2025-06-25T20:17:58.720Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-25 13:17:58.719	
[2025-06-25T20:17:58.719Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-25 13:17:58.718	
[2025-06-25T20:17:58.718Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-06-25 13:17:57.983	
[2025-06-25T20:17:57.983Z] [denialWalletScan] Analyzing endpoint: https://boringmarketing.com/api/
2025-06-25 13:17:57.983	
[2025-06-25T20:17:57.982Z] [denialWalletScan] Filtered to 1 potential cost-amplification endpoints
2025-06-25 13:17:57.983	
[2025-06-25T20:17:57.982Z] [denialWalletScan] Found 8 endpoints from endpoint discovery
2025-06-25 13:17:57.979	
[2025-06-25T20:17:57.978Z] [denialWalletScan] Starting denial-of-wallet scan for domain="boringmarketing.com"
2025-06-25 13:17:57.979	
[2025-06-25T20:17:57.977Z] [worker] [Gn3GbtabDi1] STARTING denial-of-wallet vulnerability scan for boringmarketing.com
2025-06-25 13:17:57.979	
[2025-06-25T20:17:57.977Z] [worker] === Running module (Phase 2C): denial_wallet_scan ===
2025-06-25 13:17:57.977	
[2025-06-25T20:17:57.977Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:17:57.977	
[2025-06-25T20:17:57.974Z] [accessibilityScan] Starting accessibility scan for domain="boringmarketing.com"
2025-06-25 13:17:57.977	
[2025-06-25T20:17:57.974Z] [worker] [Gn3GbtabDi1] STARTING accessibility compliance scan for boringmarketing.com
2025-06-25 13:17:57.977	
[2025-06-25T20:17:57.969Z] [worker] === Running module (Phase 2C): accessibility_scan ===
2025-06-25 13:17:57.970	
[2025-06-25T20:17:57.969Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:17:57.970	
[2025-06-25T20:17:57.969Z] [worker] [Gn3GbtabDi1] COMPLETED AbuseIPDB scan: 0 malicious/suspicious IPs found
2025-06-25 13:17:57.970	
[2025-06-25T20:17:57.969Z] [abuseIntelScan] No IP artifacts found for this scan
2025-06-25 13:17:57.970	
[2025-06-25T20:17:57.969Z] [abuseIntelScan] Found 0 IP artifacts for scan Gn3GbtabDi1
2025-06-25 13:17:57.961	
[2025-06-25T20:17:57.961Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=Gn3GbtabDi1
2025-06-25 13:17:57.961	
[2025-06-25T20:17:57.960Z] [worker] [Gn3GbtabDi1] STARTING AbuseIPDB intelligence scan for IPs
2025-06-25 13:17:57.961	
[2025-06-25T20:17:57.960Z] [worker] === Running module (Phase 2C): abuse_intel_scan ===
2025-06-25 13:17:57.961	
[2025-06-25T20:17:57.960Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:17:57.942	
[2025-06-25T20:17:57.941Z] [techStackScan] techstack=start domain=boringmarketing.com
2025-06-25 13:17:57.942	
[2025-06-25T20:17:57.940Z] [worker] [Gn3GbtabDi1] STARTING tech stack scan for boringmarketing.com
2025-06-25 13:17:57.942	
[2025-06-25T20:17:57.940Z] [worker] === Running module (Phase 2C): tech_stack_scan ===
2025-06-25 13:17:57.938	
[2025-06-25T20:17:57.938Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:17:57.912	
[2025-06-25T20:17:57.911Z] [worker] [Gn3GbtabDi1] COMPLETED endpoint discovery: 8 endpoint collections found
2025-06-25 13:17:57.912	
[2025-06-25T20:17:57.911Z] [endpointDiscovery] ⇢ done – 8 endpoints
2025-06-25 13:17:57.912	
[artifactStore] Inserted discovered_endpoints artifact: Discovered 8 unique endpoints for boringmarketing.com...
2025-06-25 13:17:13.469	
[2025-06-25T20:17:13.469Z] [endpointDiscovery] +js_analysis /api (-)
2025-06-25 13:17:13.168	
[2025-06-25T20:17:13.168Z] [endpointDiscovery] +crawl_link /privacy (-)
2025-06-25 13:17:13.168	
[2025-06-25T20:17:13.168Z] [endpointDiscovery] +crawl_link /terms (-)
2025-06-25 13:17:13.031	
[2025-06-25T20:17:13.031Z] [endpointDiscovery] +sitemap.xml //privacy (-)
2025-06-25 13:17:13.031	
[2025-06-25T20:17:13.031Z] [endpointDiscovery] +sitemap.xml //terms (-)
2025-06-25 13:17:11.764	
[2025-06-25T20:17:11.763Z] [endpointDiscovery] +robots.txt /test/ (-)
2025-06-25 13:17:11.763	
[2025-06-25T20:17:11.763Z] [endpointDiscovery] +robots.txt /api/ (-)
2025-06-25 13:17:11.763	
[2025-06-25T20:17:11.762Z] [endpointDiscovery] +robots.txt / (-)
2025-06-25 13:17:10.779	
[2025-06-25T20:17:10.779Z] [endpointDiscovery] ⇢ start boringmarketing.com
2025-06-25 13:17:10.779	
[2025-06-25T20:17:10.779Z] [worker] [Gn3GbtabDi1] STARTING endpoint discovery for boringmarketing.com
2025-06-25 13:17:10.779	
[2025-06-25T20:17:10.778Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:17:10.761	
[2025-06-25T20:17:10.760Z] [worker] === Running endpoint discovery ===
2025-06-25 13:17:10.761	
[2025-06-25T20:17:10.760Z] [worker] [Gn3GbtabDi1] COMPLETED DNS Twist: 12 typo-domains found
2025-06-25 13:17:10.761	
[2025-06-25T20:17:10.760Z] [dnstwist] Scan completed – 12 domains analysed
2025-06-25 13:17:10.761	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: boringma...
2025-06-25 13:17:10.113	
}
2025-06-25 13:17:10.113	
]
2025-06-25 13:17:10.113	
"Boring Marketing: spf_dmarc_phase2a (20%)"
2025-06-25 13:17:10.113	
"progress": [
2025-06-25 13:17:10.113	
[2025-06-25T20:17:10.113Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-25 13:17:05.917	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3129
2025-06-25 13:17:05.916	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: bor.ingm...
2025-06-25 13:16:10.179	
}
2025-06-25 13:16:10.179	
]
2025-06-25 13:16:10.179	
"Boring Marketing: spf_dmarc_phase2a (20%)"
2025-06-25 13:16:10.179	
"progress": [
2025-06-25 13:16:10.179	
[2025-06-25T20:16:10.178Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-25 13:15:56.272	
[2025-06-25T20:15:56.272Z] [worker] [Gn3GbtabDi1] COMPLETED TLS scan: 0 TLS issues found
2025-06-25 13:15:56.272	
[2025-06-25T20:15:56.272Z] [tlsScan] Scan complete. Hosts: boringmarketing.com, www.boringmarketing.com. Findings: 0
2025-06-25 13:15:56.272	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 0 issue(s) found...
2025-06-25 13:15:56.255	
[2025-06-25T20:15:56.254Z] [tlsScan] Failed to parse results for www.boringmarketing.com
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 734
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 733
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 732
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 731
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 730
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 729
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 728
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 727
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 726
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 725
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 724
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 723
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 722
2025-06-25 13:15:56.255	
Failed to generate ECDHE key for nid 721
2025-06-25 13:15:56.255	
[2025-06-25T20:15:56.254Z] [tlsScan] sslscan failed for www.boringmarketing.com: Error: Command failed: sslscan --xml=- --no-colour --timeout=30 www.boringmarketing.com
2025-06-25 13:15:22.162	
[2025-06-25T20:15:22.162Z] [worker] [Gn3GbtabDi1] COMPLETED document exposure: 0 discoveries
2025-06-25 13:15:22.162	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-06-25 13:15:10.096	
}
2025-06-25 13:15:10.096	
]
2025-06-25 13:15:10.096	
"Boring Marketing: spf_dmarc_phase2a (20%)"
2025-06-25 13:15:10.096	
"progress": [
2025-06-25 13:15:10.096	
[2025-06-25T20:15:10.096Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-25 13:14:52.379	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3126
2025-06-25 13:14:52.378	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: bringmar...
2025-06-25 13:14:52.277	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3125
2025-06-25 13:14:52.275	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: boringma...
2025-06-25 13:14:51.904	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3124
2025-06-25 13:14:51.903	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: boringgm...
2025-06-25 13:14:51.893	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3123
2025-06-25 13:14:51.892	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: booringm...
2025-06-25 13:14:51.773	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3122
2025-06-25 13:14:51.772	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: boringma...
2025-06-25 13:14:51.706	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3121
2025-06-25 13:14:51.705	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: boringma...
2025-06-25 13:14:51.678	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: bori.ngm...
2025-06-25 13:14:51.552	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3119
2025-06-25 13:14:51.551	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: boringm....
2025-06-25 13:14:51.492	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: boring-m...
2025-06-25 13:14:51.481	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3117
2025-06-25 13:14:51.479	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: bo.ringm...
2025-06-25 13:14:50.934	
[2025-06-25T20:14:50.934Z] [dnstwist] Batch 1/1
2025-06-25 13:14:50.934	
[2025-06-25T20:14:50.933Z] [dnstwist] Found 12 registered typosquat candidates to analyze
2025-06-25 13:14:10.179	
}
2025-06-25 13:14:10.179	
]
2025-06-25 13:14:10.179	
"Boring Marketing: spf_dmarc_phase2a (20%)"
2025-06-25 13:14:10.179	
"progress": [
2025-06-25 13:14:10.179	
[2025-06-25T20:14:10.178Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-25 13:14:09.298	
[2025-06-25T20:14:09.298Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:08.771	
[2025-06-25T20:14:08.771Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:08.382	
[2025-06-25T20:14:08.379Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:08.282	
[2025-06-25T20:14:08.282Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:05.902	
[2025-06-25T20:14:05.902Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:04.409	
[2025-06-25T20:14:04.409Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:04.214	
[2025-06-25T20:14:04.213Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:03.899	
[2025-06-25T20:14:03.899Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:03.610	
[2025-06-25T20:14:03.609Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:02.453	
[2025-06-25T20:14:02.453Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:02.257	
[2025-06-25T20:14:02.256Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:01.851	
[2025-06-25T20:14:01.851Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:01.774	
[2025-06-25T20:14:01.773Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:14:01.633	
[2025-06-25T20:14:01.630Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:13:59.823	
[2025-06-25T20:13:59.822Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-25 13:13:56.394	
[2025-06-25T20:13:56.394Z] [tlsScan] Python validator: www.boringmarketing.com - VALID
2025-06-25 13:13:56.223	
[2025-06-25T20:13:56.223Z] [tlsScan] Scanning www.boringmarketing.com with hybrid validation (sslscan + Python)...
2025-06-25 13:13:56.223	
[2025-06-25T20:13:56.223Z] [tlsScan] Skipping false positive: "No SSL certificate presented" - Python validator confirmed valid certificate
2025-06-25 13:13:56.221	
[2025-06-25T20:13:56.220Z] [tlsScan] Cross-validation complete for boringmarketing.com: 0 additional findings
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 734
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 733
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 732
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 731
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 730
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 729
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 728
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 727
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 726
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 725
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 724
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 723
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 722
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 721
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 734
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 733
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 732
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 731
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 730
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 729
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 728
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 727
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 726
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 725
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 724
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 723
2025-06-25 13:13:56.220	
Failed to generate ECDHE key for nid 722
2025-06-25 13:13:56.220	
[2025-06-25T20:13:56.220Z] [tlsScan] sslscan stderr for boringmarketing.com: Failed to generate ECDHE key for nid 721
2025-06-25 13:13:55.722	
[2025-06-25T20:13:55.722Z] [worker] [Gn3GbtabDi1] COMPLETED email security scan: 2 email issues found
2025-06-25 13:13:55.722	
[2025-06-25T20:13:55.722Z] [spfDmarc] Completed email security scan, found 2 issues
2025-06-25 13:13:55.722	
[artifactStore] Inserted bimi_missing artifact: BIMI record not found...
2025-06-25 13:13:55.572	
[2025-06-25T20:13:55.572Z] [spfDmarc] Checking for BIMI record...
2025-06-25 13:13:55.572	
[2025-06-25T20:13:55.572Z] [spfDmarc] Found DKIM record with selector: google
2025-06-25 13:13:55.278	
[2025-06-25T20:13:55.278Z] [worker] [Gn3GbtabDi1] COMPLETED Shodan infrastructure scan: 0 services found
2025-06-25 13:13:55.278	
[2025-06-25T20:13:55.274Z] [Shodan] Done — 0 rows persisted, 1 API calls used for 1 targets
2025-06-25 13:13:55.274	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 0 items...
2025-06-25 13:13:55.272	
[2025-06-25T20:13:55.272Z] [Shodan] API call 1 - search query
2025-06-25 13:13:54.762	
[2025-06-25T20:13:54.761Z] [spfDmarc] Probing for common DKIM selectors...
2025-06-25 13:13:54.762	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 3114
2025-06-25 13:13:54.760	
[artifactStore] Inserted spf_weak artifact: SPF policy is too permissive (~all)...
2025-06-25 13:13:54.438	
[2025-06-25T20:13:54.438Z] [tlsScan] Python validator: boringmarketing.com - VALID
2025-06-25 13:13:54.432	
[2025-06-25T20:13:54.430Z] [spfDmarc] Performing recursive SPF check...
2025-06-25 13:13:54.426	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 3113
2025-06-25 13:13:54.423	
[artifactStore] Inserted dmarc_weak artifact: DMARC policy is not enforcing...
2025-06-25 13:13:54.237	
[2025-06-25T20:13:54.237Z] [tlsScan] Scanning boringmarketing.com with hybrid validation (sslscan + Python)...
2025-06-25 13:13:54.236	

2025-06-25 13:13:54.236	
OpenSSL 3.5.0 8 Apr 2025
2025-06-25 13:13:54.236	
[2025-06-25T20:13:54.236Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-06-25 13:13:54.232	
[2025-06-25T20:13:54.231Z] [spfDmarc] Checking DMARC record...
2025-06-25 13:13:54.232	
[2025-06-25T20:13:54.231Z] [spfDmarc] Starting email security scan for boringmarketing.com
2025-06-25 13:13:54.232	
[2025-06-25T20:13:54.230Z] [worker] [Gn3GbtabDi1] STARTING SPF/DMARC email security scan for boringmarketing.com
2025-06-25 13:13:54.232	
[2025-06-25T20:13:54.230Z] [worker] === Running module (Phase 2A): spf_dmarc ===
2025-06-25 13:13:54.232	
[2025-06-25T20:13:54.230Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:13:54.227	
[2025-06-25T20:13:54.227Z] [worker] [Gn3GbtabDi1] STARTING document exposure scan for Boring Marketing
2025-06-25 13:13:54.227	
[2025-06-25T20:13:54.227Z] [worker] === Running module (Phase 2A): document_exposure ===
2025-06-25 13:13:54.227	
[2025-06-25T20:13:54.226Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:13:54.224	
[2025-06-25T20:13:54.223Z] [dnstwist] Fetching WHOIS data for original domain: boringmarketing.com
2025-06-25 13:13:54.224	
[2025-06-25T20:13:54.223Z] [dnstwist] Starting typosquat scan for boringmarketing.com
2025-06-25 13:13:54.224	
[2025-06-25T20:13:54.222Z] [worker] [Gn3GbtabDi1] STARTING DNS Twist scan for boringmarketing.com
2025-06-25 13:13:54.224	
[2025-06-25T20:13:54.222Z] [worker] === Running module (Phase 2A): dns_twist ===
2025-06-25 13:13:54.220	
[2025-06-25T20:13:54.220Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:13:54.215	
[2025-06-25T20:13:54.215Z] [worker] [Gn3GbtabDi1] STARTING TLS security scan for boringmarketing.com
2025-06-25 13:13:54.215	
[2025-06-25T20:13:54.215Z] [worker] === Running module (Phase 2A): tls_scan ===
2025-06-25 13:13:54.215	
[2025-06-25T20:13:54.215Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:13:54.165	
[2025-06-25T20:13:54.165Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-06-25 13:13:54.165	
[2025-06-25T20:13:54.164Z] [worker] [Gn3GbtabDi1] COMPLETED Censys platform scan: 0 services found
2025-06-25 13:13:54.164	
[Gn3GbtabDi1] Censys scan skipped - CENSYS_PAT and CENSYS_ORG_ID not configured (saves ~$2-10 per scan)
2025-06-25 13:13:54.164	
[2025-06-25T20:13:54.164Z] [worker] [Gn3GbtabDi1] STARTING Censys platform scan for boringmarketing.com
2025-06-25 13:13:54.164	
[2025-06-25T20:13:54.164Z] [worker] === Running module (Phase 2A): censys ===
2025-06-25 13:13:54.164	
[2025-06-25T20:13:54.164Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:13:54.163	
[2025-06-25T20:13:54.163Z] [Shodan] Start scan for boringmarketing.com
2025-06-25 13:13:54.163	
[2025-06-25T20:13:54.162Z] [worker] [Gn3GbtabDi1] STARTING Shodan scan for boringmarketing.com
2025-06-25 13:13:54.163	
[2025-06-25T20:13:54.162Z] [worker] === Running module (Phase 2A): shodan ===
2025-06-25 13:13:54.162	
[2025-06-25T20:13:54.162Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:13:54.159	
[2025-06-25T20:13:54.159Z] [worker] [Gn3GbtabDi1] COMPLETED SpiderFoot discovery: 14 targets found
2025-06-25 13:13:54.159	
[2025-06-25T20:13:54.159Z] [SpiderFoot] ✔️ Completed – 14 artifacts
2025-06-25 13:13:54.159	
[artifactStore] Inserted scan_summary artifact: SpiderFoot scan completed: 14 artifacts...
2025-06-25 13:13:54.157	
[artifactStore] Inserted intel artifact: MarkMonitor, Inc....
2025-06-25 13:13:54.156	
Registry Domain...
2025-06-25 13:13:54.156	
[artifactStore] Inserted intel artifact:    Domain Name: AWSGLOBALACCELERATOR.COM
2025-06-25 13:13:54.154	
[artifactStore] Inserted intel artifact: aacb0a264e514dd48.awsglobalaccelerator.com...
2025-06-25 13:13:54.153	
[artifactStore] Inserted intel artifact: awsglobalaccelerator.com...
2025-06-25 13:13:54.152	
[artifactStore] Inserted intel artifact: aacb0a264e514dd48.awsglobalaccelerator.com...
2025-06-25 13:13:54.150	
[artifactStore] Inserted intel artifact: Squarespace Domains II LLC...
2025-06-25 13:13:54.149	
Registry Domain ID: ...
2025-06-25 13:13:54.149	
[artifactStore] Inserted intel artifact:    Domain Name: BORINGMARKETING.COM
2025-06-25 13:13:54.147	
[artifactStore] Inserted intel artifact: 99.83.190.102...
2025-06-25 13:13:54.145	
[artifactStore] Inserted intel artifact: 75.2.70.75...
2025-06-25 13:13:54.144	
[artifactStore] Inserted intel artifact: boringmarketing.com...
2025-06-25 13:13:54.142	
[artifactStore] Inserted intel artifact: honey@boringmarketing.com...
2025-06-25 13:13:54.141	
[artifactStore] Inserted intel artifact: support@boringmarketing.com...
2025-06-25 13:13:54.139	
[artifactStore] Inserted intel artifact: boringmarketing.com...
2025-06-25 13:13:54.138	
[artifactStore] Inserted intel artifact: boringmarketing.com...
2025-06-25 13:13:54.135	
[2025-06-25T20:13:54.135Z] [SpiderFoot] Raw output size: 15213 bytes
2025-06-25 13:13:46.828	
[2025-06-25T20:13:46.827Z] [worker] [Gn3GbtabDi1] COMPLETED Breach Directory probe: 0 breach findings
2025-06-25 13:13:46.826	
[artifactStore] Inserted scan_error artifact: Breach probe failed: Cannot read properties of null (reading...
2025-06-25 13:13:46.823	
[2025-06-25T20:13:46.822Z] [breachDirectoryProbe] Breach probe failed: Cannot read properties of null (reading 'split')
2025-06-25 13:13:46.823	
[2025-06-25T20:13:46.822Z] [breachDirectoryProbe] LeakCheck response for boringmarketing.com: 2 breached accounts, quota remaining: 999999
2025-06-25 13:13:46.184	
[2025-06-25T20:13:46.182Z] [breachDirectoryProbe] Querying LeakCheck for domain: boringmarketing.com
2025-06-25 13:13:45.827	
[2025-06-25T20:13:45.827Z] [breachDirectoryProbe] Breach Directory response for boringmarketing.com: 0 breached accounts
2025-06-25 13:13:45.035	
[2025-06-25T20:13:45.035Z] [breachDirectoryProbe] Querying Breach Directory for domain: boringmarketing.com
2025-06-25 13:13:45.034	
[2025-06-25T20:13:45.034Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="boringmarketing.com" (BreachDirectory + LeakCheck)
2025-06-25 13:13:45.034	
[2025-06-25T20:13:45.033Z] [worker] [Gn3GbtabDi1] STARTING Breach Directory intelligence probe for boringmarketing.com
2025-06-25 13:13:45.032	
[2025-06-25T20:13:45.032Z] [worker] === Running module (Phase 1): breach_directory_probe ===
2025-06-25 13:13:45.032	
[2025-06-25T20:13:45.032Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:13:45.016	
[2025-06-25T20:13:45.016Z] [SpiderFoot] Command: python3 /opt/spiderfoot/sf.py -q -s boringmarketing.com -m sfp_crtsh,sfp_sublist3r,sfp_chaos,sfp_r7_dns,sfp_haveibeenpwnd,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei,sfp_whois,sfp_dnsresolve -o json
2025-06-25 13:13:45.016	
[2025-06-25T20:13:45.015Z] [SpiderFoot] API keys: HIBP ✅, Chaos ✅ (Shodan/Censys handled by dedicated modules)
2025-06-25 13:13:45.013	
[2025-06-25T20:13:45.012Z] [SpiderFoot] Starting scan for boringmarketing.com (scanId=Gn3GbtabDi1)
2025-06-25 13:13:45.012	
[2025-06-25T20:13:45.012Z] [worker] [Gn3GbtabDi1] STARTING SpiderFoot discovery for boringmarketing.com
2025-06-25 13:13:45.012	
[2025-06-25T20:13:45.012Z] [worker] === Running module (Phase 1): spiderfoot ===
2025-06-25 13:13:45.012	
[2025-06-25T20:13:45.011Z] [worker] [updateScanMasterStatus] Updated scan Gn3GbtabDi1 with: status, current_module, progress
2025-06-25 13:13:45.007	
[queue] Updated job Gn3GbtabDi1 status: processing - Comprehensive security discovery in progress...
2025-06-25 13:13:44.853	
[2025-06-25T20:13:44.853Z] [worker] Processing comprehensive security scan for Boring Marketing (boringmarketing.com)
2025-06-25 13:13:44.853	
[2025-06-25T20:13:44.853Z] [worker] ✅ JOB PICKED UP: Processing scan job Gn3GbtabDi1 for Boring Marketing (boringmarketing.com)
2025-06-25 13:13:44.852	
[2025-06-25T20:13:44.852Z] [worker] Processing scan job: Gn3GbtabDi1