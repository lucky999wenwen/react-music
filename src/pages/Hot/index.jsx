/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-30 16:42:56
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-11 10:49:00
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
      this.setState({ hotList: data.hotList, coverImgUrl: data.coverImgUrl, description: data.description });
    } else {
      getHotlist().then((res) => {
        this.setState({ hotList: res.playlist.tracks, coverImgUrl: res.playlist.coverImgUrl, description: res.playlist.description });
        let obj = {
          hotList: res.playlist.tracks,
          coverImgUrl: res.playlist.coverImgUrl,
          description: res.playlist.description,
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
    const { hotList, coverImgUrl } = this.state;
    return (
      <div className="hot">
        {/* <img src={coverImgUrl} /> */}
        <ul className="hotsong">
          {hotList.map((item) => {
            return <Item key={item.id} id={item.id} name={item.name} artists={item.ar[0].name} />;
          })}
        </ul>
        <PlayControl />
      </div>
    );
  }
}
