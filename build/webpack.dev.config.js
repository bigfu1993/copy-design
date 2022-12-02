const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css文件
const { VueLoaderPlugin } = require("vue-loader");
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
    extensions: [".js", ".vue", ".json", ".html", ".css", ".less"],
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": Path.resolve(__dirname, "../examples/src"),
      // "#": resolve("src/resource"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
      {
        test: /\.(c|le|sc|sa)ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // // If you are using less-loader@5 please spread the lessOptions to options directly
                // modifyVars: {
                //   "primary-color": "#005982",
                //   "border-radius-base": "3px",
                // },
                // javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: Path.resolve(__dirname, "../examples/template/index.html"),
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      // 'process.env': {
      //   ENV: JSON.stringify(process.env.ENV),
      //   TYPE: JSON.stringify(process.env.TYPE),
      //   HOST: JSON.stringify(process.env.HOST),
      // },
    }),
  ],
  devServer: {
    host: "localhost",
    port: 1447,
    // open: true,
  },
};
