import { useCallback, useMemo, useRef, useState } from "react";
import { FONT_SIZE, ROW_SPACE } from "../const";

type Props = {
  names: string[],
}

export const useRenmeiListCanvas = (props: Props) => {
  const { names } = props;
  const renmeiListCanvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * 最長の name の length を取得する
   * @param names 
   * @returns 
   */
  const nameMaxLength = useMemo(() => {
    return Math.max(...names.map((name) => name.length));
  }, [names]);

  const stagePadding = useMemo(() => {
    const paddingX = 40;
    const paddingY = (() => {
      switch (nameMaxLength) {
        case 4: {
          return 12;
        }
        case 5: {
          return 10;
        }
        case 6: {
          return 8;
        }
        default: {
          return 10;
        }
      }
    })();

    return {
      x: paddingX,
      y: paddingY,
    }
  }, [nameMaxLength]);

  const canvasSize = useMemo(() => {
    const width =
      (FONT_SIZE * Math.ceil(names.length / 2)) // 行数分のテキストの width
      + (ROW_SPACE * Math.ceil((names.length / 2) - 1)) // 行間のスペースの width
      + (stagePadding.x * 2) // 左右の padding
      + stagePadding.x // 名前と会社名のスペースの width
      + FONT_SIZE // 会社名の width
      + ROW_SPACE // 会社名と部署名のスペースの width
      + FONT_SIZE; // 部署名の width
    const height = 330;
    return { width, height: height * 2 }
  }, [names.length, stagePadding.x]);
  
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
    const x = canvasSize.width - ((FONT_SIZE) * currentColumn + (ROW_SPACE * (currentColumn - 1))) + FONT_SIZE / 2 - paddingX;
    const y = isFirstRow ? (canvasSize.height / 4) + paddingY : (canvasSize.height / 4) * 3 - paddingY;
    return { x, y }
  }, [canvasSize]);

  /** 最後に表示されている name の行番号 */
  const lastNameColumnNumber = useMemo(() => {
    return Math.ceil(names.length / 2);
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
    canvasSize,
    getCharacterSpace,
    getNamePosition,
  }
};