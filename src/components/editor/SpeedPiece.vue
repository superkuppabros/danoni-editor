<template>
  <input v-model="inputValue" type="number" step="0.01" class="editor-speed-piece" :style="{ top: top + 'px' }" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SpeedType } from "../../model/Speed";
import toPx from "./helper/toPx";
export default defineComponent({
  name: "SpeedPiece",
  props: {
    isReverse: { type: Boolean, required: true },
    position: { type: Number, required: true },
    speedValue: { type: Number, default: 1 },
    type: { type: String as PropType<SpeedType>, required: true },
  },
  emits: ["update:speedValue"],
  computed: {
    top(): number {
      return toPx(this.position || 0, this.isReverse) + 15;
    },
    inputValue: {
      get(): number {
        return this.speedValue;
      },
      set(inputValue: string) {
        const value = Number(inputValue);
        this.$emit("update:speedValue", value);
      },
    },
  },
});
</script>
