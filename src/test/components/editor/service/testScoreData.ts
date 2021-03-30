import { ScoreData } from "@/model/ScoreData";
import { cloneDeep } from "lodash";

export const testScoreData: ScoreData = {
  keyKind: "5",
  blankFrame: 200,
  timings: [
    {
      label: 1,
      startNum: 0,
      bpm: 180
    },
    {
      label: 3,
      startNum: 240,
      bpm: 120
    }
  ],
  scoreNumber: 1,
  scores: [
    {
      notes: [[0], [], [96], [], []],
      freezes: [[], [], [], [192], []],
      speeds: []
    },
    {
      notes: [[], [0, 48], [96], [], []],
      freezes: [[], [], [], [0], []],
      speeds: [
        { position: 0, value: 1.1, type: "speed" },
        { position: 96, value: 0.8, type: "boost" }
      ]
    },
    {
      notes: [[], [], [], [], [0, 96]],
      freezes: [[], [], [], [], []],
      speeds: [{ position: 0, value: 0.7, type: "speed" }]
    }
  ]
};

export const test2ScoreData: ScoreData = (() => {
  const scoreData = cloneDeep(testScoreData);
  scoreData.scoreNumber = 2;
  return scoreData;
})();

export const testDosData = `|left_data=200|down_data=360,380|up_data=240,400|right_data=|space_data=440,500|frzLeft_data=|frzDown_data=|frzUp_data=|frzRight_data=280,360|frzSpace_data=|
|speed_data=360,1.1,440,0.7|boost_data=400,0.8|
|es_keyKind=5|es_blankFrame=200|es_label=1,3|es_startNumber=0,240|es_bpm=180,120|es_scoreNumber=1|
`;

export const test2DosData = `|left2_data=200|down2_data=360,380|up2_data=240,400|right2_data=|space2_data=440,500|frzLeft2_data=|frzDown2_data=|frzUp2_data=|frzRight2_data=280,360|frzSpace2_data=|
|speed2_data=360,1.1,440,0.7|boost2_data=400,0.8|
|es_keyKind=5|es_blankFrame=200|es_label=1,3|es_startNumber=0,240|es_bpm=180,120|es_scoreNumber=2|
`;
