<template>
    <div class="wh100 flex layout-wrap">
        <div class="flex-column mr10 l menu-wrap">
            <h3>开始</h3>
            <router-link to="">说明</router-link>
            <router-link to="setup">安装</router-link>
            <router-link to="">快速上手</router-link>
            <h3>开始</h3>
            <h3>开始</h3>
        </div>
        <div class=" flex1 r demo-wrap">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'layout-documents'
}
</script>

<style lang="less" scoped>
.layout-wrap {

    .l {
        width: 300px;
        background: var(--fff);
    }

    .r {
        background: var(--fff);
    }
}
</style>