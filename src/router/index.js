import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../views/Layout.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Car from "../views/Car.vue";
import search from "../components/search.vue";

Vue.use(VueRouter);

/**
 * 重写路由的push方法   message: "Navigating to current location (XXX) is not allowed"
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

const routes = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: layout,
    children: [
      {
        path: "search",
        name: "search",
        component: search,
      },
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "user",
        name: "user",
        component: User,
      },
      {
        path: "car",
        name: "car",
        component: Car,
      },
      {
        path: "mall",
        name: "mall",
        component: () => import("../views/Mall.vue"),
      },
      {
        path: "push",
        name: "push",
        component: () => import("../views/Push.vue"),
      },
      {
        path: "videoPlay", //视频播放页或详细查看动态图片页
        name: "videoPlay",
        component: () => import("../components/videoPlay"),
      },
      {
        path: "myCollect", //查看我的收藏页
        name: "myCollect",
        component: () => import("../components/myCollect"),
      },
      {
        path: "practice", //查看 菜谱里的做法详情页
        name: "practice",
        component: () => import("../components/practice"),
      },
      {
        path: "writecookbook", //发布菜谱的页面
        name: "writecookbook",
        component: () => import("../components/writeCookbook"),
      },
      {
        path: "userInfo", //查看当前登陆者用户信息的页面
        name: "userInfo",
        component: () => import("../components/userInfo"),
      },
      {
        path: "otherUserInfo", //查看别人用户信息的页面
        name: "otherUserInfo",
        component: () => import("../components/otherUserInfo"),
      },
      {
        path: "uploadVideo", //上传视频的页面
        name: "uploadVideo",
        component: () => import("../components/uploadVideo"),
      },
      {
        path: "category", //进入详细分类的页面
        name: "category",
        component: () => import("../components/category"),
      },
      {
        path: "editUser", //修改用户信息
        name: "editUser",
        component: () => import("../components/editUser"),
      },
      {
        path: "productDetails", //商品的详细界面信息
        name: "productDetails",
        component: () => import("../components/productDetails"),
      },
      {
        path: "confirmOrder", //确认下单的详细信息
        name: "confirmOrder",
        component: () => import("../components/confirmOrder"),
      },
      {
        path: "editAddress", //修改下单的地址信息
        name: "editAddress",
        component: () => import("../components/editAddress"),
      },
      {
        path: "myOrder", //查看我的订单
        name: "myOrder",
        component: () => import("../components/myOrder"),
      },
      {
        path: "myMall", //查看我的商品
        name: "myMall",
        component: () => import("../components/myMall"),
      },
      {
        path: "buyMyMall", //查看购买了我的商品的订单详情
        name: "buyMyMall",
        component: () => import("../components/buyMyMall"),
      },
      {
        path: "writeMall", //发布或修改我的商品
        name: "writeMall",
        component: () => import("../components/writeMall"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
