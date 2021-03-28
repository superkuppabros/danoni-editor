import { ScoreData } from "@/model/ScoreData";

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

export const testDosData = `|left_data=200|down_data=360,380|up_data=240,400|right_data=|space_data=440,500|frzLeft_data=|frzDown_data=|frzUp_data=|frzRight_data=280,360|frzSpace_data=|
|speed_data=360,1.1,440,0.7|boost_data=400,0.8|
|keyKind=5|blankFrame=200|label=1,3|startNumber=0,240|bpm=180,120|scoreNumber=1|
`;
