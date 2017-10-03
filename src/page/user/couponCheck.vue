<template>
  <div>
    <footGuide></footGuide>
  </div>
</template>

<script type="text/ecmascript-6">
  import {userCouponCheck} from '../../service/getData'
  import footGuide from '../../components/footer/footGuide'
  export default {
    data () {
      return {
      }
    },
    components: {
      footGuide
    },
    mounted(){
      this.$messagebox.prompt('请输入核销密码').then(({ value, action }) => {
        this.couponCheck(value)
      });
    },
    methods: {
      async couponCheck(value){
        let res = await userCouponCheck('POST',{},{
          coupon_pwd:value,
          id:this.$route.params.id
        })
        if(res.error_code == '0'){
          this.$messagebox('核销成功！')
        }else{
          this.$messagebox('核销失败或已核销！')

        }
      }
    }
  }
</script>
<style scoped>

</style>
