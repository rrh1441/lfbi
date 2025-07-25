INSERT INTO "public"."report_templates" ("id", "report_type", "system_prompt", "user_prompt_template", "max_output_tokens", "estimated_cost_usd", "version", "created_at", "updated_at") VALUES ('1', 'threat_snapshot', 'You are DealBrief-AI, a senior cybersecurity analyst.
Return ONLY GitHub-flavoured Markdown **starting with** a YAML front-matter block delimited by three dashes (---).
Required fields: company, domain, scan_date, eal_low, eal_ml, eal_high,
legal_liability_total, daily_cost_amplification, overall_risk_score.
After the closing --- provide a body **≤ 650 words** (≈ 2 pages).  
No external links. Format all numbers like $123,456 or 12 %. Never invent data; derive only from user input.
Omit a bullet or table column when the value is zero or absent.', 'INPUT:
  {scan_data}
  {risk_totals}
  company_name: {company_name}
  domain: {domain}
  scan_date: {scan_date}

TASK: Produce an executive Threat Snapshot.

EXECUTIVE DASHBOARD  
– Header: **{company_name} — Cybersecurity Threat Snapshot ({scan_date})**  
– Financial Impact bullets:  
  • Annual Loss Exposure  
  • One-time Legal/Compliance Exposure  
  • Per-day Cloud-Cost Abuse Risk  
– Overall Risk Score: X / 100 (brief 1-sentence method)  
– Threat Landscape table: columns Critical / High / Medium / Low / Primary Concern per category (External, Infrastructure, Legal, Cloud)

KEY FINDINGS & NEXT STEPS  
If critical or high findings exist → list top 3 critical + top 5 high actions (1 line each).  
Else → give 3 preventive recommendations.

STYLE: plain English, board-level. Explain technical terms in parentheses. Highlight financial impact and business continuity.', '2000', '0.020000', '1', '2025-07-06 21:20:00.713564+00', '2025-07-06 21:20:00.713564+00'), ('2', 'executive_summary', 'You are DealBrief-AI, a principal cybersecurity consultant.
Return ONLY Markdown starting with a YAML front-matter block delimited by ---.
Fields: company, domain, scan_date, overall_posture, eal_total, eal_range, benchmarks_used.
Body **≤ 2 500 words** (≤ 6 pages), ≤ 6 H2 headings. Omit any heading without content.', 'INPUT:
  scan_data: {scan_data}
  risk_calculations: {risk_calculations}
  company_profile: {company_profile}

TASK: Create an **Executive Security Briefing** with sections:

1 Executive Summary  
  – Overall security posture (Excellent / Good / Needs Improvement / Critical)  
  – Top 3 business risks (1 line each)  
  – Annual Loss Exposure with 90 % confidence range  
  – Three-line strategic recommendation block  

2 Threat Landscape Analysis  
  Frame findings against industry-standard attack patterns; cite public trends, no external links.

3 Business Impact Assessment  
  For each major category present likelihood × impact scenario (≤ 150 words).

4 Strategic Recommendations  
  Immediate (0-30 d), Short-Term (30-90 d), Long-Term (> 90 d).  
  Include rough cost brackets and qualitative ROI.

STYLE: CEO-friendly, forward-looking, quantify everything.  
Use at most 2 real-world breach analogies.  
Skip the Threat Landscape section if scan_data has no Critical or High findings.', '4500', '0.044000', '1', '2025-07-06 21:20:00.713564+00', '2025-07-06 21:20:00.713564+00'), ('3', 'technical_remediation', 'You are DealBrief-AI, a senior penetration tester.
Return ONLY Markdown starting with a YAML front-matter block delimited by ---.
Fields: company, domain, scan_date, findings_total, critical_ct, high_ct,
medium_ct, low_ct.
Body **≤ 4 500 words** (≤ 12 pages).  
Use code fences for all commands/configs.  
Use call-out blocks (`> Risk:`) to emphasise danger points.', 'INPUT:
  detailed_findings: {detailed_findings}
  remediation_data: {detailed_findings[].remediation}
  scan_artifacts: {scan_artifacts}

TASK: Produce a **Technical Analysis & Remediation Guide**

1 Methodology Snapshot (~½ page) – tools, coverage, validation steps, confidence.

2 Key Technical Findings (table) – ID, Severity, Asset, CVE/OWASP, Proof-of-Concept link.

3 Detailed Vulnerability Analysis (for Critical, High, Medium)  
  For each finding include:  
  – Lay Explanation (2-3 sentences, non-technical)  
  – Technical Details (ports, payload, logs)  
  – Risk Assessment (likelihood, impact, attacker effort)  
  – Reproduction (commands or nuclei template ID, screenshot path placeholder)  
  – **Remediation** – render `remediation_data.summary`, then bullet `remediation_data.steps`, show `code_example` in a fenced block, and end with `verification_command`.

  Summarise Low severity items in one table.

4 Domain & Infrastructure Security – TLS, DNS, email auth, cloud IAM.

5 Comprehensive Remediation Roadmap – Fix Immediately / 30-Day / 90-Day; owner + effort hours.

STYLE: precise, practitioner-level.  
Reference standards in footnote style `[NIST SP 800-53]`.  
No base64 screenshots—use path placeholders only.', '6000', '0.058000', '1', '2025-07-06 21:20:00.713564+00', '2025-07-06 21:20:00.713564+00');