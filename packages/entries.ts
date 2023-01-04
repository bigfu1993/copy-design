// 分离打包时的入口配置文件
const fs = require("fs");
const path = require("path");

import "./assets/style/index.less";
import "./assets/font/index.less";

function componentsEntry() {
  let entries: any = {};
  let files = fs.readdirSync(path.resolve(__dirname, "./components/"));
  files
    .filter((f: any) => !~f.indexOf("."))
    .forEach((ff: string) => {
      entries[ff.toLowerCase()] = path.resolve(
        __dirname,
        `./components/${ff.toLowerCase()}/index.ts`
      );
    });
  console.log(entries);
  return entries;
}
module.exports = componentsEntry;
