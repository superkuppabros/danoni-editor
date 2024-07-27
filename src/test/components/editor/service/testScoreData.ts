import { DefaultScoreData, ScoreData } from "@/model/ScoreData";
import { cloneDeep } from "lodash";

export const testScoreData: ScoreData = {
  keyKind: "5",
  blankFrame: 200,
  timings: [
    {
      label: 1,
      startNum: 0,
      bpm: 180,
    },
    {
      label: 3,
      startNum: 240,
      bpm: 120,
    },
  ],
  scoreNumber: 1,
  scorePrefix: "",
  scores: [
    {
      notes: [[0], [], [96], [], []],
      freezes: [[], [], [], [192], []],
      speeds: [],
    },
    {
      notes: [[], [0, 48], [96], [], []],
      freezes: [[], [], [], [0], []],
      speeds: [
        { position: 0, value: 1.1, type: "speed" },
        { position: 96, value: 0.8, type: "boost" },
      ],
    },
    {
      notes: [[], [], [], [], [0, 96]],
      freezes: [[], [], [], [], []],
      speeds: [{ position: 0, value: 0.7, type: "speed" }],
    },
  ],
};

// 基礎となるセーブデータを元にパラメータを与えてアレンジ
const changeScoreData =
  (baseScoreData: ScoreData = testScoreData) =>
  ({ scoreNumber = 1 as number, scorePrefix = "" as string, keyKind = baseScoreData.keyKind as string } = {}) => {
    const scoreData = cloneDeep(baseScoreData);
    scoreData.scoreNumber = scoreNumber;
    scoreData.scorePrefix = scorePrefix;
    scoreData.keyKind = keyKind;
    return scoreData;
  };

// 基礎となるセーブデータ群
const scorePtn = {
  key5: changeScoreData(),
  default5: changeScoreData(new DefaultScoreData(5)),
  //key11: changeScoreData(testScoreData11),
};

// セーブデータのテストパターン
export const testScore = {
  score5_1: scorePtn.key5(),
  score5_1Initial: scorePtn.default5({ keyKind: "5" }),
  score5_2: scorePtn.key5({ scoreNumber: 2 }),
  score5_1Prefix: scorePtn.key5({ scorePrefix: "a" }),
  //score11_1: scorePtn.key11(),
};

// 譜面データのテストパターン群
export const testDos = {
  // 1譜面目: 出力確認（兼復元）データ
  dos5_1: `|left_data=200|down_data=360,380|up_data=240,400|right_data=|space_data=440,500|frzLeft_data=|frzDown_data=|frzUp_data=|frzRight_data=280,360|frzSpace_data=|
|speed_data=360,1.1,440,0.7|boost_data=400,0.8|
|es_keyKind=5|es_blankFrame=200|es_label=1,3|es_startNumber=0,240|es_bpm=180,120|es_scoreNumber=1|es_scorePrefix=|
`,

  // 2譜面目: 出力確認（兼復元）データ
  dos5_2: `|left2_data=200|down2_data=360,380|up2_data=240,400|right2_data=|space2_data=440,500|frzLeft2_data=|frzDown2_data=|frzUp2_data=|frzRight2_data=280,360|frzSpace2_data=|
|speed2_data=360,1.1,440,0.7|boost2_data=400,0.8|
|es_keyKind=5|es_blankFrame=200|es_label=1,3|es_startNumber=0,240|es_bpm=180,120|es_scoreNumber=2|es_scorePrefix=|
`,

  // 2譜面目: 復元確認データ（復元データ欠けあり）
  dos5_2Abb: `|left2_data=200|down2_data=360,380|up2_data=240,400|right2_data=|space2_data=440,500|frzLeft2_data=|frzDown2_data=|frzUp2_data=|frzRight2_data=280,360|frzSpace2_data=|
|speed2_data=360,1.1,440,0.7|boost2_data=400,0.8|
|es_keyKind=5|es_blankFrame=200|es_label=1,3|es_startNumber=0,240|es_bpm=180,120|es_scoreNumber=2|
`,

  // 1譜面目: 出力確認（兼復元）データ、prefixあり
  dos5_1Prefix: `|aleft_data=200|adown_data=360,380|aup_data=240,400|aright_data=|aspace_data=440,500|afrzLeft_data=|afrzDown_data=|afrzUp_data=|afrzRight_data=280,360|afrzSpace_data=|
|speed_data=360,1.1,440,0.7|boost_data=400,0.8|
|es_keyKind=5|es_blankFrame=200|es_label=1,3|es_startNumber=0,240|es_bpm=180,120|es_scoreNumber=1|es_scorePrefix=a|
`,

  // 1譜面目: 復元確認データ（復元データ欠けあり）、prefixあり
  dos5_1PrefixAbb: `|aleft_data=200|adown_data=360,380|aup_data=240,400|aright_data=|aspace_data=440,500|afrzLeft_data=|afrzDown_data=|afrzUp_data=|afrzRight_data=280,360|afrzSpace_data=|
|speed_data=360,1.1,440,0.7|boost_data=400,0.8|
|es_keyKind=5|es_label=1,3|es_startNumber=0,240|es_bpm=180,120|es_scorePrefix=a|
`,

  // 1譜面目: 4分譜面出力データ
  dos5_1Initial: `|left_data=200,226,251,277,303,329,354,380,406,431,457,483,509,534,560,586,611,637,663,689,714,740,766,791,817,843,869,894,920,946,971,997,1023,1049,1074,1100,1126,1151,1177,1203,1229,1254,1280,1306,1331,1357,1383,1409,1434,1460,1486,1511,1537,1563,1589,1614,1640,1666,1691,1717,1743,1769,1794,1820,1846,1871,1897,1923,1949,1974,2000,2026,2051,2077,2103,2129,2154,2180,2206,2231,2257,2283,2309,2334,2360,2386,2411,2437,2463,2489,2514,2540,2566,2591,2617,2643,2669,2694,2720,2746,2771,2797,2823,2849,2874,2900,2926,2951,2977,3003,3029,3054,3080,3106,3131,3157,3183,3209,3234,3260,3286,3311,3337,3363,3389,3414,3440,3466,3491,3517,3543,3569,3594,3620,3646,3671,3697,3723,3749,3774,3800,3826,3851,3877,3903,3929,3954,3980,4006,4031,4057,4083,4109,4134,4160,4186,4211,4237,4263,4289|down_data=|up_data=|right_data=|space_data=|frzLeft_data=|frzDown_data=|frzUp_data=|frzRight_data=|frzSpace_data=|
|speed_data=|boost_data=|
|es_keyKind=5|es_blankFrame=200|es_label=1|es_startNumber=0|es_bpm=140|es_scoreNumber=1|es_scorePrefix=|
`,
};
