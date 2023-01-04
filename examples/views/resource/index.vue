<template>
  <div class="wrapper">
    <c-resource :data="data"></c-resource>
  </div>
</template>

<script lang="ts">
export default {
  name: "resource"
}
</script>
<script setup lang="ts">
import {ref} from "vue";

const data = ref([
  {
    url: "https://192.168.1.153/store/data/pictures/1_4_a38180ca665811ed8adc0242ac140065.jpg",
    resourceType: 0,
    opts: {
      preview: { show: true },
      type: 0,
    }
  },
  {
    url: "https://192.168.1.153/store/data/pictures/1_4_a38180ca665811ed8adc0242ac140065.jpg",
    resourceType: 0,
    opts: {
      preview: { show: true },
      type: 0,
    }
  }
]);
</script>

<style scoped lang="less">
.wrapper {
  height: 400px;
  width: 600px;
  margin-left: 400px;
}
</style>
