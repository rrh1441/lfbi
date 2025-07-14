# Deployment Instructions

This guide explains how to deploy the DealBrief Scanner frontend and backend as separate applications.

## Architecture Overview

- **Backend**: Node.js scanner service deployed on Fly.io
- **Frontend**: Next.js dashboard deployed on Vercel
- **Database**: Supabase for findings and scan results storage

## Backend Deployment (Fly.io)

The backend scanner service is already configured in the `apps/workers` directory.

### Prerequisites
1. Install [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/)
2. Login to Fly.io: `flyctl auth login`

### Deploy Backend
```bash
# Navigate to the backend directory
cd apps/workers

# Deploy to Fly.io (using existing fly.toml)
flyctl deploy
```

### Environment Variables for Backend
Set these in Fly.io:
```bash
flyctl secrets set SUPABASE_URL="your-supabase-project-url"
flyctl secrets set SUPABASE_ANON_KEY="your-supabase-anon-key"
flyctl secrets set OPENAI_API_KEY="your-openai-api-key"
```

## Frontend Deployment (Vercel)

The frontend dashboard connects to the backend and Supabase.

### Prerequisites
1. Install [Vercel CLI](https://vercel.com/cli): `npm i -g vercel`
2. Login to Vercel: `vercel login`

### Deploy Frontend
```bash
# From the root directory (where package.json is)
vercel --prod
```

### Environment Variables for Frontend
Set these in Vercel dashboard or via CLI:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Backend Configuration (server-side only - not exposed to browser)
DEALBRIEF_BACKEND_URL="https://your-app-name.fly.dev"
DEALBRIEF_API_KEY="optional-api-key-for-backend-auth"

# OpenAI for report generation
OPENAI_API_KEY="your-openai-api-key"
```

## Local Development

### Backend (Port 8080)
```bash
cd apps/workers
npm install
npm run dev
```

### Frontend (Port 3000)
```bash
# From root directory
npm install
npm run dev
```

### Environment Files

Create `.env.local` in the root directory:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-supabase-anon-key

# Backend (server-side only)
DEALBRIEF_BACKEND_URL=http://localhost:8080

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

Create `.env` in `apps/workers/`:
```env
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=your-local-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
```

## Supabase Setup

1. Create a new Supabase project
2. Run the migration SQL found in `supabase-migration.sql`
3. Copy your project URL and anon key to environment variables

### Required Database Tables
- `findings` - Security findings from scans
- `scan_status` - Scan progress and metadata  
- `reports` - Generated reports

## API Integration

The frontend uses these API endpoints:

- `POST /api/scans` - Trigger single scan
- `POST /api/scans/bulk` - Trigger bulk scans
- `GET /api/scans` - Get all scans
- `GET /api/findings` - Get findings with filters
- `GET /api/verified` - Get verified findings
- `POST /api/verified/[id]/[action]` - Verify/reject findings
- `POST /api/reports/generate` - Generate reports

## Core Features

### 1. Single Scan (`/scans/new`)
- Enter domain to scan
- Triggers scan via backend API
- Shows scan progress

### 2. Bulk Scan (`/scans/bulk`)  
- Upload CSV or enter multiple domains
- Processes all domains in parallel
- Shows results for each domain

### 3. All Scans (`/scans`)
- View all scan history
- Filter by status, date, domain
- Access scan details and findings

### 4. Findings (`/findings`)
- View all security findings
- Filter by severity, type, status
- Search findings content

### 5. Reports (`/reports`)
- Generate threat snapshots
- Executive summaries
- Technical remediation guides

### 6. Verified Section (`/verified`)
- Review pending findings
- Approve or reject findings
- Add verification notes

## Monitoring

### Logs
- Backend: `flyctl logs` 
- Frontend: Vercel dashboard logs
- Database: Supabase dashboard logs

### Health Checks
- Backend: `GET https://your-app.fly.dev/health`
- Frontend: `GET https://your-app.vercel.app/api/health`

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure backend URL is correct in frontend env vars
2. **Database connection**: Check Supabase URL and keys
3. **Scan failures**: Verify backend API is accessible
4. **Build failures**: Check Node.js version compatibility

### Environment Issues
- Ensure all required environment variables are set
- Check that Supabase URL uses `https://` not `http://` in production
- Verify API keys are correct and not expired

### Support
- Backend issues: Check Fly.io logs and restart if needed
- Frontend issues: Check Vercel deployment logs
- Database issues: Check Supabase project status