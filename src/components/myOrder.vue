<template>
  <div class="myOrder">
    <van-nav-bar left-arrow title="我的订单" @click-left="goBack"></van-nav-bar>
    <!-- {{allOrder}} -->
    <h4 v-if="allOrder.length==0">暂时没有发现我的订单</h4>
    <div class="container">
      <van-row v-for="(item,index) in allOrder" :key="index" class="component">
        <van-col :span="22" class="component_container">
          <van-col :span="8">
            <van-row>
              <div class="img_container" v-if="item.mall.images">
                <img :src="item.mall.images.split(';')[0]" />
              </div>
              <div class="img_container" v-else>
                <img src="../assets/timg.jpg" />
              </div>
            </van-row>
            <van-row class="time">{{item.order.orderTime | date}}</van-row>
          </van-col>
          <van-col :span="12" class="text">
            <van-row class="text_ellipsis">{{item.mall.name}}</van-row>
            <van-row class="text_desc text_ellipsis">{{item.mall.descript}}</van-row>
            <van-row
              class="address"
            >{{item.address.province}}{{item.address.city}}{{item.address.area}}{{item.address.address}}</van-row>
          </van-col>
          <van-col :span="4" class="text_right">
            <van-row class="price">￥{{item.order.total}}</van-row>
            <van-row class="number">共{{item.orderItem.number}}件</van-row>
          </van-col>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("order", ["allOrder"])
  },
  methods: {
    ...mapActions("order", ["findAllOrder"]),
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.findAllOrder();
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
  display: flex;
  align-items: center;
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
  margin: 0 0 0;
}
.text > .van-row {
  flex: 1;
  margin: 0.5rem 0;
}
.text_right > .van-row:first-child {
  margin: 1rem 0 0;
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
  margin-top: 0.5rem;
  font-size: 0.85rem;
}
.address {
  font-size: 0.85rem;
}
.text_ellipsis {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 3; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
</style>