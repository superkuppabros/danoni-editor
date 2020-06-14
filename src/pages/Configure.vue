<template>
  <div id="configure">
    <configure-main></configure-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigureMain from "@/components/configure/ConfigureMain.vue";

export default Vue.extend({
  name: "Configure",
  components: {
    ConfigureMain
  }
});
</script>
