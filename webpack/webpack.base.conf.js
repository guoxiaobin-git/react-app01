const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");

const resolvePath = (_path) => path.resolve(__dirname, _path);
const isDev = process.env.NODE_ENV === "development";

const baseConfig = {
  entry: {
    entry: resolvePath("../src/main.js"),
  },
  output: {
    path: resolvePath("../dist"), //输出文件的存放位置
    filename: "[name].bundle.[contenthash].js", //输出文件的名称
    chunkFilename: "chunk/[name].[contenthash].js",
    publicPath: isDev ? "" : "G:/workspace/react-pro/dist/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[contenthash:5]",
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "hello",
      filename: "index.html",
      template: resolvePath("../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle.[contenthash].css", // 非异步加载的文件
      chunkFilename: "chunk/css/[name].[contenthash].css", // 异步加载的文件 如：lazy（懒加载）、import动态加载方式（可参照src/app/chunk.jsx 文件）等方式，会生成chunk文件
    }),
    new Webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    // 进度条
    new WebpackBar({
      color: "#85d", // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
  ],
  resolve: {
    extensions: [".jsx", ".js", ".less"],
  },
};

module.exports = {
  resolvePath,
  baseConfig,
};
