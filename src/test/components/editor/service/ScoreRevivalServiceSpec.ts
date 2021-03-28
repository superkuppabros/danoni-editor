import { ScoreRevivalService } from "@/components/editor/service/ScoreRevivalService";
import { DefaultKeyConfig } from "@/model/KeyConfig";
import { testDosData, testScoreData } from "./testScoreData";

describe("dosConvert", () => {
  it("正しくscoreDataに変換できる", () => {
    const keyConfig = DefaultKeyConfig;
    const scoreRevivalService = new ScoreRevivalService(keyConfig);

    const scoreData = scoreRevivalService.dosConvert(testDosData);
    expect(scoreData).toStrictEqual(testScoreData);
  });

  it("不正なデータならnullが返る", () => {
    const keyConfig = DefaultKeyConfig;
    const scoreRevivalService = new ScoreRevivalService(keyConfig);

    const scoreData = scoreRevivalService.dosConvert("|aaa|bbb|");
    expect(scoreData).toBe(null);
  });
});
