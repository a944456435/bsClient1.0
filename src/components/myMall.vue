<template>
  <div class="myMall">
    <van-nav-bar left-arrow title="我的食材" @click-left="goBack"></van-nav-bar>

    <div class="container" v-if="mallAboutUser.length!=0">
      <van-row v-for="(item,index) in mallAboutUser" :key="index" class="component">
        <van-row>
          <van-col :span="22" class="component_container" @click="goProductDetail(item.id)">
            <van-col :span="8">
              <div class="img_container" v-if="item.images">
                <img :src="item.images.split(';')[0]" />
              </div>
              <div class="img_container" v-else>
                <img src="../assets/timg.jpg" />
              </div>
            </van-col>
            <van-col :span="12" class="text">
              <van-row class="text_ellipsis">{{item.name}}</van-row>
              <van-row class="text_desc text_ellipsis">{{item.descript}}</van-row>
            </van-col>
            <van-col :span="4" class="text_right">
              <van-row class="price">￥{{item.price}}</van-row>
              <van-row class="o_price" v-if="item.original_price">￥{{item.original_price}}</van-row>
              <van-row class="number">共售{{item.sale}}件</van-row>
            </van-col>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="16"></van-col>
          <van-col>
            <van-button round type="info" size="mini" @click="updateMall(item.id)">修改</van-button>
          </van-col>
          <van-col>
            <van-button round type="info" size="mini" @click="deleteMall(item.id)">删除</van-button>
          </van-col>
        </van-row>
      </van-row>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "vant";
export default {
  computed: {
    ...mapState("mall", ["mallAboutUser"])
  },
  methods: {
    ...mapActions("mall", ["getAllMallAboutUser", "deleteMallById"]),
    goBack() {
      this.$router.go(-1);
    },
    goProductDetail(id) {
      console.log("goProductDetail", id);
      this.$router.push({ path: "/productDetails", query: { id } });
    },
    deleteMall(id) {
      Toast("删除mall");
      this.deleteMallById(id);
      this.getAllMallAboutUser();
    },
    updateMall(id) {
      this.$router.push({ path: "writeMall", query: { id } });
    }
  },
  created() {
    this.getAllMallAboutUser();
  }
};
</script>
<style scoped>
.container {
  background-color: #f2f2f2;
}
.component {
  margin: 1rem 0;
  border-radius: 0.8rem;
  background-color: white;
}
.component_container {
  margin: 0.5rem 1rem;
}
.img_container {
  overflow: hidden;
}
.img_container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text,
.text_right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text > .van-row:first-child {
  margin: 2.5rem 0 0;
}
.text > .van-row {
  flex: 1;
  margin: 0.5rem 0;
}
.text_right > .van-row:first-child {
  margin: 2rem 0 0;
  color: red;
}
.o_price {
  text-decoration: line-through;
  color: #ccc;
  font-size: 0.8rem;
}
.text_right > .van-row {
  flex: 1;
  margin: 0.5rem 0;
}
.number {
  color: #ccc;
  font-size: 0.8rem;
}
.text_desc {
  font-size: 0.9rem;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 3; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
</style>