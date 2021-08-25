/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-09 15:11:42
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-25 10:42:33
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
/* 路由组件   start */
import Recommend from "@/pages/Recommend";
import RecomList from "@/pages/RecomList";
import Hot from "@/pages/Hot";
import Search from "@/pages/Search";

/* 路由组件   end */

/* 一般组件   start */
import AnimatedSwitch from "@/components/AnimatedSwitch";
import MyNavLink from "@/components/MyNavLink";
import Header from "@/components/Header";
import PlayPage from "@/components/PlayPage";
/* 一般组件   end */
import "./App.css";
// import "./index.css";

class App extends Component {
  render() {
    const { pathname } = this.props.location;
    const tabRouter = ["/recommend", "/hot", "/search"];
    const isTabRouter = tabRouter.indexOf(pathname) == -1 ? false : true;
    // console.log(isTabRouter);
    return (
      <div>
        <div id="box">
          <Header isTabRouter={isTabRouter} />
          <div id="body_router">
            <ul className="router-box" style={{ display: isTabRouter ? "flex" : "none" }}>
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
              <AnimatedSwitch>
                <Route path="/recommend" component={Recommend} />
                <Route path="/hot" component={Hot} />
                <Route path="/search" component={Search} />
                <Route path="/recomlist/:id" component={RecomList} />
                <Redirect to="/recommend" />
              </AnimatedSwitch>
            </div>
          </div>
          <PlayPage />
        </div>
      </div>
    );
  }
}
export default withRouter(App);
