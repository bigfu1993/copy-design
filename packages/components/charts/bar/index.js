import Bar from "./src";

Bar.install = (app) => {
    app.component(Bar.name, Bar);
  }

export default Bar;