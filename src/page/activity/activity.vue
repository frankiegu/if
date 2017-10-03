<template>
  <div>
    <vue-event-calendar :events="events"></vue-event-calendar>
    <footGuide></footGuide>
    <loadding :show="waitting"></loadding>
    <div style="margin-top:-50px;margin-bottom:50px">
      <couponTag v-for="(coupon,index) in coupons"
                 :title="coupon.title"
                 :start="coupon.start"
                 :end="coupon.end"
                 :color="coupon.color">
        <div slot="price">
          <p style="font-size: 20px;">现价:￥{{coupon.current_price}}</p>
          剩余：{{coupon.num}}张 原价:￥<span style="text-decoration: line-through;">{{coupon.original_price}}</span>
        </div>
        <div slot="desc">
          <p>{{coupon.desc}}</p>
        </div>
        <div slot="handle">
          <mt-button size="small" type="default" @click="receive(index,coupon.coupon_id)">领取</mt-button>
        </div>
      </couponTag>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {coupon, userCoupon, getCouponByDate, getCouponsMark} from '../../service/getData'
  import footGuide from '../../components/footer/footGuide'
  import {default as couponTag} from '../../components/coupon'
  import loadding from '../../components/loadding/loadding'

  export default {
    data () {
      return {
        waitting: false,
        events: [],
        coupons: [],
        activityDateList: []
      }
    },
    components: {
      footGuide,
      couponTag,
      loadding
    },
    computed: {
      ...mapState([
        'current_date', 'month'
      ])
    },
    mounted(){
      this.initData()
      this.getCoupons()
      this.getCouponsMark(this.month)
    },
    watch: {
      current_date(val){
        //当前日期变动，获取当日优惠券
        if ($.inArray(val, this.activityDateList) <= -1) {
          this.coupons = []
          return false
        }
        this.getCoupons(val)
      },
      month(month){
        this.getCouponsMark(month)
      }
    },
    methods: {
      async initData(){
        //获取优惠券

      },
      async receive(index, id){
        this.watting = true
        let res = await userCoupon('POST', id)
        this.watting = false
        if (res.error_code == '0') {
          //领取成功,是否查看优惠券
          this.$messagebox.confirm('领取成功,是否查看优惠券？', '').then(
            () => {
              this.$router.push({path: '/coupon'})
            },
            ()=> {
              return false
            }
          )
          this.coupons.splice(index, 1)
        } else if (res.error_code == '90001') {
          //已经领取过了
          this.$messagebox.confirm('您已经领取过了,是否查看优惠券？', '').then(
            () => {
              this.$router.push({path: '/coupon'})
            },
            ()=> {
              return false
            }
          )
        }

      },
      async getCoupons(val = ''){
        this.waitting = true
        this.coupons = await getCouponByDate('GET', {date: val})
        this.waitting = false
      },
      async getCouponsMark(month){
        this.waitting = true
        let res = await getCouponsMark('GET', {month: month})
        this.activityDateList = res
        res.forEach((e)=> {
          this.events.push({date: e, activity: true})
        })
        this.waitting = false
      }
    }
  }
</script>

