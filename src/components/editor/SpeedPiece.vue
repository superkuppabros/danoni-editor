<template>
  <input
    type="number"
    step="0.01"
    class="editor-speed-piece"
    v-model="value"
    :style="{ top: 400 - position + 'px' }"
  />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SpeedPiece",
  props: {
    position: Number
  },
  data() {
    return {
      value: 1
    };
  }
  // watch: {
  //   value(){
  //     this.$emit("changeSpeed")
  //   }
  // }
});
</script>
