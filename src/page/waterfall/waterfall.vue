<template>
  <div>
    <div>
      <router-link id="book" :to="'/category/'+$route.params.categoryId">
        <span>预约</span>
      </router-link>
      <div id="product-detail" :class="{'show-up':!itemListShow,'hidden':itemListShow}">
        <mt-header title="详情">
          <mt-button icon="back" slot="left" @click.native="itemListShow = !itemListShow">返回</mt-button>
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="swiper-container swiper-container-h swiper-container-horizontal">
          <div class="swiper-wrapper">
            <div v-for="(item,index) in items" class="swiper-slide">
              <div style="margin-top:700px;padding:20px;">
                <img v-for="image in item.detail" style="width: 100%" :src="image" class="">
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    <div v-load-more="loaderMore" v-show="itemListShow">
      <waterfall
        :align="align"
        :line-gap="200"
        :min-line-gap="100"
        :max-line-gap="220"
        :single-max-width="300"
        :watch="items"
        @reflowed="reflowed"
        ref="waterfall"
      >
        <!-- each component is wrapped by a waterfall slot -->
        <waterfall-slot
          v-for="(item, index) in items"
          :width="item.width"
          :height="item.height"
          :order="index"
          :key="item.index"
          move-class="item-move"
        >
          <div class="item" :style="item.style" :index="index">
            <div class="item-box">
              <img v-lazy="item.imgUrl" class="lazy-img-fadein" @click="showDetail($event,index,item.id)">
              <div class="span-bg">
              <span>
              {{item.msg}}
            </span>
              </div>

            </div>

          </div>
        </waterfall-slot>
      </waterfall>
      <foot-guide></foot-guide>
    </div>
  </div>

</template>
<style scoped>
  #book {
    position: fixed;
    padding-left: 20px;
    bottom: 60px;
    right: -20px;
    width: 68px;
    height: 40px;
    z-index: 9999;
    font-size: 16px;
    border-radius: 35px;
    background-color: #26a2ff;
    color: white;
    display: flex;
    align-items: center;
    /*justify-content: center;*/

  }

  .item-box {
    position: relative;
    margin: 3px;
    text-align: center;
  }

  .item-box img {
    width: 100%;
    border-radius: 10px;

  }

  .item-box .span-bg {
    position: absolute;
    bottom: 4px;
    width: 100%;
    height: auto;
    background-color: black;
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
    z-index: 99;
    text-align: center;
    border-radius: 0 0 10px 10px;
  }

  .item-box .span-bg span {
    color: white;
    word-wrap: break-word;
    text-align: center;
    font-size: 12px;

  }

  ::-webkit-scrollbar {
    display: none;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }

  .lazy-img-fadein[lazy=loading] {
  }

  .lazy-img-fadein[lazy=error] {
    border-radius: 2px;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
    margin-top: 25%;
    width: 50%;
  }

  #product-detail {
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  .show-up {
    -webkit-animation-duration: 1.0s;
    animation-duration: 1.0s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: showUp;
    animation-name: showUp;
  }

  .hidden {
    -webkit-animation-duration: 1.0s;
    animation-duration: 1.0s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: hidden;
    animation-name: hidden;
  }

  @-webkit-keyframes showUp {
    from {
      filter: alpha(opacity=50);
      -moz-opacity: 0.5;
      -khtml-opacity: 0.5;
      opacity: 0.5;
    }
    to {
      filter: alpha(opacity=50);
      -moz-opacity: 1;
      -khtml-opacity: 1;
      opacity: 1;
      top: 0;
    }
  }

  @-webkit-keyframes hidden {
    from {
      top: 0;
    }
    to {
      filter: alpha(opacity=50);
      -moz-opacity: 0.5;
      -khtml-opacity: 0.5;
      opacity: 0.5;
      top: 100%;
    }
  }

  @keyframes hidden {
    from {
      top: 0;
    }
    to {
      filter: alpha(opacity=50);
      -moz-opacity: 0.5;
      -khtml-opacity: 0.5;
      opacity: 0.5;
      top: 100%;
    }
  }

  .mint-header.is-fixed {
    z-index: 999;
  }

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-container-h {

  }

  .swiper-container-h .swiper-slide {

    overflow-y: auto;

  }

</style>
<script type="text/ecmascript-6">
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import {product} from '../../service/tempdata/product-list'
  import {loadMore} from '../../components/common/mixin'
  import {validateImage} from '../../config/mUtils'
  import footGuide from 'src/components/footer/footGuide'
  //  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.css'
  import 'src/plugins/swiper.js'
  //  import {default as detail} from './detail'

  window.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop + window.innerHeight >= document.body.clientHeight) {
    }
  })
  export default {
    data(){
      return {
        detailShow: '',
        align: 'center',
        isBusy: false,
        items: [],
        currentId: 0,
        itemListShow: true,
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        swiperH: {},
        swiperV: {}
      }
    },
    mixins: [loadMore],
    components: {
      Waterfall,
      WaterfallSlot,
      footGuide,
    },
    created() {
      this.items = product;
      console.log('created')
    },
    mounted(){
      this.initData();
      this.loaderMore();
      //初始化参数
      var that = this
//      var swiperH = new Swiper('.swiper-container', {
//        pagination: '.swiper-pagination',
//        paginationClickable: true
//      });
      this.swiperH = new Swiper('.swiper-container-h', {
        spaceBetween: 30,
        speed: 800,
        observer: true,
        onSlideChangeStart: function (swiper) {

//          //每次切换都要重新请求一遍数据
          let index = swiper.activeIndex > swiper.previousIndex ? 1 : 0;

          //更新当前id
          switch (index) {
            case 0:
              that.currentId += 1
              break;
            case 1:
              that.currentId -= 1
              break;
            default :
              break;

          }
        }
      });
    },
    computed: {
      currentProduct: function () {
        return this.items[this.currentId]
      },
      currentProductId: function () {
        return this.items[this.currentId].id
      }
    },
    methods: {
      shuffle: function () {
        this.items.sort(function () {
          return Math.random() - 0.5
        })
      },
      reflowed: function () {
        this.isBusy = false
      },
      //参数初始化
      initData(){
      },

      //到达底部加载更多数据
      async loaderMore()
      {
        //防止重复请求
        if (this.preventRepeatReuqest) {
          return
        }
        this.showLoading = true;
        this.preventRepeatReuqest = true;


        let res = product;
        this.items = [...this.items, ...res]
        //当获取数据小于20，说明没有更多数据，不需要再次请求数据
        if (res.length < 2) {
          return
        }
        this.preventRepeatReuqest = false;
      },
      showDetail(e, index, id)
      {
        this.itemListShow = false
        //显示轮播
        this.detailShow = 'show-up'
        //请求新数据
        this.currentId = index
        this.currentProductId = id
        this.swiperH.slideTo(index, 0, false);

        //    let slots = document.getElementsByClassName('vue-waterfall-slot');
        //document.body.scrollTop = slots[i].offsetTop;
        //      let target = e.currentTarget;
        //      console.log(target.getBoundingClientRect());
        //      this.fullIndex = i;

      },
      loadData(id){
        for (let j = 0; j < this.items.length; j++) {
          if (this.items[j].id == id) {
            return this.items[j]
          }
        }
      },
      template(data){
        let str = '';
        str += '<div class="swiper-slide" data-status="false">'
        str += '<img class="" src="' + data.imgUrl + '">'
        str += '</div>';
        return str;
      }

    }

  };
</script>

