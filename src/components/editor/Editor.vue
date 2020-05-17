<template>
  <div id="editor">
    <editor-main></editor-main>
    <editor-menu :pageNum="1"></editor-menu>
  </div>
</template>

<script lang="ts">
import EditorMain from "./EditorMain.vue";
import EditorMenu from "./EditorMenu.vue";
import Vue from "vue";
// import { Timing } from "../../model/Timing";

type Timing = {
  label: number;
  firstNum: number;
  bpm: number;
}

type DataType = {
  timing: Timing
}

export default Vue.extend({
  name: "Editor",
  components: {
    EditorMain,
    EditorMenu,
  },
  data(): DataType {
    return {
      timing: {
        label: 1,
        firstNum: 200,
        bpm: 140
      }
    }
  }
  // data: function() {
  //   return {
  //     label: 1,
  //     firstNum: 200,
  //     bpm: 140,
  //   };
  // },
});
</script>
