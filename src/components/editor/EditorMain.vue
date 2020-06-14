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
      v-model="speed.value"
      :position="speed.position"
      :type="speed.type"
    ></speed-piece>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Konva from "konva";
import { CustomKeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { CustomKeyKind } from "@/model/KeyKind";
import { PageScore, DefaultPageScore } from "@/model/PageScore";
import {
  noteWidth,
  editorHeight,
  verticalSizeNum,
  quarterInterval,
  laneColors,
  canvasMarginHorizontal,
  canvasMarginVertical
} from "./EditorConstant";
import { Timing } from "../../model/Timing";
import { MusicService } from "./service/MusicService";
import { SpeedType } from "../../model/Speed";
import { NoteService } from "./service/NoteService";
import { SpeedPieceService } from "./service/SpeedPieceService";
import { PageScoreService } from "./service/PageScoreService";
import SpeedPiece from "./SpeedPiece.vue";
import {
  positionToSeconds,
  positionToFrame,
  secondsToTimeStr
} from "./helper/Calculator";
import { createCustomKeyConfig } from "../common/createCustomKeyConfig";

type DataType = {
  currentPosition: number;
  scoreData: ScoreData;
  divisor: number;
  keyKind: CustomKeyKind;
  keyNum: number;
  page: number;
  editorWidth: number;
  musicTimer: number | null;
  musicService: MusicService;
  copyScoreStore: PageScore;
  noteService?: NoteService;
  speedPieceService?: SpeedPieceService;
  pageScoreService?: PageScoreService;
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
    keyConfig: { type: Object as PropType<CustomKeyConfig> },
    selectedKey: String,
    timing: { type: Object as PropType<Timing> },
    propScoreNumber: Number,
    musicVolume: Number,
    musicRate: Number
  },
  components: { SpeedPiece },
  data(): DataType {
    const keyKind = this.selectedKey as CustomKeyKind;
    const keyConfig = createCustomKeyConfig();
    const keyNum = keyConfig[keyKind].num;
    const audio = new Audio(this.loadMusicUrl);

    return {
      currentPosition: 0,
      scoreData: this.loadScoreData,
      divisor: 24,
      keyKind,
      page: 1,
      keyNum,
      editorWidth: noteWidth * keyConfig[keyKind].num,
      musicService: new MusicService(audio),
      musicTimer: null,
      copyScoreStore: new DefaultPageScore(keyNum)
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

      const color = "#d8d800";
      const position = this.currentPosition;

      const maybeLine = currentPositionLayer.findOne("#currentPositionLine");
      const line: Konva.Line =
        maybeLine instanceof Konva.Line
          ? maybeLine.y(editorHeight - position)
          : new Konva.Line({
              y: editorHeight - position,
              points: [0, 0, this.editorWidth, 0],
              stroke: color,
              strokeWidth: 1.75,
              id: "currentPositionLine"
            });
      const radius = 6;

      const maybeTriangle = currentPositionLayer.findOne(
        "#currentPositionTriangle"
      );
      const triangle: Konva.RegularPolygon =
        maybeTriangle instanceof Konva.RegularPolygon
          ? maybeTriangle.y(editorHeight - position)
          : new Konva.RegularPolygon({
              sides: 3,
              radius,
              rotation: -30,
              fill: color,
              x: -radius,
              y: editorHeight - position,
              id: `currentPositionTriangle`
            });

      const timing = this.timing;
      const page = this.page;
      const blankFrame = this.scoreData.blankFrame;
      const currentFrame =
        positionToFrame(timing, page, position, blankFrame) < 100000
          ? Math.round(
              positionToFrame(timing, page, position, blankFrame) * 10
            ) / 10
          : Math.round(positionToFrame(timing, page, position, blankFrame));

      const currentSeconds = positionToSeconds(
        timing,
        page,
        position,
        blankFrame
      );
      const currentTimeStr = secondsToTimeStr(currentSeconds);
      const displayedText = `${currentFrame}\n[${currentTimeStr}]`;
      const textWidth = 40;
      const textHeight = 22;

      const maybeText = currentPositionLayer.findOne("#currentPositionText");
      const text: Konva.Text =
        maybeText instanceof Konva.Text
          ? maybeText
              .y(editorHeight - position - textHeight / 2)
              .text(displayedText)
          : new Konva.Text({
              width: textWidth,
              height: textHeight,
              text: displayedText,
              fill: "black",
              fontSize: textHeight / 2,
              align: "center",
              x: -canvasMarginHorizontal + 2,
              y: editorHeight - position - textHeight / 2,
              id: `currentPositionText`
            });

      currentPositionLayer.add(line, triangle, text);
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
      const startPosition = -verticalSizeNum / 4;
      const endPosition = verticalSizeNum;
      const startTime = positionToSeconds(timing, this.page, startPosition);
      const endTime = positionToSeconds(timing, this.page, endPosition);

      const musicVolume = this.musicVolume;
      const musicRate = this.musicRate;

      const loop = (startTime: number, endTime: number) => {
        const playDuration = ((endTime - startTime) * 1000) / musicRate;
        this.musicService.play(startTime, musicVolume, musicRate);
        this.musicPositionAnimation(playDuration);
        if (this.musicTimer) {
          const timer: number = setTimeout(() => {
            this.musicService.pause();
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

      this.musicService.pause(timer);
      this.musicTimer = null;
    },

    // 譜面データのページ反映
    displayPageScore(page: number): void {
      const stage = this.stage as Konva.Stage;
      const notesLayer = this.notesLayer as Konva.Layer;
      const noteService = this.noteService as NoteService;
      const speedPieceService = this.speedPieceService as SpeedPieceService;

      const pageScore = this.scoreData.scores[page - 1];

      notesLayer.destroyChildren();
      stage.add(notesLayer);

      pageScore.notes.forEach((laneArr, lane) => {
        laneArr.forEach(position => {
          noteService.draw(lane, position, false);
        });
      });
      pageScore.freezes.forEach((laneArr, lane) => {
        laneArr.forEach(position => {
          noteService.draw(lane, position, true);
        });
      });
      pageScore.speeds.forEach(speed => {
        speedPieceService.draw(speed.position, speed.type);
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

      // 今いるページ + 1までの範囲でemptyのページを初期化する
      if (!this.scoreData.scores[page]) this.scoreData.scores.length = page + 1;
      this.scoreData.scores = [...this.scoreData.scores].map(pageScore => {
        if (!pageScore) return new DefaultPageScore(this.keyNum);
        else return pageScore;
      });
      this.displayPageScore(page);

      // 音楽再生時に移動すると再生位置を変更する
      if (this.musicTimer) {
        this.stopMusicLoop(this.musicTimer);
        this.playMusicLoop(this.timing);
      }

      this.currentPositionDraw();
    },
    pageMinus(n: number, position = 0): void {
      this.$emit("page-minus", n);
      this.currentPositionMove(position);
    },
    pagePlus(n: number): void {
      this.$emit("page-plus", n);
      this.currentPositionMove(0);
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
      const noteService = this.noteService as NoteService;
      const speedPieceService = this.speedPieceService as SpeedPieceService;
      const pageScoreService = this.pageScoreService as PageScoreService;

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
          case "KeyX":
            pageScoreService.cut(this.page);
            break;
          case "KeyC":
            pageScoreService.copy(this.page);
            break;
          case "KeyV":
            pageScoreService.paste(this.page);
            break;
          case "ArrowUp": {
            let operateNotesPage = this.page;
            const removedLanes = noteService.removeOnPosition(
              operateNotesPage,
              this.currentPosition
            );
            this.currentPosition += this.divisor;
            if (this.currentPosition >= verticalSizeNum) {
              this.pagePlus(1);
              operateNotesPage++;
            } else this.currentPositionMove(this.currentPosition);
            noteService.removeOnPosition(
              operateNotesPage,
              this.currentPosition
            );
            removedLanes.forEach(obj =>
              noteService.add(
                operateNotesPage,
                obj.lane,
                this.currentPosition,
                obj.isFreeze
              )
            );
            this.displayPageScore(operateNotesPage);
            break;
          }
          case "ArrowDown": {
            let operateNotesPage = this.page;
            const removedLanes = noteService.removeOnPosition(
              operateNotesPage,
              this.currentPosition
            );
            this.currentPosition -= this.divisor;
            if (this.currentPosition < 0) {
              if (this.page === 1) {
                this.currentPosition = 0;
              } else {
                this.pageMinus(1, this.currentPosition + verticalSizeNum);
                operateNotesPage--;
              }
            } else this.currentPositionMove(this.currentPosition);
            noteService.removeOnPosition(
              operateNotesPage,
              this.currentPosition
            );
            removedLanes.forEach(obj =>
              noteService.add(
                operateNotesPage,
                obj.lane,
                this.currentPosition,
                obj.isFreeze
              )
            );
            this.displayPageScore(operateNotesPage);
            break;
          }
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
          case "Backspace":
            noteService.removeOnPosition(this.page, this.currentPosition);
            this.displayPageScore(this.page);
            break;
          case "Space": // ArrowUpと同様
            this.currentPosition += this.divisor;
            if (this.currentPosition >= verticalSizeNum) this.pagePlus(1);
            else this.currentPositionMove(this.currentPosition);
            break;
          case "ArrowUp":
            this.currentPosition += this.divisor;
            if (this.currentPosition >= verticalSizeNum) this.pagePlus(1);
            else this.currentPositionMove(this.currentPosition);
            break;
          case "KeyB": // ArrowDownと同様
            this.currentPosition -= this.divisor;
            if (this.currentPosition < 0) {
              if (this.page === 1) this.currentPosition = 0;
              else this.pageMinus(1, this.currentPosition + verticalSizeNum);
            } else this.currentPositionMove(this.currentPosition);
            break;
          case "ArrowDown":
            this.currentPosition -= this.divisor;
            if (this.currentPosition < 0) {
              if (this.page === 1) this.currentPosition = 0;
              else this.pageMinus(1, this.currentPosition + verticalSizeNum);
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

              if (speedPieceService.hasSpeedPiece(page, position)) {
                speedPieceService.remove(page, position);
                speedPieceService.clear(position);
              } else {
                speedPieceService.add(page, position, speedType);
                speedPieceService.draw(position, speedType);
              }
            }
            break;

          default: {
            const possiblyLane = Math.max(
              this.keyConfig[this.keyKind].keys.indexOf(e.code),
              this.keyConfig[this.keyKind].alternativeKeys.indexOf(e.code)
            );
            const isFreeze = e.shiftKey;
            const page = this.page;
            const position = this.currentPosition;

            if (possiblyLane >= 0) {
              if (noteService.hasNote(page, possiblyLane, position).exists) {
                noteService.remove(page, possiblyLane, position);
                noteService.clear(possiblyLane, position);
              } else {
                noteService.add(page, possiblyLane, position, isFreeze);
                noteService.draw(possiblyLane, position, isFreeze);
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
      x: canvasMarginHorizontal,
      y: canvasMarginVertical,
      container: "canvas",
      width: this.editorWidth + canvasMarginHorizontal * 2,
      height: editorHeight + canvasMarginVertical * 2
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

    this.noteService = new NoteService(
      this.scoreData,
      this.keyConfig,
      this.keyKind,
      this.stage,
      this.notesLayer
    );

    this.speedPieceService = new SpeedPieceService(
      this.scoreData,
      this.editorWidth,
      this.stage,
      this.notesLayer
    );

    this.pageScoreService = new PageScoreService(
      this.scoreData,
      this.copyScoreStore,
      this.keyNum,
      this.displayPageScore
    );

    this.baseLayerDraw();
    this.currentPositionDraw();
    this.pageMove(1);
    this.displayPageScore(1);
  },

  watch: {
    pageNum(newPage: number): void {
      this.pageMove(newPage);
    },

    scoreData(scoreData: ScoreData): void {
      this.$emit("changeScoreData", scoreData);
    },

    propScoreNumber(scoreNumber: number) {
      this.scoreData.scoreNumber = scoreNumber;
    }
  }
});
</script>
