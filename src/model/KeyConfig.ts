import { KeyKind } from "./KeyKind";

export type KeyConfig = {
  [keyKind in KeyKind]: {
    num: number;
    keys: string[];
    noteNames: string[];
    freezeNames: string[];
  };
};

export const DefaultKeyConfig: KeyConfig = {
  "5": {
    num: 5,
    keys: ["KeyJ", "KeyK", "KeyI", "KeyL", "KeyF"],
    noteNames: [
      "left_data",
      "down_data",
      "up_data",
      "right_data",
      "space_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzDown_data",
      "frzUp_data",
      "frzRight_data",
      "frzSpace_data"
    ]
  },
  "7": {
    num: 7,
    keys: ["KeyS", "KeyD", "KeyF", "KeyG", "KeyJ", "KeyK", "KeyL"],
    noteNames: [
      "left_data",
      "leftdia_data",
      "down_data",
      "space_data",
      "up_data",
      "rightdia_data",
      "right_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzLeftdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRightdia_data",
      "frzRight_data"
    ]
  },
  "11": {
    num: 11,
    keys: [
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyK",
      "KeyL",
      "KeyU",
      "KeyI",
      "Digit8",
      "KeyO"
    ],
    noteNames: [
      "left_data",
      "leftdia_data",
      "down_data",
      "space_data",
      "up_data",
      "rightdia_data",
      "right_data",
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzLeftdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRightdia_data",
      "frzRight_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data"
    ]
  }
};
