import Konva from "konva";

import { KeyKind } from "@/model/KeyKind";
import { KeyConfig, DefaultKeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { cloneDeep } from "lodash";
import { NoteService } from "@/components/editor/service/NoteService";
import { testScoreData } from "./testScoreData";
import { Operation } from "@/model/OperationQueue";

import 'mock-local-storage'

describe("noteService", () => {
  const keyKind: KeyKind = "5";
  const keyConfig: KeyConfig = DefaultKeyConfig;
  const isReverse = true;
  const stage = "dummyStage" as unknown as Konva.Stage;
  const layer = "dummyLayer" as unknown as Konva.Layer;
  const operationQueue: Operation[] = [];

  const scoreData: ScoreData = testScoreData;
  const createNoteService = (scoreData: ScoreData) =>
    new NoteService(
      scoreData,
      keyConfig,
      keyKind,
      isReverse,
      stage,
      layer,
      operationQueue
    );

  it("ノーツの有無が判定できる", () => {
    const noteService = createNoteService(cloneDeep(scoreData));
    expect(noteService.hasNote(1, 0, 0)).toStrictEqual({
      exists: true,
      isFreeze: false,
    });
    expect(noteService.hasNote(2, 3, 0)).toStrictEqual({
      exists: true,
      isFreeze: true,
    });
    expect(noteService.hasNote(1, 1, 0)).toStrictEqual({
      exists: false,
      isFreeze: false,
    });
  });

  it("ノーツの追加ができる", () => {
    const copiedScoreData = cloneDeep(scoreData);
    const noteService = createNoteService(copiedScoreData);
    noteService.add(1, 0, 192, false);
    noteService.add(1, 1, 0, true);
    expect(copiedScoreData.scores[0].notes[0]).toStrictEqual([0, 192]);
    expect(copiedScoreData.scores[0].freezes[1]).toStrictEqual([0]);
  });

  it("ノーツの削除ができる", () => {
    const copiedScoreData = cloneDeep(scoreData);
    const noteService = createNoteService(copiedScoreData);
    noteService.remove(2, 1, 0);
    noteService.remove(1, 3, 192);
    expect(copiedScoreData.scores[1].notes[1]).toStrictEqual([48]);
    expect(copiedScoreData.scores[0].freezes[3]).toStrictEqual([]);
  });

  it("行の削除ができる", () => {
    const copiedScoreData = cloneDeep(scoreData);
    const noteService = createNoteService(copiedScoreData);
    noteService.removeOnPosition(2, 0);
    expect(copiedScoreData.scores[1].notes[1]).toStrictEqual([48]);
    expect(copiedScoreData.scores[1].freezes[3]).toStrictEqual([]);
  });
});
