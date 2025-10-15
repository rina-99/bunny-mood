import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export interface Profile {
  id: string;
  email: string;
  username: string;
  created_at: string;
  avatar_url?: string;
}

export interface MoodEntryDB {
  id: string;
  user_id: string;
  mood: string;
  date: string;
  timestamp: number;
  note?: string;
  created_at: string;
}

