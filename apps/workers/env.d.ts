/**
 * Environment variable type definitions
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Existing environment variables
      NODE_ENV?: 'development' | 'production' | 'test';
      DATABASE_URL?: string;
      REDIS_URL?: string;
      
      // API Keys
      ABUSEIPDB_API_KEY?: string;
      BREACH_DIRECTORY_API_KEY?: string;
      CENSYS_API_ID?: string;
      CENSYS_API_KEY?: string;
      CENSYS_API_SECRET?: string;
      CHAOS_API_KEY?: string;
      CLAUDE_API_KEY?: string;
      HAVEIBEENPWNED_API_KEY?: string;
      HIBP_API_KEY?: string;
      LEAKCHECK_API_KEY?: string;
      NUCLEI_API_KEY?: string;
      NVD_API_KEY?: string;
      OPENAI_API_KEY?: string;
      SERPER_KEY?: string;
      SHODAN_API_KEY?: string;
      SPIDERFOOT_API_KEY?: string;
      SPIDERFOOT_FILTER_MODE?: string;
      WHOISXML_API_KEY?: string;
      WHOISXML_KEY?: string;
      
      // Storage
      S3_ACCESS_KEY?: string;
      S3_BUCKET?: string;
      S3_ENDPOINT?: string;
      S3_SECRET_KEY?: string;
      
      // Monitoring
      SENTRY_DSN?: string;
      
      // Database
      SUPABASE_SERVICE_ROLE_KEY?: string;
      SUPABASE_URL?: string;
      
      // Puppeteer Configuration (NEW)
      PUPPETEER_MAX_PAGES?: string;
      ENABLE_PUPPETEER?: '0' | '1';
      DEBUG_PUPPETEER?: 'true' | 'false';
      
      // Testing
      PUPPETEER_E2E?: '1';
    }
  }
}

export {};