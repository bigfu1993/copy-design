<template>
  <div class="c-audio-wrapper flex-column">
    <div ref="waveformRef" class="wave"></div>
    <div ref="timelineRef" class="timeline"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name: "c-audio"
});
</script>
<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline';
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => ({
      waveColor: '#409EFF',
      progressColor: '#409EFF',
      backend: 'MediaElement',
      mediaControls: false,
      audioRate: '1',
      barWidth: 1.2,
      barHeight: 1.5,
      height: 100,
      cursorColor: '#ccc',
    }),
  },
  timelineOptions: {
    type: Object,
    default: () => ({
      show: true,
      height: 40,
      notchPercentHeight: 40,
      primaryColor: '#409EFF',
      secondaryColor: '#409EFF',
      primaryFontColor: '#409EFF',
      secondaryFontColor: '#409EFF',
    }),
  },
  download: {
    type: Object,
    default: () => ({
      filename: '下载图片',
      func: undefined,
    }),
  },
});

let wavesurfer: any = null;
const waveformRef = ref<any>(null);
const timelineRef = ref<any>(null);
onMounted(() => {
  const interval = setInterval(() => {
    if (waveformRef.value && !wavesurfer) {
      clearInterval(interval)
      const height = waveformRef.value.clientHeight
      console.log(height);
      wavesurfer = WaveSurfer.create({
        container: waveformRef.value,
        height,
        normalize: true,
        ...props.options,
        plugins: props.timelineOptions.show
            ? [
                TimelinePlugin.create({
                  container: timelineRef.value,
                  ...props.timelineOptions,
                })
              ]
            : undefined,
      })
      wavesurfer.on('ready', async function () {
        wavesurfer.play()
      })
    }
  }, 100)
});

onBeforeUnmount(() => {
  destroy();
});

function play() {
  wavesurfer && wavesurfer.play();
}
function pause() {
  wavesurfer && wavesurfer.pause();
}
function destroy() {
  wavesurfer && wavesurfer.destroy();
}

defineExpose({
  play,
  pause,
  destroy,
});
</script>

<style scoped lang="less">
@import "./css/scoped.less";
</style>
