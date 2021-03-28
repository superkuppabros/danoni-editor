import { ScoreRevivalService } from "@/components/editor/service/ScoreRevivalService";
import { DefaultKeyConfig } from "@/model/KeyConfig";
import { testDosData } from "./testScoreData";

describe("dosConvert", () => {
  it("正しくscoreDataに変換できる", () => {
    const keyKind = "5";
    const keyConfig = DefaultKeyConfig;
    const scoreRevivalService = new ScoreRevivalService(keyKind, keyConfig);

    console.log(scoreRevivalService.dosConvert(testDosData));
  });
});
