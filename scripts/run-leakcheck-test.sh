#!/bin/bash

# LeakCheck Database Test Runner
# This script helps set up the environment and run the LeakCheck data structure test

set -e  # Exit on any error

echo "🚀 LeakCheck Database Test Runner"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the dealbrief-scanner root directory"
    echo "   Current directory: $(pwd)"
    echo "   Expected files: package.json, apps/workers/core/artifactStore.ts"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed or not in PATH"
    echo "   Please install Node.js version 18 or higher"
    exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//')
echo "✅ Node.js version: $NODE_VERSION"

# Check if the project is built
if [ ! -d "apps/workers/dist" ] && [ ! -d "dist/workers" ]; then
    echo "⚠️  Warning: Project not built. Building now..."
    echo "   Running: pnpm build:workers"
    
    if command -v pnpm &> /dev/null; then
        pnpm build:workers
    elif command -v npm &> /dev/null; then
        npm run build:workers
    else
        echo "❌ Error: Neither pnpm nor npm found"
        exit 1
    fi
    
    echo "✅ Build completed"
fi

# Check for DATABASE_URL environment variable
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL environment variable not set"
    echo ""
    echo "📋 Environment Setup Options:"
    echo ""
    echo "Option 1: Use local PostgreSQL"
    echo "   export DATABASE_URL='postgresql://username:password@localhost:5432/dealbrief'"
    echo ""
    echo "Option 2: Use Supabase (recommended for testing)"
    echo "   export DATABASE_URL='postgresql://postgres:[password]@[project].supabase.co:5432/postgres'"
    echo ""
    echo "Option 3: Create a .env file in the project root:"
    echo "   echo 'DATABASE_URL=postgresql://...' > .env"
    echo "   source .env"
    echo ""
    
    # Try to load from .env file if it exists
    if [ -f ".env" ]; then
        echo "🔍 Found .env file, attempting to load..."
        export $(grep -v '^#' .env | xargs)
        
        if [ -n "$DATABASE_URL" ]; then
            echo "✅ DATABASE_URL loaded from .env file"
        else
            echo "❌ DATABASE_URL not found in .env file"
            exit 1
        fi
    else
        echo "❌ Please set DATABASE_URL environment variable and try again"
        exit 1
    fi
else
    echo "✅ DATABASE_URL is set"
    # Mask the password in the URL for security
    MASKED_URL=$(echo "$DATABASE_URL" | sed 's/:\/\/[^:]*:[^@]*@/:\/\/***:***@/')
    echo "   Connection: $MASKED_URL"
fi

echo ""
echo "🔧 Pre-flight checks complete. Starting LeakCheck data structure test..."
echo ""

# Initialize database tables if needed
echo "1️⃣  Initializing database tables..."
if node scripts/init-db.js; then
    echo "✅ Database initialization successful"
else
    echo "❌ Database initialization failed"
    echo "   This might be normal if tables already exist"
    echo "   Continuing with test..."
fi

echo ""
echo "2️⃣  Running LeakCheck data structure test..."
echo ""

# Run the actual test
if node scripts/test-leakcheck-data.js; then
    echo ""
    echo "🎉 LeakCheck data structure test completed successfully!"
    echo ""
    echo "📊 What this test validated:"
    echo "   ✅ Database connectivity and schema"
    echo "   ✅ Artifact storage and retrieval patterns"
    echo "   ✅ JSON metadata structure for breach data"
    echo "   ✅ Query patterns for LeakCheck data analysis"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Review the test output above for data structure insights"
    echo "   2. Use the validated patterns in your LeakCheck module implementation"
    echo "   3. Test with real LeakCheck API responses using the same structure"
    echo ""
    echo "💡 Pro tip: Save the test artifact ID for future reference when testing queries"
    
else
    echo ""
    echo "❌ LeakCheck data structure test failed"
    echo ""
    echo "🔧 Troubleshooting guide:"
    echo ""
    echo "Common issues and solutions:"
    echo ""
    echo "1. Connection refused (ECONNREFUSED):"
    echo "   - Check if your database server is running"
    echo "   - Verify DATABASE_URL hostname and port"
    echo "   - Test connection: psql \$DATABASE_URL"
    echo ""
    echo "2. Authentication failed:"
    echo "   - Verify username and password in DATABASE_URL" 
    echo "   - Check if database user has required permissions"
    echo ""
    echo "3. Table not found (42P01):"
    echo "   - Run: node scripts/init-db.js"
    echo "   - Check if database name exists"
    echo ""
    echo "4. Permission denied:"
    echo "   - Ensure database user has CREATE, INSERT, SELECT permissions"
    echo "   - For Supabase: use the service role key, not anon key"
    echo ""
    echo "📞 Need help? Check the project documentation or create an issue."
    
    exit 1
fi

echo ""
echo "🏁 Test runner completed"