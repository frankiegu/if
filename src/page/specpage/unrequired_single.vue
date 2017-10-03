<template>
  <div>
    <div v-for="(row,index) in list">

      <mt-cell class="header" :title="row.name">
        <!--<p class="msg">查看说明?</p>-->
      </mt-cell>
      <div class="spec-wrap">
        <span class="spec-wrap" v-for="option in row.options">
          <mt-button :plain="row.selected !== option.item" type="danger" @click.native="select(option.item,index)" size="small">{{option.item}}</mt-button>
        </span>
      </div>
    </div>
  </div>

</template>
<style scoped>
  .msg{
    color:#ef4f4f;
    font-size: 12px;
  }
  .spec-wrap{
    background-color: white;
    padding:10px;
  }
  .mint-button--small{
    margin-bottom: 5px;
  }
</style>


<script type="text/ecmascript-6">
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        list:[],
        price:0,
        selectedIds:[]

      }
    },
    props:['item','product_id'],
    mounted(){
      this.list = this.item.items
    },
    computed:{
      ...mapState(['cartData']),
    },
    watch:{
      list(newVal){
        let arr = []
        let price = parseFloat(0)
        this.list.forEach((e)=>{
          e.options.forEach((element)=>{
            if(element.item == e.selected){
                arr.push(e.name+'@'+element.item)
                price += parseFloat(element.price)
              }
          })
        })
        this.price = price
        this.selectedItems = arr
        let type = 'unrequired_single'
        let cartData = this.cartData
//        alert(cartData.products[this.product_id].spec[type].price)
        cartData.products[this.product_id].spec[type].data = this.selectedItems
        cartData.products[this.product_id].spec[type].price = this.price
        this.UPDATE_CARTDATA(cartData)

      }
    },
    methods: {
      ...mapMutations([
        'UPDATE_CARTDATA'
      ]),
      select(item,index){
        let temp = this.list[index]
        if(temp['selected'] == item){
          temp['selected'] = null
        }else{
          temp['selected'] = item
        }
        this.$set(this.list, index,temp)
      }
      //更新选中的数组
    },
  };
</script>

