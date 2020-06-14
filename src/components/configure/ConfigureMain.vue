<template>
  <div id="configure-container">
    <div id="configure-title">
      <h2>Configure</h2>
    </div>
    <hr />
    <h3 id="configure-context-title">Key Config</h3>
    <div id="configure-uploader">
      <configure-uploader
        :msg="confTitle"
        @fileRecieve="onConfFileRecieve"
      ></configure-uploader>
      <div class="start-btn btn-gray">RESET</div>
    </div>
    <div id="start-go-next">
      <router-link
        :to="{
          name: 'start',
          path: '/'
        }"
        class="start-btn btn-blue"
        >BACK</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigureUploader from "./ConfigureUploader.vue";

export default Vue.extend({
  name: "ConfigureMain",
  components: {
    ConfigureUploader
  },
  data() {
    return {
      confTitle: "コンフィグファイルをドロップ"
    };
  },
  methods: {
    onConfFileRecieve(file: File) {
      const storage = localStorage;
      const mimeTypePattern = "(application/json|text/plain)";
      if (!file.type.match(mimeTypePattern))
        alert("コンフィグファイルではありません。");
      else {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result == "string") {
            try {
              JSON.parse(result);
              storage.setItem("customKeyConfig", result);
              alert("コンフィグファイルをインポートしました。");
            } catch {
              alert("内容がJSON形式になっていません。");
            }
          }
        };
        reader.readAsText(file);
      }
    },

    resetConf() {
      const storage = localStorage;
      storage.removeItem("customKeyConfig");
      alert("キー設定をリセットしました。");
    }
  }
});
</script>
