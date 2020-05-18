<template>
  <div class="showDetailed">
    <div v-if="video_info">
      <van-row>
        <van-nav-bar left-arrow @click-left="goBack" />
      </van-row>

      <div class="video" v-if="video_info.recommend">
        <!-- controls autoplay -->

        <video ref="video" autoplay @timeupdate="timeupdate" :src="video_info.recommend.resource">
          <!-- <source type="video/mp4" /> -->
        </video>
      </div>

      <!-- 暂停播放按钮图片 -->
      <div class="play_btn" ref="play_btn" @click="playVideo">
        <img src="../assets/play.png" v-show="isVisible" />
      </div>
      <div class="username">@{{ video_info.user.username }}</div>
      <div class="title">{{ video_info.recommend.title }}</div>
      <div class="tip">精彩评论会被优先展示</div>
      <div class="progressBar">
        <van-progress color="#ee0a24" :percentage="curtime" stroke-width="2" pivot-text />
      </div>
      <!-- 查询是否收藏了{{curUserFavoriteLen}} -->
      <template v-if="!video_info.user.photo">
        <img src="../assets/timg.jpg" class="photo" />
      </template>
      <template v-else>
        <img :src="video_info.user.photo" class="photo" />
      </template>
      <!-- 点击关注用户的‘+’号 -->
      <div v-if="alreadyAttention" class="addAttention" @click="addAttention(video_info.user.id)">
        <van-icon name="plus" size="16" />
      </div>
      <van-row class="rightIcon">
        <!-- 点击收藏 -->
        <div class="attention" @click="switchFavorite">
          <template v-if="favoriteStatu">
            <img src="../assets/like-1.png" />
          </template>
          <template v-else>
            <img src="../assets/like-0.png" />
          </template>
        </div>
        <div class="commont">
          <van-icon name="more" size="40" @click="showCommont(video_info.recommend.id)" />
        </div>
        <div class="commontNum">{{commentByRecomendId.length||'0'}}</div>
      </van-row>

      <!-- 评论面板 -->
      <van-row>
        <van-action-sheet v-model="isShow" title="全部评论" class="commontPeal">
          <div class="content">
            <van-row v-if="commentByRecomendId.length==0">
              <h4>暂时无评论！</h4>
            </van-row>
            <van-row
              v-for="item in commentByRecomendId"
              :key="item.comment.id"
              class="commontBlock"
            >
              <van-col span="5">
                <div class="commontPhoto">
                  <img src="../assets/timg.jpg" />
                </div>
              </van-col>
              <van-col class="info">
                <van-row>{{item.user.username}}</van-row>
                <van-row>{{item.comment.content}}</van-row>
                <van-row>{{item.comment.time|date}}</van-row>
              </van-col>
            </van-row>
            <van-row class="commentInput">
              <van-cell-group>
                <van-field v-model="mycomment" placeholder="快发表你的看法吧！" />
              </van-cell-group>
              <van-button round class="emit" @click="emit">发送</van-button>
            </van-row>
          </div>
        </van-action-sheet>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Toast } from "vant";

export default {
  data() {
    return {
      isVisible: false,
      curtime: 0, //当前视频播放时间,初始为0
      isShow: false, //是否显示评论面板
      mycomment: "" //我的评论
      // isFavorite: false, //当前是否被收藏
      // isAttention: true //关注按钮是否显示
    };
  },
  computed: {
    ...mapState("videoPlay", ["video_info"]),
    ...mapState("comment", ["commentByRecomendId"]),
    ...mapState("user", ["loginStatus"]),
    ...mapState("favorite", ["curUserFavoriteLen", "favoriteStatu"]),
    ...mapState("attention", ["alreadyAttention"])
  },
  methods: {
    ...mapActions("videoPlay", ["videoInfoById"]),
    ...mapActions("comment", ["findByRecommendId", "saveComment"]),
    ...mapActions("user", ["isLogin"]),
    ...mapActions("favorite", [
      "saveFavorite",
      "findIsFavorite",
      "cancelFavorite"
    ]),
    ...mapActions("attention", ["saveAttention", "findIsAttention"]),
    goBack() {
      this.$router.go(-1);
    },

    //视频播放与暂停
    playVideo() {
      let video = this.$refs.video;
      if (video.paused) {
        video.play();
        console.log("当前播放时间：", video.currentTime);
        this.isVisible = false;
      } else {
        video.pause();
        this.isVisible = true;
        console.log("当前播放时间：", video.currentTime);
      }
    },
    //监听视频当前位置
    timeupdate(e) {
      //获取当前视频的总时长，计算当前视频播放位置的百分比
      let duration = this.$refs.video.duration;
      // this.$nextTick(() => {
      this.curtime = (e.target.currentTime / duration) * 100;
      // });
    },
    //判断当前用户是否已经关注过
    findIsAttentionHandle() {
      let fans_id = this.video_info.user.id;
      this.findIsAttention(fans_id);
    },
    //店家关注该用户
    async addAttention(id) {
      await this.isLogin();
      if (this.loginStatus) {
        this.saveAttention(id);
        Toast("关注成功！");
        //刷新以下
        this.findIsAttentionHandle();
      } else {
        Toast("请先登录，再关注！");
      }
    },
    //判断当前登陆的用户是否已经收藏过
    isFavoriteHandle() {
      let recommend_id = this.$route.query.id;
      let payload = { recommend_id };
      this.findIsFavorite(payload);
    },
    //点击收藏
    async switchFavorite() {
      await this.isLogin();
      if (this.loginStatus) {
        //判断当前的状态是否已经收藏，若没有收藏则添加收藏，若已经收藏则删除收藏记录 favoriteStatu判断

        if (this.favoriteStatu) {
          //已经收藏了，可以去取消收藏
          let recommend_id = this.$route.query.id;
          let payload = { recommend_id };

          Toast("取消收藏成功！");

          this.cancelFavorite(payload);
        } else {
          //还没收藏，可以去收藏
          let recommend_id = this.$route.query.id;
          let time = new Date().valueOf();
          let payload = { recommend_id, time };
          console.log("payload", payload);
          this.saveFavorite(payload);
          // this.isFavorite = true;
          Toast("收藏成功！");
        }
        //收藏还是取消，之后都要刷新以下
        this.isFavoriteHandle();
      } else {
        Toast("请先登录，再收藏！");
      }
    },
    //查看评论
    showCommont(id) {
      console.log("id---", id);
      //查找评论
      // this.findByRecommendId(id);
      this.isShow = true;
    },
    //发表评论
    async emit() {
      console.log("emit");
      //先判断是否登陆
      await this.isLogin();
      if (this.loginStatus) {
        //拿到当前视频的id或者当前菜谱的id，加上评论内容,时间
        let recommend_id = this.$route.query.id;
        let content = this.mycomment.trim();
        let time = new Date().valueOf();
        let payload = { recommend_id, content, time };
        console.log("payload", payload);
        this.saveComment(payload);
        Toast("评论成功！");
        this.mycomment = "";
        //刷新评论
        this.findByRecommendId(this.$route.query.id);
      } else {
        Toast("请先登录，再来评论！");
      }
    }
  },
  mounted() {
    //可是区域高度
    // var clientHeight = document.getElementById("showDetailed").clientHeight;
    // this.$refs.showDetailed.style.height = clientHeight + "px";
    // this.$refs.video.style.height = 0.8 * clientHeight + "px";
  },
  mounted() {
    //判断当前用户是否已经关注
    // this.findIsAttentionHandle();
  },
  updated() {
    //判断当前用户是否已经关注
    this.findIsAttentionHandle();
  },
  created() {
    this.videoInfoById(this.$route.query.id);
    this.findByRecommendId(this.$route.query.id);
    //判断当前用户是否已经收藏
    this.isFavoriteHandle();
    //判断当前用户是否已经关注
    // this.findIsAttentionHandle();
  }
};
</script>

<style scoped>
.showDetailed {
  /* width: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 100;
  color: white;
}
.van-nav-bar {
  background-color: black;
  color: white;
  height: 55px;
}
.video {
  margin: 200px 0;
  /* display: flex; */
  /* align-items: center; */
}
.video > video {
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
}
.play_btn {
  /* border: 1px solid red; */
  width: 100%;
  height: 77%;
  position: absolute;
  top: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.username {
  position: absolute;
  left: 2rem;
  bottom: 148px;
  font-size: 1.2rem;
}
.title {
  margin-left: 10px;
  font-size: 1rem;
  font-weight: 300;
  position: absolute;
  left: 2rem;
  bottom: 100px;
  width: 50%;
  text-align: left;
}
.tip {
  position: absolute;
  left: 30px;
  bottom: 60px;
}
.progressBar {
  /* border: 1px solid red; */
  position: absolute;
  width: 100%;
  bottom: 20px;
}
.van-field {
  background-color: #000;
  margin-top: 0.2rem;
}
.photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  right: 28px;
  bottom: 250px;
  overflow: hidden;
  border: 1px solid white;
}
.addAttention {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  right: 2.3rem;
  bottom: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.attention {
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  right: 30px;
  bottom: 170px;
  background-color: #000;
  overflow: hidden;
}
.attention > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
/* .conversion {
  position: absolute;
  right: 30px;
  bottom: 170px;
} */
.commont {
  position: absolute;
  right: 30px;
  bottom: 80px;
}
.commontNum {
  position: absolute;
  right: 42px;
  bottom: 60px;
  font-size: 1rem;
}

.commontPeal {
  height: 35rem;
}
.commontBlock {
  margin-bottom: 1rem;
}
.commontPhoto {
  margin-left: 0.2rem;
  width: 3rem;
  height: 3rem;
  /* overflow: hidden; */
  border: 1px solid #ccc;
  border-radius: 50%;
}
.commontPhoto > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.commontPeal .info {
  font-size: 0.8rem;
  text-align: left;
}
.commontPeal .info > .van-row:nth-child(1) {
  font-size: 0.9rem;
  color: #ccc;
}
.commontPeal .info > .van-row:nth-child(2) {
  font-size: 0.8rem;
  padding: 0.2rem;
}
.commontPeal .info > .van-row:nth-child(3) {
  font-size: 0.8rem;
  color: #ccc;
}
.van-field {
  background-color: #ccc;
  border-radius: 1rem;
}
.commentInput {
  z-index: 100;
  left: 0;
  right: 0;
  position: absolute;
  bottom: 0.2rem;
}
.emit {
  z-index: 100;
  font-size: 0.8rem;
  width: 4rem;
  height: 2.3rem;
  border-radius: 1.2rem;
  right: 0;
  position: absolute;
  bottom: 0.2rem;
}
</style>
