import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/lib/database.types';

type Login = { email: string; password: string };

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	const requestUrl = new URL(request.url);
	const { email, password }: Login = await request.json();
	// const formData = await request.formData();
	// const email = String(formData.get('email'));
	// const password = String(formData.get('password'));
	const supabase = createRouteHandlerClient<Database>({ cookies });

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) return NextResponse.json({ error: 'Cannot log in: ' + error }, { status: 400 });

	return NextResponse.json({ data }, { status: 200 });
}
