import Tree from "./src";
Tree.install = (app) => {
  app.component(Tree.name, Tree);
};
export default Tree;