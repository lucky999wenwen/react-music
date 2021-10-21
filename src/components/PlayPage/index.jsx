/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-04 08:59:49
 * @LastEditors: wanglong
 * @LastEditTime: 2021-09-28 16:58:02
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import { Slider, WingBlank, WhiteSpace } from "antd-mobile";
import PubSub from "pubsub-js";
import { Toast } from "antd-mobile";

import { songDetail, songUrl, getLyric, check } from "@/api/api";

import Play from "@/components/Play";
import SongList from "./songList";
//引入store，用于获取redux中保存状态
import store from "@/redux/store";
//引入actionCreator，专门用于创建action对象
import { editIsShowPlayPageAction, editIsPlay, editPicUrl, editCurrentIdAction } from "@/redux/count_action";
import "./index.scss";

export default class PlayPage extends Component {
  state = {
    show: store.getState().isShowPlayPage,
    id: store.getState().currentPlayId,
    detail: null,
    urlData: null,
    lyric: [],
    play: false,
    playLong: 0,
    playTime: "00" + ":" + "00",
    dt: 0,
    currentPlayTime: "00" + ":" + "00",
    curlayTime: 0,
    layricTimg: "[00:00.000]",
    layricIndex: 0,
    isPlay: false,
    playModel: 1,
    isShouList: false,
  };

  //获取歌曲详情
  songDetail = (id) => {
    songDetail(id).then((res) => {
      this.setState({ detail: res.songs[0] });
      store.dispatch(editPicUrl(res.songs[0].al.picUrl));
      // PubSub.publish("songName", res.songs.length ? res.songs[0].name + "-" + res.songs[0].ar[0].name : "");
    });
  };

  //获取到时长
  getSongTime = (t) => {
    let fen = parseInt(t / 60) < 10 ? "0" + parseInt(t / 60) : parseInt(t / 60);
    let s = Math.ceil(t % 60) < 10 ? "0" + Math.ceil(t % 60) : Math.ceil(t % 60);
    this.setState({ playTime: fen + ":" + s, dt: t });
  };

  //获取到当前播放时间
  getPlayTime = (t) => {
    const { dt, lyric } = this.state;
    let fen = parseInt(t / 60) < 10 ? "0" + parseInt(t / 60) : parseInt(t / 60);
    let s = Math.ceil(t % 60) < 10 ? "0" + Math.ceil(t % 60) : Math.ceil(t % 60);
    this.setState({ currentPlayTime: fen + ":" + s, curlayTime: t });
    let time = t / dt;
    if (!isNaN(time)) {
      this.setState({ playLong: time * 100, layricTimg: "[" + fen + ":" + (t % 60).toFixed(3) + "] " });
      for (var i = 0; i < lyric.length; i++) {
        if (lyric[i] && lyric[i] != "") {
          let dt = lyric[i].slice(lyric[i].indexOf("[") + 1, lyric[i].lastIndexOf("]")).split(":");
          let time = Number(dt[0]) * 60 + Number(dt[1]);
          if (t <= time) {
            this.setState({ layricIndex: i - 1 });
            break;
          }
        } else {
          this.setState({ layricIndex: lyric.length - 2 });
        }
      }
    } else {
      this.setState({ playLong: 0, layricIndex: 0, layricTimg: "[00:00.000]" });
    }
  };

  //获取歌曲歌词
  getLyric = (id) => {
    getLyric(id).then((res) => {
      this.setState({ lyric: res.lrc ? res.lrc.lyric.split("\n") : [] });
    });
  };

  //隐藏播放页面
  hidden = () => {
    store.dispatch(editIsShowPlayPageAction(false));
  };

  //播放暂停
  playSong = (val) => {
    return (event) => {
      store.dispatch(editIsPlay(val));
    };
  };

  //修改播放进度
  changeDuration = (val) => {
    const { dt } = this.state;
    this.setState({ playLong: val });
    PubSub.publish("editPlayTime", dt * (val / 100));
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
        store.dispatch(editCurrentIdAction(id));
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
            localStorage.setItem(
              "songListObj",
              JSON.stringify({
                id: id,
                songList: songList,
                playModel: playModel,
              })
            );
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

  //
  changModel = (value) => {
    return () => {
      let songListObj = JSON.parse(localStorage.getItem("songListObj"));
      let { playModel, id, songList } = songListObj;
      if (value == 1) {
        playModel = 2;
        this.setState({ playModel: 2 });
      }
      if (value == 2) {
        playModel = 3;
        this.setState({ playModel: 3 });
      }
      if (value == 3) {
        playModel = 1;
        this.setState({ playModel: 1 });
      }
      localStorage.setItem(
        "songListObj",
        JSON.stringify({
          id: id,
          songList: songList,
          playModel: playModel,
        })
      );
    };
  };

  componentDidMount() {
    let songListObj = JSON.parse(localStorage.getItem("songListObj"));
    if (songListObj) {
      const { playModel } = songListObj;
      this.setState({ playModel });
    }

    //检测redux中状态的变化，只要变化，就调用render
    store.subscribe(() => {
      if (store.getState().currentPlayId !== this.state.id) {
        this.setState({ show: store.getState().isShowPlayPage, id: store.getState().currentPlayId });
        this.songDetail(this.state.id);
        this.getLyric(this.state.id);
      }
      this.setState({ show: store.getState().isShowPlayPage, id: store.getState().currentPlayId, isPlay: store.getState().isPlay });
    });
  }
  showSongList = (value) => {
    this.setState({ isShouList: value });
  };
  isShouListPage = () => {
    this.setState({ isShouList: true });
  };

  render() {
    const { show, id, detail, play, playTime, currentPlayTime, playLong, lyric, layricIndex, isPlay, playModel, isShouList } = this.state;
    return (
      <div className="layout" style={{ top: show ? 0 : "110vh" }}>
        <div className="content">
          <div className="bg" style={{ backgroundImage: detail ? `url(${detail.al.picUrl})` : "" }}></div>
          <div className="layer"></div>
          <div className="page">
            <div className="page-box">
              <i className="fa fa-angle-down fa-2x" onClick={this.hidden}></i>
              <div className="img">
                <img className="play_bg_img" src={require("@/assets/image/play-bg-img.png").default} />
                <div>
                  <img className={["picUrl", isPlay ? "" : "stop"].join(" ")} src={detail ? detail.al.picUrl : ""} />
                </div>
              </div>
              <div className="needle">
                <img style={{ transform: isPlay ? "rotateZ(-1deg)" : "rotateZ(-15deg)" }} src={require("@/assets/image/needle-ab.png").default} />
              </div>
              <div className="play_control">
                <div className="lyric">
                  <div ref="lyric" style={{ transform: `translateY(${2 * 5 - layricIndex * 5}vh)` }}>
                    {lyric.map((item, index) => {
                      return (
                        <p
                          style={{
                            color: layricIndex == index ? "#fff" : "#2B2D42",
                            fontSize: layricIndex == index ? "1.2rem" : "1rem",
                            filter: layricIndex == index ? "blur(0px)" : "blur(0.7px)",
                          }}
                          className={["picUrl", play ? "" : "stop"].join(" ")}
                          src={detail ? detail.al.picUrl : ""}
                          key={index}
                        >
                          {item.slice(item.lastIndexOf("]") + 1)}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="control">
                  <Slider style={{ marginLeft: 30, marginRight: 30 }} min={0} max={100} value={playLong} onChange={this.changeDuration} />
                  <div className="play_time">
                    <span>{currentPlayTime}</span>
                    <span>{playTime}</span>
                  </div>
                  <ul className="control_btn">
                    <li>
                      {/* 1、列表循环 2、单曲循环 3、随机播放 */}
                      <img
                        style={{ display: playModel == 1 ? "inline-block" : "none" }}
                        src={require("@/assets/icon/liebiao.png").default}
                        onClick={this.changModel(1)}
                      />
                      <img
                        style={{ display: playModel == 2 ? "inline-block" : "none" }}
                        src={require("@/assets/icon/danqu.png").default}
                        onClick={this.changModel(2)}
                      />
                      <img
                        style={{ display: playModel == 3 ? "inline-block" : "none" }}
                        src={require("@/assets/icon/suiji.png").default}
                        onClick={this.changModel(3)}
                      />
                    </li>
                    <li>
                      <img src={require("@/assets/icon/next-prev.png").default} onClick={this.PrevPreson} />
                    </li>
                    <li>
                      <img
                        onClick={this.playSong(true)}
                        style={{ display: isPlay ? "none" : "inline-block" }}
                        src={require("@/assets/icon/play.png").default}
                      />
                      <img
                        onClick={this.playSong(false)}
                        style={{ display: isPlay ? "inline-block" : "none" }}
                        src={require("@/assets/icon/play-1.png").default}
                      />
                    </li>
                    <li>
                      <img src={require("@/assets/icon/next-prev.png").default} onClick={this.NextPreson} />
                    </li>
                    <li>
                      <img src={require("@/assets/icon/gedan.png").default} onClick={this.isShouListPage} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Play dt={detail ? detail.dt : 0} getSongTime={this.getSongTime} getPlayTime={this.getPlayTime} />
        <SongList show={isShouList} showSongList={this.showSongList} />
      </div>
    );
  }
}
