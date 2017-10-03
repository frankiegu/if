<template>
  <div>
    <div class="userInfo">
      <div class="face">
        <img  :src="user.headimgurl"/>
      </div>
      <div class="nickname">
        <p>用户昵称：{{user.nickname}}</p>
      </div>
    </div>

    <div>
      <mt-cell title="我的订单" to="/order">查看</mt-cell>
      <mt-cell title="我的卡券" to="/coupon">查看</mt-cell>
    </div>
    <div style="padding: 10px">
      <mt-button type="primary" size="large" @click="reLogin">切换账号</mt-button>
    </div>
    <foot-guide></foot-guide>
  </div>

</template>
<style scoped>
  .userInfo{
    /*padding-top: 50%;*/
    background-color: #c8b69e;
    display: flex;
    flex-direction: column;
    height: 330px;
    /*justify-content: center;*/
    align-items: center;
    margin-bottom: 15px;
  }
  .face{
    background:url("/static/images/anonymous.jpg") no-repeat 0px 0px;
    -webkit-background-size: 100% 100%;
    background-size:100% 100%;
    width: 100px;
    height:100px;
    border-radius: 55px;
    border:2px solid white;
    margin:160px 0 10px 0;
    overflow: hidden;
  }
  .face img{
    width: 100%;
    height: 100%;
  }
  .nickname{
    color: white;
    font-size: 12px;
  }
</style>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import {user} from '../../service/getData'
  import footGuide from '../../components/footer/footGuide'
//  import {setStore} from '../../config/mUtils'

  export default {
    components:{
      footGuide
    },
    data () {
      return {
      }
    },
    mounted(){

    },
    computed:{
      ...mapState(['user'])
    },
    methods:{
      reLogin(){
//        setStore('token',null)
        this.$router.push({path:'/login'})
      }
    }
  }
</script>

