<template>
  <div id="editor">
    <editor-controller></editor-controller>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorController from "@/components/editor/EditorController.vue";

export default Vue.extend({
  name: "Editor",
  components: {
    EditorController
  }
});
</script>
