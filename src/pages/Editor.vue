<template>
  <div id="editor">
    <editor-controller
      :selected-key="keyKind"
      :load-score-data="$route.params.loadScoreData"
    ></editor-controller>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorController from "@/components/editor/EditorController.vue";
import { KeyKind } from "@/model/KeyKind";

export default Vue.extend({
  name: "Editor",
  components: {
    EditorController
  },
  props: {
    msg: String,
    selectedKey: String
  },
  data() {
    return {
      keyKind: this.selectedKey as KeyKind
    };
  },
  mounted() {
    console.log(this.$route.params.loadScoreData);
  }
});
</script>
