import React, { ComponentProps } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'default' | 'large';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean
} & ComponentProps<'button'>

export default function Button({variant = 'primary', size = 'default', loading = false, disabled, children, className, isActive =false,...props}: Props) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        loading && styles.loading,
        disabled && styles.disabled,
        isActive && styles.active,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
}