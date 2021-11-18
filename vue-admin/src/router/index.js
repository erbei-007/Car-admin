import { createRouter, createWebHistory } from "vue-router";
// import login from "../views/Login.vue";
// 引入布局组件
import Layout from "@/views/Layout";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/index",
    name: "layout",
    redirect: "/welcome",
    component: Layout,
    children: [
      {
        path: "/console",
        name: "console",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/console/console.vue"
          ),
      },
    ],
  },
  //停车场
  {
    path: "/parking",
    name: "Parking",
    component: Layout,
    children: [
      {
        path: "/parkingIndex",
        name: "ParkingIndex",
        component: ()=>
        import("../views/parking/index.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
