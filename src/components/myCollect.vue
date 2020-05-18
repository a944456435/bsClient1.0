<template>
  <div id="mycollect">
    <van-nav-bar left-arrow @click-left="goBack"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="我的关注">
        <!-- {{ attentionList }} -->
        <template v-if="attentionList.length == 0">
          <h4>暂时没有发现关注的人，快去关注吧！</h4>
        </template>

        <van-row
          class="top"
          v-for="item in attentionList"
          :key="item.id"
          @click="showUserInfo(item.id)"
        >
          <van-col span="8">
            <template v-if="item.photo">
              <img :src="item.photo" />
            </template>
            <template v-else>
              <img src="../assets/timg.jpg" />
            </template>
          </van-col>
          <van-col>
            <van-row class="username">
              <van-col>{{ item.username }}</van-col>
              <van-col class="btn">
                <van-button type="danger" size="mini" @click="cancelAttentionHandle(item.id)">取消关注</van-button>
              </van-col>
            </van-row>
            <van-row class="faninfo">
              <van-col span="8">{{ item.city }}</van-col>
              <van-col span="5">{{ item.sex }}</van-col>
              <van-col>{{ item.occupation }}</van-col>
            </van-row>
            <van-row class="time">{{ item.registrationTime | date }}</van-row>
            <van-row class="faninfo">个人说明：{{ item.description }}</van-row>
          </van-col>
        </van-row>
      </van-tab>

      <van-tab title="我的收藏">
        <van-sidebar v-model="activeKey" @change="favoriteOnChange">
          <van-sidebar-item title="菜谱" />
          <van-sidebar-item title="推荐" />
        </van-sidebar>
        <div class="content">
          <!-- 菜谱 -->
          <div v-if="activeKey == 0">
            <el-row v-if="myFavoriteCookbook.length == 0">
              <h4>你还没有收藏菜谱，快去添加吧！！</h4>
            </el-row>
            <el-row :gutter="20" class="myrow">
              <!-- {{myFavoriteCookbook}} -->
              <el-col
                class="mycart"
                :span="20"
                v-for="(item, index) in myFavoriteCookbook"
                :key="index"
              >
                <van-row @click="goPractice(item.id)">
                  <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.image" v-if="item.image" class="image" />
                    <img src="../assets/timg.jpg" v-else class="image" />

                    <div style="padding: 14px;">
                      <span class="text_ellipsis">{{ item.name }}</span>
                      <div class="bottom clearfix">
                        <time class="time text_ellipsis">{{ item.detail }}</time>
                        <el-button
                          type="text"
                          class="button"
                          @click="cancelCookbookHandle(item.id)"
                        >删除</el-button>
                      </div>
                    </div>
                  </el-card>
                </van-row>
              </el-col>
            </el-row>
          </div>
          <!--//菜谱  -->
          <!--推荐  -->
          <div v-else>
            <!-- {{myFavoriteRecommend}} -->
            <el-row v-if="myFavoriteRecommend.length == 0">
              <h4>你还没有收藏菜谱，快去添加吧！！</h4>
            </el-row>
            <el-row :gutter="20" class="myrow">
              <!-- {{myFavoriteCookbook}} -->
              <el-col :span="20" v-for="(item, index) in myFavoriteRecommend" :key="index">
                <van-row @click="goShow(item.id)">
                  <el-card :body-style="{ padding: '0px' }">
                    <div class="video_container">
                      <video v-if="item.resource" class="tj_video">
                        <source :src="item.resource" />
                      </video>
                      <i class="el-icon-video-play" style="fontSize:2rem"></i>
                    </div>
                    <div style="padding: 8px;">
                      <span class="collect_title text_ellipsis">{{ item.title }}</span>
                      <div class="bottom clearfix">
                        <time class="time">{{ item.time | date }}</time>
                        <el-button
                          type="text"
                          class="button"
                          @click="cancelRecommendHandle(item.id)"
                        >删除</el-button>
                      </div>
                    </div>
                  </el-card>
                </van-row>
              </el-col>
            </el-row>
          </div>
          <!--//推荐  -->
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0, //顶部的导航索引
      activeKey: 0 //收藏页上下的导航索引
    };
  },
  computed: {
    ...mapState("attention", ["attentionList"]),
    ...mapState("favorite", ["myFavoriteCookbook"]),
    ...mapState("recommend", ["myFavoriteRecommend"]),
    ...mapState("user", ["loginStatus"])
  },
  methods: {
    ...mapActions("attention", ["showAttention", "cancelAttention"]),
    ...mapActions("favorite", ["getMyFavoriteByCookbook"]),
    ...mapActions("recommend", ["getMyFavoriteByRecommend"]),
    ...mapActions("user", ["isLogin"]),
    ...mapActions("favorite", ["cancelFavorite"]),
    favoriteOnChange(index) {
      console.log("切换了状态", index);
    },
    goBack() {
      this.$router.go(-1);
    },
    //进入个人详细信息
    async showUserInfo(id) {
      await this.isLogin();
      if (this.loginStatus) {
        this.$router.push({
          path: "/otherUserInfo",
          query: { id }
        });
      } else {
        this.$router.push("/login");
      }
    },
    //取消关注
    cancelAttentionHandle(id) {
      console.log("取消关注");
      this.cancelAttention(id);
      //重新刷新关注列表
      this.showAttention();
    },
    //删除我的菜谱的收藏
    cancelCookbookHandle(id) {
      let cook_id = id;
      let payload = { cook_id };

      Toast("取消收藏成功！");

      this.cancelFavorite(payload);
      //刷新收藏表
      this.getMyFavoriteByCookbook();
    },
    //删除我的视频的收藏
    cancelRecommendHandle(id) {
      let recommend_id = id;
      let payload = { recommend_id };

      Toast("取消收藏成功！");

      this.cancelFavorite(payload);
      //刷新收藏的视频
      this.getMyFavoriteByRecommend();
    },
    //进入视频播放
    goShow(id) {
      this.$router.push({ path: "videoPlay", query: { id: id } });
    },
    //进入菜谱的步骤详情
    goPractice(id) {
      this.$router.push({ path: "practice", query: { id: id } });
    }
  },
  created() {
    this.showAttention();
    this.active = this.$route.query.id;
    //查找收藏的菜单
    this.getMyFavoriteByCookbook();
    //查找收藏的视频
    this.getMyFavoriteByRecommend();
  }
};
</script>

<style scoped>
#mycollect {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  /* z-index: 100; */
}
.mycard {
  text-align: left;
}
.top {
  background-color: #f2f3f5;
  margin-bottom: 0.8rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}
.top img {
  border: 1px solid red;
  background-color: white;
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 50%;
}
.username {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-left: 0;
}
.faninfo {
  font-size: 0.8rem;
  text-align: left;
  margin-bottom: 0.5rem;
}
.bottom {
  display: flex;
}
.time {
  font-size: 0.9rem;
  padding: 0.2rem;
  text-align: left;
  color: #333;
  flex: 4;
}
.btn {
  position: absolute;
  right: 1rem;
}
.el-col {
  padding-bottom: 1rem;
}

.button {
  padding: 0;
  flex: 1;
}

.image {
  width: 100%;
  /* height: 180px; */
  height: 10rem;
  display: block;
}
.video_container {
  width: 100%;
  height: 150px;
  position: relative;
  /* border: 1px solid red; */
}
.tj_video {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.content {
  position: absolute;
  /* border: 1px solid red; */
  margin-left: 130px;
  top: 55px;
  margin-bottom: 60px;
}
.collect_title {
  font-size: 0.8rem;
  text-align: left;
  text-indent: 2em;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
</style>
