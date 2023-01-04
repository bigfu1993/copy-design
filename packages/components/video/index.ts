import type { App } from "vue";
import Video from "./src/index.vue";

(Video as any).install = (app: App): void => {
  app.component(Video.name, Video);
};

export { Video };

export default Video;
