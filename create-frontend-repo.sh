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

# Core Next.js files
cp ../dealbrief-scanner/package.json .
cp ../dealbrief-scanner/next.config.js .
cp ../dealbrief-scanner/tailwind.config.ts .
cp ../dealbrief-scanner/tsconfig.json .
cp ../dealbrief-scanner/postcss.config.mjs .
cp ../dealbrief-scanner/.eslintrc.json .
cp ../dealbrief-scanner/.gitignore .

# Source code
cp -r ../dealbrief-scanner/src .

# Documentation
cp ../dealbrief-scanner/DEPLOYMENT.md .
cp ../dealbrief-scanner/visuals.md .
cp ../dealbrief-scanner/v0-prompt.md .

# Components and lib (exclude backend-specific files)
# Already copied in src/ above

# Create frontend-specific .env.example
cat > .env.example << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Backend Configuration (your Fly.io dealbrief-scanner URL)
DEALBRIEF_BACKEND_URL=https://your-app-name.fly.dev
DEALBRIEF_API_KEY=optional-api-key-for-backend-auth

# OpenAI for report generation
OPENAI_API_KEY=your-openai-api-key
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

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

### Vercel Deployment

```bash
npm i -g vercel
vercel --prod
```

### Environment Variables Required

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `DEALBRIEF_BACKEND_URL`
- `OPENAI_API_KEY`

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
EOF

# Initial commit
git add .
git commit -m "Initial commit: DealBrief Frontend Dashboard

🔧 Features:
- Single scan interface
- Bulk scan with CSV upload
- Findings management and filtering
- Report generation (threat snapshots)
- Verification workflow
- Clean separation from backend

🚀 Ready for Vercel deployment"

echo ""
echo "✅ Repository created successfully!"
echo ""
echo "Next steps:"
echo "1. cd dealbrief-frontend"
echo "2. Create GitHub repository: gh repo create dealbrief-frontend --public"
echo "3. Push to GitHub: git remote add origin git@github.com:USERNAME/dealbrief-frontend.git && git push -u origin main"
echo "4. Deploy to Vercel: vercel --prod"
echo ""
echo "See DEPLOYMENT.md for complete setup instructions."
EOF