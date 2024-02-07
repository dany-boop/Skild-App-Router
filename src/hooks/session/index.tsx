'use client';
import { Props } from '@/lib/global.types';
import { Session } from '@supabase/supabase-js';
import { FC, createContext, useContext } from 'react';
import useSWR from 'swr';

// export const RolesContext = createContext<'admin' | 'owner' | 'dev' | 'contractor' | 'tradesperson' | null>(null);
export const SessionContext = createContext<Session | null>(null);

export const useSession = () => useContext(SessionContext);
const origin =
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';

const RolesProvider: FC<Props> = ({ children }) => {
  const { data } = useSWR(`/api/v1/auth/roles`, (url) =>
    fetch(url)
      .then((res) => res.json())
      // .then((res) => {
      // 	console.log(res);
      // 	return res;
      // })
      .then((res) => res.session ?? null)
  );
  return (
    <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
  );
};

export default RolesProvider;
