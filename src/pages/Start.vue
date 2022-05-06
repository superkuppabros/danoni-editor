<template>
  <div id="start">
    <start-main></start-main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StartMain from "@/components/start/StartMain.vue";

export default defineComponent({
  name: "Start",
  components: {
    StartMain,
  },
});
</script>
