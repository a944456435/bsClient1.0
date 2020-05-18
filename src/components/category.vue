<template>
  <div class="category">
    <van-row>
      <van-nav-bar left-arrow title="分类" @click-left="goBack"></van-nav-bar>
    </van-row>
    <!-- {{detailCategory}} -->
    <h4>{{this.$route.query.categoryname}}</h4>
    <van-row>
      <!-- <van-col span="18"> -->
      <van-card
        @click="goPractice(item.id)"
        v-for="item in detailCategory"
        :key="item.id"
        :desc="item.detail"
        :title="item.name"
        :thumb="item.image"
      />
      <!-- </van-col> -->
    </van-row>
    <template v-if="detailCategory.length==0">暂无分类</template>

    <!-- <van-row class="row" v-for="item in detailCategory" :key="item.id">
      <van-col :span="6">
        <div class="img">
          <img :src="item.image" />
        </div>
      </van-col>
      <van-col :span="18">
        <van-row>
          <div class="name">{{item.name}}</div>
        </van-row>
        <van-row>
          <div class="detail">{{item.detail}}</div>
        </van-row>
      </van-col>
    </van-row>-->
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // ...mapState("category", ["detailCategory"]),
    ...mapState("cookbook", ["detailCategory"])
  },
  methods: {
    // ...mapActions("category", ["findCategoryById"]),
    ...mapActions("cookbook", ["findByCategoryId"]),
    goBack() {
      this.$router.go(-1);
    },
    goPractice(id) {
      this.$router.push({ path: "practice", query: { id: id } });
    }
  },
  created() {
    this.findByCategoryId(this.$route.query);
  }
};
</script>
<style scoped>
.category {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  z-index: 100;
}
.category .van-card {
  text-align: left;
}
.category .row {
  margin: 0.5rem;
  text-align: left;
}
.category .img {
  /* width: 9rem; */
  height: 6rem;
  overflow: hidden;
  border: 1px solid #ccc;
}
.category .name {
  font-size: 1.2rem;
  padding: 0.2rem;
}
.category .detail {
  padding: 0.2rem;
  color: rgb(112, 110, 110);
  font-size: 1rem;
}
</style>