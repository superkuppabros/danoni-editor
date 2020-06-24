<template>
  <div id="start-container">
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
          >NEXT</router-link
        >
      </div>

      <div id="start-version">ver 2.5.0β created by SKB</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StartUploader from "./StartUploader.vue";
import { CustomKeyKind } from "@/model/KeyKind";
import { CustomKeyConfig } from "../../model/KeyConfig";
import { createCustomKeyConfig } from "../common/createCustomKeyConfig";

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
    StartUploader
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
    }
  },
  mounted() {
    sessionStorage.removeItem("keyKind");
  }
});
</script>
