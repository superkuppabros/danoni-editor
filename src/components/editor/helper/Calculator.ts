import { Timing } from "@/model/Timing";
import { fps, quarterInterval, verticalSizeNum } from "../EditorConstant";

export function positionToFrame(timing: Timing, page: number, position: number, pageBlockNum: number, blankFrame = 0): number {
  const framePerPosition = (60 * fps) / quarterInterval / timing.bpm;
  const startFrame = blankFrame + timing.startNum + (page - timing.label) * verticalSizeNum(pageBlockNum) * framePerPosition;
  return startFrame + position * framePerPosition;
}

export function frameToPagePosition(
  timing: Timing,
  frame: number,
  pageBlockNum: number,
  blankFrame: number
): { page: number; position: number } {
  const framePerPosition = (60 * fps) / quarterInterval / timing.bpm;

  const rawPosition = (frame - blankFrame - timing.startNum) / framePerPosition;
  // 小数の誤差補正 4=>48分で補正するため、32分はうまく補正されない確率が高い
  let adjustedPosition: number = Math.round(rawPosition);
  if (adjustedPosition % 4 == 1) adjustedPosition -= 1;
  else if (adjustedPosition % 4 == 3) adjustedPosition += 1;
  // 48分より4分、16分を優先する
  else if (adjustedPosition % 12 == 2) adjustedPosition -= 2;
  else if (adjustedPosition % 12 == 10) adjustedPosition += 2;

  const page = Math.floor(adjustedPosition / verticalSizeNum(pageBlockNum)) + timing.label;
  const position = adjustedPosition % verticalSizeNum(pageBlockNum);

  return { page, position };
}

export function positionToSeconds(timing: Timing, page: number, position: number, pageBlockNum: number, blankFrame = 0): number {
  return positionToFrame(timing, page, position, pageBlockNum, blankFrame) / fps;
}

export function secondsToTimeStr(seconds: number): string {
  const mm = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  const ss = sec < 10 ? `0${sec}` : `${sec}`;
  return `${mm}:${ss}`;
}
