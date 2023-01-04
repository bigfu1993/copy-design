<template>
  <div :class="`unselect c-drag c-drag-${placement}`" :style="dragStyle" :id="id">
    <div class="cursor flex-center hover-bar" :style="barStyle" @mousedown="dragStart" @mouseup="dragEnd">||</div>
    <slot>c-drag</slot>
    {{ dragStyle }}
  </div>
</template>

<script lang="ts">
export default { name: "c-drag", };
</script>
<script setup lang="ts" >
import { computed, ref, watch, PropType } from 'vue'
let props = defineProps({
  placement: {
    type: String,
    default: 'right'
  },
  value: {
    type: Number,
    default: 120
  },
  range: {
    type: Array as PropType<number[]>,
    default: [120, 300]
  }
})
let id = `drag-${Math.floor(Math.random() * 10000)}`
let originValue = ref(0) // 纵向：高 横向：宽
let isDragging = ref(false) // 是否正在拖拽
let startX = ref(0) // 开始x坐标
let startY = ref(0) // 开始y坐标
let offsetX = ref(0) // 横向偏移
let offsetY = ref(0) // 纵向偏移 

// 初始化容器尺寸
watch(() => props.value, val => originValue.value = val, { immediate: true })

// 容器样式
let dragStyle = computed(() => {
  let res = {}
  let [min, max] = props.range
  if (props.placement == 'left' || props.placement == 'right') {
    let calcValue = originValue.value + (props.placement == 'left' ? - offsetX.value : offsetX.value)
    let finalValue = calcValue < min ? min : calcValue > max ? max : calcValue
    Object.assign(res, { width: `${finalValue}px`, height: '100%' })
  }
  if (props.placement == 'top' || props.placement == 'bottom') {
    let calcValue = originValue.value + (props.placement == 'top' ? - offsetY.value : offsetY.value)
    let finalValue = calcValue < min ? min : calcValue > max ? max : calcValue
    Object.assign(res, { height: `${finalValue}px`, width: '100%' })
  }
  return res
})
// 拖拽bar样式
let barStyle = computed(() => {
  let res = {}
  if (props.placement == 'left') {
    Object.assign(res, { width: '6px', left: 0, height: '100%', cursor: 'w-resize' })
  }
  if (props.placement == 'right') {
    Object.assign(res, { width: '6px', right: 0, height: '100%', cursor: 'w-resize' })

  }
  if (props.placement == 'top') {
    Object.assign(res, { height: '6px', 'writing-mode': 'tb', top: 0, width: '100%', cursor: 'n-resize' })
  }
  if (props.placement == 'bottom') {
    Object.assign(res, { height: '6px', 'writing-mode': 'tb', bottom: 0, width: '100%', cursor: 'n-resize' })

  }
  return res
})
// 开始拖拽
function dragStart(e: any) {
  let { x, y } = e
  let el = document.getElementById(id) as HTMLElement // 容器dom
  isDragging.value = true // 是否正在拖拽标识
  originValue.value = ['left', 'right'].indexOf(props.placement) > -1 ? el.offsetWidth : el.offsetHeight // 多次拖拽，每次开始之前重写容器初始值
  startY.value = y // 重置起始y值
  startX.value = x // 重置起始x值
  offsetX.value = 0 // 初始化上一次偏移值
  offsetY.value = 0 // 初始化上一次偏移值

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", dragEnd);

  console.log('dragStart', e, startX.value, startY.value)
}
// 拖拽中：计算容器尺寸
function onDrag(e: any) {
  if (isDragging.value) {
    if (props.placement === "left") {
      let { x, y } = e
      offsetX.value = x - startX.value
      console.log(`初始化width:${originValue.value};开始x:${startX.value},当前x:${x},偏移${offsetX.value}`)
    }
    if (props.placement === "right") {
      let { x, y } = e
      offsetX.value = x - startX.value
      console.log(`初始化width:${originValue.value};开始x:${startX.value},当前x:${x},偏移${offsetX.value}`)
    }

    if (props.placement === "top") {
      let { x, y } = e
      offsetY.value = y - startY.value
      console.log(`初始化width:${originValue.value};开始x:${startY.value},当前x:${x},偏移${offsetY.value}`)
    }
    if (props.placement === "bottom") {
      let { x, y } = e
      offsetY.value = y - startY.value
      console.log(`初始化width:${originValue.value};开始x:${startY.value},当前x:${x},偏移${offsetY.value}`)
    }
  }
}
// 结束拖拽
function dragEnd(e: any) {
  isDragging.value = false
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", dragEnd);
  console.log('dragEnd', startX.value, startY.value)
}
</script>
<style lang="less">
@import './css/index.less';
</style>
