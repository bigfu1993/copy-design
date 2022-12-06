const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const copyWebpackPlugin = require("copy-webpack-plugin"); // 用于拷贝的插件
const path = require("path");
module.exports = {
  // 我们打包组件库时不需要把Vue打包进去
  externals: "vue",
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
      // vue$: "vue/dist/vue.cjs.js",
      // vue$: "vue/dist/vue.cjs.prod.js",
      // vue$: "vue/dist/vue.esm-browser.js",
      // vue$: "vue/dist/vue.runtime.esm-browser.js",
      vue: "vue/dist/vue.cjs.prod.js",
      "@": path.resolve(__dirname, "../examples"),
      UI: path.resolve(__dirname, "../packages/components"),
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
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
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../packages/copy-design.d.ts"),
          to: path.resolve(__dirname, "../lib"),
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
