import List from "./src";

List.install = (app) => {
    app.component(List.name, List);
  }

export default List;