// copy整体打包入口文件
import type { App } from "vue";
// 时间选择框中英文混显问题解决
import "dayjs/locale/zh-cn";

// import "animate.css";
import "./assets/style/index.less";
import "./assets/font/index.less";
import Button from "./components/button/index";
import Icon from "./components/icon/index";
import Menu from "./components/menu/index";
import Line from "./components/charts/line/index";
import Bar from "./components/charts/bar/index";
import Pie from "./components/charts/pie/index";
import Liquid from "./components/charts/liquid/index";
import Table from "./components/table/index";
import Drag from "./components/drag/index";
import Tooltip from "./components/tooltip/index";
import Image from "./components/image/index";
import Progress from "./components/progress/index";
import Audio from "./components/audio/index";
import Video from "./components/video/index";
import Resource from "./components/resource/index";
import List from "./components/list/index";
import Date from "./components/date/index";
import Input from "./components/input/index";
import Select from "./components/select/index";
import Popover from "./components/popover"
import Tree from "./components/tree/index"
// 服务调用模块
import Message from "./components/message/index";


// 通用方法
import File from "./utils/file";
import Encrypt from "./utils/encrypt";

const install = function (app: App): void {
  // 判断是否安装过
  if ((install as any).installed) return;
  // 定义组件列表

  const componentsList = [
    Button,
    Icon,
    Menu,
    Table,
    Drag,
    Tooltip,
    Image,
    Line,
    Bar,
    Pie,
    Liquid,
    Progress,
    Audio,
    Video,
    Resource,
    List,
    Date,
    Input,
    Select,
    Message,
    Popover,
    Tree,
  ]
  // 注册所有组件
  componentsList.map((component) => {
    app.use(component);
  });
};
// template调用导出
export default {
  install,
  // Button,
  // Icon,
  // Menu,
  // Table,
  // Drag,
  // Tooltip,
  // Image,
  // Audio,
  // Video,
  // File,
  // Encrypt,
  // Line,
  // Bar,
  // Pie,
  // Liquid,
};
// service调用导出
export {
  Message,
  File,
  Encrypt
};
