<template>
  <div class="confirmOrder">
    <van-nav-bar left-arrow @click-left="goBack" title="确认订单"></van-nav-bar>
    <!-- 订单信息：{{filterConfirmOrder}} -->
    <!-- {{this.ids}}///{{this.defaultAddressId}}///{{this.oneAdddress}} -->
    <van-row class="address_tip">请选择收货地址</van-row>
    <van-row class="selectAddress">
      <!-- <van-col :span="1">
        <el-checkbox v-model="checked"></el-checkbox>
      </van-col>-->
      <van-col :span="22" class="address_content" @click="toEditAddress" v-if="oneAdddress">
        <van-row>
          <van-col :span="4">{{oneAdddress.name}}</van-col>
          <van-col :span="12">{{oneAdddress.telphone}}</van-col>
          <van-col :span="4">
            <div class="tag_btn">默认</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col
            class="address_text"
          >{{oneAdddress.province}}{{oneAdddress.city}}{{oneAdddress.area}}{{oneAdddress.address}}</van-col>
        </van-row>
      </van-col>
      <van-col :span="2">
        <van-icon name="arrow" size="22" />
      </van-col>
    </van-row>
    <van-row class="address_tip">订单详情</van-row>

    <van-swipe-cell v-for="(item,index) in filterConfirmOrder" :key="index" class="item_shopCar">
      <van-card
        class="card"
        :num="item.number"
        :price="item.price"
        :desc="item.productDesc"
        :title="item.productName"
        :thumb="item.productImg[0]"
        @click="goProductDetails(item.productId)"
      ></van-card>
    </van-swipe-cell>
    <!-- 结算栏 -->
    <van-submit-bar :price="total*100" button-text="提交订单" @submit="onSubmit" class="order_bottom">
      <!-- <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>-->
    </van-submit-bar>
    <!-- //结算栏 -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      ids: [], //确认下单的productId
      checked: true
    };
  },
  watch: {
    ids: function() {
      let _this = this;
      if (this.ids == undefined) {
        this.$toast("确认订单状态丢失，请重新确认下单信息！");
        _this.$router.push("/car");
      } else if (this.ids.length == 0) {
        this.$toast("确认订单状态丢失，请重新确认下单信息！");
        _this.$router.push("/car");
      }
    }
  },
  computed: {
    ...mapState("shopCar", ["carList"]),
    ...mapState("address", ["defaultAddressId", "oneAdddress"]),
    filterConfirmOrder: function() {
      let _this = this;
      if (this.ids && this.ids.length != 0) {
        let showList = [];
        _this.carList.filter((item, index) => {
          for (var i = 0; i < this.ids.length; i++) {
            if (item.productId == this.ids[i]) {
              showList.push(item);
            }
          }
        });
        return showList;
      }
    },
    //获得总价
    total() {
      let _this = this;
      var total = 0;
      if (this.ids && this.ids.length != 0) {
        for (var i = 0; i < _this.ids.length; i++) {
          this.carList.filter(item => {
            if (item.productId == _this.ids[i]) {
              total += item.price * item.number;
            }
          });
        }

        return total;
      }
    }
  },
  methods: {
    ...mapActions("address", ["getAllAddress", "getOneAddress"]),
    ...mapActions("order", ["saveOrder"]),
    ...mapActions("orderItem", ["saveOrderItem"]),
    ...mapMutations("shopCar", ["removeCar"]),
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //修改或添加地址
    toEditAddress() {
      Toast("修改地址");
      this.$router.push("editAddress");
    },
    //提交订单
    async onSubmit() {
      let orderTime = new Date().valueOf();
      //用户id通过session拿
      let total = this.total;
      let address_id = this.defaultAddressId;
      let mall_id = 2;
      let payload = { orderTime, total, address_id };
      console.log("保存到order表的payload", payload);
      console.log("提交订单的产品信息", this.filterConfirmOrder);
      //先保存订单表，再保存订单项
      //保存订单信息，获得订单id
      let order = await this.saveOrder(payload);
      //把订单项保存到订单项表  mall_id,number,order_id
      this.filterConfirmOrder.forEach(item => {
        //调用后台接口
        let mall_id = item.productId;
        let number = item.number;
        console.log("订单提交后的order的id为", order.data.insertId);
        let payloady2 = { mall_id, number, order_id: order.data.insertId };
        console.log("payloady2222", payloady2);
        this.saveOrderItem(payloady2);
        //把下单后的购物车清掉
        this.removeCar(item.productId);
        Toast("购买成功！");
        this.$router.push("user");
      });
    }
  },
  created() {
    this.ids = this.$route.query.ids;
    console.log(this.$route.query.ids);
    this.getAllAddress();
    console.log(this.defaultAddressId, "defaultAddressId");
    this.getOneAddress(this.defaultAddressId);
  }
};
</script>
<style scoped>
.selectAddress {
  margin-left: 2em;
  margin-right: 2em;
  text-align: left;
  padding: 15px 0;
}

.address_text {
  font-size: 0.9rem;
}
.tag_btn {
  font-size: 0.6rem;
  border: 1px solid tomato;
  background-color: tomato;
  color: white;
  text-align: center;
  border-radius: 10px;
}
.van-card__content {
  text-align: left;
}
.item_shopCar {
  margin-bottom: 20px;
  overflow: visible;
}
.address_tip {
  text-align: left;
  font-size: 0.8rem;
  color: #ccc;
  margin-left: 2em;
}
</style>
