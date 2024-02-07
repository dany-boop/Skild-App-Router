import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";
import { onStart } from "@/hooks/navigation/events";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // console.log(session);
  //   if (session) {
  //     if (url.pathname.includes("/login") || url.pathname.includes("/register"))
  //       return NextResponse.redirect(new URL("/dashboard", req.url));
  //   } else {
  //     if (!url.pathname.includes("/login") && !url.pathname.includes("/register"))
  //       return NextResponse.redirect(new URL("/login", req.url));
  //   }
  return res;
}
