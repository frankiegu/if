<template>
  <div>
    <div v-for="(row,index) in list">

      <mt-cell class="header">
        <span slot="title">{{row.name}}<span style="font-size:12px;">（必选）</span></span>
        <!--<p class="msg">查看说明?</p>-->
      </mt-cell>
      <div class="spec-wrap">
        <span class="spec-wrap" v-for="(option,i) in row.options">
          <mt-button :plain="row.selected !== option" type="danger" @click.native="select(option,index,i)" size="small">{{option.item}}</mt-button>
        </span>
      </div>
    </div>

  </div>

</template>
<style scoped>
  .msg {
    color: #ef4f4f;
    font-size: 12px;
  }

  .spec-wrap {
    background-color: white;
    padding: 10px;
  }
  .mint-button--small{
    margin-bottom: 5px;
  }
</style>


<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  export default {
    name:'required_single',
    data(){
      return {
        list: [],
        items_price: [],
        type:'required_single',
        required:1
      }
    },
    props: ['item', 'product_id'],
    components: {},
    created() {
    },
    mounted(){
      this.list = this.item.items
      this.items_price = this.item.items_price

    },
    computed: {
      ...mapState(['cartData']),
      price(){
        let price = 0
        //alert(this.selectedArr.length)
        if (!this.selectedArr.length) {
          return price
        }
        this.items_price.forEach((e)=> {
          if (e.key_name.sort().toString() == this.selectedArr.sort().toString()) price = e.price
        })
        return price
      },
      selectedArr(){
        //如果沒有全部选中，那么就返回空
        let arr = []
        this.list.forEach((e)=>{
          if (typeof(e.selected) == 'object') {
            arr.push(e.selected.item)
          }
        })

        return arr
      }
    },
    watch: {
      selectedArr(val){
        //检查是否全部选中
        if (val.length != this.list.length) {
          this.required = 1
        } else {
          this.required = 0
        }
        let cartData = this.cartData
        cartData.products[this.product_id].spec[this.type].required = this.required
        cartData.products[this.product_id].spec[this.type].data = val
        cartData.products[this.product_id].spec[this.type].price = this.price
        this.UPDATE_CARTDATA(cartData)
      }
    },
    methods: {
      ...mapMutations([
        'UPDATE_CARTDATA'
      ]),
      select(option, index, i){
        let temp = this.list[index]
        temp['selected'] = option
        this.$set(this.list, index, temp)
      }
    }
  }
</script>

