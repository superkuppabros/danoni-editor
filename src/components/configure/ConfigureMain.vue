<template>
  <div id="configure-container">
    <div id="configure-title">
      <h2>Configure</h2>
    </div>
    <hr />
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
  }
});
</script>
