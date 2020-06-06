import { Timing } from "./Timing";
import { PageScore, DefaultPageScore } from "./PageScore";

export interface ScoreData {
  timings: Timing[];
  scores: PageScore[];
}

export class DefaultScoreData implements ScoreData {
  constructor(private keyNum: number) {}

  timings: Timing[] = [
    {
      label: 1,
      firstNum: 200,
      bpm: 140
    }
  ];

  scores: PageScore[] = [new DefaultPageScore(this.keyNum)];
}
