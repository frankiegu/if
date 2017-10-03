<template>
  <div>
    <mt-header fixed title="订单"></mt-header>
    <div class="page-header-main">
      <div class="page-part">
        <label class="mint-radiolist-title">基本信息</label>
        <!--<mt-cell title="标题文字"></mt-cell>-->
        <mt-cell value="重新选择" @click.native="$router.go(-1)">
          <div slot="title">
            <span>时间：</span><span style="color:grey;">{{cartData.book_time}}</span>
          </div>
        </mt-cell>
        <mt-cell title="已选服务："></mt-cell>
        <div class="content">
          <div class="content-item" v-for="item in cartData.products">
            <p>{{item.product_name}}</p>
            <p>￥{{item.total_price}}</p>
          </div>
        </div>
        <mt-cell title="组合优惠">￥{{cartData.discount}}</mt-cell>
        <!--<mt-cell title="抵价券">￥200.00</mt-cell>-->
      </div>

      <div class="page-part">
        <label class="mint-radiolist-title">用户信息</label>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="linkman"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="tel"></mt-field>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">生日</span>
            </div>
            <div class="mint-cell-value">
              <p class="mint-field-core" style="color:#767676;" v-if="!birthday" @click="openPicker">请选择日期</p>
              <p class="mint-field-core" v-if="birthday" @click="openPicker">{{birthday}}</p>
            </div>
          </div>
        </a>
        <mt-radio
          v-model="sex"
          align="right"
          :options="['男', '女']">
        </mt-radio>
      </div>
      <div class="page-part">
        <mt-radio
          align="right"
          title="支付方式"
          v-model="paymentSlected"
          :options="payment">
        </mt-radio>
      </div>


      <mt-datetime-picker
        ref="picker"
        type="date"
        :startDate="startDate"
        @confirm="handleConfirm">
      </mt-datetime-picker>

      <div class="mint-tabbar is-fixed">
          <span>
            <b class="settlement-amount">总计:￥{{cartData.amount}}</b>
            <span class="settlement-discount">（优惠:￥{{cartData.discount}}）</span>
          </span>
        <mt-button type="primary" @click="createOrder">{{btnMsg}}</mt-button>
      </div>
    </div>

  </div>
</template>
<style scoped>
  .content {
    padding: 5px;
    background-color: white;
  }

  .content-item {
    display: flex;
    justify-content: space-between;
    color: #26a2ff;
    padding: 5px;
    font-size: 15px;
  }

  .mint-tabbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: white;
    height: 30px;
  }


</style>
<script type="text/ecmascript-6">
  import {dateFormat} from 'src/config/mUtils'
  import {mapState, mapMutations} from 'vuex'
  import {getStore} from 'src/config/mUtils'
  import {order} from 'src/service/getData'
  import {Toast} from 'mint-ui'
  export default {
    prop: [],
    data () {
      return {
        tel: null,
        sex: '',
        birthday: '',
        linkman: '',
        btnMsg: '下单',
//            payment:[
//              {
//                label: '微信',
//                value: 'wxpay'
//              },
//              {
//                label: '支付宝',
//                value: 'alipay'
//              }
//            ],
        payment: [
          {
            label: '微信',
            value: 'wxpay'
          }
        ],
        paymentSlected: 'wxpay'

      }
    },
    computed: {
      ...mapState(['cartData']),
      startDate(){
        return new Date(1969, 12, 1)
      }
    },
    mounted(){
      //判断是否有商品信息，没有返回首页
      if ($.isEmptyObject(this.cartData.products)) {
        this.$router.push({path: '/'})
      }
    },
    methods: {
      ...mapState(['UPDATE_CARTDATA']),
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(value) {
        this.birthday = dateFormat(value, '/');
      },
      async createOrder(){
        //检查用户信息
        if (this.linkman == '') {
          Toast('请填写用户名')
          return
        }
        if (this.sex == '') {
          Toast('请选择性别')
          return
        }
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(this.tel))
        {
          Toast('请输入有效的手机号码！');
          return
        }
        //发送数据到后台
        let data = {}
        data.userInfo = {}
        data.userInfo.linkman = this.linkman
        data.userInfo.birthday = this.birthday
        data.userInfo.tel = this.tel
        data.userInfo.sex = this.sex
        data.book_time = this.cartData.book_time
        data.pay_id = this.pay_id
        data.products = []
        //把商品转化成数组形式
        for (let i in this.cartData.products) {
          data.products.push(this.cartData.products[i])
        }
        let res = await order('POST', '', data)
        if (typeof(res.order_id) !== 'undefined') {
          //订单创建成功，去生成支付订单
          if (this.paymentSlected == 'wxpay') {
            let token = getStore('token');
//            let url = '/static/pay/wxpay.html?token=' + token + '&order_id=' + res.order_id + '&payment=' + 'wxpay';
            window.location.href = 'http://'+window.location.host+'/static/pay/wxpay.html?token=' + token + '&order_id=' + res.order_id + '&payment=' + 'wxpay';
          }
        }
      }
    }
  }
</script>
