import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
const clientUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(clientUrl, anonKey);
