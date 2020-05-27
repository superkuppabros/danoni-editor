<template>
  <div id="start-container">
    <div id="start-title">Dancing☆Onigiri Editor</div>
    <div id="start-menu">
      <start-uploader msg="楽曲ファイルをドロップ"></start-uploader>
      <start-uploader msg="譜面ファイルをドロップ"></start-uploader>
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
              loadScoreData: {
                timings: [
                  {
                    label: 1,
                    firstNum: 200,
                    bpm: 140
                  },
                  {
                    label: 3,
                    firstNum: 2000,
                    bpm: 1800
                  }
                ],
                scores: [
                  {
                    notes: new Array(5).fill([]).map(() => []),
                    freezes: new Array(5).fill([]).map(() => [])
                  }
                ]
              }
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
  msg: string;
  selectedKey: KeyKind;
};

export default Vue.extend({
  name: "StartMain",
  components: {
    StartUploader
  },
  data(): DataType {
    return {
      msg: "hello",
      selectedKey: "5"
    };
  }
});
</script>
