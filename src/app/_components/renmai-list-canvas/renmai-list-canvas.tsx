'use client'

import { RefObject, useEffect } from "react";
import { CANVAS_SIZE, FONT_FAMILY } from "./const";
import { useRenmeiListCanvas } from "./hooks/use-renmei-list-canvas";
import { RenmeiListClass } from "./classes/renmei-list-class";
import { getFont } from "@/utilities/get-font";
import { useFont } from "./hooks/use-font";

type Props = {
  names: string[],
  canvasRef: RefObject<HTMLCanvasElement>,
  onClickName: (index: number) => void,
  onAddNames: () => void,
  onDeleteNames: () => void,
};

export const RenmeiListCanvas = (props: Props) => {

  const {
    names,
    canvasRef,
    onClickName,
    onAddNames,
    onDeleteNames,
  } = props;

  const {
    baseNameHeight,
    stagePadding,
    lastNamePositionX,
    getCharacterSpace,
    getNamePosition,
  } = useRenmeiListCanvas({ names, onAddNames, onDeleteNames });
  const { loaded: loadedFont } = useFont(FONT_FAMILY);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error('canvas is null !!');
      return;
    }

    if (!loadedFont) {
      console.info('font is loading !!');
      return;
    }

    const renmeiList = RenmeiListClass.instance;
    renmeiList.init(
      names,
      getNamePosition,
      baseNameHeight,
      getCharacterSpace,
      onClickName,
      lastNamePositionX,
      onAddNames,
      onDeleteNames,
    );
  }, [baseNameHeight, canvasRef, getCharacterSpace, getNamePosition, names, onClickName, stagePadding.x, stagePadding.y, lastNamePositionX, onAddNames, onDeleteNames, loadedFont]);

  return (
    <canvas
      id="renmei-list-canvas"
      ref={canvasRef}
      width={CANVAS_SIZE.width}
      height={CANVAS_SIZE.height}
    />
  );
};
