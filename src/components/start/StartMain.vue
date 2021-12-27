<template>
  <div id="start-container">
    <start-load @load="load"></start-load>
    <div id="start-title">Dancing☆Onigiri Editor</div>
    <div id="start-menu">
      <start-uploader
        :msg="musicTitle"
        @fileRecieve="onMusicFileRecieve"
      ></start-uploader>
      <start-uploader
        :msg="scoreTitle"
        @fileRecieve="onScoreFileRecieve"
      ></start-uploader>
      <div id="start-go-next">
        <select
          id="start-key-selector"
          class="uk-select uk-form-width-medium"
          v-model="selectedKey"
        >
          <option v-for="keyKind in keyKinds" :key="keyKind">{{
            keyKind
          }}</option>
        </select>
        <router-link
          :to="{
            name: 'configure',
            path: 'configure'
          }"
          class="start-btn btn-orange"
          >CONFIG</router-link
        >
        <div class="start-btn btn-blue" href="#start-load" uk-toggle>LOAD</div>
        <router-link
          :to="{
            name: 'editor',
            path: 'editor',
            params: {
              scoreData: scoreDataStr,
              musicUrl: musicUrl,
              key: selectedKey
            }
          }"
          class="start-btn btn-red"
          >START</router-link
        >
      </div>

      <div id="start-version">ver 3.1.0 created by SKB</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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
  musicUrl: string | null;
  scoreDataStr: string | null;
};

export default Vue.extend({
  name: "StartMain",
  components: {
    StartUploader,
    StartLoad
  },
  data(): DataType {
    const keyConfig = createCustomKeyConfig();

    return {
      keyConfig,
      musicTitle: "楽曲ファイルをドロップ",
      scoreTitle: "セーブファイルをドロップ",
      selectedKey: "5",
      musicUrl: null,
      scoreDataStr: null
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
    }
  },
  methods: {
    onMusicFileRecieve(file: File) {
      const mimeTypePattern = "audio.*";
      if (!file.type.match(mimeTypePattern))
        alert("音楽ファイルではありません。");
      else {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result == "string") {
            this.musicUrl = result;
            this.musicTitle = file.name;
          }
        };
        reader.readAsDataURL(file);
      }
    },
    onScoreFileRecieve(file: File) {
      const mimeTypePattern = "(application/json|text/plain)";
      if (!file.type.match(mimeTypePattern))
        alert("譜面ファイルではありません。");
      else {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result == "string") {
            this.scoreDataStr = result;
            this.scoreTitle = file.name;
          }
        };
        reader.readAsText(file);
      }
    },
    moveToEditor(scoreData: string, musicUrl: string, key: string) {
      this.$router.push({
        name: "editor",
        path: "editor",
        params: { scoreData, musicUrl, key }
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
      else if (keyPhrase === "")
        this.moveToEditor(
          this.localSaveDataStr,
          this.musicUrl || "",
          this.selectedKey
        );
      else {
        try {
          const save = await this.loadData(keyPhrase);
          // 前後のクオートを消す、クオートのエスケープを剥がす
          const scoreData = save
            .replaceAll('\\"', '"')
            .slice(1)
            .slice(0, -1);
          this.moveToEditor(scoreData, this.musicUrl || "", this.selectedKey);
        } catch {
          alert("セーブデータの取得が出来ませんでした。");
        }
      }
    }
  },
  mounted() {
    sessionStorage.removeItem("keyKind");
  }
});
</script>
