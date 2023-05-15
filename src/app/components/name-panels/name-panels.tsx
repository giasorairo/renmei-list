import { NamePlate } from '@/app/components/name-plate/name-plate';
import { isEvenNumber } from '@/utilities/is-even-number';
import { useCallback, useState } from 'react';
import { COMPANY_PLATE_SIZE, NAME_PLATE_FONT_SIZE, NAME_PLATE_SIZE } from '../const/const';

const PADDING = 30;
const HEIGHT = (NAME_PLATE_SIZE.height * 2) + PADDING * 3;
/** NAME_PLATE 同士の横の間隔 */
const SPACE = 30;
// 余白 = NamePanels の高さ - NamePanel の高さ
// PADDING = 余白 / 3
// 3 は 上、中、下、ひとつあたりの高さの空白を求めるため
const calcWidth = (columNum: number) => {
  // console.log({
  //   base: columNum * NAME_PLATE_SIZE.width,
  //   space: (columNum - 1) * SPACE,
  //   padding: PADDING * 2,
  // });
  return columNum * NAME_PLATE_SIZE.width + (columNum - 1) * SPACE + (PADDING * 2) + COMPANY_PLATE_SIZE.width;
};

type Props = {
  names: string[],
  onChangeNames: (string: string, index: number) => void;
  numberOfLine: number,
};

const calcNamePlatePositionX = (
  numberOfLine: number,
  index: number,
) => {
  const currentNumberOfLine = numberOfLine - Math.floor(index / 2);
  const basePositionX = (currentNumberOfLine - 1) * NAME_PLATE_SIZE.width;
  const posX = basePositionX + (currentNumberOfLine - 1) * SPACE + COMPANY_PLATE_SIZE.width;
  return posX;
};

export const NamePanels = (props: Props) => {

  const { names, onChangeNames, numberOfLine } = props;

  return (
    <>
      {/* 枠線 */}
      <rect
        stroke="#000"
        width={calcWidth(numberOfLine)}
        height={HEIGHT}
        fill="#fff"
      />
      <g
        transform={`translate(${PADDING}, ${PADDING})`}
      >
        {names.map((_name, i) => (
          <NamePlate
            onChangeName={onChangeNames}
            index={i}
            key={`namePlate-${i}`}
            position={{
              x: calcNamePlatePositionX(numberOfLine, i),
              y: isEvenNumber(i) ? 0 : PADDING + NAME_PLATE_SIZE.height,
            }}
            name={_name}
          />
        ))}
      </g>
    </>
  );
};