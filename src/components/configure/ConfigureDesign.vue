<template>
  <div>
    <h3 class="configure-context-title">Design</h3>

    <div class="configure-design-item">
      <div class="configure-design-text">Direction:</div>
      <div>
        <label class="configure-radio">
          <input
            type="radio"
            class="uk-radio"
            name="editor-direction"
            :value="false"
            v-model="isReverse"
          />Upward
        </label>
        <label class="configure-radio">
          <input
            type="radio"
            class="uk-radio"
            name="editor-direction"
            :value="true"
            v-model="isReverse"
          />Downward
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConfigureDesign",
  computed: {
    isReverse: {
      get(): boolean {
        const isReverseStr: string =
          localStorage.getItem("isReverse") ?? "false";
        return JSON.parse(isReverseStr);
      },

      set(newValue: boolean): boolean {
        localStorage.setItem("isReverse", JSON.stringify(newValue));
        return newValue;
      }
    }
  }
});
</script>
