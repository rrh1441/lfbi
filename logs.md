		2025-06-27 14:34:12.652	
[2025-06-27T21:34:12.650Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Lodging Source: 22 verified findings, 24 artifacts across 20 security modules
2025-06-27 14:34:12.652	
[queue] Updated job 9B4x4CU9ED5 status: done - Comprehensive security scan completed - 22 verified findings across 20 security modules. Findings ready for processing.
2025-06-27 14:34:11.708	
[2025-06-27T21:34:11.707Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-06-27 14:34:11.702	
[2025-06-27T21:34:11.702Z] [worker] [processScan] Counted 24 artifacts for scan 9B4x4CU9ED5
2025-06-27 14:34:11.699	
[2025-06-27T21:34:11.699Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: progress
2025-06-27 14:34:11.690	
[2025-06-27T21:34:11.689Z] [worker] [9B4x4CU9ED5] COMPLETED secret detection: 0 secrets found
2025-06-27 14:34:11.689	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-06-27 14:34:11.538	
[2025-06-27T21:34:11.538Z] [trufflehog] Finished secret scan for lodging-source.com Total secrets found: 0
2025-06-27 14:34:11.538	
[2025-06-27T21:34:11.538Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-9B4x4CU9ED5.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-9B4x4CU9ED5.json'
2025-06-27 14:34:11.538	
[2025-06-27T21:34:11.538Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-9B4x4CU9ED5.json
2025-06-27 14:34:11.538	
[2025-06-27T21:34:11.538Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-06-27 14:34:11.537	
[2025-06-27T21:34:11.537Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-06-27 14:34:11.537	
[2025-06-27T21:34:11.537Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-9B4x4CU9ED5.json'
2025-06-27 14:34:11.536	
[2025-06-27T21:34:11.535Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-9B4x4CU9ED5.json
2025-06-27 14:34:11.536	
[2025-06-27T21:34:11.535Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-06-27 14:33:11.215	
[2025-06-27T21:33:11.213Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/main.js
2025-06-27 14:32:48.063	
}
2025-06-27 14:32:48.063	
"RATE_LIMIT_BYPASS": 1
2025-06-27 14:32:48.063	
[2025-06-27T21:32:48.062Z] [SyncWorker] ✅ New findings synced: 1 {
2025-06-27 14:32:12.001	
[2025-06-27T21:32:12.001Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/bundle.js
2025-06-27 14:32:11.094	
[2025-06-27T21:32:11.093Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-06-27 14:32:11.094	
[2025-06-27T21:32:11.093Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-06-27 14:32:11.094	
[2025-06-27T21:32:11.093Z] [trufflehog] Starting targeted secret scan for domain: lodging-source.com
2025-06-27 14:32:11.093	
[2025-06-27T21:32:11.093Z] [worker] [9B4x4CU9ED5] STARTING TruffleHog secret detection for lodging-source.com
2025-06-27 14:32:11.093	
[2025-06-27T21:32:11.092Z] [worker] === Running module: trufflehog (20/20) ===
2025-06-27 14:32:11.093	
[2025-06-27T21:32:11.092Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:32:11.091	
[2025-06-27T21:32:11.091Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: progress
2025-06-27 14:32:11.090	
[2025-06-27T21:32:11.090Z] [worker] [9B4x4CU9ED5] COMPLETED rate limiting tests: 1 rate limit issues found
2025-06-27 14:32:11.090	
[artifactStore] Inserted scan_summary artifact: Rate limit scan completed: 1 issues found...
2025-06-27 14:32:11.083	
[artifactStore] Inserted finding RATE_LIMIT_BYPASS for artifact 3465
2025-06-27 14:32:11.081	
[artifactStore] Inserted rate_limit_bypass artifact: Rate limit bypass possible on endpoint: //www.youtube.com/pl...
2025-06-27 14:32:11.080	
[2025-06-27T21:32:11.079Z] [rateLimitScan] [VULNERABLE] Found 12 bypass techniques for https://lodging-source.com//www.youtube.com/player_api
2025-06-27 14:32:05.934	
[2025-06-27T21:32:05.934Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com//www.youtube.com/player_api. Testing for bypasses...
2025-06-27 14:32:05.934	
[2025-06-27T21:32:05.932Z] [rateLimitScan] Response distribution for https://lodging-source.com//www.youtube.com/player_api: { '404': 25 }
2025-06-27 14:32:04.736	
[2025-06-27T21:32:04.736Z] [rateLimitScan] Establishing baseline for https://lodging-source.com//www.youtube.com/player_api...
2025-06-27 14:32:04.736	
[2025-06-27T21:32:04.736Z] [rateLimitScan] Found 1 endpoints to test.
2025-06-27 14:32:04.734	
[2025-06-27T21:32:04.734Z] [rateLimitScan] Starting comprehensive rate limit scan for lodging-source.com
2025-06-27 14:32:04.734	
[2025-06-27T21:32:04.734Z] [worker] [9B4x4CU9ED5] STARTING rate-limit tests for lodging-source.com
2025-06-27 14:32:04.734	
[2025-06-27T21:32:04.733Z] [worker] === Running module: rate_limit_scan (19/20) ===
2025-06-27 14:32:04.733	
[2025-06-27T21:32:04.733Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:32:04.732	
[2025-06-27T21:32:04.732Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: progress
2025-06-27 14:32:04.731	
[2025-06-27T21:32:04.731Z] [worker] [9B4x4CU9ED5] COMPLETED Nuclei scan: 0 vulnerabilities found
2025-06-27 14:32:04.731	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-06-27 14:32:04.729	
[2025-06-27T21:32:04.729Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-06-27 14:32:04.663	
[2025-06-27T21:32:04.663Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-06-27 14:32:04.663	
[2025-06-27T21:32:04.663Z] [nuclei] [Tag Scan] Failed for https://lodging-source.com: Command failed: nuclei -u https://lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -json -silent -timeout 10 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:32:03.289	
[2025-06-27T21:32:03.228Z] [nuclei] [Tag Scan] Running on https://lodging-source.com with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-27 14:32:03.227	
[2025-06-27T21:32:03.227Z] [nuclei] --- Starting Phase 1: Tag-based scans on 1 targets ---
2025-06-27 14:32:03.227	
[2025-06-27T21:32:03.227Z] [nuclei] Template update complete.
2025-06-27 14:32:03.227	
[INF] No new updates found for nuclei templates
2025-06-27 14:32:03.227	
projectdiscovery.io
2025-06-27 14:32:03.227	
/_/ /_/\__,_/\___/_/\___/_/   v3.2.9
2025-06-27 14:32:03.227	
/ / / / /_/ / /__/ /  __/ /
2025-06-27 14:32:03.227	
/ __ \/ / / / ___/ / _ \/ /
2025-06-27 14:32:03.227	
____  __  _______/ /__  (_)
2025-06-27 14:32:03.227	
__     _
2025-06-27 14:32:03.227	
[2025-06-27T21:32:03.226Z] [nuclei] Template update stderr:
2025-06-27 14:32:01.856	
[2025-06-27T21:32:01.855Z] [nuclei] Templates are outdated (> 24 hours). Updating...
2025-06-27 14:32:01.855	
[INF] PDCP Directory: /root/.pdcp
2025-06-27 14:32:01.855	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-06-27 14:32:01.855	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-06-27 14:32:01.855	
[2025-06-27T21:32:01.854Z] [nuclei] Version check stderr: [INF] Nuclei Engine Version: v3.2.9
2025-06-27 14:32:01.854	
[2025-06-27T21:32:01.854Z] [nuclei] Nuclei binary found.
2025-06-27 14:32:00.578	
[2025-06-27T21:32:00.578Z] [nuclei] Starting enhanced vulnerability scan for lodging-source.com
2025-06-27 14:32:00.577	
[2025-06-27T21:32:00.577Z] [worker] [9B4x4CU9ED5] STARTING Nuclei vulnerability scan for lodging-source.com
2025-06-27 14:32:00.577	
[2025-06-27T21:32:00.577Z] [worker] === Running module: nuclei (18/20) ===
2025-06-27 14:32:00.577	
[2025-06-27T21:32:00.577Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:32:00.575	
[2025-06-27T21:32:00.575Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: progress
2025-06-27 14:32:00.570	
[2025-06-27T21:32:00.570Z] [worker] [9B4x4CU9ED5] COMPLETED database scan: 0 database issues found
2025-06-27 14:32:00.569	
[artifactStore] Inserted scan_summary artifact: Database port scan completed: 0 exposed services found...
2025-06-27 14:32:00.493	
[2025-06-27T21:32:00.491Z] [dbPortScan] Completed database scan, found 0 exposed services
2025-06-27 14:31:47.861	
}
2025-06-27 14:31:47.861	
"ACCESSIBILITY_VIOLATION": 6
2025-06-27 14:31:47.861	
[2025-06-27T21:31:47.861Z] [SyncWorker] ✅ New findings synced: 6 {
2025-06-27 14:31:47.678	
}
2025-06-27 14:31:47.678	
]
2025-06-27 14:31:47.678	
"Lodging Source: db_port_scan (80%)"
2025-06-27 14:31:47.678	
"progress": [
2025-06-27 14:31:47.678	
[2025-06-27T21:31:47.678Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-27 14:31:46.653	
[2025-06-27T21:31:46.652Z] [dbPortScan] [1/8] Scanning lodging-source.com:27017...
2025-06-27 14:31:46.569	
[2025-06-27T21:31:46.568Z] [dbPortScan] [1/8] Scanning lodging-source.com:11211...
2025-06-27 14:31:46.409	
[2025-06-27T21:31:46.409Z] [dbPortScan] [1/8] Scanning lodging-source.com:9200...
2025-06-27 14:31:46.341	
[2025-06-27T21:31:46.340Z] [dbPortScan] [1/8] Scanning lodging-source.com:8086...
2025-06-27 14:31:30.334	
[2025-06-27T21:31:30.334Z] [dbPortScan] [1/8] Scanning lodging-source.com:6379...
2025-06-27 14:31:30.260	
[2025-06-27T21:31:30.258Z] [dbPortScan] [1/8] Scanning lodging-source.com:5432...
2025-06-27 14:31:30.254	
[2025-06-27T21:31:30.252Z] [dbPortScan] [1/8] Scanning lodging-source.com:3306...
2025-06-27 14:31:30.180	
[2025-06-27T21:31:30.179Z] [dbPortScan] [1/8] Scanning lodging-source.com:1433...
2025-06-27 14:31:29.140	
[2025-06-27T21:31:29.139Z] [dbPortScan] Validating dependencies...
2025-06-27 14:31:29.139	
[2025-06-27T21:31:29.139Z] [dbPortScan] Starting enhanced database security scan for lodging-source.com
2025-06-27 14:31:29.139	
[2025-06-27T21:31:29.138Z] [worker] [9B4x4CU9ED5] STARTING database port scan for lodging-source.com
2025-06-27 14:31:29.139	
[2025-06-27T21:31:29.138Z] [worker] === Running module: db_port_scan (17/20) ===
2025-06-27 14:31:29.139	
[2025-06-27T21:31:29.138Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:31:29.137	
[2025-06-27T21:31:29.137Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: progress
2025-06-27 14:31:29.136	
[2025-06-27T21:31:29.136Z] [worker] [9B4x4CU9ED5] COMPLETED typosquat analysis: 0 active typosquats detected
2025-06-27 14:31:29.136	
[2025-06-27T21:31:29.136Z] [worker] Skipping removed typosquatScorer module - functionality merged into dnsTwist
2025-06-27 14:31:29.136	
[2025-06-27T21:31:29.136Z] [worker] [9B4x4CU9ED5] STARTING typosquat analysis for lodging-source.com
2025-06-27 14:31:29.136	
[2025-06-27T21:31:29.136Z] [worker] === Running module: typosquat_scorer (16/20) ===
2025-06-27 14:31:29.136	
[2025-06-27T21:31:29.135Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:31:29.134	
[2025-06-27T21:31:29.134Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: progress
2025-06-27 14:31:29.132	
[2025-06-27T21:31:29.132Z] [worker] [9B4x4CU9ED5] COMPLETED email bruteforce surface scan: 0 email attack vectors found
2025-06-27 14:31:29.132	
[2025-06-27T21:31:29.132Z] [emailBruteforceSurface] No email services detected
2025-06-27 14:31:29.132	
[2025-06-27T21:31:29.132Z] [emailBruteforceSurface] Nuclei email scan failed: Command failed: nuclei -list /tmp/nuclei-email-targets-1751059887949.txt -t technologies/microsoft-exchange-server-detect.yaml -t technologies/outlook-web-access-detect.yaml -t technologies/owa-detect.yaml -t network/smtp-detect.yaml -t network/imap-detect.yaml -t network/pop3-detect.yaml -t technologies/exchange-autodiscover.yaml -t technologies/activesync-detect.yaml -t misconfiguration/exchange-server-login.yaml -t misconfiguration/owa-login-portal.yaml -json -silent -timeout 30 -retries 2 -c 6 -headless -dca -td /opt/nuclei-templates
2025-06-27 14:31:27.949	
[2025-06-27T21:31:27.949Z] [emailBruteforceSurface] Running Nuclei with 10 email templates against 50 targets
2025-06-27 14:31:27.949	
[2025-06-27T21:31:27.948Z] [emailBruteforceSurface] Generated 408 email service targets
2025-06-27 14:31:27.945	
[2025-06-27T21:31:27.945Z] [emailBruteforceSurface] Starting email bruteforce surface scan for domain="lodging-source.com"
2025-06-27 14:31:27.945	
[2025-06-27T21:31:27.944Z] [worker] [9B4x4CU9ED5] STARTING email bruteforce surface scan for lodging-source.com
2025-06-27 14:31:27.945	
[2025-06-27T21:31:27.944Z] [worker] === Running module: email_bruteforce_surface (15/20) ===
2025-06-27 14:31:27.945	
[2025-06-27T21:31:27.944Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:31:27.943	
[2025-06-27T21:31:27.943Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: progress
2025-06-27 14:31:27.941	
[2025-06-27T21:31:27.941Z] [worker] [9B4x4CU9ED5] COMPLETED RDP/VPN templates scan: 0 remote access vulnerabilities found
2025-06-27 14:31:27.941	
[2025-06-27T21:31:27.941Z] [rdpVpnTemplates] No RDP/VPN vulnerabilities detected
2025-06-27 14:31:27.941	
[2025-06-27T21:31:27.940Z] [rdpVpnTemplates] Nuclei RDP/VPN scan failed: Command failed: nuclei -list /tmp/nuclei-rdpvpn-targets-1751059887658.txt -t network/rdp-detect.yaml -t network/rdp-bluekeep-detect.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2018-13379.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2019-5591.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2020-12812.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2019-1579.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2020-2021.yaml -t vulnerabilities/citrix/citrix-adc-cve-2019-19781.yaml -t vulnerabilities/pulse/pulse-connect-secure-cve-2019-11510.yaml -t technologies/rdp-detect.yaml -t technologies/vpn-detect.yaml -json -silent -timeout 30 -retries 2 -c 6 -headless -dca -td /opt/nuclei-templates
2025-06-27 14:31:27.660	
[2025-06-27T21:31:27.659Z] [rdpVpnTemplates] Running Nuclei with 11 RDP/VPN templates against 22 targets
2025-06-27 14:31:27.658	
[2025-06-27T21:31:27.657Z] [rdpVpnTemplates] Generated 22 target URLs for RDP/VPN scanning
2025-06-27 14:31:27.654	
[2025-06-27T21:31:27.654Z] [rdpVpnTemplates] Starting RDP/VPN templates scan for domain="lodging-source.com"
2025-06-27 14:31:27.654	
[2025-06-27T21:31:27.654Z] [worker] [9B4x4CU9ED5] STARTING RDP/VPN vulnerability templates for lodging-source.com
2025-06-27 14:31:27.654	
[2025-06-27T21:31:27.654Z] [worker] === Running module: rdp_vpn_templates (14/20) ===
2025-06-27 14:31:27.654	
[2025-06-27T21:31:27.654Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:31:27.647	
[2025-06-27T21:31:27.646Z] [worker] [9B4x4CU9ED5] COMPLETED accessibility scan: 6 WCAG violations found
2025-06-27 14:31:27.647	
[2025-06-27T21:31:27.646Z] [accessibilityScan] Accessibility scan completed: 6 findings from 1/15 pages in 224734ms
2025-06-27 14:31:27.646	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3462
2025-06-27 14:31:27.645	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3462
2025-06-27 14:31:27.643	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3462
2025-06-27 14:31:27.642	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3462
2025-06-27 14:31:27.640	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3462
2025-06-27 14:31:27.639	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3462
2025-06-27 14:31:27.637	
[artifactStore] Inserted accessibility_summary artifact: Accessibility scan: 6 violations across 1 pages (2 critical,...
2025-06-27 14:31:27.612	
[2025-06-27T21:31:27.612Z] [accessibilityScan] Accessibility analysis complete: 6 violations (2 critical, 4 serious)
2025-06-27 14:31:26.595	
[2025-06-27T21:31:26.594Z] [dynamicBrowser] Page operation completed in 2097ms
2025-06-27 14:31:24.498	
[2025-06-27T21:31:24.497Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/help
2025-06-27 14:31:23.335	
[2025-06-27T21:31:23.334Z] [dynamicBrowser] Page operation completed in 2111ms
2025-06-27 14:31:21.225	
[2025-06-27T21:31:21.223Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/search
2025-06-27 14:31:20.014	
[2025-06-27T21:31:20.013Z] [dynamicBrowser] Page operation completed in 2148ms
2025-06-27 14:31:17.866	
[2025-06-27T21:31:17.865Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/join
2025-06-27 14:31:16.499	
[2025-06-27T21:31:16.498Z] [dynamicBrowser] Page operation completed in 2384ms
2025-06-27 14:31:14.115	
[2025-06-27T21:31:14.114Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/register
2025-06-27 14:31:12.901	
[2025-06-27T21:31:12.900Z] [dynamicBrowser] Page operation completed in 3203ms
2025-06-27 14:31:09.697	
[2025-06-27T21:31:09.697Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/login
2025-06-27 14:31:07.216	
[2025-06-27T21:31:07.214Z] [dynamicBrowser] Page operation completed in 2800ms
2025-06-27 14:31:04.414	
[2025-06-27T21:31:04.414Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/signup
2025-06-27 14:31:02.412	
[2025-06-27T21:31:02.411Z] [dynamicBrowser] Page operation completed in 2879ms
2025-06-27 14:30:59.532	
[2025-06-27T21:30:59.532Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/pricing
2025-06-27 14:30:57.615	
[2025-06-27T21:30:57.613Z] [dynamicBrowser] Page operation completed in 2884ms
2025-06-27 14:30:54.730	
[2025-06-27T21:30:54.729Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/products
2025-06-27 14:30:52.329	
[2025-06-27T21:30:52.329Z] [dynamicBrowser] Page operation completed in 1439ms
2025-06-27 14:30:50.892	
[2025-06-27T21:30:50.890Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/services
2025-06-27 14:30:46.653	
[2025-06-27T21:30:46.653Z] [dynamicBrowser] Page operation completed in 1430ms
2025-06-27 14:30:45.223	
[2025-06-27T21:30:45.223Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/about
2025-06-27 14:30:41.052	
[2025-06-27T21:30:41.051Z] [dynamicBrowser] Page operation completed in 1439ms
2025-06-27 14:30:39.613	
[2025-06-27T21:30:39.612Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/contact
2025-06-27 14:30:34.252	
[2025-06-27T21:30:34.251Z] [accessibilityScan] Accessibility test error for https://www.lodging-source.com/: Navigation timeout of 30000 ms exceeded
2025-06-27 14:30:13.296	
[2025-06-27T21:30:13.296Z] [dynamicBrowser] Metrics: browser_rss_mb=120, heap_used_mb=63, pages_open=1
2025-06-27 14:30:03.215	
[2025-06-27T21:30:03.215Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com/
2025-06-27 14:29:57.531	
[2025-06-27T21:29:57.530Z] [accessibilityScan] Accessibility test error for https://www.lodging-source.com: Navigation timeout of 30000 ms exceeded
2025-06-27 14:29:43.295	
[2025-06-27T21:29:43.294Z] [dynamicBrowser] Metrics: browser_rss_mb=120, heap_used_mb=62, pages_open=1
2025-06-27 14:29:26.733	
[2025-06-27T21:29:26.733Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com
2025-06-27 14:29:22.169	
[2025-06-27T21:29:22.168Z] [accessibilityScan] Accessibility test error for https://lodging-source.com/: Navigation timeout of 30000 ms exceeded
2025-06-27 14:29:13.294	
[2025-06-27T21:29:13.290Z] [dynamicBrowser] Metrics: browser_rss_mb=120, heap_used_mb=61, pages_open=1
2025-06-27 14:28:51.209	
[2025-06-27T21:28:51.136Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/
2025-06-27 14:28:42.095	
[2025-06-27T21:28:42.095Z] [dynamicBrowser] Page operation completed in 43353ms
2025-06-27 14:28:42.095	
[2025-06-27T21:28:42.094Z] [accessibilityScan] Accessibility test complete for https://lodging-source.com: 6 violations, 22 passes
2025-06-27 14:28:13.270	
[2025-06-27T21:28:13.270Z] [dynamicBrowser] Metrics: browser_rss_mb=117, heap_used_mb=59, pages_open=1
2025-06-27 14:28:08.525	
[2025-06-27T21:28:08.525Z] [worker] [9B4x4CU9ED5] COMPLETED tech stack scan: 0 technologies detected
2025-06-27 14:28:08.525	
[2025-06-27T21:28:08.525Z] [techStackScan] techstack=complete arts=0 time=25648ms
2025-06-27 14:28:08.525	
[artifactStore] Inserted techscan_metrics artifact: Technology scan metrics: 0 technologies, 0 supply chain risk...
2025-06-27 14:28:08.523	
[artifactStore] Inserted sbom_cyclonedx artifact: Software Bill of Materials (CycloneDX 1.5) - 0 components...
2025-06-27 14:28:08.489	
" code="2"
2025-06-27 14:28:08.489	
[2025-06-27T21:28:08.489Z] [techStackScan] techstack=nuclei_error url="https://maxcdn.bootstrapcdn.com" error="Command failed: nuclei -u https://maxcdn.bootstrapcdn.com -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:08.489	
" code="2"
2025-06-27 14:28:08.489	
[2025-06-27T21:28:08.488Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/direct//" error="Command failed: nuclei -u https://lodging-source.com/direct// -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:08.288	
" code="2"
2025-06-27 14:28:08.288	
[2025-06-27T21:28:08.287Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com//www.youtube.com/player_api" error="Command failed: nuclei -u https://lodging-source.com//www.youtube.com/player_api -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:08.287	
" code="2"
2025-06-27 14:28:08.287	
[2025-06-27T21:28:08.287Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com" error="Command failed: nuclei -u https://lodging-source.com -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:08.286	
" code="2"
2025-06-27 14:28:08.286	
[2025-06-27T21:28:08.285Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/" error="Command failed: nuclei -u https://lodging-source.com/ -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:08.286	
[2025-06-27T21:28:08.285Z] [techStackScan] techstack=nuclei_skip url="null" reason="invalid_url"
2025-06-27 14:28:08.278	
" code="2"
2025-06-27 14:28:08.278	
[2025-06-27T21:28:08.277Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/direct/index.php" error="Command failed: nuclei -u https://lodging-source.com/direct/index.php -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:08.134	
[2025-06-27T21:28:08.134Z] [techStackScan] techstack=nuclei url="https://maxcdn.bootstrapcdn.com"
2025-06-27 14:28:08.134	
" code="2"
2025-06-27 14:28:08.134	
[2025-06-27T21:28:08.134Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/index.html" error="Command failed: nuclei -u https://lodging-source.com/index.html -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:08.126	
[2025-06-27T21:28:08.125Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct//"
2025-06-27 14:28:08.126	
" code="2"
2025-06-27 14:28:08.126	
[2025-06-27T21:28:08.125Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/home.html" error="Command failed: nuclei -u https://lodging-source.com/home.html -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:07.999	
[2025-06-27T21:28:07.998Z] [techStackScan] techstack=nuclei url="https://lodging-source.com//www.youtube.com/player_api"
2025-06-27 14:28:07.998	
" code="2"
2025-06-27 14:28:07.998	
[2025-06-27T21:28:07.998Z] [techStackScan] techstack=nuclei_error url="https://www.lodging-source.com" error="Command failed: nuclei -u https://www.lodging-source.com -tags tech -json -silent -timeout 20 -retries 2 -headless -td /opt/nuclei-templates -dca
2025-06-27 14:28:05.571	
[2025-06-27T21:28:05.571Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/home.html"
2025-06-27 14:28:05.565	
[2025-06-27T21:28:05.565Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct/index.php"
2025-06-27 14:28:05.550	
[2025-06-27T21:28:05.549Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/"
2025-06-27 14:28:05.540	
[2025-06-27T21:28:05.540Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/index.html"
2025-06-27 14:28:05.532	
[2025-06-27T21:28:05.531Z] [techStackScan] techstack=nuclei url="https://www.lodging-source.com"
2025-06-27 14:28:05.524	
[2025-06-27T21:28:05.523Z] [techStackScan] techstack=nuclei url="https://lodging-source.com"
2025-06-27 14:28:05.520	
[2025-06-27T21:28:05.520Z] [techStackScan] techstack=targets primary=8 thirdParty=2 total=10
2025-06-27 14:28:05.478	
[2025-06-27T21:28:05.478Z] [dynamicBrowser] Page operation completed in 6719ms
2025-06-27 14:28:05.478	
[2025-06-27T21:28:05.478Z] [techStackScan] thirdParty=discovered domain=lodging-source.com origins=2
2025-06-27 14:27:58.744	
[2025-06-27T21:27:58.742Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com
2025-06-27 14:27:56.541	
[2025-06-27T21:27:56.539Z] [dynamicBrowser] Browser launched successfully
2025-06-27 14:27:47.868	
}
2025-06-27 14:27:47.868	
"TYPOSQUAT_REDIRECT": 1
2025-06-27 14:27:47.868	
[2025-06-27T21:27:47.868Z] [SyncWorker] ✅ New findings synced: 1 {
2025-06-27 14:27:45.606	
[2025-06-27T21:27:45.606Z] [techStackScan] buildTargets discovered=6 total=8
2025-06-27 14:27:45.602	
[2025-06-27T21:27:45.602Z] [techStackScan] techstack=nuclei confirmed available
2025-06-27 14:27:43.265	
[2025-06-27T21:27:43.264Z] [dynamicBrowser] Launching new browser instance
2025-06-27 14:27:43.264	
[2025-06-27T21:27:43.264Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-27 14:27:43.263	
[2025-06-27T21:27:43.263Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-27 14:27:43.262	
[2025-06-27T21:27:43.262Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-06-27 14:27:42.934	
[2025-06-27T21:27:42.933Z] [worker] [9B4x4CU9ED5] COMPLETED denial-of-wallet scan: 0 cost amplification vulnerabilities found
2025-06-27 14:27:42.933	
[2025-06-27T21:27:42.933Z] [denialWalletScan] Denial-of-wallet scan completed: 0 findings in 4ms
2025-06-27 14:27:42.933	
[2025-06-27T21:27:42.933Z] [denialWalletScan] Filtered to 0 potential cost-amplification endpoints
2025-06-27 14:27:42.933	
[2025-06-27T21:27:42.932Z] [denialWalletScan] Found 6 endpoints from endpoint discovery
2025-06-27 14:27:42.931	
[2025-06-27T21:27:42.930Z] [worker] [9B4x4CU9ED5] COMPLETED AbuseIPDB scan: 0 malicious/suspicious IPs found
2025-06-27 14:27:42.931	
[2025-06-27T21:27:42.930Z] [abuseIntelScan] No IP artifacts found for this scan
2025-06-27 14:27:42.930	
[2025-06-27T21:27:42.930Z] [abuseIntelScan] Found 0 IP artifacts for scan 9B4x4CU9ED5
2025-06-27 14:27:42.929	
[2025-06-27T21:27:42.929Z] [denialWalletScan] Starting denial-of-wallet scan for domain="lodging-source.com"
2025-06-27 14:27:42.929	
[2025-06-27T21:27:42.929Z] [worker] [9B4x4CU9ED5] STARTING denial-of-wallet vulnerability scan for lodging-source.com
2025-06-27 14:27:42.929	
[2025-06-27T21:27:42.927Z] [worker] === Running module (Phase 2C): denial_wallet_scan ===
2025-06-27 14:27:42.927	
[2025-06-27T21:27:42.927Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:27:42.924	
[2025-06-27T21:27:42.923Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=9B4x4CU9ED5
2025-06-27 14:27:42.924	
[2025-06-27T21:27:42.921Z] [worker] [9B4x4CU9ED5] STARTING AbuseIPDB intelligence scan for IPs
2025-06-27 14:27:42.924	
[2025-06-27T21:27:42.921Z] [worker] === Running module (Phase 2C): abuse_intel_scan ===
2025-06-27 14:27:42.924	
[2025-06-27T21:27:42.921Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:27:42.914	
[2025-06-27T21:27:42.912Z] [accessibilityScan] Starting accessibility scan for domain="lodging-source.com"
2025-06-27 14:27:42.912	
[2025-06-27T21:27:42.912Z] [worker] [9B4x4CU9ED5] STARTING accessibility compliance scan for lodging-source.com
2025-06-27 14:27:42.912	
[2025-06-27T21:27:42.912Z] [worker] === Running module (Phase 2C): accessibility_scan ===
2025-06-27 14:27:42.912	
[2025-06-27T21:27:42.911Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:27:42.877	
[2025-06-27T21:27:42.877Z] [techStackScan] techstack=start domain=lodging-source.com
2025-06-27 14:27:42.876	
[2025-06-27T21:27:42.876Z] [worker] [9B4x4CU9ED5] STARTING tech stack scan for lodging-source.com
2025-06-27 14:27:42.876	
[2025-06-27T21:27:42.876Z] [worker] === Running module (Phase 2C): tech_stack_scan ===
2025-06-27 14:27:42.876	
[2025-06-27T21:27:42.876Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:27:42.870	
[2025-06-27T21:27:42.869Z] [worker] [9B4x4CU9ED5] COMPLETED endpoint discovery: 6 endpoint collections found
2025-06-27 14:27:42.870	
[2025-06-27T21:27:42.869Z] [endpointDiscovery] ⇢ done – 6 endpoints
2025-06-27 14:27:42.870	
[artifactStore] Inserted discovered_endpoints artifact: Discovered 6 unique endpoints for lodging-source.com...
2025-06-27 14:27:07.272	
[2025-06-27T21:27:07.272Z] [endpointDiscovery] +crawl_link /direct// (-)
2025-06-27 14:27:06.061	
[2025-06-27T21:27:06.061Z] [endpointDiscovery] +js_analysis //www.youtube.com/player_api (-)
2025-06-27 14:27:05.718	
[2025-06-27T21:27:05.718Z] [endpointDiscovery] +crawl_link /home.html (-)
2025-06-27 14:27:05.718	
[2025-06-27T21:27:05.718Z] [endpointDiscovery] +crawl_link /direct/index.php (-)
2025-06-27 14:27:05.718	
[2025-06-27T21:27:05.717Z] [endpointDiscovery] +crawl_link / (-)
2025-06-27 14:27:05.717	
[2025-06-27T21:27:05.717Z] [endpointDiscovery] +crawl_link /index.html (-)
2025-06-27 14:27:05.280	
[2025-06-27T21:27:05.278Z] [endpointDiscovery] ⇢ start lodging-source.com
2025-06-27 14:27:05.278	
[2025-06-27T21:27:05.278Z] [worker] [9B4x4CU9ED5] STARTING endpoint discovery for lodging-source.com
2025-06-27 14:27:05.278	
[2025-06-27T21:27:05.278Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:27:05.271	
[2025-06-27T21:27:05.271Z] [worker] === Running endpoint discovery ===
2025-06-27 14:27:05.271	
[2025-06-27T21:27:05.270Z] [worker] [9B4x4CU9ED5] COMPLETED DNS Twist: 5 typo-domains found
2025-06-27 14:27:05.270	
[2025-06-27T21:27:05.270Z] [dnstwist] Scan completed – 5 domains analysed
2025-06-27 14:27:05.270	
[artifactStore] Inserted finding TYPOSQUAT_REDIRECT for artifact 3458
2025-06-27 14:27:05.268	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgings...
2025-06-27 14:26:47.747	
}
2025-06-27 14:26:47.747	
]
2025-06-27 14:26:47.747	
"Lodging Source: dns_twist_phase2a (20%)"
2025-06-27 14:26:47.747	
"progress": [
2025-06-27 14:26:47.747	
[2025-06-27T21:26:47.747Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-27 14:25:47.865	
}
2025-06-27 14:25:47.865	
}
2025-06-27 14:25:47.865	
"PHISHING_SETUP": 4
2025-06-27 14:25:47.865	
"PHISHING_SETUP": 4
2025-06-27 14:25:47.865	
[2025-06-27T21:25:47.864Z] [SyncWorker] ✅ New findings synced: 4 {
2025-06-27 14:25:47.865	
[2025-06-27T21:25:47.864Z] [SyncWorker] ✅ New findings synced: 4 {
2025-06-27 14:25:47.643	
}
2025-06-27 14:25:47.643	
}
2025-06-27 14:25:47.643	
]
2025-06-27 14:25:47.643	
]
2025-06-27 14:25:47.643	
"Lodging Source: dns_twist_phase2a (20%)"
2025-06-27 14:25:47.643	
"Lodging Source: dns_twist_phase2a (20%)"
2025-06-27 14:25:47.643	
"progress": [
2025-06-27 14:25:47.643	
"progress": [
2025-06-27 14:25:47.643	
[2025-06-27T21:25:47.642Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-27 14:25:47.643	
[2025-06-27T21:25:47.642Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-27 14:25:30.015	
[2025-06-27T21:25:30.015Z] [worker] [9B4x4CU9ED5] COMPLETED document exposure: 0 discoveries
2025-06-27 14:25:30.015	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-06-27 14:25:29.996	
[2025-06-27T21:25:29.995Z] [documentExposure] Completed: 0 files found, 10 Serper calls (~$0.030)
2025-06-27 14:25:29.996	
[2025-06-27T21:25:29.995Z] [documentExposure] Reached search query limit (10) - stopping to control costs
2025-06-27 14:25:28.495	
[2025-06-27T21:25:28.494Z] [documentExposure] Serper returned 0 results for query 10
2025-06-27 14:25:27.710	
[2025-06-27T21:25:27.709Z] [documentExposure] Serper API call 10: ""Lodging Source" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-06-27 14:25:25.423	
[2025-06-27T21:25:25.423Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-27 14:25:22.754	
[2025-06-27T21:25:22.754Z] [documentExposure] Serper returned 7 results for query 9
2025-06-27 14:25:22.101	
[2025-06-27T21:25:22.100Z] [documentExposure] Serper API call 9: ""Lodging Source" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-06-27 14:25:19.707	
[2025-06-27T21:25:19.707Z] [documentExposure] Serper returned 8 results for query 8
2025-06-27 14:25:18.044	
[2025-06-27T21:25:18.043Z] [documentExposure] Serper API call 8: ""Lodging Source" (intitle:"index of" OR intitle:"directory listing")"
2025-06-27 14:25:16.542	
[2025-06-27T21:25:16.542Z] [documentExposure] Serper returned 20 results for query 7
2025-06-27 14:25:14.691	
[2025-06-27T21:25:14.690Z] [documentExposure] Serper API call 7: ""Lodging Source" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-06-27 14:25:12.583	
[2025-06-27T21:25:12.583Z] [documentExposure] Serper returned 1 results for query 6
2025-06-27 14:25:11.523	
[2025-06-27T21:25:11.522Z] [documentExposure] Serper API call 6: ""Lodging Source" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-06-27 14:25:10.020	
[2025-06-27T21:25:10.020Z] [documentExposure] Serper returned 2 results for query 5
2025-06-27 14:25:09.195	
[2025-06-27T21:25:09.194Z] [documentExposure] Serper API call 5: ""Lodging Source" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-06-27 14:25:07.692	
[2025-06-27T21:25:07.692Z] [documentExposure] Serper returned 10 results for query 4
2025-06-27 14:25:04.190	
[2025-06-27T21:25:04.187Z] [documentExposure] Serper API call 4: ""Lodging Source" ("database" OR "backup" OR "dump") filetype:sql"
2025-06-27 14:25:02.686	
[2025-06-27T21:25:02.686Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-27 14:24:59.557	
[2025-06-27T21:24:59.554Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-27 14:24:58.217	
[2025-06-27T21:24:58.217Z] [documentExposure] Serper returned 10 results for query 3
2025-06-27 14:24:57.186	
[2025-06-27T21:24:57.183Z] [documentExposure] Serper API call 3: ""Lodging Source" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-06-27 14:24:55.683	
[2025-06-27T21:24:55.683Z] [documentExposure] process error: Request failed with status code 403
2025-06-27 14:24:54.813	
[2025-06-27T21:24:54.812Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-27 14:24:52.945	
[2025-06-27T21:24:52.942Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-27 14:24:52.178	
[2025-06-27T21:24:52.178Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-27 14:24:51.872	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3456
2025-06-27 14:24:51.870	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgin.g...
2025-06-27 14:24:51.656	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3455
2025-06-27 14:24:51.655	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-27 14:24:51.459	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3454
2025-06-27 14:24:51.458	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-27 14:24:51.002	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3453
2025-06-27 14:24:51.000	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-27 14:24:50.979	
[2025-06-27T21:24:50.979Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-27 14:24:50.693	
[2025-06-27T21:24:50.693Z] [dnstwist] Batch 1/1
2025-06-27 14:24:50.693	
[2025-06-27T21:24:50.692Z] [dnstwist] Found 5 registered typosquat candidates to analyze
2025-06-27 14:24:50.359	
[2025-06-27T21:24:50.358Z] [documentExposure] process error: timeout of 30000ms exceeded
2025-06-27 14:24:48.050	
}
2025-06-27 14:24:48.050	
}
2025-06-27 14:24:48.050	
"CRITICAL_INFOSTEALER": 1
2025-06-27 14:24:48.050	
"CRITICAL_INFOSTEALER": 1
2025-06-27 14:24:48.050	
"MEDIUM_EMAIL_EXPOSED": 56,
2025-06-27 14:24:48.050	
"MEDIUM_EMAIL_EXPOSED": 56,
2025-06-27 14:24:48.050	
"HIGH_PASSWORD_EXPOSED": 6,
2025-06-27 14:24:48.050	
"HIGH_PASSWORD_EXPOSED": 6,
2025-06-27 14:24:48.050	
[2025-06-27T21:24:48.050Z] [SyncWorker] ✅ New compromised credentials synced: 63 {
2025-06-27 14:24:48.050	
[2025-06-27T21:24:48.050Z] [SyncWorker] ✅ New compromised credentials synced: 63 {
2025-06-27 14:24:47.931	
}
2025-06-27 14:24:47.931	
}
2025-06-27 14:24:47.931	
"MISSING_TLS_CERTIFICATE": 1
2025-06-27 14:24:47.931	
"MISSING_TLS_CERTIFICATE": 1
2025-06-27 14:24:47.931	
"TLS_CONFIGURATION_ISSUE": 2,
2025-06-27 14:24:47.931	
"TLS_CONFIGURATION_ISSUE": 2,
2025-06-27 14:24:47.931	
"EXPOSED_SERVICE": 1,
2025-06-27 14:24:47.931	
"EXPOSED_SERVICE": 1,
2025-06-27 14:24:47.931	
"EMAIL_SECURITY_WEAKNESS": 1,
2025-06-27 14:24:47.931	
"EMAIL_SECURITY_WEAKNESS": 1,
2025-06-27 14:24:47.931	
"MULTIPLE_BREACH_SOURCES": 1,
2025-06-27 14:24:47.931	
"MULTIPLE_BREACH_SOURCES": 1,
2025-06-27 14:24:47.931	
"BREACH_SUMMARY": 1,
2025-06-27 14:24:47.931	
"BREACH_SUMMARY": 1,
2025-06-27 14:24:47.931	
"EMAIL_EXPOSURE": 1,
2025-06-27 14:24:47.931	
"EMAIL_EXPOSURE": 1,
2025-06-27 14:24:47.931	
"PASSWORD_EXPOSURE": 1,
2025-06-27 14:24:47.931	
"PASSWORD_EXPOSURE": 1,
2025-06-27 14:24:47.931	
"INFOSTEALER_COMPROMISE": 1,
2025-06-27 14:24:47.931	
"INFOSTEALER_COMPROMISE": 1,
2025-06-27 14:24:47.931	
[2025-06-27T21:24:47.931Z] [SyncWorker] ✅ New findings synced: 10 {
2025-06-27 14:24:47.931	
[2025-06-27T21:24:47.931Z] [SyncWorker] ✅ New findings synced: 10 {
2025-06-27 14:24:47.767	
}
2025-06-27 14:24:47.767	
}
2025-06-27 14:24:47.767	
]
2025-06-27 14:24:47.767	
]
2025-06-27 14:24:47.767	
"Lodging Source: dns_twist_phase2a (20%)"
2025-06-27 14:24:47.767	
"Lodging Source: dns_twist_phase2a (20%)"
2025-06-27 14:24:47.767	
"progress": [
2025-06-27 14:24:47.767	
"progress": [
2025-06-27 14:24:47.767	
[2025-06-27T21:24:47.767Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-27 14:24:47.767	
[2025-06-27T21:24:47.767Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-27 14:24:27.728	
[2025-06-27T21:24:27.728Z] [worker] [9B4x4CU9ED5] COMPLETED TLS scan: 3 TLS issues found
2025-06-27 14:24:27.728	
[2025-06-27T21:24:27.728Z] [tlsScan] Scan complete. Hosts: lodging-source.com, www.lodging-source.com. Findings: 3
2025-06-27 14:24:27.728	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 3 issue(s) found...
2025-06-27 14:24:27.726	
[artifactStore] Inserted finding MISSING_TLS_CERTIFICATE for artifact 3451
2025-06-27 14:24:27.724	
[artifactStore] Inserted tls_no_certificate artifact: lodging-source.com - no valid SSL/TLS certificate on any hos...
2025-06-27 14:24:27.722	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 3450
2025-06-27 14:24:27.720	
[artifactStore] Inserted tls_configuration artifact: www.lodging-source.com - Incomplete SSL certificate chain (m...
2025-06-27 14:24:27.698	
[2025-06-27T21:24:27.696Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-27 14:24:27.417	
[2025-06-27T21:24:27.414Z] [tlsScan] Cross-validation complete for www.lodging-source.com: 0 additional findings
2025-06-27 14:24:16.618	
[2025-06-27T21:24:16.618Z] [tlsScan] Python validator: www.lodging-source.com - INVALID
2025-06-27 14:24:16.353	
[2025-06-27T21:24:16.353Z] [tlsScan] Scanning www.lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-27 14:24:16.353	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 3449
2025-06-27 14:24:16.351	
[artifactStore] Inserted tls_configuration artifact: lodging-source.com - Incomplete SSL certificate chain (missi...
2025-06-27 14:24:16.349	
[2025-06-27T21:24:16.349Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-27 14:24:16.068	
[2025-06-27T21:24:16.068Z] [tlsScan] Cross-validation complete for lodging-source.com: 0 additional findings
2025-06-27 14:24:10.312	
[2025-06-27T21:24:10.311Z] [documentExposure] Serper returned 19 results for query 2
2025-06-27 14:24:09.096	
[2025-06-27T21:24:09.095Z] [documentExposure] Serper API call 2: ""Lodging Source" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-06-27 14:24:07.594	
[2025-06-27T21:24:07.593Z] [documentExposure] Serper returned 0 results for query 1
2025-06-27 14:24:07.119	
[2025-06-27T21:24:07.118Z] [documentExposure] Serper API call 1: "site:lodging-source.com (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-06-27 14:24:06.357	
[2025-06-27T21:24:06.357Z] [worker] [9B4x4CU9ED5] COMPLETED Shodan infrastructure scan: 2 services found
2025-06-27 14:24:06.357	
[2025-06-27T21:24:06.357Z] [Shodan] Done — 2 rows persisted, 1 API calls used for 1 targets
2025-06-27 14:24:06.357	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 2 items...
2025-06-27 14:24:06.356	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 3447
2025-06-27 14:24:06.349	
[artifactStore] Inserted shodan_service artifact: 70.35.206.233:443 Apache httpd 2.4.62...
2025-06-27 14:24:06.346	
[2025-06-27T21:24:06.346Z] [Shodan] API call 1 - search query
2025-06-27 14:24:05.626	
[2025-06-27T21:24:05.626Z] [worker] [9B4x4CU9ED5] COMPLETED email security scan: 1 email issues found
2025-06-27 14:24:05.626	
[2025-06-27T21:24:05.625Z] [spfDmarc] Completed email security scan, found 1 issues
2025-06-27 14:24:05.626	
[artifactStore] Inserted bimi_missing artifact: BIMI record not found...
2025-06-27 14:24:05.598	
[2025-06-27T21:24:05.598Z] [tlsScan] Python validator: lodging-source.com - INVALID
2025-06-27 14:24:05.591	
[2025-06-27T21:24:05.590Z] [spfDmarc] Checking for BIMI record...
2025-06-27 14:24:05.590	
[2025-06-27T21:24:05.589Z] [spfDmarc] Found DKIM record with selector: default
2025-06-27 14:24:05.542	
[2025-06-27T21:24:05.542Z] [spfDmarc] Probing for common DKIM selectors...
2025-06-27 14:24:05.302	
[2025-06-27T21:24:05.301Z] [spfDmarc] Performing recursive SPF check...
2025-06-27 14:24:05.301	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 3445
2025-06-27 14:24:05.298	
[artifactStore] Inserted dmarc_weak artifact: DMARC policy is not enforcing...
2025-06-27 14:24:05.181	
[2025-06-27T21:24:05.180Z] [tlsScan] Scanning lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-27 14:24:05.178	

2025-06-27 14:24:05.178	
OpenSSL 3.5.0 8 Apr 2025
2025-06-27 14:24:05.178	
[2025-06-27T21:24:05.178Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-06-27 14:24:05.169	
[2025-06-27T21:24:05.169Z] [dnstwist] WHOIS enrichment disabled (saves ~$0.30-0.75 per scan) - set ENABLE_WHOIS_ENRICHMENT=true to enable
2025-06-27 14:24:05.168	
[2025-06-27T21:24:05.167Z] [dnstwist] Starting typosquat scan for lodging-source.com
2025-06-27 14:24:05.167	
[2025-06-27T21:24:05.166Z] [worker] [9B4x4CU9ED5] STARTING DNS Twist scan for lodging-source.com
2025-06-27 14:24:05.167	
[2025-06-27T21:24:05.166Z] [worker] === Running module (Phase 2A): dns_twist ===
2025-06-27 14:24:05.166	
[2025-06-27T21:24:05.166Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:24:05.163	
[2025-06-27T21:24:05.163Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-06-27 14:24:05.163	
[2025-06-27T21:24:05.162Z] [worker] [9B4x4CU9ED5] STARTING document exposure scan for Lodging Source
2025-06-27 14:24:05.162	
[2025-06-27T21:24:05.162Z] [worker] === Running module (Phase 2A): document_exposure ===
2025-06-27 14:24:05.162	
[2025-06-27T21:24:05.162Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:24:05.157	
[2025-06-27T21:24:05.153Z] [spfDmarc] Checking DMARC record...
2025-06-27 14:24:05.157	
[2025-06-27T21:24:05.153Z] [spfDmarc] Starting email security scan for lodging-source.com
2025-06-27 14:24:05.157	
[2025-06-27T21:24:05.152Z] [worker] [9B4x4CU9ED5] STARTING SPF/DMARC email security scan for lodging-source.com
2025-06-27 14:24:05.157	
[2025-06-27T21:24:05.152Z] [worker] === Running module (Phase 2A): spf_dmarc ===
2025-06-27 14:24:05.157	
[2025-06-27T21:24:05.152Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:24:05.147	
[2025-06-27T21:24:05.147Z] [worker] [9B4x4CU9ED5] STARTING TLS security scan for lodging-source.com
2025-06-27 14:24:05.147	
[2025-06-27T21:24:05.146Z] [worker] === Running module (Phase 2A): tls_scan ===
2025-06-27 14:24:05.146	
[2025-06-27T21:24:05.146Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:24:05.089	
[2025-06-27T21:24:05.089Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-06-27 14:24:05.089	
[2025-06-27T21:24:05.089Z] [worker] [9B4x4CU9ED5] COMPLETED Censys platform scan: 0 services found
2025-06-27 14:24:05.089	
[9B4x4CU9ED5] Censys scan skipped - CENSYS_PAT and CENSYS_ORG_ID not configured (saves ~$2-10 per scan)
2025-06-27 14:24:05.088	
[2025-06-27T21:24:05.088Z] [worker] [9B4x4CU9ED5] STARTING Censys platform scan for lodging-source.com
2025-06-27 14:24:05.088	
[2025-06-27T21:24:05.088Z] [worker] === Running module (Phase 2A): censys ===
2025-06-27 14:24:05.088	
[2025-06-27T21:24:05.088Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:24:05.087	
[2025-06-27T21:24:05.087Z] [Shodan] Start scan for lodging-source.com
2025-06-27 14:24:05.087	
[2025-06-27T21:24:05.086Z] [worker] [9B4x4CU9ED5] STARTING Shodan scan for lodging-source.com
2025-06-27 14:24:05.087	
[2025-06-27T21:24:05.086Z] [worker] === Running module (Phase 2A): shodan ===
2025-06-27 14:24:05.086	
[2025-06-27T21:24:05.086Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:24:05.081	
[2025-06-27T21:24:05.081Z] [worker] [9B4x4CU9ED5] COMPLETED SpiderFoot discovery: 7 targets found
2025-06-27 14:24:05.081	
[2025-06-27T21:24:05.081Z] [SpiderFoot] ✔️ Completed – 7 artifacts
2025-06-27 14:24:05.081	
[artifactStore] Inserted scan_summary artifact: SpiderFoot scan completed: 7 artifacts...
2025-06-27 14:24:05.080	
[artifactStore] Inserted intel artifact: GoDaddy.com, LLC...
2025-06-27 14:24:05.078	
Registry Domain ID: 1...
2025-06-27 14:24:05.078	
[artifactStore] Inserted intel artifact:    Domain Name: LODGING-SOURCE.COM
2025-06-27 14:24:05.077	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-27 14:24:05.075	
[artifactStore] Inserted intel artifact: 74.208.42.246...
2025-06-27 14:24:05.074	
[artifactStore] Inserted intel artifact: support@lodging-source.com...
2025-06-27 14:24:05.072	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-27 14:24:05.071	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-27 14:24:05.068	
[2025-06-27T21:24:05.068Z] [SpiderFoot] Raw output size: 8032 bytes
2025-06-27 14:23:58.783	
[2025-06-27T21:23:58.783Z] [worker] [9B4x4CU9ED5] COMPLETED Breach Directory probe: 5 breach findings
2025-06-27 14:23:58.783	
[2025-06-27T21:23:58.782Z] [breachDirectoryProbe] Breach probe completed: 5 findings in 1827ms
2025-06-27 14:23:58.783	
[artifactStore] Inserted finding MULTIPLE_BREACH_SOURCES for artifact 3436
2025-06-27 14:23:58.781	
[artifactStore] Inserted finding BREACH_SUMMARY for artifact 3436
2025-06-27 14:23:58.778	
[artifactStore] Inserted finding EMAIL_EXPOSURE for artifact 3436
2025-06-27 14:23:58.776	
[artifactStore] Inserted finding PASSWORD_EXPOSURE for artifact 3436
2025-06-27 14:23:58.773	
[artifactStore] Inserted finding INFOSTEALER_COMPROMISE for artifact 3436
2025-06-27 14:23:58.767	
[artifactStore] Inserted breach_directory_summary artifact: Breach probe: 63 total breached accounts (BD: 0, LC: 63) for...
2025-06-27 14:23:58.761	
[2025-06-27T21:23:58.760Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=63, Total=63
2025-06-27 14:23:58.757	
[2025-06-27T21:23:58.755Z] [breachDirectoryProbe] LeakCheck response for lodging-source.com: 63 breached accounts, quota remaining: 999999
2025-06-27 14:23:58.043	
[2025-06-27T21:23:58.042Z] [breachDirectoryProbe] Querying LeakCheck for domain: lodging-source.com
2025-06-27 14:23:57.690	
[2025-06-27T21:23:57.690Z] [breachDirectoryProbe] Breach Directory response for lodging-source.com: 0 breached accounts
2025-06-27 14:23:56.958	
[2025-06-27T21:23:56.955Z] [breachDirectoryProbe] Querying Breach Directory for domain: lodging-source.com
2025-06-27 14:23:56.958	
[2025-06-27T21:23:56.955Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="lodging-source.com" (BreachDirectory + LeakCheck)
2025-06-27 14:23:56.958	
[2025-06-27T21:23:56.954Z] [worker] [9B4x4CU9ED5] STARTING Breach Directory intelligence probe for lodging-source.com
2025-06-27 14:23:56.958	
[2025-06-27T21:23:56.954Z] [worker] === Running module (Phase 1): breach_directory_probe ===
2025-06-27 14:23:56.953	
[2025-06-27T21:23:56.953Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:23:56.916	
[2025-06-27T21:23:56.915Z] [SpiderFoot] Command: python3 /opt/spiderfoot/sf.py -q -s lodging-source.com -m sfp_crtsh,sfp_sublist3r,sfp_chaos,sfp_r7_dns,sfp_haveibeenpwnd,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei,sfp_whois,sfp_dnsresolve -o json
2025-06-27 14:23:56.914	
[2025-06-27T21:23:56.914Z] [SpiderFoot] API keys: HIBP ✅, Chaos ✅ (Shodan/Censys handled by dedicated modules)
2025-06-27 14:23:56.911	
[2025-06-27T21:23:56.911Z] [SpiderFoot] Starting scan for lodging-source.com (scanId=9B4x4CU9ED5)
2025-06-27 14:23:56.911	
[2025-06-27T21:23:56.910Z] [worker] [9B4x4CU9ED5] STARTING SpiderFoot discovery for lodging-source.com
2025-06-27 14:23:56.911	
[2025-06-27T21:23:56.910Z] [worker] === Running module (Phase 1): spiderfoot ===
2025-06-27 14:23:56.910	
[2025-06-27T21:23:56.910Z] [worker] [updateScanMasterStatus] Updated scan 9B4x4CU9ED5 with: status, current_module, progress
2025-06-27 14:23:56.904	
[queue] Updated job 9B4x4CU9ED5 status: processing - Comprehensive security discovery in progress...
2025-06-27 14:23:56.747	
[2025-06-27T21:23:56.746Z] [worker] Processing comprehensive security scan for Lodging Source (lodging-source.com)
2025-06-27 14:23:56.747	
[2025-06-27T21:23:56.746Z] [worker] ✅ JOB PICKED UP: Processing scan job 9B4x4CU9ED5 for Lodging Source (lodging-source.com)
2025-06-27 14:23:56.747	
[2025-06-27T21:23:56.745Z] [worker] Processing scan job: 9B4x4CU9ED5
2025-06-27 14:23:56.747	
}
2025-06-27 14:23:56.747	
createdAt: '2025-06-27T21:23:55.297Z'
2025-06-27 14:23:56.747	
originalDomain: 'lodging-source.com',
2025-06-27 14:23:56.747	
domain: 'lodging-source.com',
2025-06-27 14:23:56.747	
companyName: 'Lodging Source',
2025-06-27 14:23:56.747	
id: '9B4x4CU9ED5',
2025-06-27 14:23:56.747	
[queue] Parsed job: {
2025-06-27 14:23:56.747	
[queue] Job string to parse: {"id":"9B4x4CU9ED5","companyName":"Lodging Source","domain":"lodging-source.com","originalDomain":"lodging-source.com","createdAt":"2025-06-27T21:23:55.297Z"}
2025-06-27 14:23:56.747	
} Type: object
2025-06-27 14:23:56.747	
createdAt: '2025-06-27T21:23:55.297Z'
2025-06-27 14:23:56.747	
originalDomain: 'lodging-source.com',
2025-06-27 14:23:56.747	
domain: 'lodging-source.com',
2025-06-27 14:23:56.747	
companyName: 'Lodging Source',
2025-06-27 14:23:56.747	
id: '9B4x4CU9ED5',
2025-06-27 14:23:56.747	
[queue] Raw job data from Redis: {
2025-06-27 14:23:56.142	
{
  "level": 30,
  "time": 1751059436142,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "res": {
    "statusCode": 200
  },
  "responseTime": 849.6702070000028,
  "msg": "request completed"
}
2025-06-27 14:23:56.139	
[2025-06-27T21:23:56.139Z] [api] ✅ Successfully created scan job 9B4x4CU9ED5 for Lodging Source
2025-06-27 14:23:56.139	
[queue] enqueued 9B4x4CU9ED5
2025-06-27 14:23:55.389	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-06-27 14:23:55.389	
(node:658) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-06-27 14:23:55.298	
[2025-06-27T21:23:55.297Z] [api] Attempting to create scan job 9B4x4CU9ED5 for Lodging Source (lodging-source.com) [original: lodging-source.com]
2025-06-27 14:23:55.292	
{
  "level": 30,
  "time": 1751059435292,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "req": {
    "method": "POST",
    "url": "/scans",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 50410
  },
  "msg": "incoming request"
}
2025-06-27 14:22:52.373	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-06-27 14:22:52.373	
(node:660) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-06-27 14:22:52.314	
[2025-06-27T21:22:52.314Z] [worker] No incomplete scans found to clean up
2025-06-27 14:22:52.311	
[2025-06-27T21:22:52.311Z] [worker] Database and scans_master table initialized successfully
2025-06-27 14:22:52.309	
[artifactStore] Database initialized successfully
2025-06-27 14:22:52.309	
]
2025-06-27 14:22:52.309	
'created_at(timestamp without time zone)'
2025-06-27 14:22:52.309	
'description(text)',
2025-06-27 14:22:52.309	
'recommendation(text)',
2025-06-27 14:22:52.309	
'finding_type(character varying)',
2025-06-27 14:22:52.309	
'artifact_id(integer)',
2025-06-27 14:22:52.309	
'id(integer)',
2025-06-27 14:22:52.309	
[artifactStore] findings columns: [
2025-06-27 14:22:52.309	
]
2025-06-27 14:22:52.309	
'created_at(timestamp without time zone)'
2025-06-27 14:22:52.309	
'meta(jsonb)',
2025-06-27 14:22:52.309	
'mime(character varying)',
2025-06-27 14:22:52.309	
'sha256(character varying)',
2025-06-27 14:22:52.309	
'src_url(text)',
2025-06-27 14:22:52.309	
'severity(character varying)',
2025-06-27 14:22:52.309	
'val_text(text)',
2025-06-27 14:22:52.309	
'type(character varying)',
2025-06-27 14:22:52.309	
'id(integer)',
2025-06-27 14:22:52.309	
[artifactStore] artifacts columns: [
2025-06-27 14:22:52.308	
]
2025-06-27 14:22:52.308	
'total_artifacts_count(integer)'
2025-06-27 14:22:52.308	
'completed_at(timestamp with time zone)',
2025-06-27 14:22:52.308	
'updated_at(timestamp with time zone)',
2025-06-27 14:22:52.308	
'created_at(timestamp with time zone)',
2025-06-27 14:22:52.308	
'max_severity(character varying)',
2025-06-27 14:22:52.308	
'total_findings_count(integer)',
2025-06-27 14:22:52.308	
'error_message(text)',
2025-06-27 14:22:52.308	
'total_modules(integer)',
2025-06-27 14:22:52.308	
'current_module(character varying)',
2025-06-27 14:22:52.308	
'progress(integer)',
2025-06-27 14:22:52.308	
'status(character varying)',
2025-06-27 14:22:52.308	
'domain(character varying)',
2025-06-27 14:22:52.308	
'company_name(character varying)',
2025-06-27 14:22:52.308	
'scan_id(character varying)',
2025-06-27 14:22:52.308	
[artifactStore] scans_master columns: [
2025-06-27 14:22:52.308	
[artifactStore] Current database schema:
2025-06-27 14:22:52.290	
[artifactStore] ✅ Successfully processed total_artifacts_count column check
2025-06-27 14:22:52.277	
[artifactStore] Attempting to ensure scans_master.total_artifacts_count column exists...
2025-06-27 14:22:52.220	
[2025-06-27T21:22:52.219Z] [worker] Starting security scanning worker [286565eb5406d8]
2025-06-27 14:22:50.945	
Warning: Please use the `legacy` build in Node.js environments.
2025-06-27 14:22:49.875	
{
  "level": 30,
  "time": 1751059369869,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "msg": "Server listening at http://172.19.19.27:3000"
}
2025-06-27 14:22:49.875	
{
  "level": 30,
  "time": 1751059369869,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "msg": "Server listening at http://172.19.19.26:3000"
}
2025-06-27 14:22:49.875	
{
  "level": 30,
  "time": 1751059369869,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "msg": "Server listening at http://127.0.0.1:3000"
}
2025-06-27 14:22:49.874	
[2025-06-27T21:22:49.869Z] [api] Server listening on port 3000
2025-06-27 14:22:49.855	
{
  "level": 40,
  "time": 1751059369854,
  "pid": 658,
  "hostname": "148e21dae24d98",
  "msg": "\"root\" path \"/app/apps/public\" must exist"
}
2025-06-27 14:22:47.335	
[2025-06-27T21:22:47.335Z] [SyncWorker] ✅ Sync Worker started - monitoring for module completions and findings
2025-06-27 14:22:47.149	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-06-27 14:22:47.149	
(node:649) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-06-27 14:22:46.621	
> node dist/sync.js
2025-06-27 14:22:46.621	
> sync-worker@1.0.0 start
2025-06-27 14:22:45.533	
2025/06/27 21:22:45 INFO SSH listening listen_address=[fdaa:16:4003:a7b:2dbb:1ab8:7fa2:2]:22
2025-06-27 14:22:45.328	
Machine created and started in 4.599s
2025-06-27 14:22:45.265	
 INFO [fly api proxy] listening at /.fly/api
2025-06-27 14:22:45.252	
 INFO Preparing to run: `docker-entrypoint.sh npx tsx apps/api-main/server.ts` as root
2025-06-27 14:22:45.152	
 INFO Starting init (commit: d0572327e)...
2025-06-27 14:22:45.133	
2025/06/27 21:22:45 INFO SSH listening listen_address=[fdaa:16:4003:a7b:f9:7dfe:6c4c:2]:22
2025-06-27 14:22:44.860	
Machine created and started in 4.194s
2025-06-27 14:22:44.847	
 INFO [fly api proxy] listening at /.fly/api
2025-06-27 14:22:44.836	
 INFO Preparing to run: `docker-entrypoint.sh npx tsx apps/workers/worker.ts` as root
2025-06-27 14:22:44.744	
 INFO Starting init (commit: d0572327e)...
2025-06-27 14:22:44.673	
2025/06/27 21:22:44 INFO SSH listening listen_address=[fdaa:16:4003:a7b:2d30:c80:6e46:2]:22
2025-06-27 14:22:44.439	
Machine created and started in 3.767s
2025-06-27 14:22:44.433	
 INFO [fly api proxy] listening at /.fly/api
2025-06-27 14:22:44.424	
 INFO Preparing to run: `docker-entrypoint.sh npm run start --prefix apps/sync-worker` as root
2025-06-27 14:22:44.330	
 INFO Starting init (commit: d0572327e)...
2025-06-27 14:22:44.286	
2025-06-27T21:22:44.286633257 [01JYSMATVGGKA64B3RZRA654RT:main] Running Firecracker v1.7.0
2025-06-27 14:22:43.845	
2025-06-27T21:22:43.845722998 [01JYSMATWARPPVMGR480STMMDT:main] Running Firecracker v1.7.0
2025-06-27 14:22:43.769	
[ 8862.330927] reboot: Restarting system
2025-06-27 14:22:43.768	
 WARN could not unmount /rootfs: EINVAL: Invalid argument
2025-06-27 14:22:43.766	
 INFO Starting clean up.
2025-06-27 14:22:43.749	
 INFO Main child exited normally with code: 130
2025-06-27 14:22:43.542	
2025-06-27T21:22:43.542658200 [01JYSMATWCZZPD4JGQ6597NAMK:main] Running Firecracker v1.7.0
2025-06-27 14:22:43.259	
[ 8863.229888] reboot: Restarting system
2025-06-27 14:22:43.258	
 WARN could not unmount /rootfs: EINVAL: Invalid argument
2025-06-27 14:22:43.257	
 INFO Starting clean up.
2025-06-27 14:22:43.241	
 INFO Main child exited normally with code: 0
2025-06-27 14:22:43.214	
 INFO Sending signal SIGINT to main child process w/ PID 630
2025-06-27 14:22:43.195	
Configuring firecracker
2025-06-27 14:22:42.673	
 INFO Sending signal SIGINT to main child process w/ PID 631
2025-06-27 14:22:42.671	
[2025-06-27T21:22:42.671Z] [SyncWorker] ✅ Sync Worker shutting down
2025-06-27 14:22:42.661	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:7a5390b3883a95b56094cb6b37afc7a72e57cf54a39dd8605f177f643e892411 (1.924260771s)
2025-06-27 14:22:42.656	
[ 8861.702865] reboot: Restarting system
2025-06-27 14:22:42.655	
 WARN could not unmount /rootfs: EINVAL: Invalid argument
2025-06-27 14:22:42.654	
Configuring firecracker
2025-06-27 14:22:42.651	
 INFO Starting clean up.
2025-06-27 14:22:42.634	
 WARN Reaped child process with pid: 786 and signal: SIGKILL, core dumped? false
2025-06-27 14:22:42.633	
 WARN Reaped child process with pid: 759 and signal: SIGKILL, core dumped? false
2025-06-27 14:22:42.632	
 WARN Reaped child process with pid: 758 and signal: SIGKILL, core dumped? false
2025-06-27 14:22:42.631	
 WARN Reaped child process with pid: 746 and signal: SIGKILL, core dumped? false
2025-06-27 14:22:42.630	
 WARN Reaped child process with pid: 810 and signal: SIGKILL, core dumped? false
2025-06-27 14:22:42.629	
 WARN Reaped child process with pid: 792 and signal: SIGKILL, core dumped? false
2025-06-27 14:22:42.628	
 WARN Reaped child process with pid: 862 and signal: SIGKILL, core dumped? false
2025-06-27 14:22:42.627	
 INFO Main child exited normally with code: 130
2025-06-27 14:22:42.500	
[2025-06-27T21:22:42.498Z] [worker] Received SIGINT, initiating graceful shutdown...
2025-06-27 14:22:42.465	
 INFO Sending signal SIGINT to main child process w/ PID 629
2025-06-27 14:22:42.450	
Configuring firecracker
2025-06-27 14:22:42.138	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:7a5390b3883a95b56094cb6b37afc7a72e57cf54a39dd8605f177f643e892411 (1.452536056s)
2025-06-27 14:22:42.090	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:7a5390b3883a95b56094cb6b37afc7a72e57cf54a39dd8605f177f643e892411 (1.384053316s)
2025-06-27 14:22:40.736	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:7a5390b3883a95b56094cb6b37afc7a72e57cf54a39dd8605f177f643e892411
2025-06-27 14:22:40.705	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:7a5390b3883a95b56094cb6b37afc7a72e57cf54a39dd8605f177f643e892411
2025-06-27 14:22:40.685	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:7a5390b3883a95b56094cb6b37afc7a72e57cf54a39dd8605f177f643e892411
2025-06-27 14:22:07.908	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:22:07.908	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:22:07.908	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:22:07.908	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:22:07.908	
error: relation "scan_status" does not exist
2025-06-27 14:22:07.908	
[2025-06-27T21:22:07.908Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:22:07.907	
[2025-06-27T21:22:07.907Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:21:07.827	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:21:07.827	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:21:07.827	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:21:07.827	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:21:07.827	
error: relation "scan_status" does not exist
2025-06-27 14:21:07.827	
[2025-06-27T21:21:07.827Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:21:07.826	
[2025-06-27T21:21:07.825Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:20:08.057	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:20:08.057	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:20:08.057	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:20:08.057	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:20:08.057	
error: relation "scan_status" does not exist
2025-06-27 14:20:08.057	
[2025-06-27T21:20:08.057Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:20:08.056	
[2025-06-27T21:20:08.055Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:19:07.780	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:19:07.780	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:19:07.780	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:19:07.780	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:19:07.780	
error: relation "scan_status" does not exist
2025-06-27 14:19:07.780	
[2025-06-27T21:19:07.780Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:19:07.779	
[2025-06-27T21:19:07.779Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:18:07.824	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:18:07.824	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:18:07.824	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:18:07.824	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:18:07.824	
error: relation "scan_status" does not exist
2025-06-27 14:18:07.823	
[2025-06-27T21:18:07.823Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:18:07.819	
[2025-06-27T21:18:07.818Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:17:07.758	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:17:07.758	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:17:07.758	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:17:07.758	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:17:07.758	
error: relation "scan_status" does not exist
2025-06-27 14:17:07.758	
[2025-06-27T21:17:07.758Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:17:07.757	
[2025-06-27T21:17:07.756Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:16:07.699	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:16:07.699	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:16:07.699	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:16:07.699	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:16:07.699	
error: relation "scan_status" does not exist
2025-06-27 14:16:07.699	
[2025-06-27T21:16:07.699Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:16:07.698	
[2025-06-27T21:16:07.697Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:15:07.592	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:15:07.592	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:15:07.592	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:15:07.592	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:15:07.592	
error: relation "scan_status" does not exist
2025-06-27 14:15:07.591	
[2025-06-27T21:15:07.591Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:15:07.589	
[2025-06-27T21:15:07.589Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:14:07.613	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:14:07.613	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:14:07.613	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:14:07.613	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:14:07.613	
error: relation "scan_status" does not exist
2025-06-27 14:14:07.613	
[2025-06-27T21:14:07.613Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:14:07.612	
[2025-06-27T21:14:07.611Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:13:07.628	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:13:07.628	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:13:07.628	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:13:07.628	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:13:07.628	
error: relation "scan_status" does not exist
2025-06-27 14:13:07.628	
[2025-06-27T21:13:07.628Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:13:07.627	
[2025-06-27T21:13:07.626Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:12:07.783	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:12:07.783	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:12:07.783	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:12:07.783	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:12:07.783	
error: relation "scan_status" does not exist
2025-06-27 14:12:07.783	
[2025-06-27T21:12:07.783Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:12:07.782	
[2025-06-27T21:12:07.781Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:11:07.683	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:11:07.683	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:11:07.683	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:11:07.683	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:11:07.683	
error: relation "scan_status" does not exist
2025-06-27 14:11:07.682	
[2025-06-27T21:11:07.682Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:11:07.681	
[2025-06-27T21:11:07.680Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:10:07.587	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:10:07.587	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:10:07.587	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:10:07.587	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:10:07.587	
error: relation "scan_status" does not exist
2025-06-27 14:10:07.587	
[2025-06-27T21:10:07.586Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:10:07.585	
[2025-06-27T21:10:07.585Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:09:07.752	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:09:07.752	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:09:07.752	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:09:07.752	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:09:07.752	
error: relation "scan_status" does not exist
2025-06-27 14:09:07.752	
[2025-06-27T21:09:07.752Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:09:07.751	
[2025-06-27T21:09:07.750Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:08:07.566	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:08:07.566	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:08:07.566	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:08:07.566	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:08:07.566	
error: relation "scan_status" does not exist
2025-06-27 14:08:07.566	
[2025-06-27T21:08:07.566Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:08:07.564	
[2025-06-27T21:08:07.564Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:07:07.647	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:07:07.647	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:07:07.647	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:07:07.647	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:07:07.647	
error: relation "scan_status" does not exist
2025-06-27 14:07:07.646	
[2025-06-27T21:07:07.646Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:07:07.645	
[2025-06-27T21:07:07.645Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:06:07.509	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:06:07.509	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:06:07.509	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:06:07.509	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:06:07.509	
error: relation "scan_status" does not exist
2025-06-27 14:06:07.509	
[2025-06-27T21:06:07.509Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:06:07.508	
[2025-06-27T21:06:07.507Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:05:07.513	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:05:07.513	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:05:07.513	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:05:07.513	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:05:07.513	
error: relation "scan_status" does not exist
2025-06-27 14:05:07.513	
[2025-06-27T21:05:07.513Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:05:07.512	
[2025-06-27T21:05:07.511Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"
2025-06-27 14:04:07.366	
at async Timeout.runSyncCycle [as _onTimeout] (file:///app/apps/sync-worker/dist/sync.js:463:5)
2025-06-27 14:04:07.366	
at async syncScanTotalsAutomated (file:///app/apps/sync-worker/dist/sync.js:331:33)
2025-06-27 14:04:07.366	
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
2025-06-27 14:04:07.366	
at /app/node_modules/.pnpm/pg-pool@3.10.0_pg@8.16.0/node_modules/pg-pool/index.js:45:11
2025-06-27 14:04:07.366	
error: relation "scan_status" does not exist
2025-06-27 14:04:07.366	
[2025-06-27T21:04:07.366Z] [SyncWorker] ERROR: Error in syncScanTotalsAutomated relation "scan_status" does not exist
2025-06-27 14:04:07.365	
[2025-06-27T21:04:07.364Z] [SyncWorker] ERROR: Error inserting compromised credentials to Supabase invalid input syntax for type date: "2019-01"