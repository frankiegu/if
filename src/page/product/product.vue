<template>
  <div>
    <div>
      <mt-header title="映时尚IF">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="page-header-main">
      <div class="page-part">
        <div class="item" v-for="item in data">
          <label class="mint-checklist-title">{{item.category_name}} | {{item.category_name_en}}</label>
          <div v-for="product in item.product">
            <div class="product-info">
              <img :src="product.thumb" />
              <div class="text">
                <h4 class="grey">{{product.product_name}}</h4>
                <h5 class="grey">{{product.desc}}</h5>
                <h4 class="grey">￥{{product.shop_price}}</h4></div>
            </div>
            <label class="mint-checklist-label">
            <span class="mint-checkbox">
              <input type="checkbox" class="mint-checkbox-input" :value="product" v-model="selectedProducts">
              <span class="mint-checkbox-core"></span>
            </span>
            </label>
          </div>
        </div>
      </div>
      <div class="mint-tabbar is-fixed">

        <mt-button @click.native="popupVisible = true" size="small" ref="button" type="primary">预约须知</mt-button>
        <mt-button plain size="small" type="danger" @click="nextStep">下一步</mt-button>


      </div>
      <mt-popup v-model="popupVisible" position="right" class="mint-popup" :modal="false">
        <div class="notice">

          <h2 class="title">预约须知 | NOTICE</h2>
          <div class="content">
            <p><span>1.</span>改约时间可前往订单中心自助操作，最多可改约2次，拍摄当天不可改约。</p>
            <p><span>2.</span>加约任意套系可优惠30元（限本人拍摄，也包括多人文艺照、全家福）。</p>
            <p><span>3.</span>拍摄当天若因自身原因退款，需要向您收取20%手续费。</p>
            <p><span>4.</span>请持二维码到店核销。</p>


          </div>
        </div>
        <mt-button @click.native="popupVisible = false" size="large" type="primary">我已阅读</mt-button>
      </mt-popup>
    </div>
    </div>
</template>
<style scoped>
  .item{

  }
  .item>div{
    background-color: white;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .item .product-info{
    display:flex;
    align-items: center;
  }
  .item .product-info .text{
    margin:6px 10px 6px 16px;
    line-height: 20px;
  }
  .item .product-info img{
    width:100px;
    height:100px;
  }
  .item text{
    flex:1
  }
  .item .check{
    flex:1
  }
  .mint-tabbar{
    text-align: right;
    display: block;
    padding:6px;
    background-color: white;
  }
  .mint-popup {
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center;
    background-color: #fafafa;
  }

  .mint-popup .mint-button {
    width: 80%;
    margin: 10px auto;
  }
  .notice{
    color:grey;
  }
  .notice .content{
    margin: 20px auto;
    color:grey;
    width: 80%;
    height: 80%;
    border-radius: 8px;
    border: solid rgba(32, 134, 213, 0.49) 1px;
    padding:20px;
    /*background-color: white;*/
  }
  .notice .content p{

    margin-bottom: 10px;
  }
  .notice .title{
    margin: 25% 0px 0px 0px;

  }
  .page-header-main{
    margin-top: 0px;
  }

</style>


<script>
  import {mapMutations} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
    data() {
      return {
        data,
        popupVisible: false,
        selectedProducts: [],
      };
    },
    components:{
    },
    created() {
    },
    mounted(){

    },
    methods:{
      ...mapMutations([
        'ADD_PRODUCTS'
      ]),
      nextStep(){
        //跳转付款页面
        if(!this.selectedProducts.length){
          Toast('请选择至少一项服务')
          return false
        }
        //加入购物车
        this.ADD_PRODUCTS ({list:this.selectedProducts})
        this.$router.push({ path: '/calendar'})

      }
    }
  };
</script>

