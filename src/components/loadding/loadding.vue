<template>
  <div class="spinner" v-show="show">
    <div>
      <mt-spinner :size="60" color="#26a2ff" type="fading-circle"></mt-spinner>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return {}
    },
    props:['show'],
    mounted(){

    },
    computed: {},
    methods: {},

  }

</script>


