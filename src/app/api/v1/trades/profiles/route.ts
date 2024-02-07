import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import { ProfilesMaster } from '@/lib/global.types';

export const dynamic = 'force-dynamic';

const table = 'profiles';
const select = '*, roles(*), contractortypes(*)';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // const profiles = searchParams.getAll('profiles');

  const supabase = createRouteHandlerClient<Database>({ cookies });

  let query = supabase.from(table).select(select).eq('deleted', false);
  if (id) query.eq('id', id);
  // if (profiles && profiles.length > 0)
  //   query.in(
  //     'number_of_profiles',
  //     profiles.map((item) => Number(item))
  //   );

  const { data, error } = await query.returns<ProfilesMaster[]>();
  if (error) return NextResponse.json({ error: error }, { status: 500 });
  return NextResponse.json({data}, { status: 200 });
}
