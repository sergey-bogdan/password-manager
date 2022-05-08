import React, { useState } from "react"
import clsx from "clsx";

import styles from './Input.module.scss';

export interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'> {
  // onChange?: (value: string) => void,
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  id,
  label,
  className,
  value,
  key,
  error,
  style,
  ...props
}: InputProps, ref) => {

  const [focused, setFocused] = useState(false);

  const onFocusHandle = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  }

  const onBlurHandle = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  }

  return (
    <div key={key} className={clsx(
      className,
      styles.InputContainer,
      value && styles.touched,
      focused && styles.Focused,
      error && styles.error,
    )}
      style={style}
    >
      {label && (
        <label
          htmlFor={id}
          className={styles.Label}
        >{label}</label>
      )}
      <div className={styles.InputControl}>
        <input
          {...props}
          ref={ref}
          onFocus={onFocusHandle}
          onBlur={onBlurHandle}
          className={styles.Input}
          id={id}
          value={value}
        />
      </div>
      {error && (
        <div className={styles.ErrorMessage}>{error}</div>
      )}
    </div>
  )
})

export default Input;
