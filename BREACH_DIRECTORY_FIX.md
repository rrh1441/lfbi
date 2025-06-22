# BreachDirectory API Fix

## 🚨 Issue Found
The BreachDirectory module was getting 403 Forbidden errors due to using incorrect API endpoint and parameters.

## ❌ Original Implementation (Wrong)
```typescript
// Wrong endpoint
const BREACH_DIRECTORY_API_BASE = 'https://breachdirectory.org/api_domain_search';

// Wrong parameters
params: {
  domain: domain,
  plain: 'true', 
  key: apiKey
}
```

## ✅ Fixed Implementation (Correct)
```typescript
// Correct endpoint per documentation
const BREACH_DIRECTORY_API_BASE = 'https://BreachDirectory.com/api_usage';

// Correct parameters per documentation
params: {
  method: 'domain',
  key: apiKey,
  query: domain
}
```

## 📚 Based on Official Documentation
According to the BreachDirectory documentation:

**Correct Usage Pattern:**
```
https://BreachDirectory.com/api_usage?method=$Method&key=$Key&query=$Query
```

**For Domain Searches:**
- `$Method` = "domain" 
- `$Key` = API Key
- `$Query` = domain name

## 🔧 Changes Made

1. **Fixed API endpoint URL** 
   - Changed from `breachdirectory.org/api_domain_search` 
   - To: `BreachDirectory.com/api_usage`

2. **Fixed request parameters**
   - Removed: `domain`, `plain` parameters
   - Added: `method=domain`, `query=domain_name` parameters

3. **Enhanced environment variable support**
   - Added support for multiple env var names: `BREACH_DIRECTORY_API_KEY`, `BREACHDIRECTORY_KEY`, `BREACH_DIRECTORY_KEY`

4. **Updated deployment documentation**
   - Added BreachDirectory API key to environment variables section

## 🧪 Expected Results After Fix

### Before (403 Forbidden):
```
[breachDirectoryProbe] Breach Directory API returned 403 Forbidden for domain.com: Access forbidden
```

### After (Successful):
```
[breachDirectoryProbe] Breach Directory response for domain.com: 15 breached accounts
[breachDirectoryProbe] Breach Directory analysis complete: 15 breached accounts found
```

## 🔑 API Key Setup

The API key is already configured in Fly environment secrets as `BREACH_DIRECTORY_API_KEY`.
No additional setup required for deployment.

## 🎯 Domain Search Authorization

According to the documentation, domain searches ARE authorized for all API users. The 403 error was due to incorrect API endpoint/parameters, not authorization issues.

This fix should resolve the BreachDirectory 403 Forbidden errors and enable proper breach intelligence collection for domain scanning.