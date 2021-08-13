/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-09 15:25:23
 * @LastEditors: wanglong
 * @LastEditTime: 2021-07-09 15:40:35
 * @* : 博虹出品，抄袭必究😄
 */
//配置具体的修改规则
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  //   fixBabelImports("import", {
  //     libraryName: "antd",
  //     libraryDirectory: "es",
  //     style: true,
  //   }),
  //   addLessLoader({
  //     lessOptions: {
  //       javascriptEnabled: true,
  //       modifyVars: { "@primary-color": "green" },
  //     },
  //   }),
  //增加路径别名的处理
  addWebpackAlias({
    "@": path.resolve("./src"),
  })
);
