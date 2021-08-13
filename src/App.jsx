/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-09 15:11:42
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-04 10:10:39
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
/* 路由组件   start */
import Recommend from "@/pages/Recommend";
import Hot from "@/pages/Hot";
import Search from "@/pages/Search";

/* 路由组件   end */

/* 一般组件   start */
import MyNavLink from "@/components/MyNavLink";
import Header from "@/components/Header";
import PlayPage from "@/components/PlayPage";
/* 一般组件   end */
import "./App.css";
// import "./index.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <div id="box">
          <Header />
          <div id="body_router">
            <ul className="router-box">
              <li>
                <MyNavLink to="/recommend">推荐音乐</MyNavLink>
              </li>
              <li>
                <MyNavLink to="/hot">热歌榜</MyNavLink>
              </li>
              <li>
                <MyNavLink to="/search">搜索</MyNavLink>
              </li>
            </ul>
            <div id="body">
              {/* 注册路由 */}
              <Switch>
                <Route path="/recommend" component={Recommend} />
                <Route path="/hot" component={Hot} />
                <Route path="/search" component={Search} />
                <Redirect to="/recommend" />
              </Switch>
            </div>
          </div>
          <PlayPage />
        </div>
      </div>
    );
  }
}
