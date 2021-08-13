/*
 * @Descripttion:
 * @version:
 * @Author: seven
 * @Date: 2019-09-03 19:21:19
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-04 14:07:03
 */
import axios from "axios";
// import { Notify } from "vant";
// import { Toast } from "vant";
// import store from "@/store";
// import { getToken, setToken } from "@/utils/auth";
const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    // if (store.state.token) {
    //   config.headers["wxToken"] = getToken();
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 200) {
      return response.data;
    } else {
      return response.data;
      // return Promise.reject(res.msg || "error");
    }
  },
  (error) => {
    console.log(error, "访问异常的错误");
    return Promise.reject(error);
  }
);

export default service;
