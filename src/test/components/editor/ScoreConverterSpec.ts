import { ScoreConverter, FrameData } from "@/components/editor/ScoreConverter";
import { KeyKind } from "@/model/KeyKind";
import { KeyConfig, DefaultKeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";

describe("scoreConverter", () => {
  const keyKind: KeyKind = "5";
  const keyConfig: KeyConfig = DefaultKeyConfig;
  const scoreConverter = new ScoreConverter(keyKind, keyConfig);
  const scoreData: ScoreData = {
    adjustment: 0,
    timings: [
      {
        label: 1,
        startNum: 200,
        bpm: 180
      },
      {
        label: 3,
        startNum: 440,
        bpm: 120
      }
    ],
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
    const expectedData = `
|left_data=200|down_data=360,380|up_data=240,400|right_data=|space_data=440,500|frzLeft_data=|frzDown_data=|frzUp_data=|frzRight_data=280,360|frzSpace_data=|
|speed_data=360,1.1,440,0.7|boost_data=400,0.8|`;
    expect(scoreConverter.convert(scoreData)).toBe(expectedData);
  });
});
