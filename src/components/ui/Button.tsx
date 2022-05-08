import React from 'react';
import Spinner from './Spinner';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean,
  color?: 'primary' | 'secondary',
  size?: 'regular' | 'small',
}

export default function Button({
  children,
  className,
  color = 'primary',
  disabled,
  isLoading,
  size = 'regular',
  ...props
}: Props) {

  const classNames = clsx([
    className,
    styles.Button,
    color === 'primary' && styles.primary,
    color === 'secondary' && styles.secondary,
    disabled && styles.disabled,
    isLoading && styles.loading,
    size === 'small' && styles.small,
  ]);

  return (
    <button
      {...props}
      className={classNames}
      disabled={isLoading}
    >
      {children}
      {isLoading && (
        <Spinner />
      )}
    </button>
  )
}