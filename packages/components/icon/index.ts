import type { App } from "vue";
import Icon from "./src";
Icon.install = (app: App): void => {
  app.component(Icon.name, Icon);
};
export default Icon;
