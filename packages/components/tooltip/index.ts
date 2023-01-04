import { App } from "vue";
import Tooltip from "./src/index.vue";

(Tooltip as any).install = (app: App) => {
  app.component(Tooltip.name, Tooltip);
}

export default Tooltip;
