/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-30 16:43:29
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-25 10:01:30
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";

import { InputItem, Button, Toast } from "antd-mobile";
import { search } from "@/api/api";
import Item from "@/components/ListItem";
import PlayControl from "@/components/PlayControl";
import "./index.scss";
export default class Search extends Component {
  state = {
    list: [],
  };

  toSearch = () => {
    Toast.loading("Loading...", 1000, () => {});
    const { keyword } = this;
    const value = keyword.state.value.trim();
    search(value).then((res) => {
      Toast.hide();
      if (res.code == 200 && res.result.songs) {
        this.setState({ list: res.result.songs });
      }
    });
  };

  render() {
    const { list } = this.state;
    return (
      <div className="search_box">
        <div className="top">
          <InputItem clear placeholder="请输入关键字" ref={(el) => (this.keyword = el)} />
          <Button type="primary" inline size="small" onClick={this.toSearch}>
            搜索
          </Button>
        </div>
        <ul className="list">
          {list.map((item) => {
            return <Item key={item.id} id={item.id} name={item.name} artists={item.name} songList={list} />;
          })}
        </ul>
        <PlayControl />
      </div>
    );
  }
}
