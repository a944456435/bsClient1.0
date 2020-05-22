<template>
  <div class="cookbook" @click="goPractice(data.cookbook.id)">
    <!-- {{ data }} -->
    <div class="img">
      <img v-if="data.cookbook.image" :src="data.cookbook.image" />
      <img v-else src="../assets/timg.jpg" />
    </div>
    <van-row class="title">
      <van-col offset="1">{{ data.cookbook.name }}</van-col>
    </van-row>
    <van-row class="detail">
      <van-col offset="1" class="text_ellipsis">{{ data.cookbook.detail }}</van-col>
    </van-row>
    <van-row class="time">
      <van-col offset="1">{{ data.cookbook.time | date }}</van-col>
    </van-row>
    <van-row class="bottom-cook">
      <van-col offset="1" class="photo" span="5" v-if="!data.user.photo">
        <img src="../assets/timg.jpg" />
      </van-col>
      <van-col offset="1" class="photo" span="5" v-else>
        <img :src="data.user.photo" />
      </van-col>
      <van-col span="12" class="username text_ellipsis">{{ data.user.username }}</van-col>
    </van-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["data"],
  data() {
    return {
      allIds: []
    };
  },
  computed: {},
  methods: {
    ...mapActions("comment", ["findByCookbookId"]),

    goPractice(id) {
      this.$router.push({ path: "practice", query: { id: id } });
    }
  },
  created() {}
};
</script>

<style >
.cookbook {
  border: 1px solid #f7f8fa;
  box-shadow: 0.5px 0.5px 0.5px #f7f8fa;
  width: 43%;
  margin: 10px;
  border-radius: 0.5rem;
  background-color: white;
}
.cookbook .img {
  min-height: 150px;
  margin-bottom: 2px;
  height: 5rem;
  overflow: hidden;
}
.cookbook .img:hover {
  transform: scale(1.1);
  transition: transform 2s linear;
}
.cookbook .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.title {
  font-weight: bolder;
  font-size: 12px;
  overflow: hidden;
}
.detail {
  text-indent: 2em;
  height: 33px;
}
.bottom-cook {
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
  font-size: 0.9rem;
}
.like {
  font-size: 12px;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
</style>
