		2025-06-26 09:43:15.378	
[2025-06-26T16:43:15.378Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Lodging Source: 15 verified findings, 20 artifacts across 20 security modules
2025-06-26 09:43:15.378	
[queue] Updated job lLCCJjY5Bss status: done - Comprehensive security scan completed - 15 verified findings across 20 security modules. Findings ready for processing.
2025-06-26 09:43:14.971	
[2025-06-26T16:43:14.971Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-06-26 09:43:14.901	
[2025-06-26T16:43:14.901Z] [worker] [processScan] Counted 20 artifacts for scan lLCCJjY5Bss
2025-06-26 09:43:14.899	
[2025-06-26T16:43:14.899Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: progress
2025-06-26 09:43:14.893	
[2025-06-26T16:43:14.893Z] [worker] [lLCCJjY5Bss] COMPLETED secret detection: 0 secrets found
2025-06-26 09:43:14.893	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-06-26 09:43:14.731	
[2025-06-26T16:43:14.731Z] [trufflehog] Finished secret scan for lodging-source.com Total secrets found: 0
2025-06-26 09:43:14.731	
[2025-06-26T16:43:14.731Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-lLCCJjY5Bss.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-lLCCJjY5Bss.json'
2025-06-26 09:43:14.731	
[2025-06-26T16:43:14.731Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-lLCCJjY5Bss.json
2025-06-26 09:43:14.731	
[2025-06-26T16:43:14.730Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-06-26 09:43:14.730	
[2025-06-26T16:43:14.730Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-06-26 09:43:14.730	
[2025-06-26T16:43:14.730Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-lLCCJjY5Bss.json'
2025-06-26 09:43:14.729	
[2025-06-26T16:43:14.729Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-lLCCJjY5Bss.json
2025-06-26 09:43:14.729	
[2025-06-26T16:43:14.653Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-06-26 09:42:28.011	
[2025-06-26T16:42:28.010Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/main.js
2025-06-26 09:41:30.706	
[2025-06-26T16:41:30.704Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/bundle.js
2025-06-26 09:41:29.798	
[2025-06-26T16:41:29.797Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-06-26 09:41:29.798	
[2025-06-26T16:41:29.797Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-06-26 09:41:29.798	
[2025-06-26T16:41:29.797Z] [trufflehog] Starting targeted secret scan for domain: lodging-source.com
2025-06-26 09:41:29.798	
[2025-06-26T16:41:29.797Z] [worker] [lLCCJjY5Bss] STARTING TruffleHog secret detection for lodging-source.com
2025-06-26 09:41:29.797	
[2025-06-26T16:41:29.797Z] [worker] === Running module: trufflehog (20/20) ===
2025-06-26 09:41:29.797	
[2025-06-26T16:41:29.796Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:41:29.796	
[2025-06-26T16:41:29.795Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: progress
2025-06-26 09:41:29.794	
[2025-06-26T16:41:29.794Z] [worker] [lLCCJjY5Bss] COMPLETED rate limiting tests: 1 rate limit issues found
2025-06-26 09:41:29.794	
[artifactStore] Inserted scan_summary artifact: Rate limit scan completed: 1 issues found...
2025-06-26 09:41:29.793	
[artifactStore] Inserted finding RATE_LIMIT_BYPASS for artifact 3289
2025-06-26 09:41:29.791	
[artifactStore] Inserted rate_limit_bypass artifact: Rate limit bypass possible on endpoint: //www.youtube.com/pl...
2025-06-26 09:41:29.789	
[2025-06-26T16:41:29.788Z] [rateLimitScan] [VULNERABLE] Found 12 bypass techniques for https://lodging-source.com//www.youtube.com/player_api
2025-06-26 09:41:24.575	
[2025-06-26T16:41:24.574Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com//www.youtube.com/player_api. Testing for bypasses...
2025-06-26 09:41:24.571	
[2025-06-26T16:41:24.491Z] [rateLimitScan] Response distribution for https://lodging-source.com//www.youtube.com/player_api: { '404': 25 }
2025-06-26 09:41:22.010	
[2025-06-26T16:41:22.010Z] [rateLimitScan] Establishing baseline for https://lodging-source.com//www.youtube.com/player_api...
2025-06-26 09:41:22.009	
[2025-06-26T16:41:22.009Z] [rateLimitScan] Found 1 endpoints to test.
2025-06-26 09:41:21.935	
[2025-06-26T16:41:21.935Z] [rateLimitScan] Starting comprehensive rate limit scan for lodging-source.com
2025-06-26 09:41:21.934	
[2025-06-26T16:41:21.934Z] [worker] [lLCCJjY5Bss] STARTING rate-limit tests for lodging-source.com
2025-06-26 09:41:21.934	
[2025-06-26T16:41:21.934Z] [worker] === Running module: rate_limit_scan (19/20) ===
2025-06-26 09:41:21.934	
[2025-06-26T16:41:21.934Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:41:21.932	
[2025-06-26T16:41:21.932Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: progress
2025-06-26 09:41:21.931	
[2025-06-26T16:41:21.931Z] [worker] [lLCCJjY5Bss] COMPLETED Nuclei scan: 0 vulnerabilities found
2025-06-26 09:41:21.931	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-06-26 09:41:21.850	
[2025-06-26T16:41:21.850Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-06-26 09:41:21.850	
[2025-06-26T16:41:21.850Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-06-26 09:41:21.850	
[2025-06-26T16:41:21.849Z] [nuclei] [Tag Scan] Failed for https://lodging-source.com: Command failed: nuclei -u https://lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:41:19.609	
[2025-06-26T16:41:19.609Z] [nuclei] [Tag Scan] Running on https://lodging-source.com with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-26 09:41:19.536	
[2025-06-26T16:41:19.536Z] [nuclei] --- Starting Phase 1: Tag-based scans on 1 targets ---
2025-06-26 09:41:19.536	
[2025-06-26T16:41:19.536Z] [nuclei] Template update complete.
2025-06-26 09:41:19.536	
[INF] No new updates found for nuclei templates
2025-06-26 09:41:19.536	
projectdiscovery.io
2025-06-26 09:41:19.536	
/_/ /_/\__,_/\___/_/\___/_/   v3.2.9
2025-06-26 09:41:19.536	
/ / / / /_/ / /__/ /  __/ /
2025-06-26 09:41:19.536	
/ __ \/ / / / ___/ / _ \/ /
2025-06-26 09:41:19.536	
____  __  _______/ /__  (_)
2025-06-26 09:41:19.536	
__     _
2025-06-26 09:41:19.536	
[2025-06-26T16:41:19.535Z] [nuclei] Template update stderr:
2025-06-26 09:41:16.969	
[2025-06-26T16:41:16.969Z] [nuclei] Templates are outdated (> 24 hours). Updating...
2025-06-26 09:41:16.894	
[INF] PDCP Directory: /root/.pdcp
2025-06-26 09:41:16.894	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-06-26 09:41:16.894	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-06-26 09:41:16.894	
[2025-06-26T16:41:16.894Z] [nuclei] Version check stderr: [INF] Nuclei Engine Version: v3.2.9
2025-06-26 09:41:16.893	
[2025-06-26T16:41:16.893Z] [nuclei] Nuclei binary found.
2025-06-26 09:41:15.139	
[2025-06-26T16:41:15.139Z] [nuclei] Starting enhanced vulnerability scan for lodging-source.com
2025-06-26 09:41:15.138	
[2025-06-26T16:41:15.138Z] [worker] [lLCCJjY5Bss] STARTING Nuclei vulnerability scan for lodging-source.com
2025-06-26 09:41:15.138	
[2025-06-26T16:41:15.138Z] [worker] === Running module: nuclei (18/20) ===
2025-06-26 09:41:15.138	
[2025-06-26T16:41:15.138Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:41:15.137	
[2025-06-26T16:41:15.137Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: progress
2025-06-26 09:41:15.129	
[2025-06-26T16:41:15.129Z] [worker] [lLCCJjY5Bss] COMPLETED database scan: 0 database issues found
2025-06-26 09:41:15.129	
[artifactStore] Inserted scan_summary artifact: Database port scan completed: 0 exposed services found...
2025-06-26 09:41:14.890	
[2025-06-26T16:41:14.889Z] [dbPortScan] Completed database scan, found 0 exposed services
2025-06-26 09:41:13.845	
}
2025-06-26 09:41:13.845	
]
2025-06-26 09:41:13.845	
"Lodging Source: db_port_scan (80%)"
2025-06-26 09:41:13.845	
"progress": [
2025-06-26 09:41:13.845	
[2025-06-26T16:41:13.845Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-26 09:40:52.969	
[2025-06-26T16:40:52.969Z] [dbPortScan] [1/8] Scanning lodging-source.com:27017...
2025-06-26 09:40:52.810	
[2025-06-26T16:40:52.809Z] [dbPortScan] [1/8] Scanning lodging-source.com:11211...
2025-06-26 09:40:52.729	
[2025-06-26T16:40:52.729Z] [dbPortScan] [1/8] Scanning lodging-source.com:9200...
2025-06-26 09:40:52.493	
[2025-06-26T16:40:52.493Z] [dbPortScan] [1/8] Scanning lodging-source.com:8086...
2025-06-26 09:40:31.293	
[2025-06-26T16:40:31.292Z] [dbPortScan] [1/8] Scanning lodging-source.com:6379...
2025-06-26 09:40:31.209	
[2025-06-26T16:40:31.209Z] [dbPortScan] [1/8] Scanning lodging-source.com:5432...
2025-06-26 09:40:31.138	
[2025-06-26T16:40:31.137Z] [dbPortScan] [1/8] Scanning lodging-source.com:3306...
2025-06-26 09:40:31.133	
[2025-06-26T16:40:31.133Z] [dbPortScan] [1/8] Scanning lodging-source.com:1433...
2025-06-26 09:40:29.542	
[2025-06-26T16:40:29.542Z] [dbPortScan] Validating dependencies...
2025-06-26 09:40:29.542	
[2025-06-26T16:40:29.542Z] [dbPortScan] Starting enhanced database security scan for lodging-source.com
2025-06-26 09:40:29.541	
[2025-06-26T16:40:29.541Z] [worker] [lLCCJjY5Bss] STARTING database port scan for lodging-source.com
2025-06-26 09:40:29.541	
[2025-06-26T16:40:29.541Z] [worker] === Running module: db_port_scan (17/20) ===
2025-06-26 09:40:29.541	
[2025-06-26T16:40:29.541Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:40:29.540	
[2025-06-26T16:40:29.540Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: progress
2025-06-26 09:40:29.539	
[2025-06-26T16:40:29.539Z] [worker] [lLCCJjY5Bss] COMPLETED typosquat analysis: 0 active typosquats detected
2025-06-26 09:40:29.539	
[2025-06-26T16:40:29.539Z] [worker] Skipping removed typosquatScorer module - functionality merged into dnsTwist
2025-06-26 09:40:29.539	
[2025-06-26T16:40:29.538Z] [worker] [lLCCJjY5Bss] STARTING typosquat analysis for lodging-source.com
2025-06-26 09:40:29.538	
[2025-06-26T16:40:29.538Z] [worker] === Running module: typosquat_scorer (16/20) ===
2025-06-26 09:40:29.538	
[2025-06-26T16:40:29.538Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:40:29.537	
[2025-06-26T16:40:29.537Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: progress
2025-06-26 09:40:29.534	
[2025-06-26T16:40:29.534Z] [worker] [lLCCJjY5Bss] COMPLETED email bruteforce surface scan: 0 email attack vectors found
2025-06-26 09:40:29.534	
[2025-06-26T16:40:29.534Z] [emailBruteforceSurface] No email services detected
2025-06-26 09:40:29.533	
[2025-06-26T16:40:29.533Z] [emailBruteforceSurface] Nuclei email scan failed: Command failed: nuclei -list /tmp/nuclei-email-targets-1750956027399.txt -t technologies/microsoft-exchange-server-detect.yaml -t technologies/outlook-web-access-detect.yaml -t technologies/owa-detect.yaml -t network/smtp-detect.yaml -t network/imap-detect.yaml -t network/pop3-detect.yaml -t technologies/exchange-autodiscover.yaml -t technologies/activesync-detect.yaml -t misconfiguration/exchange-server-login.yaml -t misconfiguration/owa-login-portal.yaml -json -silent -timeout 30 -retries 2 -c 6 -headless -insecure
2025-06-26 09:40:27.399	
[2025-06-26T16:40:27.399Z] [emailBruteforceSurface] Running Nuclei with 10 email templates against 50 targets
2025-06-26 09:40:27.398	
[2025-06-26T16:40:27.398Z] [emailBruteforceSurface] Generated 408 email service targets
2025-06-26 09:40:27.394	
[2025-06-26T16:40:27.394Z] [emailBruteforceSurface] Starting email bruteforce surface scan for domain="lodging-source.com"
2025-06-26 09:40:27.394	
[2025-06-26T16:40:27.393Z] [worker] [lLCCJjY5Bss] STARTING email bruteforce surface scan for lodging-source.com
2025-06-26 09:40:27.393	
[2025-06-26T16:40:27.393Z] [worker] === Running module: email_bruteforce_surface (15/20) ===
2025-06-26 09:40:27.393	
[2025-06-26T16:40:27.393Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:40:27.391	
[2025-06-26T16:40:27.391Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: progress
2025-06-26 09:40:27.370	
[2025-06-26T16:40:27.369Z] [worker] [lLCCJjY5Bss] COMPLETED RDP/VPN templates scan: 0 remote access vulnerabilities found
2025-06-26 09:40:27.369	
[2025-06-26T16:40:27.369Z] [rdpVpnTemplates] No RDP/VPN vulnerabilities detected
2025-06-26 09:40:27.369	
[2025-06-26T16:40:27.369Z] [rdpVpnTemplates] Nuclei RDP/VPN scan failed: Command failed: nuclei -list /tmp/nuclei-rdpvpn-targets-1750956027077.txt -t network/rdp-detect.yaml -t network/rdp-bluekeep-detect.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2018-13379.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2019-5591.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2020-12812.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2019-1579.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2020-2021.yaml -t vulnerabilities/citrix/citrix-adc-cve-2019-19781.yaml -t vulnerabilities/pulse/pulse-connect-secure-cve-2019-11510.yaml -t technologies/rdp-detect.yaml -t technologies/vpn-detect.yaml -json -silent -timeout 30 -retries 2 -c 6 -headless -insecure
2025-06-26 09:40:27.079	
[2025-06-26T16:40:27.079Z] [rdpVpnTemplates] Running Nuclei with 11 RDP/VPN templates against 22 targets
2025-06-26 09:40:27.077	
[2025-06-26T16:40:27.077Z] [rdpVpnTemplates] Generated 22 target URLs for RDP/VPN scanning
2025-06-26 09:40:27.074	
[2025-06-26T16:40:27.073Z] [rdpVpnTemplates] Starting RDP/VPN templates scan for domain="lodging-source.com"
2025-06-26 09:40:27.074	
[2025-06-26T16:40:27.073Z] [worker] [lLCCJjY5Bss] STARTING RDP/VPN vulnerability templates for lodging-source.com
2025-06-26 09:40:27.074	
[2025-06-26T16:40:27.073Z] [worker] === Running module: rdp_vpn_templates (14/20) ===
2025-06-26 09:40:27.073	
[2025-06-26T16:40:27.073Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:40:27.065	
[2025-06-26T16:40:27.065Z] [worker] [lLCCJjY5Bss] COMPLETED accessibility scan: 6 WCAG violations found
2025-06-26 09:40:27.065	
[2025-06-26T16:40:27.065Z] [accessibilityScan] Accessibility scan completed: 6 findings from 2/15 pages in 269007ms
2025-06-26 09:40:27.065	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3286
2025-06-26 09:40:27.064	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3286
2025-06-26 09:40:27.062	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3286
2025-06-26 09:40:27.061	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3286
2025-06-26 09:40:27.060	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3286
2025-06-26 09:40:27.058	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 3286
2025-06-26 09:40:27.055	
[artifactStore] Inserted accessibility_summary artifact: Accessibility scan: 12 violations across 2 pages (4 critical...
2025-06-26 09:40:27.032	
[2025-06-26T16:40:27.031Z] [accessibilityScan] Accessibility analysis complete: 12 violations (4 critical, 8 serious)
2025-06-26 09:40:26.011	
[2025-06-26T16:40:26.010Z] [dynamicBrowser] Page operation completed in 3196ms
2025-06-26 09:40:22.889	
[2025-06-26T16:40:22.814Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/help
2025-06-26 09:40:18.970	
[2025-06-26T16:40:18.970Z] [dynamicBrowser] Page operation completed in 1598ms
2025-06-26 09:40:17.373	
[2025-06-26T16:40:17.372Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/search
2025-06-26 09:40:12.411	
[2025-06-26T16:40:12.411Z] [dynamicBrowser] Page operation completed in 2799ms
2025-06-26 09:40:09.689	
[2025-06-26T16:40:09.612Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/join
2025-06-26 09:40:07.296	
[2025-06-26T16:40:07.295Z] [dynamicBrowser] Page operation completed in 2137ms
2025-06-26 09:40:05.158	
[2025-06-26T16:40:05.158Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/register
2025-06-26 09:40:03.931	
[2025-06-26T16:40:03.930Z] [dynamicBrowser] Page operation completed in 3598ms
2025-06-26 09:40:00.333	
[2025-06-26T16:40:00.332Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/login
2025-06-26 09:39:58.096	
[2025-06-26T16:39:58.095Z] [dynamicBrowser] Page operation completed in 2165ms
2025-06-26 09:39:55.931	
[2025-06-26T16:39:55.930Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/signup
2025-06-26 09:39:54.095	
[2025-06-26T16:39:54.094Z] [dynamicBrowser] Page operation completed in 2479ms
2025-06-26 09:39:51.688	
[2025-06-26T16:39:51.615Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/pricing
2025-06-26 09:39:50.172	
[2025-06-26T16:39:50.170Z] [dynamicBrowser] Page operation completed in 2284ms
2025-06-26 09:39:47.886	
[2025-06-26T16:39:47.886Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/products
2025-06-26 09:39:46.654	
[2025-06-26T16:39:46.654Z] [dynamicBrowser] Page operation completed in 2143ms
2025-06-26 09:39:44.511	
[2025-06-26T16:39:44.511Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/services
2025-06-26 09:39:43.155	
[2025-06-26T16:39:43.155Z] [dynamicBrowser] Page operation completed in 2099ms
2025-06-26 09:39:41.057	
[2025-06-26T16:39:41.056Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/about
2025-06-26 09:39:39.619	
[2025-06-26T16:39:39.618Z] [dynamicBrowser] Page operation completed in 3203ms
2025-06-26 09:39:36.415	
[2025-06-26T16:39:36.415Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/contact
2025-06-26 09:39:31.534	
[2025-06-26T16:39:31.533Z] [dynamicBrowser] Page operation completed in 77602ms
2025-06-26 09:39:31.532	
[2025-06-26T16:39:31.531Z] [accessibilityScan] Accessibility test complete for https://www.lodging-source.com/: 6 violations, 22 passes
2025-06-26 09:39:28.569	
[2025-06-26T16:39:28.569Z] [dynamicBrowser] Metrics: browser_rss_mb=114, heap_used_mb=63, pages_open=1
2025-06-26 09:38:58.489	
[2025-06-26T16:38:58.488Z] [dynamicBrowser] Metrics: browser_rss_mb=155, heap_used_mb=63, pages_open=1
2025-06-26 09:38:53.773	
[2025-06-26T16:38:53.771Z] [dynamicBrowser] Page script error: undefined
2025-06-26 09:38:28.489	
[2025-06-26T16:38:28.488Z] [dynamicBrowser] Metrics: browser_rss_mb=155, heap_used_mb=62, pages_open=1
2025-06-26 09:38:14.009	
[2025-06-26T16:38:13.931Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com/
2025-06-26 09:38:09.293	
[2025-06-26T16:38:09.292Z] [accessibilityScan] Accessibility test error for https://www.lodging-source.com: Navigation timeout of 30000 ms exceeded
2025-06-26 09:37:58.489	
[2025-06-26T16:37:58.488Z] [dynamicBrowser] Metrics: browser_rss_mb=155, heap_used_mb=61, pages_open=1
2025-06-26 09:37:38.412	
[2025-06-26T16:37:38.410Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com
2025-06-26 09:37:33.374	
[2025-06-26T16:37:33.374Z] [accessibilityScan] Accessibility test error for https://lodging-source.com/: Navigation timeout of 30000 ms exceeded
2025-06-26 09:37:28.409	
[2025-06-26T16:37:28.409Z] [dynamicBrowser] Metrics: browser_rss_mb=154, heap_used_mb=60, pages_open=1
2025-06-26 09:37:02.890	
[2025-06-26T16:37:02.889Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/
2025-06-26 09:37:00.654	
[2025-06-26T16:37:00.654Z] [worker] [lLCCJjY5Bss] COMPLETED tech stack scan: 0 technologies detected
2025-06-26 09:37:00.654	
[2025-06-26T16:37:00.654Z] [techStackScan] techstack=complete arts=0 time=62634ms
2025-06-26 09:37:00.654	
[artifactStore] Inserted techscan_metrics artifact: Technology scan metrics: 0 technologies, 0 supply chain risk...
2025-06-26 09:37:00.649	
[artifactStore] Inserted sbom_cyclonedx artifact: Software Bill of Materials (CycloneDX 1.5) - 0 components...
2025-06-26 09:37:00.172	
" code="2"
2025-06-26 09:37:00.172	
[2025-06-26T16:37:00.172Z] [techStackScan] techstack=nuclei_error url="null" error="Command failed: nuclei -u null -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:37:00.170	
" code="2"
2025-06-26 09:37:00.170	
[2025-06-26T16:37:00.169Z] [techStackScan] techstack=nuclei_error url="https://maxcdn.bootstrapcdn.com" error="Command failed: nuclei -u https://maxcdn.bootstrapcdn.com -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:37:00.094	
" code="2"
2025-06-26 09:37:00.094	
[2025-06-26T16:37:00.094Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/direct//" error="Command failed: nuclei -u https://lodging-source.com/direct// -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:37:00.010	
" code="2"
2025-06-26 09:37:00.010	
[2025-06-26T16:37:00.009Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com//www.youtube.com/player_api" error="Command failed: nuclei -u https://lodging-source.com//www.youtube.com/player_api -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:36:50.652	
" code="null"
2025-06-26 09:36:50.652	
[2025-06-26T16:36:50.651Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/home.html" error="Command failed: nuclei -u https://lodging-source.com/home.html -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:36:50.650	
" code="null"
2025-06-26 09:36:50.650	
[2025-06-26T16:36:50.650Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/direct/index.php" error="Command failed: nuclei -u https://lodging-source.com/direct/index.php -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:36:50.411	
[2025-06-26T16:36:50.411Z] [techStackScan] techstack=nuclei url="null"
2025-06-26 09:36:50.409	
" code="null"
2025-06-26 09:36:50.408	
[2025-06-26T16:36:50.332Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/index.html" error="Command failed: nuclei -u https://lodging-source.com/index.html -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:36:49.931	
[2025-06-26T16:36:49.931Z] [techStackScan] techstack=nuclei url="https://maxcdn.bootstrapcdn.com"
2025-06-26 09:36:49.851	
" code="null"
2025-06-26 09:36:49.851	
[2025-06-26T16:36:49.851Z] [techStackScan] techstack=nuclei_error url="https://www.lodging-source.com" error="Command failed: nuclei -u https://www.lodging-source.com -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:36:49.693	
[2025-06-26T16:36:49.691Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct//"
2025-06-26 09:36:49.613	
" code="null"
2025-06-26 09:36:49.613	
[2025-06-26T16:36:49.613Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com/" error="Command failed: nuclei -u https://lodging-source.com/ -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:36:49.292	
[2025-06-26T16:36:49.290Z] [techStackScan] techstack=nuclei url="https://lodging-source.com//www.youtube.com/player_api"
2025-06-26 09:36:49.292	
" code="null"
2025-06-26 09:36:49.292	
[2025-06-26T16:36:49.290Z] [techStackScan] techstack=nuclei_error url="https://lodging-source.com" error="Command failed: nuclei -u https://lodging-source.com -tags tech -json -silent -timeout 10 -retries 2 -headless -insecure
2025-06-26 09:36:39.211	
[2025-06-26T16:36:39.210Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/home.html"
2025-06-26 09:36:39.053	
[2025-06-26T16:36:39.051Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct/index.php"
2025-06-26 09:36:38.890	
[2025-06-26T16:36:38.890Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/"
2025-06-26 09:36:38.730	
[2025-06-26T16:36:38.730Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/index.html"
2025-06-26 09:36:38.496	
[2025-06-26T16:36:38.496Z] [techStackScan] techstack=nuclei url="https://www.lodging-source.com"
2025-06-26 09:36:38.412	
[2025-06-26T16:36:38.411Z] [techStackScan] techstack=nuclei url="https://lodging-source.com"
2025-06-26 09:36:38.332	
[2025-06-26T16:36:38.331Z] [techStackScan] techstack=targets primary=8 thirdParty=2 total=10
2025-06-26 09:36:37.453	
[2025-06-26T16:36:37.452Z] [dynamicBrowser] Page operation completed in 23672ms
2025-06-26 09:36:37.452	
[2025-06-26T16:36:37.451Z] [techStackScan] thirdParty=discovered domain=lodging-source.com origins=2
2025-06-26 09:36:28.394	
[2025-06-26T16:36:28.394Z] [dynamicBrowser] Metrics: browser_rss_mb=154, heap_used_mb=60, pages_open=1
2025-06-26 09:36:24.805	
[2025-06-26T16:36:24.805Z] [dynamicBrowser] Page operation completed in 11023ms
2025-06-26 09:36:24.804	
[2025-06-26T16:36:24.804Z] [accessibilityScan] Accessibility test complete for https://lodging-source.com: 6 violations, 22 passes
2025-06-26 09:36:13.783	
[2025-06-26T16:36:13.782Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com
2025-06-26 09:36:11.674	
[2025-06-26T16:36:11.674Z] [dynamicBrowser] Browser launched successfully
2025-06-26 09:36:00.838	
[2025-06-26T16:36:00.838Z] [techStackScan] buildTargets discovered=6 total=8
2025-06-26 09:36:00.837	
[2025-06-26T16:36:00.833Z] [techStackScan] techstack=nuclei confirmed available
2025-06-26 09:35:58.391	
[2025-06-26T16:35:58.391Z] [dynamicBrowser] Launching new browser instance
2025-06-26 09:35:58.390	
[2025-06-26T16:35:58.390Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-26 09:35:58.390	
[2025-06-26T16:35:58.389Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-26 09:35:58.389	
[2025-06-26T16:35:58.388Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-06-26 09:35:58.081	
[2025-06-26T16:35:58.081Z] [worker] [lLCCJjY5Bss] COMPLETED denial-of-wallet scan: 0 cost amplification vulnerabilities found
2025-06-26 09:35:58.081	
[2025-06-26T16:35:58.081Z] [denialWalletScan] Denial-of-wallet scan completed: 0 findings in 6ms
2025-06-26 09:35:58.081	
[2025-06-26T16:35:58.081Z] [denialWalletScan] Filtered to 0 potential cost-amplification endpoints
2025-06-26 09:35:58.081	
[2025-06-26T16:35:58.081Z] [denialWalletScan] Found 6 endpoints from endpoint discovery
2025-06-26 09:35:58.077	
[2025-06-26T16:35:58.077Z] [worker] [lLCCJjY5Bss] COMPLETED AbuseIPDB scan: 0 malicious/suspicious IPs found
2025-06-26 09:35:58.077	
[2025-06-26T16:35:58.077Z] [abuseIntelScan] No IP artifacts found for this scan
2025-06-26 09:35:58.077	
[2025-06-26T16:35:58.076Z] [abuseIntelScan] Found 0 IP artifacts for scan lLCCJjY5Bss
2025-06-26 09:35:58.075	
[2025-06-26T16:35:58.075Z] [denialWalletScan] Starting denial-of-wallet scan for domain="lodging-source.com"
2025-06-26 09:35:58.075	
[2025-06-26T16:35:58.074Z] [worker] [lLCCJjY5Bss] STARTING denial-of-wallet vulnerability scan for lodging-source.com
2025-06-26 09:35:58.073	
[2025-06-26T16:35:58.073Z] [worker] === Running module (Phase 2C): denial_wallet_scan ===
2025-06-26 09:35:58.072	
[2025-06-26T16:35:58.072Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:35:58.069	
[2025-06-26T16:35:58.069Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=lLCCJjY5Bss
2025-06-26 09:35:58.067	
[2025-06-26T16:35:58.067Z] [worker] [lLCCJjY5Bss] STARTING AbuseIPDB intelligence scan for IPs
2025-06-26 09:35:58.067	
[2025-06-26T16:35:58.067Z] [worker] === Running module (Phase 2C): abuse_intel_scan ===
2025-06-26 09:35:58.067	
[2025-06-26T16:35:58.066Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:35:58.059	
[2025-06-26T16:35:58.058Z] [accessibilityScan] Starting accessibility scan for domain="lodging-source.com"
2025-06-26 09:35:58.058	
[2025-06-26T16:35:58.057Z] [worker] [lLCCJjY5Bss] STARTING accessibility compliance scan for lodging-source.com
2025-06-26 09:35:58.058	
[2025-06-26T16:35:58.057Z] [worker] === Running module (Phase 2C): accessibility_scan ===
2025-06-26 09:35:58.058	
[2025-06-26T16:35:58.057Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:35:58.021	
[2025-06-26T16:35:58.020Z] [techStackScan] techstack=start domain=lodging-source.com
2025-06-26 09:35:58.021	
[2025-06-26T16:35:58.019Z] [worker] [lLCCJjY5Bss] STARTING tech stack scan for lodging-source.com
2025-06-26 09:35:58.021	
[2025-06-26T16:35:58.014Z] [worker] === Running module (Phase 2C): tech_stack_scan ===
2025-06-26 09:35:58.014	
[2025-06-26T16:35:58.014Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:35:58.011	
[2025-06-26T16:35:58.010Z] [worker] [lLCCJjY5Bss] COMPLETED endpoint discovery: 6 endpoint collections found
2025-06-26 09:35:58.011	
[2025-06-26T16:35:58.010Z] [endpointDiscovery] ⇢ done – 6 endpoints
2025-06-26 09:35:58.011	
[artifactStore] Inserted discovered_endpoints artifact: Discovered 6 unique endpoints for lodging-source.com...
2025-06-26 09:35:22.339	
[2025-06-26T16:35:22.339Z] [endpointDiscovery] +crawl_link /direct// (-)
2025-06-26 09:35:21.143	
[2025-06-26T16:35:21.142Z] [endpointDiscovery] +js_analysis //www.youtube.com/player_api (-)
2025-06-26 09:35:20.833	
[2025-06-26T16:35:20.833Z] [endpointDiscovery] +crawl_link /home.html (-)
2025-06-26 09:35:20.833	
[2025-06-26T16:35:20.833Z] [endpointDiscovery] +crawl_link /direct/index.php (-)
2025-06-26 09:35:20.833	
[2025-06-26T16:35:20.832Z] [endpointDiscovery] +crawl_link / (-)
2025-06-26 09:35:20.832	
[2025-06-26T16:35:20.832Z] [endpointDiscovery] +crawl_link /index.html (-)
2025-06-26 09:35:20.389	
[2025-06-26T16:35:20.389Z] [endpointDiscovery] ⇢ start lodging-source.com
2025-06-26 09:35:20.389	
[2025-06-26T16:35:20.389Z] [worker] [lLCCJjY5Bss] STARTING endpoint discovery for lodging-source.com
2025-06-26 09:35:20.389	
[2025-06-26T16:35:20.389Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:35:20.382	
[2025-06-26T16:35:20.382Z] [worker] === Running endpoint discovery ===
2025-06-26 09:35:20.382	
[2025-06-26T16:35:20.382Z] [worker] [lLCCJjY5Bss] COMPLETED document exposure: 0 discoveries
2025-06-26 09:35:20.382	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-06-26 09:35:20.361	
[2025-06-26T16:35:20.360Z] [documentExposure] Completed: 0 files found, 10 Serper calls (~$0.030)
2025-06-26 09:35:20.361	
[2025-06-26T16:35:20.360Z] [documentExposure] Reached search query limit (10) - stopping to control costs
2025-06-26 09:35:18.859	
[2025-06-26T16:35:18.858Z] [documentExposure] Serper returned 0 results for query 10
2025-06-26 09:35:17.260	
[2025-06-26T16:35:17.259Z] [documentExposure] Serper API call 10: ""Lodging Source" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-06-26 09:35:14.871	
[2025-06-26T16:35:14.870Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 09:35:13.916	
}
2025-06-26 09:35:13.916	
]
2025-06-26 09:35:13.916	
"Lodging Source: tls_scan_phase2a (20%)"
2025-06-26 09:35:13.916	
"progress": [
2025-06-26 09:35:13.916	
[2025-06-26T16:35:13.916Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-26 09:35:11.959	
[2025-06-26T16:35:11.959Z] [documentExposure] Serper returned 7 results for query 9
2025-06-26 09:35:10.314	
[2025-06-26T16:35:10.313Z] [documentExposure] Serper API call 9: ""Lodging Source" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-06-26 09:35:07.659	
[2025-06-26T16:35:07.659Z] [documentExposure] Serper returned 8 results for query 8
2025-06-26 09:35:05.886	
[2025-06-26T16:35:05.885Z] [documentExposure] Serper API call 8: ""Lodging Source" (intitle:"index of" OR intitle:"directory listing")"
2025-06-26 09:35:04.383	
[2025-06-26T16:35:04.383Z] [documentExposure] Serper returned 20 results for query 7
2025-06-26 09:35:03.212	
[2025-06-26T16:35:03.210Z] [documentExposure] Serper API call 7: ""Lodging Source" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-06-26 09:35:01.112	
[2025-06-26T16:35:01.112Z] [documentExposure] Serper returned 1 results for query 6
2025-06-26 09:34:59.857	
[2025-06-26T16:34:59.856Z] [documentExposure] Serper API call 6: ""Lodging Source" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-06-26 09:34:58.354	
[2025-06-26T16:34:58.354Z] [documentExposure] Serper returned 2 results for query 5
2025-06-26 09:34:57.447	
[2025-06-26T16:34:57.445Z] [documentExposure] Serper API call 5: ""Lodging Source" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-06-26 09:34:55.945	
[2025-06-26T16:34:55.944Z] [documentExposure] Serper returned 10 results for query 4
2025-06-26 09:34:55.024	
[2025-06-26T16:34:55.022Z] [documentExposure] Serper API call 4: ""Lodging Source" ("database" OR "backup" OR "dump") filetype:sql"
2025-06-26 09:34:55.001	
[2025-06-26T16:34:55.000Z] [worker] [lLCCJjY5Bss] COMPLETED DNS Twist: 0 typo-domains found
2025-06-26 09:34:55.001	
[2025-06-26T16:34:55.000Z] [dnstwist] Unhandled error: Command failed: dnstwist -r lodging-source.com --format json
2025-06-26 09:34:53.522	
[2025-06-26T16:34:53.521Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 09:34:52.420	
[2025-06-26T16:34:52.420Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 09:34:51.389	
[2025-06-26T16:34:51.389Z] [documentExposure] Serper returned 19 results for query 3
2025-06-26 09:34:48.973	
[2025-06-26T16:34:48.971Z] [documentExposure] Serper API call 3: ""Lodging Source" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-06-26 09:34:47.469	
[2025-06-26T16:34:47.469Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 09:34:46.588	
[2025-06-26T16:34:46.588Z] [documentExposure] process error: Request failed with status code 403
2025-06-26 09:34:45.450	
[2025-06-26T16:34:45.449Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 09:34:44.561	
[2025-06-26T16:34:44.561Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 09:34:43.149	
[2025-06-26T16:34:43.149Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 09:34:42.073	
[2025-06-26T16:34:42.073Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-26 09:34:41.410	
[2025-06-26T16:34:41.410Z] [documentExposure] process error: timeout of 30000ms exceeded
2025-06-26 09:34:17.187	
[2025-06-26T16:34:17.187Z] [worker] [lLCCJjY5Bss] COMPLETED TLS scan: 3 TLS issues found
2025-06-26 09:34:17.187	
[2025-06-26T16:34:17.187Z] [tlsScan] Scan complete. Hosts: lodging-source.com, www.lodging-source.com. Findings: 3
2025-06-26 09:34:17.187	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 3 issue(s) found...
2025-06-26 09:34:17.186	
[artifactStore] Inserted finding MISSING_TLS_CERTIFICATE for artifact 3280
2025-06-26 09:34:17.184	
[artifactStore] Inserted tls_no_certificate artifact: lodging-source.com - no valid SSL/TLS certificate on any hos...
2025-06-26 09:34:17.182	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 3279
2025-06-26 09:34:17.180	
[artifactStore] Inserted tls_configuration artifact: www.lodging-source.com - Incomplete SSL certificate chain (m...
2025-06-26 09:34:17.153	
[2025-06-26T16:34:17.153Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-26 09:34:16.928	
[2025-06-26T16:34:16.927Z] [tlsScan] Cross-validation complete for www.lodging-source.com: 0 additional findings
2025-06-26 09:34:13.953	
}
2025-06-26 09:34:13.953	
]
2025-06-26 09:34:13.953	
"Lodging Source: tls_scan_phase2a (20%)"
2025-06-26 09:34:13.953	
"progress": [
2025-06-26 09:34:13.953	
[2025-06-26T16:34:13.952Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-06-26 09:34:06.445	
[2025-06-26T16:34:06.444Z] [tlsScan] Python validator: www.lodging-source.com - INVALID
2025-06-26 09:34:06.189	
[2025-06-26T16:34:06.188Z] [tlsScan] Scanning www.lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-26 09:34:06.188	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 3278
2025-06-26 09:34:06.186	
[artifactStore] Inserted tls_configuration artifact: lodging-source.com - Incomplete SSL certificate chain (missi...
2025-06-26 09:34:06.163	
[2025-06-26T16:34:06.162Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-26 09:34:05.929	
[2025-06-26T16:34:05.928Z] [tlsScan] Cross-validation complete for lodging-source.com: 0 additional findings
2025-06-26 09:34:01.366	
[2025-06-26T16:34:01.366Z] [documentExposure] Serper returned 20 results for query 2
2025-06-26 09:34:00.297	
[2025-06-26T16:34:00.295Z] [documentExposure] Serper API call 2: ""Lodging Source" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-06-26 09:33:58.794	
[2025-06-26T16:33:58.792Z] [documentExposure] Serper returned 0 results for query 1
2025-06-26 09:33:56.772	
[2025-06-26T16:33:56.772Z] [documentExposure] Serper API call 1: "site:lodging-source.com (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-06-26 09:33:55.669	
[2025-06-26T16:33:55.668Z] [worker] [lLCCJjY5Bss] COMPLETED Shodan infrastructure scan: 4 services found
2025-06-26 09:33:55.669	
[2025-06-26T16:33:55.668Z] [Shodan] Done — 4 rows persisted, 1 API calls used for 1 targets
2025-06-26 09:33:55.669	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 4 items...
2025-06-26 09:33:55.664	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 3276
2025-06-26 09:33:55.662	
[artifactStore] Inserted shodan_service artifact: 74.208.42.246:443 Apache httpd 2.4.62...
2025-06-26 09:33:55.659	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 3275
2025-06-26 09:33:55.657	
[artifactStore] Inserted shodan_service artifact: 70.35.206.233:443 Apache httpd 2.4.62...
2025-06-26 09:33:55.654	
[2025-06-26T16:33:55.654Z] [Shodan] API call 1 - search query
2025-06-26 09:33:55.416	
[2025-06-26T16:33:55.415Z] [tlsScan] Python validator: lodging-source.com - INVALID
2025-06-26 09:33:55.315	
[2025-06-26T16:33:55.315Z] [worker] [lLCCJjY5Bss] COMPLETED email security scan: 1 email issues found
2025-06-26 09:33:55.315	
[2025-06-26T16:33:55.315Z] [spfDmarc] Completed email security scan, found 1 issues
2025-06-26 09:33:55.313	
[artifactStore] Inserted bimi_missing artifact: BIMI record not found...
2025-06-26 09:33:55.279	
[2025-06-26T16:33:55.279Z] [spfDmarc] Checking for BIMI record...
2025-06-26 09:33:55.279	
[2025-06-26T16:33:55.278Z] [spfDmarc] Found DKIM record with selector: default
2025-06-26 09:33:55.232	
[2025-06-26T16:33:55.232Z] [spfDmarc] Probing for common DKIM selectors...
2025-06-26 09:33:55.074	
[2025-06-26T16:33:55.072Z] [spfDmarc] Performing recursive SPF check...
2025-06-26 09:33:55.074	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 3273
2025-06-26 09:33:55.070	
[artifactStore] Inserted dmarc_weak artifact: DMARC policy is not enforcing...
2025-06-26 09:33:54.988	
[2025-06-26T16:33:54.987Z] [tlsScan] Scanning lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-26 09:33:54.985	

2025-06-26 09:33:54.985	
OpenSSL 3.5.0 8 Apr 2025
2025-06-26 09:33:54.985	
[2025-06-26T16:33:54.984Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-06-26 09:33:54.952	
[2025-06-26T16:33:54.950Z] [worker] [lLCCJjY5Bss] STARTING TLS security scan for lodging-source.com
2025-06-26 09:33:54.952	
[2025-06-26T16:33:54.950Z] [worker] === Running module (Phase 2A): tls_scan ===
2025-06-26 09:33:54.952	
[2025-06-26T16:33:54.950Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:33:54.949	
[2025-06-26T16:33:54.949Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-06-26 09:33:54.949	
[2025-06-26T16:33:54.947Z] [worker] [lLCCJjY5Bss] STARTING document exposure scan for Lodging Source
2025-06-26 09:33:54.949	
[2025-06-26T16:33:54.947Z] [worker] === Running module (Phase 2A): document_exposure ===
2025-06-26 09:33:54.949	
[2025-06-26T16:33:54.947Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:33:54.941	
[2025-06-26T16:33:54.940Z] [dnstwist] WHOIS enrichment disabled (saves ~$0.30-0.75 per scan) - set ENABLE_WHOIS_ENRICHMENT=true to enable
2025-06-26 09:33:54.940	
[2025-06-26T16:33:54.939Z] [dnstwist] Starting typosquat scan for lodging-source.com
2025-06-26 09:33:54.939	
[2025-06-26T16:33:54.938Z] [worker] [lLCCJjY5Bss] STARTING DNS Twist scan for lodging-source.com
2025-06-26 09:33:54.939	
[2025-06-26T16:33:54.938Z] [worker] === Running module (Phase 2A): dns_twist ===
2025-06-26 09:33:54.939	
[2025-06-26T16:33:54.938Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:33:54.933	
[2025-06-26T16:33:54.933Z] [spfDmarc] Checking DMARC record...
2025-06-26 09:33:54.933	
[2025-06-26T16:33:54.932Z] [spfDmarc] Starting email security scan for lodging-source.com
2025-06-26 09:33:54.932	
[2025-06-26T16:33:54.932Z] [worker] [lLCCJjY5Bss] STARTING SPF/DMARC email security scan for lodging-source.com
2025-06-26 09:33:54.932	
[2025-06-26T16:33:54.932Z] [worker] === Running module (Phase 2A): spf_dmarc ===
2025-06-26 09:33:54.932	
[2025-06-26T16:33:54.931Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:33:54.872	
[2025-06-26T16:33:54.872Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-06-26 09:33:54.871	
[2025-06-26T16:33:54.871Z] [worker] [lLCCJjY5Bss] COMPLETED Censys platform scan: 0 services found
2025-06-26 09:33:54.871	
[lLCCJjY5Bss] Censys scan skipped - CENSYS_PAT and CENSYS_ORG_ID not configured (saves ~$2-10 per scan)
2025-06-26 09:33:54.871	
[2025-06-26T16:33:54.870Z] [worker] [lLCCJjY5Bss] STARTING Censys platform scan for lodging-source.com
2025-06-26 09:33:54.871	
[2025-06-26T16:33:54.870Z] [worker] === Running module (Phase 2A): censys ===
2025-06-26 09:33:54.870	
[2025-06-26T16:33:54.870Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:33:54.870	
[2025-06-26T16:33:54.869Z] [Shodan] Start scan for lodging-source.com
2025-06-26 09:33:54.869	
[2025-06-26T16:33:54.869Z] [worker] [lLCCJjY5Bss] STARTING Shodan scan for lodging-source.com
2025-06-26 09:33:54.869	
[2025-06-26T16:33:54.869Z] [worker] === Running module (Phase 2A): shodan ===
2025-06-26 09:33:54.869	
[2025-06-26T16:33:54.869Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:33:54.866	
[2025-06-26T16:33:54.865Z] [worker] [lLCCJjY5Bss] COMPLETED SpiderFoot discovery: 7 targets found
2025-06-26 09:33:54.865	
[2025-06-26T16:33:54.865Z] [SpiderFoot] ✔️ Completed – 7 artifacts
2025-06-26 09:33:54.865	
[artifactStore] Inserted scan_summary artifact: SpiderFoot scan completed: 7 artifacts...
2025-06-26 09:33:54.864	
[artifactStore] Inserted intel artifact: GoDaddy.com, LLC...
2025-06-26 09:33:54.863	
Registry Domain ID: 1...
2025-06-26 09:33:54.863	
[artifactStore] Inserted intel artifact:    Domain Name: LODGING-SOURCE.COM
2025-06-26 09:33:54.860	
[artifactStore] Inserted intel artifact: 74.208.42.246...
2025-06-26 09:33:54.859	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-26 09:33:54.858	
[artifactStore] Inserted intel artifact: support@lodging-source.com...
2025-06-26 09:33:54.856	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-26 09:33:54.855	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-26 09:33:54.852	
[2025-06-26T16:33:54.851Z] [SpiderFoot] Raw output size: 8032 bytes
2025-06-26 09:33:47.685	
[2025-06-26T16:33:47.685Z] [worker] [lLCCJjY5Bss] COMPLETED Breach Directory probe: 2 breach findings
2025-06-26 09:33:47.685	
[2025-06-26T16:33:47.685Z] [breachDirectoryProbe] Breach probe completed: 2 findings in 1891ms
2025-06-26 09:33:47.684	
[artifactStore] Inserted finding MULTIPLE_BREACH_SOURCES for artifact 3264
2025-06-26 09:33:47.682	
[artifactStore] Inserted finding DOMAIN_BREACH_COUNT for artifact 3264
2025-06-26 09:33:47.679	
[artifactStore] Inserted breach_directory_summary artifact: Breach probe: 63 total breached accounts (BD: 0, LC: 63) for...
2025-06-26 09:33:47.672	
[2025-06-26T16:33:47.672Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=63, Total=63
2025-06-26 09:33:47.671	
[2025-06-26T16:33:47.671Z] [breachDirectoryProbe] LeakCheck response for lodging-source.com: 63 breached accounts, quota remaining: 999999
2025-06-26 09:33:46.948	
[2025-06-26T16:33:46.948Z] [breachDirectoryProbe] Querying LeakCheck for domain: lodging-source.com
2025-06-26 09:33:46.598	
[2025-06-26T16:33:46.597Z] [breachDirectoryProbe] Breach Directory response for lodging-source.com: 0 breached accounts
2025-06-26 09:33:45.795	
[2025-06-26T16:33:45.795Z] [breachDirectoryProbe] Querying Breach Directory for domain: lodging-source.com
2025-06-26 09:33:45.795	
[2025-06-26T16:33:45.794Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="lodging-source.com" (BreachDirectory + LeakCheck)
2025-06-26 09:33:45.794	
[2025-06-26T16:33:45.793Z] [worker] [lLCCJjY5Bss] STARTING Breach Directory intelligence probe for lodging-source.com
2025-06-26 09:33:45.794	
[2025-06-26T16:33:45.793Z] [worker] === Running module (Phase 1): breach_directory_probe ===
2025-06-26 09:33:45.794	
[2025-06-26T16:33:45.793Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:33:45.772	
[2025-06-26T16:33:45.772Z] [SpiderFoot] Command: python3 /opt/spiderfoot/sf.py -q -s lodging-source.com -m sfp_crtsh,sfp_sublist3r,sfp_chaos,sfp_r7_dns,sfp_haveibeenpwnd,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei,sfp_whois,sfp_dnsresolve -o json
2025-06-26 09:33:45.771	
[2025-06-26T16:33:45.771Z] [SpiderFoot] API keys: HIBP ✅, Chaos ✅ (Shodan/Censys handled by dedicated modules)
2025-06-26 09:33:45.768	
[2025-06-26T16:33:45.768Z] [SpiderFoot] Starting scan for lodging-source.com (scanId=lLCCJjY5Bss)
2025-06-26 09:33:45.767	
[2025-06-26T16:33:45.767Z] [worker] [lLCCJjY5Bss] STARTING SpiderFoot discovery for lodging-source.com
2025-06-26 09:33:45.767	
[2025-06-26T16:33:45.767Z] [worker] === Running module (Phase 1): spiderfoot ===
2025-06-26 09:33:45.767	
[2025-06-26T16:33:45.767Z] [worker] [updateScanMasterStatus] Updated scan lLCCJjY5Bss with: status, current_module, progress
2025-06-26 09:33:45.763	
[queue] Updated job lLCCJjY5Bss status: processing - Comprehensive security discovery in progress...
2025-06-26 09:33:45.614	
[2025-06-26T16:33:45.613Z] [worker] Processing comprehensive security scan for Lodging Source (lodging-source.com)
2025-06-26 09:33:45.614	
[2025-06-26T16:33:45.613Z] [worker] ✅ JOB PICKED UP: Processing scan job lLCCJjY5Bss for Lodging Source (lodging-source.com)
2025-06-26 09:33:45.614	
[2025-06-26T16:33:45.612Z] [worker] Processing scan job: lLCCJjY5Bss
2025-06-26 09:33:45.614	
}
2025-06-26 09:33:45.614	
createdAt: '2025-06-26T16:33:44.437Z'
2025-06-26 09:33:45.614	
domain: 'lodging-source.com',
2025-06-26 09:33:45.614	
companyName: 'Lodging Source',
2025-06-26 09:33:45.614	
id: 'lLCCJjY5Bss',
2025-06-26 09:33:45.614	
[queue] Parsed job: {
2025-06-26 09:33:45.614	
[queue] Job string to parse: {"id":"lLCCJjY5Bss","companyName":"Lodging Source","domain":"lodging-source.com","createdAt":"2025-06-26T16:33:44.437Z"}
2025-06-26 09:33:45.612	
} Type: object
2025-06-26 09:33:45.612	
createdAt: '2025-06-26T16:33:44.437Z'
2025-06-26 09:33:45.612	
domain: 'lodging-source.com',
2025-06-26 09:33:45.612	
companyName: 'Lodging Source',
2025-06-26 09:33:45.612	
id: 'lLCCJjY5Bss',
2025-06-26 09:33:45.612	
[queue] Raw job data from Redis: {
2025-06-26 09:33:45.229	
{
  "level": 30,
  "time": 1750955625229,
  "pid": 659,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "res": {
    "statusCode": 200
  },
  "responseTime": 796.7039109999969,
  "msg": "request completed"
}
2025-06-26 09:33:45.227	
[2025-06-26T16:33:45.226Z] [api] ✅ Successfully created scan job lLCCJjY5Bss for Lodging Source
2025-06-26 09:33:45.226	
[queue] enqueued lLCCJjY5Bss