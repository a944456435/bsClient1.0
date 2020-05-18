<template>
  <div class="layout">
    <router-view />
    <van-tabbar v-model="active" @change="tabChangeHandler" class="bottom">
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="mall" icon="goods-collect-o">市集</van-tabbar-item>
      <van-tabbar-item name="push" icon="plus">发布</van-tabbar-item>
      <van-tabbar-item name="car" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  },
  methods: {
    tabChangeHandler(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style scoped>
.bottom {
  height: 50px;
  position: fixed;
  bottom: 0;
  z-index: 99;
}
</style>
