import Button from "./src/index";
Button.install = (app) => {
  app.component(Button.name, Button);
};
export default Button;
