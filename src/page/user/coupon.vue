<template>
  <div>
    <mt-header title="我的卡券">
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <footGuide></footGuide>
    <div class="spinner" v-show="waitting">
      <div>
        <mt-spinner :size="60" color="#26a2ff" type="fading-circle"></mt-spinner>
      </div>
    </div>
    <div style="margin-bottom:50px">
      <couponTag v-for="item in coupons"
                 :title="item.coupon.title"
                 :start="item.coupon.start"
                 :end="item.coupon.end"
                 :color="item.coupon.color">
        <div slot="price">
          <p style="font-size: 20px;">现价:￥{{item.coupon.current_price}}</p>
          原价:￥<span style="text-decoration: line-through;">{{item.coupon.original_price}}</span>
        </div>
        <div slot="desc">
          <p>{{item.coupon.desc}}</p>
        </div>
        <div slot="handle">
          <mt-button size="small" type="default" @click="show(item.coupon.coupon_id)">使用</mt-button>
        </div>
      </couponTag>
    </div>
    <mt-popup v-model="popupVisible" position="right" class="mint-popup" :modal="false">
      <div class="notice">

        <h2 class="title">使用说明 | NOTICE</h2>
        <div>
          <canvas style="width: 300px" id="canvas"></canvas>
        </div>
        <div class="content">
          <p><span>1.</span>到店向工作人员出示此二维码即可享受优惠</p>


        </div>
      </div>
      <mt-button @click.native="popupVisible = false" size="large" type="primary">我知道了</mt-button>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {userCoupon} from '../../service/getData'
  import footGuide from '../../components/footer/footGuide'
  import {default as couponTag} from '../../components/coupon'
  import {Spinner} from 'mint-ui'
  import QRCode from 'qrcode'
  import {baseUrl} from '../../config/env'
  export default {
    data () {
      return {
        id:null,
        waitting: false,
        coupons:[],
        popupVisible:false
      }
    },
    components: {
      footGuide,
      couponTag
    },
    mounted(){
      this.initData()
    },
    methods: {
      async initData(){
        //获取优惠券
        this.coupons = await userCoupon('GET',{})
      },
      show(id){
        this.id = id
        QRCode.toCanvas(canvas, window.location.host+'/#/couponCheck/'+this.id, {scale:6},function (error) {
          if (error) console.error(error)
          console.log('success!');
        })
        this.popupVisible = true

      }
    }
  }
</script>
<style scoped>
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
  .mint-popup .notice{
    margin-top: 20%;
  }
  #canvas{
    margin: 30px;
  }
</style>
