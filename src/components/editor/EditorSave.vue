<template>
  <div id="editor-save" class="uk-modal-dialog" uk-modal container="#editor-controller">
    <button class="uk-modal-close-default" type="button" uk-close></button>

    <h2 class="uk-modal-title">Save</h2>
    <div id="save-key-phrase" class="save-item-container">
      <div class="save-txt">
        キーフレーズを入力して下さい。<br />
        (無入力の場合はセーブデータをクリップボードにコピーします。)
      </div>
    </div>
    <div id="save-key-phrase" class="save-item-container">
      <input v-model.trim="inputKeyPhrase" type="text" max="50" class="uk-input uk-form-small" list="phrase-history" />
      <datalist id="phrase-history">
        <option v-for="p in phraseHistory" :key="p">{{ p }}</option>
      </datalist>
    </div>
    <div class="save-item-container" style="display: flex">
      <div class="save-output-btn btn-red" @click="submitPhrase">OK</div>
      <div class="save-output-btn btn-gray" @click="resetForm">RESET</div>
    </div>
    <div v-if="isSaving" class="save-cover"></div>
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
  props: {
    isSaving: { type: Boolean, required: true, default: false },
  },
  emits: ["save"],
  data(): DataType {
    const phraseHistory: string[] = JSON.parse(localStorage.getItem("keyPhrases") || "[]");
    return {
      keyPhrase: "",
      phraseHistory,
    };
  },
  computed: {
    inputKeyPhrase: {
      get(): string {
        return this.keyPhrase;
      },
      set(keyPhrase: string) {
        this.keyPhrase = keyPhrase;
      },
    },
  },
  methods: {
    submitPhrase() {
      const keyPhrase = this.keyPhrase;

      const phrasesLengthMax = 10;
      if (this.phraseHistory.includes(keyPhrase)) {
        // keyPhraseを先頭に置く
        const arr = this.phraseHistory.filter((x) => x !== keyPhrase);
        arr.unshift(keyPhrase);
        this.phraseHistory = arr;
      } else {
        this.phraseHistory.unshift(keyPhrase);
        if (this.phraseHistory.length > phrasesLengthMax) this.phraseHistory.pop();
      }
      localStorage.setItem("keyPhrases", JSON.stringify(this.phraseHistory));

      this.$emit("save", keyPhrase);
    },

    resetForm() {
      this.keyPhrase = "";
    },
  },
});
</script>
