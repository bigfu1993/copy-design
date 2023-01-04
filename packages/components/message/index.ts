import type { App } from "vue";
import Message from "./src/message";

(Message as any).install = (app: App): void => {
  app.config.globalProperties.$message = Message;
};

export { Message };

export default Message;
