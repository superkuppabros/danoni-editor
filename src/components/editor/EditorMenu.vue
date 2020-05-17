<template>
  <div id="editor-menu">
    <p>page: {{ pageNum }}</p>
    <div id="menu-fn">
      <p>First Number</p>
      <input type="number" />
    </div>
    <div id="menu-bpm">
      <p>BPM</p>
      <input type="number" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorMenu",
  props: {
    pageNum: Number,
  },
};
</script>
