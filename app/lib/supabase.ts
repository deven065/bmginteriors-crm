'use client';

import { type SupabaseClient } from '@supabase/supabase-js';
import { createClient as createBrowserSupabaseClient } from '@/utils/supabase/client';
import type { Database } from './supabaseTypes';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let browserClient: SupabaseClient<Database> | null = null;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserSupabaseClient();
  }

  return browserClient;
}

export class SupabaseConfigError extends Error {
  constructor() {
    super('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.');
    this.name = 'SupabaseConfigError';
  }
}

export function requireSupabaseBrowserClient() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new SupabaseConfigError();
  }

  return supabase;
}
