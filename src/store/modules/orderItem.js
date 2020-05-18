import { get, post } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    buyMyMallInfo: [], //我的被人买的商品
  },
  mutations: {
    SET_buyMyMallInfo(state, data) {
      state.buyMyMallInfo = data;
    },
  },
  actions: {
    //查找所有的商品
    async saveOrderItem({ commit }, payload) {
      let response = await post("/api/orderItem/save", payload);
      console.log("保存订单项信息", response);
      return response;
    },
    //查找我的商品中被人下单的信息
    async buyMyMall({ commit }) {
      let response = await get("/api/orderItem/findAll");
      commit("SET_buyMyMallInfo", response.data);
      console.log("/api/orderItem/findAll", response);
      return response;
    },
  },
};
