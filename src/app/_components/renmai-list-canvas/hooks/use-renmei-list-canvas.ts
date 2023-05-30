import { useCallback, useMemo, useRef } from "react";
import { CANVAS_SIZE, FONT_FAMILY, FONT_SIZE, ROW_SPACE } from "../const";

type Props = {
  names: string[],
  onAddNames: () => void,
  onDeleteNames: () => void,
}

export const useRenmeiListCanvas = (props: Props) => {
  const { names, onAddNames, onDeleteNames } = props;
  const renmeiListCanvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * 最長の name の length を取得する
   * @param names 
   * @returns 
   */
  const nameMaxLength = useMemo(() => {
    console.log('names', names);
    return Math.max(...names.map((name) => name.length));
  }, [names]);

  const stagePadding = useMemo(() => {
    const paddingX = 40;
    const paddingY = 0;

    return {
      x: paddingX,
      y: paddingY,
    }
  }, []);

  /**
   * 基準となる name の高さを取得する
   * いちばん長い name の高さを基準にしている
   * 文字間隔を考えてちょっと高さに 10px 余裕を持たせている
   * @param names 
   * @returns 
   */
  const baseNameHeight = useMemo(() => {
    const buffer = (() => {
      switch (nameMaxLength) {
        case 4: {
          return 20;
        }
        case 5: {
          return 5;
        }
        case 6: {
          return 0;
        }
        default: {
          return 10;
        }
      }
    })();
    return nameMaxLength * FONT_SIZE + buffer;
  }, [nameMaxLength]);

  /**
   * baseNameHeight から自身の space を計算して取得する
   */
  const getCharacterSpace = useCallback((name: string) => {
    return (baseNameHeight - (name.length * FONT_SIZE)) / (name.length - 1);
  }, [baseNameHeight]);

  /** nameContainer の座標を取得する */
  const getNamePosition = useCallback((
    currentColumn: number,
    isFirstRow: boolean,
    paddingX: number,
    paddingY: number,
  ) => {
    // canvas の width - ((text の横幅 * 表示行) + (space * space の数))
    const x = CANVAS_SIZE.width - ((FONT_SIZE) * currentColumn + (ROW_SPACE * (currentColumn - 1))) + FONT_SIZE / 2 - paddingX;
    const y = isFirstRow ? (CANVAS_SIZE.height / 4) + paddingY : (CANVAS_SIZE.height / 4) * 3 - paddingY;
    return { x, y }
  }, []);

  /** 最後に表示されている name の行番号 */
  const lastNameColumnNumber = useMemo(() => {
    return Math.floor(names.length / 2) + 1;
  }, [names]);

  const lastNamePositionX = useMemo(() => {
    const x = getNamePosition(lastNameColumnNumber, false, stagePadding.x, stagePadding.y).x;
    return x;
  }, [getNamePosition, lastNameColumnNumber, stagePadding.x, stagePadding.y]);

  return {
    renmeiListCanvasRef,
    nameMaxLength,
    baseNameHeight,
    stagePadding,
    lastNamePositionX,
    getCharacterSpace,
    getNamePosition,
  }
};