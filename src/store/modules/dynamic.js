import { get } from "../../http/axios";

export default {
  namespaced: true,
  state: {
    lastDynamic: [], //最近动态的信息
    userInfo: [], //发布最近动态的用户信息
  },
  getters: {
    getterLastDynamic: (state) => {
      return function(type) {
        if (type == "mp4") {
          var mp4Arr = [];
          state.lastDynamic.forEach((i) => {
            if (i.other && i.other.substr(-3) == "mp4") {
              mp4Arr.push(i);
            }
          });
          return mp4Arr;
        } else if (typeof type == "number") {
          return state.lastDynamic.slice(0, number);
        } else if (type == "img") {
          var imgArr = [];
          state.lastDynamic.forEach((i) => {
            if (
              i.other &&
              (i.other.substr(-3) == "png" ||
                i.other.substr(-3) == "jpg" ||
                i.other.substr(-3) == "jpeg")
            ) {
              imgArr.push(i);
            }
          });
          return imgArr;
        } else {
          return state.lastDynamic;
        }
      };
    },
  },
  mutations: {
    refreshLastDynamic(state, data) {
      state.lastDynamic = data;
    },
    refreshUserInfo(state, data) {
      state.userInfo = data;
    },
  },
  actions: {
    // async getLastDynamic({ commit }) {
    //   const userInfo = [];
    //   const response = await get("/api/dynamic/cascadQuery");
    //   commit("refreshLastDynamic", response.data);
    //   return response;
    // },
  },
};
