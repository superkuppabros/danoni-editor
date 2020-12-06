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
