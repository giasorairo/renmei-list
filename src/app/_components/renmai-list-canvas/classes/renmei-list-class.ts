import { isEvenNumber } from "@/utilities/is-even-number";
import { CANVAS_SIZE, FONT_FAMILY, FONT_SIZE } from "../const";

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
    onAddNames: () => void,
    onDeleteNames: () => void,
  ) {
    if (this.stage.children.length) {
      this.stage.removeAllChildren();
      this.addNamesButtonContainer.removeEventListener('click', onAddNames);
    }

    this.drawBackground('black');
    this.drawGuid();
    this.drawNames(
      names,
      getNamePosition,
      getCharacterSpace,
      baseNameHeight,
      onClickName,
    );
    this.drawAddNameButton(lastNamePositionX, onAddNames);
    this.drawDeleteNameButton(lastNamePositionX, onDeleteNames);

    this.stage.addChild(this.addNamesButtonContainer);
    this.stage.update();
  }

  /** text を縦書きで描画する */
  drawTategakiText(
    text: string,
    color: string,
    characterSpace: number,
  ) {
    const container = new createjs.Container();
    [...text].forEach((char, index) => {
      const text = new createjs.Text(char, `${FONT_SIZE}px ${FONT_FAMILY}`, color);
      text.y = (FONT_SIZE * (index)) + (characterSpace * index);
      container.addChild(text);
    });
    return container;
  };

  
  drawGuid() {
    const line = new createjs.Shape();
    line.graphics
      .setStrokeStyle(1)
      .beginStroke('red')
      .moveTo(0, CANVAS_SIZE.height / 2)
      .lineTo(CANVAS_SIZE.width, CANVAS_SIZE.height / 2)
      .endStroke();
    line.graphics
      .setStrokeStyle(1)
      .beginStroke('blue')
      .moveTo(0, CANVAS_SIZE.height / 4)
      .lineTo(CANVAS_SIZE.width, CANVAS_SIZE.height / 4)
      .endStroke();
    line.graphics
      .setStrokeStyle(1)
      .beginStroke('blue')
      .moveTo(0, (CANVAS_SIZE.height / 4) * 3)
      .lineTo(CANVAS_SIZE.width, (CANVAS_SIZE.height / 4) * 3)
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
  ) {
    names.forEach((name, index) => {
      this.drawName(
        name,
        index,
        getNamePosition,
        getCharacterSpace,
        baseNameHeight,
        onClickName,
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
  ) {
    const currentColumn = Math.floor(index / 2) + 1;
    const namePosition = getNamePosition(currentColumn, isEvenNumber(index), 40, 2);
    const textContainer = this.drawTategakiText(
      name,
      '#000',
      getCharacterSpace(name),
    );
    // イベント検知用の rect 描画
    const rect = new createjs.Shape();
    rect.graphics.beginFill('black');
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

  drawBackground(color: string) {
    const shape = new createjs.Shape();
    shape.graphics.beginStroke(color);
    shape.graphics.drawRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
    this.stage.addChild(shape);
    this.stage.update();
  }

  drawAddNameButton(
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

    this.addNamesButtonContainer.x = lastNamePositionX - 10;
    this.addNamesButtonContainer.y = CANVAS_SIZE.height / 2 - 30;

    this.addNamesButtonContainer.addEventListener('click', onAddNames);

    this.addNamesButtonContainer.addChild(circle);
    this.addNamesButtonContainer.addChild(plusSign);

    this.stage.addChild(this.addNamesButtonContainer);
  };
  
  drawDeleteNameButton(
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

    this.deleteNamesButtonContainer.x = lastNamePositionX - 10;
    this.deleteNamesButtonContainer.y = CANVAS_SIZE.height / 2 + 30;

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

}