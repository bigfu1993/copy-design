// 用于对组件单独打包，便于按需加载

const path = require("path");
const fs = require("fs");
const { merge } = require("webpack-merge");
const miniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css插件
// const optimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");
// const copyWebpackPlugin = require("copy-webpack-plugin"); // 用于拷贝的插件

const BasicConfig = require("./webpack.lib.basic.config.js"); // 打包基础配置
const componentsEntry = require("../packages/entries.js"); // 引入入口配置文件

module.exports = merge(BasicConfig, {
  mode: "production",
  devtool: "source-map",
  entry: {
    ...componentsEntry(),
  },
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, "../lib/packages"), // 打包后生成的js文件
    // 解释下这个[name]是怎么来的，它是根据你的entry命名来的，入口叫啥，出口的[name]就叫啥
    filename: "[name]/index.js",
    publicPath: "/", // 我这儿目前还没有资源引用
    library: "[name]",
    libraryTarget: "umd",
    libraryExport: "default",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(less|scss|sass|css)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader, // 使用miniCssExtractPlugin.loader代替style-loader
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // 新建miniCssExtractPlugin实例并配置
    new miniCssExtractPlugin({
      filename: "[name]/style/index.css",
    }),
    // 压缩css
    // new optimizeCssnanoPlugin({
    //   sourceMap: true,
    //   cssnanoOptions: {
    //     preset: [
    //       "default",
    //       {
    //         discardComments: {
    //           removeAll: true,
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
});
