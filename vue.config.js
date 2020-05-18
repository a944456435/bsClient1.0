const path = require("path");
module.exports = {
  configureWebpack: {
    // alias: {
    //   "@": path.resolve(__dirname, "/src"),
    // },
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
  },
};
