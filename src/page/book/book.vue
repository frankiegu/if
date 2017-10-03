<template>
  <div style="padding-bottom: 100px;">
    <div>
      <mt-header title="映时尚IF">
        <!--<router-link to="/" slot="left">-->
          <!--<mt-button icon="back">返回</mt-button>-->
        <!--</router-link>-->
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
    </div>

    <mt-swipe :auto="4000">
      <mt-swipe-item><img
      src="/static/images/store.jpg"/>
      </mt-swipe-item>
      <mt-swipe-item><img
        src="/static/images/store2.jpg"/>
      </mt-swipe-item>
      <mt-swipe-item><img
        src="/static/images/meijia.jpg"/>
      </mt-swipe-item>
    </mt-swipe>

    <div class="page-part">
      <label class="mint-checklist-title">门店地址</label>
      <div class="address">
        <div class="logo">
          <img src="/static/images/logo.png" style="width: 100%"/>
        </div>
        <div>
          <p>{{info.app_name}}</p>
          <p>{{info.address}}</p>
          <p>客服电话：{{info.tel}}</p>
        </div>
      </div>
    </div>
    <!--<div class="page-part">-->
    <!--<label class="mint-checklist-title">服务</label>-->
    <!--<div class="service">-->
    <!--<i>图标</i><i>图标</i><i>图标</i>-->
    <!--</div>-->
    <!--</div>-->
    <div style="padding: 10px">
      <router-link to="/category">
        <mt-button size="large" type="primary">立即预约</mt-button>
      </router-link>
    </div>
    <div style="width: 100%;text-align: center">
      <img style="width: 100%;margin: auto" src="/static/images/address.png"/>
    </div>

    <foot-guide></foot-guide>
  </div>

</template>
<style scoped>
  .address {
    padding: 10px;
    background-color: white;
    display: flex;
  }

  .address > div {
    padding: 10px;

  }

  .address > div p {
    line-height: 20px;
    font-size: 12px;

  }
  .logo{
    display: block;
    width: 80px;
    height:80px;
    border-radius: 50px;
    overflow: hidden;
    background-color: #00b2ff;
  }
  .mint-swipe {
    height: 60vw;
  }

  .mint-swipe-item img {
    width: 100%;
    height: 100%;
  }

  .mint-tab-container-item {
    text-align: center;
  }
</style>


<script type="text/ecmascript-6">
  import footGuide from '../../components/footer/footGuide'
  import {getStoreInfo} from '../../service/getData'
  export default {

    data() {
      return {
        selected: '1',
        info:{}
      }
    },
    components: {
      footGuide
    },
    mounted(){
      this.initData()
    },
    methods: {
      async initData(){
        this.info = await getStoreInfo('GET',{})
      }
    }
  }
</script>
