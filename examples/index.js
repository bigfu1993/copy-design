console.log("I get called from print.js!");
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./app.vue";
const vm = createApp(App);

import CD from "copy-design";
vm.use(CD);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/button",
      component: () => import("./layout/index.vue"),
      children: {
        path: "button",
        component: () => import("./src/button/index.vue"),
      },
    },
  ],
});
vm.use(router);

vm.mount("#app");
