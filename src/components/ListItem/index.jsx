/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-03 14:17:48
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-10 17:30:51
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Toast } from "antd-mobile";
//引入store，用于获取redux中保存状态
import store from "@/redux/store";
//引入actionCreator，专门用于创建action对象
import { editIsShowPlayPageAction, editCurrentIdAction, editIsPlay } from "@/redux/count_action";
import { check } from "@/api/api";

class Item extends Component {
  state = {
    show: true,
    currentPlayId: null,
    isPlay: false,
  };

  toPlay = () => {
    const { id } = this.props;
    const { currentPlayId } = this.state;
    if (id == currentPlayId) {
      store.dispatch(editIsPlay(true));
      return;
    }
    check(id).then((res) => {
      if (res.success) {
        store.dispatch(editCurrentIdAction(id));
        store.dispatch(editIsShowPlayPageAction(true));
      } else {
        Toast.fail(res.message, 1);
      }
    });
  };
  stop = () => {
    store.dispatch(editIsPlay(false));
  };
  componentDidMount() {
    //检测redux中状态的变化，只要变化，就调用render
    store.subscribe(() => {
      this.setState({ currentPlayId: store.getState().currentPlayId, isPlay: store.getState().isPlay });
    });
  }

  render() {
    const { id, name, artists } = this.props;
    const { show, currentPlayId, isPlay } = this.state;
    return (
      <li>
        <div onClick={this.toPlay}>
          <p className="name">{name}</p>
          <p className="artists">
            <i>SQ</i>
            {artists} &nbsp;
            {name}
          </p>
        </div>
        <div style={{ display: currentPlayId == id ? "inline-block" : "none" }}>
          <img
            className="icon-size"
            src={require("@/assets/icon/play.png").default}
            style={{ display: !isPlay ? "inline-block" : "none" }}
            onClick={this.toPlay}
          />
          <img
            onClick={this.stop}
            className="icon-size"
            src={require("@/assets/icon/play-1.png").default}
            style={{ display: !isPlay ? "none" : "inline-block" }}
          />
        </div>
      </li>
    );
  }
}
export default withRouter(Item);
