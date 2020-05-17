import { KeyKind } from "./KeyKind";

export interface ScoreStructure {
  keyType: KeyKind;
  musicFile: Blob;
  scoreFile?: Blob;
}
