import { useCallback } from 'react';
import { COMPANY_PLATE_FONT_SIZE, COMPANY_PLATE_SIZE, NAME_PLATE_FONT_SIZE, NAME_PLATE_SIZE } from '../const/const';

type Props = {
  name: string,
  onChangeName: (string: string) => void,
  position: {
    x: number,
    y: number,
  }
};

const isCancel = (input: string | null): input is null => {
  return input === null;
};

export const CompanyPlate = (props: Props) => {
  const { name, onChangeName, position } = props;

  const handleClickCompanyPlate = useCallback(() => {
    const inputCompanyName = window.prompt();
    if (isCancel(inputCompanyName)) {
      return;
    }
    console.log('call');
    onChangeName(inputCompanyName);
  }, [onChangeName]);

  return (
    <g
      style={{
        cursor: 'pointer',
      }}
      transform={`translate(${position.x}, ${position.y})`}
      onClick={handleClickCompanyPlate}

    >
      {name ? (
        <text
        textAnchor='start'
        fontFamily="'Yuji Syuku', serif"
        fontWeight="600"
        fontSize={COMPANY_PLATE_FONT_SIZE}
        writingMode="tb"
        fill="#000"
        textLength={COMPANY_PLATE_FONT_SIZE * (name.length + 1)}
        x={COMPANY_PLATE_FONT_SIZE / 2}
      >
        {name}
      </text>
      ) : (
        <rect
          width={COMPANY_PLATE_SIZE.width}
          height={COMPANY_PLATE_FONT_SIZE * name.length}
          stroke='#000'
          fill="#fff"
        />
      )}
    </g>
  );
};