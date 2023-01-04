import { App } from "vue";
import Audio from "./src/index.vue";

(Audio as any).install = (app: App) => {
  app.component(Audio.name, Audio);
}

export default Audio;
