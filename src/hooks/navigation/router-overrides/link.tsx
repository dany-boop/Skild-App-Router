import { cx } from 'class-variance-authority';
import NextLink from 'next/link';
import { forwardRef, useContext } from 'react';

import { onStart } from '../events';
import { shouldTriggerStartEvent } from './should-trigger-start-event';

export const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(function Link({ href, onClick, className, ...rest }, ref) {
	const useLink = href && href.startsWith('/');
	if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

	return (
		<NextLink
			href={href}
			className={className}
			onClick={(event) => {
				if (shouldTriggerStartEvent(href, event)) {
					onStart();
				}
				if (onClick) onClick(event);
			}}
			{...rest}
			ref={ref}
		/>
	);
});
