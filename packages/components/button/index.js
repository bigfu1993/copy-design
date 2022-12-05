import Button from "./src";
Button.install = (app) => {
  app.component(Button.name, Button);
};
export default Button;
