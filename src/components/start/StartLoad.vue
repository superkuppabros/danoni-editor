<template>
  <div
    id="start-load"
    class="uk-modal-dialog"
    uk-modal
    container="#start-container"
  >
    <button class="uk-modal-close-default" type="button" uk-close></button>

    <h2 class="uk-modal-title">Load</h2>
    <div id="save-key-phrase" class="save-item-container">
      <div class="save-txt">
        キーフレーズを入力して下さい。<br />
        (無入力の場合は最後に出力した譜面データを表示します。)
      </div>
    </div>
    <div id="save-key-phrase" class="save-item-container">
      <input
        type="text"
        max="50"
        class="uk-input uk-form-small"
        v-model.trim="inputKeyPhrase"
        list="phrase-history"
      />
      <datalist id="phrase-history">
        <option v-for="p in phraseHistory" :key="p">{{ p }}</option>
      </datalist>
    </div>
    <div class="save-item-container" style="display: flex;">
      <div class="save-output-btn btn-red" @click="submitPhrase">OK</div>
      <div class="save-output-btn btn-gray" @click="resetForm">RESET</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type DataType = {
  keyPhrase: string;
  phraseHistory: string[];
};

export default defineComponent({
  name: "EditorOption",
  data(): DataType {
    const phraseHistory: string[] = JSON.parse(
      localStorage.getItem("keyPhrases") || "[]"
    );
    return {
      keyPhrase: "",
      phraseHistory
    };
  },
  computed: {
    inputKeyPhrase: {
      get(): string {
        return this.keyPhrase;
      },
      set(keyPhrase: string) {
        this.keyPhrase = keyPhrase;
      }
    }
  },
  methods: {
    submitPhrase() {
      const keyPhrase = this.keyPhrase;
      this.$emit("submitPhrase", keyPhrase);
    },
    resetForm() {
      this.keyPhrase = "";
    }
  }
});
</script>
