const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

module.exports = (env) => {
  const entry = SRC_DIR + "/" + (env.entry ? env.entry : "index.js");
  const outputName = env.outputName ? env.outputName : "bundle.js";
  const inlineHtml = env.inlineHtml ? env.inlineHtml : "index.html";

  console.log("entry:", entry);
  console.log("outputName:", outputName);
  console.log("inlineHtml:", inlineHtml);
  
  return {
    entry: entry,
    output: {
      path: BUILD_DIR,
      filename: outputName
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [SRC_DIR],
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      ]
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "~": SRC_DIR
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: inlineHtml,
        meta: {
          viewport: "initial-scale=1, maximum-scale=1"
        },
        inlineSource: ".(js|css)$"
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
    ]
  };
};
