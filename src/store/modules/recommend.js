import { get, post } from "../../http/axios";

export default {
  namespaced: true,
  state: {
    Recommend: [], //所有视频
    myRecommend: [], //我的发布视频
    myFavoriteRecommend: [], //我收藏的视频
  },
  mutations: {
    SET_Recommend(state, data) {
      state.Recommend = data;
    },
    SET_myRecommend(state, data) {
      state.myRecommend = data;
    },
    SET_myFavoriteRecommend(state, data) {
      state.myFavoriteRecommend = data;
    },
  },
  actions: {
    async getRecommend({ commit }) {
      let response = await get("/api/recommend/findAll");
      commit("SET_Recommend", response.data);
      console.log(response.data);
      return response.data;
    },
    async saveOrUpdateRecommend({ commit }, payload) {
      let response = await post("/api/recommend/saveOrUpdate", payload);
      console.log("/api/recommend/saveOrUpdate", response);
      return response;
    },
    //查找我的视频  //不用输入用户id，从session中拿
    async findMyRecommend({ commit }, id) {
      let response = await get("/api/recommend/findById", { id });
      console.log("recommend/findById", response.data);
      commit("SET_myRecommend", response.data);
      return response.data;
    },
    //删除我的全部视频
    async deleteMyRecommend({ dispatch }) {
      let response = await get("/api/recommend/delteALLById");
      dispatch("findMyRecommend");
      return response.data;
    },
    //删除我的某个视频
    async deleteMyOneRecommend({ dispatch }, id) {
      let response = await get("/api/recommend/delteById", { id });
      dispatch("findMyRecommend");
      return response.data;
    },
    //查找我的收藏（视频）
    async getMyFavoriteByRecommend({ commit }) {
      let response = await get("/api/recommend/getMyFavoriteByRecommend");
      commit("SET_myFavoriteRecommend", response.data);
      console.log("我收藏的视频--", response.data);
      return response.data;
    },
  },
};
