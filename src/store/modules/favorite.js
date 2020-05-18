import { post, get } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    curUserFavoriteLen: [], //查询当前的用户收藏了当前的视频或菜谱（一般为0或1个）
    favoriteStatu: false, //当前用户的收藏按钮是否点亮
    favoriteNum: 0, //当前作品的收藏总数
    myFavoriteCookbook: [], //我收藏的菜单
  },
  mutations: {
    SET_curUserFavorite(state, data) {
      state.curUserFavoriteLen = data;
    },
    SET_favoriteStatu(state, data) {
      state.favoriteStatu = data;
    },
    SET_favoriteNum(state, data) {
      state.favoriteNum = data;
    },
    SET_myFavoriteCookbook(state, data) {
      state.myFavoriteCookbook = data;
    },
  },
  actions: {
    //添加收藏
    async saveFavorite({ commit }, payload) {
      let response = await get("/api/favorite/saveFavorite", payload);
      console.log("saveFavorite", response);
      return response;
    },
    //查看当前用户是否收藏视频或菜谱
    async findIsFavorite({ commit }, payload) {
      let response = await get("/api/favorite/findById", payload);
      commit("SET_curUserFavorite", response.data);
      console.log("findById", response.data); //response.data>0时，已收藏
      let statu = response.data.length == 0 ? false : true;
      commit("SET_favoriteStatu", statu);
      return response.data;
    },
    //取消收藏
    async cancelFavorite({ commit, dispath }, payload) {
      let response = await get("/api/favorite/deleteById", payload);
      return response.data;
    },
    //得到当前视频或者菜谱的收藏总数
    async countFavorite({ commit }, payload) {
      let response = await get("/api/favorite/getCountFavorite", payload);
      commit("SET_favoriteNum", response.data.length);
      console.log("getCountFavorite--", response.data.length);
      return response.data;
    },
    //查找当前用户的收藏（菜单）
    async getMyFavoriteByCookbook({ commit }) {
      let response = await get("/api/favorite/getMyFavoriteByCookbook");
      commit("SET_myFavoriteCookbook", response.data);
      console.log("我收藏的菜单--", response.data);
      return response.data;
    },
  },
};
