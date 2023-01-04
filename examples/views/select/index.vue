<template>
  <div class="c-select-wrapper flex-row-start-between">
    <div class="c-select-wrap">
      <span>单选下拉框</span>
      <c-select
        size="small"
        :value="value1"
        :options="options"
        @update:value="(e) => (value1 = e)"
      />
    </div>
    <div class="c-select-wrap">
      <span>多选下拉框</span>
      <c-select
        size="normal"
        :value="value2"
        mode="multiple"
        :options="options"
        @update:value="(e) => (value2 = e)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let value1 = ref(1);
    let value2 = ref([]);
    let options = ref([
      {
        value: 1,
        label: "草莓",
      },
      {
        value: 2,
        label: "车厘子",
      },
      {
        value: 3,
        label: "桑葚",
      },
      {
        value: 4,
        label: "榴莲",
        disabled: true
      },
      {
        value: 5,
        label: "hjhigdff播放的动bmnghmgmg画地方很多很多很多",
      },
    ]);
    return {
      value1,
      value2,
      options
    };
  },
});
</script>

<style lang="less" scoped>
.c-select-wrapper {
  width: 550px;
  height: 500px;
  padding: 10px;
  background-color: #0b254d;
  .c-select-wrap {
    width: 250px;
    > span {
      display: block;
      color: #fff;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
}
</style>