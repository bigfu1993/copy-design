const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
module.exports = {
  // 我们打包组件库时不需要把Vue打包进去
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
    router: {
      root: "vue-router",
      commonjs: "vue-router",
      commonjs2: "vue-router",
      amd: "vue-router",
    },
    axios: {
      root: "axios",
      commonjs: "axios",
      commonjs2: "axios",
      amd: "axios",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../examples"),
      "#": path.resolve(__dirname, "../packages"),
      UI: path.resolve(__dirname, "../packages/components"),
      vue$: "vue/dist/vue.runtime.esm.js",
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
