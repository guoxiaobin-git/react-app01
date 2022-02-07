const { merge } = require("webpack-merge");
const { resolvePath, baseConfig } = require("./webpack.base.conf");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
});
