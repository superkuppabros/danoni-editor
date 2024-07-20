<template>
  <div id="editor-option" class="uk-modal-dialog" uk-modal container="#editor-controller">
    <button class="uk-modal-close-default" type="button" uk-close></button>

    <h2 class="uk-modal-title">Option Settings</h2>
    <div id="option-score-group" class="option-item-container">
      <div id="option-score-number" class="option-sub-item-container">
        <div class="menu-txt">Score No.</div>
        <input v-model.number="inputScoreNumber" type="number" min="1" class="uk-input uk-form-small" />
      </div>
      <div id="option-score-prefix" class="option-sub-item-container">
        <div class="menu-txt">Prefix</div>
        <input v-model="inputScorePrefix" type="string" class="uk-input uk-form-small" />
      </div>
    </div>
    <div id="option-music-volume" class="option-item-container">
      <div class="menu-txt">Music Volume</div>
      <input v-model.number="inputMusicVolume" type="range" min="0" max="1" step="0.05" class="uk-range uk-form-small" />
    </div>
    <div id="option-music-rate" class="option-item-container">
      <div class="menu-txt">Music Speed</div>
      <input v-model.number="inputMusicRate" type="number" min="0.25" max="2" step="0.05" class="uk-input uk-form-small" />
    </div>
    <div id="option-conv-key-kind" class="option-item-container">
      <div class="menu-txt">Conv.Keymode</div>
      <select id="option-key-selector" v-model="inputConvKeyKind" class="uk-select uk-form-width-medium uk-form-small">
        <option v-for="keyKind in keyKinds" :key="keyKind">
          {{ keyKind }}
        </option>
      </select>
    </div>
    <div id="option-order" class="option-item-container">
      <div class="menu-txt">Conv.Order</div>
      <input v-model="inputOrder" type="string" class="uk-input uk-form-small" />
    </div>
  </div>
</template>

<script lang="ts">
import { CustomKeyKind } from "@/model/KeyKind";
import { defineComponent } from "vue";
import { createCustomKeyConfig } from "../common/createCustomKeyConfig";

export default defineComponent({
  name: "EditorOption",
  props: {
    scoreNumber: { type: Number, required: true },
    musicVolume: { type: Number, required: true },
    musicRate: { type: Number, required: true },
    scorePrefix: { type: String, required: true },
    convKeyKind: { type: String, required: true },
    order: { type: Array<number>, required: true },
  },
  emits: ["update:scoreNumber", "update:musicVolume", "update:musicRate", "update:scorePrefix", "update:convKeyKind", "update:order"],
  computed: {
    keyKinds(): CustomKeyKind[] {
      const keyConfig = createCustomKeyConfig();
      const keys = Object.keys(keyConfig) as CustomKeyKind[];
      keys.sort((a, b) => keyConfig[a].id - keyConfig[b].id);
      return keys;
    },

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

    inputConvKeyKind: {
      get(): string {
        return this.convKeyKind;
      },
      set(convKeyKind: string) {
        this.$emit("update:convKeyKind", convKeyKind);
      },
    },

    inputOrder: {
      get(): string {
        return this.order.join(`,`);
      },
      set(order: string) {
        this.$emit("update:order", order.split(`,`).filter(v => !Number.isNaN(Number(v))));
      },
    },
  },
});
</script>
