<template>
  <div class="c-liquid-wrap">
    <c-liquid :data="data" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let data = ref(0.6);

    return {
      data,
    };
  },
});
</script>

<style lang="less" scoped>
.c-liquid-wrap {
  width: 150px;
  height: 150px;
  background-color: #0b254d;
}
</style>