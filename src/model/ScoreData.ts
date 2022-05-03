import { Timing } from "./Timing";
import { PageScore, DefaultPageScore } from "./PageScore";
import { CustomKeyKind } from "./KeyKind";

export interface ScoreData {
  keyKind?: CustomKeyKind;
  blankFrame: number;
  timings: Timing[];
  scoreNumber?: number;
  scores: PageScore[];
}

export class DefaultScoreData implements ScoreData {
  keyKind?: CustomKeyKind;
  scores: PageScore[];

  constructor(keyNum: number) {
    this.scores = [new DefaultPageScore(keyNum)];
  }

  blankFrame = 200;

  timings: Timing[] = [
    {
      label: 1,
      startNum: 0,
      bpm: 140,
    },
  ];

  scoreNumber = 1;
}
