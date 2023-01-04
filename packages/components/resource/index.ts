import type { App } from "vue";
import Resource from "./src/index.vue";

(Resource as any).install = (app: App): void => {
  app.component(Resource.name, Resource);
};

export { Resource };

export default Resource;
