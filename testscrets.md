 ✅ Hardcoded Secrets TruffleHog Should Detect:

  1. Database credentials - VerySecurePassword123! hardcoded in multiple places
  2. JWT tokens - Real Supabase JWT tokens (those are actual JWT patterns)
  3. AWS keys - AKIAIOSFODNN7EXAMPLE and wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  4. Database connection strings - Full PostgreSQL URLs with embedded passwords
  5. Secret keys - JWT_SECRET, ENCRYPTION_KEY, SESSION_SECRET

  ✅ Document Exposure Should Detect:

  1. /.env - Environment file with secrets
  2. config.json - Configuration with database credentials
  3. Various sensitive files documented in the HTML pages

  ✅ Other Detectable Patterns:

  - Supabase URLs - https://ltiuuauafphpwewqktdv.supabase.co
  - API endpoints - RESTful and GraphQL endpoints
  - Tech stack fingerprints - WordPress, Node.js versions
  - Database connection details - Host, port, credentials

  The key is that these are realistic patterns that secret scanning tools look for:
  - Real AWS key format (AKIA...)
  - Real JWT tokens (proper base64 encoding)
  - Database connection strings
  - Common environment variable names
  - Realistic password patterns

  Your scanner should easily detect these as they follow real-world patterns that
  tools like TruffleHog are designed to catch.