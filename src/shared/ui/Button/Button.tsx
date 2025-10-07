import React, { ComponentProps } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
} & ComponentProps<'button'>

export default function Button({variant = 'primary', size = 'default', loading = false, disabled, children, className, ...props}: Props) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        loading && styles.loading,
        disabled && styles.disabled,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
}