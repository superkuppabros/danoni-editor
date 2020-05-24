<template>
  <div id="start">
    <start-main></start-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StartMain from "@/components/start/StartMain.vue";

export default Vue.extend({
  name: "Start",
  components: {
    StartMain
  }
});
</script>
