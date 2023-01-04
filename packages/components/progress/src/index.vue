<template>

    <div class="c-progress flex-center" v-if="mode == 'line'">
        <div class="c-progress-outer" :style="{ height: `${props.strokeWidth}px` }">
            <div class="c-progress-inner" :style="{ background: `${props.strokeColor}`, width: `${percent}%` }">
            </div>
        </div>
        <span class="flex1 ml5 color-4 progress-text">{{ percent }}%</span>
    </div>
    <div class="c-progress-circle flex-center" v-else :style="{ width: `${width}px` }">
        <svg :width="width" :height="width">
            <defs v-if="strokeColor.startColor">
                <linearGradient id="grad1" x1='0' x2='1' y1='0' y2='0'>
                    <stop offset="0%" :style="{ 'stop-color': `${strokeColor.startColor}` }"></stop>
                    <stop :offset="`${percent}%`" :style="{ 'stop-color': `${strokeColor.endColor}` }"></stop>
                </linearGradient>
            </defs>

            <circle class="circle" :stroke='backgroundColor' :stroke-width="strokeWidth" fill="none" :cx="width / 2"
                :cy="width / 2" :r="(width - 2 * strokeWidth) / 2">
            </circle>

            <circle :stroke-width="strokeWidth" class="circle" transform-origin="center" transform="rotate(-90)"
                stroke-linecap="round" :stroke="(((typeof strokeColor) == 'string' ? strokeColor : 'url(#grad1)'))"
                :cx="width / 2" :cy="width / 2" fill="none" :r="(width - 2 * strokeWidth) / 2"
                :stroke-dasharray="loadingProgress">
            </circle>

        </svg>
        <text v-if="textShow" :style="{ color: `${color}` }" class="process-text">{{ percent }}%</text>
    </div>
</template>
<script>
export default {
    name: 'c-progress'
}
</script>
<script  setup>
import { ref } from 'vue'
let props = defineProps(
    {
        //进度条颜色
        strokeColor: {
            type: [String, Object],
            default: '#1890ff'
        },
        //背景底色
        backgroundColor: {
            type: String,
            default: '#e9f0ff'
        },
        //进度百分比
        percent: {
            type: Number,
            default: 10
        },
        //进度条类型
        mode: {
            type: String,
            default: 'line'
        },
        //画布宽度&高度
        width: {
            type: Number,
            default: 100
        },
        //进度条宽度&&高度
        strokeWidth: {
            type: Number,
            default: 10
        },
        //文本颜色
        color: {
            type: String,
            default: '#000'
        },
        //文本是否显示
        textShow: {
            type: Boolean,
            default: true
        }
    }
)
let loadingProgress = ref(0)
let len = Math.floor(2 * Math.PI * ((props.width - 2 * props.strokeWidth) / 2))
loadingProgress.value = `${props.percent / 100 * len},100000`
</script>
<style lang="less">
@import './css/index.less';
</style>