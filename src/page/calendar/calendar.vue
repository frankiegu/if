<template>

  <div>
    <vue-event-calendar :events="events" @cur-date-changed="handleChangeCurDate"></vue-event-calendar>
  </div>
</template>

<script type="text/ecmascript-6">
  import {event} from 'src/service/getData'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data () {
      return {
        events:[]
      }
    },
    mounted(){
      this.initData()
    },
    computed:{
      ...mapState(['cartData']),
    },
    methods:{
      ...mapMutations(['UPDATE_CARTDATA']),
      async initData(){
        //获取事件信息
        this.events = await event('GET',{})
      },
      handleChangeCurDate(date){
        let time = Date.parse(new Date(date));
        let now = Date.parse(new Date())
        if(time<now){
          this.$toast('请提前24小时预约')
          return false
        }
        let cart = this.cartData
        cart.book_time = date
        this.UPDATE_CARTDATA(cart)
        this.$router.push({name:'settlement'})
      }
    }
  }
</script>

