import { get, post } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    commentByRecomendId: [], //某个推荐视频的所以评论信息
    commentByCookbookId: [], //某个菜谱的所有评论信息
  },
  mutations: {
    SET_commentByRecomendId(state, data) {
      state.commentByRecomendId = data;
    },
    SET_commentByCookbookId(state, data) {
      state.commentByCookbookId = data;
    },
  },
  actions: {
    //寻找推荐视频的评论
    async findByRecommendId({ commit }, id) {
      let response = await get("/api/comment/findByRecommendId", { id });
      console.log("/api/comment/findByRecommendId response", response.data);
      commit("SET_commentByRecomendId", response.data);
      return response;
    },
    //查找菜谱的评论
    async findByCookbookId({ commit }, id) {
      let response = await get("/api/comment/findByCookbookId", { id });
      console.log("/api/comment/findByCookbookId response", response.data);
      commit("SET_commentByCookbookId", response.data);
      return response;
    },
    //为视频或者菜谱添加评论
    async saveComment({ commit }, payload) {
      let response = await post("/api/comment/saveOrUpdate", { payload });
      return response;
    },
  },
};
