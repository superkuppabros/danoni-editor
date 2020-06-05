import { Speed } from "./Speed";

export interface PageScore {
  notes: number[][];
  freezes: number[][];
  speeds: Speed[];
}

export class DefaultPageScore implements PageScore {
  constructor(private keyNum: number) {}

  notes = new Array(this.keyNum).fill([]).map(() => []);
  freezes = new Array(this.keyNum).fill([]).map(() => []);
  speeds = [];
}
