import Table from "./src";

Table.install = (app) => {
  app.component(Table.name, Table);
};

export default Table;
