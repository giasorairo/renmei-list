import { FC } from 'react';
import style from './renmei-pdf.module.scss';

type Props = {
  names: string[],
  company: string,
  department: string,
};

export const RenmeiPdf: FC<Props> = ({
  names,
  company,
  department
}) => {
  return (
    <div className={style.pdfContainer}>
      <div className={style.names}>
        <div className={style.names__row}>
          {names.filter((_, i) => i % 2 === 0).map((name, key) => (
            name
              ? (
                  <div
                    key={key}
                    className={style.names__name}
                  >
                    {name.split('').map((char, i) => <div key={i}>{char}</div>)}
                  </div>
                )
              : <div key={key}>&nbsp;</div>
          ))}
        </div>
        <div className={style.names__row}>
          {names.filter((_, i) => i % 2 === 1).map((name, key) => (
            name
            ? (
                <div
                  key={key}
                  className={style.names__name}
                >
                  {name.split('').map((char, i) => <div key={i}>{char}</div>)}
                </div>
              )
            : <div key={key}>&nbsp;</div>
          ))}
        </div>
      </div>
      <div className={style.company}>{company}</div>
      <div className={style.department}>{department}</div>
    </div>
  );
};