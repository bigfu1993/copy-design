<template>
  <div ref="resourceRef" class="c-resource-wrapper">
    <div
      class="c-resource-content"
      :style="{ left: `${-contentSize.width * (active - 1)}px` }"
    >
      <div
        v-for="(item, index) in data"
        :key="index"
        class="item-wrapper"
        :style="{
          width: contentSize.width + 'px',
          height: contentSize.height + 'px',
        }"
      >
        <component
          :is="itemMap[item.resourceType]"
          v-bind="{
            url: item.url,
            preview: {
              ...item.opts?.preview,
              offset: -index * contentSize.width,
            },
          }"
        ></component>
      </div>
    </div>
    <div class="c-resource-dot-wrapper">
      <div
        v-for="i in data.length"
        class="c-resource-dot"
        :class="{ active: i === active }"
        @click="activeChange(i)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "c-resource",
});
</script>
<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["change"]);

const itemMap = {
  0: "c-image",
  1: "c-audio",
  2: "c-video",
}; // 子组件种类Map

const resourceRef = ref<any>(null);
const contentSize = ref({
  width: 0,
  height: 0,
}); // 元素大小
onMounted(() => {
  nextTick(() => {
    contentSize.value = {
      width: resourceRef.value.clientWidth,
      height: resourceRef.value.clientHeight,
    };
  });
}); // 获取元素大小

const active = ref(1); // 当前显示元素
function activeChange(i: number) {
  active.value = i;
  emit("change", i - 1);
}
</script>

<style scoped lang="less">
@import "./css/scoped.less";
</style>
