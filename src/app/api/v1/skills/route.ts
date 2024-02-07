import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { Skills } from '@/lib/global.types';

export const dynamic = 'force-dynamic';

const table = 'skills';
const select = '*';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	const supabase = createRouteHandlerClient<Database>({ cookies });

	let query = supabase.from(table).select(select).eq('deleted', false);
	if (id) query.eq('id', Number(id));

	const { data, error } = await query.returns<Skills[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}
export async function POST(request: Request) {
	const insert = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });
	let query = supabase.from(table).insert(insert).select(select);

	const { data, error } = await query.returns<Skills[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}
export async function PATCH(request: Request) {
	const { id, ...update } = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });

	let query = supabase.from(table).update(update).select(select);

	const { data, error } = await query.returns<Skills[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}
export async function DELETE(request: Request) {
	const { id } = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });
	let query = supabase.from(table).update({ deleted: true }).select(select);

	const { data, error } = await query.returns<Skills[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}
