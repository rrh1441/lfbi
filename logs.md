		2025-06-30 10:10:38.362	
[2025-06-30T17:10:38.361Z] [worker] ⚠️ Failed to trigger sync worker: 500 Internal Server Error
2025-06-30 10:10:38.347	
[2025-06-30T17:10:38.346Z] [worker] Triggering sync worker for scan ul1msZsLiS5
2025-06-30 10:10:38.346	
[2025-06-30T17:10:38.346Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Lodging Source: 21 verified findings, 25 artifacts across 20 security modules
2025-06-30 10:10:38.346	
[queue] Updated job ul1msZsLiS5 status: done - Comprehensive security scan completed - 21 verified findings across 20 security modules. Findings ready for processing.
2025-06-30 10:10:37.916	
[2025-06-30T17:10:37.916Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-06-30 10:10:37.912	
[2025-06-30T17:10:37.912Z] [worker] [processScan] Counted 25 artifacts for scan ul1msZsLiS5
2025-06-30 10:10:37.911	
[2025-06-30T17:10:37.911Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: progress
2025-06-30 10:10:37.909	
[2025-06-30T17:10:37.909Z] [worker] [ul1msZsLiS5] COMPLETED secret detection: 0 secrets found
2025-06-30 10:10:37.909	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-06-30 10:10:37.906	
[2025-06-30T17:10:37.906Z] [trufflehog] Finished secret scan for lodging-source.com Total secrets found: 0
2025-06-30 10:10:37.906	
[2025-06-30T17:10:37.906Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-ul1msZsLiS5.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-ul1msZsLiS5.json'
2025-06-30 10:10:37.906	
[2025-06-30T17:10:37.906Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-ul1msZsLiS5.json
2025-06-30 10:10:37.906	
[2025-06-30T17:10:37.906Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-06-30 10:10:37.905	
[2025-06-30T17:10:37.905Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-06-30 10:10:37.905	
[2025-06-30T17:10:37.905Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-ul1msZsLiS5.json'
2025-06-30 10:10:37.905	
[2025-06-30T17:10:37.905Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-ul1msZsLiS5.json
2025-06-30 10:10:37.905	
[2025-06-30T17:10:37.905Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-06-30 10:10:34.381	
[2025-06-30T17:10:34.381Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/main.js
2025-06-30 10:10:30.453	
[2025-06-30T17:10:30.452Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/bundle.js
2025-06-30 10:10:29.506	
[2025-06-30T17:10:29.505Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-06-30 10:10:29.506	
[2025-06-30T17:10:29.505Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-06-30 10:10:29.506	
[2025-06-30T17:10:29.505Z] [trufflehog] Starting targeted secret scan for domain: lodging-source.com
2025-06-30 10:10:29.506	
[2025-06-30T17:10:29.505Z] [worker] [ul1msZsLiS5] STARTING TruffleHog secret detection for lodging-source.com
2025-06-30 10:10:29.506	
[2025-06-30T17:10:29.505Z] [worker] === Running module: trufflehog (20/20) ===
2025-06-30 10:10:29.505	
[2025-06-30T17:10:29.505Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:10:29.503	
[2025-06-30T17:10:29.503Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: progress
2025-06-30 10:10:29.502	
[2025-06-30T17:10:29.502Z] [worker] [ul1msZsLiS5] COMPLETED rate limiting tests: 1 rate limit issues found
2025-06-30 10:10:29.502	
[artifactStore] Inserted scan_summary artifact: Rate limit scan completed: 1 issues found...
2025-06-30 10:10:29.501	
[artifactStore] Inserted finding RATE_LIMIT_BYPASS for artifact 4206
2025-06-30 10:10:29.498	
[artifactStore] Inserted rate_limit_bypass artifact: Rate limit bypass possible on endpoint: //www.youtube.com/pl...
2025-06-30 10:10:29.496	
[2025-06-30T17:10:29.495Z] [rateLimitScan] [VULNERABLE] Found 12 bypass techniques for https://lodging-source.com//www.youtube.com/player_api
2025-06-30 10:10:24.356	
[2025-06-30T17:10:24.356Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com//www.youtube.com/player_api. Testing for bypasses...
2025-06-30 10:10:24.356	
[2025-06-30T17:10:24.355Z] [rateLimitScan] Response distribution for https://lodging-source.com//www.youtube.com/player_api: { '404': 25 }
2025-06-30 10:10:23.426	
[2025-06-30T17:10:23.426Z] [rateLimitScan] Establishing baseline for https://lodging-source.com//www.youtube.com/player_api...
2025-06-30 10:10:23.426	
[2025-06-30T17:10:23.426Z] [rateLimitScan] Found 1 endpoints to test.
2025-06-30 10:10:23.424	
[2025-06-30T17:10:23.424Z] [rateLimitScan] Starting comprehensive rate limit scan for lodging-source.com
2025-06-30 10:10:23.424	
[2025-06-30T17:10:23.424Z] [worker] [ul1msZsLiS5] STARTING rate-limit tests for lodging-source.com
2025-06-30 10:10:23.424	
[2025-06-30T17:10:23.424Z] [worker] === Running module: rate_limit_scan (19/20) ===
2025-06-30 10:10:23.424	
[2025-06-30T17:10:23.423Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:10:23.422	
[2025-06-30T17:10:23.422Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: progress
2025-06-30 10:10:23.411	
[2025-06-30T17:10:23.411Z] [worker] [ul1msZsLiS5] COMPLETED Nuclei scan: 0 vulnerabilities found
2025-06-30 10:10:23.411	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-06-30 10:10:23.388	
[2025-06-30T17:10:23.388Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-06-30 10:10:23.388	
[2025-06-30T17:10:23.388Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-06-30 10:10:23.388	
[2025-06-30T17:10:23.388Z] [nuclei] [Two-Pass Scan] No findings for https://lodging-source.com
2025-06-30 10:10:23.388	
[2025-06-30T17:10:23.388Z] [nucleiWrapper] Two-pass scan completed: 0 findings persisted as artifacts (baseline: 0, common+tech: 0)
2025-06-30 10:10:23.388	
[2025-06-30T17:10:23.387Z] [nucleiWrapper] Warning: Could not read temp file for results parsing: Error: ENOENT: no such file or directory, open '/tmp/nuclei-ul1msZsLiS5-8b654681c4ad3523.jsonl'
2025-06-30 10:10:23.387	
[2025-06-30T17:10:23.387Z] [nucleiWrapper] Nuclei execution completed: 0 findings persisted as artifacts, exit code 1
2025-06-30 10:10:23.387	
[2025-06-30T17:10:23.387Z] [nucleiWrapper] Error persisting Nuclei findings from /tmp/nuclei-ul1msZsLiS5-8b654681c4ad3523.jsonl: ENOENT: no such file or directory, open '/tmp/nuclei-ul1msZsLiS5-8b654681c4ad3523.jsonl'
2025-06-30 10:09:53.368	
[2025-06-30T17:09:53.367Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 30 -retries 2 -headless -system-chrome -o /tmp/nuclei-ul1msZsLiS5-8b654681c4ad3523.jsonl
2025-06-30 10:09:53.367	
[2025-06-30T17:09:53.367Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:09:53.367	
[2025-06-30T17:09:53.367Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:09:53.367	
[2025-06-30T17:09:53.367Z] [nucleiWrapper] Warning: Could not read temp file for results parsing: Error: ENOENT: no such file or directory, open '/tmp/nuclei-ul1msZsLiS5-f6f58b6d6c0330df.jsonl'
2025-06-30 10:09:53.367	
[2025-06-30T17:09:53.367Z] [nucleiWrapper] Nuclei execution completed: 0 findings persisted as artifacts, exit code 1
2025-06-30 10:09:53.367	
[2025-06-30T17:09:53.367Z] [nucleiWrapper] Error persisting Nuclei findings from /tmp/nuclei-ul1msZsLiS5-f6f58b6d6c0330df.jsonl: ENOENT: no such file or directory, open '/tmp/nuclei-ul1msZsLiS5-f6f58b6d6c0330df.jsonl'
2025-06-30 10:09:23.344	
[2025-06-30T17:09:23.344Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 30 -retries 2 -headless -system-chrome -o /tmp/nuclei-ul1msZsLiS5-f6f58b6d6c0330df.jsonl
2025-06-30 10:09:23.343	
[2025-06-30T17:09:23.343Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:09:23.343	
[2025-06-30T17:09:23.343Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com
2025-06-30 10:09:23.343	
[2025-06-30T17:09:23.343Z] [nuclei] [Enhanced Two-Pass Scan] Running on https://lodging-source.com
2025-06-30 10:09:23.343	
[2025-06-30T17:09:23.343Z] [nuclei] --- Starting Enhanced Two-Pass Scans on 1 targets ---
2025-06-30 10:09:23.343	
[2025-06-30T17:09:23.343Z] [nuclei] Nuclei binary validated successfully.
2025-06-30 10:09:23.343	
[2025-06-30T17:09:23.342Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-06-30 10:09:23.343	
[INF] PDCP Directory: /root/.pdcp
2025-06-30 10:09:23.342	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-06-30 10:09:23.342	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-06-30 10:09:23.342	
[2025-06-30T17:09:23.342Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-06-30 10:09:23.241	
[2025-06-30T17:09:23.241Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-06-30 10:09:23.241	
[2025-06-30T17:09:23.240Z] [nuclei] Starting enhanced vulnerability scan for lodging-source.com
2025-06-30 10:09:23.240	
[2025-06-30T17:09:23.240Z] [worker] [ul1msZsLiS5] STARTING Nuclei vulnerability scan for lodging-source.com
2025-06-30 10:09:23.240	
[2025-06-30T17:09:23.240Z] [worker] === Running module: nuclei (18/20) ===
2025-06-30 10:09:23.240	
[2025-06-30T17:09:23.240Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:09:23.239	
[2025-06-30T17:09:23.239Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: progress
2025-06-30 10:09:23.237	
[2025-06-30T17:09:23.237Z] [worker] [ul1msZsLiS5] COMPLETED database scan: 0 database issues found
2025-06-30 10:09:23.237	
[artifactStore] Inserted scan_summary artifact: Database port scan completed: 0 exposed services found...
2025-06-30 10:09:23.234	
[2025-06-30T17:09:23.233Z] [dbPortScan] Completed database scan, found 0 exposed services
2025-06-30 10:09:19.010	
[2025-06-30T17:09:19.008Z] [dbPortScan] [1/8] Scanning lodging-source.com:27017...
2025-06-30 10:09:18.999	
[2025-06-30T17:09:18.997Z] [dbPortScan] [1/8] Scanning lodging-source.com:11211...
2025-06-30 10:09:18.984	
[2025-06-30T17:09:18.984Z] [dbPortScan] [1/8] Scanning lodging-source.com:9200...
2025-06-30 10:09:18.980	
[2025-06-30T17:09:18.980Z] [dbPortScan] [1/8] Scanning lodging-source.com:8086...
2025-06-30 10:09:15.117	
[2025-06-30T17:09:15.116Z] [dbPortScan] [1/8] Scanning lodging-source.com:6379...
2025-06-30 10:09:15.109	
[2025-06-30T17:09:15.108Z] [dbPortScan] [1/8] Scanning lodging-source.com:5432...
2025-06-30 10:09:15.105	
[2025-06-30T17:09:15.104Z] [dbPortScan] [1/8] Scanning lodging-source.com:3306...
2025-06-30 10:09:15.100	
[2025-06-30T17:09:15.100Z] [dbPortScan] [1/8] Scanning lodging-source.com:1433...
2025-06-30 10:09:14.983	
[2025-06-30T17:09:14.983Z] [dbPortScan] Validating dependencies...
2025-06-30 10:09:14.983	
[2025-06-30T17:09:14.983Z] [dbPortScan] Starting enhanced database security scan for lodging-source.com
2025-06-30 10:09:14.982	
[2025-06-30T17:09:14.982Z] [worker] [ul1msZsLiS5] STARTING database port scan for lodging-source.com
2025-06-30 10:09:14.982	
[2025-06-30T17:09:14.982Z] [worker] === Running module: db_port_scan (17/20) ===
2025-06-30 10:09:14.982	
[2025-06-30T17:09:14.982Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:09:14.981	
[2025-06-30T17:09:14.981Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: progress
2025-06-30 10:09:14.980	
[2025-06-30T17:09:14.980Z] [worker] [ul1msZsLiS5] COMPLETED typosquat analysis: 0 active typosquats detected
2025-06-30 10:09:14.980	
[2025-06-30T17:09:14.980Z] [worker] Skipping removed typosquatScorer module - functionality merged into dnsTwist
2025-06-30 10:09:14.980	
[2025-06-30T17:09:14.980Z] [worker] [ul1msZsLiS5] STARTING typosquat analysis for lodging-source.com
2025-06-30 10:09:14.980	
[2025-06-30T17:09:14.979Z] [worker] === Running module: typosquat_scorer (16/20) ===
2025-06-30 10:09:14.980	
[2025-06-30T17:09:14.979Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:09:14.978	
[2025-06-30T17:09:14.978Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: progress
2025-06-30 10:09:14.959	
[2025-06-30T17:09:14.959Z] [worker] [ul1msZsLiS5] COMPLETED email bruteforce surface scan: 0 email attack vectors found
2025-06-30 10:09:14.959	
[2025-06-30T17:09:14.959Z] [emailBruteforceSurface] No email services detected
2025-06-30 10:09:14.959	
[2025-06-30T17:09:14.958Z] [emailBruteforceSurface] Nuclei email scan completed: 0 findings
2025-06-30 10:09:14.958	
[2025-06-30T17:09:14.958Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:08:44.933	
[2025-06-30T17:08:44.933Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -list /tmp/nuclei-email-targets-1751303324931.txt -t technologies/microsoft-exchange-server-detect.yaml -t technologies/outlook-web-access-detect.yaml -t technologies/owa-detect.yaml -t network/smtp-detect.yaml -t network/imap-detect.yaml -t network/pop3-detect.yaml -t technologies/exchange-autodiscover.yaml -t technologies/activesync-detect.yaml -t misconfiguration/exchange-server-login.yaml -t misconfiguration/owa-login-portal.yaml -c 6 -timeout 30 -retries 2
2025-06-30 10:08:44.933	
[2025-06-30T17:08:44.933Z] [emailBruteforceSurface] Running Nuclei with 10 email templates against 50 targets
2025-06-30 10:08:44.931	
[2025-06-30T17:08:44.931Z] [emailBruteforceSurface] Generated 408 email service targets
2025-06-30 10:08:44.927	
[2025-06-30T17:08:44.927Z] [emailBruteforceSurface] Starting email bruteforce surface scan for domain="lodging-source.com"
2025-06-30 10:08:44.927	
[2025-06-30T17:08:44.927Z] [worker] [ul1msZsLiS5] STARTING email bruteforce surface scan for lodging-source.com
2025-06-30 10:08:44.927	
[2025-06-30T17:08:44.927Z] [worker] === Running module: email_bruteforce_surface (15/20) ===
2025-06-30 10:08:44.927	
[2025-06-30T17:08:44.927Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:08:44.925	
[2025-06-30T17:08:44.925Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: progress
2025-06-30 10:08:44.906	
[2025-06-30T17:08:44.906Z] [worker] [ul1msZsLiS5] COMPLETED RDP/VPN templates scan: 0 remote access vulnerabilities found
2025-06-30 10:08:44.906	
[2025-06-30T17:08:44.906Z] [rdpVpnTemplates] No RDP/VPN vulnerabilities detected
2025-06-30 10:08:44.906	
[2025-06-30T17:08:44.906Z] [rdpVpnTemplates] Nuclei RDP/VPN scan completed: 0 findings
2025-06-30 10:08:44.906	
[2025-06-30T17:08:44.905Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:08:14.880	
[2025-06-30T17:08:14.880Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -list /tmp/nuclei-rdpvpn-targets-1751303294879.txt -t network/rdp-detect.yaml -t network/rdp-bluekeep-detect.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2018-13379.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2019-5591.yaml -t vulnerabilities/fortinet/fortinet-fortigate-cve-2020-12812.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2019-1579.yaml -t vulnerabilities/paloalto/paloalto-globalprotect-cve-2020-2021.yaml -t vulnerabilities/citrix/citrix-adc-cve-2019-19781.yaml -t vulnerabilities/pulse/pulse-connect-secure-cve-2019-11510.yaml -t technologies/rdp-detect.yaml -t technologies/vpn-detect.yaml -c 6 -timeout 30 -retries 2
2025-06-30 10:08:14.880	
[2025-06-30T17:08:14.880Z] [rdpVpnTemplates] Running Nuclei with 11 RDP/VPN templates against 22 targets
2025-06-30 10:08:14.879	
[2025-06-30T17:08:14.879Z] [rdpVpnTemplates] Generated 22 target URLs for RDP/VPN scanning
2025-06-30 10:08:14.876	
[2025-06-30T17:08:14.876Z] [rdpVpnTemplates] Starting RDP/VPN templates scan for domain="lodging-source.com"
2025-06-30 10:08:14.876	
[2025-06-30T17:08:14.876Z] [worker] [ul1msZsLiS5] STARTING RDP/VPN vulnerability templates for lodging-source.com
2025-06-30 10:08:14.876	
[2025-06-30T17:08:14.876Z] [worker] === Running module: rdp_vpn_templates (14/20) ===
2025-06-30 10:08:14.876	
[2025-06-30T17:08:14.876Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:08:14.869	
[2025-06-30T17:08:14.869Z] [worker] [ul1msZsLiS5] COMPLETED tech stack scan: 0 technologies detected
2025-06-30 10:08:14.869	
[2025-06-30T17:08:14.869Z] [techStackScan] techstack=complete arts=0 time=89454ms
2025-06-30 10:08:14.869	
[artifactStore] Inserted techscan_metrics artifact: Technology scan metrics: 0 technologies, 0 supply chain risk...
2025-06-30 10:08:14.867	
[artifactStore] Inserted sbom_cyclonedx artifact: Software Bill of Materials (CycloneDX 1.5) - 0 components...
2025-06-30 10:08:14.865	
[2025-06-30T17:08:14.864Z] [techStackScan] techstack=nuclei_no_output url="https://maxcdn.bootstrapcdn.com"
2025-06-30 10:08:14.865	
[2025-06-30T17:08:14.864Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:08:14.865	
[2025-06-30T17:08:14.864Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:08:14.826	
[2025-06-30T17:08:14.826Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com/direct//"
2025-06-30 10:08:14.826	
[2025-06-30T17:08:14.826Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:08:14.826	
[2025-06-30T17:08:14.826Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:08:14.794	
[2025-06-30T17:08:14.794Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com//www.youtube.com/player_api"
2025-06-30 10:08:14.794	
[2025-06-30T17:08:14.793Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:08:14.794	
[2025-06-30T17:08:14.793Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:08:06.942	
[2025-06-30T17:08:06.942Z] [worker] [ul1msZsLiS5] COMPLETED accessibility scan: 6 WCAG violations found
2025-06-30 10:08:06.942	
[2025-06-30T17:08:06.941Z] [accessibilityScan] Accessibility scan completed: 6 findings from 4/15 pages in 81500ms
2025-06-30 10:08:06.942	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 4201
2025-06-30 10:08:06.940	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 4201
2025-06-30 10:08:06.939	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 4201
2025-06-30 10:08:06.937	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 4201
2025-06-30 10:08:06.936	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 4201
2025-06-30 10:08:06.935	
[artifactStore] Inserted finding ACCESSIBILITY_VIOLATION for artifact 4201
2025-06-30 10:08:06.932	
[artifactStore] Inserted accessibility_summary artifact: Accessibility scan: 24 violations across 4 pages (8 critical...
2025-06-30 10:08:06.908	
[2025-06-30T17:08:06.906Z] [accessibilityScan] Accessibility analysis complete: 24 violations (8 critical, 16 serious)
2025-06-30 10:08:05.892	
[2025-06-30T17:08:05.891Z] [dynamicBrowser] Page operation completed in 2139ms
2025-06-30 10:08:03.754	
[2025-06-30T17:08:03.752Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/help
2025-06-30 10:08:02.609	
[2025-06-30T17:08:02.609Z] [dynamicBrowser] Page operation completed in 2119ms
2025-06-30 10:08:00.490	
[2025-06-30T17:08:00.490Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/search
2025-06-30 10:07:59.354	
[2025-06-30T17:07:59.352Z] [dynamicBrowser] Page operation completed in 2130ms
2025-06-30 10:07:57.223	
[2025-06-30T17:07:57.222Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/join
2025-06-30 10:07:55.791	
[2025-06-30T17:07:55.791Z] [dynamicBrowser] Page operation completed in 2253ms
2025-06-30 10:07:54.847	
[2025-06-30T17:07:54.846Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://maxcdn.bootstrapcdn.com -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:54.847	
[2025-06-30T17:07:54.846Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:54.843	
[2025-06-30T17:07:54.843Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:54.843	
[2025-06-30T17:07:54.843Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:54.817	
[2025-06-30T17:07:54.815Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/direct// -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:54.817	
[2025-06-30T17:07:54.815Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:54.817	
[2025-06-30T17:07:54.815Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:54.817	
[2025-06-30T17:07:54.815Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:54.783	
[2025-06-30T17:07:54.781Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com//www.youtube.com/player_api -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:54.783	
[2025-06-30T17:07:54.781Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:54.783	
[2025-06-30T17:07:54.780Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:54.783	
[2025-06-30T17:07:54.780Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:53.539	
[2025-06-30T17:07:53.538Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/register
2025-06-30 10:07:52.374	
[2025-06-30T17:07:52.373Z] [dynamicBrowser] Page operation completed in 2133ms
2025-06-30 10:07:50.241	
[2025-06-30T17:07:50.240Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/login
2025-06-30 10:07:49.103	
[2025-06-30T17:07:49.103Z] [dynamicBrowser] Page operation completed in 2119ms
2025-06-30 10:07:46.986	
[2025-06-30T17:07:46.984Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/signup
2025-06-30 10:07:45.848	
[2025-06-30T17:07:45.847Z] [dynamicBrowser] Page operation completed in 2116ms
2025-06-30 10:07:45.769	
[2025-06-30T17:07:45.768Z] [dynamicBrowser] Metrics: browser_rss_mb=156, heap_used_mb=60, pages_open=1
2025-06-30 10:07:43.733	
[2025-06-30T17:07:43.731Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/pricing
2025-06-30 10:07:42.599	
[2025-06-30T17:07:42.598Z] [dynamicBrowser] Page operation completed in 2120ms
2025-06-30 10:07:40.481	
[2025-06-30T17:07:40.478Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/products
2025-06-30 10:07:39.340	
[2025-06-30T17:07:39.339Z] [dynamicBrowser] Page operation completed in 2122ms
2025-06-30 10:07:37.219	
[2025-06-30T17:07:37.217Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/services
2025-06-30 10:07:35.883	
[2025-06-30T17:07:35.875Z] [dynamicBrowser] Page operation completed in 2123ms
2025-06-30 10:07:34.897	
[2025-06-30T17:07:34.897Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com/direct/index.php"
2025-06-30 10:07:34.897	
[2025-06-30T17:07:34.896Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:07:34.896	
[2025-06-30T17:07:34.896Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:34.874	
[2025-06-30T17:07:34.874Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com/home.html"
2025-06-30 10:07:34.874	
[2025-06-30T17:07:34.874Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:07:34.873	
[2025-06-30T17:07:34.873Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:34.832	
[2025-06-30T17:07:34.832Z] [techStackScan] techstack=nuclei_skip url="null" reason="invalid_url"
2025-06-30 10:07:34.832	
[2025-06-30T17:07:34.832Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com/"
2025-06-30 10:07:34.832	
[2025-06-30T17:07:34.832Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:07:34.832	
[2025-06-30T17:07:34.831Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:34.810	
[2025-06-30T17:07:34.808Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://maxcdn.bootstrapcdn.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:34.810	
[2025-06-30T17:07:34.808Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:07:34.810	
[2025-06-30T17:07:34.808Z] [nucleiWrapper] Starting two-pass scan for https://maxcdn.bootstrapcdn.com
2025-06-30 10:07:34.810	
[2025-06-30T17:07:34.808Z] [techStackScan] techstack=nuclei url="https://maxcdn.bootstrapcdn.com"
2025-06-30 10:07:34.810	
[2025-06-30T17:07:34.808Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com/index.html"
2025-06-30 10:07:34.810	
[2025-06-30T17:07:34.808Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:07:34.810	
[2025-06-30T17:07:34.808Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:34.794	
[2025-06-30T17:07:34.794Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/direct// -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:34.794	
[2025-06-30T17:07:34.794Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:07:34.794	
[2025-06-30T17:07:34.794Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com/direct//
2025-06-30 10:07:34.794	
[2025-06-30T17:07:34.793Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct//"
2025-06-30 10:07:34.794	
[2025-06-30T17:07:34.793Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com"
2025-06-30 10:07:34.794	
[2025-06-30T17:07:34.793Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:07:34.794	
[2025-06-30T17:07:34.793Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:34.767	
[2025-06-30T17:07:34.767Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com//www.youtube.com/player_api -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:34.767	
[2025-06-30T17:07:34.766Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:07:34.767	
[2025-06-30T17:07:34.766Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com//www.youtube.com/player_api
2025-06-30 10:07:34.766	
[2025-06-30T17:07:34.766Z] [techStackScan] techstack=nuclei url="https://lodging-source.com//www.youtube.com/player_api"
2025-06-30 10:07:34.766	
[2025-06-30T17:07:34.766Z] [techStackScan] techstack=nuclei_no_output url="https://www.lodging-source.com"
2025-06-30 10:07:34.766	
[2025-06-30T17:07:34.766Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-06-30 10:07:34.766	
[2025-06-30T17:07:34.766Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:33.754	
[2025-06-30T17:07:33.752Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/about
2025-06-30 10:07:32.624	
[2025-06-30T17:07:32.623Z] [dynamicBrowser] Page operation completed in 2138ms
2025-06-30 10:07:30.487	
[2025-06-30T17:07:30.485Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/contact
2025-06-30 10:07:29.346	
[2025-06-30T17:07:29.345Z] [dynamicBrowser] Page operation completed in 7983ms
2025-06-30 10:07:29.345	
[2025-06-30T17:07:29.344Z] [accessibilityScan] Accessibility test complete for https://www.lodging-source.com/: 6 violations, 22 passes
2025-06-30 10:07:21.363	
[2025-06-30T17:07:21.362Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com/
2025-06-30 10:07:20.196	
[2025-06-30T17:07:20.196Z] [dynamicBrowser] Page operation completed in 9056ms
2025-06-30 10:07:20.194	
[2025-06-30T17:07:20.193Z] [accessibilityScan] Accessibility test complete for https://www.lodging-source.com: 6 violations, 22 passes
2025-06-30 10:07:15.767	
[2025-06-30T17:07:15.767Z] [dynamicBrowser] Metrics: browser_rss_mb=185, heap_used_mb=74, pages_open=1
2025-06-30 10:07:14.856	
[2025-06-30T17:07:14.854Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/direct/index.php -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:14.850	
[2025-06-30T17:07:14.850Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:14.850	
[2025-06-30T17:07:14.850Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:14.847	
[2025-06-30T17:07:14.847Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:14.836	
[2025-06-30T17:07:14.834Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/home.html -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:14.836	
[2025-06-30T17:07:14.834Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:14.836	
[2025-06-30T17:07:14.834Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:14.836	
[2025-06-30T17:07:14.834Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:14.783	
[2025-06-30T17:07:14.783Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/ -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:14.783	
[2025-06-30T17:07:14.783Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:14.782	
[2025-06-30T17:07:14.782Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:14.781	
[2025-06-30T17:07:14.780Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:14.773	
[2025-06-30T17:07:14.771Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/index.html -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:14.773	
[2025-06-30T17:07:14.771Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:14.773	
[2025-06-30T17:07:14.771Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:14.773	
[2025-06-30T17:07:14.771Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:14.758	
[2025-06-30T17:07:14.758Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:14.758	
[2025-06-30T17:07:14.758Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:14.758	
[2025-06-30T17:07:14.758Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:14.758	
[2025-06-30T17:07:14.758Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:14.746	
[2025-06-30T17:07:14.742Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://www.lodging-source.com -tags cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:07:14.746	
[2025-06-30T17:07:14.742Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with tags: cve,panel,xss,wordpress,wp-plugin,osint,lfi,rce
2025-06-30 10:07:14.746	
[2025-06-30T17:07:14.742Z] [nucleiWrapper] Detected technologies: none
2025-06-30 10:07:14.746	
[2025-06-30T17:07:14.742Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 1
2025-06-30 10:07:11.140	
[2025-06-30T17:07:11.140Z] [accessibilityScan] Testing accessibility for: https://www.lodging-source.com
2025-06-30 10:07:09.988	
[2025-06-30T17:07:09.988Z] [dynamicBrowser] Page operation completed in 7903ms
2025-06-30 10:07:09.988	
[2025-06-30T17:07:09.985Z] [accessibilityScan] Accessibility test complete for https://lodging-source.com/: 6 violations, 22 passes
2025-06-30 10:07:02.086	
[2025-06-30T17:07:02.085Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com/
2025-06-30 10:07:00.938	
[2025-06-30T17:07:00.938Z] [dynamicBrowser] Page operation completed in 13219ms
2025-06-30 10:07:00.936	
[2025-06-30T17:07:00.936Z] [accessibilityScan] Accessibility test complete for https://lodging-source.com: 6 violations, 22 passes
2025-06-30 10:06:54.760	
[2025-06-30T17:06:54.758Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/home.html -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:06:54.760	
[2025-06-30T17:06:54.758Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:06:54.760	
[2025-06-30T17:06:54.758Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com/home.html
2025-06-30 10:06:54.758	
[2025-06-30T17:06:54.758Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/home.html"
2025-06-30 10:06:54.745	
[2025-06-30T17:06:54.743Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/direct/index.php -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:06:54.745	
[2025-06-30T17:06:54.743Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:06:54.745	
[2025-06-30T17:06:54.743Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com/direct/index.php
2025-06-30 10:06:54.739	
[2025-06-30T17:06:54.739Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/direct/index.php"
2025-06-30 10:06:54.730	
[2025-06-30T17:06:54.730Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/ -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:06:54.727	
[2025-06-30T17:06:54.727Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:06:54.727	
[2025-06-30T17:06:54.727Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com/
2025-06-30 10:06:54.727	
[2025-06-30T17:06:54.727Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/"
2025-06-30 10:06:54.721	
[2025-06-30T17:06:54.720Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/index.html -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:06:54.721	
[2025-06-30T17:06:54.720Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:06:54.721	
[2025-06-30T17:06:54.720Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com/index.html
2025-06-30 10:06:54.721	
[2025-06-30T17:06:54.720Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/index.html"
2025-06-30 10:06:54.718	
[2025-06-30T17:06:54.717Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://www.lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:06:54.718	
[2025-06-30T17:06:54.717Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:06:54.718	
[2025-06-30T17:06:54.717Z] [nucleiWrapper] Starting two-pass scan for https://www.lodging-source.com
2025-06-30 10:06:54.718	
[2025-06-30T17:06:54.717Z] [techStackScan] techstack=nuclei url="https://www.lodging-source.com"
2025-06-30 10:06:54.707	
[2025-06-30T17:06:54.707Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 2 -headless -system-chrome
2025-06-30 10:06:54.707	
[2025-06-30T17:06:54.707Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-30 10:06:54.707	
[2025-06-30T17:06:54.707Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com
2025-06-30 10:06:54.706	
[2025-06-30T17:06:54.706Z] [techStackScan] techstack=nuclei url="https://lodging-source.com"
2025-06-30 10:06:54.704	
[2025-06-30T17:06:54.704Z] [techStackScan] techstack=targets primary=8 thirdParty=2 total=10
2025-06-30 10:06:54.680	
[2025-06-30T17:06:54.679Z] [dynamicBrowser] Page operation completed in 6986ms
2025-06-30 10:06:54.680	
[2025-06-30T17:06:54.679Z] [techStackScan] thirdParty=discovered domain=lodging-source.com origins=2
2025-06-30 10:06:47.720	
[2025-06-30T17:06:47.719Z] [accessibilityScan] Testing accessibility for: https://lodging-source.com
2025-06-30 10:06:47.213	
[2025-06-30T17:06:47.213Z] [dynamicBrowser] Browser launched successfully
2025-06-30 10:06:45.786	
[2025-06-30T17:06:45.786Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-06-30 10:06:45.769	
[2025-06-30T17:06:45.769Z] [techStackScan] buildTargets discovered=6 total=8
2025-06-30 10:06:45.762	
[2025-06-30T17:06:45.761Z] [dynamicBrowser] Launching new browser instance
2025-06-30 10:06:45.761	
[2025-06-30T17:06:45.761Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-30 10:06:45.760	
[2025-06-30T17:06:45.760Z] [dynamicBrowser] Initializing page semaphore with max 1 concurrent pages
2025-06-30 10:06:45.759	
[2025-06-30T17:06:45.759Z] [techStackScan] techstack=nuclei wrapper confirmed available
2025-06-30 10:06:45.759	
[2025-06-30T17:06:45.759Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-06-30 10:06:45.759	
[INF] PDCP Directory: /root/.pdcp
2025-06-30 10:06:45.759	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-06-30 10:06:45.759	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-06-30 10:06:45.759	
[2025-06-30T17:06:45.759Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-06-30 10:06:45.463	
[2025-06-30T17:06:45.462Z] [worker] [ul1msZsLiS5] COMPLETED AbuseIPDB scan: 0 malicious/suspicious IPs found
2025-06-30 10:06:45.463	
[2025-06-30T17:06:45.462Z] [abuseIntelScan] No IP artifacts found for this scan
2025-06-30 10:06:45.463	
[2025-06-30T17:06:45.462Z] [abuseIntelScan] Found 0 IP artifacts for scan ul1msZsLiS5
2025-06-30 10:06:45.462	
[2025-06-30T17:06:45.461Z] [worker] [ul1msZsLiS5] COMPLETED denial-of-wallet scan: 0 cost amplification vulnerabilities found
2025-06-30 10:06:45.462	
[2025-06-30T17:06:45.461Z] [denialWalletScan] Denial-of-wallet scan completed: 0 findings in 4ms
2025-06-30 10:06:45.462	
[2025-06-30T17:06:45.461Z] [denialWalletScan] Filtered to 0 potential cost-amplification endpoints
2025-06-30 10:06:45.462	
[2025-06-30T17:06:45.461Z] [denialWalletScan] Found 6 endpoints from endpoint discovery
2025-06-30 10:06:45.459	
[2025-06-30T17:06:45.459Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=ul1msZsLiS5
2025-06-30 10:06:45.459	
[2025-06-30T17:06:45.459Z] [worker] [ul1msZsLiS5] STARTING AbuseIPDB intelligence scan for IPs
2025-06-30 10:06:45.459	
[2025-06-30T17:06:45.459Z] [worker] === Running module (Phase 2C): abuse_intel_scan ===
2025-06-30 10:06:45.459	
[2025-06-30T17:06:45.459Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:06:45.459	
[2025-06-30T17:06:45.457Z] [denialWalletScan] Starting denial-of-wallet scan for domain="lodging-source.com"
2025-06-30 10:06:45.458	
[2025-06-30T17:06:45.457Z] [worker] [ul1msZsLiS5] STARTING denial-of-wallet vulnerability scan for lodging-source.com
2025-06-30 10:06:45.458	
[2025-06-30T17:06:45.457Z] [worker] === Running module (Phase 2C): denial_wallet_scan ===
2025-06-30 10:06:45.458	
[2025-06-30T17:06:45.457Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:06:45.442	
[2025-06-30T17:06:45.441Z] [accessibilityScan] Starting accessibility scan for domain="lodging-source.com"
2025-06-30 10:06:45.442	
[2025-06-30T17:06:45.441Z] [worker] [ul1msZsLiS5] STARTING accessibility compliance scan for lodging-source.com
2025-06-30 10:06:45.442	
[2025-06-30T17:06:45.441Z] [worker] === Running module (Phase 2C): accessibility_scan ===
2025-06-30 10:06:45.441	
[2025-06-30T17:06:45.440Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:06:45.417	
[2025-06-30T17:06:45.414Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-06-30 10:06:45.417	
[2025-06-30T17:06:45.414Z] [techStackScan] techstack=start domain=lodging-source.com
2025-06-30 10:06:45.417	
[2025-06-30T17:06:45.413Z] [worker] [ul1msZsLiS5] STARTING tech stack scan for lodging-source.com
2025-06-30 10:06:45.417	
[2025-06-30T17:06:45.413Z] [worker] === Running module (Phase 2C): tech_stack_scan ===
2025-06-30 10:06:45.417	
[2025-06-30T17:06:45.411Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:06:45.407	
[2025-06-30T17:06:45.405Z] [worker] [ul1msZsLiS5] COMPLETED endpoint discovery: 6 endpoint collections found
2025-06-30 10:06:45.407	
[2025-06-30T17:06:45.405Z] [endpointDiscovery] ⇢ done – 6 endpoints
2025-06-30 10:06:45.407	
[artifactStore] Inserted discovered_endpoints artifact: Discovered 6 unique endpoints for lodging-source.com...
2025-06-30 10:06:09.816	
[2025-06-30T17:06:09.814Z] [endpointDiscovery] +crawl_link /direct// (-)
2025-06-30 10:06:08.600	
[2025-06-30T17:06:08.598Z] [endpointDiscovery] +js_analysis //www.youtube.com/player_api (-)
2025-06-30 10:06:08.276	
[2025-06-30T17:06:08.276Z] [endpointDiscovery] +crawl_link /home.html (-)
2025-06-30 10:06:08.276	
[2025-06-30T17:06:08.276Z] [endpointDiscovery] +crawl_link /direct/index.php (-)
2025-06-30 10:06:08.276	
[2025-06-30T17:06:08.276Z] [endpointDiscovery] +crawl_link / (-)
2025-06-30 10:06:08.275	
[2025-06-30T17:06:08.275Z] [endpointDiscovery] +crawl_link /index.html (-)
2025-06-30 10:06:07.837	
[2025-06-30T17:06:07.836Z] [endpointDiscovery] ⇢ start lodging-source.com
2025-06-30 10:06:07.836	
[2025-06-30T17:06:07.836Z] [worker] [ul1msZsLiS5] STARTING endpoint discovery for lodging-source.com
2025-06-30 10:06:07.836	
[2025-06-30T17:06:07.835Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:06:07.827	
[2025-06-30T17:06:07.827Z] [worker] === Running endpoint discovery ===
2025-06-30 10:06:07.827	
[2025-06-30T17:06:07.827Z] [worker] [ul1msZsLiS5] COMPLETED DNS Twist: 5 typo-domains found
2025-06-30 10:06:07.827	
[2025-06-30T17:06:07.827Z] [dnstwist] Scan completed – 5 domains analysed
2025-06-30 10:06:07.827	
[artifactStore] Inserted finding TYPOSQUAT_REDIRECT for artifact 4199
2025-06-30 10:06:07.824	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgings...
2025-06-30 10:04:02.599	
[2025-06-30T17:04:02.599Z] [worker] [ul1msZsLiS5] COMPLETED document exposure: 0 discoveries
2025-06-30 10:04:02.599	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-06-30 10:04:02.597	
[2025-06-30T17:04:02.597Z] [documentExposure] Completed: 0 files found, 10 Serper calls (~$0.030)
2025-06-30 10:04:02.597	
[2025-06-30T17:04:02.597Z] [documentExposure] Reached search query limit (10) - stopping to control costs
2025-06-30 10:04:01.096	
[2025-06-30T17:04:01.095Z] [documentExposure] Serper returned 0 results for query 10
2025-06-30 10:03:59.628	
[2025-06-30T17:03:59.627Z] [documentExposure] Serper API call 10: ""Lodging Source" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-06-30 10:03:56.028	
[2025-06-30T17:03:56.028Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-30 10:03:53.925	
[2025-06-30T17:03:53.925Z] [documentExposure] Serper returned 5 results for query 9
2025-06-30 10:03:53.759	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 4197
2025-06-30 10:03:53.758	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgin.g...
2025-06-30 10:03:53.539	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 4196
2025-06-30 10:03:53.538	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-30 10:03:53.445	
[2025-06-30T17:03:53.444Z] [documentExposure] Serper API call 9: ""Lodging Source" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-06-30 10:03:52.918	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 4195
2025-06-30 10:03:52.917	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-30 10:03:52.491	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 4194
2025-06-30 10:03:52.489	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-30 10:03:52.180	
[2025-06-30T17:03:52.180Z] [dnstwist] Batch 1/1
2025-06-30 10:03:52.180	
[2025-06-30T17:03:52.179Z] [dnstwist] Found 5 registered typosquat candidates to analyze
2025-06-30 10:03:51.787	
[2025-06-30T17:03:51.787Z] [documentExposure] Serper returned 5 results for query 8
2025-06-30 10:03:50.142	
[2025-06-30T17:03:50.141Z] [documentExposure] Serper API call 8: ""Lodging Source" (intitle:"index of" OR intitle:"directory listing")"
2025-06-30 10:03:48.641	
[2025-06-30T17:03:48.641Z] [documentExposure] Serper returned 20 results for query 7
2025-06-30 10:03:47.511	
[2025-06-30T17:03:47.509Z] [documentExposure] Serper API call 7: ""Lodging Source" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-06-30 10:03:45.262	
[2025-06-30T17:03:45.261Z] [documentExposure] Serper returned 1 results for query 6
2025-06-30 10:03:44.552	
[2025-06-30T17:03:44.551Z] [documentExposure] Serper API call 6: ""Lodging Source" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-06-30 10:03:43.049	
[2025-06-30T17:03:43.048Z] [documentExposure] Serper returned 2 results for query 5
2025-06-30 10:03:42.151	
[2025-06-30T17:03:42.147Z] [documentExposure] Serper API call 5: ""Lodging Source" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-06-30 10:03:40.646	
[2025-06-30T17:03:40.646Z] [documentExposure] Serper returned 10 results for query 4
2025-06-30 10:03:39.976	
[2025-06-30T17:03:39.975Z] [documentExposure] Serper API call 4: ""Lodging Source" ("database" OR "backup" OR "dump") filetype:sql"
2025-06-30 10:03:38.473	
[2025-06-30T17:03:38.473Z] [documentExposure] Serper returned 10 results for query 3
2025-06-30 10:03:37.763	
[2025-06-30T17:03:37.762Z] [documentExposure] Serper API call 3: ""Lodging Source" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-06-30 10:03:35.232	
[2025-06-30T17:03:35.231Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-30 10:03:32.890	
[2025-06-30T17:03:32.890Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-30 10:03:31.876	
[2025-06-30T17:03:31.875Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-30 10:03:31.209	
[2025-06-30T17:03:31.209Z] [documentExposure] process error: Request failed with status code 403
2025-06-30 10:03:30.402	
[2025-06-30T17:03:30.402Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-30 10:03:29.765	
[2025-06-30T17:03:29.765Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-30 10:03:28.580	
[2025-06-30T17:03:28.580Z] [documentExposure] process error: timeout of 30000ms exceeded
2025-06-30 10:03:05.797	
[2025-06-30T17:03:05.796Z] [worker] [ul1msZsLiS5] COMPLETED TLS scan: 3 TLS issues found
2025-06-30 10:03:05.796	
[2025-06-30T17:03:05.795Z] [tlsScan] Scan complete. Hosts: lodging-source.com, www.lodging-source.com. Findings: 3
2025-06-30 10:03:05.795	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 3 issue(s) found...
2025-06-30 10:03:05.794	
[artifactStore] Inserted finding MISSING_TLS_CERTIFICATE for artifact 4192
2025-06-30 10:03:05.793	
[artifactStore] Inserted tls_no_certificate artifact: lodging-source.com - no valid SSL/TLS certificate on any hos...
2025-06-30 10:03:05.790	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 4191
2025-06-30 10:03:05.788	
[artifactStore] Inserted tls_configuration artifact: www.lodging-source.com - Incomplete SSL certificate chain (m...
2025-06-30 10:03:05.765	
[2025-06-30T17:03:05.765Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-30 10:03:05.490	
[2025-06-30T17:03:05.490Z] [tlsScan] Cross-validation complete for www.lodging-source.com: 0 additional findings
2025-06-30 10:02:54.832	
[2025-06-30T17:02:54.831Z] [tlsScan] Python validator: www.lodging-source.com - INVALID
2025-06-30 10:02:54.584	
[2025-06-30T17:02:54.584Z] [tlsScan] Scanning www.lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-30 10:02:54.584	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 4190
2025-06-30 10:02:54.581	
[artifactStore] Inserted tls_configuration artifact: lodging-source.com - Incomplete SSL certificate chain (missi...
2025-06-30 10:02:54.577	
[2025-06-30T17:02:54.577Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-06-30 10:02:54.308	
[2025-06-30T17:02:54.307Z] [tlsScan] Cross-validation complete for lodging-source.com: 0 additional findings
2025-06-30 10:02:48.547	
[2025-06-30T17:02:48.547Z] [documentExposure] Serper returned 20 results for query 2
2025-06-30 10:02:47.774	
[2025-06-30T17:02:47.773Z] [documentExposure] Serper API call 2: ""Lodging Source" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-06-30 10:02:46.271	
[2025-06-30T17:02:46.271Z] [documentExposure] Serper returned 0 results for query 1
2025-06-30 10:02:45.499	
[2025-06-30T17:02:45.499Z] [documentExposure] Serper API call 1: "site:lodging-source.com (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-06-30 10:02:44.703	
[2025-06-30T17:02:44.702Z] [worker] [ul1msZsLiS5] COMPLETED Shodan infrastructure scan: 4 services found
2025-06-30 10:02:44.702	
[2025-06-30T17:02:44.702Z] [Shodan] Done — 4 rows persisted, 1 API calls used for 1 targets
2025-06-30 10:02:44.702	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 4 items...
2025-06-30 10:02:44.701	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 4188
2025-06-30 10:02:44.700	
[artifactStore] Inserted shodan_service artifact: 74.208.42.246:443 Apache httpd 2.4.62...
2025-06-30 10:02:44.696	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 4187
2025-06-30 10:02:44.693	
[artifactStore] Inserted shodan_service artifact: 70.35.206.233:443 Apache httpd 2.4.62...
2025-06-30 10:02:44.690	
[2025-06-30T17:02:44.689Z] [Shodan] API call 1 - search query
2025-06-30 10:02:43.860	
[2025-06-30T17:02:43.860Z] [tlsScan] Python validator: lodging-source.com - INVALID
2025-06-30 10:02:43.830	
[2025-06-30T17:02:43.830Z] [worker] [ul1msZsLiS5] COMPLETED email security scan: 1 email issues found
2025-06-30 10:02:43.830	
[2025-06-30T17:02:43.830Z] [spfDmarc] Completed email security scan, found 1 issues
2025-06-30 10:02:43.829	
[artifactStore] Inserted bimi_missing artifact: BIMI record not found...
2025-06-30 10:02:43.792	
[2025-06-30T17:02:43.790Z] [spfDmarc] Checking for BIMI record...
2025-06-30 10:02:43.790	
[2025-06-30T17:02:43.790Z] [spfDmarc] Found DKIM record with selector: default
2025-06-30 10:02:43.753	
[2025-06-30T17:02:43.753Z] [spfDmarc] Probing for common DKIM selectors...
2025-06-30 10:02:43.572	
[2025-06-30T17:02:43.570Z] [spfDmarc] Performing recursive SPF check...
2025-06-30 10:02:43.572	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 4185
2025-06-30 10:02:43.565	
[artifactStore] Inserted dmarc_weak artifact: DMARC policy is not enforcing...
2025-06-30 10:02:43.454	
[2025-06-30T17:02:43.453Z] [tlsScan] Scanning lodging-source.com with hybrid validation (sslscan + Python)...
2025-06-30 10:02:43.453	

2025-06-30 10:02:43.453	
OpenSSL 3.5.0 8 Apr 2025
2025-06-30 10:02:43.453	
[2025-06-30T17:02:43.452Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-06-30 10:02:43.438	
[2025-06-30T17:02:43.436Z] [spfDmarc] Checking DMARC record...
2025-06-30 10:02:43.438	
[2025-06-30T17:02:43.436Z] [spfDmarc] Starting email security scan for lodging-source.com
2025-06-30 10:02:43.438	
[2025-06-30T17:02:43.436Z] [worker] [ul1msZsLiS5] STARTING SPF/DMARC email security scan for lodging-source.com
2025-06-30 10:02:43.438	
[2025-06-30T17:02:43.436Z] [worker] === Running module (Phase 2A): spf_dmarc ===
2025-06-30 10:02:43.438	
[2025-06-30T17:02:43.436Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:02:43.438	
[2025-06-30T17:02:43.435Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-06-30 10:02:43.435	
[2025-06-30T17:02:43.434Z] [worker] [ul1msZsLiS5] STARTING document exposure scan for Lodging Source
2025-06-30 10:02:43.435	
[2025-06-30T17:02:43.434Z] [worker] === Running module (Phase 2A): document_exposure ===
2025-06-30 10:02:43.435	
[2025-06-30T17:02:43.434Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:02:43.424	
[2025-06-30T17:02:43.422Z] [worker] [ul1msZsLiS5] STARTING TLS security scan for lodging-source.com
2025-06-30 10:02:43.424	
[2025-06-30T17:02:43.422Z] [worker] === Running module (Phase 2A): tls_scan ===
2025-06-30 10:02:43.419	
[2025-06-30T17:02:43.419Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:02:43.416	
[2025-06-30T17:02:43.416Z] [dnstwist] WHOIS enrichment disabled (saves ~$0.30-0.75 per scan) - set ENABLE_WHOIS_ENRICHMENT=true to enable
2025-06-30 10:02:43.415	
[2025-06-30T17:02:43.415Z] [dnstwist] Starting typosquat scan for lodging-source.com
2025-06-30 10:02:43.415	
[2025-06-30T17:02:43.415Z] [worker] [ul1msZsLiS5] STARTING DNS Twist scan for lodging-source.com
2025-06-30 10:02:43.415	
[2025-06-30T17:02:43.414Z] [worker] === Running module (Phase 2A): dns_twist ===
2025-06-30 10:02:43.415	
[2025-06-30T17:02:43.414Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:02:43.354	
[2025-06-30T17:02:43.353Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-06-30 10:02:43.353	
[2025-06-30T17:02:43.353Z] [worker] [ul1msZsLiS5] COMPLETED Censys platform scan: 0 services found
2025-06-30 10:02:43.353	
[ul1msZsLiS5] Censys scan skipped - CENSYS_PAT and CENSYS_ORG_ID not configured (saves ~$2-10 per scan)
2025-06-30 10:02:43.352	
[2025-06-30T17:02:43.352Z] [worker] [ul1msZsLiS5] STARTING Censys platform scan for lodging-source.com
2025-06-30 10:02:43.352	
[2025-06-30T17:02:43.352Z] [worker] === Running module (Phase 2A): censys ===
2025-06-30 10:02:43.352	
[2025-06-30T17:02:43.352Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:02:43.351	
[2025-06-30T17:02:43.351Z] [Shodan] Start scan for lodging-source.com
2025-06-30 10:02:43.351	
[2025-06-30T17:02:43.351Z] [worker] [ul1msZsLiS5] STARTING Shodan scan for lodging-source.com
2025-06-30 10:02:43.351	
[2025-06-30T17:02:43.351Z] [worker] === Running module (Phase 2A): shodan ===
2025-06-30 10:02:43.351	
[2025-06-30T17:02:43.351Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:02:43.346	
[2025-06-30T17:02:43.346Z] [worker] [ul1msZsLiS5] COMPLETED SpiderFoot discovery: 7 targets found
2025-06-30 10:02:43.346	
[2025-06-30T17:02:43.346Z] [SpiderFoot] ✔️ Completed – 7 artifacts
2025-06-30 10:02:43.346	
[artifactStore] Inserted scan_summary artifact: SpiderFoot scan completed: 7 artifacts...
2025-06-30 10:02:43.344	
[artifactStore] Inserted intel artifact: GoDaddy.com, LLC...
2025-06-30 10:02:43.343	
Registry Domain ID: 1...
2025-06-30 10:02:43.343	
[artifactStore] Inserted intel artifact:    Domain Name: LODGING-SOURCE.COM
2025-06-30 10:02:43.340	
[artifactStore] Inserted intel artifact: 74.208.42.246...
2025-06-30 10:02:43.339	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-30 10:02:43.338	
[artifactStore] Inserted intel artifact: support@lodging-source.com...
2025-06-30 10:02:43.337	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-30 10:02:43.336	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-30 10:02:43.332	
[2025-06-30T17:02:43.332Z] [SpiderFoot] Raw output size: 8032 bytes
2025-06-30 10:02:36.719	
[2025-06-30T17:02:36.718Z] [worker] [ul1msZsLiS5] COMPLETED Breach Directory probe: 3 breach findings
2025-06-30 10:02:36.718	
[2025-06-30T17:02:36.718Z] [breachDirectoryProbe] Breach probe completed: 3 findings in 1516ms
2025-06-30 10:02:36.718	
[artifactStore] Inserted finding EMAIL_EXPOSURE for artifact 4176
2025-06-30 10:02:36.716	
[artifactStore] Inserted finding PASSWORD_BREACH for artifact 4176
2025-06-30 10:02:36.714	
[artifactStore] Inserted finding INFOSTEALER_BREACH for artifact 4176
2025-06-30 10:02:36.710	
[artifactStore] Inserted breach_directory_summary artifact: Breach probe: 63 total breached accounts (BD: 0, LC: 63) for...
2025-06-30 10:02:36.704	
[2025-06-30T17:02:36.703Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=63, Total=63
2025-06-30 10:02:36.702	
[2025-06-30T17:02:36.701Z] [breachDirectoryProbe] LeakCheck response for lodging-source.com: 63 breached accounts, quota remaining: 999999
2025-06-30 10:02:36.371	
[2025-06-30T17:02:36.371Z] [breachDirectoryProbe] Querying LeakCheck for domain: lodging-source.com
2025-06-30 10:02:36.018	
[2025-06-30T17:02:36.017Z] [breachDirectoryProbe] Breach Directory response for lodging-source.com: 0 breached accounts
2025-06-30 10:02:35.203	
[2025-06-30T17:02:35.202Z] [breachDirectoryProbe] Querying Breach Directory for domain: lodging-source.com
2025-06-30 10:02:35.202	
[2025-06-30T17:02:35.202Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="lodging-source.com" (BreachDirectory + LeakCheck)
2025-06-30 10:02:35.202	
[2025-06-30T17:02:35.201Z] [worker] [ul1msZsLiS5] STARTING Breach Directory intelligence probe for lodging-source.com
2025-06-30 10:02:35.200	
[2025-06-30T17:02:35.200Z] [worker] === Running module (Phase 1): breach_directory_probe ===
2025-06-30 10:02:35.200	
[2025-06-30T17:02:35.200Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:02:35.187	
[2025-06-30T17:02:35.186Z] [SpiderFoot] Command: python3 /opt/spiderfoot/sf.py -q -s lodging-source.com -m sfp_crtsh,sfp_sublist3r,sfp_chaos,sfp_r7_dns,sfp_haveibeenpwnd,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei,sfp_whois,sfp_dnsresolve -o json
2025-06-30 10:02:35.184	
[2025-06-30T17:02:35.183Z] [SpiderFoot] API keys: HIBP ✅, Chaos ✅ (Shodan/Censys handled by dedicated modules)
2025-06-30 10:02:35.180	
[2025-06-30T17:02:35.180Z] [SpiderFoot] Starting scan for lodging-source.com (scanId=ul1msZsLiS5)
2025-06-30 10:02:35.179	
[2025-06-30T17:02:35.179Z] [worker] [ul1msZsLiS5] STARTING SpiderFoot discovery for lodging-source.com
2025-06-30 10:02:35.179	
[2025-06-30T17:02:35.179Z] [worker] === Running module (Phase 1): spiderfoot ===
2025-06-30 10:02:35.179	
[2025-06-30T17:02:35.179Z] [worker] [updateScanMasterStatus] Updated scan ul1msZsLiS5 with: status, current_module, progress
2025-06-30 10:02:35.169	
[queue] Updated job ul1msZsLiS5 status: processing - Comprehensive security discovery in progress...
2025-06-30 10:02:35.003	
[2025-06-30T17:02:35.002Z] [worker] Processing comprehensive security scan for Lodging Source (lodging-source.com)
2025-06-30 10:02:35.003	
[2025-06-30T17:02:35.002Z] [worker] ✅ JOB PICKED UP: Processing scan job ul1msZsLiS5 for Lodging Source (lodging-source.com)
2025-06-30 10:02:35.003	
[2025-06-30T17:02:35.001Z] [worker] Processing scan job: ul1msZsLiS5
2025-06-30 10:02:35.003	
}
2025-06-30 10:02:35.003	
createdAt: '2025-06-30T17:02:33.603Z'
2025-06-30 10:02:35.003	
originalDomain: 'lodging-source.com',
2025-06-30 10:02:35.003	
domain: 'lodging-source.com',
2025-06-30 10:02:35.003	
companyName: 'Lodging Source',
2025-06-30 10:02:35.003	
id: 'ul1msZsLiS5',
2025-06-30 10:02:35.003	
[queue] Parsed job: {
2025-06-30 10:02:35.001	
[queue] Job string to parse: {"id":"ul1msZsLiS5","companyName":"Lodging Source","domain":"lodging-source.com","originalDomain":"lodging-source.com","createdAt":"2025-06-30T17:02:33.603Z"}
2025-06-30 10:02:35.001	
} Type: object
2025-06-30 10:02:35.001	
createdAt: '2025-06-30T17:02:33.603Z'
2025-06-30 10:02:35.001	
originalDomain: 'lodging-source.com',
2025-06-30 10:02:35.001	
domain: 'lodging-source.com',
2025-06-30 10:02:35.001	
companyName: 'Lodging Source',
2025-06-30 10:02:35.001	
id: 'ul1msZsLiS5',
2025-06-30 10:02:35.001	
[queue] Raw job data from Redis: {
2025-06-30 10:02:34.402	
{
  "level": 30,
  "time": 1751302954402,
  "pid": 660,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "res": {
    "statusCode": 200
  },
  "responseTime": 803.979056000011,
  "msg": "request completed"
}
2025-06-30 10:02:34.399	
[2025-06-30T17:02:34.398Z] [api] ✅ Successfully created scan job ul1msZsLiS5 for Lodging Source
2025-06-30 10:02:34.399	
[queue] enqueued ul1msZsLiS5