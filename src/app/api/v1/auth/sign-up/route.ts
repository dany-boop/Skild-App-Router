import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/lib/database.types';

type Register = { email: string; password: string; phone: string; roles: string; username: string; fullname: string };

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	const requestUrl = new URL(request.url);
	const { email, password, phone, roles, username, fullname }: Register = await request.json();

	// const formData = await request.formData();
	// const email = String(formData.get('email'));
	// const password = String(formData.get('password'));
	const supabase = createRouteHandlerClient<Database>({ cookies });

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${requestUrl.origin}/api/v1/auth/callback`,
			data: { username: username, fullname: fullname, phone: phone, roles: roles },
		},
	});

	if (error) return NextResponse.json({ error: 'Cannot sign up: ' + error }, { status: 400 });

	return NextResponse.json({ data }, { status: 200 });
}
