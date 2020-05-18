import { get, post } from "../../http/axios";
import { GridItem } from "vant";
export default {
  namespaced: true,
  state: {
    cookList: [], //所有的菜谱信息
    lastCookId: "", //最新增加的cookbook表的自增主键id
    detailCategory: [], //某个具体分类的cookbook信息
    myCookbook: [], //我的菜谱
    cookbook: [], //某个菜谱
  },
  mutations: {
    SET_cookListList(state, data) {
      state.cookList = data;
    },
    SET_lastCookId(state, id) {
      state.lastCookId = id;
    },
    SET_detailCategory(state, data) {
      state.detailCategory = data;
    },
    SET_myCookbook(state, data) {
      state.myCookbook = data;
    },
    SET_Cookbook(state, data) {
      state.cookbook = data;
    },
  },
  actions: {
    async allCookbook({ commit }) {
      let response = await get("/api/cookbook/findAll");
      commit("SET_cookListList", response.data);
      return response;
    },
    async toSubmitCookbook({ commit }, payload) {
      let response = await post("/api/cookbook/saveOrUpdate", { payload });
      console.log("/api/cookbook/saveOrUpdate", response);
      if (response.data.insertId != undefined && response.data.insertId != "") {
        commit("SET_lastCookId", response.data.insertId);
      }
      return response;
    },
    async findByCategoryId({ commit }, id) {
      let response = await get("/api/cookbook/findByCategoryId", id);
      console.log("api/cookbook/findByCategoryId response", response.data);
      commit("SET_detailCategory", response.data);
      return response.data;
    },
    //查找我的菜谱
    async findMyCookbook({ commit }, id) {
      console.log("查找用户id的菜谱", id);
      let response = await get("/api/cookbook/findByUserId", { id });
      commit("SET_myCookbook", response.data);
      console.log("/cookbook", response);
      return response.data;
    },
    //删除我的菜谱
    async deleteMyCookbook({ dispatch }, id) {
      let response = await get("/api/cookbook/deleteById", { id });
      console.log("deletebyid--", response);
      dispatch("findMyCookbook");
      return response.data;
    },
    //通过id查找菜谱
    async findCookbookById({ commit }, id) {
      console.log("查找id的菜谱", id);
      let response = await get("/api/cookbook/findById", { id });
      commit("SET_Cookbook", response.data);
      return response.data;
    },
  },
};
