import { KeyKind } from "./KeyKind";

export type KeyConfig = {
  [keyKind in KeyKind]: {
    num: number;
    keys: string[];
  };
};

export const DefaultKeyConfig: KeyConfig = {
  "5": {
    num: 5,
    keys: ["KeyJ", "KeyK", "KeyI", "KeyL", "KeyF"]
  },
  "7": {
    num: 7,
    keys: ["KeyS", "KeyD", "KeyF", "KeyG", "KeyJ", "KeyK", "KeyL"]
  },
  "11": {
    num: 11,
    keys: ["KeyS", "KeyD", "KeyF", "KeyG", "KeyJ", "KeyK", "KeyL", "KeyU", "KeyI", "Digit8", "KeyO"]
  }
}
