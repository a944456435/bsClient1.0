import { post, get } from "../../http/axios";
// import { setToken, getToken, removeToken } from "../../utils/local";
export default {
  namespaced: true,
  state: {
    user_info: [], //用户信息
    loginStatus: false, //是否登陆
    loginer: [], //当前登陆者的信息
    otherInfo: [], //不需要登陆通过id查找用户信息
  },
  mutations: {
    SET_loginStatus(state, data) {
      state.loginStatus = data;
    },
    SET_user_info(state, data) {
      state.user_info = data;
    },
    SET_otherInfo(state, data) {
      state.otherInfo = data;
    },
    SET_loginer(state, data) {
      state.loginer = data;
    },
  },
  actions: {
    async login({ commit }, payload) {
      let response = await post("/api/user/login", payload);

      console.log("登陆状态：", response.status);
      console.log("登陆者信息：", response.data[0]);
      commit("SET_loginer", response.data[0]);
      status = response.status;
      //   要得到登陆者的用户名，用户id等信息
      return response;
    },
    async logout({ commit }) {
      let response = await get("/api/user/logout");
      console.log("logout", response);
      commit("SET_loginStatus", false);
      return response;
    },
    async isLogin({ commit }) {
      console.log("hello");
      let response = await get("/api/user/findById");
      console.log("user.js----isLogin status", response.status);

      commit("SET_loginStatus", response.status == 200 ? true : false);
      return response;
    },
    async registOrUpdate({ commit }, payload) {
      let response = await post("/api/user/saveOrUpdate", payload);
      console.log("注册", response);
      return response;
    },
    //查看当前登陆者信息
    async findUserById({ commit }) {
      let response = await get("/api/user/findById");
      console.log("/api/user/findById", response.data);
      commit("SET_user_info", response.data);
      return response;
    },
    // 查看未登陆用户信息
    async getUserById({ commit }, id) {
      let response = await get("/api/user/findUserById", { id });
      console.log("/api/user/findUserById", response.data);
      commit("SET_otherInfo", response.data);
      return response;
    },
  },
};
