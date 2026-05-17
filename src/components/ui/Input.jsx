import { forwardRef } from 'react';
import cn from '@/utils/classNames';

const Input = forwardRef(function Input(
  { label, error, hint, className, leftIcon: Left, rightIcon: Right, id, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-charcoal-600">
          {label}
        </label>
      )}
      <div className="relative">
        {Left && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-charcoal-400">
            <Left className="h-4 w-4" />
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'input-base',
            Left && 'pl-11',
            Right && 'pr-11',
            error && 'border-rose-300 focus:border-rose-400 focus:ring-rose-100',
            className,
          )}
          {...rest}
        />
        {Right && (
          <span className="absolute inset-y-0 right-4 flex items-center text-charcoal-400">
            <Right className="h-4 w-4" />
          </span>
        )}
      </div>
      {error ? (
        <p className="text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-charcoal-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
