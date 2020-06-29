<template>
  <div>
    <h3 class="configure-context-title">Design</h3>

    <div class="configure-design-item">
      <div class="configure-design-text">Direction:</div>
      <div class="configure-options">
        <div class="configure-radio">
          <label>
            <input
              type="radio"
              class="uk-radio"
              name="editor-direction"
              :value="false"
              v-model="isReverse"
            />Upward
          </label>
        </div>
        <div class="configure-radio">
          <label>
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
    <div class="configure-design-item">
      <div class="configure-design-text">Freeze Highlight:</div>
      <div class="configure-options">
        <div class="configure-radio">
          <label>
            <input
              type="radio"
              class="uk-radio"
              name="editor-highlighted-freeze"
              :value="true"
              v-model="isHighlightedFreeze"
            />
            <span class="configure-radio-text">On</span>
          </label>
        </div>
        <div class="configure-radio">
          <label>
            <input
              type="radio"
              class="uk-radio"
              name="editor-highlighted-freeze"
              :value="false"
              v-model="isHighlightedFreeze"
            />
            <span class="configure-radio-text">Off</span>
          </label>
        </div>
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
    },

    isHighlightedFreeze: {
      get(): boolean {
        const isHighlightedFreezeStr: string =
          localStorage.getItem("isHighlightedFreeze") ?? "true";
        return JSON.parse(isHighlightedFreezeStr);
      },

      set(newValue: boolean): boolean {
        localStorage.setItem("isHighlightedFreeze", JSON.stringify(newValue));
        return newValue;
      }
    }
  }
});
</script>
