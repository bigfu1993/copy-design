// copy整体打包入口文件

// import "animate.css";
import "./assets/style/common/reset.less";
import Button from "UI/button";
import Icon from "UI/icon";

// 定义组件列表
const componentsList = [Button, Icon];

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
