import { ButtonHTMLAttributes } from "react";
import styles from './button.module.scss';
import { Spinner } from "../spiner/spiner";

type Color = 'black' | 'outlineBlack' | 'blue' | 'red';

type Props = {
  children: string,
  color: Color,
  loading?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { children, color, loading } = props;
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[color]}`}
      {...props}
      disabled={loading}
    >
      <div>{children}</div>
      {loading && <Spinner />}
    </button>
  )
};