<template>
  <div id="editor-menu">
    <div>Page</div>
    <div id="menu-page">
      <div class="menu-page-btn" @click="(pageNum<6)?pageNum=1:pageNum-=5">◁</div>
      <div class="menu-page-btn" @click="(pageNum<2)?pageNum=1:pageNum-=1">◁</div>
      <div class="menu-page-txt">{{ pageNum }}</div>
      <div class="menu-page-btn" @click="pageNum++">▷</div>
      <div class="menu-page-btn" @click="pageNum+=5">▷</div>
    </div>
    <div>First Number</div>
    <div id="menu-fn">
      <input type="number" class="menu-input" />
    </div>
    <div>BPM</div>
    <div id="menu-bpm">
      <input type="number" class="menu-input" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Timing } from "../../model/Timing";

type DataType = {
  pageNum: number;
  timing: Timing;
};

export default Vue.extend({
  name: "EditorMenu",
  props: {
    initialPageNum: Number,
    initialTiming: { type: Object as PropType<Timing> }
  },
  data(): DataType {
    return {
      pageNum: this.initialPageNum,
      timing: this.initialTiming
    };
  },
  methods: {}
});
</script>
