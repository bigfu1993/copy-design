<template>
  <div class="c-line-wrap">
    <c-line :data="data" :area="false"/>
    <div class="line w100 mtb20"></div>
    <c-line :data="data" :area="true" />
  </div>
</template>

<script>
import { defineComponent,ref } from "vue";
export default defineComponent({
  setup() {
    let data = ref({
      dataX: [1, 2, 3, 4, 5, 6, 7],
      dataS: [
        [5, 7, 8, 4, 9, 12, 13],
        [7, 8, 14, 9, 22, 18, 11],
      ],
    });

    return {
      data,
    };
  },
});
</script>

<style lang="less" scoped>
.c-line-wrap {
  width: 500px;
  height: 600px;
  background-color: #0b254d;
  :deep(.c-line-container) {
    height: 45% !important;
  }
  .line {
    height: 1px;
    background-color: #fff;
  }
}
</style>