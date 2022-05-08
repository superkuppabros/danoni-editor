import Konva from "konva";
import { ScoreData } from "@/model/ScoreData";
import { SpeedType } from "@/model/Speed";
import toPx from "../helper/toPx";

export class SpeedPieceService {
  constructor(
    private scoreData: ScoreData,
    private editorWidth: number,
    private isReverse: boolean,
    private stage: Konva.Stage,
    private notesLayer: Konva.Layer
  ) {}

  // 速度変化コマの存在判定
  hasSpeedPiece(page: number, position: number): boolean {
    return this.scoreData.scores[page - 1].speeds.some((speed) => speed.position === position);
  }

  // 速度変化コマの追加
  add(page: number, position: number, type: SpeedType, value = 1) {
    this.scoreData.scores[page - 1].speeds.push({
      position,
      value,
      type,
    });
  }

  // 速度変化コマの削除
  remove(page: number, position: number) {
    this.scoreData.scores[page - 1].speeds = this.scoreData.scores[page - 1].speeds.filter(
      (speed) => speed.position !== position
    );
  }

  // 速度変化コマの描画
  draw(position: number, type: SpeedType) {
    const stage = this.stage as Konva.Stage;
    const notesLayer = this.notesLayer as Konva.Layer;

    const color = type === "speed" ? "orange" : "purple";
    const radius = 6;
    const triangle = new Konva.RegularPolygon({
      sides: 3,
      radius,
      rotation: 30,
      fill: color,
      x: this.editorWidth + radius,
      y: toPx(position, this.isReverse),
      id: `speed-${position}`,
    });

    notesLayer.add(triangle);
    stage.add(notesLayer);
  }

  // 速度変化コマのクリア
  clear(position: number): void {
    const stage = this.stage as Konva.Stage;
    const notesLayer = this.notesLayer as Konva.Layer;

    const note = notesLayer.findOne(`#speed-${position}`);
    note.destroy();
    stage.add(notesLayer);
  }
}
