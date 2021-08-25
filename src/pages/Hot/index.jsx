/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-30 16:42:56
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-23 16:00:20
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";

import Item from "@/components/ListItem";
import PlayControl from "@/components/PlayControl";

import { getHotlist } from "@/api/api";
import "./index.scss";

export default class Hot extends Component {
  state = {
    hotList: [],
    description: "",
    coverImgUrl: "",
  };
  getHotlist = () => {
    let data = JSON.parse(localStorage.getItem("hotListObj"));
    if (data && data.time > new Date().getTime()) {
      this.setState({ hotList: data.hotList });
    } else {
      getHotlist().then((res) => {
        this.setState({ hotList: res.songs });
        let obj = {
          hotList: res.songs,
          time: new Date().getTime() + 86400000 * 2,
        };
        localStorage.setItem("hotListObj", JSON.stringify(obj));
      });
    }
  };
  componentDidMount() {
    this.getHotlist();
  }

  render() {
    const { hotList } = this.state;
    return (
      <div className="hot">
        {/* <img src={coverImgUrl} /> */}
        <ul className="hotsong">
          {hotList.map((item) => {
            return <Item key={item.id} id={item.id} name={item.name} artists={item.ar[0].name} songList={hotList} />;
          })}
        </ul>
        <PlayControl />
      </div>
    );
  }
}
