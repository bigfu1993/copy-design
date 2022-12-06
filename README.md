# happy-package

## Project setup
### example示例
```
npm install
npm run dev
```
### 安装
```
npm install copy-design -S
```
### 使用
```
import { createApp } from "vue";
import App from "./App.vue";

const vm = createApp(App);
import CD from "copy-design";
import "copy-design/lib/copy-design.css";
vm.use(CD); 

```
### 目录结构
```
|- build  # 配置
    |- webpack.dev.config.js  # 调试配置
    |- webpack.lib.basic.config.js  # 打包配置
    |- webpack.lib.all.config.js  # 打包配置
    |- webpack.lib.component.config.js  # 打包配置
|- examples  # 调试目录
    |- assets  # 调样式
    |- routes  # 路由表
    |- templates  # 模板文件
    |- views  # 模块
        |- docs  # 文档
        |- components  # 组件
            |- [component]  # 组件预览&说明
            |- index.vue  # 组件预览root
        |- modules  # 模块
            |- [module]  # 模块预览&说明
            |- index.vue  # 模块预览root
    |- App.vue  # 根节点
    |- main.js  # 入口
    |- sfc.d.ts 
|- lib  # 打包目录
|- packages  # 组件源码
    |- assets  # 调样式
    |- api  # http
    |- components  # 组件源码
        |- [component]  # 单组件模块
            |- src
                |- css  # 组件样式
                |- index.vue  # 组件页面
            |- index.js  # 单组件入口
    |- entries.js  # 按需组件入口
    |- index.js  # 全部组件入口
|- .eslintignore # eslint忽略检查
|- .gitignore # 代码忽略文件
|- .npmignore # 发包的忽略文件 
|- packages.json
|- README.md  # 说明文档  

```
 <!-- ```
import HappyPackage from 'happy-package'
vue.use(HappyPackage)
 ``` -->
```

```
<!-- ### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/). -->
