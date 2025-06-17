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
  type character varying NOT NULL,
  val_text text NOT NULL,
  src_url text,
  sha256 character varying,
  mime character varying,
  id integer NOT NULL DEFAULT nextval('artifacts_id_seq'::regclass),
  severity character varying DEFAULT 'INFO'::character varying,
  meta jsonb DEFAULT '{}'::jsonb,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT artifacts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.findings (
  description text,
  scan_id character varying,
  type character varying,
  recommendation text,
  severity character varying,
  artifact_id integer,
  mitigation text,
  summary text,
  class character varying,
  id integer NOT NULL DEFAULT nextval('findings_id_seq'::regclass),
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT findings_pkey PRIMARY KEY (id),
  CONSTRAINT findings_artifact_id_fkey FOREIGN KEY (artifact_id) REFERENCES public.artifacts(id)
);
CREATE TABLE public.reports (
  id character varying NOT NULL,
  user_id uuid NOT NULL,
  json_url text,
  pdf_url text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT reports_pkey PRIMARY KEY (id)
);
CREATE TABLE public.scan_status (
  total_artifacts_count integer DEFAULT 0,
  scan_id text NOT NULL UNIQUE,
  company_name text NOT NULL,
  domain text NOT NULL,
  status text NOT NULL,
  current_module text,
  completed_at timestamp with time zone,
  error_message text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  total_modules integer DEFAULT 10,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  max_severity character varying,
  total_findings_count integer DEFAULT 0,
  CONSTRAINT scan_status_pkey PRIMARY KEY (id)
);
CREATE TABLE public.search_events (
  name text NOT NULL,
  organization text NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT search_events_pkey PRIMARY KEY (id)
);
CREATE TABLE public.security_reports (
  report_url text,
  scan_id character varying NOT NULL UNIQUE,
  company_name character varying NOT NULL,
  report_content text NOT NULL,
  executive_summary text,
  generated_at timestamp with time zone,
  id integer NOT NULL DEFAULT nextval('security_reports_id_seq'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT security_reports_pkey PRIMARY KEY (id)
);
CREATE TABLE public.session (
  id text NOT NULL,
  expiresAt timestamp without time zone NOT NULL,
  token text NOT NULL UNIQUE,
  ipAddress text,
  userAgent text,
  userId text NOT NULL,
  createdAt timestamp without time zone NOT NULL DEFAULT now(),
  updatedAt timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT session_pkey PRIMARY KEY (id),
  CONSTRAINT session_userId_fkey FOREIGN KEY (userId) REFERENCES public.user(id)
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
CREATE TABLE public.user (
  id text NOT NULL,
  email text NOT NULL UNIQUE,
  name text,
  image text,
  emailVerified boolean NOT NULL DEFAULT false,
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
  user_id text NOT NULL,
  name text NOT NULL,
  organization text NOT NULL,
  brief_content text NOT NULL,
  id integer NOT NULL DEFAULT nextval('user_briefs_id_seq'::regclass),
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