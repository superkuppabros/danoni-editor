import { KeyKind } from "./KeyKind";

export type KeyConfig = {
  [keyKind in KeyKind]: {
    id: number;
    num: number;
    keys: string[];
    noteNames: string[];
    freezeNames: string[];
  };
};

export const DefaultKeyConfig: KeyConfig = {
  "5": {
    id: 1,
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
    id: 2,
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
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data"
    ]
  },

  "7i": {
    id: 3,
    num: 7,
    keys: ["KeyS", "KeyD", "KeyF", "KeyJ", "KeyK", "KeyI", "KeyL"],
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
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data"
    ]
  },

  "8": {
    id: 4,
    num: 8,
    keys: ["KeyS", "KeyD", "KeyF", "KeyG", "KeyJ", "KeyK", "KeyL", "Semicolon"],
    noteNames: [
      "left_data",
      "leftdia_data",
      "down_data",
      "space_data",
      "up_data",
      "rightdia_data",
      "right_data",
      "sleft_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data",
      "sfrzLeft_data"
    ]
  },

  "9A": {
    id: 5,
    num: 9,
    keys: [
      "KeyS",
      "KeyD",
      "KeyE",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyK",
      "KeyI",
      "KeyL"
    ],
    noteNames: [
      "left_data",
      "down_data",
      "up_data",
      "right_data",
      "space_data",
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzDown_data",
      "frzUp_data",
      "frzRight_data",
      "frzSpace_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data"
    ]
  },

  "9B": {
    id: 6,
    num: 9,
    keys: [
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyK",
      "KeyL",
      "Semicolon"
    ],
    noteNames: [
      "left_data",
      "down_data",
      "up_data",
      "right_data",
      "space_data",
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzDown_data",
      "frzUp_data",
      "frzRight_data",
      "frzSpace_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data"
    ]
  },

  "9i": {
    id: 7,
    num: 9,
    keys: [
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyK",
      "KeyI",
      "KeyL"
    ],
    noteNames: [
      "left_data",
      "down_data",
      "up_data",
      "right_data",
      "space_data",
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzDown_data",
      "frzUp_data",
      "frzRight_data",
      "frzSpace_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data"
    ]
  },

  "11": {
    id: 8,
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
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data"
    ]
  },

  "11L": {
    id: 9,
    num: 11,
    keys: [
      "KeyW",
      "KeyE",
      "Digit3",
      "KeyR",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyK",
      "KeyL"
    ],
    noteNames: [
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data",
      "left_data",
      "leftdia_data",
      "down_data",
      "space_data",
      "up_data",
      "rightdia_data",
      "right_data"
    ],
    freezeNames: [
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data",
      "frzLeft_data",
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data"
    ]
  },

  "11W": {
    id: 10,
    num: 11,
    keys: [
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyK",
      "KeyL",
      "Digit2",
      "KeyT",
      "KeyY",
      "Digit0"
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
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data"
    ]
  },

  "11i": {
    id: 11,
    num: 11,
    keys: [
      "KeyS",
      "KeyC",
      "KeyD",
      "KeyE",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyM",
      "KeyK",
      "KeyI",
      "KeyL"
    ],
    noteNames: [
      "left_data",
      "down_data",
      "gor_data",
      "up_data",
      "right_data",
      "space_data",
      "sleft_data",
      "sdown_data",
      "siyo_data",
      "sup_data",
      "sright_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzDown_data",
      "frzGor_data",
      "frzUp_data",
      "frzRight_data",
      "frzSpace_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzIyo_data",
      "sfrzUp_data",
      "sfrzRight_data"
    ]
  },

  "12": {
    id: 12,
    num: 11,
    keys: [
      "KeyB",
      "KeyN",
      "KeyJ",
      "KeyM",
      "KeyK",
      "Comma",
      "KeyL",
      "Period",
      "KeyU",
      "KeyI",
      "Digit8",
      "KeyO"
    ],
    noteNames: [
      "oni_data",
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
      "foni_data",
      "frzLeft_data",
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data"
    ]
  },

  "13": {
    id: 13,
    num: 11,
    keys: [
      "keyA",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyK",
      "KeyL",
      "Semicolon",
      "KeyU",
      "KeyI",
      "Digit8",
      "KeyO"
    ],
    noteNames: [
      "left_data",
      "down_data",
      "up_data",
      "right_data",
      "space_data",
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data",
      "tleft_data",
      "tdown_data",
      "tup_data",
      "tright_data"
    ],
    freezeNames: [
      "frzLeft_data",
      "frzDown_data",
      "frzUp_data",
      "frzRight_data",
      "frzSpace_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data",
      "tfrzLeft_data",
      "tfrzDown_data",
      "tfrzUp_data",
      "tfrzRight_data"
    ]
  },

  "14": {
    id: 14,
    num: 11,
    keys: [
      "KeyB",
      "KeyN",
      "KeyJ",
      "KeyM",
      "KeyK",
      "Comma",
      "KeyL",
      "Period",
      "KeyY",
      "KeyU",
      "KeyI",
      "Digit8",
      "KeyO",
      "KeyP"
    ],
    noteNames: [
      "oni_data",
      "left_data",
      "leftdia_data",
      "down_data",
      "space_data",
      "up_data",
      "rightdia_data",
      "right_data",
      "sleftdia_data",
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data",
      "srightdia_data"
    ],
    freezeNames: [
      "foni_data",
      "frzLeft_data",
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data",
      "sfrzLdia_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data",
      "sfrzRdia_data"
    ]
  },

  "14i": {
    id: 15,
    num: 14,
    keys: [
      "KeyZ",
      "KeyX",
      "KeyC",
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
      "gor_data",
      "space_data",
      "iyo_data",
      "sleft_data",
      "sleftdia_data",
      "sdown_data",
      "sspace_data",
      "sup_data",
      "srightdia_data",
      "sright_data",
      "left_data",
      "down_data",
      "up_data",
      "right_data"
    ],
    freezeNames: [
      "frzGor_data",
      "frzSpace_data",
      "frzIyo_data",
      "sfrzLeft_data",
      "sfrzLdia_data",
      "sfrzDown_data",
      "sfrzSpace_data",
      "sfrzUp_data",
      "sfrzRdia_data",
      "sfrzRight_data",
      "frzLeft_data",
      "frzDown_data",
      "frzUp_data",
      "frzRight_data"
    ]
  },

  "15": {
    id: 16,
    num: 15,
    keys: [
      "KeyW",
      "KeyE",
      "Digit3",
      "KeyR",
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
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data",
      "left_data",
      "leftdia_data",
      "down_data",
      "space_data",
      "up_data",
      "rightdia_data",
      "right_data",
      "tleft_data",
      "tdown_data",
      "tup_data",
      "tright_data"
    ],
    freezeNames: [
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data",
      "frzLeft_data",
      "frzLdia_data",
      "frzDown_data",
      "frzSpace_data",
      "frzUp_data",
      "frzRdia_data",
      "frzRight_data",
      "tfrzLeft_data",
      "tfrzDown_data",
      "tfrzUp_data",
      "tfrzRight_data"
    ]
  },

  "16i": {
    id: 17,
    num: 16,
    keys: [
      "KeyZ",
      "KeyX",
      "KeyC",
      "keyA",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyJ",
      "KeyK",
      "KeyL",
      "Semicolon",
      "KeyU",
      "KeyI",
      "Digit8",
      "KeyO"
    ],
    noteNames: [
      "gor_data",
      "space_data",
      "iyo_data",
      "sleft_data",
      "sdown_data",
      "sup_data",
      "sright_data",
      "aspace_data",
      "aleft_data",
      "adown_data",
      "aup_data",
      "aright_data",
      "left_data",
      "down_data",
      "up_data",
      "right_data"
    ],
    freezeNames: [
      "frzGor_data",
      "frzSpace_data",
      "frzIyo_data",
      "sfrzLeft_data",
      "sfrzDown_data",
      "sfrzUp_data",
      "sfrzRight_data",
      "afrzSpace_data",
      "afrzLeft_data",
      "afrzDown_data",
      "afrzUp_data",
      "afrzRight_data",
      "frzLeft_data",
      "frzDown_data",
      "frzUp_data",
      "frzRight_data"
    ]
  },

  "17": {
    id: 18,
    num: 17,
    keys: [
      "KeyA",
      "KeyZ",
      "KeyS",
      "KeyX",
      "KeyD",
      "KeyC",
      "KeyF",
      "KeyV",
      "KeyG",
      "KeyN",
      "KeyJ",
      "KeyM",
      "KeyK",
      "Comma",
      "KeyL",
      "Period"
    ],
    noteNames: [
      "aleft_data",
      "bleft_data",
      "adown_data",
      "bdown_data",
      "aup_data",
      "bup_data",
      "aright_data",
      "bright_data",
      "space_data",
      "cleft_data",
      "dleft_data",
      "cdown_data",
      "ddown_data",
      "cup_data",
      "dup_data",
      "cright_data",
      "dright_data"
    ],
    freezeNames: [
      "afrzLeft_data",
      "bfrzLeft_data",
      "afrzDown_data",
      "bfrzDown_data",
      "afrzUp_data",
      "bfrzUp_data",
      "afrzRight_data",
      "bfrzRight_data",
      "frzSpace_data",
      "cfrzLeft_data",
      "dfrzLeft_data",
      "cfrzDown_data",
      "dfrzDown_data",
      "cfrzUp_data",
      "dfrzUp_data",
      "cfrzRight_data",
      "dfrzRight_data"
    ]
  }
};
