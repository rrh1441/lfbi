		2025-07-01 14:14:54.319	
[2025-07-01T21:14:54.318Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Lodging Source: 13 verified findings, 23 artifacts across 13 security modules
2025-07-01 14:14:54.319	
[queue] Updated job ysVOIMB4fiX status: done - Comprehensive security scan completed - 13 verified findings across 13 security modules. Findings ready for processing.
2025-07-01 14:14:53.860	
[2025-07-01T21:14:53.859Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-07-01 14:14:53.856	
[2025-07-01T21:14:53.856Z] [worker] [processScan] Counted 23 artifacts for scan ysVOIMB4fiX
2025-07-01 14:14:53.855	
[2025-07-01T21:14:53.854Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: progress
2025-07-01 14:14:53.853	
[2025-07-01T21:14:53.853Z] [worker] [ysVOIMB4fiX] COMPLETED secret detection: 0 secrets found
2025-07-01 14:14:53.853	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-07-01 14:14:53.851	
[2025-07-01T21:14:53.850Z] [trufflehog] Finished secret scan for lodging-source.com Total secrets found: 0
2025-07-01 14:14:53.850	
[2025-07-01T21:14:53.850Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-ysVOIMB4fiX.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-ysVOIMB4fiX.json'
2025-07-01 14:14:53.850	
[2025-07-01T21:14:53.850Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-ysVOIMB4fiX.json
2025-07-01 14:14:53.850	
[2025-07-01T21:14:53.850Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-07-01 14:14:53.850	
[2025-07-01T21:14:53.850Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-07-01 14:14:53.850	
[2025-07-01T21:14:53.850Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-ysVOIMB4fiX.json'
2025-07-01 14:14:53.850	
[2025-07-01T21:14:53.849Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-ysVOIMB4fiX.json
2025-07-01 14:14:53.850	
[2025-07-01T21:14:53.849Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-07-01 14:14:50.754	
[2025-07-01T21:14:50.754Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/main.js
2025-07-01 14:14:47.424	
[2025-07-01T21:14:47.424Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/bundle.js
2025-07-01 14:14:46.542	
[2025-07-01T21:14:46.541Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-07-01 14:14:46.541	
[2025-07-01T21:14:46.541Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-07-01 14:14:46.541	
[2025-07-01T21:14:46.541Z] [trufflehog] Starting targeted secret scan for domain: lodging-source.com
2025-07-01 14:14:46.541	
[2025-07-01T21:14:46.541Z] [worker] [ysVOIMB4fiX] STARTING TruffleHog secret detection for lodging-source.com
2025-07-01 14:14:46.541	
[2025-07-01T21:14:46.541Z] [worker] === Running module: trufflehog (13/13) ===
2025-07-01 14:14:46.541	
[2025-07-01T21:14:46.541Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:14:46.529	
[2025-07-01T21:14:46.529Z] [worker] [ysVOIMB4fiX] COMPLETED tech stack scan: 0 technologies detected
2025-07-01 14:14:46.529	
[2025-07-01T21:14:46.529Z] [techStackScan] techstack=complete arts=0 time=48071ms
2025-07-01 14:14:46.529	
[artifactStore] Inserted techscan_metrics artifact: Technology scan metrics: 0 technologies, 0 supply chain risk...
2025-07-01 14:14:46.527	
[artifactStore] Inserted sbom_cyclonedx artifact: Software Bill of Materials (CycloneDX 1.5) - 0 components...
2025-07-01 14:14:46.508	
[2025-07-01T21:14:46.508Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com/home.html"
2025-07-01 14:14:46.508	
[2025-07-01T21:14:46.508Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-07-01 14:14:46.508	
[2025-07-01T21:14:46.508Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:46.501	
[2025-07-01T21:14:46.500Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:46.494	
[2025-07-01T21:14:46.494Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com/index.html"
2025-07-01 14:14:46.494	
[2025-07-01T21:14:46.494Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-07-01 14:14:46.494	
[2025-07-01T21:14:46.494Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:46.487	
[2025-07-01T21:14:46.487Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:46.478	
[2025-07-01T21:14:46.478Z] [techStackScan] techstack=nuclei_no_output url="https://www.lodging-source.com"
2025-07-01 14:14:46.478	
[2025-07-01T21:14:46.478Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-07-01 14:14:46.478	
[2025-07-01T21:14:46.477Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:46.473	
[2025-07-01T21:14:46.473Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com/"
2025-07-01 14:14:46.473	
[2025-07-01T21:14:46.472Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-07-01 14:14:46.473	
[2025-07-01T21:14:46.472Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:46.472	
[2025-07-01T21:14:46.472Z] [techStackScan] techstack=nuclei_no_output url="https://lodging-source.com"
2025-07-01 14:14:46.472	
[2025-07-01T21:14:46.472Z] [nucleiWrapper] Two-pass scan completed: 0 total findings (baseline: 0, common+tech: 0)
2025-07-01 14:14:46.472	
[2025-07-01T21:14:46.472Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:46.471	
[2025-07-01T21:14:46.470Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:46.465	
[2025-07-01T21:14:46.465Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:46.464	
[2025-07-01T21:14:46.464Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:26.500	
[2025-07-01T21:14:26.500Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:26.500	
[2025-07-01T21:14:26.500Z] [nucleiWrapper] Using headless timeout: 90000ms
2025-07-01 14:14:26.488	
[2025-07-01T21:14:26.487Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/home.html -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 48 -timeout 20 -retries 2 -headless -system-chrome
2025-07-01 14:14:26.487	
[2025-07-01T21:14:26.487Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-01 14:14:26.487	
[2025-07-01T21:14:26.487Z] [nucleiWrapper] Detected technologies: none
2025-07-01 14:14:26.487	
[2025-07-01T21:14:26.487Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:26.487	
[2025-07-01T21:14:26.487Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:26.487	
[2025-07-01T21:14:26.487Z] [nucleiWrapper] Using headless timeout: 90000ms
2025-07-01 14:14:26.471	
[2025-07-01T21:14:26.471Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/index.html -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 48 -timeout 20 -retries 2 -headless -system-chrome
2025-07-01 14:14:26.471	
[2025-07-01T21:14:26.471Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-01 14:14:26.471	
[2025-07-01T21:14:26.470Z] [nucleiWrapper] Detected technologies: none
2025-07-01 14:14:26.470	
[2025-07-01T21:14:26.470Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:26.470	
[2025-07-01T21:14:26.469Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:26.469	
[2025-07-01T21:14:26.469Z] [nucleiWrapper] Using headless timeout: 90000ms
2025-07-01 14:14:26.465	
[2025-07-01T21:14:26.465Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://www.lodging-source.com -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 48 -timeout 20 -retries 2 -headless -system-chrome
2025-07-01 14:14:26.465	
[2025-07-01T21:14:26.465Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-01 14:14:26.465	
[2025-07-01T21:14:26.465Z] [nucleiWrapper] Detected technologies: none
2025-07-01 14:14:26.465	
[2025-07-01T21:14:26.465Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:26.465	
[2025-07-01T21:14:26.465Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:26.465	
[2025-07-01T21:14:26.465Z] [nucleiWrapper] Using headless timeout: 90000ms
2025-07-01 14:14:26.462	
[2025-07-01T21:14:26.462Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 48 -timeout 20 -retries 2 -headless -system-chrome
2025-07-01 14:14:26.462	
[2025-07-01T21:14:26.462Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-01 14:14:26.462	
[2025-07-01T21:14:26.462Z] [nucleiWrapper] Detected technologies: none
2025-07-01 14:14:26.462	
[2025-07-01T21:14:26.461Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:26.461	
[2025-07-01T21:14:26.460Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:26.461	
[2025-07-01T21:14:26.460Z] [nucleiWrapper] Using headless timeout: 90000ms
2025-07-01 14:14:26.456	
[2025-07-01T21:14:26.455Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/ -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 48 -timeout 20 -retries 2 -headless -system-chrome
2025-07-01 14:14:26.456	
[2025-07-01T21:14:26.455Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-01 14:14:26.456	
[2025-07-01T21:14:26.455Z] [nucleiWrapper] Detected technologies: none
2025-07-01 14:14:26.456	
[2025-07-01T21:14:26.454Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:14:26.427	
[2025-07-01T21:14:26.427Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:26.416	
[2025-07-01T21:14:26.416Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:26.416	
[2025-07-01T21:14:26.415Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:26.416	
[2025-07-01T21:14:26.415Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:26.416	
[2025-07-01T21:14:26.415Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-01 14:14:08.533	
[2025-07-01T21:14:08.533Z] [worker] [ysVOIMB4fiX] COMPLETED accessibility scan: 0 WCAG violations found
2025-07-01 14:14:08.533	
[artifactStore] Inserted accessibility_scan_skipped artifact: Accessibility scan skipped: No changes detected since last s...
2025-07-01 14:14:08.530	
[2025-07-01T21:14:08.530Z] [accessibilityScan] accessibility=skipped domain="lodging-source.com" reason="no_changes_detected"
2025-07-01 14:14:08.530	
[2025-07-01T21:14:08.530Z] [accessibilityScan] accessibility=no_change_detected domain="lodging-source.com" pages=5
2025-07-01 14:14:08.377	
[2025-07-01T21:14:08.375Z] [dynamicBrowser] Page operation completed in 308ms
2025-07-01 14:14:07.759	
[2025-07-01T21:14:07.758Z] [dynamicBrowser] Page operation completed in 1928ms
2025-07-01 14:14:06.426	
[2025-07-01T21:14:06.426Z] [techStackScan] techstack=nuclei_skip url="null" reason="invalid_url"
2025-07-01 14:14:06.426	
[2025-07-01T21:14:06.426Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:06.426	
[2025-07-01T21:14:06.426Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-01 14:14:06.413	
[2025-07-01T21:14:06.412Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/home.html -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 48 -timeout 20 -retries 2
2025-07-01 14:14:06.413	
[2025-07-01T21:14:06.412Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-01 14:14:06.413	
[2025-07-01T21:14:06.412Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com/home.html
2025-07-01 14:14:06.408	
[2025-07-01T21:14:06.408Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/home.html"
2025-07-01 14:14:06.408	
[2025-07-01T21:14:06.407Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:06.407	
[2025-07-01T21:14:06.407Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-01 14:14:06.398	
[2025-07-01T21:14:06.396Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/ -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 48 -timeout 20 -retries 2
2025-07-01 14:14:06.398	
[2025-07-01T21:14:06.396Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-01 14:14:06.398	
[2025-07-01T21:14:06.396Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com/
2025-07-01 14:14:06.398	
[2025-07-01T21:14:06.396Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/"
2025-07-01 14:14:06.398	
[2025-07-01T21:14:06.396Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:06.398	
[2025-07-01T21:14:06.395Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-01 14:14:06.385	
[2025-07-01T21:14:06.385Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com/index.html -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 48 -timeout 20 -retries 2
2025-07-01 14:14:06.385	
[2025-07-01T21:14:06.385Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-01 14:14:06.385	
[2025-07-01T21:14:06.385Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com/index.html
2025-07-01 14:14:06.385	
[2025-07-01T21:14:06.385Z] [techStackScan] techstack=nuclei url="https://lodging-source.com/index.html"
2025-07-01 14:14:06.385	
[2025-07-01T21:14:06.384Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:06.385	
[2025-07-01T21:14:06.384Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-01 14:14:06.374	
[2025-07-01T21:14:06.373Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://www.lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 48 -timeout 20 -retries 2
2025-07-01 14:14:06.374	
[2025-07-01T21:14:06.373Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-01 14:14:06.374	
[2025-07-01T21:14:06.373Z] [nucleiWrapper] Starting two-pass scan for https://www.lodging-source.com
2025-07-01 14:14:06.374	
[2025-07-01T21:14:06.373Z] [techStackScan] techstack=nuclei url="https://www.lodging-source.com"
2025-07-01 14:14:06.374	
[2025-07-01T21:14:06.373Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-01 14:14:06.374	
[2025-07-01T21:14:06.373Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-01 14:14:06.369	
[2025-07-01T21:14:06.368Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 48 -timeout 20 -retries 2
2025-07-01 14:14:06.369	
[2025-07-01T21:14:06.368Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-01 14:14:06.369	
[2025-07-01T21:14:06.368Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com
2025-07-01 14:14:06.368	
[2025-07-01T21:14:06.368Z] [techStackScan] techstack=nuclei url="https://lodging-source.com"
2025-07-01 14:14:06.368	
[2025-07-01T21:14:06.367Z] [techStackScan] techstack=bypass_nuclei targets=[https://lodging-source.com/direct/index.php, https://lodging-source.com//www.youtube.com/player_api, https://lodging-source.com/direct//, https://maxcdn.bootstrapcdn.com] (~2min time savings by skipping expensive non-HTML assets)
2025-07-01 14:14:06.367	
[2025-07-01T21:14:06.366Z] [techStackScan] techstack=targets primary=8 thirdParty=2 total=10 html=6 finalHtml=6 nonHtml=4 skipped=0
2025-07-01 14:14:06.347	
[2025-07-01T21:14:06.347Z] [dynamicBrowser] Page operation completed in 5919ms
2025-07-01 14:14:06.347	
[2025-07-01T21:14:06.346Z] [techStackScan] thirdParty=discovered domain=lodging-source.com total=2 (html=1, nonHtml=1)
2025-07-01 14:14:05.735	
[2025-07-01T21:14:05.734Z] [dynamicBrowser] Page script error: undefined
2025-07-01 14:14:05.522	
[2025-07-01T21:14:05.521Z] [dynamicBrowser] Page operation completed in 1319ms
2025-07-01 14:14:03.599	
[2025-07-01T21:14:03.598Z] [dynamicBrowser] Page operation completed in 1093ms
2025-07-01 14:14:02.343	
[2025-07-01T21:14:02.343Z] [dynamicBrowser] Page operation completed in 1918ms
2025-07-01 14:14:00.145	
[2025-07-01T21:14:00.145Z] [dynamicBrowser] Browser launched successfully
2025-07-01 14:13:58.823	
[2025-07-01T21:13:58.822Z] [techStackScan] buildTargets discovered=6 total=8 (html=5, nonHtml=3)
2025-07-01 14:13:58.813	
[2025-07-01T21:13:58.812Z] [accessibilityScan] accessibility=hash_computation domain="lodging-source.com" pages=15
2025-07-01 14:13:58.813	
[2025-07-01T21:13:58.812Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-07-01 14:13:58.810	
[2025-07-01T21:13:58.810Z] [dynamicBrowser] Launching new browser instance
2025-07-01 14:13:58.810	
[2025-07-01T21:13:58.810Z] [dynamicBrowser] Initializing page semaphore with max 2 concurrent pages
2025-07-01 14:13:58.809	
[2025-07-01T21:13:58.809Z] [dynamicBrowser] Initializing page semaphore with max 2 concurrent pages
2025-07-01 14:13:58.808	
[2025-07-01T21:13:58.808Z] [techStackScan] techstack=nuclei wrapper confirmed available
2025-07-01 14:13:58.808	
[2025-07-01T21:13:58.808Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-01 14:13:58.808	
[INF] PDCP Directory: /root/.pdcp
2025-07-01 14:13:58.808	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-01 14:13:58.808	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-01 14:13:58.808	
[2025-07-01T21:13:58.807Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-01 14:13:58.497	
[2025-07-01T21:13:58.497Z] [worker] [ysVOIMB4fiX] COMPLETED AbuseIPDB scan: 0 malicious/suspicious IPs found
2025-07-01 14:13:58.497	
[2025-07-01T21:13:58.497Z] [abuseIntelScan] No IP artifacts found for this scan
2025-07-01 14:13:58.497	
[2025-07-01T21:13:58.497Z] [abuseIntelScan] Found 0 IP artifacts for scan ysVOIMB4fiX
2025-07-01 14:13:58.494	
[2025-07-01T21:13:58.493Z] [accessibilityScan] Starting accessibility scan for domain="lodging-source.com"
2025-07-01 14:13:58.494	
[2025-07-01T21:13:58.493Z] [worker] [ysVOIMB4fiX] STARTING accessibility compliance scan for lodging-source.com
2025-07-01 14:13:58.494	
[2025-07-01T21:13:58.493Z] [worker] === Running module (Phase 2C): accessibility_scan ===
2025-07-01 14:13:58.494	
[2025-07-01T21:13:58.493Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:13:58.493	
[2025-07-01T21:13:58.492Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=ysVOIMB4fiX
2025-07-01 14:13:58.493	
[2025-07-01T21:13:58.491Z] [worker] [ysVOIMB4fiX] STARTING AbuseIPDB intelligence scan for IPs
2025-07-01 14:13:58.493	
[2025-07-01T21:13:58.491Z] [worker] === Running module (Phase 2C): abuse_intel_scan ===
2025-07-01 14:13:58.493	
[2025-07-01T21:13:58.491Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:13:58.466	
[2025-07-01T21:13:58.465Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-01 14:13:58.458	
[2025-07-01T21:13:58.458Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-01 14:13:58.458	
[2025-07-01T21:13:58.458Z] [techStackScan] techstack=start domain=lodging-source.com
2025-07-01 14:13:58.457	
[2025-07-01T21:13:58.457Z] [worker] [ysVOIMB4fiX] STARTING tech stack scan for lodging-source.com
2025-07-01 14:13:58.457	
[2025-07-01T21:13:58.457Z] [worker] === Running module (Phase 2C): tech_stack_scan ===
2025-07-01 14:13:58.457	
[2025-07-01T21:13:58.457Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:13:58.450	
[2025-07-01T21:13:58.449Z] [worker] [ysVOIMB4fiX] COMPLETED endpoint discovery: 6 endpoint collections found
2025-07-01 14:13:58.450	
[2025-07-01T21:13:58.449Z] [endpointDiscovery] ⇢ done – 6 endpoints
2025-07-01 14:13:58.450	
[artifactStore] Inserted discovered_endpoints artifact: Discovered 6 unique endpoints for lodging-source.com...
2025-07-01 14:13:41.212	
}
2025-07-01 14:13:41.212	
"TYPOSQUAT_REDIRECT": 1
2025-07-01 14:13:41.212	
[2025-07-01T21:13:41.212Z] [SyncWorker] ✅ New findings synced: 1 {
2025-07-01 14:13:23.061	
[2025-07-01T21:13:23.060Z] [endpointDiscovery] +crawl_link /direct// (-)
2025-07-01 14:13:21.865	
[2025-07-01T21:13:21.865Z] [endpointDiscovery] +js_analysis //www.youtube.com/player_api (-)
2025-07-01 14:13:21.488	
[2025-07-01T21:13:21.487Z] [endpointDiscovery] +crawl_link /home.html (-)
2025-07-01 14:13:21.487	
[2025-07-01T21:13:21.487Z] [endpointDiscovery] +crawl_link /direct/index.php (-)
2025-07-01 14:13:21.487	
[2025-07-01T21:13:21.487Z] [endpointDiscovery] +crawl_link / (-)
2025-07-01 14:13:21.487	
[2025-07-01T21:13:21.487Z] [endpointDiscovery] +crawl_link /index.html (-)
2025-07-01 14:13:21.043	
[2025-07-01T21:13:21.043Z] [endpointDiscovery] ⇢ start lodging-source.com
2025-07-01 14:13:21.043	
[2025-07-01T21:13:21.042Z] [worker] [ysVOIMB4fiX] STARTING endpoint discovery for lodging-source.com
2025-07-01 14:13:21.043	
[2025-07-01T21:13:21.042Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:13:21.034	
[2025-07-01T21:13:21.034Z] [worker] === Running endpoint discovery ===
2025-07-01 14:13:21.034	
[2025-07-01T21:13:21.034Z] [worker] [ysVOIMB4fiX] COMPLETED DNS Twist: 5 typo-domains found
2025-07-01 14:13:21.034	
[2025-07-01T21:13:21.034Z] [dnstwist] Scan completed – 5 domains analysed
2025-07-01 14:13:21.034	
[artifactStore] Inserted finding TYPOSQUAT_REDIRECT for artifact 56
2025-07-01 14:13:21.032	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgings...
2025-07-01 14:12:40.880	
}
2025-07-01 14:12:40.880	
]
2025-07-01 14:12:40.880	
"Lodging Source: tls_scan_phase2a (20%)"
2025-07-01 14:12:40.880	
"progress": [
2025-07-01 14:12:40.880	
[2025-07-01T21:12:40.880Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-07-01 14:11:51.026	
[2025-07-01T21:11:51.026Z] [worker] [ysVOIMB4fiX] COMPLETED document exposure: 0 discoveries
2025-07-01 14:11:51.026	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-07-01 14:11:51.006	
[2025-07-01T21:11:51.005Z] [documentExposure] Completed: 0 files found, 10 Serper calls (~$0.030)
2025-07-01 14:11:51.006	
[2025-07-01T21:11:51.005Z] [documentExposure] Reached search query limit (10) - stopping to control costs
2025-07-01 14:11:49.503	
[2025-07-01T21:11:49.503Z] [documentExposure] Serper returned 0 results for query 10
2025-07-01 14:11:48.656	
[2025-07-01T21:11:48.656Z] [documentExposure] Serper API call 10: ""Lodging Source" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-07-01 14:11:45.549	
[2025-07-01T21:11:45.548Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-01 14:11:43.772	
[2025-07-01T21:11:43.771Z] [documentExposure] Serper returned 7 results for query 9
2025-07-01 14:11:42.974	
[2025-07-01T21:11:42.974Z] [documentExposure] Serper API call 9: ""Lodging Source" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-07-01 14:11:41.245	
}
2025-07-01 14:11:41.245	
"PHISHING_SETUP": 4
2025-07-01 14:11:41.245	
"MISSING_TLS_CERTIFICATE": 1,
2025-07-01 14:11:41.245	
"TLS_CONFIGURATION_ISSUE": 1,
2025-07-01 14:11:41.245	
[2025-07-01T21:11:41.245Z] [SyncWorker] ✅ New findings synced: 6 {
2025-07-01 14:11:41.045	
}
2025-07-01 14:11:41.045	
]
2025-07-01 14:11:41.045	
"Lodging Source: tls_scan_phase2a (20%)"
2025-07-01 14:11:41.045	
"progress": [
2025-07-01 14:11:41.045	
[2025-07-01T21:11:41.045Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-07-01 14:11:40.945	
[2025-07-01T21:11:40.945Z] [documentExposure] Serper returned 7 results for query 8
2025-07-01 14:11:39.245	
[2025-07-01T21:11:39.245Z] [documentExposure] Serper API call 8: ""Lodging Source" (intitle:"index of" OR intitle:"directory listing")"
2025-07-01 14:11:37.743	
[2025-07-01T21:11:37.743Z] [documentExposure] Serper returned 20 results for query 7
2025-07-01 14:11:36.658	
[2025-07-01T21:11:36.658Z] [documentExposure] Serper API call 7: ""Lodging Source" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-07-01 14:11:34.497	
[2025-07-01T21:11:34.496Z] [documentExposure] Serper returned 1 results for query 6
2025-07-01 14:11:33.769	
[2025-07-01T21:11:33.769Z] [documentExposure] Serper API call 6: ""Lodging Source" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-07-01 14:11:32.267	
[2025-07-01T21:11:32.267Z] [documentExposure] Serper returned 2 results for query 5
2025-07-01 14:11:31.790	
[2025-07-01T21:11:31.790Z] [documentExposure] Serper API call 5: ""Lodging Source" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-07-01 14:11:30.289	
[2025-07-01T21:11:30.289Z] [documentExposure] Serper returned 10 results for query 4
2025-07-01 14:11:29.012	
[2025-07-01T21:11:29.012Z] [documentExposure] Serper API call 4: ""Lodging Source" ("database" OR "backup" OR "dump") filetype:sql"
2025-07-01 14:11:27.511	
[2025-07-01T21:11:27.510Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-01 14:11:26.518	
[2025-07-01T21:11:26.510Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-01 14:11:23.621	
[2025-07-01T21:11:23.620Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-01 14:11:22.705	
[2025-07-01T21:11:22.704Z] [documentExposure] Serper returned 20 results for query 3
2025-07-01 14:11:21.815	
[2025-07-01T21:11:21.815Z] [documentExposure] Serper API call 3: ""Lodging Source" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-07-01 14:11:20.315	
[2025-07-01T21:11:20.315Z] [documentExposure] process error: Request failed with status code 404
2025-07-01 14:11:19.543	
[2025-07-01T21:11:19.543Z] [documentExposure] process error: Request failed with status code 403
2025-07-01 14:11:18.032	
[2025-07-01T21:11:18.032Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-01 14:11:16.984	
[2025-07-01T21:11:16.984Z] [documentExposure] process error: Request failed with status code 403
2025-07-01 14:11:15.916	
[2025-07-01T21:11:15.915Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-01 14:11:15.312	
[2025-07-01T21:11:15.312Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-01 14:11:14.174	
[2025-07-01T21:11:14.174Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-01 14:11:13.543	
[2025-07-01T21:11:13.543Z] [documentExposure] process error: timeout of 30000ms exceeded
2025-07-01 14:11:09.341	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 54
2025-07-01 14:11:09.339	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgin.g...
2025-07-01 14:11:08.230	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 53
2025-07-01 14:11:08.229	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-07-01 14:11:07.786	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 52
2025-07-01 14:11:07.784	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-07-01 14:11:07.246	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 51
2025-07-01 14:11:07.242	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-07-01 14:11:07.045	
[2025-07-01T21:11:07.044Z] [dnstwist] Batch 1/1
2025-07-01 14:11:07.045	
[2025-07-01T21:11:07.044Z] [dnstwist] Found 5 registered typosquat candidates to analyze
2025-07-01 14:10:49.840	
[2025-07-01T21:10:49.840Z] [worker] [ysVOIMB4fiX] COMPLETED TLS scan: 3 TLS issues found
2025-07-01 14:10:49.840	
[2025-07-01T21:10:49.840Z] [tlsScan] Scan complete. Hosts: lodging-source.com, www.lodging-source.com. Findings: 3
2025-07-01 14:10:49.840	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 3 issue(s) found...
2025-07-01 14:10:49.839	
[artifactStore] Inserted finding MISSING_TLS_CERTIFICATE for artifact 49
2025-07-01 14:10:49.837	
[artifactStore] Inserted tls_no_certificate artifact: lodging-source.com - no valid SSL/TLS certificate on any hos...
2025-07-01 14:10:49.836	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 48
2025-07-01 14:10:49.833	
[artifactStore] Inserted tls_configuration artifact: www.lodging-source.com - Incomplete SSL certificate chain (m...
2025-07-01 14:10:49.810	
[2025-07-01T21:10:49.810Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-07-01 14:10:49.546	
[2025-07-01T21:10:49.545Z] [tlsScan] Cross-validation complete for www.lodging-source.com: 0 additional findings
2025-07-01 14:10:41.152	
}
2025-07-01 14:10:41.152	
"CRITICAL_INFOSTEALER": 1
2025-07-01 14:10:41.152	
"MEDIUM_EMAIL_EXPOSED": 56,
2025-07-01 14:10:41.152	
"HIGH_PASSWORD_EXPOSED": 6,
2025-07-01 14:10:41.152	
[2025-07-01T21:10:41.152Z] [SyncWorker] ✅ New compromised credentials synced: 63 {
2025-07-01 14:10:41.020	
}
2025-07-01 14:10:41.020	
"TLS_CONFIGURATION_ISSUE": 1
2025-07-01 14:10:41.020	
"EXPOSED_SERVICE": 1,
2025-07-01 14:10:41.020	
"EMAIL_SECURITY_WEAKNESS": 1,
2025-07-01 14:10:41.020	
"EMAIL_BREACH_EXPOSURE": 1,
2025-07-01 14:10:41.020	
"CRITICAL_BREACH_EXPOSURE": 1,
2025-07-01 14:10:41.020	
"PASSWORD_BREACH_EXPOSURE": 1,
2025-07-01 14:10:41.020	
[2025-07-01T21:10:41.020Z] [SyncWorker] ✅ New findings synced: 6 {
2025-07-01 14:10:40.851	
}
2025-07-01 14:10:40.851	
]
2025-07-01 14:10:40.851	
"Lodging Source: tls_scan_phase2a (20%)"
2025-07-01 14:10:40.851	
"progress": [
2025-07-01 14:10:40.851	
[2025-07-01T21:10:40.851Z] [SyncWorker] ✅ Active scans progress: 1 {
2025-07-01 14:10:39.029	
[2025-07-01T21:10:39.029Z] [tlsScan] Python validator: www.lodging-source.com - INVALID
2025-07-01 14:10:38.817	
[2025-07-01T21:10:38.817Z] [tlsScan] Scanning www.lodging-source.com with hybrid validation (sslscan + Python)...
2025-07-01 14:10:38.817	
[artifactStore] Inserted finding TLS_CONFIGURATION_ISSUE for artifact 47
2025-07-01 14:10:38.814	
[artifactStore] Inserted tls_configuration artifact: lodging-source.com - Incomplete SSL certificate chain (missi...
2025-07-01 14:10:38.795	
[2025-07-01T21:10:38.795Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-07-01 14:10:38.566	
[2025-07-01T21:10:38.566Z] [tlsScan] Cross-validation complete for lodging-source.com: 0 additional findings
2025-07-01 14:10:33.523	
[2025-07-01T21:10:33.522Z] [documentExposure] Serper returned 20 results for query 2
2025-07-01 14:10:32.920	
[2025-07-01T21:10:32.919Z] [documentExposure] Serper API call 2: ""Lodging Source" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-07-01 14:10:31.420	
[2025-07-01T21:10:31.419Z] [documentExposure] Serper returned 0 results for query 1
2025-07-01 14:10:30.827	
[2025-07-01T21:10:30.827Z] [documentExposure] Serper API call 1: "site:lodging-source.com (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-07-01 14:10:28.178	
[2025-07-01T21:10:28.178Z] [worker] [ysVOIMB4fiX] COMPLETED Shodan scan: 2 services found
2025-07-01 14:10:28.178	
[2025-07-01T21:10:28.178Z] [Shodan] Done — 2 rows persisted, 1 API calls used for 1 targets
2025-07-01 14:10:28.178	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 2 items...
2025-07-01 14:10:28.176	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 45
2025-07-01 14:10:28.175	
[artifactStore] Inserted shodan_service artifact: 70.35.206.233:443 Apache httpd 2.4.62...
2025-07-01 14:10:28.172	
[2025-07-01T21:10:28.172Z] [Shodan] API call 1 - search query
2025-07-01 14:10:28.031	
[2025-07-01T21:10:28.031Z] [worker] [ysVOIMB4fiX] COMPLETED email security scan: 1 email issues found
2025-07-01 14:10:28.031	
[2025-07-01T21:10:28.031Z] [spfDmarc] Completed email security scan, found 1 issues
2025-07-01 14:10:28.031	
[artifactStore] Inserted bimi_missing artifact: BIMI record not found...
2025-07-01 14:10:28.002	
[2025-07-01T21:10:28.002Z] [spfDmarc] Checking for BIMI record...
2025-07-01 14:10:28.002	
[2025-07-01T21:10:28.002Z] [spfDmarc] Found DKIM record with selector: default
2025-07-01 14:10:27.978	
[2025-07-01T21:10:27.977Z] [spfDmarc] Probing for common DKIM selectors...
2025-07-01 14:10:27.885	
[2025-07-01T21:10:27.885Z] [tlsScan] Python validator: lodging-source.com - INVALID
2025-07-01 14:10:27.710	
[2025-07-01T21:10:27.710Z] [spfDmarc] Performing recursive SPF check...
2025-07-01 14:10:27.710	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 43
2025-07-01 14:10:27.708	
[artifactStore] Inserted dmarc_weak artifact: DMARC policy is not enforcing...
2025-07-01 14:10:27.637	
[2025-07-01T21:10:27.637Z] [tlsScan] Scanning lodging-source.com with hybrid validation (sslscan + Python)...
2025-07-01 14:10:27.637	

2025-07-01 14:10:27.637	
OpenSSL 3.5.0 8 Apr 2025
2025-07-01 14:10:27.637	
[2025-07-01T21:10:27.636Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-07-01 14:10:27.620	
[2025-07-01T21:10:27.617Z] [worker] [ysVOIMB4fiX] STARTING TLS security scan for lodging-source.com
2025-07-01 14:10:27.620	
[2025-07-01T21:10:27.617Z] [worker] === Running module (Phase 2A): tls_scan ===
2025-07-01 14:10:27.620	
[2025-07-01T21:10:27.617Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:10:27.613	
[2025-07-01T21:10:27.612Z] [dnstwist] WHOIS enrichment disabled (saves ~$0.30-0.75 per scan) - set ENABLE_WHOIS_ENRICHMENT=true to enable
2025-07-01 14:10:27.612	
[2025-07-01T21:10:27.612Z] [dnstwist] Starting typosquat scan for lodging-source.com
2025-07-01 14:10:27.612	
[2025-07-01T21:10:27.611Z] [worker] [ysVOIMB4fiX] STARTING DNS Twist scan for lodging-source.com
2025-07-01 14:10:27.612	
[2025-07-01T21:10:27.611Z] [worker] === Running module (Phase 2A): dns_twist ===
2025-07-01 14:10:27.612	
[2025-07-01T21:10:27.611Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:10:27.605	
[2025-07-01T21:10:27.605Z] [spfDmarc] Checking DMARC record...
2025-07-01 14:10:27.605	
[2025-07-01T21:10:27.605Z] [spfDmarc] Starting email security scan for lodging-source.com
2025-07-01 14:10:27.604	
[2025-07-01T21:10:27.604Z] [worker] [ysVOIMB4fiX] STARTING SPF/DMARC email security scan for lodging-source.com
2025-07-01 14:10:27.604	
[2025-07-01T21:10:27.604Z] [worker] === Running module (Phase 2A): spf_dmarc ===
2025-07-01 14:10:27.604	
[2025-07-01T21:10:27.604Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:10:27.604	
[2025-07-01T21:10:27.604Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-07-01 14:10:27.603	
[2025-07-01T21:10:27.603Z] [worker] [ysVOIMB4fiX] STARTING document exposure scan for Lodging Source
2025-07-01 14:10:27.603	
[2025-07-01T21:10:27.603Z] [worker] === Running module (Phase 2A): document_exposure ===
2025-07-01 14:10:27.603	
[2025-07-01T21:10:27.603Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:10:27.526	
[2025-07-01T21:10:27.526Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-07-01 14:10:27.526	
[2025-07-01T21:10:27.526Z] [worker] [ysVOIMB4fiX] COMPLETED Censys platform scan: 0 services found
2025-07-01 14:10:27.526	
[ysVOIMB4fiX] Censys scan skipped - CENSYS_PAT and CENSYS_ORG_ID not configured (saves ~$2-10 per scan)
2025-07-01 14:10:27.525	
[2025-07-01T21:10:27.525Z] [worker] [ysVOIMB4fiX] STARTING Censys platform scan for lodging-source.com
2025-07-01 14:10:27.525	
[2025-07-01T21:10:27.525Z] [worker] === Running module (Phase 2A): censys ===
2025-07-01 14:10:27.525	
[2025-07-01T21:10:27.525Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:10:27.524	
[2025-07-01T21:10:27.524Z] [Shodan] Start scan for lodging-source.com
2025-07-01 14:10:27.524	
[2025-07-01T21:10:27.524Z] [worker] [ysVOIMB4fiX] STARTING Shodan intelligence scan for lodging-source.com
2025-07-01 14:10:27.524	
[2025-07-01T21:10:27.524Z] [worker] === Running module (Phase 2A): shodan ===
2025-07-01 14:10:27.524	
[2025-07-01T21:10:27.524Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:10:27.521	
[2025-07-01T21:10:27.521Z] [worker] [ysVOIMB4fiX] COMPLETED SpiderFoot discovery: 7 targets found
2025-07-01 14:10:27.521	
[2025-07-01T21:10:27.521Z] [SpiderFoot] ✔️ Completed – 7 artifacts
2025-07-01 14:10:27.521	
[artifactStore] Inserted scan_summary artifact: SpiderFoot scan completed: 7 artifacts...
2025-07-01 14:10:27.520	
[artifactStore] Inserted intel artifact: support@lodging-source.com...
2025-07-01 14:10:27.518	
[artifactStore] Inserted intel artifact: GoDaddy.com, LLC...
2025-07-01 14:10:27.517	
Registry Domain ID: 1...
2025-07-01 14:10:27.517	
[artifactStore] Inserted intel artifact:    Domain Name: LODGING-SOURCE.COM
2025-07-01 14:10:27.515	
[artifactStore] Inserted intel artifact: 74.208.42.246...
2025-07-01 14:10:27.514	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-07-01 14:10:27.513	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-07-01 14:10:27.512	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-07-01 14:10:27.509	
[2025-07-01T21:10:27.509Z] [SpiderFoot] Raw output size: 8032 bytes
2025-07-01 14:10:21.585	
[2025-07-01T21:10:21.585Z] [worker] [ysVOIMB4fiX] COMPLETED Breach Directory probe: 3 breach findings
2025-07-01 14:10:21.585	
[2025-07-01T21:10:21.585Z] [breachDirectoryProbe] Breach probe completed: 3 findings in 1683ms
2025-07-01 14:10:21.585	
[2025-07-01T21:10:21.585Z] [breachDirectoryProbe] Created INFO finding for 11 users: shelly@lodging-source.com, bert@lodging-source.com, gretchen@lodging-source.com, amy@lodging-source.com, katie@lodging-source.com...
2025-07-01 14:10:21.585	
[artifactStore] Inserted finding EMAIL_BREACH_EXPOSURE for artifact 34
2025-07-01 14:10:21.583	
[2025-07-01T21:10:21.583Z] [breachDirectoryProbe] Created CRITICAL finding for 1 users: mike@lodging-source.com
2025-07-01 14:10:21.583	
[artifactStore] Inserted finding CRITICAL_BREACH_EXPOSURE for artifact 34
2025-07-01 14:10:21.581	
[2025-07-01T21:10:21.581Z] [breachDirectoryProbe] Created MEDIUM finding for 4 users: jayme@lodging-source.com, kelli@lodging-source.com, jessica@lodging-source.com, lauren@lodging-source.com
2025-07-01 14:10:21.580	
[artifactStore] Inserted finding PASSWORD_BREACH_EXPOSURE for artifact 34
2025-07-01 14:10:21.577	
[2025-07-01T21:10:21.576Z] [breachDirectoryProbe] Consolidated 63 breach records into 16 unique users
2025-07-01 14:10:21.577	
[artifactStore] Inserted breach_directory_summary artifact: Breach probe: 63 total breached accounts (BD: 0, LC: 63) for...
2025-07-01 14:10:21.569	
[2025-07-01T21:10:21.567Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=63, Total=63
2025-07-01 14:10:21.562	
[2025-07-01T21:10:21.562Z] [breachDirectoryProbe] LeakCheck response for lodging-source.com: 63 breached accounts, quota remaining: 999999
2025-07-01 14:10:20.940	
[2025-07-01T21:10:20.940Z] [breachDirectoryProbe] Querying LeakCheck for domain: lodging-source.com
2025-07-01 14:10:20.589	
[2025-07-01T21:10:20.589Z] [breachDirectoryProbe] Breach Directory response for lodging-source.com: 0 breached accounts
2025-07-01 14:10:19.903	
[2025-07-01T21:10:19.902Z] [breachDirectoryProbe] Querying Breach Directory for domain: lodging-source.com
2025-07-01 14:10:19.902	
[2025-07-01T21:10:19.902Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="lodging-source.com" (BreachDirectory + LeakCheck)
2025-07-01 14:10:19.902	
[2025-07-01T21:10:19.901Z] [worker] [ysVOIMB4fiX] STARTING Breach Directory intelligence probe for lodging-source.com
2025-07-01 14:10:19.902	
[2025-07-01T21:10:19.901Z] [worker] === Running module (Phase 1): breach_directory_probe ===
2025-07-01 14:10:19.902	
[2025-07-01T21:10:19.901Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:10:19.879	
[2025-07-01T21:10:19.879Z] [SpiderFoot] Command: python3 /opt/spiderfoot/sf.py -q -s lodging-source.com -m sfp_crtsh,sfp_sublist3r,sfp_chaos,sfp_r7_dns,sfp_haveibeenpwnd,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei,sfp_whois,sfp_dnsresolve -o json
2025-07-01 14:10:19.877	
[2025-07-01T21:10:19.877Z] [SpiderFoot] API keys: HIBP ✅, Chaos ✅ (Shodan/Censys handled by dedicated modules)
2025-07-01 14:10:19.874	
[2025-07-01T21:10:19.874Z] [SpiderFoot] Starting scan for lodging-source.com (scanId=ysVOIMB4fiX)
2025-07-01 14:10:19.874	
[2025-07-01T21:10:19.873Z] [worker] [ysVOIMB4fiX] STARTING SpiderFoot discovery for lodging-source.com
2025-07-01 14:10:19.874	
[2025-07-01T21:10:19.873Z] [worker] === Running module (Phase 1): spiderfoot ===
2025-07-01 14:10:19.873	
[2025-07-01T21:10:19.873Z] [worker] [updateScanMasterStatus] Updated scan ysVOIMB4fiX with: status, current_module, progress
2025-07-01 14:10:19.869	
[queue] Updated job ysVOIMB4fiX status: processing - Comprehensive security discovery in progress...
2025-07-01 14:10:19.782	
{
  "level": 30,
  "time": 1751404219782,
  "pid": 660,
  "hostname": "148e21dae24d98",
  "reqId": "req-1",
  "res": {
    "statusCode": 200
  },
  "responseTime": 768.2004210000014,
  "msg": "request completed"
}
2025-07-01 14:10:19.778	
[2025-07-01T21:10:19.777Z] [api] ✅ Successfully created scan job ysVOIMB4fiX for Lodging Source
2025-07-01 14:10:19.778	
[queue] enqueued ysVOIMB4fiX
2025-07-01 14:10:19.719	
[2025-07-01T21:10:19.719Z] [worker] [ysVOIMB4fiX] 🎯 Using TIER_1 tier with 13 modules: spiderfoot, dns_twist, document_exposure, shodan, censys, breach_directory_probe, endpoint_discovery, tech_stack_scan, abuse_intel_scan, accessibility_scan, tls_scan, spf_dmarc, trufflehog
2025-07-01 14:10:19.719	
[2025-07-01T21:10:19.718Z] [worker] Processing comprehensive security scan for Lodging Source (lodging-source.com)
2025-07-01 14:10:19.719	
[2025-07-01T21:10:19.718Z] [worker] ✅ JOB PICKED UP: Processing scan job ysVOIMB4fiX for Lodging Source (lodging-source.com)
Fields




event.provider	
app




fly.app.instance	
286565eb5406d8




fly.app.name	
dealbrief-scanner




fly.region	
sea




log.level	
info




message	
[2025-07-01T21:10:19.718Z] [worker] ✅ JOB PICKED UP: Processing scan job ysVOIMB4fiX for Lodging Source (lodging-source.com)




sort	
[1751404219000000000]
2025-07-01 14:10:19.717	
[2025-07-01T21:10:19.717Z] [worker] Processing scan job: ysVOIMB4fiX