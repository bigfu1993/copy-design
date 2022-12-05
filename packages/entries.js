// 分离打包时的入口配置文件
const fs = require("fs");
const path = require("path");

function componentsEntry() {
  let entries = {};
  let files = fs.readdirSync(path.resolve(__dirname, "./components/"));
  files
    .filter((f) => !~f.indexOf("."))
    .forEach((ff) => {
      entries[ff.toLowerCase()] = path.resolve(
        __dirname,
        `./components/${ff.toLowerCase()}/index.js`
      );
    });
  console.log(entries);
  return entries;
}
// componentsEntry();
module.exports = componentsEntry;
