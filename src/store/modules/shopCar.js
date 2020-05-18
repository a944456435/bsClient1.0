export default {
  namespaced: true,
  state: {
    carList: [],
  },
  getters: {},
  mutations: {
    addShopCar(state, data) {
      console.log("前端传来的订单项信息", data);
      console.log(state.carList, "state中的carList");
      let index = -1;
      index = state.carList.findIndex((item) => {
        return item.productId == data.productId;
      });
      if (index == -1) {
        state.carList.push(data);
      } else {
        state.carList[index].number = data.number;
      }
    },
    removeCar(state, id) {
      console.log("要清除的产品id", id);
      state.carList.forEach(function(item, index) {
        if (item.productId == id) {
          state.carList.splice(index, 1);
        }
      });
      console.log("移出订单项后", state.carList);
    },
  },
  actions: {},
};
