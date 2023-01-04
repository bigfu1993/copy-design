<template>
    <div class="icon-wrap flex-row-start flex-wrap gp10">
        <div class="flex-column-center-between icon-item" v-for="i in 80" :key="i">
            <div class="flex1 flex-center">
                <c-icon name="upload"></c-icon>
            </div>
            <span class="flex-center cursor w100">upload</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'icon'
}
</script>

<style lang="less" scoped>
.icon-item {
    width: 120px;
    height: 120px;
    background: #ddd;

    span {
        color: var(--fff);
        background: #99999940;
    }
}
</style>