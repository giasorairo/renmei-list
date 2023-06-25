import { FC } from "react";
import { isOddNumber } from "@/utilities/is-odd-number";
import { isEvenNumber } from "@/utilities/is-even-number";
import style from "./renmei-list.module.scss";

type Props = {
  names: string[];
  company: string;
  department: string;
  onClickName?: (index: number) => void;
  onClickCompany?: () => void;
  onClickDepartment?: () => void;
  fontFamily: string;
};

export const RenmeiList: FC<Props> = ({
  names,
  company,
  department,
  onClickName,
  onClickCompany,
  onClickDepartment,
  fontFamily,
}) => (
  <div className={style.RenmaiList} style={{ fontFamily }}>
    <div className={style.names}>
      <div className={style.names__row}>
        {names
          .filter((_, i) => isEvenNumber(i))
          .map((name, key) =>
            name ? (
              <div
                key={name}
                className={style.names__name}
                onClick={() => onClickName?.(2 * key)}
                onKeyDown={() => onClickName?.(2 * key)}
                role="button"
                tabIndex={0}
              >
                {name.split("").map((char) => (
                  <div key={`${name}-${char}`}>{char}</div>
                ))}
              </div>
            ) : (
              <div
                key={name}
                className={style["names__empty-name"]}
                onClick={() => onClickName?.(2 * key)}
                onKeyDown={() => onClickName?.(2 * key)}
                data-is-edit={Boolean(onClickName)}
                role="button"
                tabIndex={0}
              >
                &nbsp;
              </div>
            )
          )}
      </div>
      <div className={style.names__row}>
        {names
          .filter((_, i) => isOddNumber(i))
          .map((name, key) =>
            name ? (
              <div
                key={name}
                className={style.names__name}
                onClick={() => onClickName?.(2 * key + 1)}
                onKeyDown={() => onClickName?.(2 * key + 1)}
                role="button"
                tabIndex={0}
              >
                {name.split("").map((char) => (
                  <div key={`${name}-${char}`}>{char}</div>
                ))}
              </div>
            ) : (
              <div
                key={name}
                className={style["names__empty-name"]}
                onClick={() => onClickName?.(2 * key + 1)}
                onKeyDown={() => onClickName?.(2 * key + 1)}
                role="button"
                tabIndex={0}
                data-is-edit={Boolean(onClickName)}
              >
                &nbsp;
              </div>
            )
          )}
      </div>
    </div>
    <div
      className={style.company}
      onClick={() => onClickCompany?.()}
      onKeyDown={() => onClickCompany?.()}
      role="button"
      tabIndex={0}
    >
      {company}
    </div>
    <div
      className={style.department}
      onClick={() => onClickDepartment?.()}
      onKeyDown={() => onClickCompany?.()}
      role="button"
      tabIndex={0}
    >
      {department}
    </div>
  </div>
);
