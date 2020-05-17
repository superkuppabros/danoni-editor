import { KeyKind } from "./KeyKind";

export type KeyConfig = {
  [keyKind in KeyKind]: {
    num: Number
    code: KeyboardEvent["code"];
  }
};
