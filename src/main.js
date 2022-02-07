import React from "react";
import ReactDom from "react-dom";
import App from "./app";
import "antd/dist/antd.css";
// Webpack.DefinePlugin定义的全局变量
console.log("ENV: ", ENV);
ReactDom.render(<App />, document.getElementById("root"));
