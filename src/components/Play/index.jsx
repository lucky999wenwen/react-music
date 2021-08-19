/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-06 14:14:30
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-19 15:45:17
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import PubSub from "pubsub-js";
import { Toast } from "antd-mobile";
import store from "@/redux/store";
//引入actionCreator，专门用于创建action对象
import { editIsPlay, editCurrentIdAction } from "@/redux/count_action";

import { songUrl, check } from "@/api/api";
export default class Play extends Component {
  state = {
    id: null,
    urlData: null,
    audio: null,
  };

  //播放
  play = () => {
    this.state.audio.play();
  };

  //停止播放
  pause = () => {
    this.state.audio.pause();
  };

  //获取歌曲时长
  duration = () => {
    let t = this.state.audio.duration;
    PubSub.publish("songTime", t);
    this.props.getSongTime(t);
  };

  //当浏览器可以开始播放音频/视频时触发。
  canplay = () => {
    this.duration();
  };

  //检测是否可以播放
  check = (id) => {
    return check(id).then((res) => {
      if (res.success == true) {
        return true;
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
        return res.message;
      }
    });
  };
  //播放结束
  ended = async () => {
    store.dispatch(editIsPlay(false));
    let songListObj = JSON.parse(localStorage.getItem("songListObj"));
    let { songList } = songListObj;
    const { playModel } = songListObj;
    let id = songListObj.id;
    // 1、列表循环 2、单曲循环 3、随机播放
    if (playModel == 1) {
      for (let i = 0; i < songList.length; i++) {
        if (id == songList[i].id) {
          let isPlay = await this.check(songList[i + 1].id);
          if (isPlay == true) {
            id = songList[i + 1].id;
            store.dispatch(editCurrentIdAction(songList[i + 1].id));
            localStorage.setItem("songListObj", JSON.stringify({ id: id, songList: songList, playModel: playModel }));
          } else {
            Toast.fail(isPlay, 1);
          }
          return;
        }
      }
    } else if (playModel == 2) {
      // store.dispatch(editCurrentIdAction(id));
      this.play();
    } else {
      let i = Math.round(Math.random() * songList.length - 1);
      id = songList[i].id;
      let isPlay = await this.check(id);
      if (isPlay == true) {
        id = songList[i + 1].id;
        store.dispatch(editCurrentIdAction(songList[i + 1].id));
        localStorage.setItem("songListObj", JSON.stringify({ id: id, songList: songList, playModel: playModel }));
      } else {
        Toast.fail(isPlay, 1);
      }
    }
  };

  //播放时间发生改变
  timeUpdate = () => {
    let t = this.state.audio.currentTime;
    let t1 = this.state.audio.duration;
    PubSub.publish("playTime", t);
    PubSub.publish("songTime", t1);
    this.props.getPlayTime(t);
  };

  //获取歌曲播放链接
  songUrl = (id) => {
    songUrl(id).then((res) => {
      this.setState({ urlData: res.data[0] });
      this.play();
      store.dispatch(editIsPlay(true));
    });
  };

  componentDidMount() {
    this.setState({ audio: this.refs.audio });
    //检测redux中状态的变化，只要变化，就调用render
    store.subscribe(() => {
      if (store.getState().currentPlayId !== this.state.id) {
        this.setState({ id: store.getState().currentPlayId });
        this.songUrl(this.state.id);
      }
      if (store.getState().isPlay) this.play();
      if (!store.getState().isPlay) this.pause();
      this.setState({ id: store.getState().currentPlayId });
    });
    this.pubId = PubSub.subscribe("editPlayTime", (_, playTime) => {
      this.refs.audio.currentTime = playTime;
      if (this.refs.audio.paused) {
        this.play();
        store.dispatch(editIsPlay(true));
      }
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.pubId);
  }
  render() {
    const { urlData } = this.state;
    return (
      <div style={{ display: "none" }}>
        <audio
          ref="audio"
          onCanPlay={this.canplay}
          onEnded={this.ended}
          onTimeUpdate={this.timeUpdate}
          src={urlData && urlData.url ? urlData.url : ""}
        ></audio>
      </div>
    );
  }
}
