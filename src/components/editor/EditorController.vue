<template>
  <div id="editor-controller">
    <editor-main
      :page-num="pageNum"
      :load-score-data="scoreData"
      :load-music-url="musicUrl"
      :key-config="keyConfig"
      :key-kind="keyKind"
      :timing="timing"
      :prop-score-number="scoreNumber"
      :music-volume="musicVolume"
      :music-rate="musicRate"
      @page-minus="pageMinus"
      @page-plus="pagePlus"
      @page-jump="pageJump"
    ></editor-main>
    <editor-option
      v-model:scoreNumber="scoreNumber"
      v-model:musicVolume="musicVolume"
      v-model:musicRate="musicRate"
    ></editor-option>
    <editor-save :is-saving="isSaving" @save="save"></editor-save>
    <div id="editor-menu">
      <div id="menu-page" class="menu-item-container">
        <div class="menu-move-header">
          <div class="menu-txt">Page</div>
        </div>
        <div class="menu-move-display">
          <div class="menu-move-btn" @click="pageMinus(5)">◁</div>
          <div class="menu-move-btn" @click="pageMinus(1)">◁</div>
          <div class="menu-move-txt">{{ pageNum }}</div>
          <div class="menu-move-btn" @click="pagePlus(1)">▷</div>
          <div class="menu-move-btn" @click="pagePlus(5)">▷</div>
        </div>
      </div>
      <div id="menu-label" class="menu-item-container">
        <div class="menu-move-header">
          <div class="menu-txt">Label</div>
          <input
            id="menu-label-checkbox"
            ref="label-checkbox"
            class="uk-checkbox"
            type="checkbox"
            :checked="getLabelNumByPageNum(pageNum) !== -1"
            :disabled="pageNum === 1"
            @click="callLabelOperation"
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
      <div id="menu-adj" class="menu-item-container">
        <div class="menu-txt">Blank Frame</div>
        <input v-model.number="scoreData.blankFrame" type="number" step="0.01" class="uk-input uk-form-small" />
      </div>
      <div id="menu-sn" class="menu-item-container">
        <div class="menu-txt">Start Number</div>
        <input v-model.number="timing.startNum" type="number" step="0.01" class="uk-input uk-form-small" />
      </div>
      <div id="menu-bpm" class="menu-item-container">
        <div class="menu-txt">BPM</div>
        <input v-model.number="timing.bpm" type="number" step="0.01" class="uk-input uk-form-small" />
      </div>

      <div id="menu-output" class="menu-item-container">
        <a class="menu-output-btn btn-orange" href="#editor-option" uk-toggle>OPTION</a>
        <div class="menu-output-btn btn-gray" @click="convertWithQuarters">TEST</div>
        <div class="menu-output-btn btn-blue" href="#editor-save" uk-toggle>SAVE</div>
        <div class="menu-output-btn btn-gray" @click="displayScoreDataInfo">CALC</div>
        <div class="menu-output-btn btn-red" @click="convert">GO!</div>
      </div>
    </div>
    <router-link
      class="uk-modal-close-default editor-close"
      type="button"
      href="../"
      uk-close
      :to="{
        name: 'start',
        path: '/',
      }"
    ></router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditorMain from "./EditorMain.vue";
import EditorOption from "./EditorOption.vue";
import { Timing } from "../../model/Timing";
import { ScoreData, DefaultScoreData } from "../../model/ScoreData";
import { ScoreConvertService } from "./service/ScoreConvertService";
import { LevelCalcService } from "./service/LevelCalcService";
import { CustomKeyKind } from "../../model/KeyKind";
import { CustomKeyConfig } from "../../model/KeyConfig";
import { fps, quarterInterval, verticalSizeNum } from "./EditorConstant";
import { createCustomKeyConfig } from "../common/createCustomKeyConfig";
import { DefaultPageScore } from "@/model/PageScore";
import { ScoreRevivalService } from "./service/ScoreRevivalService";
import EditorSave from "./EditorSave.vue";

type DataType = {
  pageNum: number;
  labelNum: number;
  timing: Timing;
  scoreData: ScoreData;
  keyKind: CustomKeyKind;
  keyConfig: CustomKeyConfig;
  scoreNumber: number;
  musicUrl: string;
  musicVolume: number;
  musicRate: number;
  isSaving: boolean;
  scoreConvertService: ScoreConvertService;
};

export default defineComponent({
  name: "EditorController",
  components: {
    EditorMain,
    EditorOption,
    EditorSave,
  },
  props: {
    selectedKey: { type: String, required: true },
    loadScoreDataStr: { type: String, required: true },
    loadMusicUrl: { type: String, required: true },
  },
  data(): DataType {
    const keyConfig = createCustomKeyConfig();

    let scoreData: ScoreData;
    const storedKeyKind = sessionStorage.getItem("keyKind");

    const selectedKeyKind = (storedKeyKind || this.selectedKey) as CustomKeyKind;
    const selectedKeyNum = keyConfig[selectedKeyKind].num;

    const scoreRevivalService = new ScoreRevivalService(keyConfig);
    try {
      //TODO: 譜面データのチェッカーを作る
      if (!this.loadScoreDataStr) {
        scoreData = new DefaultScoreData(selectedKeyNum);
      } else if (scoreRevivalService.dosConvert(this.loadScoreDataStr) != null) {
        scoreData = scoreRevivalService.dosConvert(this.loadScoreDataStr) as ScoreData;
      } else scoreData = JSON.parse(this.loadScoreDataStr) as unknown as ScoreData;
    } catch {
      alert("不正な譜面データが与えられたため、正しく読み込めませんでした。");
      scoreData = new DefaultScoreData(selectedKeyNum);
    }

    const keyKind = (scoreData.keyKind || selectedKeyKind) as CustomKeyKind;
    scoreData.keyKind = keyKind;
    sessionStorage.setItem("keyKind", keyKind); // 更新してもkeyがデフォルトに戻らないようにするため

    const keyNum = keyConfig[keyKind].num;
    if (scoreData.scores.length === 0) {
      scoreData.scores.push(new DefaultPageScore(keyNum));
    }

    return {
      pageNum: 1,
      labelNum: 1,
      timing: scoreData.timings[0],
      scoreData,
      keyKind,
      keyConfig,
      scoreNumber: scoreData.scoreNumber ? scoreData.scoreNumber : 1,
      musicUrl: this.loadMusicUrl || "",
      musicVolume: Number(localStorage.getItem("musicVolume")) || 1.0,
      musicRate: 1.0,
      isSaving: false,
      scoreConvertService: new ScoreConvertService(keyKind, keyConfig),
    };
  },
  watch: {
    pageNum(newPage: number) {
      const labelNum = this.getNearestLabelNumByPageNum(newPage);
      this.labelNum = labelNum;
      this.labelMove(labelNum);
    },
  },
  mounted() {
    if (!this.scoreData.scoreNumber) this.scoreData.scoreNumber = 1;
  },
  methods: {
    pageMinus(n: number): void {
      this.pageNum = Math.max(1, this.pageNum - n);
    },
    pagePlus(n: number): void {
      this.pageNum += n;
    },
    pageJump(page: number): void {
      this.pageNum = page;
    },
    labelMinus(n: number): void {
      this.labelNum = Math.max(1, this.labelNum - n);
      this.labelMove(this.labelNum);
      this.pageNum = this.scoreData.timings[this.labelNum - 1].label;
    },
    labelPlus(n: number): void {
      this.labelNum = Math.min(this.scoreData.timings.length, this.labelNum + n);
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

    writeClipBoard(data: string, message: string): void {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data).then(
          // 成功時
          () => alert(message),
          // 失敗時
          () => alert("クリップボードにコピーできませんでした。権限がありません。")
        );
      } else {
        alert("クリップボードにコピーできませんでした。非対応のブラウザです。");
      }
    },

    convert(): void {
      // NOTE: scoreNoを増やしたことによる暫定処置
      const postfix = this.scoreData.scoreNumber !== 1 && this.scoreData.scoreNumber ? this.scoreData.scoreNumber.toString() : "";
      const converter = this.scoreConvertService;
      const data: string = converter.convert(this.scoreData, postfix);
      const message = "譜面データをクリップボードにコピーしました！";
      this.writeClipBoard(data, message);

      // ローカルストレージに現在のデータを保存
      localStorage.setItem("saveData", converter.save(this.scoreData));
    },
    save(keyPhrase: string) {
      if (keyPhrase) {
        this.isSaving = true;
        this.onlineSave(keyPhrase)
          .then(
            // 成功時
            () => alert("セーブデータをオンラインにセーブしました！"),
            // 失敗時
            (err) => {
              console.log(err);
              alert("オンラインセーブに失敗しました。");
            }
          )
          .finally(() => (this.isSaving = false));
      } else if (keyPhrase === "") {
        this.localSave();
      }
    },
    localSave(): void {
      const converter = this.scoreConvertService;
      const data: string = converter.save(this.scoreData);
      const message = "セーブデータをクリップボードにコピーしました！";
      this.writeClipBoard(data, message);
    },
    async onlineSave(keyPhrase: string): Promise<boolean> {
      const converter = this.scoreConvertService;
      const data: string = converter.save(this.scoreData);

      const apiUrl = "https://asia-northeast1-danoni-editor-backend.cloudfunctions.net/addSaveData";

      const req: RequestInit = {
        method: "POST",
        headers: {
          "content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ keyPhrase, data }),
      };
      const response = await fetch(apiUrl, req);
      return response.ok;
    },
    convertWithQuarters(): void {
      // NOTE: scoreNoを増やしたことによる暫定処置
      const postfix = this.scoreData.scoreNumber !== 1 && this.scoreData.scoreNumber ? this.scoreData.scoreNumber.toString() : "";
      const converter = this.scoreConvertService;
      const data: string = converter.convertWithQuarters(this.scoreData, postfix);
      const message = "四分譜面データをクリップボードにコピーしました！";
      this.writeClipBoard(data, message);
    },

    displayScoreDataInfo(): void {
      const levelChecker = new LevelCalcService();
      const frameData = this.scoreConvertService.toFrameData(this.scoreData);
      const outputData = this.scoreConvertService.framesToOutputData(frameData);
      const scoreDataInfoStr = levelChecker.createScoreDataInfoStr(outputData.notes, outputData.freezes);
      alert(scoreDataInfoStr);
    },

    getLabelNumByPageNum(pageNum: number): number {
      const labels = this.scoreData.timings.map((timing) => timing.label);
      return labels.indexOf(pageNum);
    },
    getNearestLabelNumByPageNum(pageNum: number): number {
      const labels = this.scoreData.timings.map((timing) => timing.label);
      const labelNum = labels.reduce((acc, label) => (label <= pageNum ? acc + 1 : acc), 0);
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
        const newStartNum =
          Math.round((oldTiming.startNum + (pageNum - oldTiming.label) * verticalSizeNum * framePerPosition) * 100) / 100;
        const newTiming: Timing = {
          label: pageNum,
          startNum: newStartNum,
          bpm: oldTiming.bpm,
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
    },
  },
});
</script>
