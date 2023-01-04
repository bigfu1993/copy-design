const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css文件
const copyWebpackPlugin = require("copy-webpack-plugin"); // 用于拷贝的插件
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "../examples/index.js"), // 入口
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "../dist"), // 输出入口
    filename: "[name].[hash:8].min.js",
    chunkFilename: "[name].[hash:8].bundle.js",
  },
  // externals: ["axios"],
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".vue",
      ".json",
      ".html",
      ".css",
      ".less",
    ],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
    alias: {
      "@": path.resolve(__dirname, "../examples/views"),
      "#": path.resolve(__dirname, "../packages/"),
      vue: "vue/dist/vue.esm-bundler.js",
      axios: path.resolve(__dirname, "../node_modules/axios/lib/axios.js"),
    },
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true, // 只做编译检查不做运行检查
        },
      },
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
            // options: {
            //   lessOptions: {
            // // If you are using less-loader@5 please spread the lessOptions to options directly
            // modifyVars: {
            //   "primary-color": "#005982",
            //   "border-radius-base": "3px",
            // },
            // javascriptEnabled: true,
            // },
            // },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|mp3|mp4|wav)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 5 * 1024, // 8kb
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: path.resolve(__dirname, "../examples/template/index.html"),
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
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../examples/template"),
          to: path.resolve(__dirname, "../dist/public"),
        },
      ],
    }),
  ],
  devServer: {
    host: "0.0.0.0",
    https: true,
    // open: true,
  },
};
