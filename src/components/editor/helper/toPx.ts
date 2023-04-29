import { verticalSizeNum } from "../EditorConstant";

export default function toPx(pos: number, isReverse: boolean, pageBlockNum: number): number {
  return isReverse ? pos : verticalSizeNum(pageBlockNum) - pos;
}
