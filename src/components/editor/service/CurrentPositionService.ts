import Konva from "konva";
import { ScoreData } from "@/model/ScoreData";
import { canvasMarginHorizontal, verticalSizeNum } from "../EditorConstant";
import { positionToFrame, positionToSeconds, secondsToTimeStr } from "../helper/Calculator";
import { Timing } from "@/model/Timing";
import toPx from "../helper/toPx";

export class CurrentPositionService {
  constructor(
    private scoreData: ScoreData,
    private editorWidth: number,
    private isReverse: boolean,
    private pageBlockNum: number,
    private stage: Konva.Stage,
    private currentPositionLayer: Konva.Layer,
    private changeCurrentPosition: (newPos: number) => void
  ) {}

  // 現在位置の描画
  draw(position: number, page: number, timing: Timing): void {
    const stage = this.stage;
    const currentPositionLayer = this.currentPositionLayer;

    const color = "#d8d800";
    const yValue = toPx(position, this.isReverse);

    const maybeLine = currentPositionLayer.findOne("#currentPositionLine");
    const line: Konva.Line =
      maybeLine instanceof Konva.Line
        ? maybeLine.y(yValue)
        : new Konva.Line({
            y: yValue,
            points: [0, 0, this.editorWidth, 0],
            stroke: color,
            strokeWidth: 1.75,
            id: "currentPositionLine",
          });
    const radius = 6;

    const maybeTriangle = currentPositionLayer.findOne("#currentPositionTriangle");
    const triangle: Konva.RegularPolygon =
      maybeTriangle instanceof Konva.RegularPolygon
        ? maybeTriangle.y(yValue)
        : new Konva.RegularPolygon({
            sides: 3,
            radius,
            rotation: -30,
            fill: color,
            x: -radius,
            y: yValue,
            id: `currentPositionTriangle`,
          });

    const blankFrame = this.scoreData.blankFrame;
    const currentFrame =
      positionToFrame(timing, page, position, this.pageBlockNum, blankFrame) < 100000
        ? Math.round(positionToFrame(timing, page, position, this.pageBlockNum, blankFrame) * 10) / 10
        : Math.round(positionToFrame(timing, page, position, this.pageBlockNum, blankFrame));

    const currentSeconds = positionToSeconds(timing, page, position, this.pageBlockNum, blankFrame);
    const currentTimeStr = secondsToTimeStr(currentSeconds);
    const displayedText = `${currentFrame}\n[${currentTimeStr}]`;
    const textWidth = 40;
    const textHeight = 22;

    const maybeText = currentPositionLayer.findOne("#currentPositionText");
    const text: Konva.Text =
      maybeText instanceof Konva.Text
        ? maybeText.y(yValue - textHeight / 2).text(displayedText)
        : new Konva.Text({
            width: textWidth,
            height: textHeight,
            text: displayedText,
            fill: "black",
            fontSize: textHeight / 2,
            align: "center",
            x: -canvasMarginHorizontal + 2,
            y: yValue - textHeight / 2,
            id: `currentPositionText`,
          });

    currentPositionLayer.add(line, triangle, text);
    stage.add(currentPositionLayer);
  }

  // 現在位置の移動
  move(position: number, page: number, timing: Timing): void {
    this.changeCurrentPosition(position);
    this.draw(position, page, timing);
  }

  // 再生位置の移動アニメーション
  // args: 音楽再生時間 (2 + ページのブロック数)拍
  musicAnimate(playDuration: number) {
    const stage = this.stage;
    const currentPositionLayer = this.currentPositionLayer;

    const node = currentPositionLayer.findOne("#musicPosition");
    const currentPositionLine: Konva.Line =
      node instanceof Konva.Line
        ? node.y(toPx(0, this.isReverse))
        : new Konva.Line({
            y: toPx(0, this.isReverse),
            points: [0, 0, this.editorWidth, 0],
            stroke: "#8000ff",
            strokeWidth: 1.75,
            id: "musicPosition",
          });

    currentPositionLayer.add(currentPositionLine);
    stage.add(currentPositionLayer);

    const tween = new Konva.Tween({
      node: currentPositionLine,
      duration: (playDuration * this.pageBlockNum) / (2 + this.pageBlockNum) / 1000, // 上に到達するまでの時間
      x: 0,
      y: toPx(verticalSizeNum(this.pageBlockNum), this.isReverse),
    });

    window.setTimeout(() => {
      tween.play();
    }, (playDuration * 2) / (2 + this.pageBlockNum)); // 2拍後にアニメーション開始
  }
}
