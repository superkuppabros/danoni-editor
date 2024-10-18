<template>
  <div id="start-container">
    <start-load @submit-phrase="load"></start-load>
    <div id="start-title">Dancing☆Onigiri Editor</div>
    <div id="start-menu">
      <start-uploader :msg="musicTitle" @file-recieve="onMusicFileRecieve"></start-uploader>
      <start-uploader :msg="scoreTitle" @file-recieve="onScoreFileRecieve"></start-uploader>
      <div id="start-go-next">
        <select id="start-key-selector" v-model="selectedKey" class="uk-select uk-form-width-medium">
          <option v-for="keyKind in keyKinds" :key="keyKind">
            {{ keyKind }}
          </option>
        </select>
        <router-link
          :to="{
            name: 'configure',
          }"
          class="start-btn btn-orange"
          >CONFIG</router-link
        >
        <div class="start-btn btn-blue" uk-toggle="target: #start-load">LOAD</div>
        <router-link
          :to="{
            name: 'editor',
            state: {
              scoreData: scoreDataStr,
              musicUrl: musicUrl,
              key: selectedKey,
            },
          }"
          class="start-btn btn-red"
          >START</router-link
        >
      </div>

      <div id="start-version">ver 4.0.0 created by SKB</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StartUploader from "./StartUploader.vue";
import { CustomKeyKind } from "@/model/KeyKind";
import { CustomKeyConfig } from "../../model/KeyConfig";
import { createCustomKeyConfig } from "../common/createCustomKeyConfig";
import StartLoad from "./StartLoad.vue";

type DataType = {
  keyConfig: CustomKeyConfig;
  musicTitle: string;
  scoreTitle: string;
  selectedKey: CustomKeyKind;
  musicUrl: string;
  scoreDataStr: string;
};

export default defineComponent({
  name: "StartMain",
  components: {
    StartUploader,
    StartLoad,
  },
  data(): DataType {
    const keyConfig = createCustomKeyConfig();

    return {
      keyConfig,
      musicTitle: "楽曲ファイルをドロップ",
      scoreTitle: "セーブファイルをドロップ/Ctrl+V",
      selectedKey: "5",
      musicUrl: "",
      scoreDataStr: "",
    };
  },
  computed: {
    keyKinds(): CustomKeyKind[] {
      const keyConfig = this.keyConfig as CustomKeyConfig;
      const keys = Object.keys(keyConfig) as CustomKeyKind[];
      keys.sort((a, b) => keyConfig[a].id - keyConfig[b].id);
      return keys;
    },

    localSaveDataStr(): string {
      return localStorage.getItem("saveData") ?? "";
    },
  },
  mounted() {
    sessionStorage.removeItem("keyKind");
    document.addEventListener("keydown", this.keydownAction);
  },
  unmounted() {
    document.removeEventListener("keydown", this.keydownAction);
  },
  methods: {
    keydownAction(e: KeyboardEvent) {
      if (e.ctrlKey && e.code === "KeyV") {
        if (navigator.clipboard) {
          navigator.clipboard.readText().then(
            // 成功時
            (text) => {
              if (text !== "") {
                this.scoreDataStr = text;
                this.scoreTitle = "(クリップボードから読込)";
              } else {
                alert("クリップボードが空か、テキストデータではありません。");
              }
            },
            // 失敗時
            () => alert("クリップボードを読み込めませんでした。権限がありません。")
          );
          e.preventDefault();
        } else {
          alert("クリップボードを読み込めませんでした。非対応のブラウザです。");
        }
      }
    },
    onFileRecieve(file: File, errorMessage: string) {
      if (file.type.match("audio.*")) {
        this.readMusicFile(file);
      } else if (file.type.match("application/json|[text|application]/[x-]?javascript|text/html|text/plain")) {
        this.readScoreFile(file);
      } else {
        alert(errorMessage);
      }
    },
    onMusicFileRecieve(file: File) {
      this.onFileRecieve(file, "音楽ファイルではありません。");
    },
    onScoreFileRecieve(file: File) {
      this.onFileRecieve(file, "譜面ファイルではありません。");
    },
    readMusicFile(file: File) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result == "string") {
          this.musicUrl = result;
          this.musicTitle = file.name;
        }
      };
      reader.readAsDataURL(file);
    },
    readScoreFile(file: File) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result == "string") {
          this.scoreDataStr = result;
          this.scoreTitle = file.name;
        }
      };
      reader.readAsText(file);
    },
    moveToEditor(scoreData: string, musicUrl: string, key: string) {
      this.$router.push({
        name: "editor",
        state: { scoreData, musicUrl, key },
      });
    },
    async loadData(keyPhrase: string) {
      const apiUrl = `https://asia-northeast1-danoni-editor-backend.cloudfunctions.net/getSaveData?keyPhrase=${keyPhrase}`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      return JSON.stringify(json.data || "");
    },
    async load(keyPhrase: string): Promise<void> {
      if (keyPhrase === null) return;
      else if (keyPhrase === "") this.moveToEditor(this.localSaveDataStr, this.musicUrl || "", this.selectedKey);
      else {
        try {
          const save = await this.loadData(keyPhrase);
          // 前後のクオートを消す、クオートのエスケープを剥がす
          const scoreData = save.replaceAll('\\"', '"').slice(1).slice(0, -1);
          this.moveToEditor(scoreData, this.musicUrl || "", this.selectedKey);
        } catch {
          alert("セーブデータの取得が出来ませんでした。");
        }
      }
    },
  },
});
</script>
