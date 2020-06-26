import { Speed } from "./Speed";

export interface PageScore {
  notes: number[][];
  freezes: number[][];
  speeds: Speed[];
}

export class DefaultPageScore implements PageScore {
  notes: number[][];
  freezes: number[][];

  constructor(keyNum: number) {
    this.notes = new Array(keyNum).fill([]).map(() => []);
    this.freezes = new Array(keyNum).fill([]).map(() => []);
  }

  speeds = [];
}
