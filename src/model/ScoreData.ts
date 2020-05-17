import { Timing } from "./Timing";
import { PageScore } from "./PageScore";

export interface ScoreData {
  timings: Timing[];
  scores: PageScore[];
}
