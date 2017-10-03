<template>
  <div>
    <div style="text-align: center" v-if="paid == 1">
      <div style="margin-top: 20%">
        <img src="/static/icon/paid.svg" style="width: 30%"/>
        <h2>支付成功</h2>
        <p style="line-height: 30px;color: #999">请等待工作人员与您联系</p>
        <div class="order-info" v-if="payment == 'wxpay'">
          <p><span>订单号：</span><span>SDTWESCDGRDF</span></p>
          <p><span>支付方式：</span><span>微信支付</span></p>
          <p><span>联系人：</span><span>xxx</span></p>
          <p><span>订单金额：</span><span>￥：200</span></p>
        </div>
      </div>
    </div>
    <div style="text-align: center" v-if="paid == 'alipay'">
      <div style="margin-top: 20%">
        <img src="/static/icon/fail.svg" style="width: 25%"/>
        <h2>支付失败</h2>
        <p style="line-height: 30px;color: #999">很抱歉，支付异常！</p>
      </div>
    </div>
    <div class="pay-footer">
      <router-link to="/order"><span>订单详情</span></router-link>
      <router-link to="/"><span>返回首页</span></router-link>
    </div>
  </div>

</template>
<style scoped>
  .order-info{
    margin: 10px;
    border-radius: 10px;
    padding:16px;
    background-color: white;
  }
.order-info>p{
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}
  .pay-footer{
    position: fixed;
    bottom:50px;
    width: 100%;
    text-align: center;
  }
  .pay-footer span{
    margin: 10px;
    color:#69e01c;
    border:solid #69e01c 1px;
    /*display: block;*/
    padding:8px 20px 8px 20px;
    border-radius: 25px;
  }
</style>
<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import loadding from '../../components/loadding/loadding'
  import {getPreOrder} from '../../service/getData'

  export default {
    data () {
      return {
        order_id:null,
        payment:null,
        paid:null,
      }
    },
    components: {

    },
    computed: {

    },
    mounted(){
      this.payment = this.$route.query.payment
      this.order_id = this.$route.query.id
      this.pay()

    },
    methods:{
      async pay(){
        let data = this.$route.query
        let res = await getPreOrder('POST',{},data)
        if(res.error_code == ''){

        }
      }
    }
  }
</script>

