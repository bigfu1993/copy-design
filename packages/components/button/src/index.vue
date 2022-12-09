<template>
  <div
    :class="`flex-row-center ${design ? 'c-button-design' : 'c-button'}  ${primary ? 'btn-primary' : ''} ${ghost ? 'btn-ghost' : ''} ${type ? type : ''} size-${size}`"
    :style="`font-weight: ${weight ? '700' : '400'}`">
    <span>
      <slot name="l"></slot>
      <slot>按钮</slot>
      <slot name="r"></slot>
    </span>
    <em :style="`width:${corners[0][0]}px;height:${corners[0][1]}px`" class="corner-border left-top-border"
      v-if="design && corners[0]"></em>
    <em :style="`width:${corners[1][0]}px;height:${corners[1][1]}px`" class="corner-border right-top-border"
      v-if="design && corners[1]"></em>
    <em :style="`width:${corners[2][0]}px;height:${corners[2][1]}px`" class="corner-border left-bottom-border"
      v-if="design && corners[2]"></em>
    <em :style="`width:${corners[3][0]}px;height:${corners[3][1]}px`" class="corner-border right-bottom-border"
      v-if="design && corners[3]"></em>
  </div>

</template>

<script>
export default {
  name: "c-button",
};
</script>
<script  setup>
import { computed } from 'vue'
let props = defineProps({
  design: {
    type: Boolean,
    default: false
  },
  weight: {
    type: Boolean,
    default: false
  },
  corners: {
    type: Array,
    default: () => []
  },
  primary: {
    type: Boolean,
    default: false
  },
  ghost: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'normal'
  }
})
let cornerStyle = computed(() => {
  return `border`
})
</script>
<style lang="less">
@import './css/index.less';
</style>
