const { TYPE, NODE_ENV } = process.env;
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const webpackConfig = require(`./webpack/webpack.${NODE_ENV}.conf.js`);
const compiler = webpack(webpackConfig);

if (TYPE === "BUILD") {
  compiler.run((err, stats) => {
    // 处理webpack本身的error
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toString({
      colors: true,
    });
    // 处理代码编译中产生的error
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
    // 处理代码编译中产生的warning
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    console.log(info);
  });
  /**
   * 监听方式：即webpack会开辟一个进程用来实时监听打包文件是否变更一但变更则会促发重新编译打包
   * 实际打包的话可直接使用compiler.run((err, stats) => {})一次性打包就可以了，此方式不会生成
   * 新进程，打包完后就结束了
   */
  // const watching = compiler.watch({ aggregateTimeout: 300 }, (err, stats) => {
  //   //处理webpack本身的error
  //   if (err) {
  //     console.error(err.stack || err);
  //     if (err.details) {
  //       console.error(err.details);
  //     }
  //     return;
  //   }

  //   const info = stats.toString({
  //     colors: true,
  //   });
  //   //处理代码编译中产生的error
  //   if (stats.hasErrors()) {
  //     console.error(info.errors);
  //   }
  //   //处理代码编译中产生的warning
  //   if (stats.hasWarnings()) {
  //     console.warn(info.warnings);
  //   }
  //   watching.close(() => {
  //     console.log(info);
  //   });
  // });
} else {
  const wds = new webpackDevServer(compiler, {
    // host: "127.0.0.1",
    // port: 9009,
    open: true,
    hot: true,
  }).listen(8686, "127.0.0.1", (err) => {
    if (err) {
      console.error("> webpack-dev-server error:");
      console.error(err);
    }
  });
  // wds.startCallback((err) => {
  //   if (err) {
  //     console.error("> webpack-dev-server error:");
  //     console.error(err);
  //     wds.stopCallback((err) => {
  //       console.error("> webpack-dev-server stop");
  //     });
  //   }
  // });
}
