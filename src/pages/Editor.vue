<template>
  <div id="editor">
    <editor-controller
      :selected-key="selectedKey"
      :load-score-data-str="loadScoreDataStr"
      :load-music-url="loadMusicUrl"
    ></editor-controller>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorController from "@/components/editor/EditorController.vue";

export default Vue.extend({
  name: "Editor",
  components: {
    EditorController
  },
  props: {
    loadScoreDataStr: String,
    loadMusicUrl: String,
    selectedKey: String
  }
});
</script>
