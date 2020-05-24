<template>
  <div id="editor-controller">
    <editor-main
      :page-num="pageNum"
      :load-score-data="scoreData"
      @page-minus="pageMinus"
      @page-plus="pagePlus"
    ></editor-main>
    <div id="editor-menu">
      <div id="menu-page">
        <div class="menu-txt">Page</div>
        <div id="menu-page-display">
          <div class="menu-page-btn" @click="pageMinus(5)">◁</div>
          <div class="menu-page-btn" @click="pageMinus(1)">◁</div>
          <div class="menu-page-txt">{{ pageNum }}</div>
          <div class="menu-page-btn" @click="pagePlus(1)">▷</div>
          <div class="menu-page-btn" @click="pagePlus(5)">▷</div>
        </div>
      </div>

      <div id="menu-fn">
        <div class="menu-txt">First Number</div>
        <input type="number" class="menu-input" v-model="timing.firstNum" />
      </div>
      <div id="menu-bpm">
        <div class="menu-txt">BPM</div>
        <input type="number" class="menu-input" v-model="timing.bpm" />
      </div>
      <div id="menu-output">
        <div class="menu-output-btn btn-red" @click="convert">GO</div>
        <div class="menu-output-btn btn-blue">SAVE</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorMain from "./EditorMain.vue";
import { Timing } from "../../model/Timing";
import { ScoreData } from "../../model/ScoreData";
import { ScoreConverter } from "./ScoreConverter";
import { KeyKind } from "../../model/KeyKind";
import { KeyConfig, DefaultKeyConfig } from "../../model/KeyConfig";

type DataType = {
  pageNum: number;
  timing: Timing;
  scoreData: ScoreData;
  keyKind: KeyKind;
  keyConfig: KeyConfig;
};

export default Vue.extend({
  name: "EditorController",
  components: {
    EditorMain,
  },
  data(): DataType {
    return {
      pageNum: 1,
      timing: {
        label: 1,
        firstNum: 200,
        bpm: 140,
      },
      scoreData: {
        timings: [
          {
            label: 1,
            firstNum: 200,
            bpm: 140,
          },
        ],
        scores: [
          {
            notes: [[], [], [], [], [], [], []],
            freezes: [[], [], [], [], [], [], []],
          },
        ],
      },
      keyKind: "7",
      keyConfig: DefaultKeyConfig,
    };
  },
  methods: {
    pageMinus(n: number): void {
      this.pageNum < 1 + n ? (this.pageNum = 1) : (this.pageNum -= n);
    },
    pagePlus(n: number): void {
      this.pageNum += n;
    },
    pageMove(page: number): void {
      this.pageNum = page;
    },
    changeScoreData(scoreData: ScoreData) {
      this.scoreData = scoreData;
    },
    convert(): void {
      const converter = new ScoreConverter(this.keyKind, this.keyConfig);
      const data: string = converter.convert(this.scoreData);

      if (navigator.clipboard) navigator.clipboard.writeText(data);
    },
  },
});
</script>
