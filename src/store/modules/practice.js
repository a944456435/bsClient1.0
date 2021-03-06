import { get, post } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    cookStep: [],
  },
  mutations: {
    SET_cookStepList(state, data) {
      state.cookStep = data;
    },
  },
  actions: {
    async showCookStep({ commit }, id) {
      let response = await get("/practice/findBycookId", { id });
      commit("SET_cookStepList", response.data);
      console.log("/practice/findBycookId", response.data);
      return response;
    },
    async saveOrUpdateStep({ commit }, payload) {
      let response = await post("/practice/saveOrUpdate", { payload });
      console.log("步骤循序加入", response.data);
      return response;
    },
  },
};
