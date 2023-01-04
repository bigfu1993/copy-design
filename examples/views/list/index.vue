<template>
  <div class="c-list-wrap">
    <c-list :data="data" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    let data = 0.6

    return {
      data,
    };
  },
});
</script>

<style lang="less" scoped>
.c-list-wrap {
  width: 150px;
  height: 150px;
  background-color: #ccc;
}
</style>