<template>
  <div id="editAddress">
    <van-row>
      <van-nav-bar title="修改地址" left-arrow @click-left="goBack" />
    </van-row>
    <van-row class="mycontent">
      <h3 v-if="list.length==0">你暂时没有地址信息</h3>
      <!-- {{allAddress}} -->
      <!-- <p>{{chosenAddressId}}</p> -->
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />

      <!-- 新增配送信息的抽屉 -->
      <van-action-sheet v-model="isShow" title="新增收货地址">
        <div class="content">
          <van-address-edit
            :area-list="areaList"
            show-delete
            show-set-default
            :search-result="searchResult"
            delete-button-text="清空"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
          />
        </div>
      </van-action-sheet>
    </van-row>
  </div>
</template>

<script>
import areaList from "../utils/areaList";
import { mapActions, mapState, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      chosenAddressId: 1,
      list: [],
      isShow: false
    };
  },
  computed: {
    ...mapState("address", ["allAddress"])
  },
  methods: {
    ...mapMutations("address", ["SET_defaultAddressId"]),
    ...mapActions("address", ["getAllAddress", "saveOrUpdateAddress"]),
    goBack() {
      this.SET_defaultAddressId(this.chosenAddressId);
      this.$router.go(-1);
    },
    onAdd() {
      console.log("点击新增");
      this.isShow = true;
    },
    onEdit(item, index) {
      Toast("暂不支持修改");
    },
    onSave(data) {
      console.log(data);
      //保存地址信息
      let {
        name,
        tel: telphone,
        province,
        city,
        county: area,
        addressDetail: address
      } = data;
      let payload = {
        name,
        telphone,
        province,
        city,
        area,
        address
      };
      console.log("payload--", payload);
      this.saveOrUpdateAddress(payload).then(() => {
        Toast("新增地址成功！");
        this.getAllAddress();
        this.isShow = false;
      });
    },
    toupdateAddress() {},
    onDelete() {
      Toast("delete");
    }
  },
  created() {
    this.getAllAddress();
    //把数据做成组件需要的形式
    this.allAddress.forEach(item => {
      let id = item.id;
      let name = item.name;
      let tel = item.telphone;
      let address = item.province + item.city + item.area + item.address;
      let isDefault = false;
      let itemAddress = { id, name, tel, address, isDefault };
      this.list.push(itemAddress);
    });
  }
};
</script>

<style scoped>
#editAddress {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: white;
  z-index: 100;
}

.mycontent {
  position: absolute;
  top: 46px;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 100;
  background-color: #f7f8fa;
}
.selectAddress {
  margin-left: 2em;
  margin-right: 2em;
  text-align: left;
  padding: 15px 0;
  background-color: white;
}
.selectAddress > .van-col:first-child {
  font-size: 30px;
}
</style>>