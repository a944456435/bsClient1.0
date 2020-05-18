import { upload } from "../../http/axios";
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async uploadImg({ commit }, file) {
      let response = await upload("/api/upload/uploadImg", { file });
      // let response = await upload("/api/QNupload/uploadImg", { file });
      console.log("upload.js response", response.data);
      return response.data;
    },
  },
};
