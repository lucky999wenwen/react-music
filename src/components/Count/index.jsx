/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-07-09 15:15:49
 * @LastEditors: wanglong
 * @LastEditTime: 2021-07-27 16:06:57
 * @* : 博虹出品，抄袭必究😄
 */
import React, { Component } from "react";
import store from "@/redux/store";

//引入actionCreator，专门用于创建action对象
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "@/redux/count_action";

export default class Couen extends Component {
  state = { count: 0 };
  //加法
  increment = () => {
    const { value } = this.selectNumber;
    store.dispatch(createIncrementAction(value * 1));
  };

  //减法
  decrement = () => {
    const { value } = this.selectNumber;
    store.dispatch(createDecrementAction(value * 1));
  };

  //当前求和为奇数再加
  incrementIfOdd = () => {};

  //异步加
  incrementAsync = () => {
    const { value } = this.selectNumber;
    store.dispatch(createIncrementAsyncAction(value * 1, 1000));
  };

  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    );
  }
}
