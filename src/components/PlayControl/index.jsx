/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-11 10:43:54
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-11 15:03:05
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";

import "./index.scss";
export default class PlayControl extends Component {
  render() {
    return (
      <div className="play_control_box">
        <div className="left">
          <img src={require("@/assets/icon/next-prev.png").default} />
        </div>
        <ul className="right">
          <li>
            <img src={require("@/assets/icon/next-prev.png").default} />
          </li>
          <li>
            <img
              // onClick={this.playSong(true)}
              // style={{ display: isPlay ? "none" : "inline-block" }}
              src={require("@/assets/icon/play.png").default}
            />
            {/* <img
              onClick={this.playSong(true)}
              style={{ display: isPlay ? "none" : "inline-block" }}
              src={require("@/assets/icon/play.png").default}
            />
            <img
              onClick={this.playSong(false)}
              style={{ display: isPlay ? "inline-block" : "none" }}
              src={require("@/assets/icon/play-1.png").default}
            /> */}
          </li>
          <li>
            <img src={require("@/assets/icon/next-prev.png").default} />
          </li>
        </ul>
      </div>
    );
  }
}
