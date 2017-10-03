<template>

  <div>
    <div>
      <mt-header title="映时尚IF">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
    </div>
    <loadding :show="waitting"></loadding>
    <div class="page-header-main">
      <div v-for="item in treeWithProds.children">
        <div style="text-align: center">
          <label>{{item.category_name}} | {{item.category_name_en}}</label>
        </div>
        <section class="ac-container">
          <div class="title" :ref="item.category_id">{{item.category_name}}</div>
          <div class="page-part" :style="{'display':currentId == item.category_id?'block':'none'}">
            <div v-for="product in item.products" class="item">
              <div class="product-info">
                <img :src="imgBaseUrl+product.pic_thumb"/>
                <div class="text">
                  <h4 class="grey">{{product.product_name}}</h4>
                  <h5 class="grey">{{product.desc}}</h5>
                  <h4 class="grey">￥{{product.shop_price}}</h4></div>
              </div>
              <label class="mint-checklist-label">
                      <span class="mint-checkbox">
                        <!--<input type="checkbox"  :value="product" v-model="selectedProducts">-->

                        <input type="checkbox" class="mint-checkbox-input" :value="product" v-model="selectedProducts">
                        <span class="mint-checkbox-core"></span>
                      </span>
              </label>
            </div>
          </div>

        </section>
      </div>
      <div style="height: 200px;"></div>
      <div class="mint-tabbar is-fixed footer">
        <span class="info"><span id="bag-trigger">{{bagNum}}</span><span class="text" v-if="bagNum>1">组合优惠：￥{{(bagNum-1)*20}}</span></span>

        <span>
          <mt-button @click.native="popupVisible = true" size="small" ref="button" type="primary">预约须知</mt-button>
          <mt-button plain size="small" type="danger" @click="nextStep">下一步</mt-button>
        </span>

      </div>
      <mt-popup v-model="popupVisible" position="right" class="mint-popup" :modal="false">
        <div class="notice">

          <h2 class="title">预约须知 | NOTICE</h2>
          <div class="content">
            <p><span>1.</span>每增加一项服务可优惠20元</p>
            <p><span>2.</span>拍摄当天若因自身原因退款，需要向您收取20%手续费。</p>
            <p><span>3.</span>若有优惠券，请持二维码到店核销。</p>


          </div>
        </div>
        <mt-button @click.native="popupVisible = false" size="large" type="primary">我已阅读</mt-button>
      </mt-popup>
    </div>
  </div>
</template>
<style scoped>
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin-bottom: 10px;
  }

  .item .product-info {
    display: flex;
    align-items: center;

  }

  .item .product-info .text {
    margin: 6px 10px 6px 16px;
    line-height: 30px;

  }

  .item .product-info img {
    width: 100px;
    height: 100px;
  }

  .item text {
    flex: 1
  }

  .footer {
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    padding: 10px;
    background-color: white;
  }

  .footer .info {
    display: flex !important;
    justify-content: space-between;
    z-index: 99;
    padding: 10px;
    background-color: white;
  }

  .footer .info .text {
    line-height: 30px;
    margin-left: 10px;
  }

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

  .notice {
    color: grey;
  }

  .notice .content {
    margin: 20px auto;
    color: grey;
    width: 80%;
    height: 80%;
    border-radius: 8px;
    border: solid rgba(32, 134, 213, 0.49) 1px;
    padding: 20px;
  }

  .notice .content p {

    margin-bottom: 10px;
  }

  .notice .title {
    margin: 25% 0px 0px 0px;

  }

  .page-header-main {
    margin-top: 0px;
    padding: 10px;
  }

  .ac-container {
    width: 100%;
    margin: 15px auto 20px auto;
    text-align: left;
  }

  .ac-container .title {

    padding: 8px 20px;
    position: relative;
    z-index: 20;
    display: block;
    height: 30px;
    color: #777;
    line-height: 33px;
    font-size: 14px;
    background: #ffffff;
    margin-bottom: 10px;
  }

  #bag-trigger {
    background-image: url("/static/bag.svg");
    background-repeat: no-repeat;
    background-position: 0px -1px;
    background-size: 28px 28px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: block;
  }

  .ac-container .title:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    right: 13px;
    top: 7px;
    /*background: transparent url(/static/arrow_down.png) no-repeat center center;*/
  }
</style>


<script type="text/ecmascript-6">

  import {mapState, mapMutations} from 'vuex'
  import {getStore} from 'src/config/mUtils'
  import {Toast} from 'mint-ui'
  import {category} from 'src/service/getData'
  import {imgBaseUrl} from 'src/config/env'
  import loadding from '../../components/loadding/loadding'

  export default {
    name: 'category',
    data() {
      return {
        waitting: false,
        imgBaseUrl: imgBaseUrl,
        currentId: null,
        popupVisible: false,
        selectedProducts: []
      };
    },
    components: {
      loadding
    },
    mounted(){
      this.initData()
//      this.selectedProducts = this.productsList

    },
    computed: {
      ...mapState([
        'productsList', 'treeWithProds'
      ]),
      bagNum(){
        return Object.keys(this.productsList).length
      }
    },
    watch: {
      selectedProducts(val){
//        if(!val.length) return false
        this.ADD_PRODUCTS(val)

      }
    },
    methods: {
      ...mapMutations([
        'ADD_PRODUCTS',
        'UPDATE_CATE_TREE'
      ]),
      async initData(){
        //判断是否有产品分类树，没有就去取
        if ($.isEmptyObject(this.treeWithProds)) {
          //获取数据，这里获取分类树，还要关联产品
          this.waitting = true
          let tree = await category('GET', 'treeWithProds')
          //把树保存至vuex
          this.UPDATE_CATE_TREE(tree)
          this.waitting = false
        }
        if (this.$route.params.id) {
          this.currentId = this.$route.params.id
          this.$nextTick(()=> {
//            this.spread()
          })
        }
        //手风琴效果
        //操作节点要保证在节点生成之后
        this.$nextTick(()=> {
          $('.ac-container .title').click(function () {
//            $(".ac-container .page-part").not($(this).next()).hide()
            $(this).next().slideToggle(500);
          })
        })
      },
      nextStep(){
        //跳转付款页面
        if (!this.selectedProducts.length) {
          Toast('请选择至少一项服务')
          return false
        }

        this.$router.push({path: '/specpage'})

      },
      spread(){
        //展开
        let top = this.$refs[this.currentId][0].offsetTop
        //需要动态效果在这里修改
        $('html,body').animate({scrollTop: top - 60}, 1500);
      }
    }
  }
  ;
</script>

