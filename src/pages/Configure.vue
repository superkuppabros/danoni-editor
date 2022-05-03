<template>
  <div id="configure">
    <configure-main></configure-main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ConfigureMain from "@/components/configure/ConfigureMain.vue";

export default defineComponent({
  name: "Configure",
  components: {
    ConfigureMain
  }
});
</script>
