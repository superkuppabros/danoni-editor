import { Timing } from "./Timing";
import { PageScore } from "./PageScore";

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

  scores: PageScore[] = [
    {
      notes: new Array(this.keyNum).fill([]).map(() => []),
      freezes: new Array(this.keyNum).fill([]).map(() => [])
    }
  ];
}
