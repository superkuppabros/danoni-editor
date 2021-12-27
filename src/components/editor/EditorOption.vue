<template>
  <div
    id="editor-option"
    class="uk-modal-dialog"
    uk-modal
    container="#editor-controller"
  >
    <button class="uk-modal-close-default" type="button" uk-close></button>

    <h2 class="uk-modal-title">Option Settings</h2>
    <div id="option-score-number" class="option-item-container">
      <div class="menu-txt">Score No.</div>
      <input
        type="number"
        min="1"
        class="uk-input uk-form-small"
        v-model.number="inputScoreNumber"
      />
    </div>
    <div id="option-music-volume" class="option-item-container">
      <div class="menu-txt">Music Volume</div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        class="uk-range uk-form-small"
        v-model.number="inputMusicVolume"
      />
    </div>
    <div id="option-music-rate" class="option-item-container">
      <div class="menu-txt">Music Speed</div>
      <input
        type="number"
        min="0.25"
        max="2"
        step="0.05"
        class="uk-input uk-form-small"
        v-model.number="inputMusicRate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "EditorOption",
  props: {
    scoreNumber: Number,
    musicVolume: Number,
    musicRate: Number
  },
  computed: {
    inputScoreNumber: {
      get(): number {
        return this.scoreNumber;
      },
      set(scoreNumber: string) {
        const value = Number(scoreNumber);
        this.$emit("update:scoreNumber", value);
      }
    },

    inputMusicVolume: {
      get(): number {
        return this.musicVolume;
      },
      set(musicVolume: string) {
        localStorage.setItem("musicVolume", musicVolume);
        const value = Number(musicVolume);
        this.$emit("update:musicVolume", value);
      }
    },

    inputMusicRate: {
      get(): number {
        return this.musicRate;
      },
      set(musicRate: string) {
        const value = Number(musicRate);
        this.$emit("update:musicRate", value);
      }
    }
  }
});
</script>
