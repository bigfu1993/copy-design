import Pie from "./src";

Pie.install = (app) => {
    app.component(Pie.name, Pie);
  }

export default Pie;