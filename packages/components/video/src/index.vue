<template>
  <div class="c-video-wrapper">
    <div ref="videoRef" class="c-video-content">
      <div v-if="url" class="video">
        <div ref="playerRef"></div>
        <div v-if="hasController" class="footer" :class="{ show: controlListVisible || showFooter }">
          <div class="actions">
            <a-checkbox
              v-if="selectable && clickable"
              v-model:checked="videoOpts.isFrame"
              style="color: white"
              @change="firstCommand = true"
            >框选</a-checkbox>
            <c-tooltip v-if="isPaused || isClosed" placement="top" title="播放" class="ml10">
              <i class="iconfont icon-bofang" @click="play()"></i>
            </c-tooltip>
            <c-tooltip  v-else placement="top" title="暂停" class="ml10">
              <i class="iconfont icon-zanting" @click="pause()"></i>
            </c-tooltip >
            <c-tooltip  placement="top" title="关闭" class="ml10">
              <i class="iconfont icon-guanbi" @click="close()"></i>
            </c-tooltip >
            <c-tooltip  placement="top" title="重播" class="ml10">
              <i class="iconfont icon-zhongzhi2" @click="reload()"></i>
            </c-tooltip >
            <slot name="opt-extend"></slot>
          </div>
          <div
            class="speed-control-select"
            @click="controlListVisible = !controlListVisible"
          >
            控速:{{ speedLabelMap[videoOpts.speed] }}
          </div>
        </div>
        <div v-if="controlListVisible" class="speed-control-list">
          <div
            v-for="item in speedList"
            :key="item.value"
            class="control-list-item"
            :class="{ active: videoOpts.speed === item.value }"
            @click="videoOpts.speed = item.value"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="wh100 flex-row-center bold font-5"
      >
        暂无信号源
      </div>
      <div
        v-if="url && !videoOpts.isFrame"
        class="controller-wrap-0"
        :style="firstCommand ? '' : 'background: transparent'"
        @click="firstCommand = false"
        @mousemove="onMouseMove"
      >
        <div
          :class="firstCommand ? 'grid-item' : ''"
          style="cursor: nw-resize"
          @mousedown="cameraControl('ptz-pan-lt', videoOpts.speed, false)"
          @mouseup="cameraControl('ptz-pan-lt', videoOpts.speed, true)"
        >
          {{ firstCommand ? "↖" : "" }}
        </div>
        <div
          :class="firstCommand ? 'grid-item' : ''"
          style="cursor: n-resize"
          @mousedown="cameraControl('ptz-pan-up', videoOpts.speed, false)"
          @mouseup="cameraControl('ptz-pan-up', videoOpts.speed, true)"
        >
          {{ firstCommand ? "↑" : "" }}
        </div>
        <div
          :class="firstCommand ? 'grid-item' : ''"
          style="cursor: ne-resize"
          @mousedown="cameraControl('ptz-pan-rt', videoOpts.speed, false)"
          @mouseup="cameraControl('ptz-pan-rt', videoOpts.speed, true)"
        >
          {{ firstCommand ? "↗" : "" }}
        </div>
        <div
          :class="firstCommand ? 'grid-item' : ''"
          style="cursor: w-resize"
          @mousedown="cameraControl('ptz-pan-left', videoOpts.speed, false)"
          @mouseup="cameraControl('ptz-pan-left', videoOpts.speed, true)"
        >
          {{ firstCommand ? "←" : "" }}
        </div>
        <div
          :class="firstCommand ? 'grid-item' : ''"
          class="d-flex flex-column"
          style="cursor: default"
        >
          <div
            :class="firstCommand ? 'bordered-b' : ''"
            class="flex-grow-1 full-width d-flex align-center justify-center zoom-in"
            @mousedown="cameraControl('ptz-zoom-in', videoOpts.speed, false)"
            @mouseup="cameraControl('ptz-zoom-in', videoOpts.speed, true)"
          >
            {{ firstCommand ? "焦距拉近" : "" }}
          </div>
          <div
            class="flex-grow-1 full-width d-flex align-center justify-center zoom-out"
            @mousedown="cameraControl('ptz-zoom-out', videoOpts.speed, false)"
            @mouseup="cameraControl('ptz-zoom-out', videoOpts.speed, true)"
          >
            {{ firstCommand ? "焦距拉远" : "" }}
          </div>
        </div>
        <div
          :class="firstCommand ? 'grid-item' : ''"
          style="cursor: e-resize"
          @mousedown="cameraControl('ptz-pan-right', videoOpts.speed, false)"
          @mouseup="cameraControl('ptz-pan-right', videoOpts.speed, true)"
        >
          {{ firstCommand ? "→" : "" }}
        </div>
        <div
          :class="firstCommand ? 'grid-item' : ''"
          style="cursor: sw-resize"
          @mousedown="cameraControl('ptz-pan-ld', videoOpts.speed, false)"
          @mouseup="cameraControl('ptz-pan-ld', videoOpts.speed, true)"
        >
          {{ firstCommand ? "↙" : "" }}
        </div>
        <div
          :class="firstCommand ? 'grid-item' : ''"
          style="cursor: s-resize"
          @mousedown="cameraControl('ptz-pan-down', videoOpts.speed, false)"
          @mouseup="cameraControl( 'ptz-pan-down', videoOpts.speed, true)"
        >
          {{ firstCommand ? "↓" : "" }}
        </div>
        <div
          :class="firstCommand ? 'grid-item' : ''"
          style="cursor: se-resize"
          @mousedown="cameraControl('ptz-pan-rd', videoOpts.speed, false)"
          @mouseup="cameraControl('ptz-pan-rd', videoOpts.speed, true)"
        >
          {{ firstCommand ? "↘" : "" }}
        </div>
      </div>
      <div
        v-if="url && videoOpts.isFrame"
        class="controller-wrap-1"
        :style="firstCommand ? '' : 'background: transparent'"
        @click="firstCommand = false"
        @mousedown="dragStart"
        @mousemove="drag"
        @mouseup="dragEnd"
      >
        <span v-show="firstCommand">拖拽选择</span>
      </div>
      <div
        class="drag-rect"
        :class="
          rectParam.width || rectParam.height
            ? 'bordered bg-transparent-white'
            : ''
        "
        :style="`left: ${rectParam.left}px; top: ${rectParam.top}px; width: ${rectParam.width}px; height: ${rectParam.height}px`"
        @dragstart="() => false"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "c-video",
});
</script>
<script setup lang="ts">
import {
  computed, nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import {PosControlCommand} from "./declare";

const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  hasController: {
    type: Boolean,
    default: true,
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  clickable: {
    type: Boolean,
    default: true,
  },
  playerOpts: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["clicked", "selected"]);

let player: any;
const playerRef = ref<any>(null);
let playerInfo = { width: NaN, height: NaN, ratio: NaN }; // 播放器信息
watch(
  () => props.url,
  (v) => {
    if (v) {
      if (player) player.destroy();
      const timeout = setTimeout(async () => {
        clearTimeout(timeout);
        initPlayer();
        player.play(props.url);
      }, 200);
    } else {
      player && player.destroy();
    }
  }
);
const firstCommand = ref(true);
const videoOpts = ref({
  isFrame: !props.clickable,
  model: 0,
  speed: 3,
});
const contentSize = {
  width: 0,
  height: 0,
};
const dragPos = reactive({
  startX: 0,
  endX: 0,
  startY: 0,
  endY: 0,
});
const rectParam = computed(() => ({
  left: Math.min(dragPos.startX, dragPos.endX),
  top: Math.min(dragPos.startY, dragPos.endY),
  width: Math.abs(dragPos.startX - dragPos.endX),
  height: Math.abs(dragPos.startY - dragPos.endY),
}));

let dragging = false;
function dragStart(e: MouseEvent) {
  if (!firstCommand.value) {
    dragging = true;
    dragPos.startX = e.offsetX;
    dragPos.startY = e.offsetY;
    dragPos.endX = e.offsetX;
    dragPos.endY = e.offsetY;
  }
}
function drag(e: MouseEvent) {
  if (dragging) {
    dragPos.endX = e.offsetX;
    dragPos.endY = e.offsetY;
  }
}
async function dragEnd(e: MouseEvent) {
  if (!firstCommand.value && dragging) {
    dragging = false;
    dragPos.endX = e.offsetX;
    dragPos.endY = e.offsetY;

    let scale = 1;
    let range = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    };
    if (playerInfo.ratio > 1) {
      scale = playerInfo.width / contentSize.width;
      const realHeight = playerInfo.height / scale;
      range = {
        x1: 0,
        y1: (contentSize.height - realHeight) / 2,
        x2: contentSize.width,
        y2: (contentSize.height + realHeight) / 2,
      };
    } else {
      scale = playerInfo.height / contentSize.height;
      const realWidth = playerInfo.width / scale;
      range = {
        x1: (contentSize.width - realWidth) / 2,
        y1: 0,
        x2: (contentSize.width + realWidth) / 2,
        y2: contentSize.height,
      };
    }
    if (dragPos.startX < range.x1) dragPos.startX = range.x1;
    if (dragPos.startX > range.x2) dragPos.startX = range.x2;
    if (dragPos.startY < range.y1) dragPos.startY = range.y1;
    if (dragPos.startY > range.y2) dragPos.startY = range.y2;
    if (dragPos.endX < range.x1) dragPos.endX = range.x1;
    if (dragPos.endX > range.x2) dragPos.endX = range.x2;
    if (dragPos.endY < range.y1) dragPos.endY = range.y1;
    if (dragPos.endY > range.y2) dragPos.endY = range.y2;

    const x1 = (dragPos.startX - range.x1) * scale;
    const x2 = (dragPos.endX - range.x1) * scale;
    const y1 = (dragPos.startY - range.y1) * scale;
    const y2 = (dragPos.endY - range.y1) * scale;

    emit("selected", { selectInfo: { x1, x2, y1, y2 }, playerInfo, contentSize }, videoOpts.value.speed);

    dragPos.startX = 0;
    dragPos.startY = 0;
    dragPos.endX = 0;
    dragPos.endY = 0;
  }
}
function cameraControl(command: PosControlCommand, speed: number, isStop: boolean) {
  if (!firstCommand.value) emit("clicked", command, speed, isStop);
}
onMounted(() => {
  if (player) player.destroy();
  showFooter.value = false;
  isPaused.value = false;
  nextTick(() => {
    contentSize.width = videoRef.value.clientWidth;
    contentSize.height = videoRef.value.clientHeight;
    if (props.url) {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        initPlayer();
        player.play(props.url);
      }, 200);
    }
  });
  window.addEventListener("resize", handleResize);
});

const videoRef = ref<any>(null);
function initPlayer() {
  player = new (window as any).Jessibuca({
    container: playerRef.value,
    videoBuffer: 0.2, // 缓存时长
    isResize: true,
    text: "",
    loadingText: "加载中",
    debug: true,
    forceNoOffscreen: true,
    isNotMute: false,
  })
  player.on(
    "videoInfo",
    function (data: { width: number; height: number }) {
      console.log("width:", data.width, "height:", data.width);
      playerInfo = {
        width: data.width,
        height: data.height,
        ratio: data.width / data.height,
      };
    }
  );
  player.on("play", function () {
    console.error("play");
  })
}

function handleResize() {
  const contentEle = document.getElementById("content") as HTMLElement;
  contentSize.width = contentEle.clientWidth;
  contentSize.height = contentEle.clientHeight;
}

const speedLabelMap = {
  1: "1X",
  2: "2X",
  3: "3X",
  4: "4x",
  5: "5X",
  6: "6X",
  7: "7X",
  8: "8X",
  9: "9X",
  10: "10X",
};
const speedList = [
  { label: "1倍速", value: 1 },
  { label: "2倍速", value: 2 },
  { label: "3倍速", value: 3 },
  { label: "4倍速", value: 4 },
  { label: "5倍速", value: 5 },
  { label: "6倍速", value: 6 },
  { label: "7倍速", value: 7 },
  { label: "8倍速", value: 8 },
  { label: "9倍速", value: 9 },
  { label: "10倍速", value: 10 },
];
const controlListVisible = ref(false);

const showFooter = ref(false);
function onMouseMove(e: MouseEvent) {
  const curTop = e.offsetY + (e.target as HTMLElement).offsetTop;
  showFooter.value = contentSize.height - curTop <= 32;
}
const isPaused = ref(false);
const isClosed = ref(false);
function pause() {
  player && player.pause();
  isPaused.value = true;
}
function play(reload = false) {
  if (isClosed.value) reload = true;
  player && player.close() && player.play(reload ? props.url : undefined);
  isPaused.value = false;
  isClosed.value = false;
}
function close() {
  player && player.close();
  isClosed.value = true;
}
function destroy() {
  player && player.destroy();
}
function reload() {
  close();
  play(true);
}
onBeforeUnmount(() => {
  destroy();
  window.removeEventListener("resize", handleResize);
});
defineExpose({
  play,
  pause,
  reload,
  close,
  destroy,
});
</script>

<style scoped lang="less">
@import "./css/scoped.less";
</style>
