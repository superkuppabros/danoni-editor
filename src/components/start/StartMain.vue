<template>
  <div id="start-container">
    <div id="start-title">Dancing☆Onigiri Editor</div>
    <div id="start-menu">
      <start-uploader msg="楽曲ファイルをドロップ"></start-uploader>
      <start-uploader msg="譜面ファイルをドロップ"></start-uploader>
      <div id="start-go-next">
        <select id="start-key-selector" class="uk-select uk-form-width-medium">
          <option>5</option>
          <option>7</option>
          <option>11</option>
        </select>
        <div class="start-go-btn btn-red">NEXT</div>
      </div>

      <div id="start-version">ver 0.0.0 created by SKB</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StartUploader from "./StartUploader.vue";

type DataType = {
  msg: string;
};

export default Vue.extend({
  name: "StartMain",
  components: {
    StartUploader,
  },
  data(): DataType {
    return {
      msg: "hello",
    };
  },
});
</script>
