<template>
  <div class="flex-column flex1 modules-wrap">
    <div class="mb10">
      <c-menu :video="video" mode="customer">
        <template #project-l>
          <img :src="logo" alt="" style="height:40px" class="mr5">
        </template>

        <template #extend>
          <div>
            <i class="iconfont icon-zhuatu"></i>
          </div>
        </template>
      </c-menu>
    </div>
    <div style="z-index: 100; height: 100px; width: 100%; background: red"></div>
  </div>
</template>

<script>
export default { name: 'md-menu' }
</script>
<script setup>
const logo = require('./assets/logo.svg');
const video = require("#/assets/media/menubar-default.mp4");
let routes = [
  {
    "label": "系统设置", "icon": "icon-xitongshezhi", "children":
        [{ "path": "/currency-database", "meta": { "belong": "系统设置", "icon": "icon-xitongshezhi", "label": "数据编辑" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/special-database", "meta": { "belong": "系统设置", "icon": "icon-xitongshezhi", "label": "巡视模型" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/ocr", "meta": { "belong": "系统设置", "icon": "icon-xitongshezhi", "label": "图像识别" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }]
  },
  {
    "label": "系统调试", "icon": "icon-tiaoshi",
    "children": [{ "path": "/realtime-message", "meta": { "belong": "系统调试", "icon": "icon-tiaoshi", "label": "实时报文" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/device-debug", "meta": { "belong": "系统调试", "icon": "icon-tiaoshi", "label": "装置调试" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }]
  },
  {
    "label": "智能联动", "icon": "icon-guanliancailiao",
    "children": [{ "path": "/linkage-cog", "meta": { "belong": "智能联动", "icon": "icon-guanliancailiao", "label": "联动设置" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/linkage-record", "meta": { "belong": "智能联动", "icon": "icon-guanliancailiao", "label": "联动记录" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }]
  },
  {
    "label": "智能巡视", "icon": "icon-zhinengwanglianjichuzhanghaoshenqingliucheng-02",
    "children": [{ "path": "/patrol-task", "meta": { "belong": "智能巡视", "icon": "icon-zhinengwanglianjichuzhanghaoshenqingliucheng-02", "label": "巡视任务" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/monitor-task", "meta": { "belong": "智能巡视", "icon": "icon-zhinengwanglianjichuzhanghaoshenqingliucheng-02", "label": "监视任务" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/patrol-record", "meta": { "belong": "智能巡视", "icon": "icon-zhinengwanglianjichuzhanghaoshenqingliucheng-02", "label": "巡视记录" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }]
  },
  {
    "label": "实时监控", "icon": "icon-shishishuju",
    "children": [{ "path": "/network-topology", "meta": { "belong": "实时监控", "icon": "icon-shishishuju", "label": "图形监控" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/realtime-monitor", "meta": { "belong": "实时监控", "icon": "icon-shishishuju", "label": "实时监控" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/realtime-data", "meta": { "belong": "实时监控", "icon": "icon-shishishuju", "label": "实时数据" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/video-monitor", "meta": { "belong": "实时监控", "icon": "icon-shishishuju", "label": "视频监控" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }, { "path": "/graph-monitor", "meta": { "belong": "实时监控", "icon": "icon-shishishuju", "label": "图形监控" }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {} }]
  },
  {
    "label": "联动记录", "icon": "icon-shishishuju",
    "children": [{
      "path": "/test-page", "meta": {
        "belong": "联动记录", "icon": "icon-shishishuju", "label": "测试功能"
      }, "props": { "default": false }, "children": [], "instances": {}, "leaveGuards": {}, "updateGuards": {}, "enterCallbacks": {}, "components": {}
    }]
  }];
console.log(routes);
</script>

<style lang="less" scoped>
.modules-wrap {
  width: 100%;
}
</style>
