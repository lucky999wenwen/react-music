/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-30 16:42:26
 * @LastEditors: wanglong
 * @LastEditTime: 2021-10-21 16:59:15
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";

import { getNewsongList, getPersonalized, test } from "@/api/api";

import Item from "@/components/ListItem";
import PlayControl from "@/components/PlayControl";

import "./index.scss";
import { Button } from "antd-mobile";

export default class Recommend extends Component {
  state = {
    listSong: [],
    listPersona: [],
    loading: false,
  };

  getNewsongList = () => {
    this.setState({ loading: true });
    let data = JSON.parse(localStorage.getItem("listSongObj"));
    if (data && data.time > new Date().getTime()) {
      this.setState({ listSong: data.listSong, loading: true });
    } else {
      getNewsongList().then((res) => {
        let obj = {
          listSong: res.result,
          time: new Date().getTime() + 86400000 * 2,
        };
        this.setState({ listSong: res.result, loading: true });
        localStorage.setItem("listSongObj", JSON.stringify(obj));
      });
    }
  };

  getPersonalized = () => {
    let data = JSON.parse(localStorage.getItem("listPersonaObj"));
    if (data && data.time > new Date().getTime()) {
      this.setState({ listPersona: data.listPersona });
    } else {
      getPersonalized().then((res) => {
        this.setState({ listPersona: res.result });
        let obj = {
          listPersona: res.result,
          time: new Date().getTime() + 86400000 * 2,
        };
        localStorage.setItem("listPersonaObj", JSON.stringify(obj));
      });
    }
  };

  toRecomList = (item) => {
    return () => {
      this.props.history.push(`/recomlist/${item.id}`);
    };
  };
  componentDidMount() {
    this.getPersonalized();
    this.getNewsongList();
  }
  render() {
    const { listPersona, listSong } = this.state;
    return (
      <div className="recommend">
        <div className="recommend_box">
          <ul className="recommend_card">
            <div>编辑推荐</div>
            {listPersona.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.picUrl} onClick={this.toRecomList(item)} />
                  <span>{(item.playCount / 10000).toFixed(1)}万</span>
                  <p>{item.name}</p>
                </li>
              );
            })}
          </ul>
          <ul className="newsong">
            <div>最新音乐</div>
            {listSong.map((item) => {
              return <Item key={item.id} id={item.id} name={item.name} artists={item.song.artists[0].name} songList={listSong} />;
            })}
          </ul>
        </div>
        <PlayControl />
      </div>
    );
  }
}
