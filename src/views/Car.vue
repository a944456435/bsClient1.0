<template>
  <div class="Car">
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
    <!-- <p class="title">我的购物车</p> -->
    <!-- {{carList}}登陆状态{{loginStatus}} -->
    <van-row v-if="loginStatus">
      <van-row class="order_container">
        <!-- 订单项 -->
        <van-checkbox-group v-model="result" ref="checkboxGroup" v-if="carList.length!=0">
          <van-swipe-cell v-for="(item,index) in carList" :key="index" class="item_shopCar">
            <van-checkbox class="mycheck" :name="item.productId" v-if="item.productImg">
              <van-card
                class="card"
                :num="item.number"
                :price="item.price"
                :desc="item.productDesc"
                :title="item.productName"
                :thumb="item.productImg[0] || '../assets/timg.jpeg'"
                @click="goProductDetails(item.productId)"
              >
                <template #tags>
                  <van-tag plain type="danger">折扣</van-tag>
                  <van-tag plain type="danger">优惠</van-tag>
                </template>
                <template #footer>
                  <van-button
                    size="mini"
                    type="danger"
                    @click.stop="deleteHandle(item.productId)"
                  >删除</van-button>
                </template>
              </van-card>
            </van-checkbox>
          </van-swipe-cell>
        </van-checkbox-group>
        <!-- //订单项 -->
      </van-row>
    </van-row>
    <van-row v-else>
      <h4>尚未登陆</h4>
    </van-row>
    <!-- 结算栏 -->
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" class="order_bottom">
      <van-checkbox v-model="allOrder" @change="checkAll">全选</van-checkbox>
    </van-submit-bar>
    <!-- //结算栏 -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      allOrder: false, //是否选择全部订单
      result: [], //选中的订单的productId
      number: 1
    };
  },
  computed: {
    ...mapState("shopCar", ["carList"]),
    ...mapState("user", ["loginStatus"]),
    // ...mapGetters("shopCar", ["total"]),
    getFirstImg: data => {
      data.split(";")[0];
    },
    total() {
      let _this = this;
      var total = 0;
      this.carList.filter(item => {
        for (var i = 0; i < _this.result.length; i++) {
          if (item.productId == _this.result[i]) {
            total += item.price * item.number;
          }
        }
      });
      return total * 100;
    }
  },
  methods: {
    ...mapMutations("shopCar", ["addShopCar", "removeCar"]),
    //查找
    goSearch() {
      this.$router.push({ path: "search" });
    },
    //进入产品详情
    goProductDetails(id) {
      this.$router.push({ path: "/productDetails", query: { id } });
    },
    //删除订单
    deleteHandle(id) {
      Toast("删除", id);
      console.log("要清除的产品的id", id);
      //把购物车清掉
      this.removeCar(id);
    },
    //改变数量
    changeAddNum() {
      this.number++;
    },
    changeSubNum() {
      this.number--;
    },
    //全选
    checkAll() {
      if (this.allOrder) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    //提交提单
    onSubmit() {
      console.log(this.result);
      let _this = this;
      if (_this.result.length != 0) {
        let payload = [];
        _this.carList.filter(function(item, index) {
          for (var i = 0; i < _this.result.length; i++) {
            if (item.productId == _this.result[i]) {
              // payload.push(item);
              payload.push(item.productId);
            }
          }
        });
        //payload提交后台
        console.log("传到订单确认页的productId", payload);
        //把要下单的productId传到确认下单页
        this.$router.push({ path: "confirmOrder", query: { ids: payload } });
      } else {
        this.$toast("请选择订单！");
      }
      //把状态机中的订单项清理
      // this.removeCar();
    }
  },
  created() {}
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
  width: 100%;
  text-align: right;
  margin-right: 2em;
}
.order_container {
  margin-bottom: 150px;
}
.item_shopCar {
  margin-bottom: 10px;
}
.card {
  width: 100%;
}
.goods-card {
  margin: 0;
  background-color: white;
}
.delete-button {
  height: 100%;
}
.order_bottom {
  padding-bottom: 50px;
  z-index: 99;
}
.van-card__content {
  text-align: left;
  /* overflow: hidden; */
}
.mycheck {
  display: inline;
}
.inpNumber {
  text-align: center;
}
.inpNumber .van-col:nth-child(2) {
  width: 50px;
  height: 22px;
}
</style>
