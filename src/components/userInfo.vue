<template>
  <div id="userInfo">
    <van-row>
      <van-nav-bar left-arrow @click-left="goBack" />
    </van-row>
    <van-row class="top">
      <van-col span="8">
        <template v-if="user_info.photo">
          <img :src="user_info.photo" />
        </template>
        <template v-else>
          <img src="../assets/timg.jpg" />
        </template>
      </van-col>
      <van-col>
        <van-row class="username">{{ user_info.username }}</van-row>
        <van-row class="faninfo">{{ myRecommend.length }}视频 {{ myCookbook.length }}菜谱</van-row>
        <van-row class="time">{{ user_info.registrationTime | alldate }}加入</van-row>
        <van-row>
          <van-button
            type="danger"
            size="small"
            class="edit_btn"
            @click="editUser(user_info.id)"
          >编辑资料</van-button>
        </van-row>
      </van-col>
    </van-row>
    <van-row>
      <van-tabs @click="onClick">
        <van-tab title="视频">
          <el-row v-if="myRecommend.length == 0">
            <h4>没有发现我的视频，发去发布吧！</h4>
          </el-row>
          <el-row class="myrow">
            <el-col
              class="block_com"
              :span="11"
              v-for="(item, index) in myRecommend"
              :key="index"
              :offset="index % 2 == 0 ? 0 : 2"
            >
              <el-card :body-style="[ {padding: '0px'} ]">
                <div class="video_container">
                  <video class="image mp4" @click="goShow(item.id)">
                    <source :src="item.resource" />
                  </video>
                  <i class="el-icon-video-play" style="fontSize:2rem"></i>
                </div>
                <div style="padding: 14px;height:40px">
                  <span class="text_ellipsis video_title">{{ item.title }}</span>
                  <div class="bottom clearfix">
                    <el-button
                      type="text"
                      class="button"
                      @click="updateOneRecommendHandle(item.id)"
                    >修改</el-button>
                    <time class="time">{{ item.time | date }}</time>
                    <el-button
                      type="text"
                      class="button"
                      @click="delteOneRecommendHandle(item.id)"
                    >删除</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </van-tab>
        <van-tab title="菜谱">
          <el-row v-if="myCookbook.length == 0">
            <h4>没有发现我的菜谱，发去发布吧！</h4>
          </el-row>
          <el-row :gutter="20" class="myrow" style>
            <el-col :span="12" v-for="(item, index) in myCookbook" :key="index" class="mycol">
              <el-card :body-style="{ padding: '0px' }">
                <div class="cp_img">
                  <img
                    :src="item.image"
                    v-if="item.image"
                    class="image"
                    @click="goPractice(item.id)"
                  />
                  <img src="../assets/timg.jpg" v-else class="image" @click="goPractice(item.id)" />
                </div>
                <div style="padding: 14px;">
                  <span>{{ item.name }}</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="updateCookbookHandle(item.id)">修改</el-button>

                    <time class="time text_ellipsis">{{ item.detail }}</time>
                    <el-button type="text" class="button" @click="delteCookbookHandle(item.id)">删除</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </van-tab>
      </van-tabs>
    </van-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 2,

      data: {}
    };
  },
  computed: {
    ...mapState("user", ["user_info"]),
    ...mapState("recommend", ["myRecommend"]),
    ...mapState("cookbook", ["myCookbook"])
  },
  methods: {
    ...mapActions("user", ["findUserById"]),
    ...mapActions("recommend", [
      "findMyRecommend",
      "deleteMyRecommend",
      "deleteMyOneRecommend"
    ]),
    ...mapActions("cookbook", ["findMyCookbook", "deleteMyCookbook"]),
    goBack() {
      this.$router.go(-1);
    },
    editUser(id) {
      this.$router.push({ path: "/editUser", query: { id } });
    },
    onClick(name, title) {
      Toast(title);
    },
    //修改视频
    updateOneRecommendHandle(id) {
      this.$router.push({ path: "uploadVideo", query: { Recomend_id: id } });
    },
    //修改菜谱
    updateCookbookHandle(id) {
      this.$router.push({ path: "writeCookbook", query: { Cook_id: id } });
    },
    //删除视频
    async delteOneRecommendHandle(id) {
      await this.deleteMyOneRecommend(id);
      this.findMyRecommend(this.user_info.id);
    },
    //删除菜谱
    async delteCookbookHandle(id) {
      console.log(id, "+++");
      await this.deleteMyCookbook(id);
      this.findMyCookbook(this.user_info.id);
    },
    //跳到步骤表钟取
    goPractice(id) {
      console.log("goPractice");
      this.$router.push({ path: "practice", query: { id: id } });
    },
    //跳到播放视频中
    goShow(id) {
      this.$router.push({ path: "videoPlay", query: { id: id } });
    }
  },
  created() {
    this.findUserById();
    //查找我的视频
    this.findMyRecommend(this.user_info.id);
    //查找我的菜谱
    this.findMyCookbook(this.user_info.id);
  }
};
</script>
<style scoped>
#userInfo {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: white;
  z-index: 101;
}

.top img {
  border: 1px solid red;
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 50%;
}
.username {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  margin-left: 0;
  color: #c93756;
}
.faninfo {
  font-size: 1rem;
  text-align: left;
  margin-bottom: 0.5rem;
  color: #c93756;
}
.time {
  font-size: 13px;
  max-height: 0.9rem;
  /* text-indent: 2em; */
  color: #999;
  flex: 4;
}
.edit_btn {
  margin-top: 0.3rem;
  margin-bottom: 1rem;
}
.bottom {
  margin-top: 13px;
  line-height: 15px;
  display: flex;
  justify-content: flex-start;
}

.mycart {
  margin-bottom: 1rem;
}
.myrow {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.mycol {
  padding-bottom: 10px;
}
.button {
  padding: 0;
  float: right;
  flex: 1;
}
.video_container {
  position: relative;
}
.el-icon-video-play {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1rem;
  margin-left: -1rem;
  z-index: 100;
  color: #fff;
  opacity: 0.6;
}
.image {
  /* height: 10rem; */
  width: 100%;
  display: block;
}
.mp4 {
  height: 8rem;
  /* overflow: hidden; */
}
.cp_img {
  height: 150px;
}
.cp_img > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-card {
  margin-top: 1px;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
.video_title {
  font-size: 0.8rem;
}
.block_com {
  border: 1px solid white;
  margin-bottom: 20px;
}
</style>
