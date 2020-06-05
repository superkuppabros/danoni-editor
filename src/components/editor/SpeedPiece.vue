<template>
  <input
    type="number"
    step="0.01"
    class="editor-speed-piece"
    v-model="inputValue"
    :style="{ top: 400 - position + 'px' }"
  />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { SpeedType } from "../../model/Speed";
export default Vue.extend({
  name: "SpeedPiece",
  model: {
    prop: "propValue",
    event: "changeSpeed"
  },
  props: {
    position: Number,
    propValue: Number,
    type: { type: String as PropType<SpeedType> }
  },
  computed: {
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
