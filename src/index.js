/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-09 15:11:36
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-10 14:36:55
 * @* : 博虹出品，抄袭必究😄
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import store from "@/redux/store";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
store.subscribe(() => {
  ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    document.getElementById("root")
  );
});
