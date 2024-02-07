import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({ subsets: ['latin'] });

export const brown = localFont({
	src: [
		{ path: '../../../public/fonts/brown/BrownStd-BoldAlt.woff', weight: '700', style: 'normal' },
		{ path: '../../../public/fonts/brown/BrownStd-RegularAlt.woff', weight: '400', style: 'normal' },
	],
});
