2025-07-02 12:51:15.735	
[2025-07-02T19:51:15.735Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Lodging Source: 12 verified findings, 22 artifacts across 12 security modules
2025-07-02 12:51:15.735	
[queue] Released lock for job 3SGBBEAKK63
2025-07-02 12:51:15.367	
[queue] Updated job 3SGBBEAKK63 status: done - Comprehensive security scan completed - 12 verified findings across 12 security modules. Findings ready for processing.
2025-07-02 12:51:14.991	
[2025-07-02T19:51:14.991Z] [worker] [updateScanMasterStatus] Updated scan 3SGBBEAKK63 with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-07-02 12:51:14.981	
[2025-07-02T19:51:14.981Z] [worker] [processScan] Counted 22 artifacts for scan 3SGBBEAKK63
2025-07-02 12:51:14.980	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED abuse_intel_scan scan: 0 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] WAITING for abuse_intel_scan scan to complete...
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED tech_stack_scan scan: 1 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] WAITING for tech_stack_scan scan to complete...
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED nuclei scan: 0 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] WAITING for nuclei scan to complete...
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED accessibility_scan scan: 0 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] WAITING for accessibility_scan scan to complete...
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED trufflehog scan: 0 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] WAITING for trufflehog scan to complete...
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED spf_dmarc scan: 1 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] WAITING for spf_dmarc scan to complete...
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED tls_scan scan: 3 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] WAITING for tls_scan scan to complete...
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED document_exposure scan: 0 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] WAITING for document_exposure scan to complete...
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [worker] [3SGBBEAKK63] COMPLETED dns_twist scan: 5 findings found
2025-07-02 12:51:14.979	
[2025-07-02T19:51:14.979Z] [dnstwist] Scan completed – 5 domains analysed
2025-07-02 12:51:14.955	
[2025-07-02T19:51:14.955Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-02 12:51:14.955	
[2025-07-02T19:51:14.955Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:51:14.955	
Saved $0.028 vs WhoisXML
2025-07-02 12:51:14.955	
[2025-07-02T19:51:14.955Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:49:34.002	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-07-02 12:49:33.982	
[2025-07-02T19:49:33.982Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-07-02 12:49:33.982	
[2025-07-02T19:49:33.982Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-07-02 12:49:33.982	
[2025-07-02T19:49:33.982Z] [nuclei] [Two-Pass Scan] No findings for https://lodging-source.com
2025-07-02 12:49:33.982	
[2025-07-02T19:49:33.982Z] [nucleiWrapper] Two-pass scan completed: 0 findings persisted as artifacts (baseline: 0, common+tech: 0)
2025-07-02 12:49:33.982	
[2025-07-02T19:49:33.982Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-02 12:49:33.975	
[2025-07-02T19:49:33.975Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-02 12:49:13.972	
[2025-07-02T19:49:13.972Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-02 12:49:13.972	
[2025-07-02T19:49:13.972Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-02 12:49:13.967	
[2025-07-02T19:49:13.967Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 1
2025-07-02 12:49:13.967	
[2025-07-02T19:49:13.967Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-02 12:49:13.967	
[2025-07-02T19:49:13.967Z] [nucleiWrapper] Detected technologies: none
2025-07-02 12:49:13.967	
[2025-07-02T19:49:13.966Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-02 12:49:13.959	
[2025-07-02T19:49:13.959Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-02 12:49:11.856	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-07-02 12:49:11.836	
[2025-07-02T19:49:11.836Z] [documentExposure] Completed: 0 files found, 10 parallel Serper calls (~$0.030)
2025-07-02 12:49:10.004	
[2025-07-02T19:49:10.004Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-02 12:49:08.154	
}
2025-07-02 12:49:08.154	
"CRITICAL_INFOSTEALER": 4
2025-07-02 12:49:08.154	
"MEDIUM_EMAIL_EXPOSED": 224,
2025-07-02 12:49:08.154	
"HIGH_PASSWORD_EXPOSED": 24,
2025-07-02 12:49:08.154	
[2025-07-02T19:49:08.153Z] [SyncWorker] ✅ New compromised credentials synced: 252 {
2025-07-02 12:49:08.002	
}
2025-07-02 12:49:08.002	
"PHISHING_SETUP": 4
2025-07-02 12:49:08.002	
"MISSING_TLS_CERTIFICATE": 1,
2025-07-02 12:49:08.002	
"TLS_CONFIGURATION_ISSUE": 2,
2025-07-02 12:49:08.002	
"EMAIL_BREACH_EXPOSURE": 1,
2025-07-02 12:49:08.002	
"CRITICAL_BREACH_EXPOSURE": 1,
2025-07-02 12:49:08.002	
"PASSWORD_BREACH_EXPOSURE": 1,
2025-07-02 12:49:08.002	
"EMAIL_SECURITY_WEAKNESS": 1,
2025-07-02 12:49:08.002	
[2025-07-02T19:49:08.002Z] [SyncWorker] ✅ New findings synced: 11 {
2025-07-02 12:49:07.028	
[2025-07-02T19:49:07.027Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-02 12:49:06.212	
[2025-07-02T19:49:06.212Z] [documentExposure] process error: Request failed with status code 403
2025-07-02 12:49:05.803	
[2025-07-02T19:49:05.802Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-02 12:49:04.908	
[2025-07-02T19:49:04.908Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-02 12:49:03.788	
[2025-07-02T19:49:03.788Z] [documentExposure] process error: Request failed with status code 403
2025-07-02 12:49:01.924	
[2025-07-02T19:49:01.924Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-02 12:49:01.336	
[2025-07-02T19:49:01.336Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-02 12:49:00.462	
[2025-07-02T19:49:00.462Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-02 12:49:00.462	
[2025-07-02T19:49:00.462Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:49:00.462	
Saved $0.028 vs WhoisXML
2025-07-02 12:49:00.462	
[2025-07-02T19:49:00.461Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:49:00.173	
[2025-07-02T19:49:00.173Z] [documentExposure] process error: Please provide binary data as `Uint8Array`, rather than `Buffer`.
2025-07-02 12:49:00.107	
[2025-07-02T19:49:00.107Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-02 12:49:00.107	
[2025-07-02T19:49:00.107Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:49:00.107	
Saved $0.028 vs WhoisXML
2025-07-02 12:49:00.107	
[2025-07-02T19:49:00.106Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:48:59.833	
[2025-07-02T19:48:59.833Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-02 12:48:59.833	
[2025-07-02T19:48:59.833Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:48:59.833	
Saved $0.028 vs WhoisXML
2025-07-02 12:48:59.833	
[2025-07-02T19:48:59.832Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:48:59.584	
[2025-07-02T19:48:59.581Z] [documentExposure] process error: timeout of 30000ms exceeded
2025-07-02 12:48:59.456	
[2025-07-02T19:48:59.456Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-02 12:48:59.456	
[2025-07-02T19:48:59.456Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:48:59.456	
Saved $0.028 vs WhoisXML
2025-07-02 12:48:59.456	
[2025-07-02T19:48:59.456Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:48:58.945	
[2025-07-02T19:48:58.945Z] [techStackScan] techstack=complete arts=1 time=5131ms
2025-07-02 12:48:58.937	
[2025-07-02T19:48:58.937Z] [techStackScan] techstack=sbom_generated components=1 vulnerabilities=0 critical=0
2025-07-02 12:48:58.937	
[2025-07-02T19:48:58.936Z] [sbomGenerator] SBOM generated: 1 components, 0 vulnerabilities
2025-07-02 12:48:58.936	
[2025-07-02T19:48:58.936Z] [sbomGenerator] Generating SBOM for lodging-source.com with 1 components
2025-07-02 12:48:58.936	
[2025-07-02T19:48:58.935Z] [osvIntegration] No components suitable for OSV.dev queries
2025-07-02 12:48:58.935	
[2025-07-02T19:48:58.935Z] [techStackScan] techstack=osv_enhancement starting OSV.dev integration for 1 components
2025-07-02 12:48:58.935	
[2025-07-02T19:48:58.935Z] [versionMatcher] Batch vulnerability analysis completed: 0 vulnerabilities across 1 components in 10ms
2025-07-02 12:48:58.935	
[2025-07-02T19:48:58.935Z] [versionMatcher] Vulnerability matching completed for Apache HTTP Server: 0 matches in 9ms
2025-07-02 12:48:58.935	
[2025-07-02T19:48:58.934Z] [nvdMirror] Local CVE query completed: 0 results in 8ms
2025-07-02 12:48:58.935	
extra argument: "DISTINCT"
2025-07-02 12:48:58.935	
JOIN cpe_matches cm ON v.cve_id = cm.cve_id WHERE cm.cpe_uri LIKE '%http_server%' AND cm.vulnerable = 1 ORDER BY v.cvss_v3_score DESC, v.published_date DESC LIMIT 100
2025-07-02 12:48:58.935	
FROM vulnerabilities v
2025-07-02 12:48:58.935	
v.severity, v.cisa_kev, v.epss_score, v.references_json
2025-07-02 12:48:58.935	
v.cvss_v3_score, v.cvss_v3_vector, v.cvss_v2_score, v.cvss_v2_vector,
2025-07-02 12:48:58.935	
SELECT DISTINCT v.cve_id, v.description, v.published_date, v.last_modified_date,
2025-07-02 12:48:58.934	
[2025-07-02T19:48:58.934Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-02 12:48:58.934	
extra argument: "DISTINCT"
2025-07-02 12:48:58.934	
JOIN cpe_matches cm ON v.cve_id = cm.cve_id WHERE cm.cpe_uri LIKE '%http_server%' AND cm.vulnerable = 1 ORDER BY v.cvss_v3_score DESC, v.published_date DESC LIMIT 100
2025-07-02 12:48:58.934	
FROM vulnerabilities v
2025-07-02 12:48:58.934	
v.severity, v.cisa_kev, v.epss_score, v.references_json
2025-07-02 12:48:58.934	
v.cvss_v3_score, v.cvss_v3_vector, v.cvss_v2_score, v.cvss_v2_vector,
2025-07-02 12:48:58.934	
SELECT DISTINCT v.cve_id, v.description, v.published_date, v.last_modified_date,
2025-07-02 12:48:58.934	
[2025-07-02T19:48:58.934Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-02 12:48:58.926	
[2025-07-02T19:48:58.926Z] [versionMatcher] Finding vulnerabilities for Apache HTTP Server@2.4.62
2025-07-02 12:48:58.926	
[2025-07-02T19:48:58.925Z] [versionMatcher] Starting batch vulnerability analysis for 1 components
2025-07-02 12:48:58.926	
[2025-07-02T19:48:58.925Z] [cpeNormalization] normalized tech="Apache HTTP Server" version="2.4.62" cpe="cpe:2.3:a:apache:http_server:2.4.62:*:*:*:*:*:*:*" purl="undefined" confidence=80
2025-07-02 12:48:58.925	
[2025-07-02T19:48:58.925Z] [techStackScan] techstack=vuln_analysis starting enhanced vulnerability analysis for 1 technologies
2025-07-02 12:48:58.925	
[2025-07-02T19:48:58.925Z] [techStackScan] analysis=stats tech="Apache HTTP Server" version="2.4.62" raw=0 enriched=0 merged=0 filtered=0
2025-07-02 12:48:58.923	
[2025-07-02T19:48:58.922Z] [techStackScan] techstack=fast_detection_complete total_techs=1 total_duration=0ms avg_per_url=0ms
2025-07-02 12:48:58.923	
[2025-07-02T19:48:58.922Z] [faviconDetection] Batch favicon detection completed: 0 technologies detected across 3 URLs in 249ms
2025-07-02 12:48:58.922	
[2025-07-02T19:48:58.922Z] [faviconDetection] No favicon found for https://lodging-source.com/index.html
2025-07-02 12:48:58.922	
[2025-07-02T19:48:58.922Z] [faviconDetection] Failed to fetch favicon from https://lodging-source.com/index.html/apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-02 12:48:58.922	
[2025-07-02T19:48:58.921Z] [faviconDetection] No favicon found for https://lodging-source.com
2025-07-02 12:48:58.921	
[2025-07-02T19:48:58.921Z] [faviconDetection] Failed to fetch favicon from https://lodging-source.com/apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-02 12:48:58.887	
[2025-07-02T19:48:58.887Z] [faviconDetection] No favicon found for https://www.lodging-source.com
2025-07-02 12:48:58.887	
[2025-07-02T19:48:58.887Z] [faviconDetection] Failed to fetch favicon from https://www.lodging-source.com/apple-touch-icon-precomposed.png: Request failed with status code 404
2025-07-02 12:48:58.861	
[2025-07-02T19:48:58.861Z] [faviconDetection] Fetching favicon from https://lodging-source.com/index.html/apple-touch-icon-precomposed.png
2025-07-02 12:48:58.861	
[2025-07-02T19:48:58.861Z] [faviconDetection] Failed to fetch favicon from https://lodging-source.com/index.html/apple-touch-icon.png: Request failed with status code 404
2025-07-02 12:48:58.859	
[2025-07-02T19:48:58.859Z] [faviconDetection] Fetching favicon from https://lodging-source.com/apple-touch-icon-precomposed.png
2025-07-02 12:48:58.859	
[2025-07-02T19:48:58.859Z] [faviconDetection] Failed to fetch favicon from https://lodging-source.com/apple-touch-icon.png: Request failed with status code 404
2025-07-02 12:48:58.833	
[2025-07-02T19:48:58.833Z] [faviconDetection] Fetching favicon from https://www.lodging-source.com/apple-touch-icon-precomposed.png
2025-07-02 12:48:58.833	
[2025-07-02T19:48:58.833Z] [faviconDetection] Failed to fetch favicon from https://www.lodging-source.com/apple-touch-icon.png: Request failed with status code 404
2025-07-02 12:48:58.798	
[2025-07-02T19:48:58.798Z] [faviconDetection] Fetching favicon from https://lodging-source.com/index.html/apple-touch-icon.png
2025-07-02 12:48:58.798	
[2025-07-02T19:48:58.798Z] [faviconDetection] Failed to fetch favicon from https://lodging-source.com/index.html/favicon.png: Request failed with status code 404
2025-07-02 12:48:58.797	
[2025-07-02T19:48:58.797Z] [faviconDetection] Fetching favicon from https://lodging-source.com/apple-touch-icon.png
2025-07-02 12:48:58.797	
[2025-07-02T19:48:58.797Z] [faviconDetection] Failed to fetch favicon from https://lodging-source.com/favicon.png: Request failed with status code 404
2025-07-02 12:48:58.780	
[2025-07-02T19:48:58.780Z] [faviconDetection] Fetching favicon from https://www.lodging-source.com/apple-touch-icon.png
2025-07-02 12:48:58.780	
[2025-07-02T19:48:58.780Z] [faviconDetection] Failed to fetch favicon from https://www.lodging-source.com/favicon.png: Request failed with status code 404
2025-07-02 12:48:58.736	
[2025-07-02T19:48:58.736Z] [faviconDetection] Fetching favicon from https://lodging-source.com/index.html/favicon.png
2025-07-02 12:48:58.736	
[2025-07-02T19:48:58.736Z] [faviconDetection] Failed to fetch favicon from https://lodging-source.com/index.html/favicon.ico: Request failed with status code 404
2025-07-02 12:48:58.736	
[2025-07-02T19:48:58.735Z] [faviconDetection] Fetching favicon from https://lodging-source.com/favicon.png
2025-07-02 12:48:58.736	
[2025-07-02T19:48:58.735Z] [faviconDetection] Failed to fetch favicon from https://lodging-source.com/favicon.ico: Request failed with status code 404
2025-07-02 12:48:58.727	
[2025-07-02T19:48:58.727Z] [faviconDetection] Fetching favicon from https://www.lodging-source.com/favicon.png
2025-07-02 12:48:58.727	
[2025-07-02T19:48:58.727Z] [faviconDetection] Failed to fetch favicon from https://www.lodging-source.com/favicon.ico: Request failed with status code 404
2025-07-02 12:48:58.674	
[2025-07-02T19:48:58.674Z] [faviconDetection] Fetching favicon from https://lodging-source.com/index.html/favicon.ico
2025-07-02 12:48:58.674	
[2025-07-02T19:48:58.674Z] [faviconDetection] Starting favicon-based tech detection for https://lodging-source.com/index.html
2025-07-02 12:48:58.673	
[2025-07-02T19:48:58.673Z] [faviconDetection] Fetching favicon from https://www.lodging-source.com/favicon.ico
2025-07-02 12:48:58.673	
[2025-07-02T19:48:58.673Z] [faviconDetection] Starting favicon-based tech detection for https://www.lodging-source.com
2025-07-02 12:48:58.673	
[2025-07-02T19:48:58.673Z] [faviconDetection] Fetching favicon from https://lodging-source.com/favicon.ico
2025-07-02 12:48:58.673	
[2025-07-02T19:48:58.673Z] [faviconDetection] Starting favicon-based tech detection for https://lodging-source.com
2025-07-02 12:48:58.673	
[2025-07-02T19:48:58.672Z] [faviconDetection] Starting batch favicon detection for 3 URLs
2025-07-02 12:48:58.673	
[2025-07-02T19:48:58.672Z] [techStackScan] techstack=favicon_detection starting favicon analysis for 3 URLs
2025-07-02 12:48:58.673	
[2025-07-02T19:48:58.672Z] [cpeNormalization] normalized tech="Apache HTTP Server" version="2.4.62" cpe="cpe:2.3:a:apache:http_server:2.4.62:*:*:*:*:*:*:*" purl="undefined" confidence=80
2025-07-02 12:48:58.672	
[2025-07-02T19:48:58.672Z] [techStackScan] techstack=webtech_success url="https://lodging-source.com/home.html" techs=1 duration=0ms
2025-07-02 12:48:58.672	
[2025-07-02T19:48:58.672Z] [cpeNormalization] normalized tech="Apache HTTP Server" version="2.4.62" cpe="cpe:2.3:a:apache:http_server:2.4.62:*:*:*:*:*:*:*" purl="undefined" confidence=80
2025-07-02 12:48:58.672	
[2025-07-02T19:48:58.672Z] [techStackScan] techstack=webtech_success url="https://lodging-source.com/" techs=1 duration=0ms
2025-07-02 12:48:58.672	
[2025-07-02T19:48:58.672Z] [cpeNormalization] normalized tech="Apache HTTP Server" version="2.4.62" cpe="cpe:2.3:a:apache:http_server:2.4.62:*:*:*:*:*:*:*" purl="undefined" confidence=80
2025-07-02 12:48:58.672	
[2025-07-02T19:48:58.672Z] [techStackScan] techstack=webtech_success url="https://lodging-source.com/index.html" techs=1 duration=0ms
2025-07-02 12:48:58.672	
[2025-07-02T19:48:58.672Z] [cpeNormalization] normalized tech="Apache HTTP Server" version="2.4.62" cpe="cpe:2.3:a:apache:http_server:2.4.62:*:*:*:*:*:*:*" purl="undefined" confidence=80
2025-07-02 12:48:58.672	
[2025-07-02T19:48:58.672Z] [techStackScan] techstack=webtech_success url="https://www.lodging-source.com" techs=1 duration=0ms
2025-07-02 12:48:58.672	
[2025-07-02T19:48:58.671Z] [cpeNormalization] normalized tech="Apache HTTP Server" version="2.4.62" cpe="cpe:2.3:a:apache:http_server:2.4.62:*:*:*:*:*:*:*" purl="undefined" confidence=80
2025-07-02 12:48:58.671	
[2025-07-02T19:48:58.671Z] [techStackScan] techstack=webtech_success url="https://lodging-source.com" techs=1 duration=0ms
2025-07-02 12:48:58.671	
[2025-07-02T19:48:58.671Z] [fastTechDetection] Batch fast tech detection completed: 5 techs across 5 URLs in 229ms
2025-07-02 12:48:58.671	
[2025-07-02T19:48:58.671Z] [fastTechDetection] Header detection found 1 techs, skipping WebTech for https://lodging-source.com
2025-07-02 12:48:58.671	
[2025-07-02T19:48:58.671Z] [fastTechDetection] Header detection found 1 technologies for https://lodging-source.com
2025-07-02 12:48:58.670	
[2025-07-02T19:48:58.670Z] [fastTechDetection] Header detection found 1 techs, skipping WebTech for https://lodging-source.com/home.html
2025-07-02 12:48:58.670	
[2025-07-02T19:48:58.670Z] [fastTechDetection] Header detection found 1 technologies for https://lodging-source.com/home.html
2025-07-02 12:48:58.670	
[2025-07-02T19:48:58.670Z] [fastTechDetection] Header detection found 1 techs, skipping WebTech for https://lodging-source.com/
2025-07-02 12:48:58.670	
[2025-07-02T19:48:58.670Z] [fastTechDetection] Header detection found 1 technologies for https://lodging-source.com/
2025-07-02 12:48:58.650	
[2025-07-02T19:48:58.649Z] [fastTechDetection] Header detection found 1 techs, skipping WebTech for https://lodging-source.com/index.html
2025-07-02 12:48:58.650	
[2025-07-02T19:48:58.649Z] [fastTechDetection] Header detection found 1 technologies for https://lodging-source.com/index.html
2025-07-02 12:48:58.649	
[2025-07-02T19:48:58.649Z] [fastTechDetection] Header detection found 1 techs, skipping WebTech for https://www.lodging-source.com
2025-07-02 12:48:58.649	
[2025-07-02T19:48:58.649Z] [fastTechDetection] Header detection found 1 technologies for https://www.lodging-source.com
2025-07-02 12:48:58.510	
[2025-07-02T19:48:58.507Z] [dnstwist] Batch 1/1
2025-07-02 12:48:58.510	
[2025-07-02T19:48:58.507Z] [dnstwist] Found 5 registered typosquat candidates to analyze
2025-07-02 12:48:58.453	
[2025-07-02T19:48:58.452Z] [fastTechDetection] Checking headers for quick tech detection: https://lodging-source.com/home.html
2025-07-02 12:48:58.451	
[2025-07-02T19:48:58.450Z] [fastTechDetection] Checking headers for quick tech detection: https://lodging-source.com/
2025-07-02 12:48:58.447	
[2025-07-02T19:48:58.447Z] [fastTechDetection] Checking headers for quick tech detection: https://lodging-source.com/index.html
2025-07-02 12:48:58.444	
[2025-07-02T19:48:58.444Z] [fastTechDetection] Checking headers for quick tech detection: https://www.lodging-source.com
2025-07-02 12:48:58.444	
[2025-07-02T19:48:58.442Z] [fastTechDetection] Checking headers for quick tech detection: https://lodging-source.com
2025-07-02 12:48:58.444	
[2025-07-02T19:48:58.442Z] [fastTechDetection] Starting batch fast tech detection for 5 URLs
2025-07-02 12:48:58.444	
[2025-07-02T19:48:58.442Z] [techStackScan] techstack=fast_detection starting WebTech scan for 6 targets
2025-07-02 12:48:58.444	
[2025-07-02T19:48:58.442Z] [techStackScan] techstack=bypass_nuclei targets=[https://lodging-source.com/direct/index.php, https://lodging-source.com//www.youtube.com/player_api, https://lodging-source.com/direct//, https://maxcdn.bootstrapcdn.com] (~2min time savings by skipping expensive non-HTML assets)
2025-07-02 12:48:58.444	
[2025-07-02T19:48:58.442Z] [techStackScan] techstack=targets primary=8 thirdParty=2 total=10 html=6 finalHtml=6 nonHtml=4 skipped=0
2025-07-02 12:48:58.409	
[2025-07-02T19:48:58.408Z] [dynamicBrowser] Page operation completed in 4324ms
2025-07-02 12:48:58.409	
[2025-07-02T19:48:58.408Z] [techStackScan] thirdParty=discovered domain=lodging-source.com total=2 (html=1, nonHtml=1)
2025-07-02 12:48:54.321	
[2025-07-02T19:48:54.321Z] [dynamicBrowser] Metrics: browser_rss_mb=201, heap_used_mb=80, pages_open=1
2025-07-02 12:48:53.979	
[2025-07-02T19:48:53.978Z] [techStackScan] buildTargets discovered=6 total=8 (html=5, nonHtml=3)
2025-07-02 12:48:53.972	
[2025-07-02T19:48:53.972Z] [techStackScan] techstack=nuclei wrapper confirmed available
2025-07-02 12:48:53.972	
[2025-07-02T19:48:53.972Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-02 12:48:53.972	
[INF] PDCP Directory: /root/.pdcp
2025-07-02 12:48:53.972	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-02 12:48:53.972	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-02 12:48:53.972	
[2025-07-02T19:48:53.971Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-02 12:48:53.957	
[2025-07-02T19:48:53.956Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-02 12:48:53.957	
[2025-07-02T19:48:53.956Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-02 12:48:53.951	
[2025-07-02T19:48:53.951Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://lodging-source.com -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 1
2025-07-02 12:48:53.951	
[2025-07-02T19:48:53.951Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-02 12:48:53.951	
[2025-07-02T19:48:53.951Z] [nucleiWrapper] Starting two-pass scan for https://lodging-source.com
2025-07-02 12:48:53.951	
[2025-07-02T19:48:53.951Z] [nuclei] Smart guard: techs=none timeout=20s headless=false
2025-07-02 12:48:53.951	
[2025-07-02T19:48:53.950Z] [nuclei] [Enhanced Two-Pass Scan] Running on https://lodging-source.com
2025-07-02 12:48:53.950	
[2025-07-02T19:48:53.950Z] [nuclei] --- Starting Enhanced Two-Pass Scans on 1 targets ---
2025-07-02 12:48:53.950	
[2025-07-02T19:48:53.950Z] [nuclei] Nuclei binary validated successfully.
2025-07-02 12:48:53.950	
[2025-07-02T19:48:53.950Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-02 12:48:53.950	
[INF] PDCP Directory: /root/.pdcp
2025-07-02 12:48:53.950	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-02 12:48:53.950	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-02 12:48:53.950	
[2025-07-02T19:48:53.949Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-02 12:48:53.828	
[2025-07-02T19:48:53.828Z] [abuseIntelScan] No IP artifacts found for this scan
2025-07-02 12:48:53.827	
[2025-07-02T19:48:53.827Z] [abuseIntelScan] Found 0 IP artifacts for scan 3SGBBEAKK63
2025-07-02 12:48:53.824	
[2025-07-02T19:48:53.824Z] [worker] [3SGBBEAKK63] WAITING for dns_twist scan to complete...
2025-07-02 12:48:53.824	
[2025-07-02T19:48:53.824Z] [worker] [3SGBBEAKK63] COMPLETED shodan scan: 2 findings found
2025-07-02 12:48:53.824	
[2025-07-02T19:48:53.824Z] [worker] [3SGBBEAKK63] WAITING for shodan scan to complete...
2025-07-02 12:48:53.824	
[2025-07-02T19:48:53.824Z] [worker] [3SGBBEAKK63] COMPLETED breach_directory_probe scan: 3 findings found
2025-07-02 12:48:53.824	
[2025-07-02T19:48:53.823Z] [worker] [3SGBBEAKK63] WAITING for breach_directory_probe scan to complete...
2025-07-02 12:48:53.824	
[2025-07-02T19:48:53.823Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=3SGBBEAKK63
2025-07-02 12:48:53.823	
[2025-07-02T19:48:53.823Z] [worker] [3SGBBEAKK63] STARTING AbuseIPDB intelligence scan for IPs (parallel after endpoint discovery)
2025-07-02 12:48:53.823	
[2025-07-02T19:48:53.822Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-02 12:48:53.814	
[2025-07-02T19:48:53.814Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-02 12:48:53.814	
[2025-07-02T19:48:53.814Z] [techStackScan] techstack=start domain=lodging-source.com
2025-07-02 12:48:53.814	
[2025-07-02T19:48:53.814Z] [worker] [3SGBBEAKK63] STARTING tech stack scan for lodging-source.com (parallel after endpoint discovery)
2025-07-02 12:48:53.814	
[2025-07-02T19:48:53.813Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-02 12:48:53.807	
[2025-07-02T19:48:53.807Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-02 12:48:53.807	
[2025-07-02T19:48:53.807Z] [nuclei] Starting enhanced vulnerability scan for lodging-source.com
2025-07-02 12:48:53.807	
[2025-07-02T19:48:53.807Z] [worker] [3SGBBEAKK63] STARTING Nuclei vulnerability scan for lodging-source.com (parallel after endpoint discovery)
2025-07-02 12:48:53.807	
[2025-07-02T19:48:53.807Z] [worker] [3SGBBEAKK63] COMPLETED endpoint discovery: 6 endpoint collections found
2025-07-02 12:48:53.807	
[2025-07-02T19:48:53.806Z] [endpointDiscovery] ⇢ done – 6 endpoints
2025-07-02 12:48:38.901	
[2025-07-02T19:48:38.901Z] [tlsScan] Scan complete. Hosts: lodging-source.com, www.lodging-source.com. Findings: 3
2025-07-02 12:48:38.901	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 3 issue(s) found...
2025-07-02 12:48:38.879	
[2025-07-02T19:48:38.878Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-07-02 12:48:38.701	
[2025-07-02T19:48:38.701Z] [tlsScan] Cross-validation complete for www.lodging-source.com: 0 additional findings
2025-07-02 12:48:27.936	
[2025-07-02T19:48:27.936Z] [tlsScan] Python validator: www.lodging-source.com - INVALID
2025-07-02 12:48:27.720	
[2025-07-02T19:48:27.719Z] [tlsScan] Scanning www.lodging-source.com with hybrid validation (sslscan + Python)...
2025-07-02 12:48:27.717	
[2025-07-02T19:48:27.716Z] [tlsScan] Converting "No SSL certificate" to "Incomplete certificate chain" based on Python validation
2025-07-02 12:48:27.538	
[2025-07-02T19:48:27.538Z] [tlsScan] Cross-validation complete for lodging-source.com: 0 additional findings
2025-07-02 12:48:26.879	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-07-02 12:48:26.875	
[2025-07-02T19:48:26.875Z] [trufflehog] Finished secret scan for lodging-source.com Total secrets found: 0
2025-07-02 12:48:26.875	
[2025-07-02T19:48:26.875Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-3SGBBEAKK63.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-3SGBBEAKK63.json'
2025-07-02 12:48:26.875	
[2025-07-02T19:48:26.875Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-3SGBBEAKK63.json
2025-07-02 12:48:26.875	
[2025-07-02T19:48:26.875Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-07-02 12:48:26.875	
[2025-07-02T19:48:26.875Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-07-02 12:48:26.875	
[2025-07-02T19:48:26.875Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-3SGBBEAKK63.json'
2025-07-02 12:48:26.875	
[2025-07-02T19:48:26.875Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-3SGBBEAKK63.json
2025-07-02 12:48:26.875	
[2025-07-02T19:48:26.874Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-07-02 12:48:26.277	
[2025-07-02T19:48:26.277Z] [accessibilityScan] accessibility=skipped domain="lodging-source.com" reason="no_changes_detected"
2025-07-02 12:48:26.277	
[2025-07-02T19:48:26.276Z] [accessibilityScan] accessibility=no_change_detected domain="lodging-source.com" pages=5
2025-07-02 12:48:26.248	
[2025-07-02T19:48:26.248Z] [dynamicBrowser] Page operation completed in 143ms
2025-07-02 12:48:25.330	
[2025-07-02T19:48:25.329Z] [dynamicBrowser] Page operation completed in 1419ms
2025-07-02 12:48:24.320	
[2025-07-02T19:48:24.320Z] [dynamicBrowser] Metrics: browser_rss_mb=202, heap_used_mb=79, pages_open=1
2025-07-02 12:48:23.124	
[2025-07-02T19:48:23.123Z] [dynamicBrowser] Page operation completed in 1353ms
2025-07-02 12:48:22.621	
[2025-07-02T19:48:22.621Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/main.js
2025-07-02 12:48:21.044	
[2025-07-02T19:48:21.044Z] [dynamicBrowser] Page operation completed in 1511ms
2025-07-02 12:48:19.238	
[2025-07-02T19:48:19.238Z] [documentExposure] Query 7 returned 20 results
2025-07-02 12:48:19.135	
[2025-07-02T19:48:19.131Z] [documentExposure] Query 8 returned 9 results
2025-07-02 12:48:19.005	
[2025-07-02T19:48:19.004Z] [documentExposure] Query 10 returned 0 results
2025-07-02 12:48:18.968	
[2025-07-02T19:48:18.968Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-02 12:48:18.968	
[2025-07-02T19:48:18.968Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:48:18.968	
Saved $0.028 vs WhoisXML
2025-07-02 12:48:18.968	
[2025-07-02T19:48:18.968Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-02 12:48:18.968	
[2025-07-02T19:48:18.968Z] [documentExposure] Query 3 returned 20 results
2025-07-02 12:48:18.968	
[2025-07-02T19:48:18.967Z] [documentExposure] Query 5 returned 2 results
2025-07-02 12:48:18.967	
[2025-07-02T19:48:18.967Z] [documentExposure] Query 9 returned 7 results
2025-07-02 12:48:18.967	
[2025-07-02T19:48:18.966Z] [documentExposure] Query 2 returned 20 results
2025-07-02 12:48:18.966	
[2025-07-02T19:48:18.966Z] [documentExposure] Query 6 returned 1 results
2025-07-02 12:48:18.966	
[2025-07-02T19:48:18.966Z] [documentExposure] Query 4 returned 10 results
2025-07-02 12:48:18.313	
[2025-07-02T19:48:18.313Z] [documentExposure] Query 1 returned 0 results
2025-07-02 12:48:18.281	
[2025-07-02T19:48:18.280Z] [endpointDiscovery] +crawl_link /direct// (-)
2025-07-02 12:48:17.959	
[2025-07-02T19:48:17.959Z] [breachDirectoryProbe] Breach probe completed: 3 findings in 1815ms
2025-07-02 12:48:17.952	
[2025-07-02T19:48:17.952Z] [breachDirectoryProbe] Created INFO finding for 11 users: shelly@lodging-source.com, bert@lodging-source.com, gretchen@lodging-source.com, amy@lodging-source.com, katie@lodging-source.com...
2025-07-02 12:48:17.947	
[2025-07-02T19:48:17.946Z] [breachDirectoryProbe] Created CRITICAL finding for 1 users: mike@lodging-source.com
2025-07-02 12:48:17.947	
[artifactStore] Inserted finding CRITICAL_BREACH_EXPOSURE for artifact 970
2025-07-02 12:48:17.945	
[artifactStore] Inserted breach_directory_summary artifact: Breach probe: 1 critical breach exposures for lodging-source...
2025-07-02 12:48:17.943	
[2025-07-02T19:48:17.942Z] [breachDirectoryProbe] Created MEDIUM finding for 4 users: jayme@lodging-source.com, kelli@lodging-source.com, jessica@lodging-source.com, lauren@lodging-source.com
2025-07-02 12:48:17.934	
[2025-07-02T19:48:17.934Z] [breachDirectoryProbe] Consolidated 63 breach records into 16 unique users
2025-07-02 12:48:17.934	
[2025-07-02T19:48:17.933Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=63, Total=63
2025-07-02 12:48:17.933	
[2025-07-02T19:48:17.932Z] [breachDirectoryProbe] LeakCheck response for lodging-source.com: 63 breached accounts, quota remaining: 999999
2025-07-02 12:48:17.854	
[2025-07-02T19:48:17.854Z] [Shodan] Done — 2 services found, 2 unique after deduplication, 2 API calls for 1 targets
2025-07-02 12:48:17.854	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 2 services found, 2 unique after deduplication...
2025-07-02 12:48:17.849	
[2025-07-02T19:48:17.849Z] [Shodan] API call 2 - search query
2025-07-02 12:48:17.793	
[2025-07-02T19:48:17.792Z] [documentExposure] Serper API call 10: ""Lodging Source" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-07-02 12:48:17.789	
[2025-07-02T19:48:17.789Z] [documentExposure] Serper API call 9: ""Lodging Source" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-07-02 12:48:17.787	
[2025-07-02T19:48:17.787Z] [documentExposure] Serper API call 8: ""Lodging Source" (intitle:"index of" OR intitle:"directory listing")"
2025-07-02 12:48:17.781	
[2025-07-02T19:48:17.781Z] [documentExposure] Serper API call 7: ""Lodging Source" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-07-02 12:48:17.781	
[2025-07-02T19:48:17.779Z] [documentExposure] Serper API call 6: ""Lodging Source" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-07-02 12:48:17.772	
[2025-07-02T19:48:17.771Z] [documentExposure] Serper API call 5: ""Lodging Source" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-07-02 12:48:17.768	
[2025-07-02T19:48:17.768Z] [documentExposure] Serper API call 4: ""Lodging Source" ("database" OR "backup" OR "dump") filetype:sql"
2025-07-02 12:48:17.763	
[2025-07-02T19:48:17.763Z] [documentExposure] Serper API call 3: ""Lodging Source" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-07-02 12:48:17.763	
[2025-07-02T19:48:17.761Z] [documentExposure] Serper API call 2: ""Lodging Source" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-07-02 12:48:17.763	
[2025-07-02T19:48:17.760Z] [documentExposure] Serper API call 1: "site:lodging-source.com (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-07-02 12:48:17.763	
[2025-07-02T19:48:17.760Z] [documentExposure] Starting 10 parallel Serper queries
2025-07-02 12:48:17.754	
[2025-07-02T19:48:17.753Z] [dynamicBrowser] Page operation completed in 986ms
2025-07-02 12:48:17.275	
[2025-07-02T19:48:17.275Z] [trufflehog] [Targeted Scan] Found accessible file: https://lodging-source.com/bundle.js
2025-07-02 12:48:17.271	
[2025-07-02T19:48:17.271Z] [breachDirectoryProbe] Querying LeakCheck for domain: lodging-source.com
2025-07-02 12:48:17.031	
[2025-07-02T19:48:17.027Z] [endpointDiscovery] +js_analysis //www.youtube.com/player_api (-)
2025-07-02 12:48:16.920	
[2025-07-02T19:48:16.919Z] [breachDirectoryProbe] Breach Directory response for lodging-source.com: 0 breached accounts
2025-07-02 12:48:16.696	
[2025-07-02T19:48:16.694Z] [endpointDiscovery] +crawl_link /home.html (-)
2025-07-02 12:48:16.696	
[2025-07-02T19:48:16.694Z] [endpointDiscovery] +crawl_link /direct/index.php (-)
2025-07-02 12:48:16.696	
[2025-07-02T19:48:16.694Z] [endpointDiscovery] +crawl_link / (-)
2025-07-02 12:48:16.696	
[2025-07-02T19:48:16.694Z] [endpointDiscovery] +crawl_link /index.html (-)
2025-07-02 12:48:16.637	
[2025-07-02T19:48:16.636Z] [accessibilityScan] accessibility=hash_computation domain="lodging-source.com" pages=15
2025-07-02 12:48:16.637	
[2025-07-02T19:48:16.636Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-07-02 12:48:16.412	
[2025-07-02T19:48:16.412Z] [tlsScan] Python validator: lodging-source.com - INVALID
2025-07-02 12:48:16.373	
[2025-07-02T19:48:16.373Z] [spfDmarc] Completed email security scan, found 1 issues
2025-07-02 12:48:16.350	
[2025-07-02T19:48:16.349Z] [spfDmarc] Checking for BIMI record...
2025-07-02 12:48:16.349	
[2025-07-02T19:48:16.349Z] [spfDmarc] Found DKIM record with selector: default
2025-07-02 12:48:16.326	
[2025-07-02T19:48:16.325Z] [spfDmarc] Probing for common DKIM selectors...
2025-07-02 12:48:16.202	
[2025-07-02T19:48:16.199Z] [spfDmarc] Performing recursive SPF check...
2025-07-02 12:48:16.186	
[2025-07-02T19:48:16.186Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-07-02 12:48:16.174	
[2025-07-02T19:48:16.174Z] [tlsScan] Scanning lodging-source.com with hybrid validation (sslscan + Python)...
2025-07-02 12:48:16.174	

2025-07-02 12:48:16.174	
OpenSSL 3.5.0 8 Apr 2025
2025-07-02 12:48:16.174	
[2025-07-02T19:48:16.174Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-07-02 12:48:16.172	
[2025-07-02T19:48:16.172Z] [worker] [3SGBBEAKK63] WAITING for endpoint discovery to complete for dependent modules...
2025-07-02 12:48:16.169	
[2025-07-02T19:48:16.169Z] [accessibilityScan] Starting accessibility scan for domain="lodging-source.com"
2025-07-02 12:48:16.169	
[2025-07-02T19:48:16.168Z] [worker] [3SGBBEAKK63] STARTING accessibility compliance scan for lodging-source.com (immediate parallel)
2025-07-02 12:48:16.164	
[2025-07-02T19:48:16.163Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-07-02 12:48:16.164	
[2025-07-02T19:48:16.163Z] [trufflehog] Skipping website crawl - relying on endpoint discovery from other modules
2025-07-02 12:48:16.163	
[2025-07-02T19:48:16.163Z] [trufflehog] Starting targeted secret scan for domain: lodging-source.com
2025-07-02 12:48:16.163	
[2025-07-02T19:48:16.163Z] [worker] [3SGBBEAKK63] STARTING TruffleHog secret scan for lodging-source.com (immediate parallel)
2025-07-02 12:48:16.160	
[2025-07-02T19:48:16.159Z] [spfDmarc] Checking DMARC record...
2025-07-02 12:48:16.160	
[2025-07-02T19:48:16.159Z] [spfDmarc] Starting email security scan for lodging-source.com
2025-07-02 12:48:16.160	
[2025-07-02T19:48:16.159Z] [worker] [3SGBBEAKK63] STARTING SPF/DMARC email security scan for lodging-source.com (immediate parallel)
2025-07-02 12:48:16.152	
[2025-07-02T19:48:16.152Z] [worker] [3SGBBEAKK63] STARTING TLS security scan for lodging-source.com (immediate parallel)
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.149Z] [endpointDiscovery] ⇢ start lodging-source.com
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.149Z] [worker] [3SGBBEAKK63] STARTING endpoint discovery for lodging-source.com (immediate parallel)
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.149Z] [documentExposure] Cost control: limiting to 10 search queries max
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.149Z] [worker] [3SGBBEAKK63] STARTING document exposure scan for Lodging Source (immediate parallel)
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.148Z] [dnstwist] Using hybrid RDAP+Whoxy resolver (87% cheaper than WhoisXML) for original domain: lodging-source.com
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.148Z] [dnstwist] Starting typosquat scan for lodging-source.com
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.148Z] [worker] [3SGBBEAKK63] STARTING DNS Twist scan for lodging-source.com (immediate parallel)
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.148Z] [Shodan] Start scan for lodging-source.com
2025-07-02 12:48:16.149	
[2025-07-02T19:48:16.148Z] [worker] [3SGBBEAKK63] STARTING Shodan intelligence scan for lodging-source.com (immediate parallel)
2025-07-02 12:48:16.144	
[2025-07-02T19:48:16.144Z] [breachDirectoryProbe] Querying Breach Directory for domain: lodging-source.com
2025-07-02 12:48:16.144	
[2025-07-02T19:48:16.144Z] [breachDirectoryProbe] Starting comprehensive breach probe for domain="lodging-source.com" (BreachDirectory + LeakCheck)
2025-07-02 12:48:16.144	
[2025-07-02T19:48:16.144Z] [worker] [3SGBBEAKK63] STARTING Breach Directory intelligence probe for lodging-source.com (immediate parallel)
2025-07-02 12:48:16.144	
[queue] Updated job 3SGBBEAKK63 status: processing - Comprehensive security discovery in progress...
2025-07-02 12:48:15.980	
[2025-07-02T19:48:15.980Z] [worker] [3SGBBEAKK63] 🎯 Using TIER_1 tier with 12 modules: dns_twist, document_exposure, shodan, breach_directory_probe, endpoint_discovery, tech_stack_scan, abuse_intel_scan, accessibility_scan, nuclei, tls_scan, spf_dmarc, trufflehog
2025-07-02 12:48:15.980	
[2025-07-02T19:48:15.980Z] [worker] Processing comprehensive security scan for Lodging Source (lodging-source.com)
2025-07-02 12:48:15.980	
[2025-07-02T19:48:15.980Z] [worker] ✅ JOB PICKED UP: Processing scan job 3SGBBEAKK63 for Lodging Source (lodging-source.com)
2025-07-02 12:48:15.980	
[2025-07-02T19:48:15.980Z] [worker] Processing scan job: 3SGBBEAKK63
2025-07-02 12:48:15.980	
[queue] Job 3SGBBEAKK63 successfully locked by worker 286565eb5406d8
2025-07-02 12:48:15.705	
}
2025-07-02 12:48:15.705	
createdAt: '2025-07-02T19:48:14.203Z'
2025-07-02 12:48:15.705	
originalDomain: 'lodging-source.com',
2025-07-02 12:48:15.705	
domain: 'lodging-source.com',
2025-07-02 12:48:15.705	
companyName: 'Lodging Source',
2025-07-02 12:48:15.705	
id: '3SGBBEAKK63',
2025-07-02 12:48:15.705	
[queue] Parsed job: {
2025-07-02 12:48:15.705	
[queue] Job string to parse: {"id":"3SGBBEAKK63","companyName":"Lodging Source","domain":"lodging-source.com","originalDomain":"lodging-source.com","createdAt":"2025-07-02T19:48:14.203Z"}
2025-07-02 12:48:15.705	
} Type: object
2025-07-02 12:48:15.705	
createdAt: '2025-07-02T19:48:14.203Z'
2025-07-02 12:48:15.705	
originalDomain: 'lodging-source.com',
2025-07-02 12:48:15.705	
domain: 'lodging-source.com',
2025-07-02 12:48:15.705	
companyName: 'Lodging Source',
2025-07-02 12:48:15.705	
id: '3SGBBEAKK63',
2025-07-02 12:48:15.705	
[queue] Raw job data from Redis: {
2025-07-02 12:48:14.856	
{
  "level": 30,
  "time": 1751485694856,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-2",
  "res": {
    "statusCode": 200
  },
  "responseTime": 653.5868210000917,
  "msg": "request completed"
}
2025-07-02 12:48:14.855	
[2025-07-02T19:48:14.855Z] [api] ✅ Successfully created scan job 3SGBBEAKK63 for Lodging Source