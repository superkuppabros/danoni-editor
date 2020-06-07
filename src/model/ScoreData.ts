import { Timing } from "./Timing";
import { PageScore, DefaultPageScore } from "./PageScore";

export interface ScoreData {
  blankFrame: number;
  timings: Timing[];
  scores: PageScore[];
}

export class DefaultScoreData implements ScoreData {
  constructor(private keyNum: number) {}

  blankFrame = 200;

  timings: Timing[] = [
    {
      label: 1,
      startNum: 0,
      bpm: 140
    }
  ];

  scores: PageScore[] = [new DefaultPageScore(this.keyNum)];
}
