<template>
  <div class="user">
    <!-- {{loginer}} -->
    <div class="top">
      <div class="bground">
        <van-row class="first">
          <van-col class="photo" span="8" v-if="loginStatus">
            <img :src="loginer.photo" v-if="loginer.photo" />
            <img src="@/assets/timg.jpg" v-else />
          </van-col>
          <van-col offset="1" span="19">
            <van-row v-if="loginStatus">
              <van-row class="user_name">{{loginer.username}}</van-row>
              <van-row class="info">
                <van-col v-if="loginer.description">{{loginer.description}}</van-col>
                <van-col v-else>暂无个人说明，快去完善个人资料吧！</van-col>
              </van-row>
            </van-row>
            <van-row v-else>
              <van-row class="user_name">请登陆/注册</van-row>
              <van-row class="info text_ellipsis">世界那么大，快来进来看看吧！</van-row>
            </van-row>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="adv">
      <van-row type="flex" justify="space-around">
        <van-col span="22">
          <van-row gutter="5" class="adv_text">
            <van-col span="18">
              <!-- <span class="b_text"> -->
              <van-notice-bar text="开通掌厨会员 *学1000个名厨秘方 *满足吃货不同的口味" left-icon="volume-o" />
              <!-- </span> -->
            </van-col>
            <van-col span="6">
              <span>立即加入</span>
              <span>
                <van-icon name="arrow" />
              </span>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <div class="yhj">
      <!-- 优惠券单元格 -->
      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
      <!-- 优惠券列表 -->
      <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
    </div>
    <div class="my">
      <van-cell title="个人中心" is-link @click="showUserInfo" />
      <van-cell title="我的商品" is-link @click="showMyMall" />
      <van-cell title="我的销售" is-link @click="showBuyMyMall" />
      <van-cell title="我的订单" is-link @click="showMyOrder" />
      <van-cell title="我的地址" is-link @click="showMyAddress" />
      <van-cell title="我的收藏" is-link @click="showCollect" />
      <van-cell title="我的关注" is-link @click="showAttentionHandle" />
    </div>
    <div class="other">
      <van-cell title="登陆" is-link @click="loginHandle" />
      <van-cell title="退出登陆" @click="logoutHandle" />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getToken } from "../utils/local";
import { mapActions, mapState } from "vuex";
import myCollect from "../components/myCollect";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};
export default {
  components: {
    "whq-myCollect": "myCollect"
  },
  data() {
    return {
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    };
  },
  computed: {
    ...mapState("attention", ["attentionList"]),
    ...mapState("user", ["user_info", "loginStatus", "loginer"])
  },
  methods: {
    ...mapActions("user", ["logout", "findUserById", "isLogin"]),
    ...mapActions("attention", ["showAttention"]),
    ...mapActions("order", ["findAllOrder"]),
    login() {
      this.$router.push("/login");
    },
    logoutHandle() {
      this.logout();
      Toast("已经退出登陆！");
    },
    loginHandle() {
      this.$router.push("/login");
    },
    //优惠卷相关
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    //跳到个人信息修改页面
    async toEdit(id) {
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push({ path: "/editUser", query: { id } });
      } else {
        this.$router.push("/login");
      }
    },
    //个人中心
    async showUserInfo() {
      await this.isLogin();
      if (this.loginStatus) {
        //把登录的用户id传过去
        this.$router.push({ path: "/userInfo" });
      } else {
        this.$router.push("/login");
      }
    },
    //我的关注
    async showAttentionHandle() {
      await this.isLogin();
      // console.log("user.vue", this.attentionList);
      if (this.loginStatus) {
        this.$router.push({ path: "/myCollect", query: { id: 0 } });
      } else {
        this.$router.push("/login");
      }
    },
    //我的收藏
    async showCollect() {
      await this.isLogin();
      // console.log("user.vue", this.attentionList);
      if (this.loginStatus) {
        this.$router.push({ path: "/myCollect", query: { id: 1 } });
      } else {
        this.$router.push("/login");
      }
    },
    //我的订单
    async showMyOrder() {
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push({ path: "/myOrder" });
      } else {
        this.$router.push("/login");
      }
    },
    //我的地址
    async showMyAddress() {
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push({ path: "/editAddress" });
      } else {
        this.$router.push("/login");
      }
    },
    //我的商品
    async showMyMall() {
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push({ path: "/myMall" });
      } else {
        this.$router.push("/login");
      }
    },
    async showBuyMyMall() {
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push({ path: "/buyMyMall" });
      } else {
        this.$router.push("/login");
      }
    }
  },
  created() {
    this.isLogin();
  }
};
</script>

<style scoped>
.user {
  background-color: #f7f8fa;
  font-size: 0.8rem;
}
.top {
  margin-bottom: 10px;
  background-color: #ffffff;
}
.bground {
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  height: 100px;
  /* background-repeat: repeat; */
}
.first {
  margin-bottom: 15px;
  padding: 0 35px;
  padding-top: 15px;
  text-align: left;
}
.photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid red;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.user_name {
  font-size: 16px;
  font-weight: bolder;
}
.info {
  margin-top: 8px;
  height: 40px;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 3; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
.info > .van-col {
  text-indent: 2em;
  text-align: left;
  padding: 4px;
}
.text {
  text-align: center;
}
.text:last-child {
  margin: 8px auto 12px;
}
.adv {
  background-color: #ffffff;
  padding: 4px;
  margin-bottom: 12px;
}
.adv > .van-row > .van-col {
  background-color: #fffbe8;
  line-height: 40px;
}
.adv_text > .van-col > span:last-child {
  margin-left: 8px;
}

.my,
.other,
.yhj {
  padding: 0 28px;
  background-color: #ffffff;
  margin-bottom: 20px;
  text-align: left;
}
.other {
  margin-bottom: 20px;
}
</style>
