import { get, post, post_array } from "@/http/axios";
import { setSession } from "../../utils/sessionStorage";

export default {
  namespaced: true,
  state: {
    categorys: [], // 所有分类
    detailCategory: [], //具体某一分类的信息
  },
  getters: {},
  mutations: {
    refreshCategorys(state, data) {
      state.categorys = data;
    },
    SET_detailCategory(state, data) {
      state.detailCategory = data;
    },
  },
  actions: {
    async findAllCategory({ commit, dispath }) {
      const response = await get("/api/category/findAll");
      commit("refreshCategorys", response.data);
      //为了解决单页面数据刷新丢失，把数据存到seesionStorage中
      // setSession("categorys", JSON.stringify(response.data));
      console.log("this all category:", response.data);
      // console.log("JSON.parse(response.data[0])", JSON.parse(response.data));
      return response;
    },
    async findCategoryById({ commit }, id) {
      let response = await get("/api/category/findById", id);
      commit("SET_detailCategory", response);
      console.log("category---", response);
      return response;
    },
  },
};
