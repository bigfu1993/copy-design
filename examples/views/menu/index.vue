<template>
  <div class="flex-column flex1 modules-wrap">
    <div class="mb10">
      <c-menu v-model:connection="connection" :project="{ title: '测试', logo, hasRole: true }" :menus="routes"
        :video="video"></c-menu>
    </div>
    <div style="z-index: 100; height: 100px; width: 100%; background: red"></div>
  </div>
</template>

<script>
export default { name: 'md-menu' }
</script>
<script setup>
import { ref } from "vue";

const logo = require('./assets/logo.svg');
const video = require("#/assets/media/menubar-default.mp4");
const routes = [
  {
    icon: 'task',
    label: '导航1',
    value: 'menu1',
    children: [
      { path: '/components/button', label: '导航', value: 'menu11' },
      { path: '/components/table', label: '导航导航', value: 'menu11' },
      { path: '/modules/menu', label: '导航导航导航', value: 'menu12' }
    ]
  },
  { path: '/components/button', icon: 'task', label: '导航2', value: 'menu2' },
  {
    icon: 'task',
    label: '导航3',
    value: 'menu3',
    children: [
      { label: '导航31', value: 'menu31' },
    ]
  },
];
console.log(routes);
const connection = ref(0);
const timeout = setTimeout(() => {
  clearTimeout(timeout);
  connection.value = 1;
  const interval = setInterval(() => {
    connection.value = 2;
  }, 2000);
}, 1000);
</script>

<style lang="less" scoped>
.modules-wrap {
  width: 100%;
}
</style>
