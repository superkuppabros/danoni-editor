<template>
  <div id="editor">
    <editor-controller
      :selected-key="selectedKey"
      :load-score-data-str="loadScoreDataStr"
      :load-music-url="loadMusicUrl"
      :load-key-config-str="loadKeyConfigStr"
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
    loadKeyConfigStr: String,
    selectedKey: String
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("内容が消去されますがよろしいですか？");
    if (answer) next();
    else next(false);
  },

  methods: {
    beforeunloadAlert(event: BeforeUnloadEvent) {
      event.returnValue = "内容が消去されますがよろしいですか？";
    }
  },
  created() {
    window.addEventListener("beforeunload", this.beforeunloadAlert);
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.beforeunloadAlert);
  }
});
</script>
