import React, { forwardRef, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import NextLink from 'next/link';

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      danger: 'btn-danger',
      success: 'btn-success',
      warning: 'btn-warning',
      info: 'btn-info',
    },
  },
  defaultVariants: {},
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  href?: string;
}

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => {
  const { className, variant, leftIcon, children, href, ...rest } = props;

  const anchorRef = useRef(null);

  if (href) {
    return (
      <NextLink href={href} passHref>
        <a
          className={clsx(buttonVariants({ variant, className }))}
          ref={anchorRef}
          {...rest}
        >
          {leftIcon ? (
            <div className="d-flex gap-1">
              {leftIcon}
              {children}
            </div>
          ) : (
            <>{children}</>
          )}
        </a>
      </NextLink>
    );
  }

  return (
    <button
      className={clsx(buttonVariants({ variant, className }))}
      ref={ref}
      {...rest}
    >
      {leftIcon ? (
        <div className="d-flex gap-1">
          {leftIcon}
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
