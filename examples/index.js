console.log("I get called from print.js!");
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./app.vue";
const vm = createApp(App);

import CD from "#/index";
// import "copy-design/lib/copy-design.css";
vm.use(CD);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/button",
      component: () => import("./layout/index.vue"),
      children: [
        {
          path: "button",
          component: () => import("./src/button/index.vue"),
        },
        {
          path: "icon",
          component: () => import("./src/icon/index.vue"),
        },
      ],
    },
  ],
});
vm.use(router);

vm.mount("#app");
