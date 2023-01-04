import Date from "./src";

Date.install = (app) => {
    app.component(Date.name, Date);
  }

export default Date;