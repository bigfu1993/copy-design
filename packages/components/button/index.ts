import type { App } from "vue";
import Button from "./src";
Button.install = (app: App): void => {
  app.component(Button.name, Button);
};
export default Button;
