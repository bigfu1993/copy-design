import Popover from "./src";
Popover.install = (app) => {
  app.component(Popover.name, Popover);
};
export default Popover;