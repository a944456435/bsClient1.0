import { get, post } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    allAddress: [], //某用户的所以地址
    defaultAddressId: 0, //默认的地址id
    oneAdddress: {}, //某个地址信息
  },
  mutations: {
    SET_allAddress(state, data) {
      state.allAddress = data;
      state.defaultAddressId = data[0].id;
    },
    SET_oneAdddress(state, data) {
      state.oneAdddress = data;
    },
    SET_defaultAddressId(state, id) {
      state.defaultAddressId = id;
    },
  },
  actions: {
    //查找所有的地址
    async getAllAddress({ commit }) {
      let response = await get("/api/address/findAll");
      console.log("/api/address/findAll", response.data);
      commit("SET_allAddress", response.data);
      return response;
    },
    //查找某个地址
    async getOneAddress({ commit }, id) {
      let response = await get("/api/address/findById", { id });
      console.log("/api/address/findById", response.data);
      commit("SET_oneAdddress", response.data[0]);
      return response.data;
    },
    //增加或修改地址
    async saveOrUpdateAddress({ commit }, payload) {
      let response = await post("/api/address/saveOrUpdate", payload);
      console.log("/api/address/saveOrUpdateAddress", response.data);
      return response.data;
    },
  },
};
