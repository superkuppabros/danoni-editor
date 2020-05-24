<template>
  <div>
    <!-- <router-link to="/start">tostart</router-link>
    <router-link to="/editor">toeditor</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App"
});
</script>
