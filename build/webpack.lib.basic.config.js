const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
module.exports = {
  // 我们打包组件库时不需要把Vue打包进去
  externals: {
    vue: {
      root: "vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.cjs.prod.js",
      // vue: "vue/lib/vue.cjs.prod.js",
      // vue$: "vue/dist/vue.cjs.prod.js",
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
  plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin()],
};
