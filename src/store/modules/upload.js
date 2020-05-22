import { upload } from "../../http/axios";
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async uploadImg({ commit }, file) {
      let response = await upload("/upload/uploadImg", { file });
      // let response = await upload("/QNupload/uploadImg", { file });
      console.log("upload.js response", response.data);
      return response.data;
    },
  },
};
