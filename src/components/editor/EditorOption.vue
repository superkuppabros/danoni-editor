<template>
  <div id="editor-option" class="uk-modal-dialog" uk-modal container="#editor-controller">
    <button class="uk-modal-close-default" type="button" uk-close></button>

    <h2 class="uk-modal-title">Options</h2>
    <div id="option-blank-frame" class="option-item-container">
      <div class="menu-txt">Blank Frame</div>
      <input v-model.number="inputBlankFrame" type="number" step="0.01" class="uk-input uk-form-width-small uk-form-small" />
    </div>
    <div id="option-score-group" class="option-item-container">
      <div id="option-score-number" class="option-sub-item-container-medium">
        <div class="menu-txt">Score No.</div>
        <input v-model.number="inputScoreNumber" type="number" min="1" class="uk-input uk-form-small" />
      </div>
      <div id="option-score-prefix" class="option-sub-item-container-small">
        <div class="menu-txt">Prefix</div>
        <input v-model="inputScorePrefix" type="string" class="uk-input uk-form-small" />
      </div>
    </div>
    <div id="option-music-volume" class="option-item-container">
      <div class="menu-txt">Music Volume</div>
      <input
        v-model.number="inputMusicVolume"
        type="range"
        min="0"
        max="1"
        step="0.05"
        class="uk-range uk-form-width-small uk-form-small"
      />
    </div>
    <div id="option-music-rate" class="option-item-container">
      <div class="menu-txt">Music Speed</div>
      <input
        v-model.number="inputMusicRate"
        type="number"
        min="0.25"
        max="2"
        step="0.05"
        class="uk-input uk-form-width-small uk-form-small"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditorOption",
  props: {
    scoreNumber: { type: Number, required: true },
    musicVolume: { type: Number, required: true },
    musicRate: { type: Number, required: true },
    scorePrefix: { type: String, required: true },
    blankFrame: { type: Number, required: true },
  },
  emits: ["update:scoreNumber", "update:musicVolume", "update:musicRate", "update:scorePrefix", "update:blankFrame"],
  computed: {
    inputScoreNumber: {
      get(): number {
        return this.scoreNumber;
      },
      set(scoreNumber: string) {
        const value = Number(scoreNumber);
        this.$emit("update:scoreNumber", value);
      },
    },

    inputMusicVolume: {
      get(): number {
        return this.musicVolume;
      },
      set(musicVolume: string) {
        localStorage.setItem("musicVolume", musicVolume);
        const value = Number(musicVolume);
        this.$emit("update:musicVolume", value);
      },
    },

    inputMusicRate: {
      get(): number {
        return this.musicRate;
      },
      set(musicRate: string) {
        const value = Number(musicRate);
        this.$emit("update:musicRate", value);
      },
    },

    inputScorePrefix: {
      get(): string {
        return this.scorePrefix;
      },
      set(scorePrefix: string) {
        this.$emit("update:scorePrefix", scorePrefix);
      },
    },

    inputBlankFrame: {
      get(): number {
        return this.blankFrame;
      },
      set(blankFrame: string) {
        const value = Number(blankFrame);
        this.$emit("update:blankFrame", value);
      },
    },
  },
});
</script>
