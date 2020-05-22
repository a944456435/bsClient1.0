<template>
  <div class="recommend" @click="goShow(data.recommend.id)">
    <!-- {{data}} -->
    <div class="lists_mp4">
      <van-row>
        <van-col span="24" class="video_container">
          <video>
            <source :src="data.recommend.resource" type="video/mp4" />
          </video>
          <i class="el-icon-video-play" style="fontSize:2rem"></i>
        </van-col>
      </van-row>
      <div class="content_text">
        <van-row class="title">
          <van-col offset="1">{{ data.recommend.title }}</van-col>
        </van-row>
      </div>

      <van-row class="time">
        <van-col offset="1">{{ data.recommend.time | date }}</van-col>
      </van-row>
      <van-row class="bottom">
        <van-col offset="1" class="photo" span="3">
          <template v-if="!data.user.photo">
            <img src="../assets/timg.jpg" />
          </template>
          <template v-else>
            <img :src="data.user.photo" />
          </template>
        </van-col>
        <van-col span="8" class="username">{{ data.user.username }}</van-col>
        <van-col offset="2" class="like">
          <van-icon name="like-o" />2.1w
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
.recommend {
  margin: 0 0.2rem;
  margin-bottom: 30px;
  width: 46%;
  overflow: hidden;
  text-align: left;
  background-color: white;
  color: black;
  border: 1px solid #f7f8fa;
  border-radius: 0.5rem;
}
.lists_mp4 {
  width: 100%;
  position: relative;
}
.lists_mp4 > .van-row:first-child {
  height: 150px;
  width: 280px;
  overflow: hidden;
  margin: 0 auto;
}
.lists_mp4 .video_container {
  height: 150px;
  width: 280px;
}
.lists_mp4 video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.el-icon-video-play {
  position: absolute;
  top: 25%;
  left: 50%;
  margin-top: -1rem;
  margin-left: -1rem;
  z-index: 100;
  color: #fff;
  opacity: 0.6;
}
.title {
  font-weight: 500;
  padding: 2px 0;
  font-size: 0.8rem;
  /* text-indent: 2em; */
  height: 2.5rem;
}
.content_text {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
.time {
  font-size: 0.8rm;
  color: #ccc;
}
.bottom {
  padding-bottom: 8px;
  display: flex;
  align-items: center;
}

.photo img {
  height: 2rem;
  width: 2rem;
  border: 1px solid #ccc;
  border-radius: 50%;
  object-fit: contain;
}
.username {
  text-align: left;
  margin-left: 10px;
  font-size: 12px;
}
.like {
  font-size: 12px;
}
</style>
