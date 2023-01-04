<template>
    <div class="wh100 flex layout-wrap">
        <div class="flex-column mr10 l menu-wrap">
            <router-link :to="`/components/${c.path}`" v-for="(c, i) in componentsChildren" :key="i">
                {{ c.label }}
            </router-link>
        </div>
        <div class="p10 flex1 flex-row-start-start r scroll demo-wrap">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'layout'
}
</script>
<script setup>
import { componentsChildren } from '../index' 
</script>
<style lang="less" scoped>
.layout-wrap {

    .l {
        width: 300px;
        background: var(--fff);

        .router-link-active {
            color: var(--theme);
        }
    }

    .r {
        background: var(--fff);
    }
}
</style>