<template>
  <div style="background-color: #a2110c;">
    <div id="raysDemoHolder">

      <transition name="bounce" enter-active-class="animated bounceIn" leave-active-class="animated zoomOut">
        <div v-show="box" id="box"></div>
      </transition>
      <div id="rays"></div>
    </div>
    <div class="content">
      <div class="header">
        <img src="/static/images/coupontext.png"/>
      </div>
      <transition name="bounce" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
        <couponTag v-if="show"
                   :title="coupon.title"
                   :start="coupon.start"
                   :end="coupon.end"
                   :color="coupon.color">
          <div slot="price">
            <p style="font-size: 20px;">现价:￥{{coupon.current_price}}</p>
            原价:￥<span style="text-decoration: line-through;">{{coupon.original_price}}</span>
          </div>
          <div slot="desc">
            <p>{{coupon.desc}}</p>
          </div>
          <div slot="handle">
            <mt-button size="small" type="default" @click="show(coupon.coupon_id)">公众号</mt-button>
          </div>
        </couponTag>
      </transition>
      <div class="info" v-show="show">
        <div class="illustrate">
          <p>使用说明</p>
          <p>1.请妥善保存该二维码，截屏保存或访问公众号再次查看</p>
          <p>2.到店向工作人员出示此二维码即可享受优惠</p>
        </div>
        <div>
          <canvas id="canvas"></canvas>
        </div>
      </div>
      <span v-if="box" class="btn" @click="open">开箱</span>
      <router-link to="/coupon">
        <span v-if="show" class="btn" @click="">查看我的卡券</span>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
  .header {
    width: 100%;
    height: auto;
  }

  .header img {
    width: 75%;
    height: auto;
  }

  .content {
    z-index: 99;
    position: relative;
    width: 100vw;
    height: 100vh;
    text-align: center;
    overflow: hidden;
    padding-bottom: 100px;

  }

  .content .btn {
    position: fixed;
    bottom: 10%;
    left: 20%;
    display: block;
    margin: auto;
    width: 60%;
    line-height: 40px;
    height: 40px;
    border-radius: 25px;
    border: solid yellow 1px;
    color: white;

  }

  .info {
    color: white;
    display: flex;
    padding: 15px;
    justify-content: space-between;
  }

  .info .illustrate {
    width: 50%;
    text-align: left;
    line-height: 25px;
  }

  .info p {
    word-break: break-all;
  }

  #canvas {
    width: 100px;
    height: 100px;
  }

  /* 用来实现动画的keyframes;  从0度旋转到360度 */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* 实现光线辐射效果 */
  #raysDemoHolder {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(/static/images/redbag.png) 0 40% no-repeat;
    background-size: 100%;
    text-align: center;
  }

  #box {
    margin: auto;
    position: relative;
    width: 150px;
    height: 150px;
    top: 30%;
    background: url(/static/images/box.png) 0 0 no-repeat;
    background-size: 100% 100%;
    z-index: 99;
  }

  #rays { /* 表现动画效果 */
    background: url(/static/images/rays.png) 0 0 no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: -25%;
    width: 150vw;
    height: 150vw;

    /* microsoft ie */
    animation-name: spin;
    animation-duration: 40000ms; /* 40 seconds */
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  #rays:hover {
    /* animation-duration: 10000ms;*/
    /* 10 seconds - speed it up on hover! */
    /* resets the position though!  sucks */
  }
</style>

<script type="text/ecmascript-6">

  import {mapState, mapMutations} from 'vuex'
  import {coupon, userCoupon} from '../../service/getData'
  import couponTag from '../../components/coupon'
  import QRCode from 'qrcode'
  import {baseUrl} from '../../config/env'

  export default {
    data () {
      return {
        box: false,
        show: false,
        coupon: {},

      }
    },
    components: {
      couponTag
    },
    computed: {},
    mounted(){
      this.box = true
      this.initData()
      QRCode.toCanvas(canvas, window.location.host + '/#/couponCheck/' + this.$route.params.id,
        function (error) {
          if (error) console.error(error)
          console.log('success!');
        })
    },
    watch: {},
    methods: {
      async initData(){
        let res = await coupon('GET', this.$route.params.id)
        if (res.error_code == '10001') {
          this.$messagebox('没有找到相关优惠券！').then(()=> {
            this.$router.push('/activity')
          })
        } else {
          this.coupon = res
        }

      },
      async open(){
        //去领取优惠券
        let res = await userCoupon('POST', this.$route.params.id)
        if (res.error_code == '90001') {
          //已经领取过了
          this.$messagebox('', '您已经领取过了')
          return
        } else if (res.error_code == '90003') {
          this.$messagebox(res.msg).then(()=> {
            this.$router.push('/activity')
          })
          return
        }
        //领取成功

        this.box = false
        this.show = true
      }
    }
  }
</script>

