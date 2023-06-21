import { InputHTMLAttributes } from "react";
import style from './input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  return <input className={style.input} { ...props } />
};
