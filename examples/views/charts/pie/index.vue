<template>
  <div class="c-pie-wrap flex-column-center-start">
    <c-pie :data="data1">
      <div class="text w100 h100"><div>hhhhhh</div></div>
    </c-pie>
    <c-pie :data="data2" mode="radial" style="width: 60%" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let data1 = ref([
      { value: 1048, name: "Search Engine" },
      { value: 735, name: "Direct" },
      { value: 580, name: "Email" },
      { value: 484, name: "Union Ads" },
    ]);
    let data2 = ref([75, 45, 20, 15]);

    return {
      data1,
      data2,
    };
  },
});
</script>

<style lang="less" scoped>
.c-pie-wrap {
  width: 300px;
  height: 600px;
  background-color: #0b254d;
  :deep(.c-pie-container) {
    position: relative;
    height: 50% !important;
    .text {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>