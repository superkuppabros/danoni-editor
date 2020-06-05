<template>
  <input
    type="number"
    step="0.01"
    class="uk-input uk-form-xsmall"
    v-model="value"
  />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SpeedPiece",
  // props: {
  //   page: Number
  // },
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
