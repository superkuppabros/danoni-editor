<template>
  <div id="editor-controller">
    <editor-main
      :load-score-data="{
        timings: [
          {
            label: 1,
            firstNum: 200,
            bpm: 140,
          },
        ],
        scores: [{
          notes: [[],[],[],[],[],[],[]],
          freezes: [[],[],[],[],[],[],[]]
        }],
      }"
      @page-minus="pageMinus"
      @page-plus="pagePlus"
    ></editor-main>
    <div id="editor-menu">
      <div>Page</div>
      <div id="menu-page">
        <div class="menu-page-btn" @click="pageMinus(5)">◁</div>
        <div class="menu-page-btn" @click="pageMinus(1)">◁</div>
        <div class="menu-page-txt">{{ page }}</div>
        <div class="menu-page-btn" @click="pagePlus(1)">▷</div>
        <div class="menu-page-btn" @click="pagePlus(5)">▷</div>
      </div>
      <div>First Number</div>
      <div id="menu-fn">
        <input type="number" class="menu-input" v-model="timing.firstNum" />
      </div>
      <div>BPM</div>
      <div id="menu-bpm">
        <input type="number" class="menu-input" v-model="timing.bpm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorMain from "./EditorMain.vue";
import { Timing } from "../../model/Timing";

type DataType = {
  page: number;
  timing: Timing;
};

export default Vue.extend({
  name: "EditorController",
  components: {
    EditorMain,
  },
  data(): DataType {
    return {
      page: 1,
      timing: {
        label: 1,
        firstNum: 200,
        bpm: 140,
      },
    };
  },
  methods: {
    pageMinus(n: number): void {
      this.page < 1 + n ? (this.page = 1) : (this.page -= n);
    },
    pagePlus(n: number): void {
      this.page += n;
    },
    pageMove(page:number){
      this.page = page;
    }
  },
});
</script>
