<template>
  <div class="uploadVideo">
    <van-row class="top">
      <van-nav-bar left-arrow @click-left="goBack" title="发布视频"></van-nav-bar>
      <el-upload
        class="upload-demo"
        ref="upload"
        drag
        :limit="1"
        name="fileimg"
        :on-success="uploadHandler"
        :on-error="errorUpload"
        :before-upload="beforeAvatarUpload"
        action="/api/upload/uploadImg"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过10M</div>
      </el-upload>
    </van-row>

    <van-row class="text">请输入视频标题</van-row>
    <van-row>
      <van-cell-group>
        <van-field v-model="text" placeholder="请输入标题" />
      </van-cell-group>
    </van-row>
    <van-row class="video">
      <van-button type="primary" @click="toAddRecomend">发布视频</van-button>
    </van-row>
  </div>
</template>
<script>
import { Field, Toast } from "vant";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      videoURL: [], //视频上传地址
      text: "糖醋里脊" //视频标题文字
    };
  },
  methods: {
    ...mapActions("recommend", ["saveOrUpdateRecommend"]),
    goBack() {
      this.$router.go(-1);
    },
    uploadHandler(file, fileList) {
      this.videoURL = file.data[0].url;
      console.log("上传成功的视频地址", this.videoURL);
      //清空视频
      var _this = this;
      setTimeout(function() {
        _this.$refs.upload.clearFiles();
        Toast("清空列表！");
      }, 1000);
    },
    //上传文件限制
    beforeAvatarUpload(file) {
      const isMP4 = file.type === "video/mp4";
      const isLt10M = file.size / 1024 / 1024 < 30;

      if (!isMP4) {
        Toast("上传文件只能是 MP4 格式!");
      }
      if (!isLt10M) {
        Toast("上传文件大小不能超过 30MB!");
      }
      return isMP4 && isLt10M;
    },
    errorUpload() {
      Toast("上传文件失败!");
    },
    //在recomend表中添加推荐视频
    toAddRecomend() {
      var time = new Date().valueOf();
      let payload = {
        title: this.text,
        resource: this.videoURL,
        time
      };
      console.log("往resommend里添加的视频信息", payload);
      this.saveOrUpdateRecommend(payload);
      //成功后返回首页
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
/* .top > .van-nav-bar {
  background-color: white;
} */
.uploadVideo {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  margin: auto;
  background-color: white;
  z-index: 100;
}
.uploadVideo .text {
  text-align: left;
  margin-top: 1rem;
  margin-left: 1rem;
}
.uploadVideo .video {
  margin-top: 5rem;
}
</style>
