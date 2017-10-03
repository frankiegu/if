<template>
    <section id='foot_guide'>
        <section @click = "gotoAddress({path: '/'})" class="guide_item">

          <img src="/static/icon/show.svg" class="icon_style">
          <span>展示</span>
        </section>
        <section @click = "gotoAddress({path: '/book/'})" class="guide_item">
          <img src="/static/icon/book.svg" class="icon_style">
            <span>预约</span>
        </section>
        <section @click = "gotoAddress('/activity')" class="guide_item">
          <img src="/static/icon/order.svg" class="icon_style">
            <span>活动</span>
        </section>
        <section @click = "gotoAddress('/user')" class="guide_item">
          <img src="/static/icon/user.svg" class="icon_style">
            <span>我的</span>
        </section>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{

            }
        },
        created(){

        },
        mounted(){

        },
        computed: {
            ...mapState([
                'geohash'
            ]),
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 3rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		.icon_style{
			@include wh(1.2rem, 1.2rem);
			margin-bottom: .2rem;
			margin-top: .3rem;
			fill: #ccc;
		}
		span{
			@include sc(.85rem, #666);
		}
    }

</style>
