// const path = require("path");
// module.exports = {
//   configureWebpack: {
//     devServer: {
//       proxy: {
//         "/api": {
//           target: "http://localhost:3000",
//           changeOrigin: true,
//           pathRewrite: {
//             "^/api": "",
//           },
//         },
//       },
//     },
//   },
// };

const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  configureWebpack: {
    // entry: "./src/main.js",
    // output: {
    //   path: path.resolve(__dirname, "dist"),
    //   filename: "[name].[chunkHash:4].js",
    // },
    //不打包的项目，解决vendor打包后太大
    externals: {
      // vue: "Vue",
      // "vue-router": "VueRouter",
      // "element-ui": "ELEMENT",
      Vant: "vant",
    },
    module: {
      rules: [
        // {
        //   test: /\.css$/i,
        //   use: [miniCssExtractPlugin.loader, "css-loader"], //style-loader 使css放在heand的style中    mini-css-extract-plugin使解析后的css生成一个独立的文件,link进来
        // },
        // {
        //   test: /\.(png|jpg|gif|jpeg)$/i,
        //   use: [
        //     {
        //       loader: "url-loader",
        //       options: {
        //         limit: 8192,
        //       },
        //     },
        //   ],
        // },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        title: "掌厨食代", //要使用配置的title，要在对应的模板文件的title标签上输入  <%= htmlWebpackPlugin.options.title %>
        //   filename: "public/index.html", //打包后输出的文件名
        template: "public/index.html", //打包时使用指定的模板文件
      }),
      // new miniCssExtractPlugin({
      //   filename: "css/[name].[hash:3].css", // css/ 把.css放到css文件夹中
      //   publicPath: "../../",
      // }),
    ],
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

// module.exports = {
//   publicPath: "./",
//   outputDir: "dist",
//   assetsDir: "static",
// };
