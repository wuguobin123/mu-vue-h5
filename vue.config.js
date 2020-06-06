const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
                @import "@/assets/custom_theme.scss";
                @import "@nutui/nutui/dist/styles/index.scss";
                @import "@/assets/reset.scss";
                `
      }
    }
  },
  configureWebpack: {
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/.vue$/]
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "src/assets/imgs/bank"),
          to: __dirname + "/dist/img/bank",
          ignore: [".*"]
        }
      ])
    ]
  }
};
