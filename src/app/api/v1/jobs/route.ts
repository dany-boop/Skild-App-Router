import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { JobsMaster } from '@/lib/global.types';

export const dynamic = 'force-dynamic';

const table = 'jobs';
const select = '*, jobcategories(*), jobtypes(*), profiles(*)';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');
	
	const trades = searchParams.getAll('trades');

	const supabase = createRouteHandlerClient<Database>({ cookies });

	let query = supabase.from(table).select(select).eq('deleted', false);
	if (id) query.eq('id', Number(id));
	
	if (trades && trades.length > 0)
		query.in(
			'number_of_trades',
			trades.map((item) => Number(item))
		);

	const { data, error } = await query.returns<JobsMaster[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request: Request) {
	const insert = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });

	let query = supabase.from(table).insert(insert).select(select);

	const { data, error } = await query.returns<JobsMaster[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(request: Request) {
	const { id, ...update } = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });

	let query = supabase.from(table).update(update).eq('id', id).select(select);

	const { data, error } = await query.returns<JobsMaster[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(request: Request) {
	const { id } = await request.json();
	const supabase = createRouteHandlerClient<Database>({ cookies });

	let query = supabase.from(table).update({ deleted: true }).eq('id', id).select(select);

	const { data, error } = await query.returns<JobsMaster[]>();
	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json({ data }, { status: 200 });
}
