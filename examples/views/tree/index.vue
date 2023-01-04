<template>
    <div>
        <c-tree :rightAble="true" @checked="onCheck" @selected="onSelect" :checkable="true">
            <template #l="{ data }">
                <span class="icon-content" @click="test(data)">
                    <i class="iconfont icon-shijian" :style="data.active ? { color: '#43ecbc' } : {}"></i>
                </span>
            </template>
            <template #r="{ data }">
                <span class="icon-content mr5" @click="test(data)">
                    <i class="iconfont icon-suoding" :style="data.active ? { color: '#43ecbc' } : {}"></i>
                </span>
                <span class="icon-content mr5" @click="test(data)">
                    <i class="iconfont icon-icon-" :style="data.active ? { color: '#43ecbc' } : {}"></i>
                </span>
            </template>
            <template #content="{ data }">
                <div class="content">
                    <p>{{ data.key }}</p>
                    <p>{{ data.title }}</p>
                    <p>{{ 123 }}</p>
                </div>
            </template>
        </c-tree>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { getCurrentInstance } from 'vue';
    const instance: any = getCurrentInstance();
    let key = ref(2)
    function test(data) {
        console.log(data)
        data.active = !data.active
        console.log(data)

    }
    function onCheck(keys, nodes) {
        console.log('树选中', keys, nodes);
    }
    function onSelect(keys, nodes) {
        console.log('节点选中', keys, nodes);
    }
</script>
<style lang="less" scoped>
.icon-content {
    display: inline-flex;
}

.content {
    width: 100px;
    border-radius: 5px;
    background: #eee;
    padding: 5px;

    p {
        text-align: center;
        margin-bottom: 5px;
        border-bottom: 1px #ddd solid;
    }
}
</style>