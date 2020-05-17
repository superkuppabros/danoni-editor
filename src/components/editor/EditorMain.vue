<template>
  <div id="canvas"></div>
</template>

<script>
import Konva from "konva";
export default {
  name: "EditorMain",
  mounted: function() {
    const keyNum = 17;
    const noteWidth = 30;
    const verticalSizeNum = 768;
    const editorWidth = noteWidth * keyNum;
    const editorHeight = verticalSizeNum / 2;
    const divisor = 24;

    const stage = new Konva.Stage({
      container: "canvas",
      width: editorWidth + 40,
      height: editorHeight + 40,
    });

    const layer = new Konva.Layer();

    for (let i = 0; i < keyNum; i++) {
      const xPos = (i + 1) * noteWidth;
      const line = new Konva.Line({
        x: 20,
        y: 20,
        points: [xPos, 0, xPos, editorHeight],
        stroke: "#969696",
        strokeWidth: 0.5,
      });
      layer.add(line);

      if (i % 2 == 1) {
        const filler = new Konva.Rect({
          x: 20 + xPos - noteWidth,
          y: 20,
          width: noteWidth,
          height: editorHeight,
          fill: "lightblue",
          strokeWidth: 0,
        });
        layer.add(filler)
      }
    }

    for (let i = 0; i < verticalSizeNum / divisor; i++) {
      const yPos = ((i + 1) * divisor) / 2;
      const line = new Konva.Line({
        x: 20,
        y: 20,
        points: [0, yPos, editorWidth, yPos],
        stroke: "#969696",
        strokeWidth: (divisor * (i + 1)) % 96 == 0 ? 1 : 0.5,
      });
      layer.add(line);
    }

    const rect = new Konva.Rect({
      x: 20,
      y: 20,
      width: editorWidth,
      height: editorHeight,
      stroke: "black",
      strokeWidth: 1,
    });
    layer.add(rect);

    stage.add(layer);
  },
};
</script>
