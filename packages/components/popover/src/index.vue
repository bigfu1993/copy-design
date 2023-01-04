<template>
    <div class="c-popover">
        <Transition>
            <div ref="modal" :class="`position${placement}`" @mouseenter="mouseAction(true)"
                @mouseleave="mouseAction(false)" v-show="show" class="c-popover-model"
                :style="{ top: `${positions.top}px`, left: `${positions.left}px` }">
                <div class="c-popover-model-title">title</div>
                <div class="c-popover-model-content">
                    content
                </div>
            </div>
        </Transition>
        <div ref="popover" class="c-popover-content" @mouseleave="mouseAction(false)" @mouseenter="mouseAction(true)">
            <slot name="default"></slot>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'c-popover'
    }
</script>
<script setup lang="ts">
    import { nextTick, onMounted, ref, watch } from 'vue'
    let props = defineProps({
        placement: {
            type: String,
            default: 'top'
        }
    })
    let show: any = ref(false)
    let popover: any = ref(null)
    let modal: any = ref(null)
    let positions: any = ref({
        top: 0,
        left: 0,
        width: 0,
        height: 0
    })
    function mouseAction(e: Boolean) {
        show.value = e
    }
    watch(() => show.value, (val) => {
        if (val) {
            nextTick(() => {
                switch (props.placement) {
                    case 'top':
                        positions.value.top = popover.value.offsetTop - modal.value.offsetHeight - 5
                        positions.value.left = popover.value.offsetLeft - (modal.value.offsetWidth / 2 - popover.value.offsetWidth / 2)
                        break;
                    case 'topLeft':
                        positions.value.top = popover.value.offsetTop - modal.value.offsetHeight - 5
                        positions.value.left = popover.value.offsetLeft
                        break;
                    case 'topRight':
                        positions.value.top = popover.value.offsetTop - modal.value.offsetHeight - 5
                        positions.value.left = popover.value.offsetLeft - (modal.value.offsetWidth - popover.value.offsetWidth)
                        break;
                    case 'bottom':
                        positions.value.top = popover.value.offsetHeight + popover.value.offsetTop + 5
                        positions.value.left = popover.value.offsetLeft - (modal.value.offsetWidth / 2 - popover.value.offsetWidth / 2)
                        break;
                    case 'bottomLeft':
                        positions.value.top = popover.value.offsetHeight + popover.value.offsetTop + 5
                        positions.value.left = popover.value.offsetLeft
                        break;
                    case 'bottomRight':
                        positions.value.top = popover.value.offsetHeight + popover.value.offsetTop + 5
                        positions.value.left = popover.value.offsetLeft - (modal.value.offsetWidth - popover.value.offsetWidth)
                        break;
                    case 'left':
                        positions.value.top = popover.value.offsetTop - (modal.value.offsetHeight / 2 - popover.value.offsetHeight / 2)
                        positions.value.left = popover.value.offsetLeft - modal.value.offsetWidth - 5
                        break;
                    case 'leftTop':
                        positions.value.top = popover.value.offsetTop
                        positions.value.left = popover.value.offsetLeft - modal.value.offsetWidth - 5
                        break;
                    case 'leftBottom':
                        positions.value.top = popover.value.offsetTop - (modal.value.offsetHeight - popover.value.offsetHeight)
                        positions.value.left = popover.value.offsetLeft - modal.value.offsetWidth - 5
                        break;
                    case 'right':
                        positions.value.top = popover.value.offsetTop - (modal.value.offsetHeight / 2 - popover.value.offsetHeight / 2)
                        positions.value.left = popover.value.offsetLeft + popover.value.offsetWidth + 5
                        break;
                    case 'rightTop':
                        positions.value.top = popover.value.offsetTop
                        positions.value.left = popover.value.offsetLeft + popover.value.offsetWidth + 5
                        break;
                    case 'rightBottom':
                        positions.value.top = popover.value.offsetTop - (modal.value.offsetHeight - popover.value.offsetHeight)
                        positions.value.left = popover.value.offsetLeft + popover.value.offsetWidth + 5
                        break;
                    default:
                        break;
                }
            })

        }


    }, {
        deep: true,
        immediate: true
    })

    onMounted(() => {
    })

</script>
<style lang="less">
@import './css/index.less';
</style>