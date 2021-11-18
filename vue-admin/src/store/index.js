import { createStore } from "vuex";

// import Cookie from "cookie_js";
import { Login, Logout } from "@/api/login";
import { GetCategory } from "@/api/news";
import {
  setToKen,
  removeToKen,
  removeUserName,
  setUserName,
  getUserName,
} from "../utils/app.js";
export default createStore({
  // 储存初始化数据
  //数据存储属性
  state: {
    // 获取存储的数据
    isCollapse: sessionStorage.getItem("isCollapse") || false,
    to_ken: "",
    username: getUserName() || "",
    // isCollapse: Cookie.get("isCollapse") || false,
    // count: 10,
  },
  // 对state里面的数据二次处理，类似过滤filter的作用
  //计算属性
  getters: {
    // computed
    // count: (state) => state.count + 10,
    isCollapse: (state) => state.isCollapse,
  },
  //方法属性
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      // console.log(state.isCollapse);
      // HTML5本地储存 存储大小：5M（数据量大小） 存储于客户端 只能存储字符串类型
      // 用于导航栏菜单展开折叠，打开或者刷新浏览器保存展开或折叠状态
      sessionStorage.setItem("isCollapse", state.isCollapse);
      // js-cookie插件进行储存，和HTML5本地储存方式使用方法一样
      // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value) {
      state.to_ken = value;
    },
    SET_USERNAME(state, value) {
      state.username = value;
    },
  },
  //异步属性
  actions: {
    login({ commit }, repuestData) {
      return new Promise((resolve, reject) => {
        Login(repuestData)
          .then((response) => {
            // console.log(response);
            let data = response.data.data;
            // 普通的
            // content.commit('SET_TOKEN', data.toKen);
            // content.commit('SET_USERNAME', data.username);
            // 解构的
            commit("SET_TOKEN", data.token);
            commit("SET_USERNAME", data.username);
            setToKen(data.token);
            setUserName(data.username);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        Logout().then((response) => {
          const data = response.data;
          removeToKen();
          removeUserName();
          commit("SET_TOKEN", "");
          commit("SET_USERNAME", "");
          // commit("SET_ROLES", []);
          resolve(data);
        });
      });
    },
    getInfoCategory() {
      return new Promise((resolve, reject) => {
        GetCategory({})
          .then((response) => {
            resolve(response.data.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {},
});
