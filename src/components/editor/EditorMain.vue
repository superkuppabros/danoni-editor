<template>
  <div id="editor-main">
    <div
      id="canvas"
      ref="canvas"
      tabindex="-1"
      @keydown.prevent="keydownAction"
    ></div>
    <speed-piece
      v-for="(speed, index) in scoreData.scores[page - 1].speeds"
      :key="index"
      :position="speed.position"
    ></speed-piece>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Konva from "konva";
import { DefaultKeyConfig, KeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { KeyKind } from "@/model/KeyKind";
import { PageScore, DefaultPageScore } from "@/model/PageScore";
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
  fps,
  speedChangeWidth
} from "./EditorConstant";
import { Timing } from "../../model/Timing";
import { MusicPlayer } from "./MusicPlayer";
import { SpeedType } from "../../model/Speed";
import SpeedPiece from "./SpeedPiece.vue";

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
  components: { SpeedPiece },
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

      const node = currentPositionLayer.findOne("#currentPosition");
      const currentPositionLine: Konva.Line =
        node instanceof Konva.Line
          ? node.y(editorHeight - this.currentPosition)
          : new Konva.Line({
              y: editorHeight - this.currentPosition,
              points: [0, 0, this.editorWidth, 0],
              stroke: "#d8d800",
              strokeWidth: 1.75,
              id: "currentPosition"
            });
      currentPositionLayer.add(currentPositionLine);
      stage.add(currentPositionLayer);
    },

    // 再生位置の移動アニメーション
    musicPositionAnimation(duration: number) {
      const stage = this.stage as Konva.Stage;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;

      const node = currentPositionLayer.findOne("#musicPosition");
      const currentPositionLine: Konva.Line =
        node instanceof Konva.Line
          ? node.y(editorHeight)
          : new Konva.Line({
              y: editorHeight,
              points: [0, 0, this.editorWidth, 0],
              stroke: "#8000ff",
              strokeWidth: 1.75,
              id: "musicPosition"
            });

      currentPositionLayer.add(currentPositionLine);
      stage.add(currentPositionLayer);

      const tween = new Konva.Tween({
        node: currentPositionLine,
        duration: (duration * 4) / 5 / 1000, // 10拍中の8拍で上まで到達する
        x: 0,
        y: 0
      });

      setTimeout(() => {
        tween.play();
      }, duration / 5);
    },

    // 音楽再生処理
    playMusicLoop(timing: Timing) {
      const secondsPerPage =
        (60 / quarterInterval / timing.bpm) * verticalSizeNum;
      const bufferNum = 0.25; // 2拍分
      const durationNum = 1; // 8拍分
      const firstSeconds =
        timing.firstNum / fps + (this.pageNum - timing.label) * secondsPerPage;
      const startTime = firstSeconds - bufferNum * secondsPerPage;
      const endTime = firstSeconds + durationNum * secondsPerPage;

      const loop = (startTime: number, endTime: number) => {
        const playDuration = (endTime - startTime) * 1000;
        this.musicPlayer.play(startTime);
        this.musicPositionAnimation(playDuration);
        if (this.musicTimer) {
          const timer: number = setTimeout(() => {
            loop(startTime, endTime);
          }, playDuration);
          this.musicTimer = timer;
        }
      };

      this.musicTimer = 1;
      loop(startTime, endTime);
    },

    // 音楽停止処理
    stopMusicLoop(timer: number) {
      const stage = this.stage as Konva.Stage;
      const currentPositionLayer = this.currentPositionLayer as Konva.Layer;
      const node = currentPositionLayer.findOne("#musicPosition");
      node.destroy();
      stage.add(currentPositionLayer);

      this.musicPlayer.pause(timer);
      this.musicTimer = null;
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

    // 速度変化コマの存在判定
    hasSpeedPiece(page: number, position: number): boolean {
      return this.scoreData.scores[page - 1].speeds.some(
        speed => speed.position === position
      );
    },

    // 速度変化コマの追加
    speedPieceAdd(page: number, position: number, type: SpeedType) {
      this.scoreData.scores[page - 1].speeds.push({
        position,
        value: 1.0,
        type
      });
    },

    // 速度変化コマの削除
    speedPieceRemove(page: number, position: number) {
      this.scoreData.scores[page - 1].speeds = this.scoreData.scores[
        page - 1
      ].speeds.filter(speed => speed.position !== position);
    },

    // 速度変化コマの描画
    speedPieceDraw(position: number, type: SpeedType) {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;

      const color = type === "speed" ? "orange" : "purple";
      const radius = 6;
      const triangle = new Konva.RegularPolygon({
        sides: 3,
        radius,
        rotation: 30,
        fill: color,
        x: this.editorWidth + radius,
        y: editorHeight - position,
        id: `speed-${position}`
      });

      notesLayer.add(triangle);
      stage.add(notesLayer);
    },

    // 速度変化コマのクリア
    speedPieceClear(position: number): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;

      const note = notesLayer.findOne(`#speed-${position}`);
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
      pageScore.speeds.forEach(speed => {
        this.speedPieceDraw(speed.position, speed.type);
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

      const pageScore: PageScore = this.scoreData.scores[page - 1];
      if (pageScore === undefined) {
        this.scoreData.scores[page - 1] = new DefaultPageScore(this.keyNum);
      }
      this.displayPageScore(page);
      this.currentPositionMove(0);

      // 音楽再生時に移動すると再生位置を変更する
      if (this.musicTimer) {
        this.stopMusicLoop(this.musicTimer);
        this.playMusicLoop(this.timing);
      }
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
              const timing = this.timing;
              this.playMusicLoop(timing);
            } else {
              const timer = this.musicTimer;
              this.stopMusicLoop(timer);
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
          case "Quote":
            {
              const speedType: SpeedType = e.shiftKey ? "boost" : "speed";
              const page = this.page;
              const position = this.currentPosition;

              if (this.hasSpeedPiece(page, position)) {
                this.speedPieceRemove(page, position);
                this.speedPieceClear(position);
              } else {
                this.speedPieceAdd(page, position, speedType);
                this.speedPieceDraw(position, speedType);
              }
            }
            break;

          default: {
            const possiblyLane = this.keyConfig[this.keyKind].keys.indexOf(
              e.code
            );
            const isFreeze = e.shiftKey;
            const page = this.page;
            const position = this.currentPosition;

            if (possiblyLane >= 0) {
              if (this.hasNote(page, possiblyLane, position)) {
                this.noteRemove(page, possiblyLane, position);
                this.noteClear(possiblyLane, position);
              } else {
                this.noteAdd(page, possiblyLane, position, isFreeze);
                this.noteDraw(possiblyLane, position, isFreeze);
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
      width: this.editorWidth + canvasMargin * 2 + speedChangeWidth,
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
