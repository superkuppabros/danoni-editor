<template>
  <div id="canvas" ref="canvas" tabindex="-1" @keydown.prevent="keydownAction">
    <div id="baseLayer"></div>
    <div id="notesLayer"></div>
    <div id="currentPositionLayer"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Konva from "konva";
import * as Editor from "./EditorConstant";
import { DefaultKeyConfig } from "../../model/KeyConfig";
import { KeyKind } from "../../model/KeyKind";

type DataType = {
  currentPosition: number;
  divisor: number;
  keyKind: KeyKind;
  keyNum: number;
  editorWidth: number;
  stage?: Konva.Stage;
  baseLayer?: Konva.Layer;
  notesLayer?: Konva.Layer;
  currentPositionLayer?: Konva.Layer;
};

export default Vue.extend({
  name: "EditorMain",
  props: {
    initialCurrentPosition: Number,
  },
  data(): DataType {
    return {
      currentPosition: this.initialCurrentPosition,
      divisor: 24,
      keyKind: "7",
      keyNum: DefaultKeyConfig["7"].num,
      editorWidth: Editor.noteWidth * DefaultKeyConfig["7"].num,
    };
  },
  methods: {
    // 初期描画
    initialDraw(): void {
      const divisor = this.divisor;
      const keyNum = this.keyNum;

      const noteWidth = Editor.noteWidth;
      const verticalSizeNum = Editor.verticalSizeNum;
      const editorWidth = this.editorWidth;
      const editorHeight = Editor.editorHeight;

      const stage = this.stage as Konva.Stage;
      const baseLayer = this.baseLayer as Konva.Layer;

      // 縦罫線の描画
      for (let i = 0; i < keyNum; i++) {
        const xPos = (i + 1) * noteWidth;
        const line = new Konva.Line({
          points: [xPos, 0, xPos, editorHeight],
          stroke: "#969696",
          strokeWidth: 0.5,
        });
        baseLayer.add(line);

        if (i % 2 == 1) {
          const filler = new Konva.Rect({
            x: xPos - noteWidth,
            width: noteWidth,
            height: editorHeight,
            fill: "#c3f3ff",
            strokeWidth: 0,
          });
          baseLayer.add(filler);
        }
      }

      // 横罫線の描画
      for (let i = 0; i < verticalSizeNum / divisor; i++) {
        const yPos = (i + 1) * divisor;
        const line = new Konva.Line({
          points: [0, yPos, editorWidth, yPos],
          stroke: "#969696",
          strokeWidth: (divisor * (i + 1)) % Editor.quarterInterval == 0 ? 1 : 0.5,
        });
        baseLayer.add(line);
      }

      // 枠線の描画
      const rect = new Konva.Rect({
        width: editorWidth,
        height: editorHeight,
        stroke: "black",
        strokeWidth: 1,
      });
      baseLayer.add(rect);

      stage.add(baseLayer);
    },

    // 現在位置の描画
    currentPositionDraw(): void {
      const stage = this.stage as Konva.Stage;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;
      currentPositionLayer.destroyChildren();

      const currentPositionLine = new Konva.Line({
        y: Editor.editorHeight - this.currentPosition,
        points: [0, 0, this.editorWidth, 0],
        stroke: "#ff0000",
        strokeWidth: 2,
      });
      currentPositionLayer.add(currentPositionLine);
      stage.add(currentPositionLayer);
    },

    // ノーツの描画
    noteDraw(lane: number, position: number): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;

      const note = new Konva.Rect({
        x: lane * Editor.noteWidth,
        y: Editor.editorHeight - position - Editor.noteHeight / 2,
        width: Editor.noteWidth,
        height: Editor.noteHeight,
        fill: lane % 2 == 0 ? "red" : "blue",
        id: `note-${lane}-${position}`,
      });
      notesLayer.add(note);
      stage.add(notesLayer);
    },

    // キーを押したときの挙動
    keydownAction(e: KeyboardEvent): void {
      console.log(e.key);
      switch (e.key) {
        case "ArrowUp":
          this.currentPosition += this.divisor;
          this.currentPositionDraw();
          break;
        case "ArrowDown":
          this.currentPosition -= this.divisor;
          this.currentPositionDraw();
          break;
        default: {
          const possiblyIndex = DefaultKeyConfig[this.keyKind].keys.indexOf(e.key);
          if (possiblyIndex >= 0) {
            this.noteDraw(possiblyIndex, this.currentPosition);
            this.currentPosition += this.divisor;
            this.currentPositionDraw();
          }
          break;
        }
      }
    },
  },
  mounted(): void {
    const editorHeight = Editor.editorHeight;
    const canvasMargin = Editor.canvasMargin;

    const stage = new Konva.Stage({
      x: canvasMargin,
      y: canvasMargin,
      container: "canvas",
      width: this.editorWidth + canvasMargin * 2,
      height: editorHeight + canvasMargin * 2,
    });
    const baseLayer = new Konva.Layer({
      container: "baseLayer",
    });
    const currentPositionLayer = new Konva.Layer({
      container: "currentPositionLayer",
    });
    const notesLayer = new Konva.Layer({
      container: "notesLayer",
    });

    this.stage = stage;
    this.baseLayer = baseLayer;
    this.currentPositionLayer = currentPositionLayer;
    this.notesLayer = notesLayer;

    this.initialDraw();
    this.currentPositionDraw();
  },
});
</script>
