<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts">
import Vue from "vue";

type DataType = {
  msg: string;
};

export default Vue.extend({
  name: "StartMain",
  data(): DataType {
    return {
      msg: "hello"
    };
  }
});
</script>
