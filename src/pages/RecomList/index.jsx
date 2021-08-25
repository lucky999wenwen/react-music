/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-20 10:46:12
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-24 14:17:21
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";

import Item from "@/components/ListItem";
import { playlistDe } from "@/api/api";
import "./index.scss";
export default class RecomList extends Component {
  state = {
    data: null,
    list: [],
  };
  getList = () => {
    const { id } = this.props.match.params;
    playlistDe(id).then((res) => {
      this.setState({ data: res.playlist, list: res.playlist.tracks });
    });
  };
  back = () => {
    console.log(this.props.history.goBack());
  };
  componentDidMount() {
    this.getList();
  }
  render() {
    const { data, list } = this.state;
    return (
      <div className="recom_list">
        <div className="top">
          <i className="fa fa-angle-down fa-2x" onClick={this.back}></i>
          <div className="bg" style={{ backgroundImage: data ? `url(${data.coverImgUrl})` : "" }}></div>
          <div className="content_box">
            <div className="left">
              <img src={data ? data.coverImgUrl : ""} />
              <p>歌单</p>
              <p>{data ? (data.playCount / 10000).toFixed(1) : 0}万</p>
            </div>
            <div className="right">{data ? data.name : ""}</div>
          </div>
        </div>
        <ul className="list">
          <p>歌曲列表</p>
          {list.map((item) => {
            return <Item key={item.id} id={item.id} name={item.name} artists={item.ar[0].name} songList={list} />;
          })}
        </ul>
      </div>
    );
  }
}
