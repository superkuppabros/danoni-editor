<template>
  <div
    id="configure-conf-select"
    @dragover.prevent="ondragover"
    @drop.prevent="ondrop"
  >
    <div
      uk-form-custom
      class="uk-placeholder uk-text-center uk-margin-remove-bottom uk-form-width-medium"
      id="configure-droparea"
    >
      <input
        type="file"
        id="configure-droparea-input"
        ref="input"
        @change="loadFile"
      />
      <div id="configure-droparea-text">
        <span uk-icon="icon: upload"></span>
        <span class="uk-text-middle">{{ msg }}</span>
        <span class="uk-text-middle uk-link">参照</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

type DataType = {
  vue: Vue;
  file: File | null;
};

export default Vue.extend({
  name: "ConfigureUploader",
  props: {
    msg: String
  },
  data(): DataType {
    return {
      vue: this,
      file: null
    };
  },
  methods: {
    ondragover(e: DragEvent): void {
      if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
    },
    ondrop(e: DragEvent): void {
      if (e.dataTransfer) {
        const file = e.dataTransfer.files[0] || null;
        this.file = file;
      } else {
        this.file = null;
      }
    },
    loadFile(e: Event): void {
      if (e.target instanceof HTMLInputElement) {
        const file = e.target.files ? e.target.files[0] : null;
        this.file = file;
      } else {
        this.file = null;
      }
    }
  },
  watch: {
    file(newFile: File | null) {
      if (!(newFile === null)) {
        this.$emit("fileRecieve", newFile);
      } else {
        alert("ファイルが見つかりませんでした。");
      }
    }
  }
});
</script>
