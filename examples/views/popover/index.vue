<template>
    <!-- <div>
        <div class="popover-btn-box flex">
            <div class="popover-btn">
                <c-popover placement="top">
                    <div>top</div>
                </c-popover>
            </div>
            <div class="popover-btn">
                <c-popover placement="topLeft">
                    <template #default>TL</template>
                </c-popover>
            </div>
            <div class="popover-btn">
                <c-popover placement="topRight">
                    <template #default>TR</template>
                </c-popover>
            </div>

        </div>
        <div class="popover-btn-box flex">
            <div class="popover-btn">
                <c-popover placement="bottom">
                    <template #default>bottom</template>
                </c-popover>
            </div>
            <div class="popover-btn">
                <c-popover placement="bottomLeft">
                    <template #default>bottomLeft</template>
                </c-popover>
            </div>
            <div class="popover-btn">
                <c-popover placement="bottomRight">
                    <template #default>bottomRight</template>
                </c-popover>
            </div>
        </div>
        <div class="popover-btn-box flex">
            <div class="popover-btn">
                <c-popover placement="left">
                    <template #default>left</template>
                </c-popover>
            </div>
            <div class="popover-btn">
                <c-popover placement="leftTop">
                    <template #default>leftTop</template>
                </c-popover>
            </div>
            <div class="popover-btn">
                <c-popover placement="leftBottom">
                    <template #default>leftBottom</template>
                </c-popover>
            </div>
        </div>
        <div class="popover-btn-box flex">
            <div class="popover-btn">
                <c-popover placement="right">
                    <template #default>right</template>
                </c-popover>
            </div>
            <div class="popover-btn">
                <c-popover placement="rightTop">
                    <template #default>rightTop</template>
                </c-popover>
            </div>
            <div class="popover-btn">
                <c-popover placement="rightBottom">
                    <template #default>rightBottom</template>
                </c-popover>
            </div>
        </div>


    </div> -->
    <div class="warp grid">
        <c-popover :placement="item.value" v-for="item in placements">
            <div class="item">{{ item.label }}</div>
        </c-popover>
    </div>

</template>
<script setup>
import { ref } from 'vue';
const placements = ref([
    { label: '', value: '' },
    { label: 'TL', value: 'topLeft' },
    { label: 'top', value: 'top' },
    { label: 'TR', value: 'topRight' },
    { label: '', value: '' },
    { label: 'LT', value: 'leftTop' },
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
    { label: 'RT', value: 'rightTop' },
    { label: 'left', value: 'left' },
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
    { label: 'right', value: 'right' },
    { label: 'LB', value: 'leftBottom' },
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
    { label: 'RB', value: 'rightBottom' },
    { label: '', value: '' },
    { label: 'BL', value: 'bottomLeft' },
    { label: 'bottom', value: 'bottom' },
    { label: 'BR', value: 'bottomRight' },
    { label: '', value: '' },
]);

</script>
<style lang="less">
.warp {
    grid-template-columns: repeat(5, 1fr);
    margin-left: 400px;

    .item {
        background: #eee;
        text-align: center;
    }
}
</style>