import {
  ScoreConvertService,
  FrameData
} from "@/components/editor/service/ScoreConvertService";
import { KeyKind } from "@/model/KeyKind";
import { KeyConfig, DefaultKeyConfig } from "@/model/KeyConfig";
import { ScoreData, DefaultScoreData } from "@/model/ScoreData";
import _ from "lodash";
import { DefaultPageScore } from "@/model/PageScore";
import { testScoreData } from "./testScoreData";

describe("scoreConvertService", () => {
  const keyKind: KeyKind = "5";
  const keyConfig: KeyConfig = DefaultKeyConfig;
  const keyNum: number = keyConfig[keyKind].num;
  const scoreConverter = new ScoreConvertService(keyKind, keyConfig);
  const scoreData: ScoreData = testScoreData;

  it("frameDataへの変換が正しく出来る", () => {
    const expectedFrameData: FrameData[] = [
      {
        notes: [[200], [], [240], [], []],
        freezes: [[], [], [], [280], []],
        speeds: []
      },
      {
        notes: [[], [360, 380], [400], [], []],
        freezes: [[], [], [], [360], []],
        speeds: [
          { position: 360, value: 1.1, type: "speed" },
          { position: 400, value: 0.8, type: "boost" }
        ]
      },
      {
        notes: [[], [], [], [], [440, 500]],
        freezes: [[], [], [], [], []],
        speeds: [{ position: 440, value: 0.7, type: "speed" }]
      }
    ];

    expect(scoreConverter.toFrameData(scoreData)).toStrictEqual(
      expectedFrameData
    );
  });

  it("dosの出力が正しく出来る", () => {
    const expectedData = `|left_data=200|down_data=360,380|up_data=240,400|right_data=|space_data=440,500|frzLeft_data=|frzDown_data=|frzUp_data=|frzRight_data=280,360|frzSpace_data=|
|speed_data=360,1.1,440,0.7|boost_data=400,0.8|
|keyKind=5|blankFrame=200|label=1,3|startNumber=0,240|bpm=180,120|
`;
    expect(scoreConverter.convert(scoreData)).toBe(expectedData);
  });

  it("譜面データの後ろの空白が削除されている", () => {
    const scoreDataWithDefault = _.cloneDeep(scoreData);
    scoreDataWithDefault.scores.push(
      new DefaultPageScore(keyNum),
      new DefaultPageScore(keyNum)
    );
    expect(scoreConverter.cutLastDefault(scoreDataWithDefault)).toStrictEqual(
      scoreData
    );
  });

  it("四分譜面が生成されている", () => {
    const initialScoreData: ScoreData = new DefaultScoreData(keyNum);
    initialScoreData.keyKind = "5";
    const expectedData = `|left_data=200,226,251,277,303,329,354,380,406,431,457,483,509,534,560,586,611,637,663,689,714,740,766,791,817,843,869,894,920,946,971,997,1023,1049,1074,1100,1126,1151,1177,1203,1229,1254,1280,1306,1331,1357,1383,1409,1434,1460,1486,1511,1537,1563,1589,1614,1640,1666,1691,1717,1743,1769,1794,1820,1846,1871,1897,1923,1949,1974,2000,2026,2051,2077,2103,2129,2154,2180,2206,2231,2257,2283,2309,2334,2360,2386,2411,2437,2463,2489,2514,2540,2566,2591,2617,2643,2669,2694,2720,2746,2771,2797,2823,2849,2874,2900,2926,2951,2977,3003,3029,3054,3080,3106,3131,3157,3183,3209,3234,3260,3286,3311,3337,3363,3389,3414,3440,3466,3491,3517,3543,3569,3594,3620,3646,3671,3697,3723,3749,3774,3800,3826,3851,3877,3903,3929,3954,3980,4006,4031,4057,4083,4109,4134,4160,4186,4211,4237,4263,4289|down_data=|up_data=|right_data=|space_data=|frzLeft_data=|frzDown_data=|frzUp_data=|frzRight_data=|frzSpace_data=|
|speed_data=|boost_data=|
|keyKind=5|blankFrame=200|label=1|startNumber=0|bpm=140|
`;
    expect(scoreConverter.convertWithQuarters(initialScoreData)).toBe(
      expectedData
    );
  });
});
