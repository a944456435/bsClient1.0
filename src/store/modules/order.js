import { get, post } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    allOrder: [], //用户的所有订单
  },
  mutations: {
    SET_allOrder(state, data) {
      state.allOrder = data;
    },
  },
  actions: {
    //保存订单
    async saveOrder({ commit }, payload) {
      let response = await post("/order/save", payload);
      console.log("all order", response);
      return response;
    },
    //查找用户的所有订单信息
    async findAllOrder({ commit }) {
      let response = await get("/order/findAll");
      commit("SET_allOrder", response.data);
      return response;
    },
  },
};
