<template>
  <div id="start-container">
    <div id="start-title">Dancing☆Onigiri Editor</div>
    <div id="start-menu">
      <div id="start-music-select" class="uk-placeholder uk-text-center">
        <span uk-icon="icon: upload"></span>
        <span class="uk-text-middle"> 楽曲ファイルをドロップ </span>
        <div uk-form-custom>
          <input type="file" multiple />
          <span class="uk-link">参照</span>
        </div>
      </div>

      <div id="start-score-select" class="uk-placeholder uk-text-center">
        <span uk-icon="icon: upload"></span>
        <span class="uk-text-middle"> 譜面ファイルをドロップ </span>
        <div uk-form-custom>
          <input type="file" multiple />
          <span class="uk-link">参照</span>
        </div>
      </div>

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

type DataType = {
  msg: string;
};

export default Vue.extend({
  name: "StartMain",
  data(): DataType {
    return {
      msg: "hello"
    };
  }
});
</script>
