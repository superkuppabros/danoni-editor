<template>
  <div
    id="canvas"
    ref="canvas"
    tabindex="-1"
    @keydown.prevent="keydownAction"
  ></div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Konva from "konva";
import { DefaultKeyConfig, KeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { KeyKind } from "@/model/KeyKind";
import { PageScore } from "@/model/PageScore";
import {
  noteWidth,
  editorHeight,
  verticalSizeNum,
  quarterInterval,
  noteHeight,
  canvasMargin,
  freezeColors,
  noteColors,
  laneColors,
  fps
} from "./EditorConstant";
import { Timing } from "../../model/Timing";
import { MusicPlayer } from "./MusicPlayer";

type DataType = {
  currentPosition: number;
  scoreData: ScoreData;
  keyConfig: KeyConfig;
  divisor: number;
  keyKind: KeyKind;
  keyNum: number;
  page: number;
  editorWidth: number;
  musicTimer: number | null;
  musicPlayer: MusicPlayer;
  stage?: Konva.Stage;
  baseLayer?: Konva.Layer;
  notesLayer?: Konva.Layer;
  currentPositionLayer?: Konva.Layer;
  // audio: HTMLAudioElement;
};

export default Vue.extend({
  name: "EditorMain",
  props: {
    pageNum: Number,
    loadScoreData: { type: Object as PropType<ScoreData> },
    loadMusicUrl: String,
    selectedKey: String,
    timing: { type: Object as PropType<Timing> }
  },
  data(): DataType {
    const keyKind = this.selectedKey as KeyKind;
    const keyConfig = DefaultKeyConfig;
    const audio = new Audio(this.loadMusicUrl);

    return {
      currentPosition: 0,
      scoreData: this.loadScoreData,
      keyConfig: keyConfig,
      divisor: 24,
      keyKind: keyKind,
      page: 1,
      keyNum: keyConfig[keyKind].num,
      editorWidth: noteWidth * keyConfig[keyKind].num,
      musicPlayer: new MusicPlayer(audio),
      musicTimer: null
      // audio: audio
    };
  },
  methods: {
    // ベースレイヤーの描画
    baseLayerDraw(): void {
      const divisor = this.divisor;
      const keyNum = this.keyNum;
      const editorWidth = this.editorWidth;

      const stage = this.stage as Konva.Stage;
      const baseLayer = this.baseLayer as Konva.Layer;
      const notesLayer = this.notesLayer as Konva.Layer;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;

      baseLayer.destroyChildren();

      // 縦罫線の描画
      for (let lane = 0; lane < keyNum; lane++) {
        const xPos = (lane + 1) * noteWidth;

        const colorGroup = this.keyConfig[this.keyKind].colorGroup;
        const color = laneColors[colorGroup[lane]];

        const filler = new Konva.Rect({
          x: xPos - noteWidth,
          width: noteWidth,
          height: editorHeight,
          fill: color,
          strokeWidth: 0
        });
        baseLayer.add(filler);

        const line = new Konva.Line({
          points: [xPos, 0, xPos, editorHeight],
          stroke: "#969696",
          strokeWidth: 0.5
        });
        baseLayer.add(line);
      }

      // 横罫線の描画
      for (let i = 0; i < verticalSizeNum / divisor; i++) {
        const yPos = (i + 1) * divisor;
        const line = new Konva.Line({
          points: [0, yPos, editorWidth, yPos],
          stroke: "#969696",
          strokeWidth: (divisor * (i + 1)) % quarterInterval == 0 ? 1 : 0.5
        });
        baseLayer.add(line);
      }

      // 枠線の描画
      const rect = new Konva.Rect({
        width: editorWidth,
        height: editorHeight,
        stroke: "black",
        strokeWidth: 1
      });
      baseLayer.add(rect);

      stage.add(baseLayer);
      stage.add(notesLayer);
      stage.add(currentPositionLayer);
    },

    // 現在位置の描画
    currentPositionDraw(): void {
      const stage = this.stage as Konva.Stage;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;
      currentPositionLayer.destroyChildren();

      const currentPositionLine = new Konva.Line({
        y: editorHeight - this.currentPosition,
        points: [0, 0, this.editorWidth, 0],
        stroke: "#d8d800",
        strokeWidth: 1.75
      });
      currentPositionLayer.add(currentPositionLine);
      stage.add(currentPositionLayer);
    },

    // 現在位置の移動アニメーション
    currentPositionAnimation() {
      console.log("hoge");
    },

    // ノーツの有無の判定
    hasNote(page: number, lane: number, position: number): boolean {
      const pageScore = this.scoreData.scores[this.page - 1];
      return (
        pageScore.notes[lane].includes(position) ||
        pageScore.freezes[lane].includes(position)
      );
    },

    // ノーツの追加
    noteAdd(
      page: number,
      lane: number,
      position: number,
      isFreeze: boolean
    ): void {
      if (isFreeze)
        this.scoreData.scores[page - 1].freezes[lane].push(position);
      else this.scoreData.scores[page - 1].notes[lane].push(position);
    },

    // ノーツの削除
    noteRemove(page: number, lane: number, position: number): void {
      this.scoreData.scores[page - 1].freezes[lane] = this.scoreData.scores[
        page - 1
      ].freezes[lane].filter(pos => pos !== position);
      this.scoreData.scores[page - 1].notes[lane] = this.scoreData.scores[
        page - 1
      ].notes[lane].filter(pos => pos !== position);
    },

    // ノーツの描画
    noteDraw(lane: number, position: number, isFreeze: boolean): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;
      const colorGroup = this.keyConfig[this.keyKind].colorGroup;

      const color = ((lane: number, isFreeze: boolean) => {
        if (isFreeze) {
          return freezeColors[colorGroup[lane]];
        } else {
          return noteColors[colorGroup[lane]];
        }
      })(lane, isFreeze);

      const note = new Konva.Rect({
        x: lane * noteWidth,
        y: editorHeight - position - noteHeight / 2,
        width: noteWidth,
        height: noteHeight,
        fill: color,
        id: `note-${lane}-${position}`
      });
      notesLayer.add(note);
      stage.add(notesLayer);
    },

    // ノーツのクリア
    noteClear(lane: number, position: number): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;

      const note = notesLayer.findOne(`#note-${lane}-${position}`);
      note.destroy();
      stage.add(notesLayer);
    },

    // 譜面データのページ反映
    displayPageScore(page: number): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;

      const pageScore = this.scoreData.scores[page - 1];

      notesLayer.destroyChildren();
      stage.add(notesLayer);

      pageScore.notes.forEach((laneArr, lane) => {
        laneArr.forEach(position => {
          this.noteDraw(lane, position, false);
        });
      });
      pageScore.freezes.forEach((laneArr, lane) => {
        laneArr.forEach(position => {
          this.noteDraw(lane, position, true);
        });
      });
    },

    // 現在位置移動
    currentPositionMove(position: number) {
      this.currentPosition = position;
      this.currentPositionDraw();
    },

    // ページ遷移
    pageMove(page: number): void {
      this.page = page;
      this.currentPositionMove(0);

      const pageScore: PageScore = this.scoreData.scores[page - 1];
      if (pageScore === undefined) {
        this.scoreData.scores[page - 1] = {
          notes: new Array(this.keyNum).fill([]).map(() => []),
          freezes: new Array(this.keyNum).fill([]).map(() => [])
        };
      }
      this.displayPageScore(page);
    },
    pageMinus(n: number): void {
      this.$emit("page-minus", n);
      Math.max(1, this.page - n);
      this.pageMove(this.page);
    },
    pagePlus(n: number): void {
      this.$emit("page-plus", n);
      this.page += n;
      this.pageMove(this.page);
    },

    // 移動間隔変更
    changeDivisor(divisor: number) {
      this.divisor = divisor;
      if (this.currentPosition % divisor !== 0) {
        this.currentPositionMove(
          Math.floor(this.currentPosition / divisor) * divisor
        );
      }
      this.baseLayerDraw();
    },

    // キーを押したときの挙動
    keydownAction(e: KeyboardEvent): void {
      if (e.ctrlKey) {
        switch (e.code) {
          case "Digit1":
            this.changeDivisor(quarterInterval);
            break;
          case "Digit2":
            this.changeDivisor(quarterInterval / 2);
            break;
          case "Digit3":
            this.changeDivisor(quarterInterval / 4);
            break;
          case "Digit4":
            this.changeDivisor(quarterInterval / 3);
            break;
          case "Digit5":
            this.changeDivisor(quarterInterval / 6);
            break;
          case "Digit6":
            this.changeDivisor(quarterInterval / 12);
            break;
          case "Digit7":
            this.changeDivisor(quarterInterval / 8);
            break;
        }
      } else {
        switch (e.code) {
          case "Enter": {
            if (!this.musicTimer) {
              // 再生処理
              const timing = this.timing;
              const secondsPerPage =
                (60 / quarterInterval / timing.bpm) * verticalSizeNum;
              const bufferNum = 0.25; // 2拍分
              const durationNum = 2; // 8拍分
              const firstSeconds =
                timing.firstNum / fps +
                (this.pageNum - timing.label) * secondsPerPage;
              const startTime = firstSeconds - bufferNum * secondsPerPage;
              const endTime = firstSeconds + durationNum * secondsPerPage;
              console.log(startTime, endTime);

              const loop = (startTime: number, endTime: number) => {
                const playDuration = (endTime - startTime) * 1000;
                this.musicPlayer.play(startTime);
                if (this.musicTimer) {
                  const timer: number = setTimeout(() => {
                    loop(startTime, endTime);
                  }, playDuration);
                  this.musicTimer = timer;
                }
              };

              this.musicTimer = 1;
              loop(startTime, endTime);
            } else {
              // 停止処理
              this.musicPlayer.pause(this.musicTimer);
              this.musicTimer = null;
            }
            break;
          }
          case "Space":
            this.currentPosition += this.divisor;
            if (this.currentPosition >= verticalSizeNum) this.pagePlus(1);
            else this.currentPositionMove(this.currentPosition);
            break;
          case "ArrowUp":
            this.currentPosition += this.divisor;
            if (this.currentPosition >= verticalSizeNum) this.pagePlus(1);
            else this.currentPositionMove(this.currentPosition);
            break;
          case "ArrowDown":
            this.currentPosition -= this.divisor;
            if (this.currentPosition < 0) {
              if (this.page === 1) this.currentPosition = 0;
              else this.pageMinus(1);
            } else this.currentPositionMove(this.currentPosition);
            break;
          case "ArrowLeft":
            if (e.shiftKey) this.pageMinus(5);
            else this.pageMinus(1);
            break;
          case "ArrowRight":
            if (e.shiftKey) this.pagePlus(5);
            else this.pagePlus(1);
            break;
          default: {
            const possiblyLane = this.keyConfig[this.keyKind].keys.indexOf(
              e.code
            );
            const isFreeze = e.shiftKey;

            if (possiblyLane >= 0) {
              if (this.hasNote(this.page, possiblyLane, this.currentPosition)) {
                this.noteRemove(this.page, possiblyLane, this.currentPosition);
                this.noteClear(possiblyLane, this.currentPosition);
              } else {
                this.noteAdd(
                  this.page,
                  possiblyLane,
                  this.currentPosition,
                  isFreeze
                );
                this.noteDraw(possiblyLane, this.currentPosition, isFreeze);
              }

              this.currentPosition += this.divisor;
              if (this.currentPosition >= verticalSizeNum) this.pagePlus(1);
              else this.currentPositionMove(this.currentPosition);
            }
            break;
          }
        }
      }
    }
  },

  mounted(): void {
    const stage = new Konva.Stage({
      x: canvasMargin,
      y: canvasMargin,
      container: "canvas",
      width: this.editorWidth + canvasMargin * 2,
      height: editorHeight + canvasMargin * 2
    });
    const baseLayer = new Konva.Layer({
      container: "baseLayer"
    });
    const currentPositionLayer = new Konva.Layer({
      container: "currentPositionLayer"
    });
    const notesLayer = new Konva.Layer({
      container: "notesLayer"
    });

    this.stage = stage;
    this.baseLayer = baseLayer;
    this.currentPositionLayer = currentPositionLayer;
    this.notesLayer = notesLayer;

    this.baseLayerDraw();
    this.currentPositionDraw();
    this.displayPageScore(1);
  },

  watch: {
    pageNum(newPage: number): void {
      this.pageMove(newPage);
    },

    scoreData(scoreData: ScoreData): void {
      this.$emit("changeScoreData", scoreData);
    }
  }
});
</script>
