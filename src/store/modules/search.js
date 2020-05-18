import { get } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    // searchCookbookResluts: [],
    // searchRecommendResluts: [],
    searchResluts: [],
  },
  mutations: {
    // SET_searchCookbookResluts(state, data) {
    //   state.searchCookbookResluts = data;
    // },
    // SET_searchRecommendResluts(state, data) {
    //   state.searchRecommendResluts = data;
    // },
    SET_searchResluts(state, data) {
      state.searchResluts = data;
    },
  },
  actions: {
    //模糊查询菜谱
    async getCookbookBykeyword({ commit }, keyword) {
      let response = await get("/api/cookbook/searchByKey", { keyword });
      console.log("cookbook/searchByKey", response.data);
      commit("SET_searchResluts", response.data);
      return response.data;
    },
    //模糊查询视频
    async getRecommendBykeyword({ commit }, keyword) {
      let response = await get("/api/recommend/searchByKey", { keyword });
      console.log("recommend/searchByKey", response.data);
      commit("SET_searchResluts", response.data);
      return response.data;
    },
    //模糊查询用户
    async getUserBykeyword({ commit }, keyword) {
      let response = await get("/api/user/searchByKey", { keyword });
      console.log("user/searchByKey", response.data);
      commit("SET_searchResluts", response.data);
      return response.data;
    },
  },
};
