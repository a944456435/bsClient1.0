import { get, post } from "../../http/axios";

export default {
  namespaced: true,
  state: {
    ingredients: [],
  },
  mutations: {
    SET_ingredients(state, data) {
      state.ingredients = data;
    },
  },
  actions: {
    //得到某个菜谱的用料信息
    async getIngredients({ commit }, id) {
      let response = await get("/api/ingredients/findById", { id });
      commit("SET_ingredients", response.data);
      console.log("用料：", response.data);
      return response;
    },
    //用料信息的更新
    async saveOrUpdateIngre({ commit }, payload) {
      console.log("/api/ingredients/saveOrUpdate  payload", payload);
      let response = await post("/api/ingredients/saveOrUpdate", { payload });
      console.log("/api/ingredients/saveOrUpdate", response.data);
      return response;
    },
  },
};
