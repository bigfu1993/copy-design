<template>
  <div
    :class="[
      'c-list-container',
      'w100',
      'scroll',
      layout == 'flex' ? 'flex-row-start-between' : 'flex-row-start',
    ]"
  >
    <div class="list-l">
      <div class="list-l-checkbox" v-if="multi"></div>
      <div class="list-l-key mr10">
        <slot name="l"></slot>
      </div>
      <div class="list-l-label mr10">
        <slot name="default"></slot>
      </div>
    </div>
    <div class="list-r">
      <slot name="r"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "c-list",
  props: {
    layout: {
      type: String,
      default: "flex", // list布局：flex 两侧对齐，base 左对齐
    },
    multi: {
      type: Boolean,
      default: true, // 是否多选
    },
    disabled: {
      type: Boolean,
      default: true, // 是否禁用
    }
  },
  setup(props) {},
});
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>