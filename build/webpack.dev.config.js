const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader-plugin");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: Path.resolve(__dirname, "../examples/index.js"), // 入口
  output: {
    publicPath: "/",
    path: Path.resolve(__dirname, "../dist"), // 输出入口
    filename: "[name].[hash:8].min.js",
    chunkFilename: "[name].[hash:8].bundle.js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".html"],
    alias: {
      "@": Path.resolve(__dirname, "../examples/src"),
      // "#": resolve("src/resource"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: Path.resolve(__dirname, "../examples/template/index.html"),
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    host: "localhost",
    port: 9099,
    open: true,
  },
};
