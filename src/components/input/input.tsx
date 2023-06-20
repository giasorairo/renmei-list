import { InputHTMLAttributes, forwardRef } from "react";
import style from './input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef((props: Props) => {
  return <input className={style.input} { ...props } />
});

Input.displayName = 'Input';