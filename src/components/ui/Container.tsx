import React from "react"
import clsx from 'clsx';

import styles from './Container.module.scss';

type Props = {
  fluid?: boolean,
  children: React.ReactNode
  maxWidth?: number,
}

export default function Container({
  fluid,
  children,
  maxWidth = 600,
}: Props) {

  return (
    <div className={clsx(
      styles.Container,
      fluid && styles.fluid,
    )} style={{
      maxWidth: maxWidth,
    }}>
      {children}
    </div>
  )
}