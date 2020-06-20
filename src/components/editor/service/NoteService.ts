import Konva from "konva";
import { ScoreData } from "@/model/ScoreData";
import { CustomKeyConfig } from "@/model/KeyConfig";
import { CustomKeyKind } from "@/model/KeyKind";
import {
  freezeColors,
  noteColors,
  noteWidth,
  noteHeight,
  verticalSizeNum
} from "../EditorConstant";
import toPx from "../helper/toPx";

export class NoteService {
  constructor(
    private scoreData: ScoreData,
    private keyConfig: CustomKeyConfig,
    private keyKind: CustomKeyKind,
    private isReverse: boolean,
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
    const removedFreezes = this.scoreData.scores[page - 1].freezes[lane].filter(
      pos => pos !== position
    );
    this.scoreData.scores[page - 1].freezes.splice(lane, 1, removedFreezes);

    const removedNotes = this.scoreData.scores[page - 1].notes[lane].filter(
      pos => pos !== position
    );
    this.scoreData.scores[page - 1].notes.splice(lane, 1, removedNotes);
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
      y: toPx(position, this.isReverse) - noteHeight / 2,
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

  // 行をずらす
  shift(page: number, currentPosition: number, delta: number): void {
    let newPosition = currentPosition + delta;
    let newPage = page;
    if (newPosition < 0) {
      if (page === 1) return;
      else {
        newPage--;
        newPosition += verticalSizeNum;
      }
    } else if (newPosition >= verticalSizeNum) {
      newPage++;
      newPosition -= verticalSizeNum;
    }

    const removedLanes = this.removeOnPosition(page, currentPosition);
    this.removeOnPosition(newPage, newPosition);
    removedLanes.forEach(obj =>
      this.add(newPage, obj.lane, newPosition, obj.isFreeze)
    );
  }
}
