import { ScoreRevivalService } from "@/components/editor/service/ScoreRevivalService";
import { DefaultKeyConfig } from "@/model/KeyConfig";
import { testDos, testScore } from "./testScoreData";

describe("dosConvert", () => {
  it("正しくscoreDataに変換できる", () => {
    const keyConfig = DefaultKeyConfig;
    const pageBlockNum = 8;
    const scoreRevivalService = new ScoreRevivalService(keyConfig, pageBlockNum);

    const scoreData = scoreRevivalService.dosConvert(testDos.dos5_1);
    expect(scoreData).toStrictEqual(testScore.score5_1);
  });

  it("2譜面目でも正しくscoreDataに変換できる", () => {
    const keyConfig = DefaultKeyConfig;
    const pageBlockNum = 8;
    const scoreRevivalService = new ScoreRevivalService(keyConfig, pageBlockNum);

    const scoreData = scoreRevivalService.dosConvert(testDos.dos5_2);
    expect(scoreData).toStrictEqual(testScore.score5_2);
  });

  it("2譜面目でも正しくscoreDataに変換できる(v3.3.0以前互換)", () => {
    const keyConfig = DefaultKeyConfig;
    const pageBlockNum = 8;
    const scoreRevivalService = new ScoreRevivalService(keyConfig, pageBlockNum);

    const scoreData = scoreRevivalService.dosConvert(testDos.dos5_2Abb);
    expect(scoreData).toStrictEqual(testScore.score5_2);
  });

  it("prefixがついた譜面でも正しくscoreDataに変換できる", () => {
    const keyConfig = DefaultKeyConfig;
    const pageBlockNum = 8;
    const scoreRevivalService = new ScoreRevivalService(keyConfig, pageBlockNum);

    const scoreData = scoreRevivalService.dosConvert(testDos.dos5_1Prefix);
    expect(scoreData).toStrictEqual(testScore.score5_1Prefix);
  });

  it("prefixがついた譜面でblankFrameやscoreNumberが欠けていても正しくscoreDataに変換できる", () => {
    const keyConfig = DefaultKeyConfig;
    const pageBlockNum = 8;
    const scoreRevivalService = new ScoreRevivalService(keyConfig, pageBlockNum);

    const scoreData = scoreRevivalService.dosConvert(testDos.dos5_1PrefixAbb);
    expect(scoreData).toStrictEqual(testScore.score5_1Prefix);
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
