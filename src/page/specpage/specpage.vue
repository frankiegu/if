<template>
  <div>
    <mt-header title="映时尚|IF"></mt-header>
    <div class="page-part" v-for="item in products">
      <mt-cell>
        <div slot="title" style="color:gray;border-bottom: dashed 1px gray;padding: 10px;text-align: center">{{item.product_name+' | '+item.product_name_en}}</div>
      </mt-cell>
      <div class="counter-cell" v-if="item.numSet">
        <span>数量</span>
        <div class="counter">
          <span class="minus" @click='reduce(item.product_id)'>-</span>
          <span class="num">{{cartData.products[item.product_id].num[1]}}</span>
          <span class="plus" @click='increment(item.product_id)'>+</span>
        </div>
      </div>

      <div v-for="(spec_item,key,index) in item.spec" :is="key" :item="spec_item" :product_id="item.product_id">
      </div>
      <mt-cell><span>合计：￥{{prices[item.product_id]}}</span></mt-cell>

    </div>
    <div style="height: 100px"></div>
    <div class="mint-tabbar is-fixed footer">
      <span>合计：￥{{cartData.amount}}  (优惠：￥{{cartData.discount}})</span>
      <span>
        <mt-button plain size="small" type="danger" @click="next">下一步</mt-button>
      </span>

    </div>
  </div>
</template>
<style scoped>
  .footer{
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    padding: 10px;
    background-color: white;
  }
  .counter-cell{
    display:flex;
    justify-content: space-between;
    align-items: center;
    height:50px;
    background-color: white;
    padding:12px;
    font-size:16px;
  }
  .counter{
    border:1px solid gray;
    border-radius:7px;
    display: flex;
    height:30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: gray;

  }

  .counter .num{
    flex:1;

   }
  .counter .minus{
    flex:1;
    border-right:1px solid gray;

  }
  .counter .plus{
    flex:1;
    border-left:1px solid gray;
  }
</style>


<script type="text/ecmascript-6">
import {mapState,mapMutations} from 'vuex'
import {default as required_single}  from './required_single'
import {default as unrequired_single}  from './unrequired_single'
import {default as unrequired_multiple}  from './unrequired_multiple'
import {default as required_multiple}  from './required_multiple'

  export default {
    name: 'specpage',
    data(){
      return {
        products:{},
        preventInfo:[]
      }
    },
    components:{
      required_single,
      unrequired_single,
      unrequired_multiple,
      required_multiple
    },
    created() {
    },
    mounted(){
      document.body.scrollTop =0
      //初始化數據
      this.initData()
      this.products = this.productsList
    },
    activated(){
//      this.products = this.productsList
    },
    computed:{
      ...mapState(['productsList','cartData']),
      prices(){
        let prices = {}
        let amount = parseFloat(0)
        let cart = this.cartData
        this.preventInfo = []
        for (let i in this.cartData.products) {
          let total_price = parseFloat(0)
          let temp = this.cartData.products[i]
          let num = temp.numSet?temp.num[1]:1
          for (let j in temp.spec) {
            //判断是否为必选规格,如果规格必填并且没有数据
            if(temp.spec[j].required){
              this.preventInfo.push({name:temp.product_name})
            }
            if (temp.spec[j].num_related) {
              total_price += parseFloat(temp.spec[j].price) * parseInt(num)
            } else {
              total_price += parseFloat(temp.spec[j].price)
            }
            prices[temp.product_id] = total_price
          }
          cart.products[i].total_price = total_price

          amount += total_price

        }

        cart.amount = amount
        this.UPDATE_CARTDATA(cart)
        return prices
      }
    },
//    watch:{
//      productsList:{
//        handler(){
//          this.products = this.productsList
//        },
//        deep:true
//      }
//    },
    methods: {
    ...mapMutations(['UPDATE_CARTDATA']),
        initData(){
          let cartData = {}
          cartData.products = {}
          let list = $.extend(true, [], this.productsList)
          console.log('productlist')
          console.log(list)

          list.forEach((e)=> {
            let productData = {}
            productData = e
            let spec = {}
            for (let j in e.spec) {
              spec[j] = {data: null, price: 0, num_related: e.spec[j].num_related, required: e.spec[j].required}
            }
            productData.spec = spec
            productData.count = productData.num[1]
            cartData.products[e.product_id] = productData
          })
          cartData.discount = (list.length ? list.length - 1 : 0) * 20
          this.UPDATE_CARTDATA(cartData)

        },
        next(){
        if(this.preventInfo.length){
          console.log(this.preventInfo)
          this.$toast("请先选择"+this.preventInfo[0].name+"规格")
          return
        }
        this.$router.push({path: '/calendar'})
      },
      reduce(id){
        //深拷貝
        let cart = $.extend(true,{},this.cartData)
        if(cart.products[id].num[1] == cart.products[id].num[0]){
          return
        }
        cart.products[id].num[1] =  parseInt(cart.products[id].num[1])
        cart.products[id].num[1] -= 1
        cart.products[id].count = cart.products[id].num[1]
        this.UPDATE_CARTDATA(cart)
      },
      increment(id){
        //触发vuex内的方法
        let cart = $.extend(true,{},this.cartData)
        if(cart.products[id].num[1] == cart.products[id].num[2]){
          return
        }
        cart.products[id].num[1] =  parseInt(cart.products[id].num[1])
        cart.products[id].num[1] += 1
        cart.products[id].count = cart.products[id].num[1]
        this.UPDATE_CARTDATA(cart)
      }
    }
  };
</script>

