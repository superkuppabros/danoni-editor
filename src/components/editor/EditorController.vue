<template>
  <div id="editor-controller">
    <editor-main
      :page-num="pageNum"
      :load-score-data="scoreData"
      :load-music-url="loadMusicUrl"
      :selected-key="keyKind"
      :timing="timing"
      @page-minus="pageMinus"
      @page-plus="pagePlus"
    ></editor-main>
    <div id="editor-menu">
      <div id="menu-page" class="menu-item-container">
        <div class="menu-txt">Page</div>
        <div class="menu-move-display">
          <div class="menu-move-btn" @click="pageMinus(5)">◁</div>
          <div class="menu-move-btn" @click="pageMinus(1)">◁</div>
          <div class="menu-move-txt">{{ pageNum }}</div>
          <div class="menu-move-btn" @click="pagePlus(1)">▷</div>
          <div class="menu-move-btn" @click="pagePlus(5)">▷</div>
        </div>
      </div>
      <div id="menu-label" class="menu-item-container">
        <div id="menu-move-header">
          <div class="menu-txt">Label</div>
          <input
            class="uk-checkbox"
            id="menu-label-checkbox"
            type="checkbox"
            :checked="getLabelNumByPageNum(pageNum) !== -1"
            :disabled="pageNum === 1"
            @click="callLabelOperation"
            ref="label-checkbox"
          />
        </div>
        <div class="menu-move-display">
          <div class="menu-move-btn" @click="labelMinus(5)">◁</div>
          <div class="menu-move-btn" @click="labelMinus(1)">◁</div>
          <div class="menu-move-txt">{{ labelNum }}</div>
          <div class="menu-move-btn" @click="labelPlus(1)">▷</div>
          <div class="menu-move-btn" @click="labelPlus(5)">▷</div>
        </div>
      </div>
      <div id="menu-fn" class="menu-item-container">
        <div class="menu-txt">First Number</div>
        <input
          type="number"
          class="uk-input uk-form-small"
          v-model="timing.firstNum"
        />
      </div>
      <div id="menu-bpm" class="menu-item-container">
        <div class="menu-txt">BPM</div>
        <input
          type="number"
          step="0.01"
          class="uk-input uk-form-small"
          v-model="timing.bpm"
        />
      </div>
      <div id="menu-output" class="menu-item-container">
        <div class="menu-output-btn btn-red" @click="convert">GO</div>
        <div class="menu-output-btn btn-blue" @click="save">SAVE</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorMain from "./EditorMain.vue";
import { Timing } from "../../model/Timing";
import { ScoreData, DefaultScoreData } from "../../model/ScoreData";
import { ScoreConverter } from "./ScoreConverter";
import { KeyKind } from "../../model/KeyKind";
import { KeyConfig, DefaultKeyConfig } from "../../model/KeyConfig";
import { fps, quarterInterval, verticalSizeNum } from "./EditorConstant";

type DataType = {
  pageNum: number;
  labelNum: number;
  timing: Timing;
  scoreData: ScoreData;
  keyKind: KeyKind;
  keyConfig: KeyConfig;
};

export default Vue.extend({
  name: "EditorController",
  components: {
    EditorMain
  },
  props: {
    selectedKey: String,
    loadScoreDataStr: String,
    loadMusicUrl: String
  },
  data(): DataType {
    const keyKind = this.selectedKey as KeyKind;
    const keyNum = DefaultKeyConfig[keyKind].num;
    let scoreData;
    try {
      //TODO: 譜面データのチェッカーを作る
      if (!this.loadScoreDataStr) scoreData = new DefaultScoreData(keyNum);
      else
        scoreData = (JSON.parse(this.loadScoreDataStr) as unknown) as ScoreData;
    } catch {
      alert("不正な譜面データが与えられたため、正しく読み込めませんでした。");
      scoreData = new DefaultScoreData(keyNum);
    }

    return {
      pageNum: 1,
      labelNum: 1,
      timing: {
        label: 1,
        firstNum: 200,
        bpm: 140
      },
      scoreData: scoreData,
      keyKind: this.selectedKey as KeyKind,
      keyConfig: DefaultKeyConfig
    };
  },
  methods: {
    pageMinus(n: number): void {
      this.pageNum = Math.max(1, this.pageNum - n);
    },
    pagePlus(n: number): void {
      this.pageNum += n;
    },
    labelMinus(n: number): void {
      this.labelNum = Math.max(1, this.labelNum - n);
      this.labelMove(this.labelNum);
      this.pageNum = this.scoreData.timings[this.labelNum - 1].label;
    },
    labelPlus(n: number): void {
      this.labelNum = Math.min(
        this.scoreData.timings.length,
        this.labelNum + n
      );
      this.labelMove(this.labelNum);
      this.pageNum = this.scoreData.timings[this.labelNum - 1].label;
    },
    labelMove(labelNum: number): void {
      const timing = this.scoreData.timings[labelNum - 1];
      this.labelNum = labelNum;
      this.timing = timing;
    },
    changeScoreData(scoreData: ScoreData) {
      this.scoreData = scoreData;
    },
    convert(): void {
      const converter = new ScoreConverter(this.keyKind, this.keyConfig);
      const data: string = converter.convert(this.scoreData);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data);
        alert("セーブデータをクリップボードにコピーしました！");
      }
    },
    save(): void {
      const converter = new ScoreConverter(this.keyKind, this.keyConfig);
      const data: string = converter.save(this.scoreData);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data);
        alert("セーブデータをクリップボードにコピーしました！");
      }
    },
    getLabelNumByPageNum(pageNum: number): number {
      const labels = this.scoreData.timings.map(timing => timing.label);
      return labels.indexOf(pageNum);
    },
    getNearestLabelNumByPageNum(pageNum: number): number {
      const labels = this.scoreData.timings.map(timing => timing.label);
      const labelNum = labels.reduce(
        (acc, label) => (label <= pageNum ? acc + 1 : acc),
        0
      );
      return labelNum;
    },
    labelOperation(pageNum: number, labelFlag: boolean): void {
      if (labelFlag) {
        // 削除処理
        const labelNum = this.getLabelNumByPageNum(pageNum);
        this.scoreData.timings.splice(labelNum, 1);
        this.labelNum--;
        this.timing = this.scoreData.timings[this.labelNum - 1];
      } else {
        // 挿入処理
        const oldTiming = this.timing;
        const framePerPosition = (60 * fps) / quarterInterval / oldTiming.bpm;
        const newFirstNum =
          oldTiming.firstNum +
          (pageNum - oldTiming.label) * verticalSizeNum * framePerPosition;
        const newTiming: Timing = {
          label: pageNum,
          firstNum: newFirstNum,
          bpm: oldTiming.bpm
        };
        this.scoreData.timings.splice(this.labelNum, 0, newTiming);
        this.timing = newTiming;
        this.labelNum++;
      }
    },
    callLabelOperation(): void {
      const pageNum = this.pageNum;
      const labelFlag = this.getLabelNumByPageNum(pageNum) !== -1;
      this.labelOperation(pageNum, labelFlag);
      this.pageNum = pageNum;
    }
  },
  watch: {
    pageNum(newPage: number) {
      const labelNum = this.getNearestLabelNumByPageNum(newPage);
      this.labelNum = labelNum;
      this.labelMove(labelNum);
    }
  }
});
</script>
