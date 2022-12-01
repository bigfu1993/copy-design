console.log("I get called from print.js!");
import { createApp } from "vue";
import App from "./src/index.vue";
let vm = createApp({ App }).mount("#app");
