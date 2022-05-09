import { Operation } from "@/model/OperationQueue";
import { NoteService } from "../service/NoteService";
import { PageScoreService } from "../service/PageScoreService";

/* eslint @typescript-eslint/no-non-null-assertion: 0 */

export function undo(
  operationStack: Operation[],
  noteService: NoteService,
  pageScoreService: PageScoreService
): { undoPage?: number; undoPosition?: number } {
  const operation = operationStack.pop();
  if (!operation) return {};

  switch (operation.type) {
    case "ADD_NOTE":
      noteService.remove(operation.page!, operation.lane!, operation.position!);
      break;
    case "REMOVE_NOTE":
      noteService.add(operation.page!, operation.lane!, operation.position!, operation.isFreeze!);
      break;
    case "REMOVE_ON_POSITION":
      noteService.addOnPosition(operation.page!, operation.position!, operation.removedLanes!);
      break;
    case "SHIFT":
      noteService.addOnPosition(operation.page!, operation.position!, operation.movedLanes!);
      noteService.removeLanes(operation.newPage!, operation.newPosition!);
      noteService.addOnPosition(operation.newPage!, operation.newPosition!, operation.originalLanes!);
      break;
    case "CUT":
      pageScoreService.write(operation.page!, operation.copyScoreStore!);
      break;
    case "PASTE":
      pageScoreService.write(operation.page!, operation.originalPageScore!);
      break;
    case "ADD_PAGE":
      pageScoreService.remove(operation.page!);
      break;
    case "REMOVE_PAGE":
      pageScoreService.insert(operation.page!, operation.copyScoreStore!);
      break;
  }

  return {
    undoPage: operation.page,
    undoPosition: operation.position || 0,
  };
}
