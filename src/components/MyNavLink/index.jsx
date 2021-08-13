/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-30 16:47:37
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-02 09:42:59
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

export default class MyNavLink extends Component {
  render() {
    // console.log(this.props);
    return <NavLink activeClassName="active-tab" className="list-group-item" {...this.props} />;
  }
}
