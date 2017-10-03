<template>
  <div>
    <div v-for="(row,index) in list">

      <mt-cell class="header">
        <span slot="title">{{row.name}}<span style="font-size:12px;">（必选）</span></span>
        <!--<p class="msg">查看说明?</p>-->
      </mt-cell>
      <div class="spec-wrap">
        <span class="spec-wrap" v-for="(option,i) in row.options">
          <mt-button :plain="!option.selected" type="danger" @click.native="select(index,i)" size="small">{{option.item}}</mt-button>
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
    data(){
      return {
        list: []
      }
    },
    props: ['item', 'product_id'],
    components: {},
    created() {
    },
    mounted(){
//      let arr = []
//      for(let i in this.item.items){
//        arr[i] = []
//        for(let j in this.item.items[i]['options']){
//          arr[i].push(this.item.items[i]['options'][j])
//        }
//      }
      this.list = this.item.items

    },
    computed: {
      ...mapState(['cartData'])
    },
    watch: {
      list(newVal){
        //价格和选中的项目均要变更
        let price = parseFloat(0)
        let selectedItems = []
        //用来记录选项是不是都选了
        let required = 0
        for (let i in this.list) {
          let req = 1

          this.list[i].options.forEach((element, index, array)=> {
            if (element.selected) {
              selectedItems.push(this.list[i].name + '@' + element.item)
              price += parseFloat(element.price)
              req = 0
            }
          })
          //判断必选是不是都选上了
          if (req == 1) {
            required = 1
          }
        }


        let type = 'required_multiple'
        let cartData = this.cartData
        cartData.products[this.product_id].spec[type].data = selectedItems
        cartData.products[this.product_id].spec[type].required = required
        cartData.products[this.product_id].spec[type].price = price
        this.UPDATE_CARTDATA(cartData)
      }
    },
    methods: {
      ...mapMutations([
        'UPDATE_CARTDATA'
      ]),
      select(index, i){
        let list = $.extend(true, [], this.list)
        list[index].options[i].selected = list[index].options[i].selected ? 0 : 1
        this.list = list
      }
    }
  }
</script>

