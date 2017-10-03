<template>
  <div>
    <div>
      <mt-header title="映时尚IF">
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
      <loadding :show="waitting"></loadding>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in banner.data"><img
          v-lazy="imgBaseUrl+item.url" @click="linkTo(item.link)"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="page-navbar">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item :id="index" v-for="(item,index) in treeWithProds.children">{{item.category_name}}</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <div v-for="(item,index) in treeWithProds.children" v-show="selected==index" class="mint-tab-container-item">
          <div v-for="product in item.products">
            <router-link :to="'/category/'+product.category_id" class="item">

              <div class="text">
                <div>
                  <p class="title">{{product.product_name}}</p>
                  <p class="sub-title">{{product.product_name_en}}</p>
                </div>
              </div>
              <div class="image">
                <img :src="imgBaseUrl+product.pic_thumb">
              </div>
            </router-link>
          </div>

        </div>

      </mt-tab-container>
    </div>
    <foot-guide></foot-guide>
  </div>

</template>
<style scoped>
  .mint-swipe {
    height: 70vw;
  }

  .mint-swipe-item img {
    width: 100%;
    height: 100%;
  }

  .mint-tab-container-item {
    padding-bottom: 50px;
    text-align: center;
  }

  .mint-tab-container-item .item {
    background-color: white;
    margin: 20px auto;
    width: 90vw;
    height: 40vw;
    overflow: hidden;
    border-radius: 3px;
    display: flex;
    color: black;

  }

  .mint-tab-container-item .text {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mint-tab-container-item .title {
    font-size: 20px;

  }

  .mint-tab-container-item .sub-title {
    font-size: 8px;

  }

  .mint-tab-container-item .image > img {
    width: 150px;
    /*min-height: 150px;*/
    height:150px;
    display: block;
  }
</style>


<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  import footGuide from '../../components/footer/footGuide'
  import {category,token,banner} from '../../service/getData'
  import {imgBaseUrl} from '../../config/env'
  import loadding from '../../components/loadding/loadding'

  export default {

    data() {
      return {
        banner:[],
        imgBaseUrl:imgBaseUrl,
        treeWithProds: [],
        selected: 0,
        waitting:false
      };
    },
    mounted(){
      //获取banner
      this.getBanner()
      //初始化数据
      this.initData()

    },
    components: {
      footGuide,
      loadding
    },
    computed: {},
    methods: {
      ...mapMutations(['UPDATE_CATE_TREE']),
      async initData(){
        //判断是否有产品分类树，没有就去取
        if($.isEmptyObject(this.treeWithProds)){
          //获取数据，这里获取分类树，还要关联产品
          this.waitting = true
          this.treeWithProds = await category('GET', 'treeWithProds')
          //把树保存至vuex
          this.UPDATE_CATE_TREE(this.treeWithProds)
          this.waitting = false

        }
      },
      async getBanner(){
        this.banner = await banner('GET', '1')

//        this.banner.data = JSON.parse(this.banner.data)
      },
      linkTo(id){
        if(!id) return false
        this.$router.push({name:'product',params:{id:id}})
      }
    }
  };
</script>
