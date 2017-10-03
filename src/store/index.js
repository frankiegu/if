import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  user:{
    id:'',
  },
  month:'',
	cartList: {}, // 加入购物车的商品列表
  cartData: {
    amount:0,
    discount:0,
    products:{},
    count:null,
    book_time:'',
    spec:{
      'required_single':{},
      'unrequired_single':{},
      'required_multiple':{},
      'unrequired_multiple':{}

    }
  },
  categorys: {},//加入分类信息
  productsList: [],//加入列表的商品
  treeWithProds:{},
  current_date:''

}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
