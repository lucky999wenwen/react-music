/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-09-02 14:41:01
 * @LastEditors: wanglong
 * @LastEditTime: 2021-09-28 16:30:00
 * @* : 博虹出品，抄袭必究😄
 */
import React from "react";

import Item from "@/components/ListItem";
import store from "@/redux/store";
import "./index.scss";

export default function SongList(props) {
  const [songListObj, setSongListObj] = React.useState({});
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    let songListObj = JSON.parse(localStorage.getItem("songListObj"));
    if (songListObj) {
      setSongListObj(songListObj);
      setList(songListObj.songList);
    }
    store.subscribe(() => {
      let songListObj1 = JSON.parse(localStorage.getItem("songListObj"));
      if (songListObj1) {
        setSongListObj(songListObj1);
        setList(songListObj1.songList);
      }
    });
  }, []);
  function showSongList() {
    props.showSongList(false);
  }

  return (
    <div className="song_list" style={{ top: props.show ? 0 : "100vh" }}>
      <div className="bg" onClick={showSongList}></div>
      <ul className="list_box">
        {list.map((item, index) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              artists={item.artists && item.artists.length ? item.artists[0].name : item.name}
              songList={list}
            />
          );
        })}
      </ul>
    </div>
  );
}
