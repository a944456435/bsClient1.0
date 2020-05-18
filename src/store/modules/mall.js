import { get, post } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    allMall: [{ id: 1 }], //所有的商品信息
    oneMall: [], //通过id查找得到的某个商品信息
    commentAboutOneMall: [], //某个商品的所有评论信息
    mallAboutUser: [], //某个用户的所有商品信息
  },
  mutations: {
    SET_allMall(state, data) {
      state.allMall = data;
    },
    SET_oneMall(state, data) {
      state.oneMall = data;
    },
    SET_commentAboutOneMall(state, data) {
      state.commentAboutOneMall = data;
    },
    SET_mallAboutUser(state, data) {
      state.mallAboutUser = data;
    },
  },
  actions: {
    //查找所有的商品
    async getAllMall({ commit }) {
      let response = await get("/api/mall/findAll");
      commit("SET_allMall", response.data);
      console.log("all mall", response);
      return response;
    },
    //查找用户的所有的商品
    async getAllMallAboutUser({ commit }) {
      let response = await get("/api/mall/findMallByUserId");
      commit("SET_mallAboutUser", response.data);
      console.log("findMallByUserId", response);
      return response;
    },
    //根据id查找对应商品
    async getMallById({ commit }, id) {
      let response = await get("/api/mall/findById", { id });
      // 为每个产品添加一个number属性（购物后的维护）
      response.data[0].number = 0;
      console.log("在得到产品时加入一个数量属性", response.data[0]);
      commit("SET_oneMall", response.data[0]);
      return response.data;
    },
    //根据id查找商品的评论
    async getCommentByMallId({ commit }, id) {
      let response = await get("/api/mall/findCommentById", { id });
      commit("SET_commentAboutOneMall", response.data);
      return response;
    },
    //删除商品id删除商品
    async deleteMallById({ dispatch }, id) {
      let response = await get("/api/mall/deleteById", { id });
      return response;
    },
    //新增商品
    async saveOrUpdateMall({ commit }, payload) {
      let response = await post("/api/mall/saveOrUpdate", payload);
      return response;
    },
  },
};
