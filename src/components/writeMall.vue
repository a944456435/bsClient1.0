<template>
  <div class="uploadVideo">
    <van-row class="top">
      <van-nav-bar left-arrow @click-left="goBack" title="发布商品"></van-nav-bar>
      <el-upload
        class="upload-demo"
        ref="upload"
        drag
        multiple
        :limit="5"
        name="files"
        :on-success="uploadHandler"
        :on-error="errorUpload"
        action="http://101.132.112.10:3000/upload/uploadImgs"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过10M</div> -->
      </el-upload>
    </van-row>
    <van-row class="form_container">
      <el-form ref="form" :model="form" label-width="55px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="芒果"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.descript" placeholder="饱满多汁"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" placeholder="12"></el-input>
        </el-form-item>
        <el-form-item label="划线价">
          <el-input v-model="form.original_price" placeholder="15"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" placeholder="/斤"></el-input>
        </el-form-item>
      </el-form>
    </van-row>

    <van-row class="video">
      <van-button type="primary" @click="toAddMall">发布商品</van-button>
    </van-row>
  </div>
</template>
<script>
import { Field, Toast } from "vant";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      videoURL: [], //视频上传地址
      form: {}, //表单，要发布的商品信息
      imgArr: [] //上传成功的多图片url数组
    };
  },
  computed: {
    ...mapState("mall", ["oneMall"])
  },
  methods: {
    ...mapActions("mall", ["saveOrUpdateMall", "getMallById"]),
    goBack() {
      this.$router.go(-1);
    },
    uploadHandler(file, fileList) {
      this.videoURL = file.data[0].url;
      console.log("上传成功的视频地址", this.videoURL);
      this.imgArr.push(this.videoURL[0]);
      //   var _this = this;
      //   setTimeout(function() {
      //     _this.$refs.upload.clearFiles();
      //     Toast("清空列表！");
      //   }, 1000);
    },
    //上传文件限制
    // beforeAvatarUpload(file) {
    //   const isMP4 = file.type === "video/mp4";
    //   const isLt10M = file.size / 1024 / 1024 < 30;

    //   if (!isMP4) {
    //     Toast("上传文件只能是 MP4 格式!");
    //   }
    //   if (!isLt10M) {
    //     Toast("上传文件大小不能超过 30MB!");
    //   }
    //   return isMP4 && isLt10M;
    // },
    errorUpload() {
      Toast("上传文件失败!");
    },
    toAddMall() {
      var time = new Date().valueOf();
      this.form.time = time;
      // 把上传成功的图片数组，组合为ur1;url2的字符串形式
      let str = "";
      for (let i = 0; i < this.imgArr.length; i++) {
        str += this.imgArr[i] + ";";
        if ((i = this.imgArr.length - 1)) {
          str += this.imgArr[i];
        }
      }
      this.form.images = str;
      console.log("拼接的url", str);
      console.log("信息", this.form);
      this.saveOrUpdateMall(this.form);
      this.$toast("食材发布成功！");
      //成功后返回首页
      this.$router.push("/push");
    }
  },
  created() {
    //从修改按钮处过来
    if (this.$route.query.id) {
      this.getMallById(this.$route.query.id);
      this.form = this.oneMall;
    }
  }
};
</script>
<style scoped>
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
.form_container {
  margin: 1rem 0.6rem;
}
</style>
