<template>
  <div class="home">
    <div class="top">
      <!-- <van-sticky> -->
      <van-row type="flex" justify="space-between" gutter="18" class="top_icon">
        <van-col span="4">
          <van-icon name="question-o" size="24px" />
        </van-col>
        <van-col span="18">
          <van-search placeholder="请输入搜索关键词" shape="round" input-align="center" @focus="goSearch" />
        </van-col>
        <van-col span="4">
          <van-icon name="plus" size="24px" @click="plus" />
        </van-col>
      </van-row>
      <!-- </van-sticky> -->
      <div class="plusList" v-show="showPlusList">
        <van-row>
          <van-col span="8">
            <van-icon name="records" size="16" />
          </van-col>
          <van-col @click="goWriteCookbook">写菜谱</van-col>
        </van-row>
        <van-row>
          <van-col span="8">
            <van-icon name="description" size="16" />
          </van-col>
          <van-col @click="goUploadVideo">发视频</van-col>
        </van-row>
      </div>
    </div>
    <!-- 接收跳转到搜索页面 -->
    <router-view />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="@/assets/1l.jpeg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/2l.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/3l.jpeg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/x3.jpg" />
      </van-swipe-item>
    </van-swipe>
    <!-- 最新通知 -->
    <van-notice-bar mode="link" class="news">通知内容:疫情期间，积极做好防范措施，佩戴口罩，勤洗手，少聚众。</van-notice-bar>
    <!-- 栏目菜单 -->
    <van-grid>
      <van-grid-item
        :icon="v.icon"
        :text="v.name"
        v-for="v in categorys"
        :key="v.id"
        @click="goCategory(v.id, v.name)"
      />
    </van-grid>

    <!-- 灰色间隙 -->
    <van-row class="grap">
      <van-col span="24"></van-col>
    </van-row>
    <!-- 主体内容 -->
    <van-tabs class="content" swipeable @click="onClick">
      <van-tab v-for="item in nav_links" :title="item" :key="item">
        <div v-if="item == '视频'" class="tj">
          <whq-Recommend :data="i" v-for="i in Recommend" :key="i.id" />
        </div>
        <div v-else-if="item == '菜谱'" class="cp">
          <whq-CookBook :data="i" v-for="i in cookList" :key="i.id" />
        </div>
        <div v-else-if="item == '同城'">
          <whq-SameCity></whq-SameCity>
        </div>
        <div v-else-if="item == '宅家防疫'">宅家防疫</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      nav_links: ["视频", "菜谱", "同城", "宅家防疫"],
      scrArr: [{ id: 1 }, { id: 2 }],
      showPlusList: false,
      tem: "test"
    };
  },
  computed: {
    ...mapState("recommend", ["Recommend"]),
    ...mapState("category", ["categorys"]),
    ...mapState("cookbook", ["cookList"]),
    ...mapState("user", ["loginStatus"])
  },
  methods: {
    ...mapActions("category", ["findAllCategory"]),
    ...mapActions("cookbook", ["allCookbook"]),
    ...mapActions("recommend", ["getRecommend"]),
    ...mapActions("practice", ["showCookStep"]),
    ...mapActions("user", ["isLogin"]),
    //进入到分类页
    goCategory(id, name) {
      this.$router.push({
        path: "category",
        query: { id: id, categoryname: name }
      });
    },
    //查找
    goSearch() {
      this.$router.push({ path: "search" });
    },
    onClick(name, title) {
      Toast(title);
    },
    //点击‘+’号展示
    plus() {
      this.showPlusList = !this.showPlusList;
      console.log(this.showPlusList);
    },
    //跳转到写菜谱页
    async goWriteCookbook() {
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
    }
  },
  created() {
    this.isLogin(); //在登陆后马上检查状态，不用每次登陆后在每个页面都检查一遍
    this.findAllCategory();
    this.getRecommend();
    this.allCookbook();
  }
};
</script>

<style scoped>
.home {
  font-size: 0.8rem;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 0;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item > img {
  background-size: cover;
  background-repeat: repeat-x;
  width: 100%;
  height: 300px;
}
.home {
  overflow-x: hidden;
  padding-bottom: 55px;
}
.top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 4;
  background-color: #fff;
}
.top_icon {
  display: flex;
  align-items: center;
}

.plusList {
  font-size: 0.8rem;
  width: 20%;
  height: 70px;
  border: 1px solid white;
  border-radius: 8px;
  /* float: right; */
  position: absolute;
  right: 1%;
  background-color: white;
  margin-top: 2px;
}
.plusList > .van-row {
  padding: 3px 0;
}
.news {
  margin-top: 8px;
}
.menu {
  margin-top: 8px;
}
.grap {
  height: 15px;
  background-color: #f7f8fa;
}
.content {
  background-color: #f7f8fa;
}

.tj,
.cp {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.tj whq-Recommend {
  flex: 1;
}
.cp whq-CookBook {
  flex: 1;
}
</style>
