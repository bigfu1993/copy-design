import type { App } from "vue";
import Drag from "./src";

Drag.install = (app: App): void => {
  app.component(Drag.name, Drag);
};

export default Drag;
