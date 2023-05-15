import { useCallback, useEffect, useState } from 'react';
import { NAME_PLATE_FONT_SIZE, NAME_PLATE_SIZE } from '../const/const';

type Props = {
  name: string,
  index: number,
  onChangeName: (string: string, index: number) => void,
  position: {
    x: number,
    y: number,
  }
};

const isCancel = (input: string | null): input is null => {
  return input === null;
};

export const NamePlate = (props: Props) => {
  const { name, index, position, onChangeName } = props;

  const handlerClickNamePlate = useCallback(() => {
    const inputName = window.prompt('名前を入力してください', name);
    if (isCancel(inputName)) {
      return;
    }
    onChangeName(inputName || '', index);
  }, [index, name, onChangeName]);

  return (
    <g
      style={{
        cursor: 'pointer',
      }}
      transform={`translate(${position.x}, ${position.y})`}
      onClick={handlerClickNamePlate}
    >
      {name ? (
        <text
        textAnchor='start'
        fontFamily="'Yuji Syuku', serif"
        fontWeight="600"
        fontSize={NAME_PLATE_FONT_SIZE}
        writingMode="tb"
        fill="#000"
        textLength={NAME_PLATE_SIZE.height}
        x={NAME_PLATE_FONT_SIZE / 2}
      >
        {name}
      </text>
      ) : (
        <rect
          width={NAME_PLATE_SIZE.width}
          height={NAME_PLATE_SIZE.height}
          stroke='#000'
          fill="#fff"
        />
      )}
    </g>
  );
};