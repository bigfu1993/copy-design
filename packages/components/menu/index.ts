import type { App } from "vue";
import Menu from "./src/index.vue";

(Menu as any).install = (app: App): void => {
  app.component(Menu.name, Menu);
};

export default Menu;
