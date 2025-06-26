		2025-06-26 14:25:00.575	
}
2025-06-26 14:25:00.575	
"RATE_LIMIT_BYPASS": 1
2025-06-26 14:25:00.575	
[2025-06-26T21:25:00.574Z] [SyncWorker] ✅ New findings synced: 1 {
2025-06-26 14:24:14.400	
[2025-06-26T21:24:14.399Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Lodging Source: 20 verified findings, 25 artifacts across 20 security modules
2025-06-26 14:24:14.399	
[queue] Updated job 1rmpDAqZOKl status: done - Comprehensive security scan completed - 20 verified findings across 20 security modules. Findings ready for processing.
2025-06-26 14:24:13.969	
[2025-06-26T21:24:13.969Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-06-26 14:24:13.966	
[2025-06-26T21:24:13.965Z] [worker] [processScan] Counted 25 artifacts for scan 1rmpDAqZOKl
2025-06-26 14:24:13.964	
[2025-06-26T21:24:13.964Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: progress
2025-06-26 14:24:13.963	
[2025-06-26T21:24:13.963Z] [worker] [1rmpDAqZOKl] COMPLETED secret detection: 0 secrets found
2025-06-26 14:24:13.963	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-06-26 14:24:13.961	
[2025-06-26T21:24:13.961Z] [trufflehog] Finished secret scan for lodging-source.com Total secrets found: 0
2025-06-26 14:24:13.961	
[2025-06-26T21:24:13.960Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-1rmpDAqZOKl.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-1rmpDAqZOKl.json'
2025-06-26 14:24:13.960	
[2025-06-26T21:24:13.960Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-1rmpDAqZOKl.json
2025-06-26 14:24:13.960	
[2025-06-26T21:24:13.960Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-06-26 14:24:13.960	
[2025-06-26T21:24:13.960Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-06-26 14:24:13.960	
[2025-06-26T21:24:13.960Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-1rmpDAqZOKl.json'
2025-06-26 14:24:13.959	
[2025-06-26T21:24:13.959Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-1rmpDAqZOKl.json
2025-06-26 14:24:13.959	
[2025-06-26T21:24:13.959Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-06-26 14:24:10.823	
[2025-06-26T21:24:10.823Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/main.js
2025-06-26 14:24:05.883	
[2025-06-26T21:24:05.883Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/bundle.js
2025-06-26 14:24:04.970	
[2025-06-26T21:24:04.969Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-06-26 14:24:04.970	
[2025-06-26T21:24:04.969Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-06-26 14:24:04.970	
[2025-06-26T21:24:04.969Z] [trufflehog] Starting targeted secret scan for domain: lodging-source.com
2025-06-26 14:24:04.968	
[2025-06-26T21:24:04.968Z] [worker] [1rmpDAqZOKl] STARTING TruffleHog secret detection for lodging-source.com
2025-06-26 14:24:04.968	
[2025-06-26T21:24:04.968Z] [worker] === Running module: trufflehog (20/20) ===
2025-06-26 14:24:04.968	
[2025-06-26T21:24:04.968Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:24:04.967	
[2025-06-26T21:24:04.967Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: progress
2025-06-26 14:24:04.966	
[2025-06-26T21:24:04.965Z] [worker] [1rmpDAqZOKl] COMPLETED rate limiting tests: 1 rate limit issues found
2025-06-26 14:24:04.965	
[artifactStore] Inserted scan_summary artifact: Rate limit scan completed: 1 issues found...
2025-06-26 14:24:04.964	
[artifactStore] Inserted finding RATE_LIMIT_BYPASS for artifact 3350
2025-06-26 14:24:04.963	
[artifactStore] Inserted rate_limit_bypass artifact: Rate limit bypass possible on endpoint: //www.youtube.com/pl...
2025-06-26 14:24:04.961	
[2025-06-26T21:24:04.960Z] [rateLimitScan] [VULNERABLE] Found 12 bypass techniques for https://lodging-source.com//www.youtube.com/player_api
2025-06-26 14:24:00.765	
}
2025-06-26 14:24:00.765	
"ACCESSIBILITY_VIOLATION": 6
2025-06-26 14:24:00.765	
[2025-06-26T21:24:00.764Z] [SyncWorker] ✅ New findings synced: 6 {
2025-06-26 14:23:59.816	
[2025-06-26T21:23:59.815Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com//www.youtube.com/player_api. Testing for bypasses...
2025-06-26 14:23:59.810	
[2025-06-26T21:23:59.809Z] [rateLimitScan] Response distribution for https://lodging-source.com//www.youtube.com/player_api: { '404': 25 }
2025-06-26 14:23:58.899	
[2025-06-26T21:23:58.899Z] [rateLimitScan] Establishing baseline for https://lodging-source.com//www.youtube.com/player_api...
2025-06-26 14:23:58.899	
[2025-06-26T21:23:58.899Z] [rateLimitScan] Found 1 endpoints to test.
2025-06-26 14:23:58.897	
[2025-06-26T21:23:58.897Z] [rateLimitScan] Starting comprehensive rate limit scan for lodging-source.com
2025-06-26 14:23:58.897	
[2025-06-26T21:23:58.897Z] [worker] [1rmpDAqZOKl] STARTING rate-limit tests for lodging-source.com
2025-06-26 14:23:58.897	
[2025-06-26T21:23:58.897Z] [worker] === Running module: rate_limit_scan (19/20) ===
2025-06-26 14:23:58.897	
[2025-06-26T21:23:58.896Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:23:58.895	
[2025-06-26T21:23:58.895Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: progress
2025-06-26 14:23:58.894	
[2025-06-26T21:23:58.894Z] [worker] [1rmpDAqZOKl] COMPLETED Nuclei scan: 0 vulnerabilities found
2025-06-26 14:23:58.894	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-06-26 14:23:58.891	
[2025-06-26T21:23:58.891Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-06-26 14:23:58.891	
[2025-06-26T21:23:58.891Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-06-26 14:23:58.891	
[2025-06-26T21:23:58.891Z] [nuclei] [Tag Scan] Failed for https://lodging-source.com: Command failed: nuclei -u https://lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -json -silent -timeout 10 -retries 2 -headless -t /opt/nuclei-templates -insecure
2025-06-26 14:23:58.776	
[2025-06-26T21:23:58.776Z] [nuclei] [Tag Scan] Running on https://lodging-source.com with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-26 14:23:58.775	
[2025-06-26T21:23:58.775Z] [nuclei] --- Starting Phase 1: Tag-based scans on 1 targets ---
2025-06-26 14:23:58.775	
[2025-06-26T21:23:58.775Z] [nuclei] Template update complete.
2025-06-26 14:23:58.775	
[INF] No new updates found for nuclei templates
2025-06-26 14:23:58.775	
projectdiscovery.io
2025-06-26 14:23:58.775	
/_/ /_/\__,_/\___/_/\___/_/   v3.2.9
2025-06-26 14:23:58.775	
/ / / / /_/ / /__/ /  __/ /
2025-06-26 14:23:58.775	
/ __ \/ / / / ___/ / _ \/ /
2025-06-26 14:23:58.775	
____  __  _______/ /__  (_)
2025-06-26 14:23:58.775	
__     _
2025-06-26 14:23:58.775	
[2025-06-26T21:23:58.775Z] [nuclei] Template update stderr:
2025-06-26 14:23:58.296	
[2025-06-26T21:23:58.296Z] [nuclei] Templates are outdated (> 24 hours). Updating...
2025-06-26 14:23:58.295	
[INF] PDCP Directory: /root/.pdcp
2025-06-26 14:23:58.295	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-06-26 14:23:58.295	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-06-26 14:23:58.295	
[2025-06-26T21:23:58.294Z] [nuclei] Version check stderr: [INF] Nuclei Engine Version: v3.2.9
2025-06-26 14:23:58.294	
[2025-06-26T21:23:58.294Z] [nuclei] Nuclei binary found.
2025-06-26 14:23:58.183	
[2025-06-26T21:23:58.183Z] [nuclei] Starting enhanced vulnerability scan for lodging-source.com
2025-06-26 14:23:58.183	
[2025-06-26T21:23:58.183Z] [worker] [1rmpDAqZOKl] STARTING Nuclei vulnerability scan for lodging-source.com
2025-06-26 14:23:58.183	
[2025-06-26T21:23:58.183Z] [worker] === Running module: nuclei (18/20) ===
2025-06-26 14:23:58.183	
[2025-06-26T21:23:58.183Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:23:58.179	
[2025-06-26T21:23:58.179Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: progress
2025-06-26 14:23:58.178	
[2025-06-26T21:23:58.178Z] [worker] [1rmpDAqZOKl] COMPLETED database scan: 0 database issues found
2025-06-26 14:23:58.178	
[artifactStore] Inserted scan_summary artifact: Database port scan completed: 0 exposed services found...
2025-06-26 14:23:58.175	
[2025-06-26T21:23:58.174Z] [dbPortScan] Completed database scan, found 0 exposed services
2025-06-26 14:23:54.026	
[2025-06-26T21:23:54.024Z] [dbPortScan] [1/8] Scanning lodging-source.com:27017...
2025-06-26 14:23:54.017	
[2025-06-26T21:23:54.016Z] [dbPortScan] [1/8] Scanning lodging-source.com:11211...
2025-06-26 14:23:54.008	
[2025-06-26T21:23:54.008Z] [dbPortScan] [1/8] Scanning lodging-source.com:9200...
2025-06-26 14:23:54.001	
[2025-06-26T21:23:54.001Z] [dbPortScan] [1/8] Scanning lodging-source.com:8086...
2025-06-26 14:23:50.115	
[2025-06-26T21:23:50.115Z] [dbPortScan] [1/8] Scanning lodging-source.com:6379...
2025-06-26 14:23:50.108	
[2025-06-26T21:23:50.107Z] [dbPortScan] [1/8] Scanning lodging-source.com:5432...
2025-06-26 14:23:50.104	
[2025-06-26T21:23:50.103Z] [dbPortScan] [1/8] Scanning lodging-source.com:3306...
2025-06-26 14:23:50.101	
[2025-06-26T21:23:50.100Z] [dbPortScan] [1/8] Scanning lodging-source.com:1433...
2025-06-26 14:23:49.979	
[2025-06-26T21:23:49.978Z] [dbPortScan] Validating dependencies...
2025-06-26 14:23:49.979	
[2025-06-26T21:23:49.978Z] [dbPortScan] Starting enhanced database security scan for lodging-source.com
2025-06-26 14:23:49.978	
[2025-06-26T21:23:49.978Z] [worker] [1rmpDAqZOKl] STARTING database port scan for lodging-source.com
2025-06-26 14:23:49.978	
[2025-06-26T21:23:49.978Z] [worker] === Running module: db_port_scan (17/20) ===
2025-06-26 14:23:49.978	
[2025-06-26T21:23:49.978Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:23:49.976	
[2025-06-26T21:23:49.976Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: progress
2025-06-26 14:23:49.974	
[2025-06-26T21:23:49.974Z] [worker] [1rmpDAqZOKl] COMPLETED typosquat analysis: 0 active typosquats detected
2025-06-26 14:23:49.974	
[2025-06-26T21:23:49.974Z] [worker] Skipping removed typosquatScorer module - functionality merged into dnsTwist
2025-06-26 14:23:49.974	
[2025-06-26T21:23:49.974Z] [worker] [1rmpDAqZOKl] STARTING typosquat analysis for lodging-source.com
2025-06-26 14:23:49.974	
[2025-06-26T21:23:49.974Z] [worker] === Running module: typosquat_scorer (16/20) ===
2025-06-26 14:23:49.974	
[2025-06-26T21:23:49.974Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:23:49.973	
[2025-06-26T21:23:49.973Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: progress
2025-06-26 14:23:49.971	
[2025-06-26T21:23:49.971Z] [worker] [1rmpDAqZOKl] COMPLETED email bruteforce surface scan: 0 email attack vectors found
2025-06-26 14:23:49.971	
[2025-06-26T21:23:49.970Z] [emailBruteforceSurface] No email services detected
2025-06-26 14:23:49.971	
[2025-06-26T21:23:49.970Z] [emailBruteforceSurface] Nuclei email scan failed: Command failed: nuclei -list /tmp/nuclei-email-targets-1750973029863.txt -t technologies/microsoft-exchange-server-detect.yaml -t technologies/outlook-web-access-detect.yaml -t technologies/owa-detect.yaml -t network/smtp-detect.yaml -t network/imap-detect.yaml -t network/pop3-detect.yaml -t technologies/exchange-autodiscover.yaml -t technologies/activesync-detect.yaml -t misconfiguration/exchange-server-login.yaml -t misconfiguration/owa-login-portal.yaml -json -silent -timeout 30 -retries 2 -c 6 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:23:49.864	
[2025-06-26T21:23:49.864Z] [emailBruteforceSurface] Running Nuclei with 10 email templates against 50 targets
2025-06-26 14:23:49.863	
[2025-06-26T21:23:49.862Z] [emailBruteforceSurface] Generated 408 email service targets
2025-06-26 14:23:49.859	
[2025-06-26T21:23:49.859Z] [emailBruteforceSurface] Starting email bruteforce surface scan for domain="lodging-source.com"
2025-06-26 14:23:49.859	
[2025-06-26T21:23:49.858Z] [worker] [1rmpDAqZOKl] STARTING email bruteforce surface scan for lodging-source.com
2025-06-26 14:23:49.859	
[2025-06-26T21:23:49.858Z] [worker] === Running module: email_bruteforce_surface (15/20) ===
2025-06-26 14:23:49.859	
[2025-06-26T21:23:49.858Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:23:49.857	
[2025-06-26T21:23:49.857Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: progress
2025-06-26 14:23:49.856	
[2025-06-26T21:23:49.855Z] [worker] [1rmpDAqZOKl] COMPLETED RDP/VPN templates scan: 0 remote access vulnerabilities found
2025-06-26 14:23:49.855	
[2025-06-26T21:23:49.855Z] [rdpVpnTemplates] No RDP/VPN vulnerabilities detected
2025-06-26 14:23:49.855	
[2025-06-26T21:23:49.855Z] [rdpVpnTemplates] Nuclei RDP/VPN scan failed: Command failed: nuclei -list /tmp/nuclei-rdpvpn-targets-1750973029740.txt -t network/rdp-detect.yaml -t network/rdp-bluekeep-detect.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2018-13379.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2019-5591.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2020-12812.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2019-1579.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2020-2021.yaml -t vulnerabilities/citrix/citrix-adc-cve-2019-19781.yaml -t vulnerabilities/pulse/pulse-connect-secure-cve-2019-11510.yaml -t technologies/rdp-detect.yaml -t technologies/vpn-detect.yaml -json -silent -timeout 30 -retries 2 -c 6 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:23:49.742	
[2025-06-26T21:23:49.742Z] [rdpVpnTemplates] Running Nuclei with 11 RDP/VPN templates against 22 targets
2025-06-26 14:23:49.740	
[2025-06-26T21:23:49.740Z] [rdpVpnTemplates] Generated 22 target URLs for RDP/VPN scanning
2025-06-26 14:23:49.737	
[2025-06-26T21:23:49.737Z] [rdpVpnTemplates] Starting RDP/VPN templates scan for domain="lodging-source.com"
2025-06-26 14:23:49.736	
[2025-06-26T21:23:49.736Z] [worker] [1rmpDAqZOKl] STARTING RDP/VPN vulnerability templates for lodging-source.com
2025-06-26 14:23:49.736	
[2025-06-26T21:23:49.736Z] [worker] === Running module: rdp_vpn_templates (14/20) ===
2025-06-26 14:23:49.736	
[2025-06-26T21:23:49.736Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:23:49.729	
[2025-06-26T21:23:49.729Z] [worker] [1rmpDAqZOKl] COMPLETED accessibility scan: 6 WCAG violations found
2025-06-26 14:23:49.729	
[2025-06-26T21:23:49.729Z] [accessibilityScan] Accessibility scan completed: 6 findings from 4/15 pages in 120105ms
2025-06-26 14:23:49.729	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3347
2025-06-26 14:23:49.727	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3347
2025-06-26 14:23:49.725	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3347
2025-06-26 14:23:49.724	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3347
2025-06-26 14:23:49.720	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3347
2025-06-26 14:23:49.718	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3347
2025-06-26 14:23:49.714	
[artifactStore] Inserted accessibility_summary artifact: Accessibility scan: 24 violations across 4 pages (8 critical...
2025-06-26 14:23:49.689	
[2025-06-26T21:23:49.688Z] [accessibilityScan] Accessibility analysis complete: 24 violations (8 critical, 16 serious)
2025-06-26 14:23:48.669	
[2025-06-26T21:23:48.668Z] [dynamicBrowser] Page operation completed in 2090ms
2025-06-26 14:23:46.579	
[2025-06-26T21:23:46.578Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/help
2025-06-26 14:23:45.416	
[2025-06-26T21:23:45.415Z] [dynamicBrowser] Page operation completed in 2087ms
2025-06-26 14:23:43.328	
[2025-06-26T21:23:43.328Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/search
2025-06-26 14:23:42.192	
[2025-06-26T21:23:42.191Z] [dynamicBrowser] Page operation completed in 2195ms
2025-06-26 14:23:39.996	
[2025-06-26T21:23:39.996Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/join
2025-06-26 14:23:38.840	
[2025-06-26T21:23:38.839Z] [dynamicBrowser] Page operation completed in 2093ms
2025-06-26 14:23:36.746	
[2025-06-26T21:23:36.746Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/register
2025-06-26 14:23:35.588	
[2025-06-26T21:23:35.587Z] [dynamicBrowser] Page operation completed in 2097ms
2025-06-26 14:23:33.491	
[2025-06-26T21:23:33.490Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/login
2025-06-26 14:23:32.286	
[2025-06-26T21:23:32.286Z] [dynamicBrowser] Page operation completed in 2105ms
2025-06-26 14:23:30.181	
[2025-06-26T21:23:30.180Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/signup
2025-06-26 14:23:29.033	
[2025-06-26T21:23:29.032Z] [dynamicBrowser] Page operation completed in 2095ms
2025-06-26 14:23:26.937	
[2025-06-26T21:23:26.937Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/pricing
2025-06-26 14:23:25.795	
[2025-06-26T21:23:25.794Z] [dynamicBrowser] Page operation completed in 2083ms
2025-06-26 14:23:23.712	
[2025-06-26T21:23:23.711Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/products
2025-06-26 14:23:22.572	
[2025-06-26T21:23:22.571Z] [dynamicBrowser] Page operation completed in 2083ms
2025-06-26 14:23:20.489	
[2025-06-26T21:23:20.488Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/services
2025-06-26 14:23:19.351	
[2025-06-26T21:23:19.350Z] [dynamicBrowser] Page operation completed in 2088ms
2025-06-26 14:23:17.264	
[2025-06-26T21:23:17.262Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/about
2025-06-26 14:23:16.113	
[2025-06-26T21:23:16.113Z] [dynamicBrowser] Page operation completed in 2202ms
2025-06-26 14:23:13.911	
[2025-06-26T21:23:13.911Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/contact
2025-06-26 14:23:12.756	
[2025-06-26T21:23:12.756Z] [dynamicBrowser] Page operation completed in 15086ms
2025-06-26 14:23:12.756	
[2025-06-26T21:23:12.755Z] [accessibilityScan] Accessibility test complete for https://www.lodging-source.com/: 6 violations, 22 passes
2025-06-26 14:22:57.671	
[2025-06-26T21:22:57.670Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com/
2025-06-26 14:22:56.471	
[2025-06-26T21:22:56.471Z] [dynamicBrowser] Page operation completed in 14806ms
2025-06-26 14:22:56.471	
[2025-06-26T21:22:56.470Z] [accessibilityScan] Accessibility test complete for https://www.lodging-source.com: 6 violations, 22 passes
2025-06-26 14:22:49.949	
[2025-06-26T21:22:49.949Z] [dynamicBrowser] Metrics: browser_rss_mb=120, heap_used_mb=63, pages_open=1
2025-06-26 14:22:48.330	
[2025-06-26T21:22:48.330Z] [dynamicBrowser] Page script error: undefined
2025-06-26 14:22:41.667	
[2025-06-26T21:22:41.665Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com
2025-06-26 14:22:40.482	
[2025-06-26T21:22:40.481Z] [dynamicBrowser] Page operation completed in 14627ms
2025-06-26 14:22:40.482	
[2025-06-26T21:22:40.478Z] [accessibilityScan] Accessibility test complete for https://lodging-source.com/: 6 violations, 22 passes
2025-06-26 14:22:35.700	
[2025-06-26T21:22:35.700Z] [dynamicBrowser] Page script error: undefined
2025-06-26 14:22:26.511	
[2025-06-26T21:22:26.511Z] [worker] [1rmpDAqZOKl] COMPLETED tech stack scan: 0 technologies detected
2025-06-26 14:22:26.511	
[2025-06-26T21:22:26.511Z] [techStackScan] techstack=complete arts=0 time=36928ms
2025-06-26 14:22:26.511	
[artifactStore] Inserted techscan_metrics artifact: Technology scan metrics: 0 technologies, 0 supply chain risk...
2025-06-26 14:22:26.508	
[artifactStore] Inserted sbom_cyclonedx artifact: Software Bill of Materials (CycloneDX 1.5) - 0 components...
2025-06-26 14:22:26.466	
" code="2"
2025-06-26 14:22:26.466	
[2025-06-26T21:22:26.465Z] [techStackScan] techstack=nuclei_error url="https://maxcdn.bootstrapcdn.com" error="Command failed: nuclei -u https://maxcdn.bootstrapcdn.com -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:26.456	
" code="2"
2025-06-26 14:22:26.456	
[2025-06-26T21:22:26.456Z] [techStackScan] techstack=nuclei_error url="null" error="Command failed: nuclei -u null -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:26.450	
" code="2"
2025-06-26 14:22:26.450	
[2025-06-26T21:22:26.450Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/direct//" error="Command failed: nuclei -u https://lodging-source.com/direct// -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:26.426	
" code="2"
2025-06-26 14:22:26.426	
[2025-06-26T21:22:26.426Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com//www.youtube.com/player_api" error="Command failed: nuclei -u https://lodging-source.com//www.youtube.com/player_api -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:25.855	
[2025-06-26T21:22:25.854Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/
2025-06-26 14:22:25.851	
" code="2"
2025-06-26 14:22:25.851	
[2025-06-26T21:22:25.849Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/direct/index.php" error="Command failed: nuclei -u https://lodging-source.com/direct/index.php -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:25.845	
" code="2"
2025-06-26 14:22:25.845	
[2025-06-26T21:22:25.844Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/home.html" error="Command failed: nuclei -u https://lodging-source.com/home.html -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:25.832	
[2025-06-26T21:22:25.832Z] [techStackScan] techstack=nuclei url="null"
2025-06-26 14:22:25.831	
" code="2"
2025-06-26 14:22:25.831	
[2025-06-26T21:22:25.831Z] [techStackScan] techstack=nuclei_error url="https://www.lodging-source.com" error="Command failed: nuclei -u https://www.lodging-source.com -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:25.824	
[2025-06-26T21:22:25.823Z] [techStackScan] techstack=nuclei url="https://maxcdn.bootstrapcdn.com"
2025-06-26 14:22:25.822	
" code="2"
2025-06-26 14:22:25.822	
[2025-06-26T21:22:25.821Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com" error="Command failed: nuclei -u https://lodging-source.com -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:25.813	
[2025-06-26T21:22:25.812Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct//"
2025-06-26 14:22:25.808	
" code="2"
2025-06-26 14:22:25.808	
[2025-06-26T21:22:25.808Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/" error="Command failed: nuclei -u https://lodging-source.com/ -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:25.799	
[2025-06-26T21:22:25.798Z] [techStackScan] techstack=nuclei url="https://lodging-source.com//www.youtube.com/player_api"
2025-06-26 14:22:25.794	
" code="2"
2025-06-26 14:22:25.794	
[2025-06-26T21:22:25.793Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/index.html" error="Command failed: nuclei -u https://lodging-source.com/index.html -tags tech -json -silent -timeout 20 -retries 2 -headless -insecure -t /opt/nuclei-templates
2025-06-26 14:22:23.677	
[2025-06-26T21:22:23.676Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/home.html"
2025-06-26 14:22:23.671	
[2025-06-26T21:22:23.670Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct/index.php"
2025-06-26 14:22:23.665	
[2025-06-26T21:22:23.665Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/"
2025-06-26 14:22:23.661	
[2025-06-26T21:22:23.660Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/index.html"
2025-06-26 14:22:23.652	
[2025-06-26T21:22:23.651Z] [techStackScan] techstack=nuclei url="https://www.lodging-source.com"
2025-06-26 14:22:23.643	
[2025-06-26T21:22:23.643Z] [techStackScan] techstack=nuclei url="https://lodging-source.com"
2025-06-26 14:22:23.639	
[2025-06-26T21:22:23.639Z] [techStackScan] techstack=targets primary=8 thirdParty=2 total=10
2025-06-26 14:22:23.331	
[2025-06-26T21:22:23.330Z] [dynamicBrowser] Page operation completed in 18098ms
2025-06-26 14:22:23.331	
[2025-06-26T21:22:23.330Z] [techStackScan] thirdParty=discovered domain=lodging-source.com origins=2
2025-06-26 14:22:19.949	
[2025-06-26T21:22:19.949Z] [dynamicBrowser] Metrics: browser_rss_mb=115, heap_used_mb=58, pages_open=1
2025-06-26 14:22:18.652	
[2025-06-26T21:22:18.652Z] [dynamicBrowser] Page operation completed in 13424ms
2025-06-26 14:22:18.652	
[2025-06-26T21:22:18.647Z] [accessibilityScan] Accessibility test complete for https://lodging-source.com: 6 violations, 22 passes
2025-06-26 14:22:05.231	
[2025-06-26T21:22:05.228Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com
2025-06-26 14:22:03.024	
[2025-06-26T21:22:03.023Z] [dynamicBrowser] Browser launched successfully
2025-06-26 14:22:00.675	
}
2025-06-26 14:22:00.675	
"TYPOSQUAT_REDIRECT": 1
2025-06-26 14:22:00.675	
[2025-06-26T21:22:00.674Z] [SyncWorker] ✅ New findings synced: 1 {
2025-06-26 14:21:52.397	
[2025-06-26T21:21:52.396Z] [techStackScan] buildTargets discovered=6 total=8
2025-06-26 14:21:52.392	
[2025-06-26T21:21:52.392Z] [techStackScan] techstack=nuclei confirmed available
2025-06-26 14:21:49.948	
[2025-06-26T21:21:49.947Z] [dynamicBrowser] Launching new browser instance
2025-06-26 14:21:49.947	
[2025-06-26T21:21:49.947Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-26 14:21:49.946	
[2025-06-26T21:21:49.946Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-26 14:21:49.946	
[2025-06-26T21:21:49.945Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-06-26 14:21:49.640	
[2025-06-26T21:21:49.640Z] [worker] [1rmpDAqZOKl] COMPLETED AbuseIPDB scan: 0 malicious/suspicious IPs found
2025-06-26 14:21:49.640	
[2025-06-26T21:21:49.640Z] [abuseIntelScan] No IP artifacts found for this scan
2025-06-26 14:21:49.640	
[2025-06-26T21:21:49.640Z] [abuseIntelScan] Found 0 IP artifacts for scan 1rmpDAqZOKl
2025-06-26 14:21:49.639	
[2025-06-26T21:21:49.639Z] [worker] [1rmpDAqZOKl] COMPLETED denial-of-wallet scan: 0 cost amplification vulnerabilities found
2025-06-26 14:21:49.639	
[2025-06-26T21:21:49.639Z] [denialWalletScan] Denial-of-wallet scan completed: 0 findings in 6ms
2025-06-26 14:21:49.639	
[2025-06-26T21:21:49.639Z] [denialWalletScan] Filtered to 0 potential cost-amplification endpoints
2025-06-26 14:21:49.639	
[2025-06-26T21:21:49.638Z] [denialWalletScan] Found 6 endpoints from endpoint discovery
2025-06-26 14:21:49.637	
[2025-06-26T21:21:49.637Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=1rmpDAqZOKl
2025-06-26 14:21:49.637	
[2025-06-26T21:21:49.636Z] [worker] [1rmpDAqZOKl] STARTING AbuseIPDB intelligence scan for IPs
2025-06-26 14:21:49.636	
[2025-06-26T21:21:49.636Z] [worker] === Running module (Phase 2C): abuse_intel_scan ===
2025-06-26 14:21:49.636	
[2025-06-26T21:21:49.636Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:21:49.634	
[2025-06-26T21:21:49.633Z] [denialWalletScan] Starting denial-of-wallet scan for domain="lodging-source.com"
2025-06-26 14:21:49.633	
[2025-06-26T21:21:49.633Z] [worker] [1rmpDAqZOKl] STARTING denial-of-wallet vulnerability scan for lodging-source.com
2025-06-26 14:21:49.633	
[2025-06-26T21:21:49.632Z] [worker] === Running module (Phase 2C): denial_wallet_scan ===
2025-06-26 14:21:49.632	
[2025-06-26T21:21:49.632Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:21:49.623	
[2025-06-26T21:21:49.623Z] [accessibilityScan] Starting accessibility scan for domain="lodging-source.com"
2025-06-26 14:21:49.623	
[2025-06-26T21:21:49.622Z] [worker] [1rmpDAqZOKl] STARTING accessibility compliance scan for lodging-source.com
2025-06-26 14:21:49.623	
[2025-06-26T21:21:49.622Z] [worker] === Running module (Phase 2C): accessibility_scan ===
2025-06-26 14:21:49.623	
[2025-06-26T21:21:49.622Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:21:49.583	
[2025-06-26T21:21:49.583Z] [techStackScan] techstack=start domain=lodging-source.com
2025-06-26 14:21:49.582	
[2025-06-26T21:21:49.582Z] [worker] [1rmpDAqZOKl] STARTING tech stack scan for lodging-source.com
2025-06-26 14:21:49.582	
[2025-06-26T21:21:49.582Z] [worker] === Running module (Phase 2C): tech_stack_scan ===
2025-06-26 14:21:49.582	
[2025-06-26T21:21:49.582Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:21:49.579	
[2025-06-26T21:21:49.578Z] [worker] [1rmpDAqZOKl] COMPLETED endpoint discovery: 6 endpoint collections found
2025-06-26 14:21:49.579	
[2025-06-26T21:21:49.578Z] [endpointDiscovery] ⇢ done – 6 endpoints
2025-06-26 14:21:49.579	
[artifactStore] Inserted discovered_endpoints artifact: Discovered 6 unique endpoints for lodging-source.com...
2025-06-26 14:21:13.997	
[2025-06-26T21:21:13.994Z] [endpointDiscovery] +crawl_link /direct// (-)
2025-06-26 14:21:12.515	
[2025-06-26T21:21:12.515Z] [endpointDiscovery] +js_analysis //www.youtube.com/player_api (-)
2025-06-26 14:21:12.165	
[2025-06-26T21:21:12.165Z] [endpointDiscovery] +crawl_link /home.html (-)
2025-06-26 14:21:12.165	
[2025-06-26T21:21:12.165Z] [endpointDiscovery] +crawl_link /direct/index.php (-)
2025-06-26 14:21:12.165	
[2025-06-26T21:21:12.164Z] [endpointDiscovery] +crawl_link / (-)
2025-06-26 14:21:12.164	
[2025-06-26T21:21:12.164Z] [endpointDiscovery] +crawl_link /index.html (-)
2025-06-26 14:21:11.785	
[2025-06-26T21:21:11.785Z] [endpointDiscovery] ⇢ start lodging-source.com
2025-06-26 14:21:11.785	
[2025-06-26T21:21:11.785Z] [worker] [1rmpDAqZOKl] STARTING endpoint discovery for lodging-source.com
2025-06-26 14:21:11.785	
[2025-06-26T21:21:11.785Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:21:11.779	
[2025-06-26T21:21:11.779Z] [worker] === Running endpoint discovery ===
2025-06-26 14:21:11.779	
[2025-06-26T21:21:11.779Z] [worker] [1rmpDAqZOKl] COMPLETED DNS Twist: 5 typo-domains found
2025-06-26 14:21:11.779	
[2025-06-26T21:21:11.779Z] [dnstwist] Scan completed – 5 domains analysed
2025-06-26 14:21:11.779	
[artifactStore] Inserted finding TYPOSQUAT_REDIRECT for artifact 3343
2025-06-26 14:21:11.777	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgings...
2025-06-26 14:21:00.389	
}
2025-06-26 14:21:00.389	
]
2025-06-26 14:21:00.389	
"Lodging Source: tls_scan_phase2a (20%)"
2025-06-26 14:21:00.389	
"progress": [
2025-06-26 14:21:00.389	
[2025-06-26T21:21:00.388Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-26 14:20:00.491	
}
2025-06-26 14:20:00.491	
]
2025-06-26 14:20:00.491	
"Lodging Source: tls_scan_phase2a (20%)"
2025-06-26 14:20:00.491	
"progress": [
2025-06-26 14:20:00.491	
[2025-06-26T21:20:00.491Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-26 14:19:23.313	
[2025-06-26T21:19:23.312Z] [worker] [1rmpDAqZOKl] COMPLETED document exposure: 0 discoveries
2025-06-26 14:19:23.313	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-06-26 14:19:23.293	
[2025-06-26T21:19:23.292Z] [documentExposure] Completed: 0 files found, 10 Serper calls (~$0.030)
2025-06-26 14:19:23.293	
[2025-06-26T21:19:23.292Z] [documentExposure] Reached search query limit (10) - stopping to control costs
2025-06-26 14:19:21.791	
[2025-06-26T21:19:21.791Z] [documentExposure] Serper returned 0 results for query 10
2025-06-26 14:19:21.003	
[2025-06-26T21:19:21.001Z] [documentExposure] Serper API call 10: ""Lodging Source" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-06-26 14:19:17.850	
[2025-06-26T21:19:17.849Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:19:15.787	
[2025-06-26T21:19:15.787Z] [documentExposure] Serper returned 7 results for query 9
2025-06-26 14:19:14.956	
[2025-06-26T21:19:14.955Z] [documentExposure] Serper API call 9: ""Lodging Source" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-06-26 14:19:13.299	
[2025-06-26T21:19:13.298Z] [documentExposure] Serper returned 4 results for query 8
2025-06-26 14:19:11.979	
[2025-06-26T21:19:11.977Z] [documentExposure] Serper API call 8: ""Lodging Source" (intitle:"index of" OR intitle:"directory listing")"
2025-06-26 14:19:10.476	
[2025-06-26T21:19:10.475Z] [documentExposure] Serper returned 10 results for query 7
2025-06-26 14:19:09.298	
[2025-06-26T21:19:09.297Z] [documentExposure] Serper API call 7: ""Lodging Source" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-06-26 14:19:07.338	
[2025-06-26T21:19:07.337Z] [documentExposure] Serper returned 1 results for query 6
2025-06-26 14:19:06.659	
[2025-06-26T21:19:06.657Z] [documentExposure] Serper API call 6: ""Lodging Source" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-06-26 14:19:05.156	
[2025-06-26T21:19:05.155Z] [documentExposure] Serper returned 2 results for query 5
2025-06-26 14:19:04.431	
[2025-06-26T21:19:04.430Z] [documentExposure] Serper API call 5: ""Lodging Source" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-06-26 14:19:02.929	
[2025-06-26T21:19:02.929Z] [documentExposure] Serper returned 10 results for query 4
2025-06-26 14:19:01.574	
[2025-06-26T21:19:01.573Z] [documentExposure] Serper API call 4: ""Lodging Source" ("database" OR "backup" OR "dump") filetype:sql"
2025-06-26 14:19:00.549	
}
2025-06-26 14:19:00.549	
"PHISHING_SETUP": 4
2025-06-26 14:19:00.549	
"MISSING_TLS_CERTIFICATE": 1,
2025-06-26 14:19:00.549	
"TLS_CONFIGURATION_ISSUE": 2,
2025-06-26 14:19:00.549	
"EXPOSED_SERVICE": 2,
2025-06-26 14:19:00.549	
[2025-06-26T21:19:00.549Z] [SyncWorker] ✅ New findings synced: 9 {
2025-06-26 14:19:00.403	
}
2025-06-26 14:19:00.403	
]
2025-06-26 14:19:00.403	
"Lodging Source: tls_scan_phase2a (20%)"
2025-06-26 14:19:00.403	
"progress": [
2025-06-26 14:19:00.403	
[2025-06-26T21:19:00.403Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-26 14:19:00.073	
[2025-06-26T21:19:00.072Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:18:59.348	
[2025-06-26T21:18:59.348Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:18:58.097	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3341
2025-06-26 14:18:58.096	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgin.g...
2025-06-26 14:18:57.403	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3340
2025-06-26 14:18:57.402	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-26 14:18:57.233	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3339
2025-06-26 14:18:57.231	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-26 14:18:56.810	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 3338
2025-06-26 14:18:56.808	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-26 14:18:56.513	
[2025-06-26T21:18:56.508Z] [documentExposure] Serper returned 20 results for query 3
2025-06-26 14:18:56.466	
[2025-06-26T21:18:56.466Z] [dnstwist] Batch 1/1
2025-06-26 14:18:56.466	
[2025-06-26T21:18:56.465Z] [dnstwist] Found 5 registered typosquat candidates to analyze
2025-06-26 14:18:55.482	
[2025-06-26T21:18:55.481Z] [documentExposure] Serper API call 3: ""Lodging Source" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-06-26 14:18:52.810	
[2025-06-26T21:18:52.810Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:18:52.025	
[2025-06-26T21:18:52.025Z] [documentExposure] process error: Request failed with status code 403
2025-06-26 14:18:50.691	
[2025-06-26T21:18:50.691Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:18:50.022	
[2025-06-26T21:18:50.022Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:18:49.371	
[2025-06-26T21:18:49.371Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:18:48.201	
[2025-06-26T21:18:48.201Z] [documentExposure] process error: Request failed with status code 403
2025-06-26 14:18:47.115	
[2025-06-26T21:18:47.115Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:18:46.030	
[2025-06-26T21:18:46.029Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 14:18:44.793	
[2025-06-26T21:18:44.792Z] [documentExposure] process error: timeout of 30000ms exceeded
2025-06-26 14:18:22.133	
[2025-06-26T21:18:22.133Z] [worker] [1rmpDAqZOKl] COMPLETED TLS scan: 3 TLS issues found
2025-06-26 14:18:22.133	
[2025-06-26T21:18:22.133Z] [tlsScan] Scan complete. Hosts: lodging-source.com, www.lodging-source.com. Findings: 3
2025-06-26 14:18:22.133	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 3 issue(s) found...
2025-06-26 14:18:22.131	
[artifactStore] Inserted finding MISSING_TLS_CERTIFICATE for artifact 3336
2025-06-26 14:18:22.129	
[artifactStore] Inserted tls_no_certificate artifact: lodging-source.com - no valid SSL/TLS certificate on any hos...
2025-06-26 14:18:22.127	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 3335
2025-06-26 14:18:22.124	
[artifactStore] Inserted tls_configuration artifact: www.lodging-source.com - Incomplete SSL certificate chain (m...
2025-06-26 14:18:22.101	
[2025-06-26T21:18:22.100Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-26 14:18:21.827	
[2025-06-26T21:18:21.826Z] [tlsScan] Cross-validation complete for www.lodging-source.com: 0 additional findings
2025-06-26 14:18:11.251	
[2025-06-26T21:18:11.251Z] [tlsScan] Python validator: www.lodging-source.com - INVALID
2025-06-26 14:18:11.014	
[2025-06-26T21:18:11.012Z] [tlsScan] Scanning www.lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-26 14:18:11.014	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 3334
2025-06-26 14:18:11.008	
[artifactStore] Inserted tls_configuration artifact: lodging-source.com - Incomplete SSL certificate chain (missi...
2025-06-26 14:18:10.976	
[2025-06-26T21:18:10.976Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-26 14:18:10.704	
[2025-06-26T21:18:10.702Z] [tlsScan] Cross-validation complete for lodging-source.com: 0 additional findings
2025-06-26 14:18:06.913	
[2025-06-26T21:18:06.913Z] [worker] [1rmpDAqZOKl] COMPLETED Shodan infrastructure scan: 4 services found
2025-06-26 14:18:06.913	
[2025-06-26T21:18:06.913Z] [Shodan] Done — 4 rows persisted, 1 API calls used for 1 targets
2025-06-26 14:18:06.913	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 4 items...
2025-06-26 14:18:06.912	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 3332
2025-06-26 14:18:06.910	
[artifactStore] Inserted shodan_service artifact: 74.208.42.246:443 Apache httpd 2.4.62...
2025-06-26 14:18:06.908	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 3331
2025-06-26 14:18:06.907	
[artifactStore] Inserted shodan_service artifact: 70.35.206.233:443 Apache httpd 2.4.62...
2025-06-26 14:18:06.902	
[2025-06-26T21:18:06.901Z] [Shodan] API call 1 - search query
2025-06-26 14:18:04.752	
[2025-06-26T21:18:04.750Z] [documentExposure] Serper returned 20 results for query 2
2025-06-26 14:18:03.479	
[2025-06-26T21:18:03.479Z] [documentExposure] Serper API call 2: ""Lodging Source" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-06-26 14:18:01.977	
[2025-06-26T21:18:01.976Z] [documentExposure] Serper returned 0 results for query 1
2025-06-26 14:18:01.461	
[2025-06-26T21:18:01.460Z] [documentExposure] Serper API call 1: "site:lodging-source.com (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-06-26 14:18:00.533	
}
2025-06-26 14:18:00.533	
"EMAIL_SECURITY_WEAKNESS": 1
2025-06-26 14:18:00.533	
"MULTIPLE_BREACH_SOURCES": 1,
2025-06-26 14:18:00.533	
"DOMAIN_BREACH_COUNT": 1,
2025-06-26 14:18:00.533	
[2025-06-26T21:18:00.533Z] [SyncWorker] ✅ New findings synced: 3 {
2025-06-26 14:18:00.374	
}
2025-06-26 14:18:00.374	
]
2025-06-26 14:18:00.374	
"Lodging Source: tls_scan_phase2a (20%)"
2025-06-26 14:18:00.374	
"progress": [
2025-06-26 14:18:00.374	
[2025-06-26T21:18:00.373Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-26 14:18:00.339	
[2025-06-26T21:18:00.339Z] [tlsScan] Python validator: lodging-source.com - INVALID
2025-06-26 14:18:00.307	
[2025-06-26T21:18:00.307Z] [worker] [1rmpDAqZOKl] COMPLETED email security scan: 1 email issues found
2025-06-26 14:18:00.307	
[2025-06-26T21:18:00.306Z] [spfDmarc] Completed email security scan, found 1 issues
2025-06-26 14:18:00.304	
[artifactStore] Inserted bimi_missing artifact: BIMI record not found...
2025-06-26 14:18:00.267	
[2025-06-26T21:18:00.267Z] [spfDmarc] Checking for BIMI record...
2025-06-26 14:18:00.267	
[2025-06-26T21:18:00.267Z] [spfDmarc] Found DKIM record with selector: default
2025-06-26 14:18:00.231	
[2025-06-26T21:18:00.231Z] [spfDmarc] Probing for common DKIM selectors...
2025-06-26 14:18:00.023	
[2025-06-26T21:18:00.022Z] [spfDmarc] Performing recursive SPF check...
2025-06-26 14:18:00.023	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 3329
2025-06-26 14:18:00.018	
[artifactStore] Inserted dmarc_weak artifact: DMARC policy is not enforcing...
2025-06-26 14:17:59.937	
[2025-06-26T21:17:59.936Z] [tlsScan] Scanning lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-26 14:17:59.936	

2025-06-26 14:17:59.936	
OpenSSL 3.5.0 8 Apr 2025
2025-06-26 14:17:59.935	
[2025-06-26T21:17:59.935Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-06-26 14:17:59.909	
[2025-06-26T21:17:59.907Z] [worker] [1rmpDAqZOKl] STARTING TLS security scan for lodging-source.com
2025-06-26 14:17:59.909	
[2025-06-26T21:17:59.907Z] [worker] === Running module (Phase 2A): tls_scan ===
2025-06-26 14:17:59.909	
[2025-06-26T21:17:59.907Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:17:59.900	
[2025-06-26T21:17:59.898Z] [spfDmarc] Checking DMARC record...
2025-06-26 14:17:59.895	
[2025-06-26T21:17:59.895Z] [spfDmarc] Starting email security scan for lodging-source.com
2025-06-26 14:17:59.894	
[2025-06-26T21:17:59.894Z] [worker] [1rmpDAqZOKl] STARTING SPF/DMARC email security scan for lodging-source.com
2025-06-26 14:17:59.894	
[2025-06-26T21:17:59.894Z] [worker] === Running module (Phase 2A): spf_dmarc ===
2025-06-26 14:17:59.894	
[2025-06-26T21:17:59.893Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:17:59.890	
[2025-06-26T21:17:59.890Z] [dnstwist] WHOIS enrichment disabled (saves ~$0.30-0.75 per scan) - set ENABLE_WHOIS_ENRICHMENT=true to enable
2025-06-26 14:17:59.890	
[2025-06-26T21:17:59.890Z] [dnstwist] Starting typosquat scan for lodging-source.com
2025-06-26 14:17:59.889	
[2025-06-26T21:17:59.889Z] [worker] [1rmpDAqZOKl] STARTING DNS Twist scan for lodging-source.com
2025-06-26 14:17:59.889	
[2025-06-26T21:17:59.889Z] [worker] === Running module (Phase 2A): dns_twist ===
2025-06-26 14:17:59.889	
[2025-06-26T21:17:59.889Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:17:59.885	
[2025-06-26T21:17:59.885Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-06-26 14:17:59.884	
[2025-06-26T21:17:59.884Z] [worker] [1rmpDAqZOKl] STARTING document exposure scan for Lodging Source
2025-06-26 14:17:59.884	
[2025-06-26T21:17:59.884Z] [worker] === Running module (Phase 2A): document_exposure ===
2025-06-26 14:17:59.884	
[2025-06-26T21:17:59.884Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:17:59.833	
[2025-06-26T21:17:59.833Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-06-26 14:17:59.832	
[2025-06-26T21:17:59.832Z] [worker] [1rmpDAqZOKl] COMPLETED Censys platform scan: 0 services found
2025-06-26 14:17:59.832	
[1rmpDAqZOKl] Censys scan skipped - CENSYS_PAT and CENSYS_ORG_ID not configured (saves ~$2-10 per scan)
2025-06-26 14:17:59.832	
[2025-06-26T21:17:59.832Z] [worker] [1rmpDAqZOKl] STARTING Censys platform scan for lodging-source.com
2025-06-26 14:17:59.832	
[2025-06-26T21:17:59.832Z] [worker] === Running module (Phase 2A): censys ===
2025-06-26 14:17:59.832	
[2025-06-26T21:17:59.831Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:17:59.831	
[2025-06-26T21:17:59.831Z] [Shodan] Start scan for lodging-source.com
2025-06-26 14:17:59.831	
[2025-06-26T21:17:59.830Z] [worker] [1rmpDAqZOKl] STARTING Shodan scan for lodging-source.com
2025-06-26 14:17:59.830	
[2025-06-26T21:17:59.830Z] [worker] === Running module (Phase 2A): shodan ===
2025-06-26 14:17:59.830	
[2025-06-26T21:17:59.830Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:17:59.826	
[2025-06-26T21:17:59.826Z] [worker] [1rmpDAqZOKl] COMPLETED SpiderFoot discovery: 7 targets found
2025-06-26 14:17:59.826	
[2025-06-26T21:17:59.825Z] [SpiderFoot] ✔️ Completed – 7 artifacts
2025-06-26 14:17:59.826	
[artifactStore] Inserted scan_summary artifact: SpiderFoot scan completed: 7 artifacts...
2025-06-26 14:17:59.824	
[artifactStore] Inserted intel artifact: support@lodging-source.com...
2025-06-26 14:17:59.823	
[artifactStore] Inserted intel artifact: GoDaddy.com, LLC...
2025-06-26 14:17:59.821	
Registry Domain ID: 1...
2025-06-26 14:17:59.821	
[artifactStore] Inserted intel artifact:    Domain Name: LODGING-SOURCE.COM
2025-06-26 14:17:59.819	
[artifactStore] Inserted intel artifact: 74.208.42.246...
2025-06-26 14:17:59.818	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-26 14:17:59.816	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-26 14:17:59.815	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-26 14:17:59.812	
[2025-06-26T21:17:59.812Z] [SpiderFoot] Raw output size: 8032 bytes
2025-06-26 14:17:53.629	
[2025-06-26T21:17:53.629Z] [worker] [1rmpDAqZOKl] COMPLETED Breach Directory probe: 2 breach findings
2025-06-26 14:17:53.629	
[2025-06-26T21:17:53.629Z] [breachDirectoryProbe] Breach probe completed: 2 findings in 2013ms
2025-06-26 14:17:53.629	
[artifactStore] Inserted finding MULTIPLE_BREACH_SOURCES for artifact 3320
2025-06-26 14:17:53.628	
[artifactStore] Inserted finding DOMAIN_BREACH_COUNT for artifact 3320
2025-06-26 14:17:53.624	
[artifactStore] Inserted breach_directory_summary artifact: Breach probe: 63 total breached accounts (BD: 0, LC: 63) for...
2025-06-26 14:17:53.618	
[2025-06-26T21:17:53.618Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=63, Total=63
2025-06-26 14:17:53.615	
[2025-06-26T21:17:53.615Z] [breachDirectoryProbe] LeakCheck response for lodging-source.com: 63 breached accounts, quota remaining: 999999
2025-06-26 14:17:52.855	
[2025-06-26T21:17:52.853Z] [breachDirectoryProbe] Querying LeakCheck for domain: lodging-source.com
2025-06-26 14:17:52.501	
[2025-06-26T21:17:52.501Z] [breachDirectoryProbe] Breach Directory response for lodging-source.com: 0 breached accounts
2025-06-26 14:17:51.618	
[2025-06-26T21:17:51.618Z] [breachDirectoryProbe] Querying Breach Directory for domain: lodging-source.com
2025-06-26 14:17:51.617	
[2025-06-26T21:17:51.616Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="lodging-source.com" (BreachDirectory + LeakCheck)
2025-06-26 14:17:51.616	
[2025-06-26T21:17:51.616Z] [worker] [1rmpDAqZOKl] STARTING Breach Directory intelligence probe for lodging-source.com
2025-06-26 14:17:51.616	
[2025-06-26T21:17:51.616Z] [worker] === Running module (Phase 1): breach_directory_probe ===
2025-06-26 14:17:51.615	
[2025-06-26T21:17:51.614Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:17:51.600	
[2025-06-26T21:17:51.600Z] [SpiderFoot] Command: python3 /opt/spiderfoot/sf.py -q -s lodging-source.com -m sfp_crtsh,sfp_sublist3r,sfp_chaos,sfp_r7_dns,sfp_haveibeenpwnd,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei,sfp_whois,sfp_dnsresolve -o json
2025-06-26 14:17:51.598	
[2025-06-26T21:17:51.598Z] [SpiderFoot] API keys: HIBP ✅, Chaos ✅ (Shodan/Censys handled by dedicated modules)
2025-06-26 14:17:51.595	
[2025-06-26T21:17:51.595Z] [SpiderFoot] Starting scan for lodging-source.com (scanId=1rmpDAqZOKl)
2025-06-26 14:17:51.594	
[2025-06-26T21:17:51.594Z] [worker] [1rmpDAqZOKl] STARTING SpiderFoot discovery for lodging-source.com
2025-06-26 14:17:51.594	
[2025-06-26T21:17:51.594Z] [worker] === Running module (Phase 1): spiderfoot ===
2025-06-26 14:17:51.594	
[2025-06-26T21:17:51.594Z] [worker] [updateScanMasterStatus] Updated scan 1rmpDAqZOKl with: status, current_module, progress
2025-06-26 14:17:51.583	
[queue] Updated job 1rmpDAqZOKl status: processing - Comprehensive security discovery in progress...
2025-06-26 14:17:51.430	
[2025-06-26T21:17:51.427Z] [worker] Processing comprehensive security scan for Lodging Source (lodging-source.com)
2025-06-26 14:17:51.430	
[2025-06-26T21:17:51.427Z] [worker] ✅ JOB PICKED UP: Processing scan job 1rmpDAqZOKl for Lodging Source (lodging-source.com)
2025-06-26 14:17:51.430	
[2025-06-26T21:17:51.426Z] [worker] Processing scan job: 1rmpDAqZOKl
2025-06-26 14:17:51.430	
}
2025-06-26 14:17:51.430	
createdAt: '2025-06-26T21:17:48.575Z'
2025-06-26 14:17:51.430	
domain: 'lodging-source.com',
2025-06-26 14:17:51.430	
companyName: 'Lodging Source',
2025-06-26 14:17:51.430	
id: '1rmpDAqZOKl',
2025-06-26 14:17:51.430	
[queue] Parsed job: {
2025-06-26 14:17:51.430	
[queue] Job string to parse: {"id":"1rmpDAqZOKl","companyName":"Lodging Source","domain":"lodging-source.com","createdAt":"2025-06-26T21:17:48.575Z"}
2025-06-26 14:17:51.426	
} Type: object
2025-06-26 14:17:51.426	
createdAt: '2025-06-26T21:17:48.575Z'
2025-06-26 14:17:51.426	
domain: 'lodging-source.com',
2025-06-26 14:17:51.426	
companyName: 'Lodging Source',
2025-06-26 14:17:51.426	
id: '1rmpDAqZOKl',
2025-06-26 14:17:51.426	
[queue] Raw job data from Redis: {
2025-06-26 14:17:49.341	
{
  "level": 30,
  "time": 1750972669341,
  "pid": 659,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "res": {
    "statusCode": 200
  },
  "responseTime": 771.289982999675,
  "msg": "request completed"
}
2025-06-26 14:17:49.338	
[2025-06-26T21:17:49.337Z] [api] ✅ Successfully created scan job 1rmpDAqZOKl for Lodging Source
2025-06-26 14:17:49.338	
[queue] enqueued 1rmpDAqZOKl
2025-06-26 14:17:48.656	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-06-26 14:17:48.656	
(node:659) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-06-26 14:17:48.575	
[2025-06-26T21:17:48.575Z] [api] Attempting to create scan job 1rmpDAqZOKl for Lodging Source (lodging-source.com)
2025-06-26 14:17:48.570	
{
  "level": 30,
  "time": 1750972668569,
  "pid": 659,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "req": {
    "method": "POST",
    "url": "/scans",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 47030
  },
  "msg": "incoming request"
}