'use client';

import { Props } from '@/lib/global.types';
import { FC } from 'react';
import { SWRConfig } from 'swr';

const SWRConfigProvider: FC<Props> = ({ children }) => {
	return <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()) }}>{children}</SWRConfig>;
};

export default SWRConfigProvider;
