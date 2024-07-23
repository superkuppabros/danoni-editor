<template>
  <div id="configure-container">
    <div id="configure-title">
      <h2>Configure</h2>
    </div>
    <h3 class="configure-context-title">Key Config</h3>
    <div id="configure-uploader">
      <configure-uploader :msg="confTitle" @file-recieve="onConfFileRecieve"></configure-uploader>
      <div class="start-btn btn-gray" @click="download"><u>↓</u> DL</div>
      <div class="start-btn btn-gray" @click="resetConf">RESET</div>
    </div>
    <configure-design></configure-design>
    <div id="start-go-next">
      <router-link
        :to="{
          name: 'start',
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
import { createCustomKeyConfig } from "../common/createCustomKeyConfig";

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
      if (!file.type.match(mimeTypePattern)) alert("コンフィグファイルではありません。");
      else {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result == "string") {
            try {
              const customKeyConfigNew = JSON.parse(result);
              const customKeyConfigBase = JSON.parse(storage.getItem("customKeyConfig") || "{}");
              const importKeyList = Object.keys(customKeyConfigNew);
              const dupliKeyStr = importKeyList.filter((key) => Object.keys(createCustomKeyConfig()).includes(key)).join(", ");
              let importFlg: boolean = true;

              Object.assign(customKeyConfigBase, customKeyConfigNew);
              if (dupliKeyStr !== ``) {
                if (
                  !window.confirm(`すでに定義済みのキー設定があります。上書きしてもよろしいですか？\r\n[対象キー:${dupliKeyStr}]`)
                ) {
                  importFlg = false;
                }
              }
              if (importFlg) {
                storage.setItem("customKeyConfig", JSON.stringify(customKeyConfigBase, null, 2));
                alert(`コンフィグファイルをインポートしました。\r\n[対象キー:${importKeyList.join(", ")}]`);
              }
            } catch {
              alert("内容がJSON形式になっていません。");
            }
          }
        };
        reader.readAsText(file);
      }
    },

    download() {
      const storage = localStorage;
      const configText = storage.getItem("customKeyConfig") || "";
      if (configText === "") {
        alert("カスタムキー定義がありません。");
      } else {
        const blob = new Blob([configText], { type: "text/plain" });
        const obj = document.createElement("a");
        obj.href = window.URL.createObjectURL(blob);
        obj.download = `editorConfig_${new Date().toLocaleString()}.txt`;
        obj.style.display = "none";
        document.body.appendChild(obj);
        obj.click();
        obj.parentNode?.removeChild(obj);
      }
    },

    resetConf() {
      if (window.confirm("カスタムキー設定をリセットします。よろしいですか？")) {
        const storage = localStorage;
        storage.removeItem("customKeyConfig");
        alert("キー設定をリセットしました。");
      }
    },
  },
});
</script>
