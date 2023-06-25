import { FC } from "react";
import { isOddNumber } from "@/utilities/is-odd-number";
import { isEvenNumber } from "@/utilities/is-even-number";
import { onPressEnter } from "@/utilities/on-press-enter";
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
                onKeyDown={(e) => onPressEnter(e, () => onClickName?.(2 * key))}
                role="button"
                tabIndex={0}
              >
                {name.split("").map((char, charIndex) => (
                  <div key={`${name}-${char}-${charIndex}`}>{char}</div>
                ))}
              </div>
            ) : (
              <div
                key={`${name}-${key}`}
                className={style["names__empty-name"]}
                onClick={() => onClickName?.(2 * key)}
                onKeyDown={(e) => onPressEnter(e, () => onClickName?.(2 * key))}
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
                onKeyDown={(e) =>
                  onPressEnter(e, () => onClickName?.(2 * key + 1))
                }
                role="button"
                tabIndex={0}
              >
                {name.split("").map((char, charIndex) => (
                  <div key={`${name}-${char}-${charIndex}`}>{char}</div>
                ))}
              </div>
            ) : (
              <div
                key={`${name}-${key}`}
                className={style["names__empty-name"]}
                onClick={() => onClickName?.(2 * key + 1)}
                onKeyDown={(e) =>
                  onPressEnter(e, () => onClickName?.(2 * key + 1))
                }
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
      onKeyDown={(e) => onPressEnter(e, onClickCompany)}
      role="button"
      tabIndex={0}
    >
      {company}
    </div>
    <div
      className={style.department}
      onClick={() => onClickDepartment?.()}
      onKeyDown={(e) => onPressEnter(e, onClickCompany)}
      role="button"
      tabIndex={0}
    >
      {department}
    </div>
  </div>
);
