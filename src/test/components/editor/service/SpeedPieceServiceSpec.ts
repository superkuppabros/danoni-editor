import { ScoreData } from "@/model/ScoreData";
import _ from "lodash";
import Konva from "konva";
import { testScoreData } from "./testScoreData";
import { SpeedPieceService } from "@/components/editor/service/SpeedPieceService";
import { Speed } from "@/model/Speed";

describe("speedPieceService", () => {
  const editorWidth = 150;
  const stage = ("dummyStage" as unknown) as Konva.Stage;
  const layer = ("dummyLayer" as unknown) as Konva.Layer;

  const scoreData: ScoreData = testScoreData;
  const createNoteService = (scoreData: ScoreData) =>
    new SpeedPieceService(scoreData, editorWidth, stage, layer);

  it("速度変化コマの有無が判定できる", () => {
    const speedPieceService = createNoteService(_.cloneDeep(scoreData));
    expect(speedPieceService.hasSpeedPiece(1, 0)).toBe(false);
    expect(speedPieceService.hasSpeedPiece(2, 0)).toBe(true);
  });

  it("速度変化コマの追加ができる", () => {
    const copiedScoreData = _.cloneDeep(scoreData);
    const speedPieceService = createNoteService(copiedScoreData);
    speedPieceService.add(1, 0, "speed");
    const expectedSpeed: Speed = {
      position: 0,
      value: 1,
      type: "speed"
    };
    expect(copiedScoreData.scores[0].speeds).toStrictEqual([expectedSpeed]);
  });

  it("ノーツの削除ができる", () => {
    const copiedScoreData = _.cloneDeep(scoreData);
    const speedPieceService = createNoteService(copiedScoreData);
    speedPieceService.remove(2, 0);
    speedPieceService.remove(2, 96);
    expect(copiedScoreData.scores[1].speeds).toStrictEqual([]);
  });
});
