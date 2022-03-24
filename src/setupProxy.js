/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-02 11:58:45
 * @LastEditors: wanglong
 * @LastEditTime: 2021-12-01 11:43:28
 * @* : 博虹出品，抄袭必究😄
 */
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  console.log(app);
  app.use(
    proxy("/dev", {
      //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      // target: "https://music.kele8.cn", //配置转发目标地址(能返回数据的服务器地址)
      target: "http://192.168.11.29:4000", //配置转发目标地址(能返回数据的服务器地址)
      // target: "http://192.168.11.173:8070",
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
      pathRewrite: { "^/dev": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    })
  );
};
