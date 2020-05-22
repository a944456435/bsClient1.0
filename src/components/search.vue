<template>
  <div class="search">
    <van-row type="flex" justify="space-between" class="top_icon">
      <van-col span="2" class="icon">
        <van-icon name="arrow-left" size="1.5rem" @click="goBack" />
      </van-col>
      <van-col span="22">
        <div>
          <van-dropdown-menu>
            <van-dropdown-item v-model="type" :options="option" />
          </van-dropdown-menu>
        </div>
      </van-col>
    </van-row>
    <van-row class="input">
      <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="getResultsByKeyword"></el-button>
      </el-input>
    </van-row>
    <p>
      <el-link type="success">当前搜索：{{ type }}</el-link>
    </p>

    <el-row v-if="searchResluts.length==0">暂无搜索结果</el-row>
    <el-row class="content">
      <el-row v-for="item in searchResluts" :key="item.id" class="components">
        <!-- 如果是cookbook -->
        <template v-if="item.cookbook">
          <van-row class="block-components" @click="goPractice(item.cookbook.id)">
            <van-col :span="8">
              <el-image class="image" :src="item.cookbook.image">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </van-col>
            <el-col :span="16">
              <el-row class="right_text">
                <el-col class="right_title">{{ item.cookbook.name }}</el-col>
                <el-col class="right_ingre text_ellipsis">{{ item.cookbook.detail }}</el-col>
                <el-col class="right_timer">发表时间：{{ item.cookbook.time | date }}</el-col>
                <el-col class="right_author">作者：{{ item.user.username }}</el-col>
              </el-row>
            </el-col>
          </van-row>
        </template>
        <!-- //如果是cookbook -->
        <!-- 如果是recommend -->
        <template v-if="item.recommend">
          <van-row @click="goShow(item.recommend.id)" class="block-components">
            <el-col :span="8" class="video_container">
              <video class="video">
                <source :src="item.recommend.resource" />
              </video>
              <i class="el-icon-video-play" style="fontSize:2rem"></i>
            </el-col>

            <el-col :span="16">
              <el-row class="right_text">
                <el-row class="right_title">{{ item.recommend.title }}</el-row>

                <el-row class="user_info">
                  <el-col :span="8">
                    <el-avatar :size="40" :src="item.user.photo"></el-avatar>
                  </el-col>
                  <el-col :span="16" class="right_author">
                    {{
                    item.user.username
                    }}
                  </el-col>
                </el-row>
                <el-row class="right_timer">发表时间：{{ item.recommend.time | date }}</el-row>
              </el-row>
            </el-col>
          </van-row>
        </template>
        <!-- //如果是recommend -->
        <!-- 如果是user -->
        <template v-if="item.id">
          <van-row class="user block-components" @click="showUserInfo(item.id)">
            <van-col span="4">
              <!-- {{item}} -->
              <div class="photo_container" v-if="item.photo">
                <img :src="item.photo" />
              </div>
              <template v-else>
                <img src="../assets/timg.jpg" class="photo_container" />
              </template>
            </van-col>
            <van-col span="20">
              <van-row class="username">
                <van-col :span="17">{{ item.username }}</van-col>
              </van-row>
              <van-row class="faninfo">
                <van-col :span="4">
                  <van-tag color="#f2826a" plain>{{ item.city }}</van-tag>
                </van-col>
                <van-col :span="4">
                  <van-tag color="#f2826a" plain>{{ item.sex }}</van-tag>
                </van-col>
                <van-col :span="14">
                  <van-tag color="#f2826a" plain>{{ item.occupation }}</van-tag>
                </van-col>
              </van-row>
              <van-row class="time">
                <van-col>{{ item.registrationTime | date }}</van-col>
              </van-row>
              <van-row class="faninfo">
                <van-col class="text_ellipsis">个人说明：{{ item.description }}</van-col>
              </van-row>
            </van-col>
          </van-row>
        </template>
        <!-- //如果是user -->
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      keyword: "",
      type: "菜谱",
      test: [],
      option: [
        { text: "菜谱", value: "菜谱" },
        { text: "视频", value: "视频" },
        { text: "用户", value: "用户" }
      ]
    };
  },
  computed: {
    ...mapState("search", ["searchResluts"])
  },
  methods: {
    ...mapActions("search", [
      "getCookbookBykeyword",
      "getRecommendBykeyword",
      "getUserBykeyword"
    ]),

    goBack() {
      this.$router.go(-1);
    },
    //按条件搜索
    getResultsByKeyword() {
      console.log("ooo");
      switch (this.type) {
        case "菜谱":
          //菜谱条件搜索
          this.getCookbookBykeyword(this.keyword);
          console.log("菜谱条件搜索");
          break;
        case "视频":
          //视频条件搜索
          this.getRecommendBykeyword(this.keyword);
          console.log("视频条件搜索");
          break;
        case "用户":
          //用户条件搜索
          this.getUserBykeyword(this.keyword);
          console.log("用户条件搜索");
          break;
        // default:
        //   break;
      }
    },
    //进入个人详细信息
    showUserInfo(id) {
      this.$router.push({
        path: "/otherUserInfo",
        query: { id }
      });
    },
    //播放视频页
    goShow(id) {
      console.log(id);
      this.$router.push({ path: "videoPlay", query: { id: id } });
    },
    goPractice(id) {
      console.log(id);
      this.$router.push({ path: "practice", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.search {
  z-index: 100;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  font-size: 0.9rem;
}
.block-components {
  margin: 0.4rem 0;
}
.top_icon {
  display: flex;
  align-items: center;
  padding: 0.3rem 0;
}
.tip_text {
  color: gray;
}
.tip_search > .van-tag {
  margin-right: 15px;
}
.input {
  margin: 0 0.5rem;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.content {
  width: 90%;
  margin: 0 auto;
}
.components {
  padding: 0.4rem 0;
  /* background-color: #f5f7fa; */
}

.image {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right_text {
  padding: 0 0.5rem;
  text-align: left;
  text-indent: 1em;
  min-height: 7rem;
}

.right_title {
  font-weight: 600;
  font-size: 1rem;
}
.right_ingre {
  margin: 0.4rem 0;
}
.ingre {
  padding: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
}
.right_author {
  margin: 0.1rem 0;
}
.user_info {
  margin: 1rem 0;
  height: 40px;
  line-height: 40px;
}
.username {
  font-size: 1.2rem;
  font-weight: 600;
  color: tomato;
}
.video_container {
  border: 1px solid #ccc;
  position: relative;
}
.video {
  object-fit: cover;
  width: 100%;
  height: 7rem;
  overflow: hidden;
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
.user {
  width: 100%;
  padding: 0.3rem;
  /* background-color: #f5f7fa; */
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.faninfo {
  text-align: left;
}
.photo_container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid red;
}
.photo_container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
</style>
