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
          <option>5</option>
          <option>7</option>
          <option>11</option>
        </select>
        <router-link
          :to="{
            name: 'editor',
            path: 'editor',
            params: {
              scoreData: scoreDataStr,
              musicUrl: musicUrl
            },
            query: { key: selectedKey }
          }"
          class="start-go-btn btn-red"
        >
          NEXT
        </router-link>
      </div>

      <div id="start-version">ver 0.0.0 created by SKB</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StartUploader from "./StartUploader.vue";
import { KeyKind } from "@/model/KeyKind";

type DataType = {
  musicTitle: string;
  scoreTitle: string;
  selectedKey: KeyKind;
  musicUrl: string | null;
  scoreDataStr: string | null;
};

export default Vue.extend({
  name: "StartMain",
  components: {
    StartUploader
  },
  data(): DataType {
    return {
      musicTitle: "楽曲ファイルをドロップ",
      scoreTitle: "譜面ファイルをドロップ",
      selectedKey: "5",
      musicUrl: null,
      scoreDataStr: null
    };
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
  }
});
</script>
