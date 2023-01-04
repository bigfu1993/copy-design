<template>
  <div class="c-image-wrapper">
    <teleport to="body">
      <div
        v-if="preview.show"
        v-show="isHover"
        class="c-image-preview-wrapper"
        :class="preview.placement || 'left'"
        :style="{
          width: `${previewSize}px`,
          height: `${previewSize}px`,
          left: `${
            displayImgInfo.left +
            preview.offset +
            ((preview.placement || 'left') === 'left'
              ? 0
              : displayImgInfo.width)
          }px`,
          top: `${displayImgInfo.top}px`,
        }"
      >
        <img
          :src="url"
          draggable="false"
          :style="{
            width: `${scaleP2D * displayImgInfo.width}px`,
            height: `${scaleP2D * displayImgInfo.height}px`,
            left: `${-scaleP2D * pos.left}px`,
            top: `${-scaleP2D * pos.top}px`,
          }"
        />
      </div>
    </teleport>
    <div class="image-wrapper flex-column">
      <img
        ref="displayImgRef"
        :src="url"
        draggable="false"
        @mousemove="onMousemove"
        @click="clickPoint"
        @mousedown="startSelect"
        @mouseup="endSelect"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      />
      <div
        v-show="isHover && !dragging"
        class="image-hover-wrapper"
        :style="{
          padding: hoverSize || '',
          left: `${pos.left}px`,
          top: `${pos.top}px`,
        }"
      ></div>
      <div
        v-show="
          type === 1 && dragging && rectParam.width > 4 && rectParam.height > 4
        "
        class="image-rect-wrapper"
        :style="{
          left: `${rectParam.left}px`,
          top: `${rectParam.top}px`,
          width: `${rectParam.width}px`,
          height: `${rectParam.height}px`,
        }"
      ></div>
    </div>
    <div class="footer" :class="{ show: showFooter }">
      <c-tooltip title="放大">
        <i
          class="iconfont icon-suofang cursor"
          @click="isFullscreen = true"
        ></i>
      </c-tooltip>
      <c-tooltip title="下载" class="ml10">
        <i
          class="iconfont icon-xiazai-wenjianxiazai-16 cursor"
          @click="download"
        ></i>
      </c-tooltip>
      <c-tooltip v-if="type === 1" title="图谱信息" class="ml10">
        <i
          class="iconfont icon-xiangqing cursor"
          @click="infraredVisible = true"
        ></i>
      </c-tooltip>
    </div>
    <div
      v-show="isFullscreen"
      class="fullscreen-image flex-row-center"
      @click="isFullscreen = false"
    >
      <img :src="url" draggable="false" />
    </div>
  </div>
</template>

<script>
export default { name: "c-image" };
</script>
<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { InfraRedPic } from "../utils";
import { downloadFile } from "#/utils/file";

const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  preview: {
    type: Object,
    default: () => ({
      show: false,
      size: 0,
      placement: "left",
      offset: 0,
    }),
  },
  hoverSize: {
    type: String,
    default: "",
  },
  type: {
    type: Number,
    default: 0,
  },
  download: {
    type: Object,
    default: () => ({
      filename: "下载图片",
      func: undefined,
    }),
  },
});
const emit = defineEmits(["infraredAnalyzed"]);

const displayImgRef = ref(null); // 显示图片元素
const displayImgInfo = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
}); // 显示图片大小
const previewSize = ref(0); // 预览图大小（边长）
const picData = ref({}); // 解析后的红外图谱信息
const scaleP2D = ref(1); // 缩放比 - 预览图与显示图片的比值
let hoverScale = 5; // 缩放比 - 显示图片width与hover方块边长比值
const scaleO2D = { x: 1, y: 1 }; // 缩放比 - 原图与显示图片的比值
onMounted(async () => {
  const interval = setInterval(() => {
    if (displayImgRef.value) {
      clearInterval(interval);
      displayImgInfo.value = computeElInfo(displayImgRef.value);
      previewSize.value =
        props.preview.size ||
        Math.min(displayImgRef.value.width, displayImgRef.value.height);
      if (props.hoverSize) {
        if (/%/.test(props.hoverSize))
          hoverScale = (1 / props.hoverSize.replace("%", "")) * 50;
        else if (/px/.test(props.hoverSize))
          hoverScale =
            displayImgInfo.value.width / props.hoverSize.replace("px", "") / 2;
      }
      scaleP2D.value =
        (previewSize.value / displayImgInfo.value.width) * hoverScale;
    }
  }, 200);
  if (props.type === 1) {
    try {
      const infraRedPic = new InfraRedPic();
      await infraRedPic.init(props.url);
      picData.value = infraRedPic.getAllData();
      scaleO2D.x = picData.value.width / displayImgInfo.value.width;
      scaleO2D.y = picData.value.height / displayImgInfo.value.height;
      emit("infraredAnalyzed", infraRedPic);
    } catch (e) {
      console.error(e);
    }
  }
});

function computeElInfo(el) {
  let left = el.offsetLeft;
  let top = el.offsetTop;
  const width = el.clientWidth;
  const height = el.clientHeight;
  if (el.offsetParent) {
    const info = computeElInfo(el.offsetParent);
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

const isHover = ref(false); // 是否hover
const pos = ref({ left: 0, top: 0 }); // hover的位置
const dragging = ref(false); // 是否正在拖拽
const dragPos = reactive({
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
}); // 拖拽的起始终止点位置
const rectParam = computed(() => ({
  left: Math.min(dragPos.startX, dragPos.endX),
  top: Math.min(dragPos.startY, dragPos.endY),
  width: Math.abs(dragPos.startX - dragPos.endX),
  height: Math.abs(dragPos.startY - dragPos.endY),
})); // 拖拽的矩形位置大小
const infraredVisible = ref(false); // 红外信息显示弹窗
const showFooter = ref(false); // 是否显示footer
const infraredData = ref({
  width: 0,
  height: 0,
  maxTemperature: 0,
  minTemperature: 0,
  averageTemperature: 0,
}); // 红外信息
// 点击点
function clickPoint(e) {
  if (
    props.type === 1 &&
    rectParam.value.width <= 4 &&
    rectParam.value.height <= 4
  ) {
    console.log("click");
  }
}
// 开始拖拽
function startSelect(e) {
  if (props.type === 1) {
    console.log("start");
    dragging.value = true;
    dragPos.startX = e.offsetX;
    dragPos.startY = e.offsetY;
    dragPos.endX = e.offsetX;
    dragPos.endY = e.offsetY;
  }
}
// 鼠标移动
function onMousemove(e) {
  if (dragging.value) {
    // 拖拽鼠标移动，此时计算rect位置大小
    dragPos.endX = e.offsetX;
    dragPos.endY = e.offsetY;
  } else {
    // 未拖拽鼠标移动，此时计算hover位置
    const width = e.target.width;
    const height = e.target.height;
    const perWidth = width / hoverScale;
    let left = e.offsetX - perWidth / 2;
    let top = e.offsetY - perWidth / 2;
    if (left < 0) left = 0;
    else if (left > width - perWidth) left = width - perWidth;
    if (top < 0) top = 0;
    if (top > height - perWidth) top = height - perWidth;
    pos.value = { left, top };
    // 判断是否显示footer
    const curTop = e.offsetY;
    showFooter.value = displayImgInfo.value.height - curTop <= 32;
  }
}
function endSelect(e) {
  if (props.type === 1) {
    console.log("end");
    dragging.value = false;
    dragPos.endX = e.offsetX;
    dragPos.endY = e.offsetY;
    console.log(dragPos);
    if (rectParam.value.width > 4 && rectParam.value.height > 4) {
      const left = Math.round(rectParam.value.left * scaleO2D.x);
      const top = Math.round(rectParam.value.top * scaleO2D.y);
      const width = Math.floor(rectParam.value.width * scaleO2D.x);
      const height = Math.floor(rectParam.value.height * scaleO2D.y);
      try {
        const IRDatas = picData.value.IRDatas;
        const selectDatas = [];
        let max = 0;
        let min = Infinity;
        let sum = 0;
        for (let i = top; i <= top + height; i++) {
          for (let j = left; j <= left + width; j++) {
            const pointData = IRDatas[i][j];
            selectDatas.push(pointData);
            max = Math.max(max, pointData);
            min = Math.min(min, pointData);
            sum += pointData;
          }
        }
        const average = sum / selectDatas.length;
        infraredData.value = {
          width,
          height,
          maxTemperature: max,
          minTemperature: min,
          averageTemperature: average,
        };
      } catch (e) {
        console.warn("非标准红外图谱文件");
      }
    }
  }
}

const isFullscreen = ref(false);
function download() {
  if (props.download.func)
    props.download.func(props.url, props.download.filename);
  else downloadFile(props.url, props.download.filename);
}
</script>

<style lang="less" scoped>
@import "./css/scoped.less";
</style>
<style lang="less">
@import "./css/index.less";
</style>
