import { editorHeight } from "../EditorConstant";

export default function toPx(pos: number, isReverse: boolean): number {
  return isReverse ? pos : editorHeight - pos;
}
