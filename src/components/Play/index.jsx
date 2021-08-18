/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-06 14:14:30
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-18 16:38:17
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import PubSub from "pubsub-js";
import store from "@/redux/store";
//引入actionCreator，专门用于创建action对象
import { editIsPlay } from "@/redux/count_action";

import { songUrl } from "@/api/api";
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

  //播放结束
  ended = () => {
    store.dispatch(editIsPlay(false));
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
