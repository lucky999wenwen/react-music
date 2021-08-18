/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-27 11:03:09
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-18 15:58:38
 * @* : 博虹出品，抄袭必究😄
 */
/* 
	该文件专门为Count组件生成action对象
*/
import { ISSHOWEPLAYPAGE, CURRENTPLAYID, ISPLAY, PICURL } from "./constant";
//同步action，就是指action的值为Object类型的一般对象
export const editIsShowPlayPageAction = (data) => ({ type: ISSHOWEPLAYPAGE, data });
export const editCurrentIdAction = (data) => ({ type: CURRENTPLAYID, data });
export const editIsPlay = (data) => ({ type: ISPLAY, data });
export const editPicUrl = (data) => ({ type: PICURL, data });

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
// export const editPicUrlAsyncAction = (data, time) => {
//   return (dispatch) => {
//     // setTimeout(() => {
//     //   dispatch(createIncrementAction(data));
//     // }, time);
//   };
// };
