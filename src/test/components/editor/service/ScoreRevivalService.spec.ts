import { ScoreRevivalService } from "@/components/editor/service/ScoreRevivalService";
import { DefaultKeyConfig } from "@/model/KeyConfig";
import { test2DosData, test2ScoreData, testDosData, testScoreData } from "./testScoreData";

describe("dosConvert", () => {
  it("正しくscoreDataに変換できる", () => {
    const keyConfig = DefaultKeyConfig;
    const pageBlockNum = 8;
    const scoreRevivalService = new ScoreRevivalService(keyConfig, pageBlockNum);

    const scoreData = scoreRevivalService.dosConvert(testDosData);
    expect(scoreData).toStrictEqual(testScoreData);
  });

  it("2譜面目でも正しくscoreDataに変換できる", () => {
    const keyConfig = DefaultKeyConfig;
    const pageBlockNum = 8;
    const scoreRevivalService = new ScoreRevivalService(keyConfig, pageBlockNum);

    const scoreData = scoreRevivalService.dosConvert(test2DosData);
    expect(scoreData).toStrictEqual(test2ScoreData);
  });

  it("不正なデータならnullが返る", () => {
    const keyConfig = DefaultKeyConfig;
    const pageBlockNum = 8;
    const scoreRevivalService = new ScoreRevivalService(keyConfig, pageBlockNum);

    const scoreData = scoreRevivalService.dosConvert("|aaa|bbb|");
    expect(scoreData).toBe(null);
  });

  // ToDo: 古いDosファイルからも変換出来るテストケース
});
