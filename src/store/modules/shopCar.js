export default {
  namespaced: true,
  state: {
    carList: [],
  },
  getters: {},
  mutations: {
    addShopCar(state, data) {
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
    //清空购物车某些商品
    removeCar(state, id) {
      state.carList.forEach(function(item, index) {
        if (item.productId == id) {
          state.carList.splice(index, 1);
        }
      });
    },
    //清空全部购物车
    removeAllCar(state) {
      state.carList = [];
    },
  },
  actions: {},
};
