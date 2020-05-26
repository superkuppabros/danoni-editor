<template>
  <div id="editor">
    <editor-controller :selected-key="keyKind"></editor-controller>
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
    selectedKey: String
  },
  data() {
    return {
      keyKind: this.selectedKey as KeyKind
    };
  }
});
</script>
