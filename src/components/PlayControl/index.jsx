/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-11 10:43:54
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-19 15:45:56
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import PubSub from "pubsub-js";
import { Toast } from "antd-mobile";

import "./index.scss";
import store from "@/redux/store";
//引入actionCreator，专门用于创建action对象
import { editIsShowPlayPageAction, editIsPlay, editCurrentIdAction } from "@/redux/count_action";
import { check } from "@/api/api";
export default class PlayControl extends Component {
  state = {
    show: false,
    id: null,
    isPlay: false,
    picUrl: null,
    playTime: "00" + ":" + "00",
    currentPlayTime: "00" + ":" + "00",
  };

  //播放暂停
  playSong = (val) => {
    return (event) => {
      store.dispatch(editIsPlay(val));
    };
  };

  //显示播放页面
  showPlayPage = () => {
    store.dispatch(editIsShowPlayPageAction(true));
  };

  //上一曲
  PrevPreson = () => {
    let songListObj = JSON.parse(localStorage.getItem("songListObj"));
    let { songList } = songListObj;
    const { playModel } = songListObj;
    let id = songListObj.id;
    for (let i = 0; i < songList.length; i++) {
      if (id == songList[i].id) {
        if (i == 0) {
          id = songList[songList.length - 1].id;
        } else {
          id = songList[i - 1].id;
        }
        check(id).then((res) => {
          if (res.success) {
            localStorage.setItem(
              "songListObj",
              JSON.stringify({
                id: id,
                songList: songList,
                playModel: playModel,
              })
            );
            store.dispatch(editCurrentIdAction(id));
          } else {
            let songListObj = JSON.parse(localStorage.getItem("songListObj"));
            let { songList } = songListObj;
            const { playModel } = songListObj;
            let id = songListObj.id;
            for (let i = 0; i < songList.length; i++) {
              if (id == songList[i].id) {
                id = songList[i + 1].id;
                store.dispatch(editCurrentIdAction(id));
                localStorage.setItem("songListObj", JSON.stringify({ id: id, songList: songList, playModel: playModel }));
              }
            }
            Toast.fail(res.message, 1);
          }
        });
        return;
      }
    }
  };

  //下一曲
  NextPreson = () => {
    let songListObj = JSON.parse(localStorage.getItem("songListObj"));
    let { songList } = songListObj;
    const { playModel } = songListObj;
    let id = songListObj.id;
    for (let i = 0; i < songList.length; i++) {
      if (id == songList[i].id) {
        if (i == songList.length - 1) {
          id = songList[0].id;
        } else {
          id = songList[i + 1].id;
        }
        check(id).then((res) => {
          if (res.success) {
            localStorage.setItem(
              "songListObj",
              JSON.stringify({
                id: id,
                songList: songList,
                playModel: playModel,
              })
            );
            store.dispatch(editCurrentIdAction(id));
          } else {
            let songListObj = JSON.parse(localStorage.getItem("songListObj"));
            let { songList } = songListObj;
            const { playModel } = songListObj;
            let id = songListObj.id;
            for (let i = 0; i < songList.length; i++) {
              if (id == songList[i].id) {
                id = songList[i + 1].id;
                store.dispatch(editCurrentIdAction(id));
                localStorage.setItem("songListObj", JSON.stringify({ id: id, songList: songList, playModel: playModel }));
              }
            }
            Toast.fail(res.message, 1);
          }
        });
        return;
      }
    }
  };

  //获取到时长
  getSongTime = (t) => {
    if (t) {
      let fen = parseInt(t / 60) < 10 ? "0" + parseInt(t / 60) : parseInt(t / 60);
      let s = Math.ceil(t % 60) < 10 ? "0" + Math.ceil(t % 60) : Math.ceil(t % 60);
      this.setState({ playTime: fen + ":" + s, dt: t });
    }
  };

  //获取到当前播放时间
  getPlayTime = (t) => {
    if (t) {
      let fen = parseInt(t / 60) < 10 ? "0" + parseInt(t / 60) : parseInt(t / 60);
      let s = Math.ceil(t % 60) < 10 ? "0" + Math.ceil(t % 60) : Math.ceil(t % 60);
      this.setState({ currentPlayTime: fen + ":" + s });
    }
  };

  componentDidMount() {
    //检测redux中状态的变化，只要变化，就调用render
    this.setState({
      show: store.getState().isShowPlayPage,
      id: store.getState().currentPlayId,
      isPlay: store.getState().isPlay,
      picUrl: store.getState().picUrl,
    });
    store.subscribe(() => {
      this.setState({
        show: store.getState().isShowPlayPage,
        id: store.getState().currentPlayId,
        isPlay: store.getState().isPlay,
        picUrl: store.getState().picUrl,
      });
    });

    this.pubId = PubSub.subscribe("songTime", (_, playTime) => {
      this.getSongTime(playTime);
    });
    this.playTimeId = PubSub.subscribe("playTime", (_, playTime) => {
      this.getPlayTime(playTime);
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.pubId);
    PubSub.unsubscribe(this.playTimeId);
  }

  render() {
    const { id, isPlay, show, picUrl, playTime, currentPlayTime } = this.state;
    return (
      <div className="play_control_box" style={{ display: id ? "flex" : "none" }}>
        <div className="left" onClick={this.showPlayPage}>
          <div className={["picurl", isPlay ? "" : "stop"].join(" ")}>
            <img src={picUrl ? picUrl : ""} />
          </div>
          <div className="play_time">
            <span>{playTime}</span>
            <span>{currentPlayTime}</span>
          </div>
        </div>
        <ul className="right">
          <li>
            <img src={require("@/assets/icon/next.png").default} onClick={this.PrevPreson} />
          </li>
          <li>
            <img
              onClick={this.playSong(true)}
              style={{ display: isPlay ? "none" : "inline-block" }}
              src={require("@/assets/icon/play1.png").default}
            />
            <img
              onClick={this.playSong(false)}
              style={{ display: isPlay ? "inline-block" : "none" }}
              src={require("@/assets/icon/stop.png").default}
            />
          </li>
          <li>
            <img src={require("@/assets/icon/next.png").default} onClick={this.NextPreson} />
          </li>
        </ul>
      </div>
    );
  }
}
