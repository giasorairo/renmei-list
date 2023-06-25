import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";
import { Spinner } from "../spiner/spiner";

type Color = "black" | "outlineBlack" | "blue" | "outlineBlue" | "red";

type Props = {
  children: string;
  color: Color;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { children, color, loading, ...restProps } = props;
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[color]}`}
      {...restProps}
      disabled={loading}
    >
      <div>{children}</div>
      {loading && <Spinner />}
    </button>
  );
};
