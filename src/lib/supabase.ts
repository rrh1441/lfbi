import { createClient } from '@supabase/supabase-js'
import { Database } from './types/database'

// Use server-side variables first, fallback to client-side for browser usage
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

console.log('Supabase client initialized with URL:', supabaseUrl ? 'SET' : 'NOT SET')
console.log('Available env vars:', {
  SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET' : 'NOT SET', 
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
})

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)