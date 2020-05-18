<template>
  <div class="productDetails">
    <van-row>
      <van-nav-bar left-arrow title="市集" @click-left="goBack">
        <template #right>
          <van-icon name="shopping-cart-o" size="22" @click="goShopCar" />
        </template>
      </van-nav-bar>
    </van-row>
    <van-swipe class="my-swipe" :autoplay="5000" indicator-color="tomato">
      <van-swipe-item v-for="(item,index) in images" :key="index">
        <img :src="item" />
      </van-swipe-item>
    </van-swipe>

    <van-row class="name">{{oneMall.name}}</van-row>
    <van-row class="descript">{{oneMall.descript}}</van-row>
    <van-row class="price">
      <van-col class="p_price">￥ {{oneMall.price}}{{oneMall.unit}}</van-col>
      <van-col
        class="o_price"
        v-if="oneMall.original_price"
      >￥{{oneMall.original_price}}{{oneMall.unit}}</van-col>
    </van-row>
    <van-row class="info">
      <van-col :span="12">
        评分：
        <i>5</i>
      </van-col>
      <van-col :span="12">
        销售量：
        <i>{{oneMall.sale}}</i>
      </van-col>
    </van-row>
    <!-- 展示评论区域 -->
    <van-row class="comment_title">
      <van-col :span="12">
        评价晒单(
        <i>{{this.commentAboutOneMall.length}}</i>)
      </van-col>
      <van-col :span="12" class="comment_more">更多</van-col>
    </van-row>
    <van-row class="comment_content" v-for="(item,index) in commentAboutOneMall" :key="index">
      <van-row>
        <van-col class="photo">
          <el-avatar :src="item.photo"></el-avatar>
        </van-col>
        <van-col class="photo_right">
          <van-row>{{item.username}}</van-row>
          <van-row>
            <van-icon name="location-o" />
            {{item.city}}
          </van-row>
        </van-col>
        <van-col class="comment_time">{{item.time | date}}</van-col>
      </van-row>
      <van-row class="comment_text">{{item.content}}</van-row>
    </van-row>

    <!-- 评论面板 -->
    <van-row>
      <van-action-sheet v-model="isShow" title="发布评论" class="commontPeal">
        <!-- 发表新评论 -->
        <van-row class="commentInput">
          <van-cell-group>
            <van-field v-model="mycomment" placeholder="快发表你的看法吧！" />
          </van-cell-group>
          <van-row>
            <van-col :span="6" :offset="18">
              <van-button round class="emit" @click="emit">发送</van-button>
            </van-col>
          </van-row>
        </van-row>
      </van-action-sheet>
    </van-row>
    <!-- 点击购物车时弹出抽屉 -->
    <el-drawer :visible.sync="drawer" direction="btt" ref="drawer" :before-close="handleClose">
      <van-row class="drawer_content">
        <van-row class="goods">
          <van-col class="goods_img_container">
            <el-image style="width: 100%; height: 100%" :src="this.images[0]" fit="contain ">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </van-col>
          <van-col>
            <van-row class="goods_name">{{oneMall.name}}</van-row>
            <van-row>
              <van-col class="p_price2">￥{{oneMall.price}}{{oneMall.unit}}</van-col>
              <van-col
                class="o_price2"
                v-if="oneMall.original_price"
              >￥{{oneMall.original_price}}{{oneMall.unit}}</van-col>
            </van-row>
          </van-col>
        </van-row>
        <van-row class="good_num">
          <van-col :span="12" class="num_text">购买数量</van-col>
          <van-col :span="12" class="num_inpNum">
            <el-input-number
              size="mini"
              :min="0"
              v-model="oneMall.number"
              @change="numberChangeHandler(oneMall)"
            ></el-input-number>
          </van-col>
        </van-row>
        <van-row class="goods_btn">
          <el-button type="primary" round @click="toConfirmOrderHandler">加入购物车</el-button>
        </van-row>
      </van-row>
    </el-drawer>
    <!-- 底部购买栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="评论" @click="showCommont" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="showDrawer" />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="showDrawer" />
    </van-goods-action>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      images: [], //存放轮播图切割url后的地址
      drawer: false, //购物车抽屉关闭状态
      number: 0, //购买的数量
      orderLine: {}, //订单项信息
      isShow: false, //评论是否可见
      mycomment: "" //我的评论
    };
  },
  computed: {
    ...mapState("mall", ["oneMall", "commentAboutOneMall"]),
    ...mapState("user", ["loginStatus"])
  },
  methods: {
    ...mapActions("mall", ["getMallById", "getCommentByMallId"]),
    ...mapMutations("shopCar", ["addShopCar"]),
    ...mapActions("user", ["isLogin"]),
    ...mapActions("comment", ["saveComment"]),

    goBack() {
      console.log("返回");
      // this.$router.go(-1);
      this.$router.push("/mall");
      console.log("返回了");
    },

    //切割轮播图的url地址
    splitImg() {
      this.images = this.oneMall.images.split(";");
    },
    //购物车抽屉关闭
    handleClose(done) {
      this.drawer = false;
    },
    //打开抽屉
    showDrawer() {
      this.drawer = true;
    },
    //加入购物车时选择数量
    numberChangeHandler(val) {
      this.orderLine = {
        productId: val.id,
        productName: val.name,
        productDesc: val.descript,
        price: val.price,
        productImg: this.oneMall.images.split(";")
          ? this.oneMall.images.split(";")
          : "",
        number: val.number
      };
    },
    //加入购物车
    async toConfirmOrderHandler() {
      //先判断登陆
      await this.isLogin();
      if (this.loginStatus) {
        console.log(this.number, "==");
        // if (this.number != 0) {
        this.addShopCar(this.orderLine);
        this.orderLine = {};
        this.drawer = false;
        // } else {
        //   Toast("请选择数量");
        // }
      } else {
        this.$router.push("/login");
      }
    },
    goShopCar() {
      this.$router.push("/car");
    },
    //查看评论
    showCommont() {
      this.isShow = true;
    },
    //发表评论
    async emit() {
      console.log("emit");
      //先判断是否登陆
      await this.isLogin();
      if (this.loginStatus) {
        //拿到当前视频的id或者当前菜谱的id，加上评论内容,时间
        let mall_id = this.$route.query.id;
        let content = this.mycomment.trim();
        let time = new Date().valueOf();
        let payload = { mall_id, content, time };
        console.log("payload", payload);
        this.saveComment(payload);
        Toast("评论成功！");
        this.mycomment = "";
        //刷新评论
        this.getCommentByMallId(this.$route.query.id);
      } else {
        Toast("请先登录，再来评论！");
      }
    }
  },
  created() {
    let _this = this;
    //查找该商品的信息
    this.getMallById(this.$route.query.id).then(function() {
      //分割该商品的展示图
      _this.splitImg();
    });

    //得到该商品的所有评论
    this.getCommentByMallId(this.$route.query.id);
  }
};
</script>
<style >
.productDetails {
  position: absolute;
  text-align: left;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  z-index: 100;
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
.info {
  font-size: 0.8rem;
  padding: 0.2rem;
  padding-top: 0.6rem;
  /* border-bottom: 1px solid #ccc; */
  text-align: left;
  margin-left: 2rem;
  margin-right: 2rem;
}
.info i {
  color: tomato;
  font-style: normal;
}
.productDetails .name {
  text-align: left;
  font-size: 1.2rem;
  padding-top: 0.6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-weight: 500;
}
.productDetails .descript {
  text-align: left;
  padding-left: 2rem;
  padding-right: 2rem;
  padding: 0.1rem 0rem 0 2rem;
  color: rgb(112, 110, 110);
  font-size: 0.9rem;
}
.p_price {
  color: tomato;
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 2rem;
}
.o_price {
  text-indent: 0.5em;
  text-decoration: line-through;
  color: #ccc;
}
.comment_title {
  margin: 0.8rem 2rem;
  font-size: 0.9rem;
}
.comment_more {
  text-align: right;
}
.comment_content {
  margin: 0.4rem 2rem;
}
.photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.photo_right {
  margin-left: 0.4rem;
}
.comment_time {
  margin-left: 0.6rem;
}
.comment_text {
  margin-top: 0.5rem;
  text-indent: 2em;
}
/* 重写样式 */
.el-drawer__header {
  padding: 0;
  margin-bottom: 0;
}
.drawer_content {
  margin: 0 2rem;
}

.goods {
  width: 100%;
  height: 60px;
}
.goods_name {
  margin-bottom: 15px;
}
.p_price2 {
  color: tomato;
}
.o_price2 {
  margin-left: 0.5rem;
  text-decoration: line-through;
  color: #ccc;
  font-size: 0.8rem;
}
.goods_img_container {
  width: 60px;
  height: 60px;
  /* border: 1px solid red; */
}
.good_num {
  margin: 1rem 0;
}
.num_text {
  font-size: 0.9rem;
  color: #ccc;
}
.goods_btn {
  /* margin-left: 50%; */
  /* transform: translate(50%, 0); */
  text-align: center;
}

.commontPeal {
  height: 13rem;
}
.commentInput {
  margin: 0 0.5rem;
}
.emit {
  margin: 0 auto;
  border-radius: 2.5rem;
}
</style>