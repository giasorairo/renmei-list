import { FC } from 'react';
import style from './renmei-list.module.scss';
import { isOddNumber } from '@/utilities/is-odd-number';
import { isEvenNumber } from '@/utilities/is-even-number';

type Props = {
  names: string[],
  company: string,
  department: string,
  onClickName?: (index: number) => void,
  onClickCompany?: () => void,
  onClickDepartment?: () => void,
};

export const RenmeiList: FC<Props> = ({
  names,
  company,
  department,
  onClickName,
  onClickCompany,
  onClickDepartment,
}) => {
  return (
    <div className={style.RenmaiList}>
      <div className={style.names}>
        <div className={style.names__row}>
          {names
            .filter((_, i) => isEvenNumber(i))
            .map((name, key) => (
              name
                ? (
                    <div
                      key={`name-${2 * key}`}
                      className={style.names__name}
                      onClick={() => onClickName?.(2 * key)}
                    >
                      {name
                        .split('')
                        .map((char, i) => (
                          <div
                            key={`name-${2 * key}-${i}`}
                          >
                            {char}
                          </div>
                        ))
                      }
                    </div>
                  )
                : (
                    <div
                      key={`name-${2 * key}`}
                      className={style['names__empty-name']}
                      onClick={() => onClickName?.(2 * key)}
                      data-is-edit={Boolean(onClickName)}
                    >
                      &nbsp;
                    </div>
                  )
          ))}
        </div>
        <div className={style.names__row}>
          {names
            .filter((_, i) => isOddNumber(i))
            .map((name, key) => (
              name
              ? (
                  <div
                    key={`name-${(2 * key) + 1}`}
                    className={style.names__name}
                    onClick={() => onClickName?.((2 * key) + 1)}
                  >
                    {name
                      .split('')
                      .map((char, i) => (
                        <div
                          key={`name-${(2 * key) + 1}-${i}`}
                        >
                          {char}
                        </div>
                      ))
                    }
                  </div>
                )
              : (
                  <div
                    key={`name-${(2 * key) + 1}`}
                    className={style['names__empty-name']}
                    onClick={() => onClickName?.((2 * key) + 1)}
                    data-is-edit={Boolean(onClickName)}
                  >
                    &nbsp;
                  </div>
                )
          ))}
        </div>
      </div>
      <div
        className={style.company}
        onClick={() => onClickCompany?.()}
      >
        {company}
      </div>
      <div
        className={style.department}
        onClick={() => onClickDepartment?.()}
      >
        {department}
      </div>
    </div>
  );
};