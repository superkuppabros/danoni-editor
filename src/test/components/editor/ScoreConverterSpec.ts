import { ScoreConverter, FrameData } from "@/components/editor/ScoreConverter";
import { KeyKind } from "@/model/KeyKind";
import { KeyConfig, DefaultKeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";

describe("scoreConverter", () => {
  const keyKind: KeyKind = "5";
  const keyConfig: KeyConfig = DefaultKeyConfig;
  const scoreConverter = new ScoreConverter(keyKind, keyConfig);
  const scoreData: ScoreData = {
    timings: [
      {
        label: 1,
        firstNum: 200,
        bpm: 180
      }
    ],
    scores: [
      {
        notes: [[0], [], [96], [], []],
        freezes: [[], [], [], [192], []]
      },
      {
        notes: [[], [0, 48], [96], [], []],
        freezes: [[], [], [], [0], []]
      }
    ]
  };

  it("frameDataへの変換が正しく出来る", () => {
    const expectedFrameData: FrameData[] = [
      {
        notes: [[200], [], [240], [], []],
        freezes: [[], [], [], [280], []]
      },
      {
        notes: [[], [360, 380], [400], [], []],
        freezes: [[], [], [], [360], []]
      }
    ];

    expect(scoreConverter.toFrameData(scoreData)).toStrictEqual(
      expectedFrameData
    );
  });

  it("dosの出力が正しく出来る", () => {
    const expectedData =
      "|left_data=200|down_data=360,380|up_data=240,400|right_data=|space_data=|frzLeft_data=|frzDown_data=|frzUp_data=|frzRight_data=280,360|frzSpace_data=|";
    expect(scoreConverter.convert(scoreData)).toBe(expectedData);
  });
});
