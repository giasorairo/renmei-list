import { FormEvent, useCallback, useRef } from 'react';

type Props = {
  value: string;
  onChange: (str: string) => void;
  className: string;
}

export const ContentEditable = (props: Props) => {

  const { value, onChange, className } = props;
  const defaultValue = useRef(value);

  const handlerInput = useCallback((e: FormEvent<HTMLDivElement>) => {
    console.log('e.currentTarget.innerHTML', e.currentTarget.innerHTML);
    console.log({ ref: defaultValue.current })
    onChange(e.currentTarget.innerHTML);
  }, [onChange]);

  console.log('defaultValue.current', defaultValue.current);

  return (
    <div
      className={className}
      contentEditable
      onInput={handlerInput}
    />
  )
};