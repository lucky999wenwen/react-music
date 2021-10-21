/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-09-28 15:49:18
 * @LastEditors: wanglong
 * @LastEditTime: 2021-09-28 15:53:19
 * @* : 博虹出品，抄袭必究😄
 */
module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "no-undef": "off",
    "no-restricted-globals": "off",
    "no-unused-vars": "off",
  },
};
