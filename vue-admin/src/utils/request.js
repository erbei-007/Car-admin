import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken, getUserName } from "../utils/app";
// 创建axios，赋值给service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";

const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
});
// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_ABC);

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers["Tokey"] = getToken();
    config.headers["UserName"] = getUserName();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    let data = response.data;
    // 业务需求
    if (data.resCode !== 0) {
      ElMessage.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
      // return Promise.resolve(data);
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// service.request({
//   method: "post",
//   url: "/user/12345",
//   data: {
//     firstName: "Fred",
//     lastName: "Flintstone",
//   },
// });

export default service;
/**
 * 使用export default时，不能同时存在多个default
 * 文件import引入不需要花括号
 */
