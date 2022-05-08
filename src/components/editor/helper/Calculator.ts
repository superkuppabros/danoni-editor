import { Timing } from "@/model/Timing";
import { fps, quarterInterval, verticalSizeNum } from "../EditorConstant";

export function positionToFrame(timing: Timing, page: number, position: number, blankFrame = 0): number {
  const framePerPosition = (60 * fps) / quarterInterval / timing.bpm;
  const startFrame = blankFrame + timing.startNum + (page - timing.label) * verticalSizeNum * framePerPosition;
  return startFrame + position * framePerPosition;
}

export function frameToPagePosition(timing: Timing, frame: number, blankFrame: number): { page: number; position: number } {
  const framePerPosition = (60 * fps) / quarterInterval / timing.bpm;

  const rawPosition = Math.round((frame - blankFrame - timing.startNum) / framePerPosition);
  // 小数の誤差補正、奇数のノーツが補正されてしまうが多いケースをカバーしにいく
  let adjustedPosition: number = rawPosition;
  if (rawPosition % 4 == 1) adjustedPosition = rawPosition - 1;
  else if (rawPosition % 4 == 3) adjustedPosition = rawPosition + 1;

  const page = Math.floor(adjustedPosition / verticalSizeNum) + timing.label;
  const position = adjustedPosition % verticalSizeNum;

  return { page, position };
}

export function positionToSeconds(timing: Timing, page: number, position: number, blankFrame = 0): number {
  return positionToFrame(timing, page, position, blankFrame) / fps;
}

export function secondsToTimeStr(seconds: number): string {
  const mm = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  const ss = sec < 10 ? `0${sec}` : `${sec}`;
  return `${mm}:${ss}`;
}
