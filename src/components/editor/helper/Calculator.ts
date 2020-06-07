import { Timing } from "@/model/Timing";
import { fps, quarterInterval, verticalSizeNum } from "../EditorConstant";

export function positionToFrame(
  timing: Timing,
  page: number,
  position: number,
  blankFrame = 0
): number {
  const framePerPosition = (60 * fps) / quarterInterval / timing.bpm;
  const startFrame =
    blankFrame +
    timing.startNum +
    (page - timing.label) * verticalSizeNum * framePerPosition;
  return startFrame + position * framePerPosition;
}

export function positionToSeconds(
  timing: Timing,
  page: number,
  position: number,
  blankFrame = 0
): number {
  return positionToFrame(timing, page, position, blankFrame) / fps;
}

export function secondsToTimeStr(seconds: number): string {
  const mm = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  const ss = sec < 10 ? `0${sec}` : `${sec}`;
  return `${mm}:${ss}`;
}
