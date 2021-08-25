/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-03 10:35:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-24 14:24:33
 * @* : 博虹出品，抄袭必究😄
 */
// personalized / newsong;
import request from "@/plugin/axios";

//获取推荐歌单
export function getPersonalized() {
  return request({
    url: "/personalized?limit=6",
    method: "get",
  });
}

//获取推荐音乐最新音乐
export function getNewsongList() {
  return request({
    url: "/personalized/newsong",
    method: "get",
  });
}

//获取热歌榜列表
export function getHotlist() {
  return request({
    url: "/artist/top/song?id=6452",
    method: "get",
  });
}

//检测是否有版权
export function check(id) {
  return request({
    url: "/check/music?id=" + id,
    method: "get",
  });
}

//得到歌曲详情
export function songDetail(id) {
  return request({
    url: "/song/detail?ids=" + id,
    method: "get",
  });
}

//得到歌曲播放链接
export function songUrl(id) {
  return request({
    url: "/song/url?id=" + id,
    method: "get",
  });
}

//得到歌曲歌词
export function getLyric(id) {
  return request({
    url: "/lyric?id=" + id,
    method: "get",
  });
}

//获取歌单详情
export function playlistDe(id) {
  return request({
    url: "/playlist/detail?id=" + id,
    method: "get",
  });
}

//搜索
export function search(keywords) {
  return request({
    url: "/search/suggest?keywords=" + keywords,
    method: "get",
  });
}
