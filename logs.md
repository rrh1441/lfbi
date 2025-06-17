2025-06-16 13:55:10.315	
}
2025-06-16 13:55:10.315	
"EMAIL_SECURITY_WEAKNESS": 1
2025-06-16 13:55:10.315	
"ADVERSE_MEDIA": 1,
2025-06-16 13:55:10.315	
[2025-06-16T20:55:10.315Z] [SyncWorker] ✅ Findings inserted: 2 total {
2025-06-16 13:55:10.257	
}
2025-06-16 13:55:10.257	
]
2025-06-16 13:55:10.257	
"Lodging Source: trufflehog (100/16)"
2025-06-16 13:55:10.257	
"completed": [
2025-06-16 13:55:10.257	
[2025-06-16T20:55:10.256Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:54:30.202	
[2025-06-16T20:54:30.202Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Lodging Source: 72 verified findings, 19 artifacts across 16 security modules
2025-06-16 13:54:30.202	
[queue] Updated job PhPg7gH3YCM status: done - Comprehensive security scan completed - 72 verified findings across 16 security modules. Findings ready for processing.
2025-06-16 13:54:29.787	
[2025-06-16T20:54:29.786Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-06-16 13:54:29.782	
[2025-06-16T20:54:29.782Z] [worker] [processScan] Counted 19 artifacts for scan PhPg7gH3YCM
2025-06-16 13:54:29.781	
[2025-06-16T20:54:29.780Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:54:29.779	
[2025-06-16T20:54:29.779Z] [worker] [PhPg7gH3YCM] COMPLETED secret detection: 0 secrets found
2025-06-16 13:54:29.779	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-06-16 13:54:29.777	
[2025-06-16T20:54:29.777Z] [trufflehog] Finished secret scan for lodging-source.com Total secrets found: 0
2025-06-16 13:54:29.777	
[2025-06-16T20:54:29.777Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-06-16 13:54:29.777	
[2025-06-16T20:54:29.776Z] [trufflehog] No SpiderFoot links file found, or unable to parse. Skipping Git repo scan.
2025-06-16 13:54:29.776	
[2025-06-16T20:54:29.775Z] [trufflehog] [Website Scan] Failed to crawl or download https://lodging-source.com: unable to verify the first certificate
2025-06-16 13:54:29.592	
[2025-06-16T20:54:29.592Z] [trufflehog] [Website Scan] Starting crawl and scan for: lodging-source.com
2025-06-16 13:54:29.591	
[2025-06-16T20:54:29.591Z] [trufflehog] Starting secret scan for domain: lodging-source.com
2025-06-16 13:54:29.591	
[2025-06-16T20:54:29.591Z] [worker] [PhPg7gH3YCM] STARTING TruffleHog secret detection for lodging-source.com
2025-06-16 13:54:29.591	
[2025-06-16T20:54:29.591Z] [worker] === Running module: trufflehog (16/16) ===
2025-06-16 13:54:29.591	
[2025-06-16T20:54:29.590Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:54:29.589	
[2025-06-16T20:54:29.589Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:54:29.588	
[2025-06-16T20:54:29.588Z] [worker] [PhPg7gH3YCM] COMPLETED email security scan: 1 email issues found
2025-06-16 13:54:29.588	
[2025-06-16T20:54:29.588Z] [spfDmarc] Completed email security scan, found 1 issues
2025-06-16 13:54:29.588	
[artifactStore] Inserted bimi_missing artifact: BIMI record not found...
2025-06-16 13:54:29.565	
[2025-06-16T20:54:29.565Z] [spfDmarc] Checking for BIMI record...
2025-06-16 13:54:29.565	
[2025-06-16T20:54:29.564Z] [spfDmarc] Found DKIM record with selector: default
2025-06-16 13:54:29.544	
[2025-06-16T20:54:29.544Z] [spfDmarc] Probing for common DKIM selectors...
2025-06-16 13:54:29.433	
[2025-06-16T20:54:29.433Z] [spfDmarc] Performing recursive SPF check...
2025-06-16 13:54:29.433	
[artifactStore] Inserted finding EMAIL_SECURITY_WEAKNESS for artifact 1094
2025-06-16 13:54:29.430	
[artifactStore] Inserted dmarc_weak artifact: DMARC policy is not enforcing...
2025-06-16 13:54:29.392	
[2025-06-16T20:54:29.392Z] [spfDmarc] Checking DMARC record...
2025-06-16 13:54:29.392	
[2025-06-16T20:54:29.392Z] [spfDmarc] Starting email security scan for lodging-source.com
2025-06-16 13:54:29.391	
[2025-06-16T20:54:29.391Z] [worker] [PhPg7gH3YCM] STARTING SPF/DMARC email security scan for lodging-source.com
2025-06-16 13:54:29.391	
[2025-06-16T20:54:29.391Z] [worker] === Running module: spf_dmarc (15/16) ===
2025-06-16 13:54:29.391	
[2025-06-16T20:54:29.391Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:54:29.390	
[2025-06-16T20:54:29.390Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:54:29.387	
[2025-06-16T20:54:29.387Z] [worker] [PhPg7gH3YCM] COMPLETED rate limiting tests: 0 rate limit issues found
2025-06-16 13:54:29.387	
[artifactStore] Inserted scan_summary artifact: Rate limit scan completed: 0 issues found...
2025-06-16 13:54:29.366	
[2025-06-16T20:54:29.366Z] [rateLimitScan] Rate limiting on https://lodging-source.com/password/reset appears to be robust.
2025-06-16 13:54:25.308	
[2025-06-16T20:54:25.308Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com/password/reset. Testing for bypasses...
2025-06-16 13:54:25.308	
[2025-06-16T20:54:25.307Z] [rateLimitScan] Response distribution for https://lodging-source.com/password/reset: { '0': 25 }
2025-06-16 13:54:23.958	
[2025-06-16T20:54:23.956Z] [rateLimitScan] Establishing baseline for https://lodging-source.com/password/reset...
2025-06-16 13:54:23.956	
[2025-06-16T20:54:23.956Z] [rateLimitScan] Rate limiting on https://lodging-source.com/auth/login appears to be robust.
2025-06-16 13:54:19.797	
[2025-06-16T20:54:19.796Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com/auth/login. Testing for bypasses...
2025-06-16 13:54:19.796	
[2025-06-16T20:54:19.796Z] [rateLimitScan] Response distribution for https://lodging-source.com/auth/login: { '0': 25 }
2025-06-16 13:54:18.431	
[2025-06-16T20:54:18.431Z] [rateLimitScan] Establishing baseline for https://lodging-source.com/auth/login...
2025-06-16 13:54:18.431	
[2025-06-16T20:54:18.430Z] [rateLimitScan] Rate limiting on https://lodging-source.com/api/login appears to be robust.
2025-06-16 13:54:14.441	
[2025-06-16T20:54:14.441Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com/api/login. Testing for bypasses...
2025-06-16 13:54:14.441	
[2025-06-16T20:54:14.441Z] [rateLimitScan] Response distribution for https://lodging-source.com/api/login: { '0': 25 }
2025-06-16 13:54:13.083	
[2025-06-16T20:54:13.082Z] [rateLimitScan] Establishing baseline for https://lodging-source.com/api/login...
2025-06-16 13:54:13.082	
[2025-06-16T20:54:13.082Z] [rateLimitScan] Rate limiting on https://lodging-source.com/login appears to be robust.
2025-06-16 13:54:10.358	
}
2025-06-16 13:54:10.358	
"ADVERSE_MEDIA": 1
2025-06-16 13:54:10.358	
[2025-06-16T20:54:10.358Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:54:10.263	
}
2025-06-16 13:54:10.263	
]
2025-06-16 13:54:10.263	
"Lodging Source: rate_limit_scan (81/16)"
2025-06-16 13:54:10.263	
"completed": [
2025-06-16 13:54:10.263	
[2025-06-16T20:54:10.263Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:54:09.049	
[2025-06-16T20:54:09.048Z] [rateLimitScan] Baseline rate limit detected on https://lodging-source.com/login. Testing for bypasses...
2025-06-16 13:54:09.048	
[2025-06-16T20:54:09.048Z] [rateLimitScan] Response distribution for https://lodging-source.com/login: { '0': 25 }
2025-06-16 13:54:07.012	
[2025-06-16T20:54:07.010Z] [rateLimitScan] Establishing baseline for https://lodging-source.com/login...
2025-06-16 13:54:07.012	
[2025-06-16T20:54:07.010Z] [rateLimitScan] Found 4 endpoints to test.
2025-06-16 13:54:07.012	
[2025-06-16T20:54:07.009Z] [rateLimitScan] No discovered endpoints found, using fallback list.
2025-06-16 13:54:07.009	
[2025-06-16T20:54:07.006Z] [rateLimitScan] Starting comprehensive rate limit scan for lodging-source.com
2025-06-16 13:54:07.009	
[2025-06-16T20:54:07.006Z] [worker] [PhPg7gH3YCM] STARTING rate-limit tests for lodging-source.com
2025-06-16 13:54:07.009	
[2025-06-16T20:54:06.949Z] [worker] === Running module: rate_limit_scan (14/16) ===
2025-06-16 13:54:06.950	
[2025-06-16T20:54:06.949Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:54:06.948	
[2025-06-16T20:54:06.948Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:54:06.945	
[2025-06-16T20:54:06.945Z] [worker] [PhPg7gH3YCM] COMPLETED Nuclei scan: 0 vulnerabilities found
2025-06-16 13:54:06.945	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-06-16 13:54:06.927	
[2025-06-16T20:54:06.927Z] [nuclei] CVE verification: 0/0 false positives suppressed
2025-06-16 13:54:06.927	
[2025-06-16T20:54:06.927Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-06-16 13:54:06.927	
[2025-06-16T20:54:06.926Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-06-16 13:54:06.927	
[2025-06-16T20:54:06.926Z] [nuclei] [Tag Scan] Failed for https://lodging-source.com: Command failed: nuclei -u https://lodging-source.com -tags cve,misconfiguration,default-logins,exposed-panels,exposure,tech -json -silent -timeout 10 -retries 2 -headless
2025-06-16 13:54:05.769	
[2025-06-16T20:54:05.768Z] [nuclei] [Tag Scan] Running on https://lodging-source.com with tags: cve,misconfiguration,default-logins,exposed-panels,exposure,tech
2025-06-16 13:54:05.768	
[2025-06-16T20:54:05.768Z] [nuclei] --- Starting Phase 1: Tag-based scans on 1 targets ---
2025-06-16 13:54:05.768	
[2025-06-16T20:54:05.768Z] [nuclei] [prefilter] Failed to get banner for https://lodging-source.com: fetch failed
2025-06-16 13:54:05.489	
[2025-06-16T20:54:05.489Z] [nuclei] Template update complete.
2025-06-16 13:54:05.488	
[INF] No new updates found for nuclei templates
2025-06-16 13:54:05.488	
[INF] Successfully updated nuclei-templates (v10.2.3) to /root/nuclei-templates. GoodLuck!
2025-06-16 13:54:05.488	
[INF] Your current nuclei-templates v10.2.2 are outdated. Latest is v10.2.3
2025-06-16 13:54:05.488	
projectdiscovery.io
2025-06-16 13:54:05.488	
/_/ /_/\__,_/\___/_/\___/_/   v3.2.9
2025-06-16 13:54:05.488	
/ / / / /_/ / /__/ /  __/ /
2025-06-16 13:54:05.488	
/ __ \/ / / / ___/ / _ \/ /
2025-06-16 13:54:05.488	
____  __  _______/ /__  (_)
2025-06-16 13:54:05.488	
__     _
2025-06-16 13:54:05.488	
[2025-06-16T20:54:05.488Z] [nuclei] Template update stderr:
2025-06-16 13:53:10.243	
}
2025-06-16 13:53:10.243	
"ADVERSE_MEDIA": 1
2025-06-16 13:53:10.243	
[2025-06-16T20:53:10.242Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:53:10.174	
}
2025-06-16 13:53:10.174	
]
2025-06-16 13:53:10.174	
"Lodging Source: nuclei (75/16)"
2025-06-16 13:53:10.174	
"completed": [
2025-06-16 13:53:10.174	
[2025-06-16T20:53:10.173Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:52:10.319	
}
2025-06-16 13:52:10.319	
"ADVERSE_MEDIA": 1
2025-06-16 13:52:10.319	
[2025-06-16T20:52:10.319Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:52:10.257	
}
2025-06-16 13:52:10.257	
]
2025-06-16 13:52:10.257	
"Lodging Source: nuclei (75/16)"
2025-06-16 13:52:10.257	
"completed": [
2025-06-16 13:52:10.257	
[2025-06-16T20:52:10.257Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:51:18.857	
[2025-06-16T20:51:18.857Z] [nuclei] Templates are outdated (> 24 hours). Updating...
2025-06-16 13:51:18.856	
[INF] PDCP Directory: /root/.pdcp
2025-06-16 13:51:18.856	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-06-16 13:51:18.856	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-06-16 13:51:18.856	
[2025-06-16T20:51:18.856Z] [nuclei] Version check stderr: [INF] Nuclei Engine Version: v3.2.9
2025-06-16 13:51:18.856	
[2025-06-16T20:51:18.856Z] [nuclei] Nuclei binary found.
2025-06-16 13:51:17.336	
[2025-06-16T20:51:17.336Z] [nuclei] Starting enhanced vulnerability scan for lodging-source.com
2025-06-16 13:51:17.335	
[2025-06-16T20:51:17.335Z] [worker] [PhPg7gH3YCM] STARTING Nuclei vulnerability scan for lodging-source.com
2025-06-16 13:51:17.335	
[2025-06-16T20:51:17.335Z] [worker] === Running module: nuclei (13/16) ===
2025-06-16 13:51:17.335	
[2025-06-16T20:51:17.335Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:51:17.334	
[2025-06-16T20:51:17.334Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, progress
2025-06-16 13:51:17.333	
[2025-06-16T20:51:17.332Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, error_message
2025-06-16 13:51:17.168	
[2025-06-16T20:51:17.168Z] [worker] Module tls_scan failed: testssl.sh not found in any expected location
2025-06-16 13:51:10.166	
}
2025-06-16 13:51:10.166	
"ADVERSE_MEDIA": 1
2025-06-16 13:51:10.166	
[2025-06-16T20:51:10.166Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:51:10.108	
}
2025-06-16 13:51:10.108	
]
2025-06-16 13:51:10.108	
"Lodging Source: tls_scan (68/16)"
2025-06-16 13:51:10.108	
"completed": [
2025-06-16 13:51:10.108	
[2025-06-16T20:51:10.107Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:51:01.572	
[2025-06-16T20:51:01.571Z] [worker] [PhPg7gH3YCM] STARTING TLS security scan for lodging-source.com
2025-06-16 13:51:01.572	
[2025-06-16T20:51:01.571Z] [worker] === Running module: tls_scan (12/16) ===
2025-06-16 13:51:01.571	
[2025-06-16T20:51:01.571Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:51:01.570	
[2025-06-16T20:51:01.570Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:51:01.569	
[2025-06-16T20:51:01.568Z] [worker] [PhPg7gH3YCM] COMPLETED denial-of-wallet scan: 0 cost amplification vulnerabilities found
2025-06-16 13:51:01.568	
[2025-06-16T20:51:01.568Z] [denialWalletScan] No endpoints found for DoW testing
2025-06-16 13:51:01.568	
[2025-06-16T20:51:01.568Z] [denialWalletScan] Found 0 endpoints from endpoint discovery
2025-06-16 13:51:01.489	
[2025-06-16T20:51:01.489Z] [denialWalletScan] Starting denial-of-wallet scan for domain="lodging-source.com"
2025-06-16 13:51:01.486	
[2025-06-16T20:51:01.486Z] [worker] [PhPg7gH3YCM] STARTING denial-of-wallet vulnerability scan for lodging-source.com
2025-06-16 13:51:01.486	
[2025-06-16T20:51:01.486Z] [worker] === Running module: denial_wallet_scan (11/16) ===
2025-06-16 13:51:01.409	
[2025-06-16T20:51:01.409Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:51:01.407	
[2025-06-16T20:51:01.407Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:51:01.331	
[2025-06-16T20:51:01.331Z] [worker] [PhPg7gH3YCM] COMPLETED accessibility scan: 0 WCAG violations found
2025-06-16 13:50:59.654	
[artifactStore] Inserted scan_error artifact: Accessibility scan failed: Network.enable timed out. Increas...
2025-06-16 13:50:59.407	
[2025-06-16T20:50:59.406Z] [accessibilityScan] Accessibility scan failed: Network.enable timed out. Increase the 'protocolTimeout' setting in launch/connect calls for a higher timeout if needed.
2025-06-16 13:50:10.177	
}
2025-06-16 13:50:10.177	
"ADVERSE_MEDIA": 1
2025-06-16 13:50:10.177	
[2025-06-16T20:50:10.177Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:50:10.116	
}
2025-06-16 13:50:10.116	
]
2025-06-16 13:50:10.116	
"Lodging Source: accessibility_scan (56/16)"
2025-06-16 13:50:10.116	
"completed": [
2025-06-16 13:50:10.116	
[2025-06-16T20:50:10.116Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:49:10.177	
}
2025-06-16 13:49:10.177	
"ADVERSE_MEDIA": 1
2025-06-16 13:49:10.177	
[2025-06-16T20:49:10.177Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:49:10.106	
}
2025-06-16 13:49:10.106	
]
2025-06-16 13:49:10.106	
"Lodging Source: accessibility_scan (56/16)"
2025-06-16 13:49:10.106	
"completed": [
2025-06-16 13:49:10.106	
[2025-06-16T20:49:10.105Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:48:10.328	
}
2025-06-16 13:48:10.328	
"ADVERSE_MEDIA": 19
2025-06-16 13:48:10.328	
"EXPOSED_SERVICE": 1,
2025-06-16 13:48:10.328	
[2025-06-16T20:48:10.327Z] [SyncWorker] ✅ Findings inserted: 20 total {
2025-06-16 13:48:10.207	
}
2025-06-16 13:48:10.207	
]
2025-06-16 13:48:10.207	
"Lodging Source: accessibility_scan (56/16)"
2025-06-16 13:48:10.207	
"completed": [
2025-06-16 13:48:10.207	
[2025-06-16T20:48:10.207Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:47:58.803	
[2025-06-16T20:47:58.803Z] [accessibilityScan] Starting accessibility scan for domain="lodging-source.com"
2025-06-16 13:47:58.803	
[2025-06-16T20:47:58.802Z] [worker] [PhPg7gH3YCM] STARTING accessibility compliance scan for lodging-source.com
2025-06-16 13:47:58.803	
[2025-06-16T20:47:58.799Z] [worker] === Running module: accessibility_scan (10/16) ===
2025-06-16 13:47:58.799	
[2025-06-16T20:47:58.799Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:47:58.798	
[2025-06-16T20:47:58.798Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:47:58.797	
[2025-06-16T20:47:58.797Z] [worker] [PhPg7gH3YCM] COMPLETED adversarial media scan: 19 adverse media findings
2025-06-16 13:47:58.797	
[2025-06-16T20:47:58.797Z] [adversarialMediaScan] Adversarial media scan complete: 19 findings generated in 9464ms
2025-06-16 13:47:58.797	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.796	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.795	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.794	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.793	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.791	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.790	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.789	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.788	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.787	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.785	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.784	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.783	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.782	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.780	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.779	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.777	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.777	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.775	
[artifactStore] Inserted finding ADVERSE_MEDIA for artifact 1090
2025-06-16 13:47:58.773	
[artifactStore] Inserted adverse_media_summary artifact: Found 30 adverse media articles across 5 risk categories...
2025-06-16 13:47:58.769	
[2025-06-16T20:47:58.769Z] [adversarialMediaScan] Categorized 30 articles into 5 risk categories
2025-06-16 13:47:58.768	
[2025-06-16T20:47:58.768Z] [adversarialMediaScan] Filtered to 46 recent articles (within 730 days)
2025-06-16 13:47:58.767	
[2025-06-16T20:47:58.767Z] [adversarialMediaScan] Collected 49 unique articles (3 duplicates removed)
2025-06-16 13:47:58.767	
[2025-06-16T20:47:58.767Z] [adversarialMediaScan] Query returned 7 results
2025-06-16 13:47:57.355	
[2025-06-16T20:47:57.354Z] [adversarialMediaScan] Executing search query: ""Lodging Source" CEO OR founder (fraud OR miscondu..."
2025-06-16 13:47:56.352	
[2025-06-16T20:47:56.352Z] [adversarialMediaScan] Query returned 17 results
2025-06-16 13:47:54.882	
[2025-06-16T20:47:54.880Z] [adversarialMediaScan] Executing search query: ""Lodging Source" (bankruptcy OR layoffs OR "financ..."
2025-06-16 13:47:53.880	
[2025-06-16T20:47:53.880Z] [adversarialMediaScan] Query returned 8 results
2025-06-16 13:47:52.901	
[2025-06-16T20:47:52.899Z] [adversarialMediaScan] Executing search query: ""lodging-source.com" (breach OR hack OR "data brea..."
2025-06-16 13:47:51.898	
[2025-06-16T20:47:51.898Z] [adversarialMediaScan] Query returned 20 results
2025-06-16 13:47:49.333	
[2025-06-16T20:47:49.333Z] [adversarialMediaScan] Executing search query: ""Lodging Source" (lawsuit OR "legal action" OR fin..."
2025-06-16 13:47:49.333	
[2025-06-16T20:47:49.333Z] [adversarialMediaScan] Generated 4 search queries
2025-06-16 13:47:49.333	
[2025-06-16T20:47:49.333Z] [adversarialMediaScan] Starting adversarial media scan for company="Lodging Source" domain="lodging-source.com"
2025-06-16 13:47:49.332	
[2025-06-16T20:47:49.332Z] [worker] [PhPg7gH3YCM] STARTING adversarial media scan for Lodging Source
2025-06-16 13:47:49.332	
[2025-06-16T20:47:49.332Z] [worker] === Running module: adversarial_media_scan (9/16) ===
2025-06-16 13:47:49.332	
[2025-06-16T20:47:49.332Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:47:49.331	
[2025-06-16T20:47:49.331Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:47:49.330	
[2025-06-16T20:47:49.329Z] [worker] [PhPg7gH3YCM] COMPLETED AbuseIPDB scan: 0 malicious/suspicious IPs found
2025-06-16 13:47:49.330	
[2025-06-16T20:47:49.329Z] [abuseIntelScan] No IP artifacts found for this scan
2025-06-16 13:47:49.329	
[2025-06-16T20:47:49.329Z] [abuseIntelScan] Found 0 IP artifacts for scan PhPg7gH3YCM
2025-06-16 13:47:49.327	
[2025-06-16T20:47:49.327Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=PhPg7gH3YCM
2025-06-16 13:47:49.327	
[2025-06-16T20:47:49.326Z] [worker] [PhPg7gH3YCM] STARTING AbuseIPDB intelligence scan for IPs
2025-06-16 13:47:49.326	
[2025-06-16T20:47:49.326Z] [worker] === Running module: abuse_intel_scan (8/16) ===
2025-06-16 13:47:49.326	
[2025-06-16T20:47:49.326Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:47:49.260	
[2025-06-16T20:47:49.260Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:47:49.257	
[2025-06-16T20:47:49.257Z] [worker] [PhPg7gH3YCM] COMPLETED tech stack scan: 0 technologies detected
2025-06-16 13:47:49.257	
[2025-06-16T20:47:49.257Z] [techStackScan] techstack=complete artifacts=0 supplyFindings=0 duration=196179ms cacheHitRate=0.0%
2025-06-16 13:47:49.257	
[artifactStore] Inserted techscan_metrics artifact: Technology scan metrics: 0 technologies, 0 supply chain risk...
2025-06-16 13:47:49.255	
[artifactStore] Inserted sbom_cyclonedx artifact: Software Bill of Materials (CycloneDX 1.5) - 0 components...
2025-06-16 13:47:49.171	
[2025-06-16T20:47:49.171Z] [techStackScan] techstack=analysis technologies=0 circuitBreaker=false
2025-06-16 13:47:49.171	
"
2025-06-16 13:47:49.171	
[2025-06-16T20:47:49.171Z] [techStackScan] techstack=error url="https://www.lodging-source.com" error="Command failed: nuclei -u https://www.lodging-source.com -silent -json -t /opt/nuclei-templates/http/technologies/ -no-color
2025-06-16 13:47:49.168	
"
2025-06-16 13:47:49.168	
[2025-06-16T20:47:49.167Z] [techStackScan] techstack=error url="https://lodging-source.com" error="Command failed: nuclei -u https://lodging-source.com -silent -json -t /opt/nuclei-templates/http/technologies/ -no-color
2025-06-16 13:47:46.369	
[2025-06-16T20:47:46.369Z] [techStackScan] techstack=targets primary=2 thirdParty=0 total=2
2025-06-16 13:47:43.567	
[2025-06-16T20:47:43.566Z] [techStackScan] thirdParty=error domain=lodging-source.com error="Network.enable timed out. Increase the 'protocolTimeout' setting in launch/connect calls for a higher timeout if needed."
2025-06-16 13:47:10.179	
}
2025-06-16 13:47:10.179	
"EXPOSED_SERVICE": 1
2025-06-16 13:47:10.179	
[2025-06-16T20:47:10.178Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:47:10.091	
}
2025-06-16 13:47:10.091	
]
2025-06-16 13:47:10.091	
"Lodging Source: tech_stack_scan (37/16)"
2025-06-16 13:47:10.091	
"completed": [
2025-06-16 13:47:10.091	
[2025-06-16T20:47:10.090Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:46:10.269	
}
2025-06-16 13:46:10.269	
"EXPOSED_SERVICE": 1
2025-06-16 13:46:10.269	
[2025-06-16T20:46:10.269Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:46:10.206	
}
2025-06-16 13:46:10.206	
]
2025-06-16 13:46:10.206	
"Lodging Source: tech_stack_scan (37/16)"
2025-06-16 13:46:10.206	
"completed": [
2025-06-16 13:46:10.206	
[2025-06-16T20:46:10.205Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:45:10.136	
}
2025-06-16 13:45:10.136	
"EXPOSED_SERVICE": 1
2025-06-16 13:45:10.136	
[2025-06-16T20:45:10.136Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:45:10.075	
}
2025-06-16 13:45:10.075	
]
2025-06-16 13:45:10.075	
"Lodging Source: tech_stack_scan (37/16)"
2025-06-16 13:45:10.075	
"completed": [
2025-06-16 13:45:10.075	
[2025-06-16T20:45:10.075Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:44:33.201	
[2025-06-16T20:44:33.200Z] [techStackScan] techstack=nuclei binary confirmed
2025-06-16 13:44:33.076	
[2025-06-16T20:44:33.076Z] [techStackScan] techstack=start domain="lodging-source.com"
2025-06-16 13:44:33.075	
[2025-06-16T20:44:33.075Z] [worker] [PhPg7gH3YCM] STARTING tech stack scan for lodging-source.com
2025-06-16 13:44:33.075	
[2025-06-16T20:44:33.075Z] [worker] === Running module: tech_stack_scan (7/16) ===
2025-06-16 13:44:33.075	
[2025-06-16T20:44:33.075Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:44:33.074	
[2025-06-16T20:44:33.073Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:44:33.055	
[2025-06-16T20:44:33.054Z] [worker] [PhPg7gH3YCM] COMPLETED endpoint discovery: 0 endpoint collections found
2025-06-16 13:44:33.055	
[2025-06-16T20:44:33.053Z] [endpointDiscovery] ⇢ done – 0 endpoints
2025-06-16 13:44:10.248	
}
2025-06-16 13:44:10.248	
"EXPOSED_SERVICE": 38
2025-06-16 13:44:10.248	
"PHISHING_SETUP": 1,
2025-06-16 13:44:10.248	
[2025-06-16T20:44:10.248Z] [SyncWorker] ✅ Findings inserted: 39 total {
2025-06-16 13:44:10.175	
}
2025-06-16 13:44:10.175	
]
2025-06-16 13:44:10.175	
"Lodging Source: endpoint_discovery (31/16)"
2025-06-16 13:44:10.175	
"completed": [
2025-06-16 13:44:10.175	
[2025-06-16T20:44:10.174Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:43:57.558	
[2025-06-16T20:43:57.558Z] [endpointDiscovery] ⇢ start lodging-source.com
2025-06-16 13:43:57.558	
[2025-06-16T20:43:57.558Z] [worker] [PhPg7gH3YCM] STARTING endpoint discovery for lodging-source.com
2025-06-16 13:43:57.558	
[2025-06-16T20:43:57.558Z] [worker] === Running module: endpoint_discovery (6/16) ===
2025-06-16 13:43:57.558	
[2025-06-16T20:43:57.558Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:43:57.557	
[2025-06-16T20:43:57.557Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:43:57.554	
[2025-06-16T20:43:57.554Z] [worker] [PhPg7gH3YCM] COMPLETED database scan: 0 database issues found
2025-06-16 13:43:57.554	
[artifactStore] Inserted scan_summary artifact: Database port scan completed: 0 exposed services found...
2025-06-16 13:43:57.535	
[2025-06-16T20:43:57.535Z] [dbPortScan] Completed database scan, found 0 exposed services
2025-06-16 13:43:53.344	
[2025-06-16T20:43:53.343Z] [dbPortScan] [1/8] Scanning lodging-source.com:27017...
2025-06-16 13:43:53.327	
[2025-06-16T20:43:53.327Z] [dbPortScan] [1/8] Scanning lodging-source.com:11211...
2025-06-16 13:43:53.323	
[2025-06-16T20:43:53.323Z] [dbPortScan] [1/8] Scanning lodging-source.com:9200...
2025-06-16 13:43:53.319	
[2025-06-16T20:43:53.319Z] [dbPortScan] [1/8] Scanning lodging-source.com:8086...
2025-06-16 13:43:49.191	
[2025-06-16T20:43:49.191Z] [dbPortScan] [1/8] Scanning lodging-source.com:6379...
2025-06-16 13:43:49.189	
[2025-06-16T20:43:49.187Z] [dbPortScan] [1/8] Scanning lodging-source.com:5432...
2025-06-16 13:43:49.183	
[2025-06-16T20:43:49.182Z] [dbPortScan] [1/8] Scanning lodging-source.com:3306...
2025-06-16 13:43:49.178	
[2025-06-16T20:43:49.176Z] [dbPortScan] [1/8] Scanning lodging-source.com:1433...
2025-06-16 13:43:47.337	
[2025-06-16T20:43:47.337Z] [dbPortScan] Validating dependencies...
2025-06-16 13:43:47.337	
[2025-06-16T20:43:47.337Z] [dbPortScan] Starting enhanced database security scan for lodging-source.com
2025-06-16 13:43:47.337	
[2025-06-16T20:43:47.336Z] [worker] [PhPg7gH3YCM] STARTING database port scan for lodging-source.com
2025-06-16 13:43:47.337	
[2025-06-16T20:43:47.336Z] [worker] === Running module: db_port_scan (5/16) ===
2025-06-16 13:43:47.337	
[2025-06-16T20:43:47.336Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:43:47.335	
[2025-06-16T20:43:47.335Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:43:47.334	
[2025-06-16T20:43:47.333Z] [worker] [PhPg7gH3YCM] COMPLETED Shodan infrastructure scan: 40 services found
2025-06-16 13:43:47.333	
[worker] Findings: 40
2025-06-16 13:43:47.333	
[worker] Duration: 1566 ms
2025-06-16 13:43:47.333	
[worker] ✅ SHODAN SCAN COMPLETED
2025-06-16 13:43:47.333	
[2025-06-16T20:43:47.333Z] [Shodan] Done — 40 rows persisted
2025-06-16 13:43:47.333	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 40 items...
2025-06-16 13:43:47.332	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.330	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.329	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.328	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.327	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.326	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.324	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.323	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.322	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.321	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.320	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.319	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.318	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.317	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.316	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.314	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.313	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.312	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.311	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.310	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.309	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.308	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1085
2025-06-16 13:43:47.307	
[artifactStore] Inserted shodan_service artifact: 74.208.42.246:443 Apache httpd 2.4.62...
2025-06-16 13:43:47.306	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.304	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.300	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.298	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.297	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.296	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.295	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.294	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.293	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.292	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.291	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.289	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.288	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.287	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.286	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.285	
[artifactStore] Inserted finding EXPOSED_SERVICE for artifact 1084
2025-06-16 13:43:47.283	
[artifactStore] Inserted shodan_service artifact: 70.35.206.233:443 Apache httpd 2.4.62...
2025-06-16 13:43:45.770	
[2025-06-16T20:43:45.770Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-06-16 13:43:45.768	
[2025-06-16T20:43:45.768Z] [Shodan] Start scan for lodging-source.com
2025-06-16 13:43:45.767	
[worker] 🔍 SHODAN SCAN STARTING
2025-06-16 13:43:45.767	
[2025-06-16T20:43:45.767Z] [worker] [PhPg7gH3YCM] STARTING Shodan scan for lodging-source.com
2025-06-16 13:43:45.767	
[2025-06-16T20:43:45.767Z] [worker] === Running module: shodan (4/16) ===
2025-06-16 13:43:45.767	
[2025-06-16T20:43:45.767Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:43:45.766	
[2025-06-16T20:43:45.766Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:43:45.764	
[2025-06-16T20:43:45.763Z] [worker] [PhPg7gH3YCM] COMPLETED document exposure: 0 discoveries
2025-06-16 13:43:45.763	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-06-16 13:43:10.077	
}
2025-06-16 13:43:10.077	
"PHISHING_SETUP": 1
2025-06-16 13:43:10.077	
[2025-06-16T20:43:10.077Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:43:10.014	
}
2025-06-16 13:43:10.014	
]
2025-06-16 13:43:10.014	
"Lodging Source: document_exposure (12/16)"
2025-06-16 13:43:10.014	
"completed": [
2025-06-16 13:43:10.014	
[2025-06-16T20:43:10.014Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:43:00.167	
[2025-06-16T20:43:00.167Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:42:37.052	
[2025-06-16T20:42:37.052Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:42:33.657	
[2025-06-16T20:42:33.656Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:42:33.074	
[2025-06-16T20:42:33.074Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:42:32.751	
[2025-06-16T20:42:32.751Z] [documentExposure] process error: Request failed with status code 403
2025-06-16 13:42:32.044	
[2025-06-16T20:42:32.044Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:42:27.955	
[2025-06-16T20:42:27.953Z] [documentExposure] process error: Request failed with status code 403
2025-06-16 13:42:26.979	
[2025-06-16T20:42:26.978Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:42:26.144	
[2025-06-16T20:42:26.144Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:42:24.599	
[2025-06-16T20:42:24.599Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:42:23.738	
[2025-06-16T20:42:23.738Z] [documentExposure] process error: timeout of 30000ms exceeded
2025-06-16 13:42:10.320	
}
2025-06-16 13:42:10.320	
"PHISHING_SETUP": 2
2025-06-16 13:42:10.320	
[2025-06-16T20:42:10.320Z] [SyncWorker] ✅ Findings inserted: 2 total {
2025-06-16 13:42:10.255	
}
2025-06-16 13:42:10.255	
]
2025-06-16 13:42:10.255	
"Lodging Source: document_exposure (12/16)"
2025-06-16 13:42:10.255	
"completed": [
2025-06-16 13:42:10.255	
[2025-06-16T20:42:10.255Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:41:43.711	
[2025-06-16T20:41:43.711Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-06-16 13:41:35.630	
[2025-06-16T20:41:35.629Z] [worker] [PhPg7gH3YCM] STARTING document exposure scan for Lodging Source
2025-06-16 13:41:35.630	
[2025-06-16T20:41:35.629Z] [worker] [PhPg7gH3YCM] STARTING document exposure scan for Lodging Source
2025-06-16 13:41:35.630	
[2025-06-16T20:41:35.629Z] [worker] === Running module: document_exposure (3/16) ===
2025-06-16 13:41:35.630	
[2025-06-16T20:41:35.629Z] [worker] === Running module: document_exposure (3/16) ===
2025-06-16 13:41:35.629	
[2025-06-16T20:41:35.629Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:41:35.629	
[2025-06-16T20:41:35.629Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:41:35.628	
[2025-06-16T20:41:35.627Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:41:35.628	
[2025-06-16T20:41:35.627Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:41:35.624	
[2025-06-16T20:41:35.623Z] [worker] [PhPg7gH3YCM] COMPLETED DNS Twist: 5 typo-domains found
2025-06-16 13:41:35.624	
[2025-06-16T20:41:35.623Z] [worker] [PhPg7gH3YCM] COMPLETED DNS Twist: 5 typo-domains found
2025-06-16 13:41:35.624	
[2025-06-16T20:41:35.623Z] [dnstwist] Scan completed – 5 domains analysed
2025-06-16 13:41:35.624	
[2025-06-16T20:41:35.623Z] [dnstwist] Scan completed – 5 domains analysed
2025-06-16 13:41:35.623	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 1082
2025-06-16 13:41:35.623	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 1082
2025-06-16 13:41:35.621	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgings...
2025-06-16 13:41:35.621	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgings...
2025-06-16 13:41:10.129	
}
2025-06-16 13:41:10.129	
"PHISHING_SETUP": 1
2025-06-16 13:41:10.129	
[2025-06-16T20:41:10.128Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:41:10.059	
}
2025-06-16 13:41:10.059	
]
2025-06-16 13:41:10.059	
"Lodging Source: dns_twist (6/16)"
2025-06-16 13:41:10.059	
"completed": [
2025-06-16 13:41:10.059	
[2025-06-16T20:41:10.058Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:40:10.157	
}
2025-06-16 13:40:10.157	
"PHISHING_SETUP": 4
2025-06-16 13:40:10.157	
"EMAIL_SECURITY_WEAKNESS": 1,
2025-06-16 13:40:10.157	
[2025-06-16T20:40:10.157Z] [SyncWorker] ✅ Findings inserted: 5 total {
2025-06-16 13:40:10.098	
}
2025-06-16 13:40:10.098	
]
2025-06-16 13:40:10.098	
"Lodging Source: dns_twist (6/16)"
2025-06-16 13:40:10.098	
"completed": [
2025-06-16 13:40:10.098	
[2025-06-16T20:40:10.098Z] [SyncWorker] ✅ Module progress updated for 1 scans {
2025-06-16 13:39:15.472	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 1081
2025-06-16 13:39:15.471	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-16 13:39:14.548	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 1080
2025-06-16 13:39:14.547	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodgin.g...
2025-06-16 13:39:14.153	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 1079
2025-06-16 13:39:14.150	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-16 13:39:13.139	
[artifactStore] Inserted finding PHISHING_SETUP for artifact 1078
2025-06-16 13:39:13.137	
[artifactStore] Inserted typo_domain artifact: Potentially malicious typosquatted domain detected: lodging-...
2025-06-16 13:39:11.142	
[2025-06-16T20:39:11.142Z] [dnstwist] Batch 1/1
2025-06-16 13:39:10.251	
}
2025-06-16 13:39:10.251	
"EMAIL_SECURITY_WEAKNESS": 1
2025-06-16 13:39:10.251	
[2025-06-16T20:39:10.251Z] [SyncWorker] ✅ Findings inserted: 1 total {
2025-06-16 13:39:10.114	
}
2025-06-16 13:39:10.114	
]
2025-06-16 13:39:10.114	
"Lodging Source: dns_twist (6/16)"
2025-06-16 13:39:10.114	
"Lodging Source: trufflehog (100/16)",
2025-06-16 13:39:10.114	
"completed": [
2025-06-16 13:39:10.114	
[2025-06-16T20:39:10.113Z] [SyncWorker] ✅ Module progress updated for 2 scans {
2025-06-16 13:38:27.151	
[2025-06-16T20:38:27.151Z] [dnstwist] Starting typosquat scan for lodging-source.com
2025-06-16 13:38:27.151	
[2025-06-16T20:38:27.151Z] [worker] [PhPg7gH3YCM] STARTING DNS Twist scan for lodging-source.com
2025-06-16 13:38:27.151	
[2025-06-16T20:38:27.151Z] [worker] === Running module: dns_twist (2/16) ===
2025-06-16 13:38:27.151	
[2025-06-16T20:38:27.151Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:38:27.149	
[2025-06-16T20:38:27.149Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: progress
2025-06-16 13:38:27.148	
[2025-06-16T20:38:27.148Z] [worker] [PhPg7gH3YCM] COMPLETED SpiderFoot discovery: 7 targets found
2025-06-16 13:38:27.148	
[2025-06-16T20:38:27.148Z] [SpiderFoot] ✔️ Completed – 7 artifacts
2025-06-16 13:38:27.148	
[artifactStore] Inserted scan_summary artifact: SpiderFoot scan completed: 7 artifacts...
2025-06-16 13:38:27.146	
[artifactStore] Inserted intel artifact: GoDaddy.com, LLC...
2025-06-16 13:38:27.145	
Registry Domain ID: 1...
2025-06-16 13:38:27.145	
[artifactStore] Inserted intel artifact:    Domain Name: LODGING-SOURCE.COM
2025-06-16 13:38:27.143	
[artifactStore] Inserted intel artifact: support@lodging-source.com...
2025-06-16 13:38:27.142	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-16 13:38:27.140	
[artifactStore] Inserted intel artifact: 74.208.42.246...
2025-06-16 13:38:27.139	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-16 13:38:27.137	
[artifactStore] Inserted intel artifact: lodging-source.com...
2025-06-16 13:38:27.132	
[2025-06-16T20:38:27.132Z] [SpiderFoot] Raw output size: 8032 bytes
2025-06-16 13:38:18.960	
[2025-06-16T20:38:18.959Z] [SpiderFoot] Command: python3 /opt/spiderfoot/sf.py -q -s lodging-source.com -m sfp_crtsh,sfp_censys,sfp_sublist3r,sfp_shodan,sfp_chaos,sfp_r7_dns,sfp_haveibeenpwnd,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei,sfp_whois,sfp_dnsresolve -o json
2025-06-16 13:38:18.959	
[2025-06-16T20:38:18.958Z] [SpiderFoot] API keys: Shodan ✅, Censys ✅, HIBP ✅, Chaos ✅
2025-06-16 13:38:18.955	
[2025-06-16T20:38:18.955Z] [SpiderFoot] Starting scan for lodging-source.com (scanId=PhPg7gH3YCM)
2025-06-16 13:38:18.955	
[2025-06-16T20:38:18.955Z] [worker] [PhPg7gH3YCM] STARTING SpiderFoot discovery for lodging-source.com
2025-06-16 13:38:18.955	
[2025-06-16T20:38:18.954Z] [worker] === Running module: spiderfoot (1/16) ===
2025-06-16 13:38:18.955	
[2025-06-16T20:38:18.954Z] [worker] [updateScanMasterStatus] Updated scan PhPg7gH3YCM with: status, current_module, progress
2025-06-16 13:38:18.950	
[queue] Updated job PhPg7gH3YCM status: processing - Comprehensive security discovery in progress...
2025-06-16 13:38:18.802	
[2025-06-16T20:38:18.801Z] [worker] Processing comprehensive security scan for Lodging Source (lodging-source.com)
2025-06-16 13:38:18.802	
[2025-06-16T20:38:18.801Z] [worker] ✅ JOB PICKED UP: Processing scan job PhPg7gH3YCM for Lodging Source (lodging-source.com)
2025-06-16 13:38:18.802	
[2025-06-16T20:38:18.800Z] [worker] Processing scan job: PhPg7gH3YCM
2025-06-16 13:38:18.800	
}
2025-06-16 13:38:18.800	
createdAt: '2025-06-16T20:38:15.910Z'
2025-06-16 13:38:18.800	
domain: 'lodging-source.com',
2025-06-16 13:38:18.800	
companyName: 'Lodging Source',
2025-06-16 13:38:18.800	
id: 'PhPg7gH3YCM',