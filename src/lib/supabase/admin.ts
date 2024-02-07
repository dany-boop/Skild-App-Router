import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
const clientUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE;

const supabase = createClient<Database>(clientUrl, serviceRole, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
	},
});

export const supabaseAdmin = supabase.auth.admin;
