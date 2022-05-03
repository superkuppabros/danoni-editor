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
import { defineComponent, PropType } from "vue";
import { SpeedType } from "../../model/Speed";
import toPx from "./helper/toPx";
export default defineComponent({
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
      return toPx(this.position || 0, this.isReverse) + 15;
    },
    inputValue: {
      get(): number {
        return this.propValue || 1;
      },
      set(inputValue: string) {
        const value = Number(inputValue);
        this.$emit("changeSpeed", value);
      }
    }
  }
});
</script>
