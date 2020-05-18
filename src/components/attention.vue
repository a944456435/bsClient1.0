<template>
  <div class="attention" @click="goShow(data.dynamic_id)">
    <!-- 头像资料部分 -->
    <van-row gutter="20" type="flex" align="center">
      <van-col class="user_photo" offset="1" span="2">
        <template v-if="data.photo">
          <van-image round width="3rem" height="3rem" :src="data.photo" />
        </template>
        <template v-else>
          <van-image round width="3rem" height="3rem" src="@/assets/timg.jpg" />
        </template>
      </van-col>
      <van-col offset="2" span="17">
        <van-row type="flex" align="center">
          <van-col class="user_name" span="5">{{ data.username }}</van-col>
        </van-row>
        <van-row>
          <van-col class="issuing_time">{{ data.releaseTime }}</van-col>
        </van-row>
      </van-col>
    </van-row>

    <!-- 内容部分 -->
    <van-row class="text">
      <van-col offset="1">{{ data.text }}</van-col>
    </van-row>
    <van-row gutter="30">
      <van-col offset="1">
        <img src="@/assets/timg.jpg" />
      </van-col>
      <!-- <van-col offset="1">
        <img src="@/assets/timg.jpg" />
      </van-col>-->
    </van-row>
    <!-- 定位城市 -->
    <van-row v-if="data.city">
      <van-col offset="1">
        <van-icon name="location-o" size="22" />
        {{ data.city }}
      </van-col>
    </van-row>
    <!-- 素质三联部分 -->
    <van-row class="bottom">
      <van-col offset="1" span="5">5.3万浏览</van-col>
      <van-col offset="5" span="4">
        <van-icon name="replay" />111
      </van-col>
      <van-col span="4">
        <van-icon name="chat-o" />999+
      </van-col>
      <van-col span="4">
        <van-icon name="good-job-o" />28
      </van-col>
      <!-- 右边边距 -->
      <van-col span="1"></van-col>
    </van-row>
    <!-- 灰色间隙 -->
    <van-row>
      <van-col span="24"></van-col>
    </van-row>
    <!-- 详情页 -->
    <router-view />
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    goShow(id) {
      this.$router.push({ path: "videoPlay", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.attention {
  margin-top: 30px;
  background-color: #ffffff;
}
.attention > .van-row:last-child {
  height: 15px;
  background-color: #f7f8fa;
}
.attention > .van-row {
  margin-bottom: 8px;
}
.user_photo {
  padding-left: 0px !important;
  height: 100%;
  border: 1px solid gray;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 aoto;
}
.user_photo > img {
  width: 100%;
  height: 100%;
}
.user_name {
  font-weight: 700;
  font-size: 18px;
}
.issuing_time {
  color: gray;
}
.text {
  margin: 5px 0;
}
.bottom {
  margin-bottom: 12px;
}
</style>
