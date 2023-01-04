import { createVNode, render } from "vue";
import { iMessageParams } from "./message.types";
import CMessage from "./index.vue";
const Message = (options: iMessageParams) => {
  console.log("hello message");
  if (typeof options == "string") {
    options = {
      message: options,
    };
  }
  // 处理对象
  // 容器
  const container = document.createElement("div");
  // 虚拟dom
  const vm = createVNode(CMessage);
  // 渲染组件
  render(vm, container);
  document.body.appendChild(container.firstChild!);
  console.log(vm);
};
export default Message;
