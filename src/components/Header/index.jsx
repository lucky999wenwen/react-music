/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-30 17:12:14
 * @LastEditors: wanglong
 * @LastEditTime: 2021-07-30 17:27:30
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
// import { CustomerServiceOutlined } from "@ant-design/icons";
import "./index.scss";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <span>
          {/* <CustomerServiceOutlined /> */}
          网易云音乐
        </span>
        <span></span>
      </div>
    );
  }
}
