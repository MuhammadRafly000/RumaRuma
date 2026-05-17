import { forwardRef } from 'react';
import cn from '@/utils/classNames';

const sizes = {
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm',
  xl: 'px-8 py-4 text-base',
};

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  dark: 'btn bg-charcoal-900 text-white hover:bg-charcoal-800',
  outline: 'btn bg-transparent text-charcoal-800 border border-charcoal-200 hover:border-charcoal-900',
};

const Button = forwardRef(function Button(
  {
    as: Comp = 'button',
    variant = 'primary',
    size = 'md',
    className,
    fullWidth = false,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Comp
      ref={ref}
      className={cn(
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default Button;
