<template>
  <div id="practice">
    <van-row class="top">
      <van-nav-bar left-arrow @click-left="goBack" title="菜谱详情"></van-nav-bar>
    </van-row>
    <van-row>
      <h4>效果图</h4>
    </van-row>
    <van-row v-if="!tempImg" class="xgt">
      <van-image width="100%" height="300" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </van-row>
    <van-row class="xgt" v-else>
      <van-image width="100%" height="300" :src="tempImg" />
    </van-row>
    <van-row class="name" v-if="cookbook[0]">
      <h1>{{ cookbook[0].name }}</h1>
    </van-row>
    <van-row class="detail" v-if="cookbook[0]">
      <van-col>{{ cookbook[0].detail }}</van-col>
    </van-row>
    <van-row @click="showUserInfo(otherInfo[0].id)" v-if="otherInfo[0]">
      <van-col :span="5">
        <el-avatar :size="50" :src="otherInfo[0].photo"></el-avatar>
      </van-col>
      <van-col :span="14">
        <van-row class="user_name">{{otherInfo[0].username}}</van-row>
        <van-row class="desc">简介:{{otherInfo[0].description}}</van-row>
      </van-col>
      <van-col>
        <van-button
          v-if="alreadyAttention"
          type="primary"
          size="mini"
          @click="addAttention(otherInfo[0].id)"
        >关注</van-button>
        <van-button
          v-else
          type="primary"
          size="mini"
          @click.stop="addAttention(otherInfo[0].id)"
        >已关注</van-button>
      </van-col>
    </van-row>
    <h3>用料表</h3>

    <template v-if="ingredients.lenght != 0">
      <van-row v-for="item in ingredients" :key="item.id" class="yb">
        <van-col span="12">{{ item.name }}</van-col>
        <van-col span="12">{{ item.number }}</van-col>
      </van-row>
    </template>

    <h3>做法表</h3>
    <template v-if="cookStep.length == 0">
      <h5>详情做法，敬请期待！！</h5>
    </template>
    <!-- 具体做法如下 -->
    <template>
      <div v-for="(item,index) in cookStep" :key="index" class="step">
        <p>
          <i>{{ item.step }}.</i>
          {{ item.text }}
        </p>
        <img :src="item.images" />
      </div>
    </template>
    <!-- 底部固定栏 -->
    <van-row class="bottom">
      <van-col span="8" class="favorite" @click="switchFavorite">
        <template v-if="favoriteStatu">
          <van-icon name="good-job" />有用
        </template>
        <template v-else>
          <van-icon name="good-job-o" />有用
        </template>
      </van-col>
      <van-col span="8" @click="showCommont">
        <van-icon name="chat" :badge="commentByCookbookId.length || '0'" />讨论区
      </van-col>
      <van-col span="8" @click="goWriteCookbook">
        <van-icon name="bookmark" />晒作品
      </van-col>
    </van-row>
    <!-- 评论面板 -->
    <van-row>
      <van-action-sheet v-model="isShow" title="全部评论" class="commontPeal">
        <div class="content">
          <!-- 内容 {{commentByCookbookId}} -->
          <van-row v-if="commentByCookbookId.length == 0">
            <h4>暂时无评论！</h4>
          </van-row>

          <van-row v-for="(item,index) in commentByCookbookId" :key="index" class="commontBlock">
            <van-col span="5">
              <div class="commontPhoto" v-if="item.user.photo">
                <img :src="item.user.photo" />
              </div>
              <div class="commontPhoto" v-else>
                <img src="../assets/timg.jpg" />
              </div>
            </van-col>
            <van-col class="info" :span="16">
              <van-row>{{ item.user.username }}</van-row>
              <van-row>{{ item.comment.content }}</van-row>
              <van-row>{{ item.comment.time|date }}</van-row>
            </van-col>
            <van-col>
              <van-icon name="like" />
            </van-col>
          </van-row>
          <!-- 发表新评论 -->
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
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Toast } from "vant";

export default {
  data() {
    return {
      tempImg: "", //展示在顶部的图片
      isShow: false, //评论是否可见
      mycomment: "" //我的评论
    };
  },
  computed: {
    ...mapState("practice", ["cookStep"]),
    ...mapState("ingredients", ["ingredients"]),
    ...mapState("comment", ["commentByCookbookId"]),
    ...mapState("user", ["loginStatus", "otherInfo"]),
    ...mapState("favorite", ["favoriteStatu"]),
    ...mapState("cookbook", ["cookbook"]),
    ...mapState("attention", ["alreadyAttention"])
  },
  methods: {
    ...mapActions("practice", ["showCookStep"]),
    ...mapActions("ingredients", ["getIngredients"]),
    ...mapActions("comment", ["findByCookbookId", "saveComment"]),
    ...mapActions("user", ["isLogin", "getUserById"]),
    ...mapActions("cookbook", ["findCookbookById"]),
    ...mapActions("favorite", [
      "findIsFavorite",
      "cancelFavorite",
      "saveFavorite"
    ]),
    ...mapActions("attention", ["findIsAttention", "saveAttention"]),

    goBack() {
      this.$router.go(-1);
    },
    //得到最后一张当成品图展示到顶部
    showImg() {
      this.tempImg = "";
      let _this = this;
      this.cookStep.lenght != 0 &&
        this.cookStep.forEach((item, index) => {
          if (item.images) {
            _this.tempImg = item.images;
          }
        });
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
    //判断当前用户是否已经关注过
    findIsAttentionHandle() {
      let fans_id = this.otherInfo[0].id;
      this.findIsAttention(fans_id);
    },
    //开始关注该用户
    async addAttention(id) {
      console.log("需要关注用户的id", id);
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
    //判断当前用户是否已经收藏该菜谱
    //判断当前登陆的用户是否已经收藏过
    isFavoriteHandle() {
      let cook_id = this.$route.query.id;
      let payload = { cook_id };
      this.findIsFavorite(payload);
    },
    //点击收藏，进行收藏或取消收藏操作
    async switchFavorite() {
      await this.isLogin();
      if (this.loginStatus) {
        //判断当前的状态是否已经收藏，若没有收藏则添加收藏，若已经收藏则删除收藏记录 favoriteStatu判断

        if (this.favoriteStatu) {
          //已经收藏了，可以去取消收藏
          let cook_id = this.$route.query.id;
          let payload = { cook_id };

          Toast("取消收藏成功！");

          this.cancelFavorite(payload);
        } else {
          //还没收藏，可以去收藏
          let cook_id = this.$route.query.id;
          let time = new Date().valueOf();
          let payload = { cook_id, time };
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
    showCommont() {
      this.isShow = true;
      console.log("this.$route.query.id", this.$route.query.id);
      //查找评论
      // this.findByCookbookId(this.$route.query.id);
    },
    //发表评论
    async emit() {
      console.log("emit");
      //先判断是否登陆
      await this.isLogin();
      if (this.loginStatus) {
        //拿到当前视频的id或者当前菜谱的id，加上评论内容,时间
        let cook_id = this.$route.query.id;
        let content = this.mycomment.trim();
        let time = new Date().valueOf();
        let payload = { cook_id, content, time };
        console.log("payload", payload);
        this.saveComment(payload);
        Toast("评论成功！");
        this.mycomment = "";
        //刷新评论
        this.findByCookbookId(this.$route.query.id);
      } else {
        Toast("请先登录，再来评论！");
      }
    },
    //跳转到写菜谱页
    goWriteCookbook() {
      this.$router.push("/writecookbook");
    }
  },
  updated() {
    //判断当前用户是否已经关注
    this.findIsAttentionHandle();
  },
  created() {
    //得到做法步骤
    this.showCookStep(this.$route.query.id).then(() => {
      this.showImg();
    });
    //得到用料
    this.getIngredients(this.$route.query.id);
    // this.showImg();
    //查找评论
    this.findByCookbookId(this.$route.query.id);
    //初始化判断当前用户是否已经收藏该菜谱
    this.isFavoriteHandle();
    //查找当前的菜谱信息，然后再查找该菜谱的用户
    this.findCookbookById(this.$route.query.id).then(() => {
      this.getUserById(this.cookbook[0].user_id || "");
    });
  }
};
</script>
<style scoped>
#practice .top {
  position: fixed;
  top: 0;
  height: 50px;
  width: 100%;
  z-index: 20;
  background-color: white;
}
#practice > .van-row:nth-child(2) {
  margin-top: 50px;
}
#practice .yb:nth-child(1) {
  border-top: 1px solid #ccc;
}
#practice .xgt:hover {
  transform: scale(1.2);
}
.name {
  text-indent: 2em;
}
.name h1 {
  /* font-weight: 800; */
  font-size: 1.5rem;
  text-align: left;
  margin: 0;
  padding: 0;
}
.detail {
  font-size: 0.9rem;
  text-align: left;
  text-indent: 2em;
  margin: 0.5rem 1.5rem;
}
.user_name {
  text-align: left;
}
.desc {
  text-align: left;
  color: #ccc;
  font-size: 0.9rem;
}
#practice .yb {
  width: 90%;
  margin: 0 auto;
  height: 1.8rem;
  line-height: 1.8rem;
  border-bottom: 1px solid #ccc;
}
#practice .step {
  margin: 0 0.8rem;
}
#practice .step img {
  max-width: 100%;
  height: auto;
}
#practice .bottom {
  border-top: 1px solid #ccc;
  box-shadow: 0.5px 0.5px 0.4px #ccc;
  font-size: 0.9rem;
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 100;
  padding-bottom: 0;
}
.commont {
  position: absolute;
  right: 30px;
  bottom: 70px;
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
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 50%;
}
.commontPhoto > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
