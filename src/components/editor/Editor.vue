<template>
  <div id="editor">
    <editor-main :initial-current-position="currentPosition"></editor-main>
    <editor-menu :initial-timing="timing" :initial-page-num="pageNum"></editor-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorMain from "./EditorMain.vue";
import EditorMenu from "./EditorMenu.vue";
import { Timing } from "../../model/Timing";

type DataType = {
  pageNum: number;
  timing: Timing;
  currentPosition: number;
};

export default Vue.extend({
  name: "Editor",
  components: {
    EditorMain,
    EditorMenu
  },
  data(): DataType {
    return {
      pageNum: 1,
      timing: {
        label: 1,
        firstNum: 200,
        bpm: 140
      },
      currentPosition: 84
    };
  }
});
</script>
