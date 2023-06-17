import { isEvenNumber } from '@/utilities/is-even-number';
import { FONT_SIZE, ROW_SPACE } from '../const';
import { FontFamily } from '@/app/_hooks/use-font-family';

type CanvasSize = {
  width: number,
  height: number,
};

export class RenmeiListClass {

  public stage = new createjs.Stage('renmei-list-canvas');
  
  public addNamesButtonContainer = new createjs.Container();

  public deleteNamesButtonContainer = new createjs.Container();
  
  public static _instance: RenmeiListClass | null = null;

  constructor() {}

  public static get instance() {
    if (!this._instance) {
      this._instance = new RenmeiListClass();
    }
    return this._instance;
  }

  init(
    names: string[],
    canvasSize: CanvasSize,
    getNamePosition: (
      currentColumn: number,
      isEvenNumber: boolean,
      paddingX: number,
      paddingY: number,
    ) => { x: number, y: number },
    baseNameHeight: number,
    getCharacterSpace: (text: string) => number,
    onClickName: (index: number) => void,
    lastNamePositionX: number,
    stagePadding: { x: number, y: number },
    company: string,
    onClickCompany: () => void,
    department: string,
    onClickDepartment: () => void,
    fontFamily: FontFamily,
  ) {
    if (this.stage.children.length) {
      this.stage.removeAllChildren();
    }

    this.drawBackground('black', canvasSize);
    // this.drawGuid(canvasSize);
    this.drawNames(
      names,
      getNamePosition,
      getCharacterSpace,
      baseNameHeight,
      onClickName,
      stagePadding,
      fontFamily,
    );
    // this.drawAddNameButton(canvasSize, lastNamePositionX, onAddNames);
    // this.drawDeleteNameButton(canvasSize, lastNamePositionX, onDeleteNames);
    this.drawCompany(company, lastNamePositionX, canvasSize, stagePadding, onClickCompany, fontFamily);
    this.drawDepartment(department, lastNamePositionX, canvasSize, stagePadding, onClickDepartment, fontFamily);

    this.stage.addChild(this.addNamesButtonContainer);
    this.stage.update();
  }

  /** text を縦書きで描画する */
  drawTategakiText(
    text: string,
    color: string,
    characterSpace: number,
    fontFamily: FontFamily,
  ) {
    const container = new createjs.Container();
    [...text].forEach((char, index) => {
      const text = new createjs.Text(char, `bold ${FONT_SIZE}px ${fontFamily}`, color);
      text.y = (FONT_SIZE * (index)) + (characterSpace * index);
      container.addChild(text);
    });
    return container;
  };

  
  drawGuid(
    canvasSize: CanvasSize,
  ) {
    const line = new createjs.Shape();
    line.graphics
      .setStrokeStyle(1)
      .beginStroke('red')
      .moveTo(0, canvasSize.height / 2)
      .lineTo(canvasSize.width, canvasSize.height / 2)
      .endStroke();
    line.graphics
      .setStrokeStyle(1)
      .beginStroke('blue')
      .moveTo(0, canvasSize.height / 4)
      .lineTo(canvasSize.width, canvasSize.height / 4)
      .endStroke();
    line.graphics
      .setStrokeStyle(1)
      .beginStroke('blue')
      .moveTo(0, (canvasSize.height / 4) * 3)
      .lineTo(canvasSize.width, (canvasSize.height / 4) * 3)
      .endStroke();
    this.stage.addChild(line);
    return line;
  };

  drawNames(
    names: string[],
    getNamePosition: (
      currentColumn: number,
      isEvenNumber: boolean,
      paddingX: number,
      paddingY: number,
    ) => { x: number, y: number },
    getCharacterSpace: (text: string) => number,
    baseNameHeight: number,
    onClickName: (index: number) => void,
    stagePadding: { x: number, y: number },
    fontFamily: FontFamily,
  ) {
    names.forEach((name, index) => {
      this.drawName(
        name,
        index,
        getNamePosition,
        getCharacterSpace,
        baseNameHeight,
        onClickName,
        stagePadding,
        fontFamily,
      );
    });
  }

  drawName(
    name: string,
    index: number,
    getNamePosition: (
      currentColumn: number,
      isEvenNumber: boolean,
      paddingX: number,
      paddingY: number,
    ) => { x: number, y: number },
    getCharacterSpace: (text: string) => number,
    baseNameHeight: number,
    onClickName: (index: number) => void,
    stagePadding: { x: number, y: number },
    fontFamily: FontFamily,
  ) {
    const currentColumn = Math.floor(index / 2) + 1;
    const namePosition = getNamePosition(currentColumn, isEvenNumber(index), stagePadding.x, stagePadding.y);
    const textContainer = this.drawTategakiText(
      name,
      '#000',
      getCharacterSpace(name),
      fontFamily,
    );
    // イベント検知用の rect 描画
    const rect = new createjs.Shape();
    rect.graphics.beginFill('white');
    rect.graphics.drawRect(
      0,
      0,
      FONT_SIZE,
      baseNameHeight,
    );
    rect.alpha = 0.01;

    // textContainer 描画
    textContainer.regX = FONT_SIZE / 2;
    textContainer.regY = baseNameHeight / 2;
    textContainer.x = namePosition.x;
    textContainer.y = namePosition.y;
    textContainer.addChild(rect);
    textContainer.addEventListener('click', () => {
      console.log('click', name);
      onClickName(index);
    });
    this.stage.addChild(textContainer);
  }

  drawBackground(
    color: string,
    canvasSize: CanvasSize,
  ) {
    const shape = new createjs.Shape();
    shape.graphics.beginStroke(color);
    shape.graphics.drawRect(0, 0, canvasSize.width, canvasSize.height);
    this.stage.addChild(shape);
    this.stage.update();
  }

  drawAddNameButton(
    canvasSize: CanvasSize,
    lastNamePositionX: number,
    onAddNames: () => void,
  ) {
    // 丸型のボタンの描画
    const circle = new createjs.Shape();
    circle
      .graphics
      .beginFill("#007BFF")
      .drawCircle(0, 0, 20);

    // + 記号の描画
    const plusSign = new createjs.Shape();
    plusSign
      .graphics
      .setStrokeStyle(4)
      .beginStroke("#FFFFFF");
    plusSign
      .graphics
      .moveTo(-10, 0)
      .lineTo(10, 0);
    plusSign
      .graphics
      .moveTo(0, -10)
      .lineTo(0, 10);

    // this.addNamesButtonContainer.x = lastNamePositionX - FONT_SIZE - 10;
    // this.addNamesButtonContainer.y = canvasSize.height / 2 - 30;

    this.addNamesButtonContainer.x = 70;
    this.addNamesButtonContainer.y = 25;

    this.addNamesButtonContainer.addEventListener('click', onAddNames);

    this.addNamesButtonContainer.addChild(circle);
    this.addNamesButtonContainer.addChild(plusSign);

    this.stage.addChild(this.addNamesButtonContainer);
  };
  
  drawDeleteNameButton(
    canvasSize: CanvasSize,
    lastNamePositionX: number,
    onDeleteNames: () => void,
  ) {
    // 丸型のボタンの描画
    const circle = new createjs.Shape();
    circle
      .graphics
      .beginFill("red")
      .drawCircle(0, 0, 20);

    // + 記号の描画
    const plusSign = new createjs.Shape();
    plusSign
      .graphics
      .setStrokeStyle(4)
      .beginStroke("#FFFFFF");
    plusSign
      .graphics
      .moveTo(-10, 0)
      .lineTo(10, 0);

    // this.deleteNamesButtonContainer.x = lastNamePositionX - FONT_SIZE - 10;
    // this.deleteNamesButtonContainer.y = canvasSize.height / 2 + 30;

    this.deleteNamesButtonContainer.x = 25;
    this.deleteNamesButtonContainer.y = 25;

    const clickHandler = () => {
      this.stage.removeChild(this.addNamesButtonContainer);
      this.stage.removeChild(this.deleteNamesButtonContainer);
      onDeleteNames();
    };

    this.deleteNamesButtonContainer.removeEventListener('click', clickHandler);
    this.deleteNamesButtonContainer.addEventListener('click', clickHandler);

    this.deleteNamesButtonContainer.addChild(circle);
    this.deleteNamesButtonContainer.addChild(plusSign);

    this.stage.addChild(this.deleteNamesButtonContainer);
  };

  drawCompany(
    company: string,
    lastNamePositionX: number,
    canvasSize: CanvasSize,
    stagePadding: { x: number, y: number },
    onClickCompany: () => void,
    fontFamily: FontFamily,
  ) {
    const characterSpace = 4;
    const companyContainer = this.drawTategakiText(company, '#000', characterSpace, fontFamily);
    // イベント検知用の rect 描画
    const rect = new createjs.Shape();
    rect.graphics.beginFill('white');
    // company が 空のときもクリック領域を確保するために company が表示されている列を埋めるように配置
    rect.graphics.drawRect(
      0,
      -canvasSize.height,
      FONT_SIZE,
      canvasSize.height * 2,
    );
    rect.alpha = 0.01;

    const baseNameHeight = (FONT_SIZE * company.length) + (characterSpace * (company.length - 1));
    const companyPosition = { x: lastNamePositionX - stagePadding.x - FONT_SIZE, y: canvasSize.height / 2 };
    // textContainer 描画
    companyContainer.regX = FONT_SIZE / 2;
    companyContainer.regY = baseNameHeight / 2;
    companyContainer.x = companyPosition.x;
    companyContainer.y = companyPosition.y;
    companyContainer.addChild(rect);
    companyContainer.addEventListener('click', () => {
      onClickCompany();
    });
    this.stage.addChild(companyContainer);
  }

  drawDepartment(
    department: string,
    lastNamePositionX: number,
    canvasSize: CanvasSize,
    stagePadding: { x: number, y: number },
    onClickDepartment: () => void,
    fontFamily: FontFamily,
  ) {
    const characterSpace = 4;
    const companyContainer = this.drawTategakiText(department, '#000', characterSpace, fontFamily);
    // イベント検知用の rect 描画
    const rect = new createjs.Shape();
    rect.graphics.beginFill('white');
    rect.graphics.drawRect(
      0,
      -canvasSize.height,
      FONT_SIZE,
      canvasSize.height * 2,
    );
    rect.alpha = 0.01;

    const baseNameHeight = (FONT_SIZE * department.length) + (characterSpace * (department.length - 1));
    const companyPositionX = lastNamePositionX - stagePadding.x - FONT_SIZE;
    const departmentPositionX = companyPositionX - ROW_SPACE - FONT_SIZE;
    const departmentPosition = { x: departmentPositionX, y: (canvasSize.height / 4) * 3 - (FONT_SIZE * 1) };
    // textContainer 描画
    companyContainer.regX = FONT_SIZE / 2;
    companyContainer.regY = baseNameHeight / 2;
    companyContainer.x = departmentPosition.x;
    companyContainer.y = departmentPosition.y;
    companyContainer.addChild(rect);
    companyContainer.addEventListener('click', () => {
      onClickDepartment();
    });
    this.stage.addChild(companyContainer);
  }

}