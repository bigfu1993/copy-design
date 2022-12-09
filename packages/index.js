// copy整体打包入口文件

// import "animate.css";
import "./assets/style/index.less";
import "./assets/font/index.less";
import Button from "./components/button";
import Icon from "./components/icon";
import Menu from "./components/menu";

// 定义组件列表
const componentsList = [Button, Icon, Menu];

const install = function (Vue) {
  // 判断是否安装过
  if (install.installed) return;

  // 注册所有组件
  componentsList.map((component) => {
    Vue.use(component);
  });
};

export default {
  install,
  Button,
  Icon,
};
