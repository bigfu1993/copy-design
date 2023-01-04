import Liquid from "./src";

Liquid.install = (app) => {
    app.component(Liquid.name, Liquid);
  }

export default Liquid;