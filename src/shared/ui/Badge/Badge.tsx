import React from 'react';
import cn from 'classnames';
import styles from './Badge.module.scss';

type Props = {
  variant?: 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
};

export default function Badge({
  variant = 'success',
  children,
  className,
}: Props) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
