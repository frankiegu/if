<template>
  <div>
    <loadding :show="waitting"></loadding>

    <div class="page-navbar">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item :id="key" v-for="(item,key,index) in payStatus">{{item.name}}</mt-tab-item>
      </mt-navbar>
      <div v-load-more="loaderMore">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item :id="key" v-for="(item,key,index) in payStatus">
            <div v-for="order in ordersList[key]" class="page-part">
              <mt-cell :title="'订单号：'+order.order_sn">
                <span>{{orderStatus[order.order_status]}}</span>
              </mt-cell>

              <div class="content">
                <p class="content-item"><span>下单时间：</span><span>{{order.create_time}}</span></p>
                <p class="content-item"><span>预约时间：</span><span>{{order.book_time}}</span></p>

                <p class="content-item">商品信息:</p>
                <div class="product-info">
                  <p v-for="product in order.products" class="list">
                    <span>{{product.product_name}}</span>
                    <span>￥{{product.total_price}}</span>
                  </p>
                </div>
                <p class="content-item"><span>商品总价：</span><span>￥{{order.products_price}}</span></p>
                <p class="content-item"><span>组合优惠：</span><span>￥{{order.discount}}</span></p>
                <p class="content-item"><span>实付金额：</span><span>￥{{order.amount}}</span></p>
              </div>
              <mt-cell>
                <mt-button type="danger" size="small" v-if="order.order_status == '0'" @click="repay(order.order_id)">去支付</mt-button>
                <mt-button type="danger" size="small" v-if="order.order_status == '1'" @click="goHome">再来一单</mt-button>
                <mt-button type="danger" size="small" v-if="order.order_status == '2'" @click="goHome">重新下单</mt-button>
                <mt-button type="danger" size="small" v-if="order.order_status == '3'" @click="goHome">再来一单</mt-button>
              </mt-cell>


            </div>


          </mt-tab-container-item>

          <!--<div v-for="(item,index) in payStatus" id="" class="mint-tab-container-item">-->
          <!--<div v-for="order in ordersList" class="page-part" v-if="index == 0|| order.order_status == item.code">-->

          <!--<mt-cell :title="'订单号：'+order.order_sn">-->
          <!--<span v-if="order.order_status == 0">已付款</span>-->
          <!--<span v-if="order.order_status == 1">已完成</span>-->
          <!--</mt-cell>-->

          <!--<div class="content">-->
          <!--<p class="content-item"><span>下单时间：</span><span>{{order.add_time}}</span></p>-->
          <!--<p class="content-item"><span>预约时间：</span><span>{{order.book_time}}</span></p>-->

          <!--<p class="content-item">商品信息:</p>-->
          <!--<div class="product-info">-->
          <!--<p v-for="product in order.products" class="list">-->
          <!--<span>{{product.product_name}}</span>-->
          <!--<span>￥{{product.total_price}}</span>-->
          <!--</p>-->
          <!--</div>-->
          <!--<p class="content-item"><span>组合优惠：</span><span>￥{{order.discount}}</span></p>-->
          <!--<p class="content-item"><span>实付金额：</span><span>￥{{order.amount}}</span></p>-->

          <!--</div>-->


          <!--</div>-->
          <!--</div>-->

        </mt-tab-container>
      </div>
    </div>

    <foot-guide></foot-guide>
    <div v-if="showPayment">
      <div class="mask" @click="showPayment = !showPayment">
      </div>
      <div class="repay">
        <div>
          <mt-radio style="text-align: left"
                    align="right"
                    title="支付方式"
                    v-model="paymentSlected"
                    :options="payment">
          </mt-radio>
          <mt-button size="large" type="danger" class="pay-btn" @click="pay">去支付</mt-button>
        </div>

      </div>
    </div>
  </div>

</template>
<style scoped>
  .content {
    padding: 15px;
    background-color: white;
  }

  .content-item {
    display: flex;
    justify-content: space-between;
    color: gray;
    padding: 5px;
    font-size: 15px;
  }

  .product-info {
    padding: 5px;
    color: #00b2ff;
  }

  .product-info .list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0px;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    /*background-color: #00b2ff;*/
  }

  .repay {
    text-align: center;
    position: fixed;
    width: 100%;
    z-index: 999;
    top: 30%;
  }

  .repay > div {
    background-color: white;
    border-radius: 10px;
    margin: auto;
    padding: 20px;
    width: 80%;
    height: auto;

  }
  .repay .pay-btn{
    margin-top: 20px;
  }
  .page-navbar{
    padding-bottom: 100px;
  }
</style>


<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  import footGuide from '../../components/footer/footGuide'
  import {order, getOrderByPayStatus} from '../../service/getData'
  import loadding from '../../components/loadding/loadding'
  import {loadMore} from '../../components/common/mixin'
  import {orderStatus, payStatus} from '../../config/enum'
  import {getStore} from '../../config/mUtils'

  export default {

    data() {
      return {
        order_id:null,
        showPayment: false,
        waitting: false,
        selected: 'all',
        payStatus,
        orderStatus,
        ordersList: {
          all: [],
          unpaid: [],
          paid: []
        },
        preventRequest: false,
//        payment: [
//          {
//            label: '微信',
//            value: 'wxpay'
//          },
//          {
//            label: '支付宝',
//            value: 'alipay'
//          }
//        ],
        payment:[
          {
            label: '微信',
            value: 'wxpay'
          }
        ],
        paymentSlected: 'wxpay'

      }
    },
    mounted(){

      this.initData()

    },
    mixins: [loadMore],
    components: {
      footGuide,
      loadding
    },
    computed: {},
    watch: {
      selected(val){
        if (!this.ordersList[val].length) {
          this.loaderMore()
        }
      }
    },
    methods: {
      async initData(){
        this.waitting = true
        let res = await order('GET', {limit: 3, offset: 0})
        this.ordersList.all = res
        this.waitting = false
//        this.ordersList = temp
//        this.selected = 'all'
//        let res = await getOrderByPayStatus('GET', {status: this.selected, limit: 3, offset: 0})
      },
      async loaderMore(){
        //防止重复加载
        if (this.preventRequest) return false
        this.preventRequest = true
        this.waitting = true
        //检查是那个要请求数据
        if (this.selected == 'all') {
          //all数据要更新
          console.log(this.ordersList)
          let offset = this.ordersList['all'].length
          let res = await order('GET', {limit: 3, offset: offset})
          this.ordersList['all'] = [...this.ordersList['all'], ...res]

        } else {
          let offset = this.ordersList[this.selected].length
          let status = payStatus[this.selected].status
          let res = await getOrderByPayStatus('GET', {pay_status: status, limit: 3, offset: offset})
          this.ordersList[this.selected] = [...this.ordersList[this.selected], ...res]
        }
        this.preventRequest = false
        this.waitting = false
      },
      repay(order_id){
        this.showPayment = true
        this.order_id = order_id
      },
      pay(){
        this.showPayment = false
        let token = getStore('token')
        if(this.paymentSlected == 'wxpay'){
          window.location.href = '/static/pay/wxpay.html?token=' + token + '&order_id=' + this.order_id + '&payment=' + 'wxpay';
        }
      },
      goHome(){
        this.$router.push({path:'/'})

      }
    }
  };
</script>
