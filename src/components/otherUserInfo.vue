<template>
  <div class="userInfo">
    <van-row>
      <van-nav-bar left-arrow @click-left="goBack" />
    </van-row>
    <!-- {{ user_info }} -->
    <!-- {{otherInfo}} -->
    <van-row class="top">
      <van-col span="8">
        <template v-if="otherInfo[0].photo">
          <img :src="otherInfo[0].photo" />
        </template>
        <template v-else>
          <img src="../assets/timg.jpg" />
        </template>
      </van-col>
      <van-col>
        <van-row class="username">{{ otherInfo[0].username }}</van-row>
        <van-row class="faninfo">{{ myRecommend.length }}视频 {{ cookbook.length }}菜谱</van-row>
        <van-row class="time">{{ otherInfo[0].registrationTime | alldate }}加入</van-row>
        <van-row>
          <!-- {{this.$route.query.cancel}}{{this.$route.query.id}} -->
          <!-- 如果从我的收藏处进来的，携带cancel:true路由参数，此处渲染取消关注按钮 -->
          <van-button
            v-if="!alreadyAttention"
            type="danger"
            size="small"
            class="edit_btn"
            @click="cancelAttentionHandle"
          >取消关注</van-button>
          <!-- alreadyAttention为true时可以关注，为false时不可以关注 -->
          <van-button v-else type="danger" size="small" class="edit_btn" @click="addAttention">关注</van-button>
        </van-row>
      </van-col>
    </van-row>
    <van-row>
      <van-tabs @click="onClick">
        <van-tab title="视频">
          <el-row v-if="myRecommend.length == 0">
            <h4>没有发现Ta的的视频！</h4>
          </el-row>
          <el-row>
            <!-- {{myRecommend}} -->
            <el-col
              :span="11"
              v-for="(item, index) in myRecommend"
              :key="index"
              :offset="index % 2 == 0 ? 0 : 2"
            >
              <el-card :body-style="{ padding: '0px' }">
                <div class="video_container">
                  <video class="image" @click="goShow(item.id)">
                    <source :src="item.resource" />
                  </video>
                  <i class="el-icon-video-play" style="fontSize:2rem"></i>
                </div>
                <div style="padding: 14px;height:50px">
                  <span class="text_ellipsis">{{ item.title }}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.time | date }}</time>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </van-tab>
        <van-tab title="菜谱">
          <el-row v-if="cookbook.length == 0">
            <h4>没有发现Ta的菜谱！</h4>
          </el-row>
          <el-row :gutter="20" class="myrow">
            <!-- {{myCookbook}} -->
            <el-col :span="11" v-for="(item, index) in cookbook" :key="index">
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

                <div style="padding: 12px;height:40px">
                  <span>{{ item.name }}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.detail }}</time>
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
    ...mapState("user", ["user_info", "otherInfo", "loginStatus"]),
    ...mapState("recommend", ["myRecommend"]),
    ...mapState("cookbook", ["cookbook"]),
    ...mapState("attention", ["alreadyAttention"])
  },
  methods: {
    ...mapActions("user", ["findUserById", "getUserById", "isLogin"]),
    ...mapActions("recommend", ["findMyRecommend", "deleteMyRecommend"]),
    ...mapActions("cookbook", ["findCookbookById", "deleteMyCookbook"]),
    ...mapActions("attention", [
      "findIsAttention",
      "saveAttention",
      "cancelAttention"
    ]),

    goBack() {
      this.$router.go(-1);
    },
    editUser(id) {
      this.$router.push({ path: "/editUser", query: { id } });
    },
    onClick(name, title) {
      Toast(title);
    },
    //取消关注
    cancelAttentionHandle() {
      console.log("取消关注");
      this.cancelAttention(this.$route.query.id);
      //把按钮变为关注,刷新是否关注过的函数
      this.findIsAttentionHandle();
    },
    //想要关注来自搜索结果的用户
    //判断搜索结果处的用户是否已经关注过
    findIsAttentionHandle() {
      let fans_id = this.otherInfo[0].id;
      this.findIsAttention(fans_id);
    },
    //开始关注该用户
    async addAttention() {
      // console.log("需要关注用户的id", id);
      await this.isLogin();
      if (this.loginStatus) {
        this.saveAttention(this.$route.query.id);
        this.$message({
          showClose: true,
          message: "关注成功！",
          type: "success"
        });
        //刷新以下
        this.findIsAttentionHandle();
      } else {
        Toast("请先登录，再关注！");
      }
    },
    //删除视频
    delteHandle() {
      this.deleteMyRecommend();
    },
    //删除菜谱
    delteCookbookHandle(id) {
      console.log(id, "+++");
      this.deleteMyCookbook(id);
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
  updated() {
    //判断搜索结果处的用户是否已经关注
    this.findIsAttentionHandle();
  },
  created() {
    this.findUserById();
    this.getUserById(this.$route.query.id);
    //查找我的视频
    this.findMyRecommend(this.$route.query.id);
    //查找我的菜谱
    this.findCookbookById(this.$route.query.id);
    console.log("this.$route.query.id:", this.$route.query.id);
  }
};
</script>
<style scoped>
.userInfo {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: white;
  z-index: 100;
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
  color: #999;
  flex: 4;
}
.edit_btn {
  margin-top: 0.3rem;
  margin-bottom: 1rem;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: flex-start;
}

.mycart {
  margin-bottom: 1rem;
}

.button {
  padding: 0;
  float: right;
  flex: 1;
}

.image {
  /* height: 10rem; */
  width: 100%;
  display: block;
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
  margin-bottom: 22px;
  font-size: 0.8rem;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
</style>
