import { get } from "../../http/axios";

export default {
  namespaced: true,
  state: {
    video_info: [], //视频播放器处的信息
  },
  getters: {},
  mutations: {
    SET_VideoIofo(state, data) {
      state.video_info = data;
    },
  },
  actions: {
    //得到所有数据后，根据传来的id来取相应的数据
    async videoInfoById({ commit }, id) {
      const response = await get("/api/recommend/findVideo", { id });
      console.log("id", id, response);
      commit("SET_VideoIofo", response.data[0]);
      return response.data[0];
    },
  },
};
