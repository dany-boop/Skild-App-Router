'use client';
import { Link } from '@/hooks/navigation';
import { useRef } from 'react';

export default function NavLink({
  href,
  className,
  children,
}: React.PropsWithChildren<{ href: string; className?: string }>) {
  const ref = useRef(href);
  return (
    <>
      <Link href={ref.current} className={className}>
        {children}
      </Link>
    </>
  );
}
