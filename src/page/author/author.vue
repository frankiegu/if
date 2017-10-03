<template>
  <div class="background">
  </div>

</template>
<style scoped>
  .background {
    background-color: greenyellow;
    background: url('/static/images/cover.jpg') 0px 0px no-repeat;
    background-size: 100% 100%;
    width: 110vw;
    height: 100vh;
  }
</style>


<script type="text/ecmascript-6">
  import footGuide from '../../components/footer/footGuide'
  import {getToken, verifyToken,user} from '../../service/getData'
  import {getStore, setStore} from '../../config/mUtils'
  export default {

    data() {
      return {}
    },
    components: {},
    activated () {
      // 检测会员有没有登录
      if (!getStore('token')) {
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          // 跳转到微信授权页面
          getToken()
        }else{
          //另外一种登陆
          //这里采用账号密码登录
          this.login()
        }
      } else {
        // 有token
        this.checkToken()

      }
    },
    mounted(){

    },
    methods: {
      async checkToken(){
        //去验证token
        let res = await verifyToken('POST', {}, {token: getStore('token')})
        if (res.isValid) {
          this.getUser()
        }else{
          //token失效，去重新认证
          var ua = window.navigator.userAgent.toLowerCase()
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            // 跳转到微信授权页面
            getToken()
          }else{
            this.login()
          }
        }
      },
      login(){
        //跳转到登录页面
        this.$router.push({path:'/login'})
      },
      async getUser(){
        //获取头像信息
        let userInfo = await user('GET',{})
        if(userInfo.id){
          this.$store.commit('USER', userInfo)
          //跳转回用户进入页面
          if(getStore('beforeLoginUrl')){
            this.$router.push({path:getStore('beforeLoginUrl')})
          }else{
            this.$router.push({path:'/'})
          }
        }
      },
    }
  }
</script>
