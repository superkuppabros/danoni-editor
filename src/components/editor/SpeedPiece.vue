<template>
  <input
    type="number"
    step="0.01"
    class="editor-speed-piece"
    v-model="inputValue"
    :style="{ top: top + 'px' }"
  />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { SpeedType } from "../../model/Speed";
import toPx from "./helper/toPx";
export default Vue.extend({
  name: "SpeedPiece",
  model: {
    prop: "propValue",
    event: "changeSpeed"
  },
  props: {
    isReverse: Boolean,
    position: Number,
    propValue: Number,
    type: { type: String as PropType<SpeedType> }
  },
  computed: {
    top(): number {
      return toPx(this.position, this.isReverse) + 15;
    },
    inputValue: {
      get(): number {
        return this.propValue;
      },
      set(inputValue: string) {
        const value = Number(inputValue);
        this.$emit("changeSpeed", value);
      }
    }
  }
});
</script>
