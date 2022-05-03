<template>
  <div>
    <!-- <router-link to="/start">tostart</router-link>
    <router-link to="/editor">toeditor</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
