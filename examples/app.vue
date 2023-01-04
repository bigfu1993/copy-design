<template>
  <div class="wh100 flex-column root">
    <div class="flex-row-center-between plr10 header-wrap">
      <div class="flex-row-center logo-wrap">
        <img class="mr10" src="#/assets/images/logo.svg" alt="" srcset=" ">
        Copy-Design
      </div>
      <div class="grid3 menu-wrap">
        <router-link :to="m.path" v-for="(m, i) in routes" :class="route.path.indexOf(m.path) > -1 ? 'active' : ''">{{
            m.label
        }}</router-link>
      </div>
    </div>
    <div class="over-hidden flex1 p10 content-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "root",
  mounted: () => {
    // document.querySelector(':root').style.setProperty('--theme', '#ff0000')
  }
};
</script>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()
let routes = [
  { label: '文档', path: '/documents' },
  { label: '组件', path: '/components' },
  { label: '模板', path: '/modules' }
]
</script>
<style lang="less"  >
#app {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less" scoped>
.root {
  background: #ddd;

  .header-wrap {
    background: #fff;
    height: 60px;

    .logo-wrap {
      img {
        width: 40px;
        height: 40px;
      }
    }

    .menu-wrap {
      width: 120px;

      .active {
        color: var(--theme);
      }
    }
  }

  .content {
    overflow: hidden;
  }
}
</style>