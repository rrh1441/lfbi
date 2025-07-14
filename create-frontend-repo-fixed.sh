#!/bin/bash

# Script to create a clean dealbrief-frontend repository
# Run this from /Users/ryanheger/ directory

set -e

echo "Creating clean dealbrief-frontend repository..."

# Create new directory
mkdir -p dealbrief-frontend
cd dealbrief-frontend

# Initialize git
git init
echo "# DealBrief Frontend" > README.md

# Copy frontend files from dealbrief-scanner
echo "Copying frontend files..."

# Core Next.js files (only copy if they exist)
cp ../dealbrief-scanner/package.json .
[ -f ../dealbrief-scanner/next.config.ts ] && cp ../dealbrief-scanner/next.config.ts .
[ -f ../dealbrief-scanner/next.config.js ] && cp ../dealbrief-scanner/next.config.js .
cp ../dealbrief-scanner/tailwind.config.ts .
cp ../dealbrief-scanner/tsconfig.json .
cp ../dealbrief-scanner/postcss.config.mjs .
[ -f ../dealbrief-scanner/.eslintrc.json ] && cp ../dealbrief-scanner/.eslintrc.json .
[ -f ../dealbrief-scanner/.eslintrc.js ] && cp ../dealbrief-scanner/.eslintrc.js .
[ -f ../dealbrief-scanner/eslint.config.mjs ] && cp ../dealbrief-scanner/eslint.config.mjs .
cp ../dealbrief-scanner/.gitignore .
[ -f ../dealbrief-scanner/components.json ] && cp ../dealbrief-scanner/components.json .

# Source code
cp -r ../dealbrief-scanner/src .

# Documentation
cp ../dealbrief-scanner/DEPLOYMENT.md .
cp ../dealbrief-scanner/SECRETS.md .
[ -f ../dealbrief-scanner/visuals.md ] && cp ../dealbrief-scanner/visuals.md .
[ -f ../dealbrief-scanner/v0-prompt.md ] && cp ../dealbrief-scanner/v0-prompt.md .

# Create frontend-specific .env.example
cat > .env.example << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Backend Configuration (your Fly.io dealbrief-scanner URL)
NEXT_PUBLIC_DEALBRIEF_BACKEND_URL=https://dealbrief-scanner.fly.dev
NEXT_PUBLIC_DEALBRIEF_API_KEY=optional-api-key-for-backend-auth

# OpenAI for report generation
OPENAI_API_KEY=sk-your-openai-api-key
EOF

# Create a clean package.json focused on frontend only
cat > package.json << 'EOF'
{
  "name": "dealbrief-frontend",
  "version": "1.0.0",
  "description": "DealBrief Scanner Frontend Dashboard",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@supabase/supabase-js": "^2.39.3",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.263.1",
    "next": "14.0.4",
    "openai": "^4.28.0",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.7",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Create clean README for frontend
cat > README.md << 'EOF'
# DealBrief Frontend

A Next.js dashboard for the DealBrief security scanner platform.

## Features

- **Single Scan**: Trigger individual domain security scans
- **Bulk Scan**: Process multiple domains via CSV upload  
- **All Scans**: View scan history and status
- **Findings**: Review security findings with filtering
- **Reports**: Generate threat snapshots and full reports
- **Verified Section**: Manage finding verification workflow

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and configure
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `NEXT_PUBLIC_DEALBRIEF_BACKEND_URL` - Your dealbrief-scanner backend URL
- `OPENAI_API_KEY` - Your OpenAI API key

See [SECRETS.md](./SECRETS.md) for detailed setup instructions.

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## Architecture

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Connects to dealbrief-scanner API (Fly.io)
- **Database**: Supabase for findings and scan data
- **Styling**: Tailwind CSS with shadcn/ui components

## Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## API Integration

The frontend connects to these backend endpoints:

- `POST /scans` - Trigger single scan
- `POST /scans/bulk` - Trigger bulk scans
- `GET /scans` - Get all scans
- `GET /findings` - Get findings with filters
- `POST /reports/generate` - Generate reports

All API calls are handled through the `dealBriefAPI` service in `src/lib/dealbrief-api.ts`.
EOF

# Initial commit
git add .
git commit -m "Initial commit: DealBrief Frontend Dashboard

✨ Features:
- Single scan interface
- Bulk scan with CSV upload  
- Findings management and filtering
- Report generation (threat snapshots)
- Verification workflow
- Clean separation from backend

🏗️ Architecture:
- Next.js 14 with TypeScript
- Tailwind CSS + shadcn/ui
- Supabase integration
- Backend API compatibility layer

🚀 Ready for Vercel deployment"

echo ""
echo "✅ Repository created successfully!"
echo ""
echo "Next steps:"
echo "1. cd dealbrief-frontend"
echo "2. Create GitHub repository: gh repo create dealbrief-frontend --public"
echo "3. Push to GitHub: git remote add origin git@github.com:USERNAME/dealbrief-frontend.git && git push -u origin main"
echo "4. Copy .env.example to .env.local and configure your secrets"
echo "5. Install dependencies: npm install"
echo "6. Test locally: npm run dev"
echo "7. Deploy to Vercel: vercel --prod"
echo ""
echo "📖 See DEPLOYMENT.md and SECRETS.md for complete setup instructions."
EOF