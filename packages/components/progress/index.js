import Progress from "./src";
Progress.install = (app) => {
  app.component(Progress.name, Progress);
};
export default Progress;