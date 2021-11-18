import router from "../router/index"; //引入路由
import { getToken, removeToKen, removeUserName } from "../utils/app";
import store from "../store/index";
// 路由白名单
const whiteRouter = ["/login"]; //indexOf方法，判断数组中是否存在指定的某个对象，如果不存在则返回-1
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    console.log("yes");
    if (to.path === "/login") {
      removeToKen();
      removeUserName();
      store.commit("SET_TOKEN", "");
      store.commit("SET_USERNAME", "");
      next();
    } else {
      next();
    }
  } else {
    console.log("no");
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login"); //路由指向
    }
  }
  //   console.log(to); //下一个页面
  //   console.log(from); //上一个页面
  //   console.log(next);
});

/**
 * 1.直接进入index的时候，参数to被改变成了"/index"，触发路由指向，就会跑beforeEach
 * 2.再一次next指向了login，再次发生路由指向，再跑beforeEach，参数的to被改变成了"/login"
 * 3.白名单判断存在，则执行next(),因为没有参数，所以不会再次beforeEach
 */
