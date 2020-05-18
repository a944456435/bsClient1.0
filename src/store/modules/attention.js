import { get } from "../../http/axios";
export default {
  namespaced: true,
  state: {
    attentionList: [], //查看我关注的人
    alreadyAttention: true, //判断对当前用户是否已经关注了
  },
  mutations: {
    SET_attentionList(state, data) {
      state.attentionList = data;
    },
    SET_alreadyAttention(state, data) {
      state.alreadyAttention = data;
    },
  },
  actions: {
    async showAttention({ commit }) {
      //后台通过session解析出有没有id，这不用传参数
      let response = await get("/api/attention/findById");
      commit("SET_attentionList", response.data);
      console.log("/api/attention/findById", response.data);
      return response.data;
    },
    //取消关注，删除我的关注
    async cancelAttention({ commit }, id) {
      let response = await get("/api/attention/deleteById", { fans_id: id });
      console.log("/api/attention/deleteById", response.data);
      return response.data;
    },
    //查看登陆的用户是否已经对当前作品用户进行了关注
    async findIsAttention({ commit }, id) {
      let response = await get("/api/attention/findIsAttention", {
        fans_id: id,
      });
      console.log("findIsAttention--", response.data);
      if (response.data.length > 0) {
        commit("SET_alreadyAttention", false);
      } else {
        console.log("刚登陆后的fan_id", id);
        commit("SET_alreadyAttention", true);
      }
      return response.data;
    },
    //添加关注用户
    async saveAttention({ commit }, id) {
      let response = await get("/api/attention/saveAttention", { fans_id: id });
      console.log("/api/attention/saveAttention", response.data);
      return response.data;
    },
  },
};
