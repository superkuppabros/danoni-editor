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
    keys: ["j", "k", "i", "l", " "]
  },
  "7": {
    num: 7,
    keys: ["s", "d", "f", "g", "j", "k", "l"]
  },
  "11": {
    num: 11,
    keys: ["s", "d", "f", "g", "j", "k", "l", "u", "i", "8", "o"]
  }
}
