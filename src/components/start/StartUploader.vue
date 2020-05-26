<template>
  <div id="start-music-select" @drop.prevent="dropped">
    <div
      uk-form-custom
      class="uk-placeholder uk-text-center uk-margin-remove-bottom"
    >
      <input type="file" multiple />
      <span uk-icon="icon: upload"></span>
      <span class="uk-text-middle"> {{ msg }} </span>
      <span class="uk-link">参照</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UIkit from "uikit";

type DataType = {
  vue: Vue;
};

export default Vue.extend({
  name: "StartUploader",
  props: {
    msg: String
  },
  data(): DataType {
    return {
      vue: this
    };
  },
  methods: {
    dropped(): void {
      console.log("hello");
    }
  },
  mounted(): void {
    UIkit;
  }
});
</script>
