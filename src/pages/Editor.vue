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
import { defineComponent } from "vue";
import EditorController from "@/components/editor/EditorController.vue";

export default defineComponent({
  name: "Editor",
  components: {
    EditorController,
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("内容が消去されますがよろしいですか？");
    if (answer) next();
    else next(false);
  },
  props: {
    loadScoreDataStr: { type: String, required: true },
    loadMusicUrl: { type: String, required: true },
    selectedKey: { type: String, required: true },
  },
  created() {
    window.addEventListener("beforeunload", this.beforeunloadAlert);
  },
  unmounted() {
    window.removeEventListener("beforeunload", this.beforeunloadAlert);
  },

  methods: {
    beforeunloadAlert(event: BeforeUnloadEvent) {
      event.returnValue = "内容が消去されますがよろしいですか？";
    },
  },
});
</script>
