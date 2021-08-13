/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-12 15:32:08
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-06 16:02:23
 * @* : 博虹出品，抄袭必究😄
 */
/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/

var initState = {
  isShowPlayPage: false,
  currentPlayId: null,
  isPlay: false,
}; //初始化状态
export default function countReducer(preState = initState, action) {
  //从action对象中获取：type、data

  const { type, data } = action;
  let obj = { ...preState };
  //根据type决定如何加工数据
  switch (type) {
    case "editIsShowPlayPage": //修改是否显示播放页面
      obj.isShowPlayPage = data;
      return obj;
    case "editCurrentPlayId": //修改当前播放音乐的id
      obj.currentPlayId = data;
      return obj;
    case "editIsPlay": //修改当前播放音乐的id
      obj.isPlay = data;
      return obj;
    default:
      return preState;
  }
}
