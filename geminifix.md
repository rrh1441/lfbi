This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.claude/
  settings.local.json
.cursor/
  mcp.json
public/
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg
src/
  app/
    .claude/
      settings.local.json
    (dashboard)/
      dashboard/
        page.tsx
      findings/
        page.tsx
      reports/
        page.tsx
      scans/
        [scanId]/
          findings/
            page.tsx
          reports/
            page.tsx
          page.tsx
        new/
          page.tsx
        page.tsx
      settings/
        page.tsx
      layout.tsx
    api/
      dashboard/
        recent-scans/
          route.ts
        stats/
          route.ts
      findings/
        verify/
          route.ts
        route.ts
      reports/
        [reportId]/
          download/
            route.ts
        generate/
          # Due-Diligence Risk Assessment Prompt.ini
          route.ts
        route.ts
      scans/
        bulk/
          route.ts
        route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    layout/
      header.tsx
      sidebar.tsx
    reports/
      ReportViewer.tsx
    ui/
      badge.tsx
      button.tsx
      card.tsx
      checkbox.tsx
      collapsible.tsx
      dialog.tsx
      dropdown-menu.tsx
      input.tsx
      label.tsx
      progress.tsx
      select.tsx
      skeleton.tsx
      table.tsx
      tabs.tsx
  lib/
    types/
      database.ts
    providers.tsx
    supabase.ts
    utils.ts
.gitignore
claudeupdate.md
components.json
eslint.config.mjs
findings_rows-3.csv
frontend.md
next.config.ts
package.json
postcss.config.mjs
prompt.md
README.md
supabasefunctions.md
supabasereports.md
supabaseschema.md
tailwind.config.ts
tsconfig.json
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path=".claude/settings.local.json">
{
  "permissions": {
    "allow": [
      "Bash(npx create-next-app:*)",
      "Bash(npm install:*)",
      "Bash(mv:*)",
      "Bash(true)",
      "Bash(rmdir:*)",
      "Bash(gh auth:*)",
      "Bash(git init:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(gh repo create:*)",
      "Bash(npx shadcn@latest init -d)",
      "Bash(npx shadcn add:*)",
      "Bash(npm run build:*)",
      "Bash(git push:*)",
      "Bash(rm:*)",
      "Bash(git revert:*)",
      "Bash(find:*)",
      "mcp__ide__executeCode",
      "Bash(curl:*)",
      "Bash(node:*)",
      "Bash(ls:*)",
      "Bash(psql:*)",
      "Bash(grep:*)",
      "Bash(cut:*)",
      "Bash(npm run dev:*)",
      "Bash(git reset:*)",
      "Bash(pkill:*)",
      "Bash(git show:*)"
    ],
    "deny": []
  }
}
</file>

<file path="src/app/.claude/settings.local.json">
{
  "permissions": {
    "allow": [
      "Bash(git pull:*)",
      "Bash(git push:*)",
      "Bash(pnpm install:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git reset:*)",
      "Bash(git fetch:*)"
    ],
    "deny": []
  }
}
</file>

<file path="supabasefunctions.md">
[
  {
    "function_name": "calc_eal",
    "return_type": "TABLE(eal_low numeric, eal_ml numeric, eal_high numeric)",
    "arguments": "_finding_id integer",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "calc_eal_per_finding",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "calculate_dow_eal_advanced",
    "return_type": "TABLE(eal_low integer, eal_ml integer, eal_high integer, eal_daily integer, calculation_details jsonb)",
    "arguments": "base_unit_cost numeric, multiplier_type character varying, service_detected character varying, auth_bypass_prob numeric, sustained_rps integer, attack_complexity character varying, endpoint_url text DEFAULT NULL::text",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "calculate_finding_eal_v3",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": "EAL calculation v3: Implements revised parameters with $250k baseline, \nreduced severity multipliers (CRITICAL=2x), narrowed confidence bands (0.6-1.4),\nautomatic attack_type_code assignment, and comprehensive error handling."
  },
  {
    "function_name": "enhance_breach_descriptions",
    "return_type": "void",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "enqueue_threat_snapshot",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY DEFINER",
    "description": null
  },
  {
    "function_name": "populate_finding_scan_id",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "update_brief_counts",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "update_dow_eal_values_advanced",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  }
]
</file>

<file path="supabasereports.md">
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
</file>

<file path="supabaseschema.md">
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.account (
  id text NOT NULL,
  accountId text NOT NULL,
  providerId text NOT NULL,
  userId text NOT NULL,
  accessToken text,
  refreshToken text,
  idToken text,
  accessTokenExpiresAt timestamp without time zone,
  refreshTokenExpiresAt timestamp without time zone,
  scope text,
  password text,
  createdAt timestamp without time zone NOT NULL DEFAULT now(),
  updatedAt timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT account_pkey PRIMARY KEY (id),
  CONSTRAINT account_userId_fkey FOREIGN KEY (userId) REFERENCES public.user(id)
);
CREATE TABLE public.artifacts (
  id integer NOT NULL DEFAULT nextval('artifacts_id_seq'::regclass),
  type character varying NOT NULL,
  val_text text NOT NULL,
  severity character varying DEFAULT 'INFO'::character varying,
  src_url text,
  sha256 character varying,
  mime character varying,
  meta jsonb DEFAULT '{}'::jsonb,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT artifacts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.attack_meta (
  attack_type_code text NOT NULL,
  prevalence numeric,
  raw_weight numeric,
  category text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT attack_meta_pkey PRIMARY KEY (attack_type_code)
);
CREATE TABLE public.attack_type (
  code text NOT NULL,
  prevalence numeric,
  cost_weight numeric,
  CONSTRAINT attack_type_pkey PRIMARY KEY (code)
);
CREATE TABLE public.compromised_credentials (
  id integer NOT NULL DEFAULT nextval('compromised_credentials_id_seq'::regclass),
  scan_id character varying NOT NULL,
  company_domain character varying NOT NULL,
  username character varying,
  email character varying,
  breach_source character varying NOT NULL,
  breach_date date,
  has_password boolean DEFAULT false,
  has_cookies boolean DEFAULT false,
  has_autofill boolean DEFAULT false,
  has_browser_data boolean DEFAULT false,
  field_count integer DEFAULT 0,
  risk_level character varying NOT NULL,
  email_type character varying,
  first_name character varying,
  last_name character varying,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT compromised_credentials_pkey PRIMARY KEY (id)
);
CREATE TABLE public.correlation_adjustment (
  instance_number integer NOT NULL,
  correlation_factor numeric NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT correlation_adjustment_pkey PRIMARY KEY (instance_number)
);
CREATE TABLE public.dow_cost_constants (
  id integer NOT NULL DEFAULT nextval('dow_cost_constants_id_seq'::regclass),
  finding_type character varying NOT NULL DEFAULT 'DENIAL_OF_WALLET'::character varying,
  tokens_per_request_default integer NOT NULL DEFAULT 750,
  tokens_per_request_openai integer NOT NULL DEFAULT 800,
  tokens_per_request_anthropic integer NOT NULL DEFAULT 650,
  tokens_per_request_cohere integer NOT NULL DEFAULT 500,
  memory_mb_aws_lambda integer NOT NULL DEFAULT 256,
  memory_mb_gcp_functions integer NOT NULL DEFAULT 128,
  memory_mb_azure_functions integer NOT NULL DEFAULT 128,
  memory_mb_default integer NOT NULL DEFAULT 128,
  window_trivial_bypass integer NOT NULL DEFAULT 86400,
  window_high_bypass integer NOT NULL DEFAULT 21600,
  window_medium_bypass integer NOT NULL DEFAULT 7200,
  window_low_bypass integer NOT NULL DEFAULT 1800,
  auth_bypass_threshold_trivial numeric NOT NULL DEFAULT 0.90,
  auth_bypass_threshold_high numeric NOT NULL DEFAULT 0.50,
  auth_bypass_threshold_medium numeric NOT NULL DEFAULT 0.20,
  complexity_multiplier_trivial numeric NOT NULL DEFAULT 3.00,
  complexity_multiplier_low numeric NOT NULL DEFAULT 2.00,
  complexity_multiplier_medium numeric NOT NULL DEFAULT 1.00,
  complexity_multiplier_high numeric NOT NULL DEFAULT 0.30,
  rps_threshold_high integer NOT NULL DEFAULT 50,
  rps_threshold_medium integer NOT NULL DEFAULT 10,
  rps_multiplier_high numeric NOT NULL DEFAULT 1.50,
  rps_multiplier_medium numeric NOT NULL DEFAULT 1.20,
  rps_multiplier_low numeric NOT NULL DEFAULT 1.00,
  discovery_likelihood_api numeric NOT NULL DEFAULT 0.80,
  discovery_likelihood_other numeric NOT NULL DEFAULT 0.40,
  daily_to_weekly_factor numeric NOT NULL DEFAULT 5.0,
  daily_to_monthly_factor numeric NOT NULL DEFAULT 20.0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT dow_cost_constants_pkey PRIMARY KEY (id)
);
CREATE TABLE public.finding (
  id integer NOT NULL DEFAULT nextval('finding_id_seq'::regclass),
  scan_id uuid,
  asset text,
  category text,
  attack_type text,
  severity text,
  rationale jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT finding_pkey PRIMARY KEY (id),
  CONSTRAINT finding_severity_fkey FOREIGN KEY (severity) REFERENCES public.severity_weight(severity),
  CONSTRAINT finding_attack_type_fkey FOREIGN KEY (attack_type) REFERENCES public.attack_type(code)
);
CREATE TABLE public.finding_probability_modifiers (
  finding_type text NOT NULL,
  probability_modifier numeric NOT NULL DEFAULT 1.0,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT finding_probability_modifiers_pkey PRIMARY KEY (finding_type)
);
CREATE TABLE public.finding_type_mapping (
  finding_type text NOT NULL,
  attack_type_code text NOT NULL,
  severity_override text,
  custom_multiplier numeric DEFAULT 1.0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT finding_type_mapping_pkey PRIMARY KEY (finding_type),
  CONSTRAINT finding_type_mapping_attack_type_code_fkey FOREIGN KEY (attack_type_code) REFERENCES public.attack_meta(attack_type_code)
);
CREATE TABLE public.findings (
  id bigint NOT NULL DEFAULT nextval('findings_id_seq'::regclass),
  artifact_id bigint NOT NULL,
  finding_type character varying NOT NULL,
  recommendation text NOT NULL,
  description text NOT NULL,
  repro_command text,
  remediation jsonb,
  created_at timestamp with time zone DEFAULT now(),
  scan_id character varying,
  type character varying DEFAULT finding_type,
  severity character varying,
  attack_type_code text,
  state character varying DEFAULT 'active'::character varying,
  eal_low bigint,
  eal_ml integer,
  eal_high bigint,
  eal_daily integer,
  CONSTRAINT findings_pkey PRIMARY KEY (id),
  CONSTRAINT findings_artifact_id_fkey FOREIGN KEY (artifact_id) REFERENCES public.artifacts(id)
);
CREATE TABLE public.findings_archive (
  id integer NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  description text,
  scan_id character varying,
  type character varying,
  recommendation text,
  severity character varying,
  attack_type_code text,
  state USER-DEFINED NOT NULL DEFAULT 'AUTOMATED'::finding_state,
  eal_low bigint,
  eal_ml integer,
  eal_high bigint,
  eal_daily integer,
  CONSTRAINT findings_archive_pkey PRIMARY KEY (id)
);
CREATE TABLE public.findings_sev_backup (
  id integer,
  severity_level text
);
CREATE TABLE public.legal_contingent_liabilities (
  id integer NOT NULL DEFAULT nextval('legal_contingent_liabilities_id_seq'::regclass),
  scan_id character varying NOT NULL,
  finding_id integer,
  liability_type character varying NOT NULL DEFAULT 'ADA_COMPLIANCE'::character varying,
  one_time_exposure_low integer,
  one_time_exposure_ml integer,
  one_time_exposure_high integer,
  remediation_cost integer DEFAULT 5000,
  status character varying DEFAULT 'OPEN'::character varying,
  temporal_modifier numeric DEFAULT 1.0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT legal_contingent_liabilities_pkey PRIMARY KEY (id)
);
CREATE TABLE public.report_jobs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  scan_id text,
  report_type text NOT NULL CHECK (report_type = ANY (ARRAY['threat_snapshot'::text, 'executive_summary'::text, 'technical_remediation'::text])),
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'failed'::text, 'cancelled'::text])),
  tokens_input integer DEFAULT 0,
  tokens_output integer DEFAULT 0,
  cost_usd numeric DEFAULT 0,
  markdown_content text,
  html_content text,
  storage_path text,
  created_at timestamp with time zone DEFAULT now(),
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  error_message text,
  requested_by text,
  auto_generated boolean DEFAULT false,
  CONSTRAINT report_jobs_pkey PRIMARY KEY (id),
  CONSTRAINT report_jobs_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scan_status(scan_id)
);
CREATE TABLE public.report_templates (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  report_type text NOT NULL UNIQUE CHECK (report_type = ANY (ARRAY['threat_snapshot'::text, 'executive_summary'::text, 'technical_remediation'::text])),
  system_prompt text NOT NULL,
  user_prompt_template text NOT NULL,
  max_output_tokens integer DEFAULT 8000,
  estimated_cost_usd numeric DEFAULT 0.02,
  version integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT report_templates_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reports (
  id character varying NOT NULL,
  user_id uuid,
  json_url text,
  pdf_url text,
  created_at timestamp without time zone DEFAULT now(),
  company_name text,
  domain text,
  scan_id text,
  content text,
  findings_count integer DEFAULT 0,
  status text DEFAULT 'pending'::text,
  CONSTRAINT reports_pkey PRIMARY KEY (id),
  CONSTRAINT fk_reports_scan_id FOREIGN KEY (scan_id) REFERENCES public.scan_status(scan_id)
);
CREATE TABLE public.reports_archive (
  id character varying NOT NULL,
  user_id uuid,
  json_url text,
  pdf_url text,
  created_at timestamp without time zone DEFAULT now(),
  company_name text,
  domain text,
  scan_id text,
  content text,
  findings_count integer DEFAULT 0,
  status text DEFAULT 'pending'::text,
  CONSTRAINT reports_archive_pkey PRIMARY KEY (id),
  CONSTRAINT reports_archive_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scan_status(scan_id)
);
CREATE TABLE public.risk_constants (
  key text NOT NULL,
  value numeric,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT risk_constants_pkey PRIMARY KEY (key)
);
CREATE TABLE public.scan_financials_cache (
  scan_id text NOT NULL,
  finding_id bigint NOT NULL,
  asset text,
  category text,
  severity text,
  eal_low numeric,
  eal_ml numeric,
  eal_high numeric,
  CONSTRAINT scan_financials_cache_pkey PRIMARY KEY (finding_id)
);
CREATE TABLE public.scan_status (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  scan_id text NOT NULL UNIQUE,
  company_name text NOT NULL,
  domain text NOT NULL,
  status text NOT NULL,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_module text,
  total_modules integer DEFAULT 10,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  error_message text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  total_artifacts_count integer DEFAULT 0,
  max_severity character varying,
  total_findings_count integer DEFAULT 0,
  CONSTRAINT scan_status_pkey PRIMARY KEY (id)
);
CREATE TABLE public.scan_status_archive (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  scan_id text NOT NULL UNIQUE,
  company_name text NOT NULL,
  domain text NOT NULL,
  status text NOT NULL,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_module text,
  total_modules integer DEFAULT 10,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  error_message text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  total_artifacts_count integer DEFAULT 0,
  max_severity character varying,
  total_findings_count integer DEFAULT 0,
  CONSTRAINT scan_status_archive_pkey PRIMARY KEY (id)
);
CREATE TABLE public.scan_totals_automated (
  id integer NOT NULL DEFAULT nextval('scan_totals_automated_id_seq'::regclass),
  scan_id character varying NOT NULL UNIQUE,
  company_domain character varying NOT NULL,
  phishing_bec_low numeric DEFAULT 0,
  phishing_bec_ml numeric DEFAULT 0,
  phishing_bec_high numeric DEFAULT 0,
  site_hack_low numeric DEFAULT 0,
  site_hack_ml numeric DEFAULT 0,
  site_hack_high numeric DEFAULT 0,
  malware_low numeric DEFAULT 0,
  malware_ml numeric DEFAULT 0,
  malware_high numeric DEFAULT 0,
  cyber_total_low numeric DEFAULT 0,
  cyber_total_ml numeric DEFAULT 0,
  cyber_total_high numeric DEFAULT 0,
  ada_compliance_low numeric DEFAULT 0,
  ada_compliance_ml numeric DEFAULT 0,
  ada_compliance_high numeric DEFAULT 0,
  dow_daily_low numeric DEFAULT 0,
  dow_daily_ml numeric DEFAULT 0,
  dow_daily_high numeric DEFAULT 0,
  total_findings integer DEFAULT 0,
  verified_findings integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT scan_totals_automated_pkey PRIMARY KEY (id)
);
CREATE TABLE public.scan_totals_verified (
  id integer NOT NULL DEFAULT nextval('scan_totals_verified_id_seq'::regclass),
  scan_id character varying NOT NULL UNIQUE,
  company_domain character varying NOT NULL,
  phishing_bec_low numeric DEFAULT 0,
  phishing_bec_ml numeric DEFAULT 0,
  phishing_bec_high numeric DEFAULT 0,
  site_hack_low numeric DEFAULT 0,
  site_hack_ml numeric DEFAULT 0,
  site_hack_high numeric DEFAULT 0,
  malware_low numeric DEFAULT 0,
  malware_ml numeric DEFAULT 0,
  malware_high numeric DEFAULT 0,
  cyber_total_low numeric DEFAULT 0,
  cyber_total_ml numeric DEFAULT 0,
  cyber_total_high numeric DEFAULT 0,
  ada_compliance_low numeric DEFAULT 0,
  ada_compliance_ml numeric DEFAULT 0,
  ada_compliance_high numeric DEFAULT 0,
  dow_daily_low numeric DEFAULT 0,
  dow_daily_ml numeric DEFAULT 0,
  dow_daily_high numeric DEFAULT 0,
  total_findings integer DEFAULT 0,
  verified_findings integer DEFAULT 0,
  verified_at timestamp without time zone,
  verified_by character varying,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  automated_id integer,
  CONSTRAINT scan_totals_verified_pkey PRIMARY KEY (id),
  CONSTRAINT scan_totals_verified_automated_id_fkey FOREIGN KEY (automated_id) REFERENCES public.scan_totals_automated(id)
);
CREATE TABLE public.search_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT search_events_pkey PRIMARY KEY (id)
);
CREATE TABLE public.security_reports (
  id integer NOT NULL DEFAULT nextval('security_reports_id_seq'::regclass),
  scan_id character varying NOT NULL UNIQUE,
  company_name character varying NOT NULL,
  report_content text NOT NULL,
  executive_summary text,
  generated_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  report_url text,
  CONSTRAINT security_reports_pkey PRIMARY KEY (id)
);
CREATE TABLE public.session (
  id text NOT NULL,
  expiresAt timestamp without time zone NOT NULL,
  token text NOT NULL UNIQUE,
  createdAt timestamp without time zone NOT NULL DEFAULT now(),
  updatedAt timestamp without time zone NOT NULL DEFAULT now(),
  ipAddress text,
  userAgent text,
  userId text NOT NULL,
  CONSTRAINT session_pkey PRIMARY KEY (id),
  CONSTRAINT session_userId_fkey FOREIGN KEY (userId) REFERENCES public.user(id)
);
CREATE TABLE public.severity_weight (
  severity text NOT NULL,
  multiplier numeric,
  CONSTRAINT severity_weight_pkey PRIMARY KEY (severity)
);
CREATE TABLE public.subscription (
  id text NOT NULL,
  plan text NOT NULL,
  referenceId text NOT NULL,
  stripeCustomerId text,
  stripeSubscriptionId text,
  status text NOT NULL,
  periodStart timestamp without time zone,
  periodEnd timestamp without time zone,
  cancelAtPeriodEnd boolean,
  seats integer,
  trialStart timestamp without time zone,
  trialEnd timestamp without time zone,
  createdAt timestamp without time zone NOT NULL DEFAULT now(),
  updatedAt timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT subscription_pkey PRIMARY KEY (id)
);
CREATE TABLE public.temporal_decay_config (
  id integer NOT NULL DEFAULT nextval('temporal_decay_config_id_seq'::regclass),
  days_min integer NOT NULL,
  days_max integer,
  decay_factor numeric NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT temporal_decay_config_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user (
  id text NOT NULL,
  email text NOT NULL UNIQUE,
  emailVerified boolean NOT NULL DEFAULT false,
  name text,
  image text,
  createdAt timestamp without time zone NOT NULL DEFAULT now(),
  updatedAt timestamp without time zone NOT NULL DEFAULT now(),
  stripeCustomerId text,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_brief_counts (
  user_id text NOT NULL,
  current_month_count integer NOT NULL DEFAULT 0,
  current_month_start date NOT NULL DEFAULT (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone))::date,
  total_count integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_brief_counts_pkey PRIMARY KEY (user_id),
  CONSTRAINT user_brief_counts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.user_briefs (
  id integer NOT NULL DEFAULT nextval('user_briefs_id_seq'::regclass),
  user_id text NOT NULL,
  name text NOT NULL,
  organization text NOT NULL,
  brief_content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_briefs_pkey PRIMARY KEY (id),
  CONSTRAINT user_briefs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.verification (
  id text NOT NULL,
  identifier text NOT NULL,
  value text NOT NULL,
  expiresAt timestamp without time zone NOT NULL,
  createdAt timestamp without time zone NOT NULL DEFAULT now(),
  updatedAt timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT verification_pkey PRIMARY KEY (id)
);
</file>

<file path=".cursor/mcp.json">
{
    "mcpServers": {
      "supabase": {
        "command": "npx",
        "args": [
          "-y",
          "@supabase/mcp-server-supabase@latest",
          "--read-only",
          "--project-ref=cssqcaieeixukjxqpynp"
        ],
        "env": {
          "SUPABASE_ACCESS_TOKEN": "<personal-access-token>"
        }
      }
    }
  }
</file>

<file path="public/file.svg">
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
</file>

<file path="public/globe.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
</file>

<file path="public/next.svg">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
</file>

<file path="public/vercel.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
</file>

<file path="public/window.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
</file>

<file path="src/app/(dashboard)/scans/[scanId]/reports/page.tsx">
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Eye, RefreshCw, Building, Shield, ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { ReportViewer } from '@/components/reports/ReportViewer'

const REPORT_TYPE_CONFIG = {
  threat_snapshot: {
    title: 'Threat Snapshot',
    description: 'Executive dashboard focused on financial impact',
    icon: Building,
    maxWords: 650,
    color: 'text-red-600'
  },
  executive_summary: {
    title: 'Executive Summary', 
    description: 'Strategic overview for leadership',
    icon: Building,
    maxWords: 2500,
    color: 'text-blue-600'
  },
  technical_remediation: {
    title: 'Technical Remediation',
    description: 'Detailed technical implementation guide',
    icon: Shield,
    maxWords: 4500,
    color: 'text-green-600'
  }
}

export default function ScanReportsPage() {
  const params = useParams()
  const scanId = params.scanId as string
  const [selectedReport, setSelectedReport] = useState(null)

  // Use existing TanStack Query pattern
  const { data: scanData, isLoading: scanLoading } = useQuery({
    queryKey: ['scan', scanId],
    queryFn: async () => {
      const response = await fetch(`/api/scans/${scanId}`)
      if (!response.ok) throw new Error('Failed to fetch scan')
      return response.json()
    }
  })

  const { data: reports, isLoading: reportsLoading, refetch } = useQuery({
    queryKey: ['reports', scanId],
    queryFn: async () => {
      const response = await fetch(`/api/reports?scanId=${scanId}`)
      if (!response.ok) throw new Error('Failed to fetch reports')
      return response.json()
    }
  })

  const generateSpecificReport = async (reportType: string) => {
    try {
      // Get verified findings for this scan
      const findingsResponse = await fetch(`/api/findings?scanId=${scanId}`)
      const allFindings = await findingsResponse.json()
      const verifiedFindings = allFindings.filter((f: { state: string }) => f.state === 'VERIFIED')

      await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          scanId,
          reportType,
          findings: verifiedFindings,
          companyName: scanData?.company_name,
          domain: scanData?.domain
        })
      })
      
      refetch() // Refresh the data
    } catch (error) {
      console.error(`Failed to generate ${reportType}:`, error)
    }
  }

  const generateAllReports = async () => {
    const reportTypes = ['threat_snapshot', 'executive_summary', 'technical_remediation']
    
    for (const reportType of reportTypes) {
      await generateSpecificReport(reportType)
    }
  }

  if (scanLoading || reportsLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <Skeleton key={i} className="h-48 w-full" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header with back navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/scans/${scanId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scan
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{scanData?.company_name} Reports</h1>
          <p className="text-gray-600">{scanData?.domain} • Scan ID: {scanId}</p>
        </div>
        <Button onClick={generateAllReports} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Generate All Reports
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(REPORT_TYPE_CONFIG).map(([reportType, config]) => {
          const report = reports?.find((r: { report_type: string }) => r.report_type === reportType)
          const IconComponent = config.icon
          
          return (
            <Card key={reportType} className="hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => report?.status === 'completed' && setSelectedReport(report)}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-6 w-6 ${config.color}`} />
                  <div>
                    <CardTitle className="text-lg">{config.title}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Target length: ≤{config.maxWords.toLocaleString()} words
                  </div>
                  
                  {report ? (
                    <div className="space-y-3">
                      <Badge 
                        variant={report.status === 'completed' ? 'default' : 'secondary'}
                      >
                        {report.status === 'completed' ? 'Ready' : 'Generating...'}
                      </Badge>
                      
                      {report.status === 'completed' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedReport(report)
                            }}
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`/api/reports/${report.id}/download`, '_blank')
                            }}
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      )}
                      
                      {report.created_at && (
                        <p className="text-xs text-gray-500">
                          Generated: {new Date(report.created_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Badge variant="outline">Not Generated</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          generateSpecificReport(reportType)
                        }}
                        className="w-full"
                      >
                        Generate Report
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Scan Information */}
      {scanData && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Status:</span>
                <div className="mt-1">
                  <Badge variant={scanData.status === 'completed' ? 'default' : 'secondary'}>
                    {scanData.status}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Progress:</span>
                <div className="mt-1">{scanData.progress || 0}/{scanData.total_modules || 0} modules</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Created:</span>
                <div className="mt-1">{new Date(scanData.created_at).toLocaleDateString()}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Completed:</span>
                <div className="mt-1">
                  {scanData.completed_at ? new Date(scanData.completed_at).toLocaleDateString() : 'In progress'}
                </div>
              </div>
            </div>
            {scanData.tags && scanData.tags.length > 0 && (
              <div className="mt-4">
                <span className="font-medium text-gray-600">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scanData.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Report Viewer Modal using existing Dialog */}
      {selectedReport && (
        <ReportViewer 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </div>
  )
}
</file>

<file path="src/app/(dashboard)/scans/[scanId]/page.tsx">
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Activity,
  FileText
} from 'lucide-react'
import { Scan } from '@/lib/types/database'

export default function ScanProgressPage() {
  const params = useParams()
  const router = useRouter()
  const scanId = params.scanId as string
  
  const [scan, setScan] = useState<Scan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchScan = async () => {
      try {
        const response = await fetch(`/api/scans/${scanId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch scan')
        }
        const scanData = await response.json()
        setScan(scanData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchScan()

    // Poll for updates every 2 seconds if scan is in progress
    const interval = setInterval(() => {
      if (scan?.status === 'processing' || scan?.status === 'pending') {
        fetchScan()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [scanId, scan?.status])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading scan details...</p>
        </div>
      </div>
    )
  }

  if (error || !scan) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Scan Not Found</h2>
        <p className="text-muted-foreground mb-4">
          {error || 'The requested scan could not be found.'}
        </p>
        <Button onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    )
  }

  const progressPercentage = (scan.progress / scan.total_modules) * 100

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'processing': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'processing': return <Activity className="h-4 w-4 animate-spin" />
      case 'failed': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{scan.company_name}</h1>
          <p className="text-muted-foreground">{scan.domain}</p>
        </div>
        <Badge variant={getStatusVariant(scan.status)} className="gap-1">
          {getStatusIcon(scan.status)}
          {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
        </Badge>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Progress</CardTitle>
          <CardDescription>
            Security assessment progress across all modules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Modules Completed</span>
              <span>{scan.progress}/{scan.total_modules}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(progressPercentage)}% complete</span>
              <span>
                {scan.status === 'completed' 
                  ? 'Scan completed' 
                  : scan.status === 'processing'
                  ? 'Scanning in progress...'
                  : 'Waiting to start...'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Security Modules</CardTitle>
          <CardDescription>
            Individual module completion status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: scan.total_modules }, (_, i) => {
              const moduleNumber = i + 1
              const isCompleted = moduleNumber <= scan.progress
              const isCurrent = moduleNumber === scan.progress + 1 && scan.status === 'processing'
              
              return (
                <div
                  key={moduleNumber}
                  className={`
                    flex items-center gap-2 p-3 rounded-lg border
                    ${isCompleted 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : isCurrent
                      ? 'bg-blue-50 border-blue-200 text-blue-800'
                      : 'bg-muted/50 border-border text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : isCurrent ? (
                    <Activity className="h-4 w-4 animate-spin" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    Module {moduleNumber}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Scan Details */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scan Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Started:</span>
              <span>{new Date(scan.created_at).toLocaleString()}</span>
            </div>
            {scan.completed_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed:</span>
                <span>{new Date(scan.completed_at).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Modules:</span>
              <span>{scan.total_modules}</span>
            </div>
            {scan.tags && scan.tags.length > 0 && (
              <div className="space-y-2">
                <span className="text-muted-foreground">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {scan.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {scan.status === 'completed' ? (
              <>
                <p className="text-sm text-muted-foreground mb-3">
                  Your security scan has completed successfully. You can now review findings and generate reports.
                </p>
                <Button 
                  className="w-full" 
                  onClick={() => router.push(`/scans/${scanId}/findings`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Review Findings
                </Button>
              </>
            ) : scan.status === 'processing' ? (
              <>
                <p className="text-sm text-muted-foreground mb-3">
                  Your scan is currently in progress. You&apos;ll be able to review findings once it completes.
                </p>
                <Button variant="outline" className="w-full" disabled>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Scan in Progress...
                </Button>
              </>
            ) : scan.status === 'failed' ? (
              <>
                <p className="text-sm text-destructive mb-3">
                  Your scan has failed. Please try starting a new scan or contact support.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/scans/new')}
                >
                  Start New Scan
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-3">
                  Your scan is queued and will begin shortly.
                </p>
                <Button variant="outline" className="w-full" disabled>
                  <Clock className="mr-2 h-4 w-4" />
                  Waiting to Start...
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
</file>

<file path="src/app/(dashboard)/settings/page.tsx">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  User,
  Shield,
  Bell,
  Database
} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your security preferences and API keys
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Scan Completion</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when scans finish
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Critical Findings</p>
                <p className="text-sm text-muted-foreground">
                  Immediate alerts for critical security issues
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Integration Settings
            </CardTitle>
            <CardDescription>
              Manage external service integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supabaseUrl">Supabase URL</Label>
              <Input 
                id="supabaseUrl" 
                placeholder="https://your-project.supabase.co"
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="openaiKey">OpenAI API Key</Label>
              <Input 
                id="openaiKey" 
                type="password" 
                placeholder="sk-..."
                disabled
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              API keys are configured via environment variables for security.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
</file>

<file path="src/app/(dashboard)/layout.tsx">
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <div className="border-r bg-muted/40">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
</file>

<file path="src/app/api/dashboard/stats/route.ts">
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get total scans
    const { count: totalScans } = await supabase
      .from('scan_status')
      .select('*', { count: 'exact', head: true })

    // Get critical findings count
    const { count: criticalFindings } = await supabase
      .from('findings')
      .select('*', { count: 'exact', head: true })
      .eq('severity', 'CRITICAL')

    // Get verified issues count
    const { count: verifiedIssues } = await supabase
      .from('findings')
      .select('*', { count: 'exact', head: true })
      .eq('state', 'VERIFIED')

    // Get active scans count
    const { count: activeScans } = await supabase
      .from('scan_status')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pending', 'processing'])

    return NextResponse.json({
      totalScans: totalScans || 0,
      criticalFindings: criticalFindings || 0,
      verifiedIssues: verifiedIssues || 0,
      activeScans: activeScans || 0
    })
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
</file>

<file path="src/app/api/reports/[reportId]/download/route.ts">
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const resolvedParams = await params
    const reportId = resolvedParams.reportId
    
    const { data: report, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .single()
    
    if (error || !report) {
      return new NextResponse('Report not found', { status: 404 })
    }
    
    // Generate standalone HTML with embedded CSS
    const html = generateStandaloneHTML(report)
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${report.report_type}-${report.scan_id}.html"`
      }
    })
  } catch (error) {
    console.error('Failed to download report:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

function generateStandaloneHTML(report: { id: string; scan_id: string; company_name: string; domain: string; content: string; report_type: string; status: string; created_at: string; findings_count: number }): string {
  // Professional styling for standalone HTML
  const baseCSS = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        line-height: 1.6; 
        color: #374151; 
        background: #f9fafb;
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
      .header { 
        background: white; 
        border-bottom: 1px solid #e5e7eb; 
        padding: 2rem 0; 
        margin-bottom: 2rem; 
      }
      .header h1 { 
        font-size: 2.5rem; 
        font-weight: 300; 
        color: #1f2937; 
        margin-bottom: 1rem; 
      }
      .header .meta { 
        color: #6b7280; 
        display: flex; 
        gap: 1rem; 
        align-items: center; 
      }
      .content { 
        background: white; 
        border-radius: 0.75rem; 
        padding: 2rem; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
        margin-bottom: 2rem; 
      }
      .gradient-text { 
        background: linear-gradient(135deg, #ef4444, #dc2626); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color: transparent; 
        background-clip: text;
      }
      .risk-score { 
        text-align: center; 
        padding: 3rem; 
        background: linear-gradient(135deg, #f9fafb, #ffffff); 
        border-radius: 1rem; 
        border: 1px solid #e5e7eb; 
      }
      .risk-score .score { 
        font-size: 5rem; 
        font-weight: 100; 
        margin: 1rem 0; 
      }
      .financial-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
        gap: 1.5rem; 
        margin: 2rem 0; 
      }
      .financial-card { 
        background: white; 
        border: 1px solid #e5e7eb; 
        border-radius: 1rem; 
        padding: 1.5rem; 
        position: relative; 
        overflow: hidden; 
      }
      .financial-card.emphasis { 
        border-color: #fed7aa; 
        background: linear-gradient(135deg, #fef3c7, #fbbf24); 
      }
      .financial-card h3 { 
        font-size: 0.875rem; 
        font-weight: 600; 
        color: #6b7280; 
        text-transform: uppercase; 
        letter-spacing: 0.05em; 
        margin-bottom: 0.5rem; 
      }
      .financial-card .value { 
        font-size: 2.5rem; 
        font-weight: 300; 
        color: #1f2937; 
      }
      .financial-card.emphasis .value { 
        color: #92400e; 
      }
      .findings-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
        gap: 1.5rem; 
        margin: 2rem 0; 
      }
      .finding-card { 
        background: white; 
        border: 1px solid #e5e7eb; 
        border-radius: 0.5rem; 
        padding: 1.5rem; 
      }
      .badge { 
        display: inline-block; 
        padding: 0.25rem 0.75rem; 
        border-radius: 9999px; 
        font-size: 0.75rem; 
        font-weight: 600; 
        text-transform: uppercase; 
      }
      .badge.critical { background: #fef2f2; color: #dc2626; }
      .badge.high { background: #fff7ed; color: #ea580c; }
      .badge.medium { background: #fefce8; color: #ca8a04; }
      .badge.low { background: #f0f9ff; color: #0284c7; }
      pre { 
        background: #f3f4f6; 
        padding: 1rem; 
        border-radius: 0.5rem; 
        overflow-x: auto; 
        font-size: 0.875rem; 
        white-space: pre-wrap; 
      }
      @media print {
        body { background: white; }
        .container { padding: 1rem; }
        .content { box-shadow: none; border: 1px solid #e5e7eb; }
      }
    </style>
  `

  // Get report type specific styling
  const getReportTypeHeader = (reportType: string) => {
    switch (reportType) {
      case 'threat_snapshot':
        return {
          title: '🚨 Security Risk Assessment - Threat Snapshot',
          subtitle: 'Executive Dashboard Overview'
        }
      case 'executive_summary':
        return {
          title: '📊 Executive Security Briefing',
          subtitle: 'Strategic Security Overview'
        }
      case 'technical_remediation':
        return {
          title: '🛠️ Technical Remediation Guide',
          subtitle: 'Detailed Implementation Instructions'
        }
      default:
        return {
          title: '📋 Security Assessment Report',
          subtitle: 'Security Analysis Results'
        }
    }
  }

  const headerInfo = getReportTypeHeader(report.report_type)
  
  // Format content based on report type
  let formattedContent = report.content
  
  // If content is markdown, convert basic formatting
  if (typeof formattedContent === 'string') {
    formattedContent = formattedContent
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, '<pre>$1</pre>')
      .replace(/\`(.+?)\`/g, '<code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">$1</code>')
      .replace(/\\n\\n/g, '</p><p>')
      .replace(/\\n/g, '<br>')
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${headerInfo.title} - ${report.company_name}</title>
  ${baseCSS}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${headerInfo.title}</h1>
      <div class="meta">
        <strong>${report.company_name}</strong>
        <span>•</span>
        <span>${report.domain}</span>
        <span>•</span>
        <span>Generated: ${new Date(report.created_at).toLocaleDateString()}</span>
        <span>•</span>
        <span class="badge ${report.status === 'completed' ? 'high' : 'medium'}">${report.status}</span>
      </div>
    </div>

    <div class="content">
      <h2>${headerInfo.subtitle}</h2>
      <p style="color: #6b7280; margin-bottom: 2rem;">
        This report contains ${report.findings_count} verified security findings for ${report.company_name}.
      </p>
      
      <div style="white-space: pre-wrap; line-height: 1.8;">
        ${formattedContent}
      </div>
    </div>

    <div class="content">
      <h3>Report Information</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div>
          <strong>Report Type:</strong><br>
          <span class="badge medium">${report.report_type.replace('_', ' ').toUpperCase()}</span>
        </div>
        <div>
          <strong>Findings Count:</strong><br>
          ${report.findings_count} verified findings
        </div>
        <div>
          <strong>Generated:</strong><br>
          ${new Date(report.created_at).toLocaleString()}
        </div>
        <div>
          <strong>Status:</strong><br>
          <span class="badge ${report.status === 'completed' ? 'high' : 'medium'}">${report.status}</span>
        </div>
      </div>
    </div>

    <footer style="text-align: center; padding: 2rem; color: #6b7280; border-top: 1px solid #e5e7eb; margin-top: 2rem;">
      <p>This report was generated by DealBrief Security Platform</p>
      <p style="font-size: 0.875rem; margin-top: 0.5rem;">
        Report ID: ${report.id} | Scan ID: ${report.scan_id}
      </p>
    </footer>
  </div>
</body>
</html>`
}
</file>

<file path="src/app/api/reports/generate/# Due-Diligence Risk Assessment Prompt.ini">
# Due-Diligence Risk Assessment Prompt

**SYSTEM**
You are DealBrief-GPT, a senior U.S. cybersecurity analyst specializing in investor-grade due diligence reports. You write for private equity firms, investment banks, and corporate development teams evaluating acquisition targets. Always use American English, maintain a serious professional tone, and express financial impacts as concrete dollar values rounded to the nearest $1,000.

────────────────────────────────────────
## INPUT SPECIFICATIONS
Data from Supabase findings table in one of these formats:
• **SQL INSERT statements**: Extract VALUES clause and parse tuples
• **CSV with headers**: id, created_at, description, scan_id, type, recommendation, severity, attack_type_code, state, eal_low, eal_ml, eal_high

**Required fields per finding:**
- `id` (unique identifier)
- `description` (technical finding details)  
- `type` (risk category)
- `severity` (HIGH/MEDIUM/LOW)
- `attack_type_code` (threat vector)
- `eal_low`, `eal_ml`, `eal_high` (estimated annual loss integers)
- `recommendation` (remediation guidance)
- `created_at` (discovery timestamp)

────────────────────────────────────────
## ANALYSIS TASKS

### 1. Data Parsing & Validation
- Parse input format (SQL or CSV) without hallucinating missing fields
- Deduplicate identical findings (same type + description)
- Group all findings by scan_id for unified reporting

### 2. Portfolio Risk Calculation
- **Total EAL**: 
  • Primary estimate = sum of all eal_ml values
  • Confidence range = sum of all eal_low to sum of all eal_high
  • Format: ${sum_eal_ml} (range ${sum_eal_low}–${sum_eal_high})
- **Category Analysis**: Group by `type`, count findings, calculate category-level EAL using same logic
- **Timeline Analysis**: Note findings discovered in last 30 days vs. older issues

### 3. Priority Finding Selection
Apply this logic in order:
1. **Critical Path**: All HIGH severity findings
2. **Material Medium**: MEDIUM findings where individual eal_ml ≥ 75th percentile of all individual eal_ml values
3. **Recent Escalation**: Any findings discovered in last 7 days regardless of severity
4. **Cap at 15 findings maximum** to maintain report focus
5. **Sort final list**: eal_ml descending, then by severity (HIGH > MEDIUM > LOW)

### 4. Report Generation
- Use the exact template structure below
- Currency format: $XXX,000 (thousands, no decimals)
- Technical details verbatim in "Technical Description"
- Plain English (no jargon) in Executive Summary and Practical Explanations
- Include scan_id and generation timestamp

────────────────────────────────────────
## REPORT TEMPLATE

```markdown
# Cybersecurity Due Diligence Report
**Scan ID**: {scan_id} | **Generated**: {current_date}

## Executive Summary
{2-3 paragraph narrative ≤ 200 words covering:}
• **Total Estimated Annual Loss**: ${sum_eal_ml} (range ${sum_eal_low}–${sum_eal_high})
• **Critical exposures** in plain business language (avoid "CVE", "DMARC", etc.)
• **Overall security posture** relative to industry standards
• **Immediate actions required** to reduce material risk

## Risk Landscape
| Risk Category | Findings | Highest Severity | Est. Annual Loss |
|---------------|----------|------------------|------------------|
| {type} | {count} | {max_severity} | ${category_eal_ml} |
{...repeat for each category...}
| **TOTAL** | **{total_count}** | **—** | **${total_eal_ml}** |

## Remediation Guide
*Organized by category and severity for efficient resolution*

### {CATEGORY_NAME}
#### HIGH Severity
- **Finding {id}**: {recommendation}
- **Finding {id}**: {recommendation}

#### MEDIUM Severity  
- **Finding {id}**: {recommendation}

#### LOW Severity
- **Finding {id}**: {recommendation}

{...repeat for each category with findings...}

## Priority Findings
*{count} findings selected based on severity and financial impact*

### Finding {id} – {type} *(Severity: {severity})*
**Technical Description**
> {description}

**Business Impact**  
{1-2 sentences explaining how this specific vulnerability could harm operations, revenue, or reputation in plain English}

**Financial Exposure**  
**${eal_ml} annually** (range ${eal_low}–${eal_high})

**Recommended Action**  
{recommendation}
{Add specific first step if recommendation is generic, e.g., "Start by auditing all admin accounts created in the last 90 days."}

---
{...repeat for each priority finding...}

## Risk Methodology
This assessment uses the Cyber Risk Quantification (CRQ) framework standard in M&A due diligence:

1. **Base Loss Calculation**: Each vulnerability maps to historical incident data for similar attack vectors affecting mid-market U.S. companies
2. **Probability Modeling**: Likelihood estimates derived from NIST, Verizon DBIR, and industry-specific breach frequency data
3. **Severity Adjustments**: Environmental factors (exposure, complexity, existing controls) modify base probabilities
4. **Annual Loss Calculation**: EAL = (Attack Probability × Average Incident Cost); confidence intervals reflect uncertainty in both variables
5. **Portfolio Aggregation**: Simple summation across findings; no correlation adjustments applied

**Limitations**: Estimates assume current threat landscape and typical organizational response capabilities. Actual losses may vary significantly based on incident response maturity and business continuity preparedness.
```

────────────────────────────────────────
## QUALITY STANDARDS

**Accuracy**: Never fabricate data points. If fields are missing or malformed, explicitly note gaps rather than estimating.

**Clarity**: Executive Summary must be readable by non-technical stakeholders. Avoid security acronyms and explain impacts in business terms.

**Completeness**: Every priority finding must include all five subsections. If recommendation is generic, add specific implementation guidance.

**Professional Tone**: Write for sophisticated investors who need actionable intelligence, not security practitioners who need technical depth.

**Consistency**: Use identical formatting, currency presentation, and section structure throughout.
</file>

<file path="src/app/api/scans/bulk/route.ts">
import { NextRequest, NextResponse } from 'next/server'

interface BulkScanRequest {
  companyName: string
  domain: string
  tags?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { scans } = await request.json() as { scans: BulkScanRequest[] }

    if (!scans || !Array.isArray(scans) || scans.length === 0) {
      return NextResponse.json(
        { error: 'Scans array is required and must not be empty' },
        { status: 400 }
      )
    }

    // Validate each scan entry
    const validScans = scans.filter(scan => 
      scan.companyName && scan.companyName.trim() && 
      scan.domain && scan.domain.trim()
    )

    if (validScans.length === 0) {
      return NextResponse.json(
        { error: 'No valid scans found. Each scan must have companyName and domain' },
        { status: 400 }
      )
    }

    const results = []
    const errors = []

    // Process each scan sequentially to avoid overwhelming the external API
    for (const scan of validScans) {
      try {
        const response = await fetch('https://dealbrief-scanner.fly.dev/scans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://lfbi.vercel.app'
          },
          body: JSON.stringify({
            companyName: scan.companyName.trim(),
            domain: scan.domain.trim(),
            tags: scan.tags || []
          })
        })

        if (!response.ok) {
          throw new Error(`Scanner API error for ${scan.companyName}: ${response.statusText}`)
        }

        const result = await response.json()
        results.push({
          companyName: scan.companyName,
          domain: scan.domain,
          status: 'success',
          scanId: result.scanId || result.id
        })

        // Add a small delay between requests to be respectful to the external API
        await new Promise(resolve => setTimeout(resolve, 1000))

      } catch (error) {
        console.error(`Failed to start scan for ${scan.companyName}:`, error)
        errors.push({
          companyName: scan.companyName,
          domain: scan.domain,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      success: results.length > 0,
      total: validScans.length,
      successful: results.length,
      failed: errors.length,
      results,
      errors
    })

  } catch (error) {
    console.error('Failed to process bulk scans:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
</file>

<file path="src/components/layout/header.tsx">
'use client'

import { Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
</file>

<file path="src/components/layout/sidebar.tsx">
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Activity, 
  Plus, 
  FileText, 
  Settings,
  Search,
  Home
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'New Scan', href: '/scans/new', icon: Plus },
  { name: 'Active Scans', href: '/scans', icon: Activity },
  { name: 'Findings', href: '/findings', icon: Search },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">DealBrief</h2>
          </div>
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href))
              
              return (
                <Button
                  key={item.name}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-secondary'
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
</file>

<file path="src/components/reports/ReportViewer.tsx">
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, X, Maximize2, Shield, AlertCircle, Info, Building } from 'lucide-react'

interface ReportData {
  company_name?: string
  domain?: string
  scan_date?: string
  overall_risk_score?: number
  eal_ml_total?: number
  eal_daily_total?: number
  eal_low_total?: number
  eal_high_total?: number
  severity_counts?: Record<string, number>
  finding_types?: Array<{ category: string; count: number; severity: string }>
  critical_findings?: Array<{ id: number; title: string; severity: string; impact: string; description: string }>
}

interface ReportViewerProps {
  report: {
    id: string
    scan_id: string
    company_name: string
    domain: string
    content: string
    report_type: string
    status: string
    created_at: string
  }
  onClose: () => void
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function ReportViewer({ report, onClose }: ReportViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const renderThreatSnapshot = (data: ReportData) => {
    // Professional styling based on snapshot.md design principles
    return (
      <div className="min-h-screen bg-gray-50 print:bg-white">
        {/* Premium Header with gradient and professional typography */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-light text-gray-900">Security Risk Assessment</h1>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{data.company_name || report.company_name}</span>
                    <span className="mx-2">•</span>
                    <span>{data.domain || report.domain}</span>
                  </div>
                  <div>
                    <span className="mx-2">•</span>
                    <span>{formatDate(data.scan_date || report.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Executive Summary Section - EMPHASIS ON LOSSES FIRST */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Risk Score - Central Visual Element */}
            <div className="lg:row-span-2">
              <RiskScoreVisualization score={data.overall_risk_score || 72} />
            </div>
            
            {/* Financial Impact Grid - PROMINENT DISPLAY OF LOSSES */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
              <FinancialImpactCard 
                title="Expected Annual Loss"
                value={data.eal_ml_total || 425000}
                subtitle="Most likely scenario"
                emphasis={true}
              />
              <FinancialImpactCard 
                title="Daily Risk Exposure"
                value={data.eal_daily_total || 2500}
                subtitle="Cost per day if exploited"
              />
              <FinancialImpactCard 
                title="Best Case Estimate" 
                value={data.eal_low_total || 150000}
                subtitle="Conservative projection"
              />
              <FinancialImpactCard 
                title="Worst Case Scenario"
                value={data.eal_high_total || 850000}
                subtitle="Maximum potential impact"
              />
            </div>
          </div>
        </section>

        {/* Category-based Organization */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Security Findings Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SeverityDistribution data={data.severity_counts || { critical: 3, high: 8, medium: 15, low: 24 }} />
            <CategoryBreakdown data={data.finding_types || [
              { category: 'External Attack Surface', count: 12, severity: 'high' },
              { category: 'Infrastructure Security', count: 18, severity: 'medium' },
              { category: 'Application Security', count: 15, severity: 'high' },
              { category: 'Cloud Configuration', count: 5, severity: 'critical' }
            ]} />
          </div>
        </section>

        {/* Priority Findings */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">Priority Findings</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Immediate action required</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {(data.critical_findings || [
              {
                id: 1,
                title: 'Exposed Database Credentials',
                severity: 'critical',
                impact: 'High',
                description: 'Database credentials found in publicly accessible repository'
              },
              {
                id: 2,
                title: 'Unpatched Critical Vulnerabilities',
                severity: 'high',
                impact: 'Medium',
                description: 'Multiple critical CVEs affecting web application framework'
              }
            ]).map((finding: { id: number; title: string; severity: string; impact: string; description: string }) => (
              <FindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </section>

        {/* Raw Content if markdown */}
        {report.content && report.content.includes('```') && (
          <section className="max-w-7xl mx-auto px-8 py-12">
            <h2 className="text-2xl font-light text-gray-900 mb-8">Full Report Content</h2>
            <div className="bg-white rounded-lg border p-6 prose prose-gray max-w-none">
              <pre className="whitespace-pre-wrap text-sm">{report.content}</pre>
            </div>
          </section>
        )}
      </div>
    )
  }

  const renderExecutiveSummary = (data: ReportData) => {
    return (
      <div className="prose prose-lg max-w-none bg-white p-8">
        <div className="not-prose mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-light text-gray-900">Executive Security Briefing</h1>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">{data.company_name || report.company_name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(data.scan_date || report.created_at)}</span>
          </div>
        </div>
        <div className="whitespace-pre-wrap">{report.content}</div>
      </div>
    )
  }

  const renderTechnicalRemediation = (data: ReportData) => {
    return (
      <div className="prose prose-lg max-w-none prose-code:text-sm bg-white p-8">
        <div className="not-prose mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-light text-gray-900">Technical Remediation Guide</h1>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">{data.company_name || report.company_name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(data.scan_date || report.created_at)}</span>
          </div>
        </div>
        <div className="whitespace-pre-wrap">{report.content}</div>
      </div>
    )
  }

  // Parse report content (markdown or JSON)
  const parseReportData = () => {
    try {
      return JSON.parse(report.content || '{}')
    } catch {
      // If it's markdown, extract basic info and return structure
      return {
        company_name: report.company_name,
        domain: report.domain,
        scan_date: report.created_at,
        overall_risk_score: 72 // Default value
      }
    }
  }

  const data = parseReportData()

  const renderReport = () => {
    switch (report.report_type) {
      case 'threat_snapshot':
        return renderThreatSnapshot(data)
      case 'executive_summary':
        return renderExecutiveSummary(data)
      case 'technical_remediation':
        return renderTechnicalRemediation(data)
      default:
        return (
          <div className="p-8">
            <h2 className="text-xl font-bold mb-4">
              {report.report_type?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            </h2>
            <div className="whitespace-pre-wrap">{report.content}</div>
          </div>
        )
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-7xl ${isFullscreen ? 'h-screen' : 'h-[90vh]'} overflow-hidden`}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl">
              {report.report_type?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            </DialogTitle>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="outline">{report.status}</Badge>
              <span className="text-sm text-gray-500">
                Generated: {formatDate(report.created_at)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/api/reports/${report.id}/download`, '_blank')}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto border rounded-lg bg-white">
          {renderReport()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Supporting components based on snapshot.md design principles
const RiskScoreVisualization = ({ score }: { score: number }) => {
  const getGradient = (score: number) => {
    if (score <= 30) return 'from-emerald-400 to-teal-500'
    if (score <= 60) return 'from-amber-400 to-orange-500'
    if (score <= 80) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-red-600'
  }
  
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="relative p-12">
        <div className="text-center mb-8">
          <h3 className="text-sm font-medium text-gray-500 tracking-wider uppercase">Overall Risk Score</h3>
        </div>
        <div className="relative bg-gray-50/50 rounded-2xl p-8 border border-gray-100">
          <div className={`text-8xl font-thin bg-gradient-to-br ${getGradient(score)} bg-clip-text text-transparent text-center`}>
            {score}
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-600 text-lg">out of 100</span>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-red-50 rounded-full">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-900 font-medium">
              {score > 70 ? 'High Risk Environment' : score > 40 ? 'Medium Risk Environment' : 'Low Risk Environment'}
            </span>
          </div>
        </div>
        <div className="mt-8">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getGradient(score)} transition-all duration-1000 ease-out rounded-full`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Low Risk</span>
            <span>Critical Risk</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const FinancialImpactCard = ({ title, value, subtitle, emphasis }: {
  title: string
  value: number
  subtitle?: string
  emphasis?: boolean
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl ${
      emphasis ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50' : 'border-gray-200 bg-white'
    }`}>
      <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${
        emphasis ? 'from-orange-200 to-amber-200' : 'from-gray-100 to-gray-200'
      } rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`} />
      
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{title}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className={`text-4xl font-light ${
              emphasis ? 'text-orange-900' : 'text-gray-900'
            }`}>
              {formatCurrency(value)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SeverityDistribution = ({ data }: { data: Record<string, number> }) => {
  const total = Object.values(data).reduce((sum: number, count: number) => sum + count, 0)
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Findings by Severity</h3>
      <div className="space-y-4">
        {Object.entries(data).map(([severity, count]: [string, number]) => (
          <div key={severity} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                severity === 'critical' ? 'bg-red-500' :
                severity === 'high' ? 'bg-orange-500' :
                severity === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
              <span className="capitalize font-medium">{severity}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{count}</span>
              <span className="text-gray-500 text-sm">({Math.round((count / total) * 100)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CategoryBreakdown = ({ data }: { data: Array<{ category: string; count: number; severity: string }> }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Findings by Category</h3>
      <div className="space-y-4">
        {data.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <div className="font-medium">{category.category}</div>
              <div className="text-sm text-gray-500">
                Primary concern: {category.severity}
              </div>
            </div>
            <Badge variant="outline">{category.count}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

const FindingCard = ({ finding }: { finding: { id: number; title: string; severity: string; impact: string; description: string } }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-gray-900">{finding.title}</h4>
          <p className="text-gray-600 mt-1">{finding.description}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={finding.severity === 'critical' ? 'destructive' : 'secondary'}>
            {finding.severity}
          </Badge>
          <Badge variant="outline">{finding.impact} Impact</Badge>
        </div>
      </div>
    </div>
  )
}
</file>

<file path="src/components/ui/badge.tsx">
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
</file>

<file path="src/components/ui/button.tsx">
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
</file>

<file path="src/components/ui/card.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
</file>

<file path="src/components/ui/checkbox.tsx">
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
</file>

<file path="src/components/ui/collapsible.tsx">
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
</file>

<file path="src/components/ui/dialog.tsx">
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
</file>

<file path="src/components/ui/dropdown-menu.tsx">
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
</file>

<file path="src/components/ui/input.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
</file>

<file path="src/components/ui/label.tsx">
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
</file>

<file path="src/components/ui/progress.tsx">
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
</file>

<file path="src/components/ui/select.tsx">
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
</file>

<file path="src/components/ui/skeleton.tsx">
import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
</file>

<file path="src/components/ui/table.tsx">
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
</file>

<file path="src/components/ui/tabs.tsx">
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined)

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '')
  const currentValue = value ?? internalValue
  
  const handleValueChange = React.useCallback((newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }, [value, onValueChange])

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
})
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string
  }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component')
  }

  const isActive = context.value === value

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'hover:bg-muted/50 hover:text-foreground',
        className
      )}
      onClick={() => context.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
})
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
  }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component')
  }

  if (context.value !== value) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
</file>

<file path="src/lib/providers.tsx">
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
</file>

<file path="src/lib/supabase.ts">
import { createClient } from '@supabase/supabase-js'
import { Database } from './types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
</file>

<file path="src/lib/utils.ts">
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
</file>

<file path=".gitignore">
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
</file>

<file path="claudeupdate.md">
# Frontend Update Instructions for Scan Management & Report Generation

## Overview
This document provides detailed instructions to update the frontend with enhanced scan management functionality, including individual and bulk scan triggering, findings review, and automated report generation with professional HTML designs based on the snapshot.md template.

## Required Updates

### 1. Enhanced Scan Triggering Interface

#### Update `/src/app/(dashboard)/scans/new/page.tsx`

**Current State**: Basic single/bulk scan creation
**Required Enhancement**: Add auto-report generation options

```typescript
// Add to the form schema
const formSchema = z.object({
  // ... existing fields
  autoGenerateReports: z.boolean().default(true),
  reportTypes: z.array(z.enum(['threat_snapshot', 'executive_summary', 'technical_remediation'])).default(['threat_snapshot', 'executive_summary', 'technical_remediation'])
})

// Add to the form component
<div className="space-y-4">
  <div className="flex items-center space-x-2">
    <Checkbox 
      id="autoGenerateReports" 
      checked={form.watch('autoGenerateReports')}
      onCheckedChange={(checked) => form.setValue('autoGenerateReports', checked)}
    />
    <label htmlFor="autoGenerateReports" className="text-sm font-medium">
      Auto-generate all three reports upon scan completion
    </label>
  </div>
  
  {form.watch('autoGenerateReports') && (
    <div className="ml-6 space-y-2">
      <p className="text-sm text-gray-600">Reports to generate:</p>
      <div className="space-y-2">
        {[
          { id: 'threat_snapshot', label: 'Threat Snapshot (Executive Dashboard)' },
          { id: 'executive_summary', label: 'Executive Summary (Strategic Overview)' },
          { id: 'technical_remediation', label: 'Technical Remediation Guide' }
        ].map((report) => (
          <div key={report.id} className="flex items-center space-x-2">
            <Checkbox 
              id={report.id}
              checked={form.watch('reportTypes').includes(report.id)}
              onCheckedChange={(checked) => {
                const current = form.watch('reportTypes')
                if (checked) {
                  form.setValue('reportTypes', [...current, report.id])
                } else {
                  form.setValue('reportTypes', current.filter(t => t !== report.id))
                }
              }}
            />
            <label htmlFor={report.id} className="text-sm">{report.label}</label>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
```

### 2. Enhanced Scan List with Report Management

#### Update `/src/app/(dashboard)/scans/page.tsx`

**Add Report Status Column**:
```typescript
// Add to the columns definition
{
  accessorKey: "reports",
  header: "Reports",
  cell: ({ row }) => {
    const scan = row.original
    const reportCount = scan.reports?.length || 0
    const pendingReports = scan.reports?.filter(r => r.status === 'pending').length || 0
    
    return (
      <div className="flex items-center gap-2">
        <Badge variant={reportCount > 0 ? "default" : "secondary"}>
          {reportCount} Generated
        </Badge>
        {pendingReports > 0 && (
          <Badge variant="outline">
            {pendingReports} Pending
          </Badge>
        )}
      </div>
    )
  }
}

// Add actions column with report link
{
  id: "actions",
  cell: ({ row }) => {
    const scan = row.original
    const hasReports = scan.reports && scan.reports.length > 0
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/scans/${scan.scan_id}`}>View Details</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/scans/${scan.scan_id}/findings`}>View Findings</Link>
          </DropdownMenuItem>
          {hasReports && (
            <DropdownMenuItem>
              <Link href={`/scans/${scan.scan_id}/reports`}>View Reports</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => triggerReportGeneration(scan.scan_id)}
            disabled={scan.status !== 'completed'}
          >
            Generate Reports
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
```

### 3. New Scan Reports Page

#### Create `/src/app/(dashboard)/scans/[scanId]/reports/page.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Download, Eye, RefreshCw } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const REPORT_TYPE_CONFIG = {
  threat_snapshot: {
    title: 'Threat Snapshot',
    description: 'Executive dashboard focused on financial impact',
    icon: FileText,
    maxWords: 650
  },
  executive_summary: {
    title: 'Executive Summary', 
    description: 'Strategic overview for leadership',
    icon: FileText,
    maxWords: 2500
  },
  technical_remediation: {
    title: 'Technical Remediation',
    description: 'Detailed technical implementation guide',
    icon: FileText,
    maxWords: 4500
  }
}

export default function ScanReportsPage() {
  const params = useParams()
  const scanId = params.scanId as string
  const [reports, setReports] = useState([])
  const [scanData, setScanData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState(null)

  useEffect(() => {
    loadScanAndReports()
  }, [scanId])

  const loadScanAndReports = async () => {
    try {
      const [scanResponse, reportsResponse] = await Promise.all([
        fetch(`/api/scans/${scanId}`),
        fetch(`/api/reports?scanId=${scanId}`)
      ])
      
      const scan = await scanResponse.json()
      const reportsData = await reportsResponse.json()
      
      setScanData(scan)
      setReports(reportsData)
    } catch (error) {
      console.error('Failed to load scan reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateAllReports = async () => {
    const reportTypes = ['threat_snapshot', 'executive_summary', 'technical_remediation']
    
    for (const reportType of reportTypes) {
      try {
        await fetch('/api/reports/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scanId, reportType })
        })
      } catch (error) {
        console.error(`Failed to generate ${reportType}:`, error)
      }
    }
    
    loadScanAndReports() // Refresh the data
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <Skeleton key={i} className="h-48" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{scanData?.company_name} Reports</h1>
          <p className="text-gray-600">{scanData?.domain} • Scan ID: {scanId}</p>
        </div>
        <Button onClick={generateAllReports} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Generate All Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(REPORT_TYPE_CONFIG).map(([reportType, config]) => {
          const report = reports.find(r => r.report_type === reportType)
          const IconComponent = config.icon
          
          return (
            <Card key={reportType} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{config.title}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Target length: ≤{config.maxWords.toLocaleString()} words
                  </div>
                  
                  {report ? (
                    <div className="space-y-3">
                      <Badge 
                        variant={report.status === 'completed' ? 'default' : 'secondary'}
                      >
                        {report.status === 'completed' ? 'Ready' : 'Generating...'}
                      </Badge>
                      
                      {report.status === 'completed' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedReport(report)}
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => window.open(`/api/reports/${report.id}/download`, '_blank')}
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      )}
                      
                      {report.created_at && (
                        <p className="text-xs text-gray-500">
                          Generated: {new Date(report.created_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Badge variant="outline">Not Generated</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => generateSpecificReport(reportType)}
                        className="w-full"
                      >
                        Generate Report
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Report Viewer Modal/Panel */}
      {selectedReport && (
        <ReportViewer 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </div>
  )
}
```

### 4. Professional Report Viewer Component

#### Create `/src/components/reports/ReportViewer.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, X, Maximize2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface ReportViewerProps {
  report: any
  onClose: () => void
}

export function ReportViewer({ report, onClose }: ReportViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const renderThreatSnapshot = (data: any) => {
    return (
      <div className="min-h-screen bg-gray-50 print:bg-white">
        {/* Premium Header */}
        <header className="bg-white border-b border-gray-200 print:border-gray-300">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-light text-gray-900">Security Risk Assessment</h1>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{data.company_name}</span>
                    <span className="mx-2">•</span>
                    <span>{data.domain}</span>
                  </div>
                  <div>
                    <span className="mx-2">•</span>
                    <span>{formatDate(data.scan_date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Executive Summary Section */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Risk Score */}
            <div className="lg:row-span-2">
              <RiskScoreVisualization score={data.overall_risk_score} />
            </div>
            
            {/* Financial Impact Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
              <FinancialImpactCard 
                title="Expected Annual Loss"
                value={data.eal_ml_total}
                subtitle="Most likely scenario"
                emphasis={true}
              />
              <FinancialImpactCard 
                title="Daily Risk Exposure"
                value={data.eal_daily_total}
                subtitle="Cost per day if exploited"
              />
              <FinancialImpactCard 
                title="Best Case Estimate"
                value={data.eal_low_total}
                subtitle="Conservative projection"
              />
              <FinancialImpactCard 
                title="Worst Case Scenario"
                value={data.eal_high_total}
                subtitle="Maximum potential impact"
              />
            </div>
          </div>
        </section>

        {/* Findings Analysis */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Security Findings Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SeverityDistribution data={data.severity_counts} />
            <CategoryBreakdown data={data.finding_types} />
          </div>
        </section>

        {/* Priority Findings */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">Priority Findings</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Immediate action required</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {data.critical_findings?.map((finding) => (
              <FindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </section>
      </div>
    )
  }

  const renderExecutiveSummary = (data: any) => {
    // Similar structure but with executive summary specific styling
    return (
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    )
  }

  const renderTechnicalRemediation = (data: any) => {
    // Technical report with code blocks and remediation steps
    return (
      <div className="prose prose-lg max-w-none prose-code:text-sm">
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    )
  }

  const renderReport = () => {
    const data = JSON.parse(report.content || '{}')
    
    switch (report.report_type) {
      case 'threat_snapshot':
        return renderThreatSnapshot(data)
      case 'executive_summary':
        return renderExecutiveSummary(data)
      case 'technical_remediation':
        return renderTechnicalRemediation(data)
      default:
        return <div>Unsupported report type</div>
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-7xl ${isFullscreen ? 'h-screen' : 'h-[90vh]'} overflow-hidden`}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl">
              {report.report_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </DialogTitle>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="outline">{report.status}</Badge>
              <span className="text-sm text-gray-500">
                Generated: {formatDate(report.created_at)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/api/reports/${report.id}/download`, '_blank')}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto border rounded-lg bg-white">
          {renderReport()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Supporting components from snapshot.md design
const RiskScoreVisualization = ({ score }) => {
  const getGradient = (score) => {
    if (score <= 30) return 'from-emerald-400 to-teal-500'
    if (score <= 60) return 'from-amber-400 to-orange-500'
    if (score <= 80) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-red-600'
  }
  
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="relative p-12">
        <div className="text-center mb-8">
          <h3 className="text-sm font-medium text-gray-500 tracking-wider uppercase">Overall Risk Score</h3>
        </div>
        <div className="relative bg-gray-50/50 rounded-2xl p-8 border border-gray-100">
          <div className={`text-8xl font-thin bg-gradient-to-br ${getGradient(score)} bg-clip-text text-transparent text-center`}>
            {score}
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-600 text-lg">out of 100</span>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-red-50 rounded-full">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-900 font-medium">
              {score > 70 ? 'High Risk Environment' : score > 40 ? 'Medium Risk Environment' : 'Low Risk Environment'}
            </span>
          </div>
        </div>
        <div className="mt-8">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getGradient(score)} transition-all duration-1000 ease-out rounded-full`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Low Risk</span>
            <span>Critical Risk</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const FinancialImpactCard = ({ title, value, subtitle, emphasis }) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl ${
      emphasis ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50' : 'border-gray-200 bg-white'
    }`}>
      <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${
        emphasis ? 'from-orange-200 to-amber-200' : 'from-gray-100 to-gray-200'
      } rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`} />
      
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{title}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className={`text-4xl font-light ${
              emphasis ? 'text-orange-900' : 'text-gray-900'
            }`}>
              {formatCurrency(value)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Additional components for SeverityDistribution, CategoryBreakdown, and FindingCard
// ... (include the remaining components from snapshot.md)
```

### 5. API Routes Enhancement

#### Update `/src/app/api/reports/route.ts`

```typescript
import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const scanId = searchParams.get('scanId')
  
  const supabase = createClient()
  
  let query = supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (scanId) {
    query = query.eq('scan_id', scanId)
  }
  
  const { data, error } = await query
  
  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
  
  return Response.json(data)
}
```

#### Create `/src/app/api/reports/[reportId]/download/route.ts`

```typescript
import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  const reportId = params.reportId
  const supabase = createClient()
  
  const { data: report, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', reportId)
    .single()
  
  if (error || !report) {
    return new Response('Report not found', { status: 404 })
  }
  
  // Generate PDF or formatted HTML for download
  const html = generateReportHTML(report)
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="${report.report_type}-${report.scan_id}.html"`
    }
  })
}

function generateReportHTML(report: any): string {
  // Convert report content to standalone HTML with embedded CSS
  const baseCSS = `
    <style>
      /* Include Tailwind CSS styles inline for standalone HTML */
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
      /* Add all necessary styles from snapshot.md design */
    </style>
  `
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${report.report_type} - ${report.scan_id}</title>
      ${baseCSS}
    </head>
    <body>
      <div class="container">
        ${report.content}
      </div>
    </body>
    </html>
  `
}
```

### 6. Automatic Report Generation

#### Update `/src/app/api/scans/route.ts`

Add automatic report generation trigger when scan completes:

```typescript
// In the scan completion handler
if (scanResult.status === 'completed' && scanResult.findings?.length > 0) {
  // Auto-generate reports if enabled
  if (requestData.autoGenerateReports) {
    const reportTypes = requestData.reportTypes || ['threat_snapshot', 'executive_summary', 'technical_remediation']
    
    for (const reportType of reportTypes) {
      // Trigger async report generation
      fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          scanId: scanResult.scan_id, 
          reportType 
        })
      }).catch(console.error) // Fire and forget
    }
  }
}
```

### 7. Navigation Updates

#### Update `/src/components/layout/sidebar.tsx`

Add scan report navigation:

```typescript
const menuItems = [
  // ... existing items
  {
    href: '/scans',
    label: 'Security Scans',
    icon: Shield,
    subItems: [
      { href: '/scans/new', label: 'New Scan' },
      { href: '/scans', label: 'All Scans' },
      { href: '/reports', label: 'All Reports' }
    ]
  },
  // ... rest of items
]
```

## Implementation Steps

1. **Phase 1**: Update scan creation form with auto-report options
2. **Phase 2**: Create the scan reports page and viewer component  
3. **Phase 3**: Implement professional report rendering with snapshot.md styling
4. **Phase 4**: Add report download functionality
5. **Phase 5**: Integrate automatic report generation
6. **Phase 6**: Update navigation and UI consistency

## Key Design Principles

- **Emphasis on Losses**: Financial impact metrics prominently displayed first
- **Risk Score**: Central visual element showing overall security posture  
- **Category-based Organization**: Group findings by threat categories
- **Professional Aesthetics**: Clean, gradient-based design matching snapshot.md
- **Responsive Design**: Works across all device sizes
- **Print-friendly**: Optimized for PDF generation and printing

## Testing Requirements

1. Test single and bulk scan creation with auto-report generation
2. Verify all three report types generate correctly
3. Ensure report viewer displays properly formatted content
4. Test download functionality across different browsers
5. Validate responsive design on mobile devices
6. Confirm print/PDF output quality

This comprehensive update will transform the frontend into a complete security scanning and reporting platform with professional, client-ready reports based on the proven snapshot.md design.
</file>

<file path="components.json">
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
</file>

<file path="eslint.config.mjs">
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
</file>

<file path="findings_rows-3.csv">
id,created_at,description,scan_id,type,recommendation,severity,attack_type_code,state,eal_low,eal_ml,eal_high,eal_daily
2501,2025-06-27 19:06:34.555,"Breach sources: Collection 1, Unknown, MyFitnessPal.com, ShareThis.com, AT&T, MGMResorts.com, Verifications.io, ExploreTalent.com, National Public Data, Flexbooker.com... (+4 more)",rxcu4jBjGtl,MULTIPLE_BREACH_SOURCES,Domain lodging-source.com found in 14 different breach databases,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2502,2025-06-27 19:06:41.677,DMARC policy is in monitoring mode (p=none) and provides no active protection.,rxcu4jBjGtl,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2503,2025-06-27 19:06:42.88,Exposed service on port 443,rxcu4jBjGtl,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2504,2025-06-27 19:06:52.747,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),rxcu4jBjGtl,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2505,2025-06-27 19:07:03.903,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),rxcu4jBjGtl,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2506,2025-06-27 19:07:03.907,No valid SSL/TLS certificate found on any tested host variant,rxcu4jBjGtl,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2507,2025-06-27 19:07:26.315,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,rxcu4jBjGtl,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2508,2025-06-27 19:07:26.744,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,rxcu4jBjGtl,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2509,2025-06-27 19:07:27.098,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,rxcu4jBjGtl,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2510,2025-06-27 19:07:27.187,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,rxcu4jBjGtl,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2511,2025-06-27 19:09:40.651,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,rxcu4jBjGtl,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2512,2025-06-27 19:13:44.01,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,rxcu4jBjGtl,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (42 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2513,2025-06-27 19:13:44.088,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,rxcu4jBjGtl,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (4 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2514,2025-06-27 19:13:44.09,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,rxcu4jBjGtl,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (13 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2515,2025-06-27 19:13:44.17,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,rxcu4jBjGtl,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (48 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2516,2025-06-27 19:13:44.251,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,rxcu4jBjGtl,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (4 elements across 4 pages),HIGH,ADA_COMPLIANCE,VERIFIED,2000,7500,15000,
2517,2025-06-27 19:13:44.327,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,rxcu4jBjGtl,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (4 elements across 4 pages)",HIGH,ADA_COMPLIANCE,VERIFIED,2000,7500,15000,
2518,2025-06-27 19:14:43.885,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",rxcu4jBjGtl,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,DISREGARD,10000,19000,38000,
2519,2025-06-27 21:23:58.77,Infostealer sources: Stealer Logs. Sample users: mike,9B4x4CU9ED5,INFOSTEALER_COMPROMISE,CRITICAL: 1 employees compromised by infostealer malware (63 corporate emails),MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2520,2025-06-27 21:23:58.774,Passwords exposed across 14 breach databases,9B4x4CU9ED5,PASSWORD_EXPOSURE,HIGH: 6 employees have exposed passwords in breaches,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2521,2025-06-27 21:23:58.776,"Email exposure across 14 sources. Corporate: 63, Personal: 0",9B4x4CU9ED5,EMAIL_EXPOSURE,MEDIUM: 56 employee email addresses found in breach databases,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2522,2025-06-27 21:23:58.778,"Sources: Collection 1, Unknown, MyFitnessPal.com, ShareThis.com, AT&T...",9B4x4CU9ED5,BREACH_SUMMARY,"Breach Summary: 63 total employees exposed (1 infostealer, 6 password, 56 email-only)",MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2523,2025-06-27 21:23:58.781,"Breach sources: Collection 1, Unknown, MyFitnessPal.com, ShareThis.com, AT&T, MGMResorts.com, Verifications.io, ExploreTalent.com, National Public Data, Flexbooker.com... (+4 more)",9B4x4CU9ED5,MULTIPLE_BREACH_SOURCES,Domain lodging-source.com found in 14 different breach databases,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2524,2025-06-27 21:24:05.299,DMARC policy is in monitoring mode (p=none) and provides no active protection.,9B4x4CU9ED5,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2525,2025-06-27 21:24:06.353,Exposed service on port 443,9B4x4CU9ED5,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2526,2025-06-27 21:24:16.351,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),9B4x4CU9ED5,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2527,2025-06-27 21:24:27.72,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),9B4x4CU9ED5,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2528,2025-06-27 21:24:27.724,No valid SSL/TLS certificate found on any tested host variant,9B4x4CU9ED5,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2529,2025-06-27 21:24:50.999,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,9B4x4CU9ED5,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2530,2025-06-27 21:24:51.458,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,9B4x4CU9ED5,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2531,2025-06-27 21:24:51.655,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,9B4x4CU9ED5,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2532,2025-06-27 21:24:51.87,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,9B4x4CU9ED5,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2533,2025-06-27 21:27:05.268,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,9B4x4CU9ED5,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2534,2025-06-27 21:31:27.636,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,9B4x4CU9ED5,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2535,2025-06-27 21:31:27.639,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,9B4x4CU9ED5,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2536,2025-06-27 21:31:27.64,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,9B4x4CU9ED5,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (3 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2537,2025-06-27 21:31:27.642,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,9B4x4CU9ED5,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (12 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2538,2025-06-27 21:31:27.643,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,9B4x4CU9ED5,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2539,2025-06-27 21:31:27.645,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,9B4x4CU9ED5,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (1 elements across 1 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2540,2025-06-27 21:32:11.081,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",9B4x4CU9ED5,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2541,2025-06-28 03:06:24.66,Infostealer sources: Stealer Logs. Sample users: mike,bVnwKbt6Tez,INFOSTEALER_COMPROMISE,CRITICAL: 1 employees compromised by infostealer malware (63 corporate emails),MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2542,2025-06-28 03:06:24.664,Passwords exposed across 14 breach databases,bVnwKbt6Tez,PASSWORD_EXPOSURE,HIGH: 6 employees have exposed passwords in breaches,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2543,2025-06-28 03:06:24.665,"Email exposure across 14 sources. Corporate: 63, Personal: 0",bVnwKbt6Tez,EMAIL_EXPOSURE,MEDIUM: 56 employee email addresses found in breach databases,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2544,2025-06-28 03:06:24.667,"Sources: Collection 1, Unknown, MyFitnessPal.com, ShareThis.com, AT&T...",bVnwKbt6Tez,BREACH_SUMMARY,"Breach Summary: 63 total employees exposed (1 infostealer, 6 password, 56 email-only)",MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2545,2025-06-28 03:06:24.669,"Breach sources: Collection 1, Unknown, MyFitnessPal.com, ShareThis.com, AT&T, MGMResorts.com, Verifications.io, ExploreTalent.com, National Public Data, Flexbooker.com... (+4 more)",bVnwKbt6Tez,MULTIPLE_BREACH_SOURCES,Domain lodging-source.com found in 14 different breach databases,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2546,2025-06-28 03:06:31.425,DMARC policy is in monitoring mode (p=none) and provides no active protection.,bVnwKbt6Tez,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2547,2025-06-28 03:06:32.2,Exposed service on port 443,bVnwKbt6Tez,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2548,2025-06-28 03:06:32.206,Exposed service on port 443,bVnwKbt6Tez,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2549,2025-06-28 03:06:42.394,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),bVnwKbt6Tez,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2550,2025-06-28 03:06:53.523,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),bVnwKbt6Tez,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2551,2025-06-28 03:06:53.526,No valid SSL/TLS certificate found on any tested host variant,bVnwKbt6Tez,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2552,2025-06-28 03:07:28.059,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,bVnwKbt6Tez,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2553,2025-06-28 03:07:28.444,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,bVnwKbt6Tez,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2554,2025-06-28 03:07:28.925,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,bVnwKbt6Tez,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2555,2025-06-28 03:07:29.123,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,bVnwKbt6Tez,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2556,2025-06-28 03:09:42.195,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,bVnwKbt6Tez,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2557,2025-06-28 03:13:48.576,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,bVnwKbt6Tez,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (16 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2558,2025-06-28 03:13:48.58,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,bVnwKbt6Tez,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (2 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2559,2025-06-28 03:13:48.581,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,bVnwKbt6Tez,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (6 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2560,2025-06-28 03:13:48.582,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,bVnwKbt6Tez,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (24 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2561,2025-06-28 03:13:48.583,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,bVnwKbt6Tez,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (2 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2562,2025-06-28 03:13:48.584,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,bVnwKbt6Tez,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (2 elements across 2 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2563,2025-06-28 03:14:37.814,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",bVnwKbt6Tez,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2564,2025-06-28 20:20:04.686,"CRITICAL - Infostealer victims: mike | Sources: Stealer Logs | MEDIUM - Password exposure: jayme, kelli, jessica, lauren, mike, mike | Total breach sources: 14 | Corporate emails: 7, Personal: 0",3OiHl0SRpc7,BREACH_ANALYSIS,"7 employees found in breach databases: 1 infostealer victims, 6 with passwords only",MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2565,2025-06-28 20:20:11.461,DMARC policy is in monitoring mode (p=none) and provides no active protection.,3OiHl0SRpc7,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2566,2025-06-28 20:20:12.066,Exposed service on port 443,3OiHl0SRpc7,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2567,2025-06-28 20:20:12.073,Exposed service on port 443,3OiHl0SRpc7,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2568,2025-06-28 20:20:22.57,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),3OiHl0SRpc7,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2569,2025-06-28 20:20:33.722,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),3OiHl0SRpc7,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2570,2025-06-28 20:20:33.728,No valid SSL/TLS certificate found on any tested host variant,3OiHl0SRpc7,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2571,2025-06-28 20:20:56.836,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,3OiHl0SRpc7,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2572,2025-06-28 20:20:57.362,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,3OiHl0SRpc7,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2573,2025-06-28 20:20:57.616,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,3OiHl0SRpc7,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2574,2025-06-28 20:20:57.623,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,3OiHl0SRpc7,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2575,2025-06-28 20:23:11.481,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,3OiHl0SRpc7,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2576,2025-06-28 20:28:25.048,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,3OiHl0SRpc7,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2577,2025-06-28 20:28:25.051,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,3OiHl0SRpc7,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2578,2025-06-28 20:28:25.053,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,3OiHl0SRpc7,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (3 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2579,2025-06-28 20:28:25.054,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,3OiHl0SRpc7,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (12 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2580,2025-06-28 20:28:25.055,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,3OiHl0SRpc7,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2581,2025-06-28 20:28:25.056,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,3OiHl0SRpc7,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (1 elements across 1 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2582,2025-06-28 20:29:18.936,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",3OiHl0SRpc7,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2583,2025-06-28 20:54:12.134,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",JaJAhcI_gjO,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2584,2025-06-28 20:54:12.139,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",JaJAhcI_gjO,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2585,2025-06-28 20:54:12.141,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",JaJAhcI_gjO,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2586,2025-06-28 20:54:18.909,DMARC policy is in monitoring mode (p=none) and provides no active protection.,JaJAhcI_gjO,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2587,2025-06-28 20:54:19.676,Exposed service on port 443,JaJAhcI_gjO,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2588,2025-06-28 20:54:19.681,Exposed service on port 443,JaJAhcI_gjO,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2589,2025-06-28 20:54:30.31,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),JaJAhcI_gjO,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2590,2025-06-28 20:54:41.283,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),JaJAhcI_gjO,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2591,2025-06-28 20:54:41.289,No valid SSL/TLS certificate found on any tested host variant,JaJAhcI_gjO,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2592,2025-06-28 20:55:04.038,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,JaJAhcI_gjO,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2593,2025-06-28 20:55:04.503,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,JaJAhcI_gjO,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2594,2025-06-28 20:55:04.927,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,JaJAhcI_gjO,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2595,2025-06-28 20:55:05.557,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,JaJAhcI_gjO,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2596,2025-06-28 20:57:17.735,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,JaJAhcI_gjO,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2597,2025-06-28 21:01:33.565,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,JaJAhcI_gjO,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (16 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2598,2025-06-28 21:01:33.569,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,JaJAhcI_gjO,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (2 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2599,2025-06-28 21:01:33.57,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,JaJAhcI_gjO,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (6 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2600,2025-06-28 21:01:33.572,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,JaJAhcI_gjO,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (24 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2601,2025-06-28 21:01:33.573,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,JaJAhcI_gjO,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (2 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2602,2025-06-28 21:01:33.575,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,JaJAhcI_gjO,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (2 elements across 2 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2603,2025-06-28 21:02:36.598,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",JaJAhcI_gjO,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2604,2025-06-28 21:11:30.238,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",1uKg8vS5Iic,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2605,2025-06-28 21:11:30.241,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",1uKg8vS5Iic,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2606,2025-06-28 21:11:30.245,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",1uKg8vS5Iic,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2607,2025-06-28 21:11:36.781,DMARC policy is in monitoring mode (p=none) and provides no active protection.,1uKg8vS5Iic,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2608,2025-06-28 21:11:37.323,Exposed service on port 443,1uKg8vS5Iic,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2609,2025-06-28 21:11:37.329,Exposed service on port 443,1uKg8vS5Iic,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2610,2025-06-28 21:11:47.971,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),1uKg8vS5Iic,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2611,2025-06-28 21:11:59.309,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),1uKg8vS5Iic,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2612,2025-06-28 21:11:59.313,No valid SSL/TLS certificate found on any tested host variant,1uKg8vS5Iic,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2613,2025-06-28 21:12:21.299,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,1uKg8vS5Iic,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2614,2025-06-28 21:12:22.24,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,1uKg8vS5Iic,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2615,2025-06-28 21:12:22.387,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,1uKg8vS5Iic,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2616,2025-06-28 21:14:35.013,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,1uKg8vS5Iic,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2617,2025-06-28 21:19:04.017,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,1uKg8vS5Iic,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2618,2025-06-28 21:19:04.021,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,1uKg8vS5Iic,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2619,2025-06-28 21:19:04.022,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,1uKg8vS5Iic,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (3 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2620,2025-06-28 21:19:04.023,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,1uKg8vS5Iic,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (12 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2621,2025-06-28 21:19:04.024,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,1uKg8vS5Iic,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2622,2025-06-28 21:19:04.026,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,1uKg8vS5Iic,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (1 elements across 1 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2623,2025-06-28 21:19:49.626,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",1uKg8vS5Iic,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2624,2025-06-28 21:50:40.904,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",SLSNWX0CsL0,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2625,2025-06-28 21:50:40.911,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",SLSNWX0CsL0,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2626,2025-06-28 21:50:40.913,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",SLSNWX0CsL0,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2627,2025-06-28 21:50:47.474,DMARC policy is in monitoring mode (p=none) and provides no active protection.,SLSNWX0CsL0,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2628,2025-06-28 21:50:48.261,Exposed service on port 443,SLSNWX0CsL0,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2629,2025-06-28 21:50:48.267,Exposed service on port 443,SLSNWX0CsL0,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2630,2025-06-28 21:50:58.558,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),SLSNWX0CsL0,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2631,2025-06-28 21:51:09.887,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),SLSNWX0CsL0,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2632,2025-06-28 21:51:09.891,No valid SSL/TLS certificate found on any tested host variant,SLSNWX0CsL0,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2633,2025-06-28 21:51:32.114,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,SLSNWX0CsL0,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2634,2025-06-28 21:51:32.589,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,SLSNWX0CsL0,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2635,2025-06-28 21:51:32.782,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,SLSNWX0CsL0,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2636,2025-06-28 21:51:33.226,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,SLSNWX0CsL0,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2637,2025-06-28 21:53:47.029,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,SLSNWX0CsL0,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2638,2025-06-28 21:58:31.441,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,SLSNWX0CsL0,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2639,2025-06-28 21:58:31.444,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,SLSNWX0CsL0,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2640,2025-06-28 21:58:31.445,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,SLSNWX0CsL0,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (3 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2641,2025-06-28 21:58:31.446,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,SLSNWX0CsL0,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (12 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2642,2025-06-28 21:58:31.447,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,SLSNWX0CsL0,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2643,2025-06-28 21:58:31.449,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,SLSNWX0CsL0,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (1 elements across 1 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2644,2025-06-28 21:59:24.988,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",SLSNWX0CsL0,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2645,2025-06-29 15:57:12.599,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",nZUtO_TcJjj,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2646,2025-06-29 15:57:12.603,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",nZUtO_TcJjj,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2647,2025-06-29 15:57:12.606,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",nZUtO_TcJjj,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2648,2025-06-29 15:57:19.287,DMARC policy is in monitoring mode (p=none) and provides no active protection.,nZUtO_TcJjj,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2649,2025-06-29 15:57:21.466,Exposed service on port 443,nZUtO_TcJjj,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2650,2025-06-29 15:57:30.25,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),nZUtO_TcJjj,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2651,2025-06-29 15:57:41.283,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),nZUtO_TcJjj,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2652,2025-06-29 15:57:41.286,No valid SSL/TLS certificate found on any tested host variant,nZUtO_TcJjj,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2653,2025-06-29 15:58:03.748,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,nZUtO_TcJjj,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2654,2025-06-29 15:58:04.246,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,nZUtO_TcJjj,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2655,2025-06-29 15:58:04.475,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,nZUtO_TcJjj,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2656,2025-06-29 15:58:04.589,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,nZUtO_TcJjj,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2657,2025-06-29 16:00:18.174,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,nZUtO_TcJjj,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2658,2025-06-29 16:04:13.272,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,nZUtO_TcJjj,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (32 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2659,2025-06-29 16:04:13.274,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,nZUtO_TcJjj,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (4 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2660,2025-06-29 16:04:13.275,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,nZUtO_TcJjj,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (12 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2661,2025-06-29 16:04:13.276,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,nZUtO_TcJjj,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (48 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2662,2025-06-29 16:04:13.277,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,nZUtO_TcJjj,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (4 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2663,2025-06-29 16:04:13.279,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,nZUtO_TcJjj,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (4 elements across 4 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2664,2025-06-29 16:04:31.57,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",nZUtO_TcJjj,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2665,2025-06-29 16:30:09.361,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",9UsyS0G2Dmm,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2666,2025-06-29 16:30:09.365,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",9UsyS0G2Dmm,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2667,2025-06-29 16:30:09.368,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",9UsyS0G2Dmm,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2668,2025-06-29 16:30:17.04,DMARC policy is in monitoring mode (p=none) and provides no active protection.,9UsyS0G2Dmm,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2669,2025-06-29 16:30:19.401,Exposed service on port 443,9UsyS0G2Dmm,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2670,2025-06-29 16:30:19.409,Exposed service on port 443,9UsyS0G2Dmm,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2671,2025-06-29 16:30:27.921,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),9UsyS0G2Dmm,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2672,2025-06-29 16:30:39.094,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),9UsyS0G2Dmm,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2673,2025-06-29 16:30:39.099,No valid SSL/TLS certificate found on any tested host variant,9UsyS0G2Dmm,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2674,2025-06-29 16:31:01.258,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,9UsyS0G2Dmm,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2675,2025-06-29 16:31:01.764,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,9UsyS0G2Dmm,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2676,2025-06-29 16:31:02.346,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,9UsyS0G2Dmm,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2677,2025-06-29 16:31:02.62,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,9UsyS0G2Dmm,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2678,2025-06-29 16:33:15.095,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,9UsyS0G2Dmm,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2679,2025-06-29 16:37:24.648,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,9UsyS0G2Dmm,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2680,2025-06-29 16:37:24.652,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,9UsyS0G2Dmm,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2681,2025-06-29 16:37:24.653,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,9UsyS0G2Dmm,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (3 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2682,2025-06-29 16:37:24.654,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,9UsyS0G2Dmm,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (12 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2683,2025-06-29 16:37:24.656,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,9UsyS0G2Dmm,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2684,2025-06-29 16:37:24.657,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,9UsyS0G2Dmm,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (1 elements across 1 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2685,2025-06-29 16:38:22.031,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",9UsyS0G2Dmm,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2686,2025-06-29 18:11:13.267,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",hzwOdGIB0vq,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2687,2025-06-29 18:11:13.27,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",hzwOdGIB0vq,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2688,2025-06-29 18:11:13.272,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",hzwOdGIB0vq,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2689,2025-06-29 18:11:20.175,DMARC policy is in monitoring mode (p=none) and provides no active protection.,hzwOdGIB0vq,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2690,2025-06-29 18:11:20.652,Exposed service on port 443,hzwOdGIB0vq,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2691,2025-06-29 18:11:31.129,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),hzwOdGIB0vq,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2692,2025-06-29 18:11:42.333,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),hzwOdGIB0vq,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2693,2025-06-29 18:11:42.336,No valid SSL/TLS certificate found on any tested host variant,hzwOdGIB0vq,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2694,2025-06-29 18:12:05.103,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,hzwOdGIB0vq,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2695,2025-06-29 18:12:05.445,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,hzwOdGIB0vq,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2696,2025-06-29 18:12:05.836,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,hzwOdGIB0vq,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2697,2025-06-29 18:12:06.194,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,hzwOdGIB0vq,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2698,2025-06-29 18:14:18.63,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,hzwOdGIB0vq,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2699,2025-06-29 18:19:03.151,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,hzwOdGIB0vq,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (16 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2700,2025-06-29 18:19:03.153,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,hzwOdGIB0vq,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (2 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2701,2025-06-29 18:19:03.157,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,hzwOdGIB0vq,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (6 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2702,2025-06-29 18:19:03.158,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,hzwOdGIB0vq,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (24 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2703,2025-06-29 18:19:03.16,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,hzwOdGIB0vq,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (2 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2704,2025-06-29 18:19:03.161,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,hzwOdGIB0vq,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (2 elements across 2 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2705,2025-06-29 18:19:50.034,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",hzwOdGIB0vq,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2706,2025-06-29 18:51:52.618,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",XbIbBiXuOBy,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2707,2025-06-29 18:51:52.622,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",XbIbBiXuOBy,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2708,2025-06-29 18:51:52.624,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",XbIbBiXuOBy,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2709,2025-06-29 18:51:59.648,DMARC policy is in monitoring mode (p=none) and provides no active protection.,XbIbBiXuOBy,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2710,2025-06-29 18:52:00.939,Exposed service on port 443,XbIbBiXuOBy,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2711,2025-06-29 18:52:00.943,Exposed service on port 443,XbIbBiXuOBy,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2712,2025-06-29 18:52:10.863,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),XbIbBiXuOBy,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2713,2025-06-29 18:52:22.133,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),XbIbBiXuOBy,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2714,2025-06-29 18:52:22.136,No valid SSL/TLS certificate found on any tested host variant,XbIbBiXuOBy,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2715,2025-06-29 18:52:45.346,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,XbIbBiXuOBy,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2716,2025-06-29 18:52:45.77,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,XbIbBiXuOBy,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2717,2025-06-29 18:52:46.056,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,XbIbBiXuOBy,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2718,2025-06-29 18:52:46.545,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,XbIbBiXuOBy,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2719,2025-06-29 18:54:58.917,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,XbIbBiXuOBy,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2720,2025-06-29 19:00:43.128,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,XbIbBiXuOBy,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (16 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2721,2025-06-29 19:00:43.131,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,XbIbBiXuOBy,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (2 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2722,2025-06-29 19:00:43.133,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,XbIbBiXuOBy,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (6 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2723,2025-06-29 19:00:43.134,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,XbIbBiXuOBy,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (24 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2724,2025-06-29 19:00:43.135,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,XbIbBiXuOBy,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (2 elements across 2 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2725,2025-06-29 19:00:43.136,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,XbIbBiXuOBy,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (2 elements across 2 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2726,2025-06-29 19:01:43.798,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",XbIbBiXuOBy,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2727,2025-06-29 19:59:06.793,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",lC4mkbralbi,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2728,2025-06-29 19:59:06.797,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",lC4mkbralbi,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2729,2025-06-29 19:59:06.798,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",lC4mkbralbi,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2730,2025-06-29 19:59:41.812,DMARC policy is in monitoring mode (p=none) and provides no active protection.,lC4mkbralbi,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2731,2025-06-29 19:59:43.554,Exposed service on port 443,lC4mkbralbi,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2732,2025-06-29 19:59:43.558,Exposed service on port 443,lC4mkbralbi,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2733,2025-06-29 19:59:52.998,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),lC4mkbralbi,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2734,2025-06-29 20:00:04.237,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),lC4mkbralbi,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2735,2025-06-29 20:00:04.242,No valid SSL/TLS certificate found on any tested host variant,lC4mkbralbi,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2736,2025-06-29 20:00:26.754,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,lC4mkbralbi,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2737,2025-06-29 20:00:27.173,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,lC4mkbralbi,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2738,2025-06-29 20:00:27.395,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,lC4mkbralbi,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2739,2025-06-29 20:00:27.724,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,lC4mkbralbi,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2740,2025-06-29 20:02:42.205,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,lC4mkbralbi,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2741,2025-06-29 20:06:45.963,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,lC4mkbralbi,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (32 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2742,2025-06-29 20:06:45.966,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,lC4mkbralbi,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (4 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2743,2025-06-29 20:06:45.967,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,lC4mkbralbi,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (12 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2744,2025-06-29 20:06:45.968,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,lC4mkbralbi,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (48 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2745,2025-06-29 20:06:45.97,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,lC4mkbralbi,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (4 elements across 4 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2746,2025-06-29 20:06:45.971,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,lC4mkbralbi,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (4 elements across 4 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2747,2025-06-29 20:07:03.397,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",lC4mkbralbi,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2748,2025-06-29 20:30:21.888,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",AtEybURySdv,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2749,2025-06-29 20:30:21.892,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",AtEybURySdv,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2750,2025-06-29 20:30:21.896,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",AtEybURySdv,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2751,2025-06-29 20:30:28.644,DMARC policy is in monitoring mode (p=none) and provides no active protection.,AtEybURySdv,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2752,2025-06-29 20:30:29.016,Exposed service on port 443,AtEybURySdv,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2753,2025-06-29 20:30:39.735,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),AtEybURySdv,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2754,2025-06-29 20:30:50.956,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),AtEybURySdv,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2755,2025-06-29 20:30:50.962,No valid SSL/TLS certificate found on any tested host variant,AtEybURySdv,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2756,2025-06-29 20:31:13.598,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,AtEybURySdv,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2757,2025-06-29 20:31:13.688,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,AtEybURySdv,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2758,2025-06-29 20:31:13.911,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,AtEybURySdv,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2759,2025-06-29 20:31:14.023,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,AtEybURySdv,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2760,2025-06-29 20:33:28.154,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,AtEybURySdv,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2761,2025-06-29 20:38:27.536,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,AtEybURySdv,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2762,2025-06-29 20:38:27.539,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,AtEybURySdv,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2763,2025-06-29 20:38:27.541,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,AtEybURySdv,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (3 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2764,2025-06-29 20:38:27.542,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,AtEybURySdv,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (12 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2765,2025-06-29 20:38:27.543,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,AtEybURySdv,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2766,2025-06-29 20:38:27.545,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,AtEybURySdv,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (1 elements across 1 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2767,2025-06-29 20:39:28.84,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",AtEybURySdv,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2768,2025-06-29 22:51:38.454,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",xmb9vAWq31i,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2769,2025-06-29 22:51:38.459,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",xmb9vAWq31i,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2770,2025-06-29 22:51:38.461,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",xmb9vAWq31i,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2771,2025-06-29 22:51:45.1,DMARC policy is in monitoring mode (p=none) and provides no active protection.,xmb9vAWq31i,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2772,2025-06-29 22:51:45.828,Exposed service on port 443,xmb9vAWq31i,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2773,2025-06-29 22:51:45.851,Exposed service on port 443,xmb9vAWq31i,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2774,2025-06-29 22:51:56.373,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),xmb9vAWq31i,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2775,2025-06-29 22:52:07.589,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),xmb9vAWq31i,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2776,2025-06-29 22:52:07.592,No valid SSL/TLS certificate found on any tested host variant,xmb9vAWq31i,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2777,2025-06-29 22:52:29.454,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,xmb9vAWq31i,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2778,2025-06-29 22:52:29.859,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,xmb9vAWq31i,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2779,2025-06-29 22:52:30.149,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,xmb9vAWq31i,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2780,2025-06-29 22:52:30.434,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,xmb9vAWq31i,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2781,2025-06-29 22:54:44.428,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,xmb9vAWq31i,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2782,2025-06-29 22:59:36.313,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,xmb9vAWq31i,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2783,2025-06-29 22:59:36.315,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,xmb9vAWq31i,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2784,2025-06-29 22:59:36.317,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,xmb9vAWq31i,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (3 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2785,2025-06-29 22:59:36.318,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,xmb9vAWq31i,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (12 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2786,2025-06-29 22:59:36.319,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,xmb9vAWq31i,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2787,2025-06-29 22:59:36.32,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,xmb9vAWq31i,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (1 elements across 1 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2788,2025-06-29 23:02:06.773,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",xmb9vAWq31i,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2789,2025-06-29 23:31:12.881,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",mYE6t40qD_a,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2790,2025-06-29 23:31:12.884,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",mYE6t40qD_a,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2791,2025-06-29 23:31:12.886,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",mYE6t40qD_a,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2792,2025-06-29 23:31:19.526,DMARC policy is in monitoring mode (p=none) and provides no active protection.,mYE6t40qD_a,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2793,2025-06-29 23:31:21.57,Exposed service on port 443,mYE6t40qD_a,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2794,2025-06-29 23:31:21.573,Exposed service on port 443,mYE6t40qD_a,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2795,2025-06-29 23:31:30.628,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),mYE6t40qD_a,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2796,2025-06-29 23:31:41.78,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),mYE6t40qD_a,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2797,2025-06-29 23:31:41.783,No valid SSL/TLS certificate found on any tested host variant,mYE6t40qD_a,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2798,2025-06-29 23:32:04.383,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,mYE6t40qD_a,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2799,2025-06-29 23:32:04.819,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,mYE6t40qD_a,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2800,2025-06-29 23:32:05.393,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,mYE6t40qD_a,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2801,2025-06-29 23:32:05.817,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,mYE6t40qD_a,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2802,2025-06-29 23:34:19.403,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,mYE6t40qD_a,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2803,2025-06-29 23:38:24.176,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,mYE6t40qD_a,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (24 elements across 3 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2804,2025-06-29 23:38:24.18,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,mYE6t40qD_a,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (3 elements across 3 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2805,2025-06-29 23:38:24.181,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,mYE6t40qD_a,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (9 elements across 3 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2806,2025-06-29 23:38:24.182,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,mYE6t40qD_a,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (36 elements across 3 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2807,2025-06-29 23:38:24.184,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,mYE6t40qD_a,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (3 elements across 3 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2808,2025-06-29 23:38:24.185,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,mYE6t40qD_a,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (3 elements across 3 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2809,2025-06-29 23:40:39.829,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",mYE6t40qD_a,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2810,2025-06-30 00:00:38.23,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",Ylrvce-o1m8,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2811,2025-06-30 00:00:38.233,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",Ylrvce-o1m8,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2812,2025-06-30 00:00:38.234,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",Ylrvce-o1m8,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2813,2025-06-30 00:00:45.042,DMARC policy is in monitoring mode (p=none) and provides no active protection.,Ylrvce-o1m8,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2814,2025-06-30 00:00:45.733,Exposed service on port 443,Ylrvce-o1m8,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2815,2025-06-30 00:00:56.162,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),Ylrvce-o1m8,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2816,2025-06-30 00:01:07.579,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),Ylrvce-o1m8,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2817,2025-06-30 00:01:07.582,No valid SSL/TLS certificate found on any tested host variant,Ylrvce-o1m8,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2818,2025-06-30 00:01:29.753,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,Ylrvce-o1m8,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2819,2025-06-30 00:01:30.181,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,Ylrvce-o1m8,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2820,2025-06-30 00:01:30.487,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,Ylrvce-o1m8,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2821,2025-06-30 00:01:31.434,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,Ylrvce-o1m8,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2822,2025-06-30 00:03:44.178,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,Ylrvce-o1m8,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2823,2025-06-30 00:08:07.212,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,Ylrvce-o1m8,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2824,2025-06-30 00:08:07.216,Rule: html-has-lang | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/html-has-lang?application=axeAPI,Ylrvce-o1m8,ACCESSIBILITY_VIOLATION,Ensures every HTML document has a lang attribute (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2825,2025-06-30 00:08:07.218,Rule: image-alt | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI,Ylrvce-o1m8,ACCESSIBILITY_VIOLATION,Ensures <img> elements have alternate text or a role of none or presentation (3 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2826,2025-06-30 00:08:07.219,Rule: link-name | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI,Ylrvce-o1m8,ACCESSIBILITY_VIOLATION,Ensures links have discernible text (12 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2827,2025-06-30 00:08:07.22,Rule: listitem | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/listitem?application=axeAPI,Ylrvce-o1m8,ACCESSIBILITY_VIOLATION,Ensures <li> elements are used semantically (1 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2828,2025-06-30 00:08:07.222,Rule: meta-viewport | Impact: critical | Help: https://dequeuniversity.com/rules/axe/4.8/meta-viewport?application=axeAPI,Ylrvce-o1m8,ACCESSIBILITY_VIOLATION,"Ensures <meta name=""viewport""> does not disable text scaling and zooming (1 elements across 1 pages)",HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
2829,2025-06-30 00:10:22.211,"Successful bypass techniques: IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, IP_SPOOFING_HEADER, HTTP_METHOD_SWITCH, PATH_VARIATION, PATH_VARIATION, PATH_VARIATION.",Ylrvce-o1m8,RATE_LIMIT_BYPASS,The rate limiting implementation on //www.youtube.com/player_api can be bypassed. Ensure that the real client IP is correctly identified and that logic is not easily evaded by simple transformations.,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2830,2025-06-30 00:27:08.715,"Usernames: mike | Sources: Stealer Logs | Risk: Session hijacking, account takeover",zhJH4wDo702,INFOSTEALER_BREACH,1 employees compromised by infostealer malware,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2831,2025-06-30 00:27:08.72,"Usernames: jayme, kelli, jessica, lauren, mike, mike | Risk: Credential stuffing, brute force attacks",zhJH4wDo702,PASSWORD_BREACH,6 employees with password exposure,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2832,2025-06-30 00:27:08.721,"Usernames: shellyj2581, bert, mike, gretchen, mike, amy, jayme, katie, julia, ann, shellymarshall, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, mike, gretchen, bert, amy, dana, gretchen, jayme, george, kara, jayme, amy, katherine, gretchen, mike, bert | Risk: Phishing, social engineering targeting",zhJH4wDo702,EMAIL_EXPOSURE,56 employee email addresses found in breach databases,CRITICAL,MALWARE,AUTOMATED,12000,24000,48000,
2833,2025-06-30 00:27:14.849,DMARC policy is in monitoring mode (p=none) and provides no active protection.,zhJH4wDo702,EMAIL_SECURITY_WEAKNESS,Strengthen DMARC policy from p=none to p=quarantine or p=reject to actively prevent email spoofing.,LOW,PHISHING_BEC,AUTOMATED,1000,2000,4000,
2834,2025-06-30 00:27:15.367,Exposed service on port 443,zhJH4wDo702,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2835,2025-06-30 00:27:15.374,Exposed service on port 443,zhJH4wDo702,EXPOSED_SERVICE,Restrict public access and apply latest security hardening guides.,INFO,SITE_HACK,AUTOMATED,1000,1000,2000,
2836,2025-06-30 00:27:25.823,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),zhJH4wDo702,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2837,2025-06-30 00:27:36.932,Python validation: TLS handshake failed: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010),zhJH4wDo702,TLS_CONFIGURATION_ISSUE,Configure server to present complete certificate chain including intermediate certificates,INFO,MALWARE,AUTOMATED,1000,2000,4000,
2838,2025-06-30 00:27:36.935,No valid SSL/TLS certificate found on any tested host variant,zhJH4wDo702,MISSING_TLS_CERTIFICATE,Configure SSL/TLS certificates for all public hosts,HIGH,MALWARE,AUTOMATED,10000,19000,38000,
2839,2025-06-30 00:28:00.017,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,zhJH4wDo702,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sou.rce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2840,2025-06-30 00:28:00.526,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,zhJH4wDo702,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-sour.ce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2841,2025-06-30 00:28:00.819,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,zhJH4wDo702,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodgin.g-source.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2842,2025-06-30 00:28:01.544,Potential typosquat threat with different ownership. Risk factors: WHOIS lookup failed: Skipped in fast mode,zhJH4wDo702,PHISHING_SETUP,Investigate and potentially initiate takedown procedures for lodging-so.urce.com,MEDIUM,PHISHING_BEC,AUTOMATED,2000,4000,8000,
2843,2025-06-30 00:30:13.704,Domain redirects to lodging-source.com; verify legitimate ownership. Evidence: WHOIS lookup failed: Skipped in fast mode,zhJH4wDo702,TYPOSQUAT_REDIRECT,Investigate and potentially initiate takedown procedures for lodgingsource.com,MEDIUM,MALWARE,AUTOMATED,5000,9000,18000,
2844,2025-06-30 00:35:10.091,Rule: color-contrast | Impact: serious | Help: https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI,zhJH4wDo702,ACCESSIBILITY_VIOLATION,Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (8 elements across 1 pages),HIGH,ADA_COMPLIANCE,AUTOMATED,2000,7500,15000,
</file>

<file path="frontend.md">
# DealBrief Security Scanner - Frontend Design

## Overview
A comprehensive Next.js frontend for the DealBrief security scanning platform that enables users to trigger scans, review findings, verify results, and generate AI-powered security reports.

## Core Features

### 1. Scan Initiation
- **Company Information Input**: Company name and domain
- **Tag Management**: Optional tags for categorization and filtering
- **Real-time Scan Progress**: Live updates showing module completion (1/16 → 16/16)
- **Scan History**: Previous scans with status and completion times

### 2. Findings Workspace
- **Interactive Findings Table**: All discovered security issues with verification controls
- **State Management**: Toggle between AUTOMATED → VERIFIED for each finding
- **Filtering & Search**: Filter by severity, type, verification status, tags
- **Bulk Operations**: Select multiple findings for batch verification
- **Trend Analysis**: Compare raw vs verified results over time

### 3. AI Report Generation
- **OpenAI o3-2025-04-16 Integration**: Generate comprehensive security reports
- **Custom Prompting**: User-configurable report templates
- **Export Options**: PDF, Word, and JSON formats
- **Report History**: Previous reports with regeneration capability

## Technical Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand + TanStack Query
- **Database**: Supabase (PostgreSQL) 
- **Authentication**: Supabase Auth
- **File Handling**: Next.js API routes + AWS S3
- **Real-time**: Supabase Realtime subscriptions

### Database Schema Integration
Based on the provided findings data, the key tables are:

```typescript
interface Finding {
  id: string;
  created_at: string;
  description: string;
  scan_id: string;
  type: string;
  recommendation: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  attack_type_code: string;
  state: 'AUTOMATED' | 'VERIFIED' | 'FALSE_POSITIVE';
  eal_low: number;
  eal_ml: number;
  eal_high: number;
}

interface Scan {
  scan_id: string;
  company_name: string;
  domain: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  total_modules: number;
  created_at: string;
  completed_at?: string;
  tags?: string[];
}
```

## Page Structure

### 1. Dashboard (`/dashboard`)
```typescript
// Dashboard showing scan overview and quick actions
const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Quick Stats */}
      <div className="col-span-12 lg:col-span-8">
        <StatsOverview />
      </div>
      
      {/* Recent Activity */}
      <div className="col-span-12 lg:col-span-4">
        <RecentActivity />
      </div>
      
      {/* Active Scans */}
      <div className="col-span-12">
        <ActiveScansTable />
      </div>
      
      {/* Quick Actions */}
      <div className="col-span-12">
        <QuickActions />
      </div>
    </div>
  );
};
```

### 2. New Scan (`/scans/new`)
```typescript
const NewScan = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    domain: '',
    tags: []
  });

  const startScan = async () => {
    const response = await fetch('/api/scans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const { scanId } = await response.json();
      router.push(`/scans/${scanId}`);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Start Security Scan</CardTitle>
        <CardDescription>
          Initiate a comprehensive security assessment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              companyName: e.target.value
            }))}
            placeholder="Acme Corporation"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <Input
            id="domain"
            value={formData.domain}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              domain: e.target.value
            }))}
            placeholder="example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (Optional)</Label>
          <TagInput
            value={formData.tags}
            onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
            placeholder="Add tags for categorization"
          />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={startScan} className="w-full">
          Start Scan
        </Button>
      </CardFooter>
    </Card>
  );
};
```

### 3. Scan Progress (`/scans/[scanId]`)
```typescript
const ScanProgress = ({ scanId }: { scanId: string }) => {
  const { data: scan, isLoading } = useQuery({
    queryKey: ['scan', scanId],
    queryFn: () => fetchScan(scanId),
    refetchInterval: 2000, // Poll every 2 seconds
  });

  const progressPercentage = scan ? (scan.progress / scan.total_modules) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{scan?.company_name}</h1>
          <p className="text-muted-foreground">{scan?.domain}</p>
        </div>
        <Badge variant={getStatusVariant(scan?.status)}>
          {scan?.status}
        </Badge>
      </div>
      
      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Scan Progress</span>
              <span>{scan?.progress}/{scan?.total_modules} modules</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Module Status */}
      <ModuleStatusGrid scanId={scanId} />
      
      {/* Live Findings Feed */}
      {scan?.status === 'completed' && (
        <Button onClick={() => router.push(`/scans/${scanId}/findings`)}>
          View Findings ({scan.total_findings_count})
        </Button>
      )}
    </div>
  );
};
```

### 4. Findings Workspace (`/scans/[scanId]/findings`)
```typescript
const FindingsWorkspace = ({ scanId }: { scanId: string }) => {
  const [filters, setFilters] = useState({
    severity: [],
    type: [],
    state: [],
    search: ''
  });
  
  const [selectedFindings, setSelectedFindings] = useState<string[]>([]);

  const { data: findings, isLoading } = useQuery({
    queryKey: ['findings', scanId, filters],
    queryFn: () => fetchFindings(scanId, filters),
  });

  const verifyFindings = async (findingIds: string[], newState: 'VERIFIED' | 'FALSE_POSITIVE') => {
    await fetch('/api/findings/verify', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ findingIds, state: newState })
    });
    
    // Optimistic update
    queryClient.invalidateQueries(['findings', scanId]);
  };

  const generateReport = async () => {
    const verifiedFindings = findings?.filter(f => f.state === 'VERIFIED') || [];
    
    const response = await fetch('/api/reports/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scanId,
        findings: verifiedFindings,
        companyName: scan?.company_name,
        domain: scan?.domain
      })
    });
    
    if (response.ok) {
      const { reportId } = await response.json();
      router.push(`/reports/${reportId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Findings</h1>
          <p className="text-muted-foreground">
            {findings?.filter(f => f.state === 'VERIFIED').length || 0} verified of {findings?.length || 0} total
          </p>
        </div>
        
        <div className="flex gap-2">
          {selectedFindings.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() => verifyFindings(selectedFindings, 'VERIFIED')}
              >
                Verify Selected ({selectedFindings.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => verifyFindings(selectedFindings, 'FALSE_POSITIVE')}
              >
                Mark False Positive
              </Button>
            </>
          )}
          
          <Button onClick={generateReport} disabled={!findings?.some(f => f.state === 'VERIFIED')}>
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <FindingsFilters filters={filters} onFiltersChange={setFilters} />

      {/* Findings Table */}
      <Card>
        <CardContent className="p-0">
          <FindingsTable
            findings={findings || []}
            selectedFindings={selectedFindings}
            onSelectionChange={setSelectedFindings}
            onVerifyFinding={(id, state) => verifyFindings([id], state)}
          />
        </CardContent>
      </Card>
    </div>
  );
};
```

## Key Components

### 1. FindingsTable Component
```typescript
const FindingsTable = ({ findings, selectedFindings, onSelectionChange, onVerifyFinding }) => {
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.getValue('type')}
        </Badge>
      )
    },
    {
      accessorKey: 'severity',
      header: 'Severity',
      cell: ({ row }) => (
        <Badge variant={getSeverityVariant(row.getValue('severity'))}>
          {row.getValue('severity')}
        </Badge>
      )
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className="max-w-md">
          <p className="truncate">{row.getValue('description')}</p>
        </div>
      )
    },
    {
      accessorKey: 'state',
      header: 'Status',
      cell: ({ row }) => {
        const state = row.getValue('state');
        const findingId = row.original.id;
        
        return (
          <Select
            value={state}
            onValueChange={(newState) => onVerifyFinding(findingId, newState)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AUTOMATED">Automated</SelectItem>
              <SelectItem value="VERIFIED">Verified</SelectItem>
              <SelectItem value="FALSE_POSITIVE">False Positive</SelectItem>
            </SelectContent>
          </Select>
        );
      }
    },
    {
      accessorKey: 'recommendation',
      header: 'Recommendation',
      cell: ({ row }) => (
        <div className="max-w-md">
          <p className="text-sm text-muted-foreground truncate">
            {row.getValue('recommendation')}
          </p>
        </div>
      )
    }
  ];

  const table = useReactTable({
    data: findings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' 
        ? updater(selectedFindings) 
        : updater;
      onSelectionChange(Object.keys(newSelection));
    },
    state: {
      rowSelection: selectedFindings.reduce((acc, id) => ({ ...acc, [id]: true }), {})
    }
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
```

### 2. Real-time Progress Updates
```typescript
const useRealtimeProgress = (scanId: string) => {
  const [progress, setProgress] = useState(null);
  
  useEffect(() => {
    const subscription = supabase
      .channel(`scan-${scanId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'scan_status',
          filter: `scan_id=eq.${scanId}`
        },
        (payload) => {
          setProgress(payload.new);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [scanId]);

  return progress;
};
```

## API Routes

### 1. Start Scan (`/api/scans` - POST)
```typescript
// pages/api/scans.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { companyName, domain, tags } = req.body;

  // Validate input
  if (!companyName || !domain) {
    return res.status(400).json({ error: 'Company name and domain are required' });
  }

  try {
    // Call DealBrief scanner API
    const scanResponse = await fetch(`${process.env.SCANNER_API_URL}/api/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SCANNER_API_KEY}`
      },
      body: JSON.stringify({
        companyName,
        domain,
        tags
      })
    });

    const { scanId } = await scanResponse.json();

    // Insert into Supabase
    const { data, error } = await supabase
      .from('scan_status')
      .insert({
        scan_id: scanId,
        company_name: companyName,
        domain,
        status: 'pending',
        progress: 0,
        total_modules: 16,
        tags
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ scanId });
  } catch (error) {
    console.error('Failed to start scan:', error);
    res.status(500).json({ error: 'Failed to start scan' });
  }
}
```

### 2. Verify Findings (`/api/findings/verify` - PATCH)
```typescript
// pages/api/findings/verify.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { findingIds, state } = req.body;

  if (!findingIds || !Array.isArray(findingIds) || !state) {
    return res.status(400).json({ error: 'Finding IDs and state are required' });
  }

  try {
    const { data, error } = await supabase
      .from('findings')
      .update({ state })
      .in('id', findingIds)
      .select();

    if (error) throw error;

    res.status(200).json({ updated: data.length });
  } catch (error) {
    console.error('Failed to verify findings:', error);
    res.status(500).json({ error: 'Failed to verify findings' });
  }
}
```

### 3. Generate Report (`/api/reports/generate` - POST)
```typescript
// pages/api/reports/generate.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scanId, findings, companyName, domain } = req.body;

  try {
    // Prepare findings data for AI
    const findingsSummary = findings.map(f => ({
      type: f.type,
      severity: f.severity,
      description: f.description,
      recommendation: f.recommendation,
      attack_type: f.attack_type_code,
      estimated_loss: {
        low: f.eal_low,
        medium: f.eal_ml,
        high: f.eal_high
      }
    }));

    // Call OpenAI o3-2025-04-16
    const completion = await openai.chat.completions.create({
      model: 'o3-2025-04-16',
      messages: [
        {
          role: 'system',
          content: `You are a cybersecurity expert generating executive security reports. 
                   Create a comprehensive, professional security assessment report based on the verified findings.
                   Include executive summary, risk analysis, prioritized recommendations, and financial impact estimates.`
        },
        {
          role: 'user',
          content: `Generate a security assessment report for ${companyName} (${domain}).
                   
                   Verified Security Findings:
                   ${JSON.stringify(findingsSummary, null, 2)}
                   
                   Please structure the report with:
                   1. Executive Summary
                   2. Risk Assessment Matrix
                   3. Critical Findings Analysis
                   4. Financial Impact Estimates
                   5. Prioritized Remediation Roadmap
                   6. Compliance & Regulatory Considerations
                   7. Appendix: Technical Details`
        }
      ],
      temperature: 0.3,
      max_tokens: 4000
    });

    const reportContent = completion.choices[0].message.content;

    // Save report to database
    const { data, error } = await supabase
      .from('reports')
      .insert({
        scan_id: scanId,
        company_name: companyName,
        domain,
        content: reportContent,
        findings_count: findings.length,
        status: 'completed'
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ 
      reportId: data.id,
      content: reportContent 
    });

  } catch (error) {
    console.error('Failed to generate report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
}
```

## State Management

### Zustand Store
```typescript
// stores/scanStore.ts
import { create } from 'zustand';

interface ScanState {
  currentScan: Scan | null;
  findings: Finding[];
  selectedFindings: string[];
  filters: FindingsFilters;
  
  // Actions
  setCurrentScan: (scan: Scan) => void;
  setFindings: (findings: Finding[]) => void;
  updateFindingState: (findingId: string, state: string) => void;
  setSelectedFindings: (ids: string[]) => void;
  setFilters: (filters: FindingsFilters) => void;
  clearSelection: () => void;
}

export const useScanStore = create<ScanState>((set, get) => ({
  currentScan: null,
  findings: [],
  selectedFindings: [],
  filters: {
    severity: [],
    type: [],
    state: [],
    search: ''
  },

  setCurrentScan: (scan) => set({ currentScan: scan }),
  
  setFindings: (findings) => set({ findings }),
  
  updateFindingState: (findingId, state) => set((prev) => ({
    findings: prev.findings.map(f => 
      f.id === findingId ? { ...f, state } : f
    )
  })),
  
  setSelectedFindings: (ids) => set({ selectedFindings: ids }),
  
  setFilters: (filters) => set({ filters }),
  
  clearSelection: () => set({ selectedFindings: [] })
}));
```

## Deployment Configuration

### Next.js Configuration
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SCANNER_API_URL: process.env.SCANNER_API_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/scanner/:path*',
        destination: `${process.env.SCANNER_API_URL}/api/:path*`
      }
    ];
  }
};

module.exports = nextConfig;
```

### Environment Variables
```bash
# .env.local
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

SCANNER_API_URL=https://dealbrief-scanner.fly.dev
SCANNER_API_KEY=your-scanner-api-key

OPENAI_API_KEY=your-openai-api-key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## Implementation Priority

### Phase 1: Core Functionality (Week 1-2)
1. **Scan Initiation** - Basic form and API integration
2. **Progress Tracking** - Real-time updates with Supabase
3. **Findings Display** - Basic table with verification controls

### Phase 2: Enhanced UX (Week 3)
1. **Advanced Filtering** - Multi-criteria filtering and search
2. **Bulk Operations** - Mass verification capabilities
3. **Responsive Design** - Mobile optimization

### Phase 3: AI & Reporting (Week 4)
1. **OpenAI Integration** - Report generation with o3-2025-04-16
2. **Export Features** - PDF/Word export capabilities
3. **Dashboard Analytics** - Trend analysis and metrics

This frontend design provides a comprehensive, user-friendly interface for managing security scans while maintaining the professional standards required for enterprise security assessments.
</file>

<file path="postcss.config.mjs">
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
</file>

<file path="prompt.md">
# Due-Diligence Risk Assessment Prompt

**SYSTEM**
You are DealBrief-GPT, a senior U.S. cybersecurity analyst specializing in investor-grade due diligence reports. You write for private equity firms, investment banks, and corporate development teams evaluating acquisition targets. Always use American English, maintain a serious professional tone, and express financial impacts as concrete dollar values rounded to the nearest $1,000.

────────────────────────────────────────
## INPUT SPECIFICATIONS
Data from Supabase findings table in one of these formats:
• **SQL INSERT statements**: Extract VALUES clause and parse tuples
• **CSV with headers**: id, created_at, description, scan_id, type, recommendation, severity, attack_type_code, state, eal_low, eal_ml, eal_high

**Required fields per finding:**
- `id` (unique identifier)
- `description` (technical finding details)  
- `type` (risk category)
- `severity` (HIGH/MEDIUM/LOW)
- `attack_type_code` (threat vector)
- `eal_low`, `eal_ml`, `eal_high` (estimated annual loss integers)
- `recommendation` (remediation guidance)
- `created_at` (discovery timestamp)

────────────────────────────────────────
## ANALYSIS TASKS

### 1. Data Parsing & Validation
- Parse input format (SQL or CSV) without hallucinating missing fields
- Deduplicate identical findings (same type + description)
- Group all findings by scan_id for unified reporting

### 2. Portfolio Risk Calculation
- **Total EAL**: 
  • Primary estimate = sum of all eal_ml values
  • Confidence range = sum of all eal_low to sum of all eal_high
  • Format: ${sum_eal_ml} (range ${sum_eal_low}–${sum_eal_high})
- **Category Analysis**: Group by `type`, count findings, calculate category-level EAL using same logic
- **Timeline Analysis**: Note findings discovered in last 30 days vs. older issues

### 3. Priority Finding Selection
Apply this logic in order:
1. **Critical Path**: All HIGH severity findings
2. **Material Medium**: MEDIUM findings where individual eal_ml ≥ 75th percentile of all individual eal_ml values
3. **Recent Escalation**: Any findings discovered in last 7 days regardless of severity
4. **Cap at 15 findings maximum** to maintain report focus
5. **Sort final list**: eal_ml descending, then by severity (HIGH > MEDIUM > LOW)

### 4. Report Generation
- Use the exact template structure below
- Currency format: $XXX,000 (thousands, no decimals)
- Technical details verbatim in "Technical Description"
- Plain English (no jargon) in Executive Summary and Practical Explanations
- Include scan_id and generation timestamp

────────────────────────────────────────
## REPORT TEMPLATE

```markdown
# Cybersecurity Due Diligence Report
**Scan ID**: {scan_id} | **Generated**: {current_date}

## Executive Summary
{2-3 paragraph narrative ≤ 200 words covering:}
• **Total Estimated Annual Loss**: ${sum_eal_ml} (range ${sum_eal_low}–${sum_eal_high})
• **Critical exposures** in plain business language (avoid "CVE", "DMARC", etc.)
• **Overall security posture** relative to industry standards
• **Immediate actions required** to reduce material risk

## Risk Landscape
| Risk Category | Findings | Highest Severity | Est. Annual Loss |
|---------------|----------|------------------|------------------|
| {type} | {count} | {max_severity} | ${category_eal_ml} |
{...repeat for each category...}
| **TOTAL** | **{total_count}** | **—** | **${total_eal_ml}** |

## Remediation Guide
*Organized by category and severity for efficient resolution*

### {CATEGORY_NAME}
#### HIGH Severity
- **Finding {id}**: {recommendation}
- **Finding {id}**: {recommendation}

#### MEDIUM Severity  
- **Finding {id}**: {recommendation}

#### LOW Severity
- **Finding {id}**: {recommendation}

{...repeat for each category with findings...}

## Priority Findings
*{count} findings selected based on severity and financial impact*

### Finding {id} – {type} *(Severity: {severity})*
**Technical Description**
> {description}

**Business Impact**  
{1-2 sentences explaining how this specific vulnerability could harm operations, revenue, or reputation in plain English}

**Financial Exposure**  
**${eal_ml} annually** (range ${eal_low}–${eal_high})

**Recommended Action**  
{recommendation}
{Add specific first step if recommendation is generic, e.g., "Start by auditing all admin accounts created in the last 90 days."}

---
{...repeat for each priority finding...}

## Risk Methodology
This assessment uses the Cyber Risk Quantification (CRQ) framework standard in M&A due diligence:

1. **Base Loss Calculation**: Each vulnerability maps to historical incident data for similar attack vectors affecting mid-market U.S. companies
2. **Probability Modeling**: Likelihood estimates derived from NIST, Verizon DBIR, and industry-specific breach frequency data
3. **Severity Adjustments**: Environmental factors (exposure, complexity, existing controls) modify base probabilities
4. **Annual Loss Calculation**: EAL = (Attack Probability × Average Incident Cost); confidence intervals reflect uncertainty in both variables
5. **Portfolio Aggregation**: Simple summation across findings; no correlation adjustments applied

**Limitations**: Estimates assume current threat landscape and typical organizational response capabilities. Actual losses may vary significantly based on incident response maturity and business continuity preparedness.
```

────────────────────────────────────────
## QUALITY STANDARDS

**Accuracy**: Never fabricate data points. If fields are missing or malformed, explicitly note gaps rather than estimating.

**Clarity**: Executive Summary must be readable by non-technical stakeholders. Avoid security acronyms and explain impacts in business terms.

**Completeness**: Every priority finding must include all five subsections. If recommendation is generic, add specific implementation guidance.

**Professional Tone**: Write for sophisticated investors who need actionable intelligence, not security practitioners who need technical depth.

**Consistency**: Use identical formatting, currency presentation, and section structure throughout.
</file>

<file path="tailwind.config.ts">
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
</file>

<file path="src/app/(dashboard)/scans/page.tsx">
'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Plus,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  FileText,
  MoreHorizontal
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Scan } from '@/lib/types/database'

export default function ScansPage() {
  const { data: scans, isLoading } = useQuery<Scan[]>({
    queryKey: ['all-scans'],
    queryFn: async () => {
      const response = await fetch('/api/scans')
      if (!response.ok) throw new Error('Failed to fetch scans')
      return response.json()
    }
  })

  // Fetch reports for all scans
  const { data: reports } = useQuery({
    queryKey: ['all-reports'],
    queryFn: async () => {
      const response = await fetch('/api/reports')
      if (!response.ok) throw new Error('Failed to fetch reports')
      return response.json()
    }
  })

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'processing': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'processing': return <Activity className="h-4 w-4 animate-spin" />
      case 'failed': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getScanReports = (scanId: string) => {
    if (!reports) return []
    return reports.filter((report: { scan_id: string }) => report.scan_id === scanId)
  }

  const activeScans = scans?.filter(s => s.status === 'processing' || s.status === 'pending') || []
  const completedScans = scans?.filter(s => s.status === 'completed') || []
  const failedScans = scans?.filter(s => s.status === 'failed') || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Scans</h1>
          <p className="text-muted-foreground">
            Manage and monitor all security assessments
          </p>
        </div>
        
        <Button asChild>
          <Link href="/scans/new">
            <Plus className="mr-2 h-4 w-4" />
            New Scan
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scans?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeScans.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedScans.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedScans.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Scans Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Scans</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scans?.map((scan) => {
                  const progressPercentage = (scan.progress / scan.total_modules) * 100
                  const scanReports = getScanReports(scan.scan_id)
                  const completedReports = scanReports.filter((r: { status: string }) => r.status === 'completed')
                  const pendingReports = scanReports.filter((r: { status: string }) => r.status === 'pending')
                  
                  return (
                    <TableRow key={scan.scan_id}>
                      <TableCell className="font-medium">
                        {scan.company_name}
                      </TableCell>
                      <TableCell>{scan.domain}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(scan.status)} className="gap-1">
                          {getStatusIcon(scan.status)}
                          {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={progressPercentage} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground w-8">
                            {Math.round(progressPercentage)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {completedReports.length > 0 ? (
                            <Badge variant="default" className="gap-1">
                              <FileText className="h-3 w-3" />
                              {completedReports.length} Ready
                            </Badge>
                          ) : (
                            <Badge variant="outline">No Reports</Badge>
                          )}
                          {pendingReports.length > 0 && (
                            <Badge variant="secondary">
                              {pendingReports.length} Pending
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(scan.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {scan.tags && scan.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {scan.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {scan.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{scan.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/scans/${scan.scan_id}`}>View Details</Link>
                            </DropdownMenuItem>
                            {scan.status === 'completed' && (
                              <DropdownMenuItem asChild>
                                <Link href={`/scans/${scan.scan_id}/findings`}>View Findings</Link>
                              </DropdownMenuItem>
                            )}
                            {completedReports.length > 0 && (
                              <DropdownMenuItem asChild>
                                <Link href={`/scans/${scan.scan_id}/reports`}>
                                  📊 View Reports ({completedReports.length})
                                </Link>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
          
          {!isLoading && (!scans || scans.length === 0) && (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No scans yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your first security scan to see results here.
              </p>
              <Button asChild>
                <Link href="/scans/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Start First Scan
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
</file>

<file path="src/app/api/reports/route.ts">
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get('scanId')
    
    let query = supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (scanId) {
      query = query.eq('scan_id', scanId)
    }
    
    const { data: reports, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch reports' },
        { status: 500 }
      )
    }

    return NextResponse.json(reports)
  } catch (error) {
    console.error('Failed to fetch reports:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
</file>

<file path="src/app/globals.css">
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    border-color: hsl(var(--border));
  }
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}
</file>

<file path="src/app/page.tsx">
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/dashboard')
}
</file>

<file path="next.config.ts">
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SCANNER_API_URL: process.env.SCANNER_API_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/scanner/:path*',
        destination: `${process.env.SCANNER_API_URL || 'http://localhost:8000'}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
</file>

<file path="README.md">
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Manual deployment trigger
</file>

<file path="src/app/(dashboard)/dashboard/page.tsx">
'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Plus,
  Activity,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { Scan } from '@/lib/types/database'

interface DashboardStats {
  totalScans: number
  criticalFindings: number
  verifiedIssues: number
  activeScans: number
}


export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json()
    }
  })

  const { data: recentScans, isLoading: scansLoading } = useQuery<Scan[]>({
    queryKey: ['recent-scans'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/recent-scans')
      if (!response.ok) throw new Error('Failed to fetch recent scans')
      return response.json()
    }
  })


  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'processing': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
        <Button asChild>
          <Link href="/scans/new">
            <Plus className="mr-2 h-4 w-4" />
            New Scan
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.totalScans || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Security assessments conducted
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.criticalFindings || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.verifiedIssues || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Confirmed security issues
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scans</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.activeScans || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>
              Your latest security assessments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scansLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : recentScans && recentScans.length > 0 ? (
              recentScans.map((scan) => {
                const progressPercentage = (scan.progress / scan.total_modules) * 100
                return (
                  <div key={scan.scan_id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{scan.company_name}</p>
                      <p className="text-xs text-muted-foreground">{scan.domain}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusVariant(scan.status)}>
                        {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                      </Badge>
                      <div className="w-20">
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8">
                <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No scans yet</p>
                <p className="text-xs text-muted-foreground">Start your first security scan</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/scans/new">
                <Plus className="mr-2 h-4 w-4" />
                Start New Scan
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/findings">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Review Findings
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/reports">
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/scans">
                <Clock className="mr-2 h-4 w-4" />
                View All Scans
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
</file>

<file path="src/app/(dashboard)/scans/[scanId]/findings/page.tsx">
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter,
  FileText,
  Shield
} from 'lucide-react'
import { Finding } from '@/lib/types/database'

export default function FindingsPage() {
  const params = useParams()
  const router = useRouter()
  const scanId = params.scanId as string
  
  const [findings, setFindings] = useState<Finding[]>([])
  const [selectedFindings, setSelectedFindings] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    severity: 'ALL',
    state: 'ALL',
    search: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          scanId,
          ...(filters.severity !== 'ALL' && { severity: filters.severity }),
          ...(filters.state !== 'ALL' && { state: filters.state }),
          ...(filters.search && { search: filters.search })
        })
        
        const response = await fetch(`/api/findings?${params}`)
        if (response.ok) {
          const data = await response.json()
          setFindings(data)
        }
      } catch (error) {
        console.error('Failed to fetch findings:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [scanId, filters])

  const fetchFindings = async () => {
    try {
      const params = new URLSearchParams({
        scanId,
        ...(filters.severity !== 'ALL' && { severity: filters.severity }),
        ...(filters.state !== 'ALL' && { state: filters.state }),
        ...(filters.search && { search: filters.search })
      })
      
      const response = await fetch(`/api/findings?${params}`)
      if (response.ok) {
        const data = await response.json()
        setFindings(data)
      }
    } catch (error) {
      console.error('Failed to fetch findings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyFindings = async (findingIds: string[], newState: string) => {
    try {
      const response = await fetch('/api/findings/verify', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ findingIds, state: newState }),
      })

      if (response.ok) {
        await fetchFindings()
        setSelectedFindings([])
      }
    } catch (error) {
      console.error('Failed to verify findings:', error)
    }
  }

  const handleGenerateReport = async () => {
    const verifiedFindings = findings.filter(f => f.state === 'VERIFIED')
    
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scanId,
          findings: verifiedFindings,
          companyName: 'Company Name', // You'd get this from scan data
          domain: 'example.com' // You'd get this from scan data
        }),
      })

      if (response.ok) {
        const { reportId } = await response.json()
        router.push(`/reports/${reportId}`)
      }
    } catch (error) {
      console.error('Failed to generate report:', error)
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'destructive'
      case 'HIGH': return 'destructive'
      case 'MEDIUM': return 'secondary'
      case 'LOW': return 'outline'
      default: return 'outline'
    }
  }


  const verifiedCount = findings.filter(f => f.state === 'VERIFIED').length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-8 w-8 animate-pulse mx-auto mb-4" />
          <p>Loading findings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Findings</h1>
          <p className="text-muted-foreground">
            {verifiedCount} verified of {findings.length} total findings
          </p>
        </div>
        
        <div className="flex gap-2">
          {selectedFindings.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() => handleVerifyFindings(selectedFindings, 'VERIFIED')}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify Selected ({selectedFindings.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => handleVerifyFindings(selectedFindings, 'FALSE_POSITIVE')}
              >
                Mark False Positive
              </Button>
            </>
          )}
          
          <Button 
            onClick={handleGenerateReport} 
            disabled={verifiedCount === 0}
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search findings..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <Select 
                value={filters.severity} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All severities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All severities</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={filters.state} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All statuses</SelectItem>
                  <SelectItem value="AUTOMATED">Automated</SelectItem>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="FALSE_POSITIVE">False Positive</SelectItem>
                  <SelectItem value="DISREGARD">Disregard</SelectItem>
                  <SelectItem value="NEED_OWNER_VERIFICATION">Need Owner Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Findings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedFindings.length === findings.length && findings.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedFindings(findings.map(f => f.id))
                      } else {
                        setSelectedFindings([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {findings.map((finding) => (
                <TableRow key={finding.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedFindings.includes(finding.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedFindings(prev => [...prev, finding.id])
                        } else {
                          setSelectedFindings(prev => prev.filter(id => id !== finding.id))
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {finding.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityVariant(finding.severity)}>
                      {finding.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{finding.description}</p>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={finding.state}
                      onValueChange={(newState) => handleVerifyFindings([finding.id], newState)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AUTOMATED">Automated</SelectItem>
                        <SelectItem value="VERIFIED">Verified</SelectItem>
                        <SelectItem value="FALSE_POSITIVE">False Positive</SelectItem>
                        <SelectItem value="DISREGARD">Disregard</SelectItem>
                        <SelectItem value="NEED_OWNER_VERIFICATION">Need Owner Verification</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground truncate">
                      {finding.recommendation}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {findings.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No findings found</h3>
              <p className="text-muted-foreground">
                No security findings match your current filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
</file>

<file path="src/app/layout.tsx">
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DealBrief Security Scanner",
  description: "Comprehensive security scanning and vulnerability assessment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
</file>

<file path="src/lib/types/database.ts">
export interface Database {
  public: {
    Tables: {
      scan_status: {
        Row: {
          scan_id: string
          company_name: string
          domain: string
          status: 'pending' | 'processing' | 'completed' | 'failed'
          progress: number
          total_modules: number
          created_at: string
          completed_at: string | null
          tags: string[] | null
        }
        Insert: {
          scan_id: string
          company_name: string
          domain: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          progress?: number
          total_modules?: number
          created_at?: string
          completed_at?: string | null
          tags?: string[] | null
        }
        Update: {
          scan_id?: string
          company_name?: string
          domain?: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          progress?: number
          total_modules?: number
          created_at?: string
          completed_at?: string | null
          tags?: string[] | null
        }
      }
      findings: {
        Row: {
          id: string
          created_at: string
          description: string
          scan_id: string
          type: string
          recommendation: string
          severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          attack_type_code: string
          state: 'AUTOMATED' | 'VERIFIED' | 'FALSE_POSITIVE' | 'DISREGARD' | 'NEED_OWNER_VERIFICATION'
          eal_low: number | null
          eal_ml: number | null
          eal_high: number | null
          eal_daily: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          description: string
          scan_id: string
          type: string
          recommendation: string
          severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          attack_type_code: string
          state?: 'AUTOMATED' | 'VERIFIED' | 'FALSE_POSITIVE' | 'DISREGARD' | 'NEED_OWNER_VERIFICATION'
          eal_low?: number | null
          eal_ml?: number | null
          eal_high?: number | null
          eal_daily?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          description?: string
          scan_id?: string
          type?: string
          recommendation?: string
          severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          attack_type_code?: string
          state?: 'AUTOMATED' | 'VERIFIED' | 'FALSE_POSITIVE' | 'DISREGARD' | 'NEED_OWNER_VERIFICATION'
          eal_low?: number | null
          eal_ml?: number | null
          eal_high?: number | null
          eal_daily?: number | null
        }
      }
      reports: {
        Row: {
          id: string
          scan_id: string
          company_name: string
          domain: string
          content: string
          findings_count: number
          status: 'pending' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          scan_id: string
          company_name: string
          domain: string
          content: string
          findings_count: number
          status?: 'pending' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          scan_id?: string
          company_name?: string
          domain?: string
          content?: string
          findings_count?: number
          status?: 'pending' | 'completed'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Scan = Database['public']['Tables']['scan_status']['Row']
export type Finding = Database['public']['Tables']['findings']['Row']
export type Report = Database['public']['Tables']['reports']['Row']
</file>

<file path="src/app/(dashboard)/reports/page.tsx">
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  FileText,
  Download,
  Eye,
  Loader2,
  Building,
  Globe,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { Report, Scan } from '@/lib/types/database'

interface ScanWithVerifiedCount extends Scan {
  verified_findings_count: number
}

export default function ReportsPage() {
  const [generatingReports, setGeneratingReports] = useState<Set<string>>(new Set())

  const { data: reports, isLoading: reportsLoading } = useQuery<Report[]>({
    queryKey: ['reports'],
    queryFn: async () => {
      const response = await fetch('/api/reports')
      if (!response.ok) throw new Error('Failed to fetch reports')
      return response.json()
    }
  })

  const { data: scansWithVerified, isLoading: scansLoading } = useQuery<ScanWithVerifiedCount[]>({
    queryKey: ['scans-with-verified'],
    queryFn: async () => {
      const [scansResponse, findingsResponse] = await Promise.all([
        fetch('/api/scans'),
        fetch('/api/findings')
      ])
      
      if (!scansResponse.ok || !findingsResponse.ok) {
        throw new Error('Failed to fetch data')
      }
      
      const scans = await scansResponse.json()
      const allFindings = await findingsResponse.json()
      
      // Count verified findings per scan
      return scans.map((scan: Scan) => ({
        ...scan,
        verified_findings_count: allFindings.filter((f: { scan_id: string; state: string }) => 
          f.scan_id === scan.scan_id && f.state === 'VERIFIED'
        ).length
      }))
    }
  })

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'processing': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'outline'
    }
  }

  const generateReport = async (scan: ScanWithVerifiedCount) => {
    if (scan.verified_findings_count === 0) return
    
    setGeneratingReports(prev => new Set([...prev, scan.scan_id]))
    
    try {
      // Get verified findings for this scan
      const findingsResponse = await fetch(`/api/findings?scanId=${scan.scan_id}`)
      const allFindings = await findingsResponse.json()
      const verifiedFindings = allFindings.filter((f: { state: string }) => f.state === 'VERIFIED')
      
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scanId: scan.scan_id,
          findings: verifiedFindings,
          companyName: scan.company_name,
          domain: scan.domain
        }),
      })

      if (response.ok) {
        const { reportId } = await response.json()
        // Refresh reports list
        window.location.href = `/reports/${reportId}`
      }
    } catch (error) {
      console.error('Failed to generate report:', error)
    } finally {
      setGeneratingReports(prev => {
        const newSet = new Set(prev)
        newSet.delete(scan.scan_id)
        return newSet
      })
    }
  }

  const exportReport = async (report: Report) => {
    try {
      // Create a downloadable file from the report content
      const fileName = `${report.company_name.replace(/[^a-z0-9]/gi, '_')}_Security_Report_${new Date(report.created_at).toISOString().split('T')[0]}.md`
      
      // Add a title and metadata to the report content
      const exportContent = `# Security Assessment Report
**Company:** ${report.company_name}  
**Domain:** ${report.domain}  
**Generated:** ${new Date(report.created_at).toLocaleDateString()}  
**Findings Count:** ${report.findings_count}  

---

${report.content}`

      // Create blob and download
      const blob = new Blob([exportContent], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export report:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Reports</h1>
          <p className="text-muted-foreground">
            Generate AI-powered due diligence reports from verified findings
          </p>
        </div>
      </div>

      {/* Generate Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Reports</CardTitle>
          <CardDescription>
            Create professional due diligence reports from scans with verified findings
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {scansLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : scansWithVerified && scansWithVerified.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified Findings</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scansWithVerified.map((scan) => (
                  <TableRow key={scan.scan_id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{scan.company_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{scan.domain}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(scan.status)}>
                        {scan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <Badge variant="outline">
                          {scan.verified_findings_count} verified
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(scan.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        disabled={scan.verified_findings_count === 0 || generatingReports.has(scan.scan_id)}
                        onClick={() => generateReport(scan)}
                      >
                        {generatingReports.has(scan.scan_id) ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Report
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No scans available</h3>
              <p className="text-muted-foreground mb-4">
                Complete some scans and verify findings to generate reports.
              </p>
              <Button asChild>
                <Link href="/scans/new">
                  Start New Scan
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>
            Previously generated security assessment reports
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {reportsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : reports && reports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {report.company_name}
                    </TableCell>
                    <TableCell>{report.domain}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {report.findings_count} findings
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(report.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/reports/${report.id}`}>
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => exportReport(report)}
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Export
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No reports generated yet</h3>
              <p className="text-muted-foreground">
                Generate your first report from verified scan findings above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
</file>

<file path="src/app/api/dashboard/recent-scans/route.ts">
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: recentScans, error } = await supabase
      .from('scan_status')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch recent scans' },
        { status: 500 }
      )
    }

    return NextResponse.json(recentScans)
  } catch (error) {
    console.error('Failed to fetch recent scans:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
</file>

<file path="package.json">
{
  "name": "dealbrief-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@supabase/supabase-js": "^2.50.0",
    "@tanstack/react-query": "^5.80.7",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.516.0",
    "nanoid": "^5.1.5",
    "next": "15.3.3",
    "openai": "^5.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "zustand": "^5.0.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
</file>

<file path="src/app/api/findings/verify/route.ts">
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(request: NextRequest) {
  try {
    const { findingIds, state: requestedState } = await request.json()
    let state = requestedState

    if (!findingIds || !Array.isArray(findingIds) || !state) {
      return NextResponse.json(
        { error: 'Finding IDs and state are required' },
        { status: 400 }
      )
    }

    // First, let's see what enum values actually exist in the database
    if (state === 'FALSE_POSITIVE') {
      const { data: allFindings } = await supabase
        .from('findings')
        .select('state')
        .limit(100)
      
      if (allFindings) {
        const uniqueStates = [...new Set(allFindings.map(f => f.state))]
        console.log('Existing state values in database:', uniqueStates)
        
        // Try to find a "false positive" equivalent
        const falsePositiveVariations = uniqueStates.filter(s => 
          s.toLowerCase().includes('false') || 
          s.toLowerCase().includes('positive') ||
          s.toLowerCase().includes('reject') ||
          s.toLowerCase().includes('invalid')
        )
        
        console.log('Possible false positive states:', falsePositiveVariations)
        
        if (falsePositiveVariations.length > 0) {
          state = falsePositiveVariations[0]
          console.log('Using state:', state)
        }
      }
    }

    console.log('Attempting to update findings:', { findingIds, state })
    
    const { data, error } = await supabase
      .from('findings')
      .update({ state })
      .in('id', findingIds)
      .select()

    if (error) {
      console.error('Database error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        { 
          error: 'Failed to update findings',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

    console.log('Successfully updated findings:', data)

    return NextResponse.json({ 
      updated: data.length,
      findings: data 
    })
  } catch (error) {
    console.error('Failed to verify findings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
</file>

<file path="src/app/api/findings/route.ts">
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get('scanId')
    const severity = searchParams.get('severity')
    const state = searchParams.get('state')
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    let query = supabase.from('findings').select('*')

    if (scanId) {
      query = query.eq('scan_id', scanId)
    }

    if (severity) {
      const severities = severity.split(',')
      query = query.in('severity', severities)
    }

    if (state) {
      const states = state.split(',')
      query = query.in('state', states)
    }

    if (type) {
      const types = type.split(',')
      query = query.in('type', types)
    }

    if (search) {
      query = query.or(`description.ilike.%${search}%,recommendation.ilike.%${search}%`)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch findings' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch findings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
</file>

<file path="src/app/api/reports/generate/route.ts">
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import OpenAI from 'openai'
import * as fs from 'fs'
import * as path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
})

export async function POST(request: NextRequest) {
  try {
    const { scanId, findings, companyName, domain } = await request.json()

    if (!scanId || !findings || !companyName || !domain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Read the prompt from prompt.md
    const promptPath = path.join(process.cwd(), 'prompt.md')
    const promptContent = fs.readFileSync(promptPath, 'utf-8')

    // Prepare findings data in CSV format as specified in prompt.md
    const csvHeader = 'id,created_at,description,scan_id,type,recommendation,severity,attack_type_code,state,eal_low,eal_ml,eal_high,eal_daily'
    const csvRows = findings.map((f: {
      id: string;
      created_at?: string;
      description: string;
      type: string;
      recommendation: string;
      severity: string;
      attack_type_code?: string;
      state: string;
      eal_low?: number | null;
      eal_ml?: number | null;
      eal_high?: number | null;
      eal_daily?: number | null;
    }) => {
      const escapeCsv = (field: string) => field ? `"${field.replace(/"/g, '""')}"` : '""'
      return [
        f.id,
        f.created_at || new Date().toISOString(),
        escapeCsv(f.description),
        scanId,
        f.type,
        escapeCsv(f.recommendation),
        f.severity,
        f.attack_type_code || 'UNKNOWN',
        f.state,
        f.eal_low || '',
        f.eal_ml || '',
        f.eal_high || '',
        f.eal_daily || ''
      ].join(',')
    })
    const csvData = [csvHeader, ...csvRows].join('\n')

    // Generate report using OpenAI with the prompt.md content
    const completion = await openai.chat.completions.create({
      model: 'o3-2025-04-16',
      messages: [
        {
          role: 'system',
          content: promptContent
        },
        {
          role: 'user',
          content: `Generate a due diligence report for ${companyName} (${domain}, scan_id: ${scanId}).

CSV data with verified findings:
${csvData}`
        }
      ],
      max_completion_tokens: 50000
    })

    const reportContent = completion.choices[0].message.content

    if (!reportContent) {
      return NextResponse.json(
        { error: 'Failed to generate report content' },
        { status: 500 }
      )
    }

    // Save report to database
    const { data, error } = await supabase
      .from('reports')
      .insert({
        id: scanId, // Use scan_id as the primary key
        scan_id: scanId,
        company_name: companyName,
        domain,
        content: reportContent,
        findings_count: findings.length,
        status: 'completed'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save report' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      reportId: data.id,
      content: reportContent 
    })

  } catch (error) {
    console.error('Failed to generate report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
</file>

<file path="src/app/(dashboard)/scans/new/page.tsx">
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { X, Plus, Upload, FileSpreadsheet, Building, Shield } from 'lucide-react'

interface CsvScanData {
  companyName: string
  domain: string
  tags: string[]
}

const REPORT_CONFIGS = [
  { 
    id: 'threat_snapshot', 
    label: 'Threat Snapshot (Executive Dashboard)', 
    description: 'Financial impact focused, ≤650 words', 
    maxWords: 650,
    icon: Building,
    color: 'text-red-600'
  },
  { 
    id: 'executive_summary', 
    label: 'Executive Summary (Strategic Overview)', 
    description: 'Strategic briefing for leadership, ≤2,500 words', 
    maxWords: 2500,
    icon: Building,
    color: 'text-blue-600'
  },
  { 
    id: 'technical_remediation', 
    label: 'Technical Remediation Guide', 
    description: 'Detailed implementation guide, ≤4,500 words', 
    maxWords: 4500,
    icon: Shield,
    color: 'text-green-600'
  }
]

export default function NewScanPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: '',
    domain: '',
    tags: [] as string[],
    autoGenerateReports: true,
    reportTypes: ['threat_snapshot', 'executive_summary', 'technical_remediation'] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<CsvScanData[]>([])
  const [showCsvPreview, setShowCsvPreview] = useState(false)
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single')

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmDialog(true)
  }

  const startScan = async () => {
    setIsLoading(true)
    setShowConfirmDialog(false)

    try {
      if (uploadMode === 'bulk' && csvData.length > 0) {
        const response = await fetch('/api/scans/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ scans: csvData }),
        })

        if (!response.ok) {
          throw new Error('Failed to start bulk scans')
        }
      } else {
        const response = await fetch('/api/scans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName: formData.companyName,
            domain: formData.domain,
            tags: formData.tags,
            autoGenerateReports: formData.autoGenerateReports,
            reportTypes: formData.reportTypes
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to start scan')
        }
      }

      router.push('/scans')
    } catch (error) {
      console.error('Error starting scan:', error)
      // Here you would typically show an error toast/notification
    } finally {
      setIsLoading(false)
    }
  }

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/csv') {
      setCsvFile(file)
      parseCsvFile(file)
    }
  }

  const parseCsvFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split('\n').filter(line => line.trim())
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim())
        const row: Partial<CsvScanData> = {}
        
        headers.forEach((header, index) => {
          if (header === 'company' || header === 'company_name' || header === 'companyname') {
            row.companyName = values[index]
          } else if (header === 'domain') {
            row.domain = values[index]
          } else if (header === 'tags') {
            row.tags = values[index] ? values[index].split(';').map(t => t.trim()).filter(t => t) : []
          }
        })
        
        return row
      }).filter((row): row is CsvScanData => 
        Boolean(row.companyName && row.domain)
      )
      
      setCsvData(data)
      setShowCsvPreview(true)
    }
    reader.readAsText(file)
  }

  const isFormValid = formData.companyName.trim() && formData.domain.trim()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Start New Security Scan</h1>
        <p className="text-muted-foreground">
          Initiate a comprehensive security assessment for your target organization
        </p>
      </div>

      {/* Mode Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Scan Type</CardTitle>
          <CardDescription>
            Choose between single scan or bulk upload
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={uploadMode === 'single' ? 'default' : 'outline'}
              onClick={() => setUploadMode('single')}
              className="flex-1"
            >
              Single Scan
            </Button>
            <Button
              type="button"
              variant={uploadMode === 'bulk' ? 'default' : 'outline'}
              onClick={() => setUploadMode('bulk')}
              className="flex-1"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Bulk Upload (CSV)
            </Button>
          </div>
        </CardContent>
      </Card>

      {uploadMode === 'single' ? (
        <Card>
          <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Scan Configuration</CardTitle>
            <CardDescription>
              Provide the target details for your security assessment
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Acme Corporation"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  companyName: e.target.value
                }))}
                autoCorrect="off"
                required
              />
              <p className="text-sm text-muted-foreground">
                The organization name for identification and reporting
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="domain">Target Domain</Label>
              <Input
                id="domain"
                placeholder="example.com"
                value={formData.domain}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  domain: e.target.value
                }))}
                autoCorrect="off"
                required
              />
              <p className="text-sm text-muted-foreground">
                Primary domain to scan (without https://)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  autoCorrect="off"
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-muted rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                Optional tags for categorization and filtering
              </p>
            </div>
            
            {/* Auto-Report Generation Options */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoGenerateReports" 
                  checked={formData.autoGenerateReports}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    autoGenerateReports: checked as boolean
                  }))}
                />
                <Label htmlFor="autoGenerateReports" className="text-sm font-medium">
                  Auto-generate professional reports upon scan completion
                </Label>
              </div>
              
              {formData.autoGenerateReports && (
                <div className="ml-6 space-y-3">
                  <p className="text-sm text-gray-600">Reports to generate automatically:</p>
                  <div className="space-y-3">
                    {REPORT_CONFIGS.map((report) => {
                      const IconComponent = report.icon
                      return (
                        <div key={report.id} className="border rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <Checkbox 
                              id={report.id}
                              checked={formData.reportTypes.includes(report.id)}
                              onCheckedChange={(checked) => {
                                const current = formData.reportTypes
                                if (checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    reportTypes: [...current, report.id]
                                  }))
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    reportTypes: current.filter(t => t !== report.id)
                                  }))
                                }
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <IconComponent className={`h-4 w-4 ${report.color}`} />
                                <Label htmlFor={report.id} className="text-sm font-medium">
                                  {report.label}
                                </Label>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed">
                                {report.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Reports will be generated automatically once the scan completes and findings are verified.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="bg-muted/50 flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Starting Scan...' : 'Start Security Scan'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Scan Upload</CardTitle>
            <CardDescription>
              Upload a CSV file with columns: company, domain, tags (optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="csv-upload">CSV File</Label>
              <div className="flex items-center gap-4">
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('csv-upload')?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {csvFile ? csvFile.name : 'Choose CSV File'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                CSV should have headers: company, domain, tags (tags separated by semicolons)
              </p>
            </div>

            {showCsvPreview && csvData.length > 0 && (
              <div className="space-y-2">
                <Label>Preview ({csvData.length} scans)</Label>
                <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {csvData.slice(0, 5).map((scan, index) => (
                      <div key={index} className="text-sm border-b pb-2">
                        <div><strong>Company:</strong> {scan.companyName}</div>
                        <div><strong>Domain:</strong> {scan.domain}</div>
                        {scan.tags && scan.tags.length > 0 && (
                          <div><strong>Tags:</strong> {scan.tags.join(', ')}</div>
                        )}
                      </div>
                    ))}
                    {csvData.length > 5 && (
                      <div className="text-xs text-muted-foreground">
                        ... and {csvData.length - 5} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              disabled={!csvFile || csvData.length === 0 || isLoading}
              onClick={() => setShowConfirmDialog(true)}
            >
              {isLoading ? 'Starting Scans...' : `Start ${csvData.length} Scans`}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Scan Information */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Comprehensive Assessment</h4>
              <p className="text-sm text-muted-foreground">
                Our 16-module scanner will analyze the target for vulnerabilities, 
                misconfigurations, and security weaknesses.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Real-time Progress</h4>
              <p className="text-sm text-muted-foreground">
                Monitor scan progress in real-time with live updates as each 
                security module completes its assessment.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Finding Verification</h4>
              <p className="text-sm text-muted-foreground">
                Review and verify discovered issues, filtering out false 
                positives to focus on real security concerns.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">AI-Powered Reports</h4>
              <p className="text-sm text-muted-foreground">
                Generate professional security reports with executive summaries 
                and technical recommendations using AI analysis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-white border shadow-lg">
          <DialogHeader>
            <DialogTitle>Confirm Security Scan</DialogTitle>
            <DialogDescription>
              Are you sure you want to start a security scan for this target?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {uploadMode === 'single' ? (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <span className="font-medium">Company:</span> {formData.companyName}
                </div>
                <div>
                  <span className="font-medium">Domain:</span> {formData.domain}
                </div>
                {formData.tags.length > 0 && (
                  <div>
                    <span className="font-medium">Tags:</span> {formData.tags.join(', ')}
                  </div>
                )}
                <div>
                  <span className="font-medium">Auto-generate reports:</span> {formData.autoGenerateReports ? 'Yes' : 'No'}
                </div>
                {formData.autoGenerateReports && formData.reportTypes.length > 0 && (
                  <div>
                    <span className="font-medium">Report types:</span> {formData.reportTypes.map(type => 
                      REPORT_CONFIGS.find(r => r.id === type)?.label || type
                    ).join(', ')}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <span className="font-medium">Scans to create:</span> {csvData.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Companies: {csvData.map(s => s.companyName).join(', ')}
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. The scan{uploadMode === 'bulk' ? 's' : ''} will begin immediately and may take some time to complete.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={startScan} disabled={isLoading}>
              {isLoading ? 'Starting Scan...' : 'Start Scan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
</file>

<file path="src/app/api/scans/route.ts">
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { companyName, domain, tags } = await request.json()

    if (!companyName || !domain) {
      return NextResponse.json(
        { error: 'Company name and domain are required' },
        { status: 400 }
      )
    }

    // Call the external scanner API (keep working scan functionality)
    const response = await fetch('https://dealbrief-scanner.fly.dev/scans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://lfbi.vercel.app'
      },
      body: JSON.stringify({
        companyName,
        domain,
        tags: tags || []
      })
    })

    if (!response.ok) {
      throw new Error(`Scanner API error: ${response.statusText}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to start scan:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('scan_status')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch scans' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch scans:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
</file>

<file path="src/app/(dashboard)/findings/page.tsx">
'use client'

import { useState, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Shield,
  Loader2,
  ChevronDown,
  ChevronRight,
  Building,
  Globe
} from 'lucide-react'
import { Finding, Scan } from '@/lib/types/database'



function FindingsContent() {
  const [selectedFindings, setSelectedFindings] = useState<string[]>([])
  const [expandedScans, setExpandedScans] = useState<Set<string>>(new Set())
  const [scanFindings, setScanFindings] = useState<Record<string, Finding[]>>({})
  const [loadingFindings, setLoadingFindings] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [findingFilters, setFindingFilters] = useState({
    severity: 'ALL',
    state: 'ALL'
  })

  // Get all scans
  const { data: allScans, isLoading: scansLoading } = useQuery<Scan[]>({
    queryKey: ['scans'],
    queryFn: async () => {
      const response = await fetch('/api/scans')
      if (!response.ok) throw new Error('Failed to fetch scans')
      return response.json()
    }
  })

  // Filter scans based on search
  const scans = allScans?.filter(scan => {
    if (!search) return true
    return scan.company_name.toLowerCase().includes(search.toLowerCase()) ||
           scan.domain.toLowerCase().includes(search.toLowerCase()) ||
           scan.scan_id.toLowerCase().includes(search.toLowerCase())
  }) || []

  // Load findings for a specific scan
  const loadScanFindings = async (scanId: string) => {
    if (scanFindings[scanId]) return // Already loaded
    
    setLoadingFindings(prev => new Set([...prev, scanId]))
    
    try {
      const params = new URLSearchParams({
        scanId,
        ...(findingFilters.severity !== 'ALL' && { severity: findingFilters.severity }),
        ...(findingFilters.state !== 'ALL' && { state: findingFilters.state })
      })
      
      const response = await fetch(`/api/findings?${params}`)
      if (response.ok) {
        const findings = await response.json()
        setScanFindings(prev => ({ ...prev, [scanId]: findings }))
      }
    } catch (error) {
      console.error('Failed to fetch findings:', error)
    } finally {
      setLoadingFindings(prev => {
        const newSet = new Set(prev)
        newSet.delete(scanId)
        return newSet
      })
    }
  }

  // Toggle scan expansion
  const toggleScan = async (scanId: string) => {
    const newExpanded = new Set(expandedScans)
    
    if (expandedScans.has(scanId)) {
      newExpanded.delete(scanId)
    } else {
      newExpanded.add(scanId)
      await loadScanFindings(scanId)
    }
    
    setExpandedScans(newExpanded)
  }

  const handleVerifyFindings = async (findingIds: string[], newState: string) => {
    console.log('Updating findings:', findingIds, 'to state:', newState)
    try {
      const response = await fetch('/api/findings/verify', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ findingIds, state: newState }),
      })

      if (response.ok) {
        const { findings: updatedFindings } = await response.json()
        console.log('Updated findings:', updatedFindings)
        
        // Update the local state immediately for better UX
        setScanFindings(prev => {
          const newState = { ...prev }
          
          // Update each affected finding
          updatedFindings.forEach((updatedFinding: Finding) => {
            Object.keys(newState).forEach(scanId => {
              newState[scanId] = newState[scanId].map(finding => 
                finding.id === updatedFinding.id ? updatedFinding : finding
              )
            })
          })
          
          return newState
        })
        
        setSelectedFindings([])
      } else {
        const errorData = await response.json()
        console.error('API error:', errorData)
      }
    } catch (error) {
      console.error('Failed to verify findings:', error)
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'destructive'
      case 'HIGH': return 'destructive'
      case 'MEDIUM': return 'secondary'
      case 'LOW': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'processing': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'outline'
    }
  }

  // Calculate totals across all loaded findings
  const allFindings = Object.values(scanFindings).flat()
  const verifiedCount = allFindings.filter(f => f.state === 'VERIFIED').length
  const totalFindings = allFindings.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Findings by Scan</h1>
          <p className="text-muted-foreground">
            {verifiedCount} verified of {totalFindings} loaded findings across {scans?.length || 0} scans
          </p>
        </div>
        
        <div className="flex gap-2">
          {selectedFindings.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() => handleVerifyFindings(selectedFindings, 'VERIFIED')}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify Selected ({selectedFindings.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => handleVerifyFindings(selectedFindings, 'falsepositive')}
              >
                Mark False Positive
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium">Search Scans</label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company, domain, or scan ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Finding Severity</label>
          <Select 
            value={findingFilters.severity} 
            onValueChange={(value) => setFindingFilters(prev => ({ ...prev, severity: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All severities</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Finding Status</label>
          <Select 
            value={findingFilters.state} 
            onValueChange={(value) => setFindingFilters(prev => ({ ...prev, state: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              <SelectItem value="AUTOMATED">Automated</SelectItem>
              <SelectItem value="VERIFIED">Verified</SelectItem>
              <SelectItem value="falsepositive">False Positive</SelectItem>
              <SelectItem value="DISREGARD">Disregard</SelectItem>
              <SelectItem value="NEED_OWNER_VERIFICATION">Need Owner Verification</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scans List */}
      <Card>
        <CardHeader>
          <CardTitle>Scans with Findings</CardTitle>
          <CardDescription>
            Click on any scan to expand and view its security findings
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {scansLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : scans && scans.length > 0 ? (
            <div className="space-y-2">
              {scans.map((scan) => (
                <Collapsible
                  key={scan.scan_id}
                  open={expandedScans.has(scan.scan_id)}
                  onOpenChange={() => toggleScan(scan.scan_id)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer border-b">
                      <div className="flex items-center gap-3">
                        {expandedScans.has(scan.scan_id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{scan.company_name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Globe className="h-3 w-3" />
                              <span>{scan.domain}</span>
                              <span>•</span>
                              <span>{scan.scan_id}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusVariant(scan.status)}>
                          {scan.status}
                        </Badge>
                        <Badge variant="outline">
                          {scanFindings[scan.scan_id]?.length || 0} findings
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(scan.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="border-t bg-muted/20">
                      {loadingFindings.has(scan.scan_id) ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      ) : scanFindings[scan.scan_id] && scanFindings[scan.scan_id].length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                <Checkbox
                                  checked={scanFindings[scan.scan_id]?.every(f => selectedFindings.includes(f.id)) || false}
                                  onCheckedChange={(checked) => {
                                    const scanFindingIds = scanFindings[scan.scan_id]?.map(f => f.id) || []
                                    if (checked) {
                                      setSelectedFindings(prev => [...new Set([...prev, ...scanFindingIds])])
                                    } else {
                                      setSelectedFindings(prev => prev.filter(id => !scanFindingIds.includes(id)))
                                    }
                                  }}
                                />
                              </TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Severity</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Recommendation</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {scanFindings[scan.scan_id]?.map((finding) => (
                              <TableRow key={finding.id}>
                                <TableCell>
                                  <Checkbox
                                    checked={selectedFindings.includes(finding.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedFindings(prev => [...prev, finding.id])
                                      } else {
                                        setSelectedFindings(prev => prev.filter(id => id !== finding.id))
                                      }
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {finding.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={getSeverityVariant(finding.severity)}>
                                    {finding.severity}
                                  </Badge>
                                </TableCell>
                                <TableCell className="max-w-lg">
                                  <p className="whitespace-normal break-words">{finding.description}</p>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={finding.state}
                                    onValueChange={(newState) => handleVerifyFindings([finding.id], newState)}
                                  >
                                    <SelectTrigger className="w-36 bg-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border shadow-md z-50">
                                      <SelectItem value="AUTOMATED" className="cursor-pointer">Automated</SelectItem>
                                      <SelectItem value="VERIFIED" className="cursor-pointer">Verified</SelectItem>
                                      <SelectItem value="FALSE_POSITIVE" className="cursor-pointer">False Positive</SelectItem>
                                      <SelectItem value="DISREGARD" className="cursor-pointer">Disregard</SelectItem>
                                      <SelectItem value="NEED_OWNER_VERIFICATION" className="cursor-pointer">Need Owner Verification</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell className="max-w-lg">
                                  <p className="text-sm text-muted-foreground whitespace-normal break-words">
                                    {finding.recommendation}
                                  </p>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-8">
                          <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No findings found for this scan with current filters
                          </p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No scans found</h3>
              <p className="text-muted-foreground">
                No scans match your search criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function FindingsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <FindingsContent />
    </Suspense>
  )
}
</file>

</files>
