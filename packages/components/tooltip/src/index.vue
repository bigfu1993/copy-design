<template>
  <div
    ref="contentRef"
    style="display: inline-block"
    :style="style"
    @mouseover="handleAction('hover', true)"
    @mouseleave="handleAction('hover', false)"
    @click="handleAction('click', !show)"
    @focusin="handleAction('focus', true)"
    @focusout="handleAction('focus', false)"
  >
    <teleport to="body">
    <div
      v-show="title"
      ref="titleRef"
      class="c-tooltip"
      :class="`${show ? 'visible' : ''} ${placement} ${overlayClass}`"
      :style="{
        ...overlayStyle,
        backgroundColor: background,
        color: color,
        left: realPos.left + 'px',
        top: realPos.top + 'px',
      }"
      @mouseover="handleAction('hover', true)"
      @mouseleave="handleAction('hover', false)"
    >
      {{ title }}
    </div>
  </teleport>
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "c-tooltip",
});
</script>
<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  trigger: {
    type: String,
    default: "hover",
  },
  placement: {
    type: String,
    default: "top",
  },
  style: {
    type: String,
    default: "",
  },
  offset: {
    type: Object,
    default: () => ({
      x: 0,
      y: 0,
    }),
  },
  background: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  overlayClass: {
    type: String,
    default: "",
  },
  overlayStyle: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["update:visible"]);

const show = ref(props.visible);
const titleRef = ref<any>(null);
const contentRef = ref<any>(null);
let contentInfo = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};
function computeElInfo(el: HTMLElement) {
  let left = el.offsetLeft;
  let top = el.offsetTop;
  const width = el.clientWidth;
  const height = el.clientHeight;
  if (el.offsetParent) {
    const info = computeElInfo(el.offsetParent as HTMLElement);
    left += info.left;
    top += info.top;
  }
  return {
    left,
    top,
    width,
    height,
  };
}
const realPos = ref({
  left: 0,
  top: 0,
});
watch(
  () => props.visible,
  (v) => {
    show.value = v;
  }
);
watch(
  () => show.value,
  (v) => {
    computePos(v);
  }
);
function computePos(visible: boolean) {
  if (visible && props.title) {
    nextTick(() => {
      contentInfo = computeElInfo(contentRef.value);
      const width = titleRef.value.clientWidth;
      const height = titleRef.value.clientHeight;
      const leftOffset = Math.max(width * 0.2, 8);
      const rightOffset = leftOffset === 8 ? width - 8 : width * 0.8;
      const topOffset = Math.max(height * 0.2, 8);
      const bottomOffset = topOffset === 8 ? height - 8 : height * 0.8;
      switch (props.placement) {
        case "topLeft":
          realPos.value.left =
            contentInfo.left -
            rightOffset +
            contentInfo.width / 2 +
            (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top - height - 5 + (props.offset?.y || 0);
          break;
        case "top":
          realPos.value.left =
            contentInfo.left -
            width * 0.5 +
            contentInfo.width / 2 +
            (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top - height - 5 + (props.offset?.y || 0);
          break;
        case "topRight":
          realPos.value.left =
            contentInfo.left -
            leftOffset +
            contentInfo.width / 2 +
            (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top - height - 5 + (props.offset?.y || 0);
          break;
        case "leftTop":
          realPos.value.left =
            contentInfo.left - width - 5 + (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top -
            bottomOffset +
            contentInfo.height / 2 +
            (props.offset?.y || 0);
          break;
        case "left":
          realPos.value.left =
            contentInfo.left - width - 5 + (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top -
            height * 0.5 +
            contentInfo.height / 2 +
            (props.offset?.y || 0);
          break;
        case "leftBottom":
          realPos.value.left =
            contentInfo.left - width - 5 + (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top -
            topOffset +
            contentInfo.height / 2 +
            (props.offset?.y || 0);
          break;
        case "rightTop":
          realPos.value.left =
            contentInfo.left + contentInfo.width + 5 + (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top -
            bottomOffset +
            contentInfo.height / 2 +
            (props.offset?.y || 0);
          break;
        case "right":
          realPos.value.left =
            contentInfo.left + contentInfo.width + 5 + (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top -
            height * 0.5 +
            contentInfo.height / 2 +
            (props.offset?.y || 0);
          break;
        case "rightBottom":
          realPos.value.left =
            contentInfo.left + contentInfo.width + 5 + (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top -
            topOffset +
            contentInfo.height / 2 +
            (props.offset?.y || 0);
          break;
        case "bottomLeft":
          realPos.value.left =
            contentInfo.left -
            rightOffset +
            contentInfo.width / 2 +
            (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top + contentInfo.height + 5 + (props.offset?.y || 0);
          break;
        case "bottom":
          realPos.value.left =
            contentInfo.left -
            width * 0.5 +
            contentInfo.width / 2 +
            (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top + contentInfo.height + 5 + (props.offset?.y || 0);
          break;
        case "bottomRight":
          realPos.value.left =
            contentInfo.left -
            leftOffset +
            contentInfo.width / 2 +
            (props.offset?.x || 0);
          realPos.value.top =
            contentInfo.top + contentInfo.height + 5 + (props.offset?.y || 0);
          break;
      }
    });
  }
}

function handleAction(action: string, visible: boolean) {
  if (action === props.trigger) {
    show.value = visible;
    emit("update:visible", visible);
  }
}
</script>

<style>
@import "./css/index.less";
</style>
