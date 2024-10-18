import { ScoreConvertService, FrameData } from "@/components/editor/service/ScoreConvertService";
import { KeyKind } from "@/model/KeyKind";
import { KeyConfig, DefaultKeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { cloneDeep } from "lodash";
import { DefaultPageScore } from "@/model/PageScore";
import { testDos, testScore } from "./testScoreData";

import "mock-local-storage";

describe("scoreConvertService", () => {
  const keyKind: KeyKind = "5";
  const keyConfig: KeyConfig = DefaultKeyConfig;
  const keyNum: number = keyConfig[keyKind].num;
  const scoreConverter = new ScoreConvertService(keyKind, keyConfig);
  const scoreData: ScoreData = testScore.score5_1;

  it("frameDataへの変換が正しく出来る", () => {
    const expectedFrameData: FrameData[] = [
      {
        notes: [[200], [], [240], [], []],
        freezes: [[], [], [], [280], []],
        speeds: [],
      },
      {
        notes: [[], [360, 380], [400], [], []],
        freezes: [[], [], [], [360], []],
        speeds: [
          { position: 360, value: 1.1, type: "speed" },
          { position: 400, value: 0.8, type: "boost" },
        ],
      },
      {
        notes: [[], [], [], [], [440, 500]],
        freezes: [[], [], [], [], []],
        speeds: [{ position: 440, value: 0.7, type: "speed" }],
      },
    ];

    expect(scoreConverter.toFrameData(scoreData)).toStrictEqual(expectedFrameData);
  });

  it("dosの出力が正しく出来る", () => {
    expect(scoreConverter.convert(testScore.score5_1)).toBe(testDos.dos5_1);
  });

  it("2譜面目でも正しく出力出来る", () => {
    expect(scoreConverter.convert(testScore.score5_2)).toBe(testDos.dos5_2);
  });

  it("prefixが正しく出力出来る", () => {
    expect(scoreConverter.convert(testScore.score5_1Prefix)).toBe(testDos.dos5_1Prefix);
  });

  it("譜面データの後ろの空白が削除されている", () => {
    const scoreDataWithDefault = cloneDeep(scoreData);
    scoreDataWithDefault.scores.push(new DefaultPageScore(keyNum), new DefaultPageScore(keyNum));
    expect(scoreConverter.cutLastDefault(scoreDataWithDefault)).toStrictEqual(scoreData);
  });

  it("四分譜面が生成されている", () => {
    expect(scoreConverter.convertWithQuarters(testScore.score5_1Initial)).toBe(testDos.dos5_1Initial);
  });
});
