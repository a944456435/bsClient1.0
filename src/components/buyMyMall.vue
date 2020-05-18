<template>
  <div class="buyMyMall">
    <van-row>
      <van-nav-bar left-arrow title="我的销售" @click-left="goBack"></van-nav-bar>
    </van-row>
    <!-- {{buyMyMallInfo}} -->
    <h4 v-if="buyMyMallInfo.length==0">暂时没有发现我的销售信息</h4>
    <div class="container" v-if="buyMyMallInfo.length!=0">
      <van-row v-for="(item,index) in buyMyMallInfo" :key="index" class="component">
        <van-row>
          <van-col :span="22" class="component_container" @click="goProductDetail(item.id)">
            <van-col :span="8">
              <van-row>
                <div class="img_container" v-if="item.mall.images">
                  <img :src="item.mall.images.split(';')[0]" />
                </div>
                <div class="img_container" v-else>
                  <img src="../assets/timg.jpg" />
                </div>
              </van-row>
            </van-col>
            <van-col :span="12" class="text">
              <van-row class="text_ellipsis">{{item.mall.name}}</van-row>
              <van-row class="text_desc text_ellipsis">{{item.mall.descript}}</van-row>
            </van-col>
            <van-col :span="4" class="text_right">
              <van-row class="price">￥{{item.mall.price}}</van-row>
              <van-row class="o_price" v-if="item.original_price">￥{{item.original_price}}</van-row>
              <van-row class="number">共售{{item.mall.sale}}件</van-row>
            </van-col>
          </van-col>
        </van-row>
        <van-row class="time">订单时间：{{item.order.orderTime | date}}</van-row>
        <van-row class="time">收货人 ：{{item.user.username}}</van-row>
        <van-row
          class="text_ellipsis address"
        >收货地址：{{item.address.province}}{{item.address.city}}{{item.address.area}}{{item.address.address}}</van-row>
        <!-- <van-row>
          <van-col :span="16"></van-col>
          <van-col>
            <van-button round type="info" size="mini" @click="updateMall(item.id)">修改</van-button>
          </van-col>
          <van-col>
            <van-button round type="info" size="mini" @click="deleteMall(item.id)">删除</van-button>
          </van-col>
        </van-row>-->
      </van-row>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("orderItem", ["buyMyMallInfo"])
  },
  methods: {
    ...mapActions("orderItem", ["buyMyMall"]),
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.buyMyMall();
  }
};
</script>
<style scoped>
.buyMyMall {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  z-index: 100;
}
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
  margin: 0.5rem 0 0;
}
.text > .van-row {
  flex: 1;
  margin: 0.3rem 0;
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
.time {
  text-align: left;
  font-size: 0.95rem;
  text-indent: 2em;
  color: lightgrey;
}
.address {
  text-align: left;
  font-size: 0.95rem;
  text-indent: 2em;
  color: lightgrey;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 3; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
</style>