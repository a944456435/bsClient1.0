<template>
  <div class="about">
    <van-sticky>
      <van-row type="flex" justify="space-between" class="top_icon">
        <van-col span="4">
          <van-icon name="question-o" size="24px" />
        </van-col>
        <van-col span="16">
          <van-search placeholder="请输入搜索关键词" shape="round" input-align="center" @focus="goSearch" />
        </van-col>
        <van-col span="4">
          <van-icon name="plus" size="24px" />
        </van-col>
      </van-row>
    </van-sticky>
    <!-- <p class="title">市集经典</p> -->
    <el-row>
      <el-col
        :span="10"
        class="com-block"
        v-for="(o, index) in allMall"
        :key="o.id"
        :offset="index%2==0 ? 1: 2"
      >
        <div @click="goProductDetail(o.id)">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.images.split(';')[0]" class="image" v-if="o.images" />
            <!-- <img :src="getFirstImg(o.images)" class="image" /> -->

            <div>
              <div class="content_text">
                <span>{{o.name}}</span>
              </div>
              <div class="bottom__text">
                <el-row>
                  <el-col :span="12" class="price">
                    <span class="d_price">￥{{o.price}}{{o.unit}}</span>
                    <span class="o_price" v-if="o.original_price">￥{{o.original_price}}{{o.unit}}</span>
                  </el-col>
                  <el-col :span="12">
                    <span class="sales">已售{{'999'}}+</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("mall", ["allMall"]),
    getFirstImg: data => {
      data.split.call(";")[0];
    }
  },
  methods: {
    ...mapActions("mall", ["getAllMall"]),
    //查找
    goSearch() {
      this.$router.push({ path: "search" });
    },
    //跳转到商品详细界面，下单
    goProductDetail(id) {
      console.log("goProductDetail", id);
      this.$router.push({ path: "/productDetails", query: { id } });
    }
  },
  created() {
    this.getAllMall();
  }
};
</script>
<style scoped>
.top_icon {
  background-color: white;
  z-index: 100;
  display: flex;
  align-items: center;
}
.title {
  padding: 0;
  margin: 0;
  color: #ffcc00;
}
.showmore {
  /* background-color: tomato; */
  width: 100%;
  text-align: right;
}
.com-block {
  margin-top: 1rem;
}
.image {
  height: 8rem;
  width: 100%;
  object-fit: counter-reset;
}
.content_text {
  height: 2.5rem;
  font-size: 0.9rem;
  padding: 3px 2px;
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
.bottom__text {
  padding-top: 0.5rem;
  font-size: 0.8rem;
  padding-bottom: 0.3rem;
}
.bottom__text .d_price {
  color: red;
}
.bottom__text .o_price {
  text-decoration: line-through;
  color: #ccc;
  font-size: 0.6rem;
}
</style>
