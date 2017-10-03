<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive exclude="specpage">
        <router-view></router-view>
      </keep-alive>
      <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
      <!--</keep-alive>-->
      <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCode, token} from 'src/service/getData'
  import {setStore, getStore} from 'src/config/mUtils'
  ////检查是否localstore中有没有token
  ////检查token是否过期，没有过期直接跳过获取code的步骤


  export default {
  }

</script>

<!--<style lang="scss">-->
<!--@import './style/common';-->
<!--.router-fade-enter-active, .router-fade-leave-active {-->
<!--transition: opacity .3s;-->
<!--}-->
<!--.router-fade-enter, .router-fade-leave-active {-->
<!--opacity: 0;-->
<!--}-->
<!--</style>-->

<style>
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, p, blockquote, table, th, td, embed, object {
    padding: 0;
    margin: 0;
  }

  body {
    background-color: #fafafa;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset, img, abbr {
    border: 0;
  }

  address, caption, cite, code, dfn, em,
  h1, h2, h3, h4, h5, h6, strong, th, var span{
    font-weight: normal;
    font-style: normal;
  }

  ul {
    list-style: none;
  }

  caption, th {
    text-align: left;
  }

  /*h1, h2, h3, h4, h5, h6 {*/
  /*font-size: 1.0em;*/
  /*}*/
  .grey {
    color: grey;
  }

  h4 {
    font-size: 15px;
    line-height: 25px;
  }

  h5 {
    font-size: 12px;
    line-height: 20px;
  }

  h6 {
    font-size: 10px;
    line-height: 20px;
  }

  q:before, q:after {
    content: ”;
  }

  a, ins {
    text-decoration: none;
  }

  .page-header-main {
    margin-top: 50px;
    min-height: 100vh;
    padding-bottom: 50px;
  }

  .page-part {
    margin-bottom: 15px;
  }

  .spinner {
    position: fixed;
    bottom: 40%;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 99;
  }

  .spinner > div {
    background-color: #ddd;
    -webkit-opacity: 0.4;
    filter: alpha(opacity=40);
    border-radius: 10px;
    margin: auto;
    padding: 20px;

  }

</style>
