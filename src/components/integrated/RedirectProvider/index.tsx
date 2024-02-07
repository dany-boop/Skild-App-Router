'use client';

import { useRouter } from '@/hooks/navigation';
import { useEffect } from 'react';

export default function Main({ href }: { href: string }) {
	const router = useRouter();
	useEffect(() => router.push(href), [href, router]);
	return null;
}
