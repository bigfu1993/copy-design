<template>
  <div class="c-bar-wrap flex-column-center-start">
    <c-bar class="mb10 pb20" :data="data" />
    <c-bar :data="data" direction="horizontal" :grid="grid" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let data = ref({
      dataX: ["摄像机", "红外", "机器人", "传感器"],
      dataS: [
        {
          name: "总数",
          data: [7, 8, 14, 9, 22, 18, 11],
          color: ["#4992ff", "#02132B"],
        },
        {
          name: "在线数",
          data: [5, 7, 8, 4, 9, 12, 13],
          color: ["#7cffb2", "#02132b"],
        },
      ],
    });
    const grid = { top: 40, bottom: 30, left: "13%", right: "5%" };

    return {
      data,
      grid,
    };
  },
});
</script>

<style lang="less" scoped>
.c-bar-wrap {
  width: 500px;
  height: 700px;
  background-color: #0b254d;
  :deep(.c-bar-container) {
    height: 45% !important;
    border-bottom: 1px solid #fff;
    &:last-child {
      width: 90% !important;
      height: 55% !important;
      border-top: none;
    }
  }
}
</style>