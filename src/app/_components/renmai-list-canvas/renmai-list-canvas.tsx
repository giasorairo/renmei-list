'use client'

import { RefObject, useEffect, useState } from 'react';
import { FONT_FAMILY } from './const';
import { RenmeiListClass } from './classes/renmei-list-class';
import { useFont } from './hooks/use-font';
import { FontFamily } from '@/app/_hooks/use-font-family';

const sleep = (waitTimeMS: number) => new Promise((resolve) => {
  setTimeout(resolve, waitTimeMS);
});

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
  company: string,
  onClickCompany: () => void,
  department: string,
  onClickDepartment: () => void,
  isLoadedFontFamily: boolean,
  fontFamily: FontFamily,
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
    company,
    onClickCompany,
    department,
    onClickDepartment,
    isLoadedFontFamily,
    fontFamily,
  } = props;

  const { loaded: loadedFont } = useFont(FONT_FAMILY);

  const [isFontLoaded, setIsFontLoaded] = useState(false);
  useEffect(() => {
    document.fonts.load('20px MyCustomFont').then(() => {
      setIsFontLoaded(true);
    });
  }, []);

  useEffect(() => {

    if (!canvasRef.current) {
      console.error('canvas is null !!');
      return;
    }

    if (!loadedFont) {
      console.info('font is loading !!');
      return;
    }

    if (!isFontLoaded) {
      return;
    }

    if (!isLoadedFontFamily) {
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
      stagePadding,
      company,
      onClickCompany,
      department,
      onClickDepartment,
      fontFamily,
    );
  }, [baseNameHeight, canvasRef, canvasSize, company, department, fontFamily, getCharacterSpace, getNamePosition, isFontLoaded, isLoadedFontFamily, lastNamePositionX, loadedFont, names, onClickCompany, onClickDepartment, onClickName, stagePadding]);

  return (
    <canvas
      id="renmei-list-canvas"
      ref={canvasRef}      
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
};
