<template>
  <div id="push">
    <h5></h5>
    <van-row class="date">
      <van-col :span="22" class="date_container">
        <van-row>
          <van-col class="ri">{{new Date().getDate()}}</van-col>
          <van-col>
            <van-row class="xq">{{getDay}}</van-row>
            <van-row class="ny">{{new Date().getMonth()}}/{{new Date().getFullYear()}}</van-row>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row class="text">
      <van-row>
        <i class="icon el-icon-food"></i>
      </van-row>
      <van-row>分享使人快乐！</van-row>
    </van-row>
    <el-row class="bottom">
      <van-col :span="7" :offset="1" class="block" @click="goUploadVideo">发布视频</van-col>
      <van-col :span="7" :offset="1" class="block" @click="goWriteCookbook">发布菜谱</van-col>
      <van-col :span="7" :offset="1" class="block" @click="goWriteMall">发布食材</van-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["loginStatus"]),

    getDay() {
      let day = new Date().getDay();
      switch (day) {
        case 0:
          return "星期天";
          break;
        case 1:
          return "星期一";
          break;
        case 2:
          return "星期二";
          break;
        case 3:
          return "星期三";
          break;
        case 4:
          return "星期四";
          break;
        case 5:
          return "星期五";
          break;
      }
    }
  },
  methods: {
    ...mapActions("user", ["isLogin"]),
    //跳转到写菜谱页
    async goWriteCookbook() {
      console.log("111");
      //登陆成功
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push("/writecookbook");
      } else {
        this.$router.push("/login");
      }
    },
    //跳到发布视频页
    async goUploadVideo() {
      //登陆成功
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push("/uploadVideo");
      } else {
        this.$router.push("/login");
      }
    },
    //跳到发布商品
    async goWriteMall() {
      //登陆成功
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push("/writeMall");
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped>
#push {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
.date_container {
  margin: 0 2rem;
}
.ri {
  font-size: 3rem;
  font-weight: 600;
  padding-right: 0.5rem;
}
.xq {
  padding-top: 0.5rem;
}
.icon {
  font-size: 60px;
  animation: myfirst 2s infinite;
}
.text {
  padding-top: 9rem;
  margin: 0 4rem;
}
.bottom {
  margin: 9rem 1.4rem 0;
}
.block {
  height: 110px;
  padding: 0 1rem;
  background-color: burlywood;
  display: flex;
  align-items: center;
  color: white;
}
.block:hover {
  animation: myblock 1s infinite;
}
@keyframes myfirst {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@keyframes myblock {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>