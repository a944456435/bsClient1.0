import axios from "axios";
import qs from "qs";
import { Toast } from "vant";

// 全局配置
// axios.defaults.headers.common["token"] = ""
// axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "/api";
// Add a response interceptor

axios.defaults.withCredentials = true;
const baseURL =
  process.env.NODE_ENV === "development"
    ? "/api"
    : "http://101.132.112.10:3000";
console.log("baseURL", baseURL);
axios.defaults.baseURL = baseURL;

axios.interceptors.response.use(
  function(response) {
    // 将后台的参数结果设置到response
    const { data } = response; // => {data:data}={data:{data,status,message}}
    response.data = data.data;
    response.status = data.status;
    response.statusText = data.message;
    console.log("------响应拦截器----", response.statusText == "请重新登陆！");
    if (response.statusText == "请重新登陆！") {
      console.log("login fail", response);
      Toast("token失效，请重新登陆！");
    }
    return response; // response={data:data,status:status,message:message,data:{data,status,message}}
  },
  function(error) {
    if (error.message.includes("timeout")) {
      // 判断请求异常信息中是否含有超时timeout字符串
      Toast("请求超时，请刷新网络...");
    }
    return Promise.reject(error);
  }
);

/**
 * 提交post请求 发送的数据为查询字符串，key=val&key=val
 */
export function post(url, data) {
  return axios({
    method: "post",
    url,
    data: qs.stringify(data),
    timeout: 10000,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
}

/**
 * 提交post请求 发送的数据为查询字符串，当参数为数组的时候适用该方法
 * ids=1&ids=2
 */
export function post_array(url, data) {
  return axios({
    method: "post",
    url,
    data: qs.stringify(data, { arrayFormat: "repeat" }),
    timeout: 10000,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
}
/**
 * 提交post请求 发送的数据为json字符串
 */
export function post_json(url, data) {
  return axios({
    method: "post",
    url,
    data,
    timeout: 10000,
  });
}
export function get(url, params) {
  return axios({
    method: "get",
    url,
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
}
//文件上传
export function upload(url, data) {
  return axios({
    method: "post",
    url,
    data,
    timeout: 10000,
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
      // "Content-Type": "multipart/form-data;boundary = " + new Date().getTime(),
    },
  });
}
