import Line from "./src";

Line.install = (app) => {
    app.component(Line.name, Line);
  }

export default Line;