const path = require("path");
const { merge } = require("webpack-merge"); // 合并webpack配置
const miniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css插件

const BasicConfig = require("./webpack.lib.basic.config.js"); // 打包基础配置
module.exports = merge(BasicConfig, {
  mode: "production",
  devtool: "source-map",
  entry: {
    "copy-design": path.resolve(__dirname, "../packages/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename: "[name].js",
    publicPath: "/",
    // library: "copy-design",
    library: {
      name: "copy-design",
      type: "umd",
      export: "default",
      umdNamedDefine: true,
    },
    // libraryTarget: "umd",
    // libraryExport: "default",
    // umdNamedDefine: true,
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
      filename: "[name].css",
    }),
  ],
});
