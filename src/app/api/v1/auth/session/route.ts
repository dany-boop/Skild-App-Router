import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return NextResponse.json(
    { roles: session?.user?.user_metadata?.roles ?? null },
    { status: session ? 200 : 400 }
  );
}
// session.user.user_metadata.roles
