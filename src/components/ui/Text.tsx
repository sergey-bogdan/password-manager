import React from 'react';
import clsx from 'clsx';

import styles from './Text.module.scss';

type Props = {
  size?: 'x-large' | 'large' | 'medium' | 'small' | 'button' | 'regular',
  children?: React.ReactNode,
}

export default function Text({
  size = 'regular',
  children,
}: Props) {
  return (
    <span className={clsx(
      styles.Text,
      size === 'x-large' && styles['x-large'],
      size === 'large' && styles.large,
      size === 'medium' && styles.medium,
      (size === 'small' || size === 'button') && styles.small,
    )}>{children}</span>
  )
}