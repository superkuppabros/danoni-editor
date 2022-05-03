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
import { cloneDeep } from "lodash";
import { Operation } from "@/model/OperationQueue";

export class NoteService {
  constructor(
    private scoreData: ScoreData,
    private keyConfig: CustomKeyConfig,
    private keyKind: CustomKeyKind,
    private isReverse: boolean,
    private stage: Konva.Stage,
    private notesLayer: Konva.Layer,
    private operationQueue: Operation[]
  ) {}

  private keyNum = this.keyConfig[this.keyKind].num;
  private isHighlightedFreeze: string = JSON.parse(
    localStorage.getItem("isHighlightedFreeze") ?? "true"
  );

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
    const color = isFreeze
      ? freezeColors[colorGroup[lane]]
      : noteColors[colorGroup[lane]];

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

  // 1ノーツを追加して描画
  addOne(
    page: number,
    displayPage: number,
    lane: number,
    position: number,
    isFreeze: boolean
  ) {
    this.add(page, lane, position, isFreeze);
    if (page === displayPage) {
      this.draw(lane, position, isFreeze);
    }
    if (isFreeze) this.fillFreeze(displayPage, lane);
    this.operationQueue.push({
      type: "ADD_NOTE",
      page,
      position,
      lane,
      isFreeze
    });
  }

  // 1ノーツを削除してクリア
  removeOne(page: number, displayPage: number, lane: number, position: number) {
    this.remove(page, lane, position);
    if (page === displayPage) {
      this.clear(lane, position);
    }
    this.fillFreeze(displayPage, lane);
    const { exists, isFreeze } = this.hasNote(page, lane, position);
    if (exists)
      this.operationQueue.push({
        type: "REMOVE_NOTE",
        page,
        position,
        lane,
        isFreeze
      });
  }

  // フリーズの塗りつぶし描画
  fillFreeze(page: number, lane: number) {
    if (!this.isHighlightedFreeze) return false;
    const stage = this.stage;
    const notesLayer = this.notesLayer;

    const colorGroup = this.keyConfig[this.keyKind].colorGroup;
    const color = freezeColors[colorGroup[lane]];

    const laneFreezes: number[] = cloneDeep(
      this.scoreData.scores[page - 1].freezes[lane]
    ).sort((a, b) => a - b);

    const startParity =
      this.scoreData.scores.reduce((acc, score, index) => {
        return index < page - 1 ? acc + score.freezes[lane].length : acc;
      }, 0) % 2;

    if (startParity === 1) laneFreezes.unshift(0);
    laneFreezes.push(verticalSizeNum);

    const fills = notesLayer.find(`.freeze-fill-${lane}`);
    fills.forEach(node => node.destroy());

    while (laneFreezes.length > 0) {
      const freezeStart = laneFreezes.shift() as number;
      const freezeEnd = laneFreezes.shift() ?? verticalSizeNum;
      const height = freezeEnd - freezeStart;
      const opacity = 0.3;

      const fillFreeze = new Konva.Rect({
        x: lane * noteWidth,
        y: Math.min(
          toPx(freezeStart, this.isReverse),
          toPx(freezeEnd, this.isReverse)
        ),
        width: noteWidth,
        height,
        opacity,
        fill: color,
        name: `freeze-fill-${lane}`,
        id: `freeze-fill-${lane}-${freezeStart}`
      });
      notesLayer.add(fillFreeze);
    }
    stage.add(notesLayer);
  }

  // 行削除
  removeLanes(page: number, position: number): NoteOnPosition[] {
    const keyNum = this.keyNum;
    const removedLanes: NoteOnPosition[] = [];
    for (let lane = 0; lane < keyNum; lane++) {
      const noteStatus = this.hasNote(page, lane, position);
      if (noteStatus.exists) {
        this.remove(page, lane, position);
        removedLanes.push({
          lane,
          isFreeze: noteStatus.isFreeze
        });
      }
    }
    return removedLanes;
  }

  removeOnPosition(page: number, position: number): void {
    const removedLanes = this.removeLanes(page, position);
    this.operationQueue.push({
      type: "REMOVE_ON_POSITION",
      page,
      position,
      removedLanes
    });
  }

  // 行追加
  addOnPosition(
    page: number,
    currentPosition: number,
    notesOnPosition: NoteOnPosition[]
  ) {
    notesOnPosition.forEach(obj =>
      this.add(page, obj.lane, currentPosition, obj.isFreeze)
    );
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

    const movedLanes = this.removeLanes(page, currentPosition);
    const originalLanes = this.removeLanes(newPage, newPosition);
    this.addOnPosition(newPage, newPosition, movedLanes);

    this.operationQueue.push({
      type: "SHIFT",
      page,
      position: currentPosition,
      newPage,
      newPosition,
      movedLanes,
      originalLanes
    });
  }
}

export type NoteOnPosition = {
  lane: number;
  isFreeze: boolean;
};
