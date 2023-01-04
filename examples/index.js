console.log("I get called from print.js!");
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./app.vue";
const vm = createApp(App);

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
vm.use(Antd);

import CD from "#/index";
import "#/assets/style/index.less";
vm.use(CD);

// 组件routes
export let componentsChildren = [
  {
    path: "button",
    label: "按钮",
    component: () => import("./views/button/index.vue"),
  },
  {
    path: "icon",
    label: "图标",
    component: () => import("./views/icon/index.vue"),
  },
  {
    path: "menu",
    label: "导航",
    component: () => import("./views/menu/index.vue"),
  },
  {
    path: "table",
    label: "表格",
    component: () => import("./views/table/index.vue"),
  },
  {
    path: "line",
    label: "折线图",
    component: () => import("./views/charts/line/index.vue"),
  },
  {
    path: "bar",
    label: "柱状图",
    component: () => import("./views/charts/bar/index.vue"),
  },
  {
    path: "pie",
    label: "饼图",
    component: () => import("./views/charts/pie/index.vue"),
  },
  {
    path: "liquid",
    label: "水球图",
    component: () => import("./views/charts/liquid/index.vue"),
  },
  {
    path: "drag",
    label: "拖拽容器",
    component: () => import("./views/drag/index.vue"),
  },
  {
    path: "message",
    label: "消息提示",
    component: () => import("./views/message/index.vue"),
  },
  {
    path: "tooltip",
    label: "文字提示",
    component: () => import("./views/tooltip/index.vue"),
  },
  {
    path: "image",
    label: "图片",
    component: () => import("./views/image/index.vue"),
  },
  {
    path: "progress",
    label: "进度条",
    component: () => import("./views/progress/index.vue"),
  },
  {
    path: "audio",
    label: "音频",
    component: () => import("./views/audio/index.vue"),
  },
  {
    path: "video",
    label: "视频",
    component: () => import("./views/video/index.vue"),
  },
  {
    path: "resource",
    label: "资源轮播",
    component: () => import("./views/resource/index.vue"),
  },
  {
    path: "list",
    label: "列表",
    component: () => import("./views/list/index.vue"),
  },
  {
    path: "date",
    label: "时间选择框",
    component: () => import("./views/date/index.vue"),
  },
  {
    path: "input",
    label: "输入框",
    component: () => import("./views/input/index.vue"),
  },
  {
    path: "select",
    label: "选择器",
    component: () => import("./views/select/index.vue"),
  },
  {
    path: "popover",
    label: "气泡卡片",
    component: () => import("./views/popover/index.vue"),
  },
  {
    path: "tree",
    label: "树形组件",
    component: () => import("./views/tree/index.vue"),
  },
];
// 模块routes
export let modulesChildren = [
  {
    path: "button",
    component: () => import("./views/button/index.vue"),
  },
  {
    path: "progress",
    component: () => import("./views/progress/index.vue"),
  },
];
// 文档routes
export let documentsChildren = [
  {
    path: "button",
    component: () => import("./views/button/index.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/components",
    },
    {
      path: "/components",
      redirect: "/components/button",
      component: () => import("./layout/components.vue"),
      children: componentsChildren,
    },
    {
      path: "/modules",
      redirect: "/modules/button",
      component: () => import("./layout/modules.vue"),
      children: modulesChildren,
    },
    {
      path: "/documents",
      component: () => import("./layout/documents.vue"),
      children: documentsChildren,
    },
  ],
});
vm.use(router);

vm.mount("#app");
