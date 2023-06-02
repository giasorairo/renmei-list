import { ButtonHTMLAttributes, useCallback } from "react";
import styles from './button.module.scss';

type Color = 'black' | 'outlineBlack' | 'blue' | 'red';

type Props = {
  children: string,
  color: Color,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { children, color } = props;
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[color]}`}
      {...props}
    >
      {children}
    </button>
  )
};