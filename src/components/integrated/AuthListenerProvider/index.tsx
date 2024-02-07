'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from '@/hooks/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { onComplete, onStart } from '@/hooks/navigation/events';
import { Props } from '@/lib/global.types';

const AuthListenerProvider: FC<Props> = ({ children }) => {
	const supabase = createClientComponentClient();
	const pathname = usePathname();
	const router = useRouter();
	//   const [mounted, setMounted] = useState(false);
	let mounted = useRef(false);

	useEffect(() => {
		try {
			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange(async (event, session) => {
				if (event === 'INITIAL_SESSION') {
					if (session) {
						// if (session.user.user_metadata.roles === 'owner') router.push('/admin/dashboard');
						// if (session.user.user_metadata.roles === 'dev') router.push('/admin/dashboard');
						// if (session.user.user_metadata.roles === 'admin') router.push('/admin/dashboard');
						// if (session.user.user_metadata.roles === 'contractor') router.push('/business/dashboard');
						// if (session.user.user_metadata.roles === 'tradesperson') router.push('/trades/dashboard');
						if (pathname.endsWith('/login') || pathname.endsWith('/register') || pathname === '/') router.push('/dashboard');
					} else {
						if (!pathname.includes('/login') && !pathname.includes('/register')) router.push('/login');
					}
				}
				if (event === 'SIGNED_IN' && pathname.endsWith('/login')) {
					// if (session?.user.user_metadata.roles === 'owner') router.push('/admin/dashboard');
					// if (session?.user.user_metadata.roles === 'dev') router.push('/admin/dashboard');
					// if (session?.user.user_metadata.roles === 'admin') router.push('/admin/dashboard');
					// if (session?.user.user_metadata.roles === 'contractor') router.push('/business/dashboard');
					// if (session?.user.user_metadata.roles === 'tradesperson') router.push('/trades/dashboard');
					router.push('/dashboard');
				}

				if (event === 'SIGNED_OUT' && !pathname.endsWith('/login')) {
					router.push('/login');
				}
				if (event === 'PASSWORD_RECOVERY') {
					setTimeout(() => router.push('/login'), 5000);
				}
			});
			mounted.current = true;
			return () => {
				subscription?.unsubscribe();
			};
		} finally {
		}
	}, [supabase, router, pathname]);

	return <>{mounted && children}</>;
};

export default AuthListenerProvider;
