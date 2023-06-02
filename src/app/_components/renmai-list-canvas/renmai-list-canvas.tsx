'use client'

import { RefObject, useEffect } from 'react';
import { FONT_FAMILY } from './const';
import { RenmeiListClass } from './classes/renmei-list-class';
import { useFont } from './hooks/use-font';

type Props = {
  names: string[],
  canvasRef: RefObject<HTMLCanvasElement>,
  baseNameHeight: number,
  stagePadding: { x: number, y: number },
  lastNamePositionX: number,
  getCharacterSpace: (name: string) => number,
  getNamePosition: (
    currentColumn: number,
    isEvenNumber: boolean,
    paddingX: number,
    paddingY: number,
  ) => { x: number; y: number; },
  canvasSize: { width: number, height: number },
  onClickName: (index: number) => void,
  onAddNames: () => void,
  onDeleteNames: () => void,
};

export const RenmeiListCanvas = (props: Props) => {

  const {
    names,
    canvasRef,
    canvasSize,
    baseNameHeight,
    stagePadding,
    lastNamePositionX,
    getCharacterSpace,
    getNamePosition,
    onClickName,
    onAddNames,
    onDeleteNames,
  } = props;

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
      canvasSize,
      getNamePosition,
      baseNameHeight,
      getCharacterSpace,
      onClickName,
      lastNamePositionX,
      onAddNames,
      onDeleteNames,
      stagePadding,
    );
  }, [baseNameHeight, canvasRef, getCharacterSpace, getNamePosition, names, onClickName, stagePadding.x, stagePadding.y, lastNamePositionX, onAddNames, onDeleteNames, loadedFont, canvasSize, stagePadding]);

  return (
    <canvas
      id="renmei-list-canvas"
      ref={canvasRef}      
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
};
