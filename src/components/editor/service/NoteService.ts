import Konva from "konva";
import { ScoreData } from "@/model/ScoreData";
import { KeyConfig } from "@/model/KeyConfig";
import { KeyKind } from "@/model/KeyKind";
import {
  freezeColors,
  noteColors,
  noteWidth,
  editorHeight,
  noteHeight
} from "../EditorConstant";

export class NoteService {
  constructor(
    private scoreData: ScoreData,
    private keyConfig: KeyConfig,
    private keyKind: KeyKind,
    private stage: Konva.Stage,
    private notesLayer: Konva.Layer
  ) {}

  private keyNum = this.keyConfig[this.keyKind].num;

  // ノーツの有無の判定
  hasNote(
    page: number,
    lane: number,
    position: number
  ): { exists: boolean; isFreeze: boolean } {
    const pageScore = this.scoreData.scores[page - 1];
    const isFreeze = pageScore.freezes[lane].includes(position);
    const exists = pageScore.notes[lane].includes(position) || isFreeze;
    return { exists, isFreeze };
  }

  // ノーツの追加
  add(page: number, lane: number, position: number, isFreeze: boolean): void {
    if (isFreeze) this.scoreData.scores[page - 1].freezes[lane].push(position);
    else this.scoreData.scores[page - 1].notes[lane].push(position);
  }

  // ノーツの削除
  remove(page: number, lane: number, position: number): void {
    this.scoreData.scores[page - 1].freezes[lane] = this.scoreData.scores[
      page - 1
    ].freezes[lane].filter(pos => pos !== position);
    this.scoreData.scores[page - 1].notes[lane] = this.scoreData.scores[
      page - 1
    ].notes[lane].filter(pos => pos !== position);
  }

  // ノーツの描画
  draw(lane: number, position: number, isFreeze: boolean): void {
    const stage = this.stage as Konva.Stage;
    const notesLayer = this.notesLayer as Konva.Layer;
    const colorGroup = this.keyConfig[this.keyKind].colorGroup;

    const color = ((lane: number, isFreeze: boolean) => {
      if (isFreeze) {
        return freezeColors[colorGroup[lane]];
      } else {
        return noteColors[colorGroup[lane]];
      }
    })(lane, isFreeze);

    const note = new Konva.Rect({
      x: lane * noteWidth,
      y: editorHeight - position - noteHeight / 2,
      width: noteWidth,
      height: noteHeight,
      fill: color,
      id: `note-${lane}-${position}`
    });
    notesLayer.add(note);
    stage.add(notesLayer);
  }

  // ノーツのクリア
  clear(lane: number, position: number): void {
    const stage = this.stage;
    const notesLayer = this.notesLayer;

    const note = notesLayer.findOne(`#note-${lane}-${position}`);
    note.destroy();
    stage.add(notesLayer);
  }

  // 行削除
  removeOnPosition(
    page: number,
    position: number
  ): {
    lane: number;
    isFreeze: boolean;
  }[] {
    const keyNum = this.keyNum;
    const removedLanes = [];
    for (let lane = 0; lane < keyNum; lane++) {
      if (this.hasNote(page, lane, position).exists) {
        this.remove(page, lane, position);
        removedLanes.push({
          lane,
          isFreeze: this.hasNote(page, lane, position).isFreeze
        });
      }
    }
    return removedLanes;
  }
}
