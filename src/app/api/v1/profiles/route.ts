import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { ProfilesMaster } from '@/lib/global.types';

export const dynamic = 'force-dynamic';

const table = 'profiles';
const select = '* , roles(*), contractortypes(*)';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	const supabase = createRouteHandlerClient<Database>({ cookies });

	let query = supabase.from(table).select(select).eq('deleted', false);
	if (id) query.eq('id', id);

	const { data, error } = await query.returns<ProfilesMaster[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request: Request) {
	const insert = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });
	// let query = supabase.auth.admin.updateUserById()
	let query = supabase.from(table).insert(insert).select(select);

	const { data, error } = await query.returns<ProfilesMaster[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(request: Request) {
	const { searchParams } = new URL(request.url);
	const updateEmail = searchParams.get('update-email') === '1' ? true : false;
	const roles = searchParams.get('roles');

	const { id, ...update } = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });
	let adminQuery = supabase.auth;
	let query = supabase.from(table).update({ address: update.address, description: update.description }).eq('id', id).select(select);

	if (updateEmail) {
		// EMAIL CONFIRMATION IS NOT SET YET DUE TO EMAIL RATE LIMIT
		const { data: user, error } = await adminQuery.updateUser({ email: update.email, data: { fullname: update.name, phone: update.phone } });
		if (error && error.status === 429) return NextResponse.json({ error: error }, { status: 429 })
		if (error) return NextResponse.json({ error: error }, { status: 500 });
		if (user) {
			const { data, error } = await query.returns<ProfilesMaster[]>();

			if (error) return NextResponse.json({ error: error }, { status: 500 });
			return NextResponse.json({ data }, { status: 200 });
		}
	} else {
		const { data: user, error } = await adminQuery.updateUser({ data: { fullname: update.name, phone: update.phone } });
		if (error && error.status === 429) return NextResponse.json({ error: error }, { status: 429 })
		if (error) return NextResponse.json({ error: error }, { status: 500 });
		if (user) {
			const { data, error } = await query.returns<ProfilesMaster[]>();
			if (error) return NextResponse.json({ error: error }, { status: 500 });
			return NextResponse.json({ data }, { status: 200 });
		}
	}
}

export async function DELETE(request: Request) {
	const { id } = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });

	let query = supabase.from(table).update({ deleted: true }).eq('id', id).select(select);

	const { data, error } = await query.returns<ProfilesMaster[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}
