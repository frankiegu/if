<template>
  <div class="login">
    <!--<mt-header title="登陆">-->
      <!--<router-link to="/" slot="left">-->
        <!--<mt-button icon="back">返回</mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->
    <div class="login-header">
      <div>
        <span @click="$router.go(-1)">返回</span>
        <span  style="font-size:20px;">登录</span>
        <router-link to="/register"><span>注册</span></router-link>
      </div>
    </div>
    <div class="logo">
      <img src="/static/images/logo.png" style="width: 100%"/>
    </div>
    <div class="form">
      <input v-model="form.tel" type="text" placeholder="用户名"/>
      <input v-model="form.password" type="password" placeholder="密码"/>
    </div>
    <div>
      <mt-button type="primary" size="normal"class="btn" @click="login">登录</mt-button>
      <router-link to="/forget"><p class="forget">忘记密码？</p></router-link>
    </div>
    <div class="third-party">
      <div class="title">
        <span class="line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>其他登录方式</span>
        <span class="line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <div class="icons">
        <img src="/static/icon/wx.svg" @click="getToken">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {loginIn,getToken} from '../../service/getData'
  import {setStore} from '../../config/mUtils'
  export default {
    data(){
      return {
        form: {
          tel: null,
          password: null
        }
      }
    },
    mounted(){
    },
    methods: {
      async login(){
        //验证手机号
        if (!this.checkTel(this.form.tel)) {
          this.$toast('请输入正确的手机号码！')
        }
        //登录
        let res = await loginIn('POST',{},{
          tel:this.form.tel,
          password:this.form.password
        })
        if(res.error_code == 10008){
          this.$toast('账号或密码错误！')
          return false
        }
        if(res.token){
          //保存token
          setStore('token',res.token)
          //跳转首页
          this.$router.push({path:'/'})
        }
      },
      //验证手机号
      checkTel(val){
        let validate = /^1[34578]\d{9}$/
        if (!validate.test(val)) {
          return false
        }else{
          return true
        }
      },
      getToken(){
        getToken()
      }
    },
  }

</script>

<style lang="less" scoped>
  @theme-color : #758dcd;
  @placeholder : black;

  .login{
    position: fixed;
    padding:0px;
    width: 100vw;
    /*min-height: 600px;*/
    height:100%;
    margin-bottom: 0px;
    text-align: center;
    background:url('/static/images/login_background.png') 0px 0px no-repeat;
    background-size:100% 100%;
    .login-header{
      position: fixed;
      width: 100%;
      top: 0;
      height:auto;
      div{
        padding:20px;
        width: auto;
        display: flex;
        justify-content: space-between;
        color:white;
        span{
          color: white;
        }
      }
    }
    .form {
        ::-webkit-input-placeholder { /* WebKit browsers */
          color: @placeholder;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: @placeholder;
          opacity: 1;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: @placeholder;
          opacity: 1;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: @placeholder;
        }

      input {
        background-color: rgba(255, 255, 255, 0.5);
        color: black;
        outline: none;
        border-radius: 20px;
        border: none;
        height: 40px;
        width: 60%;
        margin: auto;
        margin-bottom: 5px;
        display: block;
        text-indent: 20px;
      }
    }

    .btn{
      margin: 10px;
      width: 200px;
      border-radius: 30px;
    }
    .forget{
      color: white;
    }
  }

  .logo{
    margin: 100px auto 30px auto;
    width: 100px;
    height:100px;
    border-radius: 50px;
    overflow: hidden;
    border:0.5px solid white;
  }
  .third-party{
    padding:30px;
    color:white;
    .title{
      margin:10px auto;
      display:flex;
      justify-content:space-between;
    }
    .icons{
      width: 100%;
      display:flex;
      justify-content:space-between;
      text-align:center;
      img{
        margin:10px auto;
        width: 60px;
        height: 60px;
      }
    }
    .line{
      text-decoration: line-through;
    }
  }


</style>
