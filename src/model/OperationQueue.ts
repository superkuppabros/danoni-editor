import { NoteOnPosition } from "@/components/editor/service/NoteService";
import { PageScore } from "./PageScore";

export type Operation = {
  type: OperationType;
  page?: number;
  newPage?: number;
  position?: number;
  newPosition?: number;
  isFreeze?: boolean;
  lane?: number;
  removedLanes?: NoteOnPosition[];
  movedLanes?: NoteOnPosition[];
  originalLanes?: NoteOnPosition[];
  copyScoreStore?: PageScore;
};

export type OperationType =
  | "ADD_NOTE"
  | "REMOVE_NOTE"
  | "REMOVE_ON_POSITION"
  | "SHIFT"
  | "CUT"
  | "PASTE"
  | "ADD_PAGE"
  | "REMOVE_PAGE";
