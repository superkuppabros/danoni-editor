<template>
  <div id="configure-container">
    <div id="configure-title">
      <h2>Configure</h2>
    </div>
    <h3 class="configure-context-title">Key Config</h3>
    <div id="configure-uploader">
      <configure-uploader
        :msg="confTitle"
        @file-recieve="onConfFileRecieve"
      ></configure-uploader>
      <div class="start-btn btn-gray" @click="resetConf">RESET</div>
    </div>
    <configure-design></configure-design>
    <div id="start-go-next">
      <router-link
        :to="{
          name: 'start',
          path: '/',
        }"
        class="start-btn btn-blue"
        >BACK</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ConfigureUploader from "./ConfigureUploader.vue";
import ConfigureDesign from "./ConfigureDesign.vue";

export default defineComponent({
  name: "ConfigureMain",
  components: {
    ConfigureUploader,
    ConfigureDesign,
  },
  data() {
    return {
      confTitle: "ファイルをドロップ",
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
    },
  },
});
</script>
