import {
  USER,
  ADD_PRODUCTS,
  UPDATE_CARTDATA,
  UPDATE_CATE_TREE,
  UPDATE_CURRENT_DATE,
  UPDATE_MONTH
} from './mutation-types.js'

import {
	setStore,
	getStore,
} from '../config/mUtils'

export default {
  [USER](state, user) {
    state.user = user;
    setStore('user', state.user);
  },
  // 保存分类信息
  [UPDATE_CATE_TREE](state, treeWithProds) {
    state.treeWithProds = treeWithProds;
    setStore('treeWithProds', state.treeWithProds);
  },
  // 更新购物车信息
  [UPDATE_CARTDATA](state, obj) {
    for(let key in obj){
      state.cartData.hasOwnProperty(key) && (state.cartData[key] = obj[key])
    }
    //state.cartData = cartData;
    //setStore('cartData', state.cartData);
  },
  // 添加商品
  [ADD_PRODUCTS](state, productsList) {
    state.productsList = productsList;
    setStore('productsList', state.productsList);
  },
  [UPDATE_CURRENT_DATE](state, date) {
    state.current_date = date;
  },
  [UPDATE_MONTH](state, date) {
    state.month = date;
  }

}
