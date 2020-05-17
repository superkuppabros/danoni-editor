<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Now: {{ cpt }}</p>
    <p>Now: {{ flag }}, {{ now() }}</p>
    <ul>
      <li v-for="str in arr" :key="str.index">{{ str }}</li>
    </ul>
    <div @click="cptFlag()">click</div>
    <div @click="push()">click</div>
    <div v-if="flag">バレる</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    cpt: () => new Date(Date.now()).toTimeString(),
  },
  methods: {
    now: () => new Date(Date.now()).toTimeString(),
    cptFlag: function(){ this.flag = !this.flag },
    push: function(){ this.arr.push("aaa") }
  },
  data: () => ({
    arr: ["ssss"],
    flag: false
  })
};
</script>
