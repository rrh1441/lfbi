# Required Secrets for DealBrief Frontend

## Vercel Environment Variables

Add these secrets to your Vercel project (either via dashboard or CLI):

### 🔐 Supabase Configuration
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 🔐 Backend API Configuration (Server-Side Only)
```bash
DEALBRIEF_BACKEND_URL=https://dealbrief-scanner.fly.dev
DEALBRIEF_API_KEY=your-optional-api-key-if-backend-requires-auth
```

### 🔐 OpenAI Configuration
```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
```

## How to Set Secrets

### Option 1: Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add each variable with appropriate environment (Production/Preview/Development)

### Option 2: Vercel CLI
```bash
# After deploying with `vercel --prod`
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  
vercel env add DEALBRIEF_BACKEND_URL
vercel env add DEALBRIEF_API_KEY
vercel env add OPENAI_API_KEY
```

## Local Development (.env.local)

Create `.env.local` file in your project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Backend (server-side only - keeps URL and API key private)
DEALBRIEF_BACKEND_URL=https://dealbrief-scanner.fly.dev
DEALBRIEF_API_KEY=your-api-key-if-needed
# DEALBRIEF_BACKEND_URL=http://localhost:8080  # For local backend

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here
```

## Where to Get These Values

### Supabase Keys
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Settings → API
4. Copy "Project URL" and "anon/public" key

### Backend URL
- **Production**: `https://dealbrief-scanner.fly.dev` (your existing Fly.io app)
- **Development**: `http://localhost:8080` (when running backend locally)

### OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. API Keys → Create new secret key
3. Copy the key (starts with `sk-`)

## Security Notes

- Never commit `.env.local` to git (already in .gitignore)
- Rotate API keys if compromised
- Use environment-specific keys (dev/staging/prod)
- The Supabase anon key is safe to expose (it's public)
- Keep OpenAI API key secure (billing implications)

### 🔒 Security Architecture

This frontend uses a secure proxy pattern:
- **Client-side**: Only makes calls to Next.js API routes (`/api/*`)
- **Server-side**: API routes proxy requests to your backend with private credentials
- **Backend URL & API key**: Never exposed to the browser

This keeps your backend location and authentication details private while maintaining full functionality.

## Testing Configuration

After setting up secrets, test the integration:

```bash
# 1. Install dependencies
npm install

# 2. Start development server  
npm run dev

# 3. Test features:
# - Try triggering a scan
# - Check if findings load
# - Test report generation
```

## Troubleshooting

### Common Issues
- **CORS errors**: Check `DEALBRIEF_BACKEND_URL` is configured correctly in server environment
- **Supabase errors**: Verify URL and anon key
- **Report generation fails**: Check OpenAI API key and billing
- **Build errors**: Ensure all required secrets are set

### Debug Commands
```bash
# Check if environment variables are loaded
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

# Test API connectivity
curl https://your-project.vercel.app/api/scans

# Check Vercel environment variables
vercel env ls
```