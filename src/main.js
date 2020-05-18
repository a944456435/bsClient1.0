import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vant.js";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import {
  Upload,
  Row,
  Col,
  Card,
  Button,
  Select,
  Option,
  Input,
  Avatar,
  Form,
  FormItem,
  OptionGroup,
  Image,
  Link,
  Message,
  Drawer,
  InputNumber,
  Checkbox,
} from "element-ui";
Vue.use(Upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(OptionGroup);
Vue.use(Image);
Vue.use(Link);
Vue.use(Drawer);
Vue.use(InputNumber);
Vue.use(Checkbox);
Vue.prototype.$message = Message;
Vue.config.productionTip = false;
//全局注册时间过滤器
// 全局注册过滤器
Vue.filter("alldate", function(val) {
  if (val) {
    return moment(parseInt(val)).format("YYYY/MM/DD HH:mm:ss");
  }
  return val;
});
Vue.filter("date", function(val) {
  if (val) {
    return moment(parseInt(val)).format("MM-DD HH:mm");
  }
  return val;
});
import Attention from "@/components/attention";
import Recommend from "@/components/recommend";
import Cookbook from "@/components/cookbook";
import SameCity from "@/components/sameCity";
//注册全局组件
Vue.component("whq-Attention", Attention);
Vue.component("whq-Recommend", Recommend);
Vue.component("whq-CookBook", Cookbook);
Vue.component("whq-SameCity", SameCity);
//按需加载使用element组件
// Vue.use(Dropdown);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
