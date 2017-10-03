import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vueEventCalendar from './components/event-calendar'
import VueLazyload from 'vue-lazyload'
import Animate from 'animate.css'
import $ from 'jquery'

import {GetQueryString,setStore,getStore} from'./config/mUtils'
import {getToken,verifyToken} from'./service/getData'








Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/loading-spin.svg',
  loading: 'static/loading-spin.svg',
  attempt: 1
})
//  import vueEventCalendar from '../dist'
//  import '../dist/style.css'


Vue.use(vueEventCalendar, {locale: 'zh', color: '#f47c7c'})
 Vue.use(MintUI)
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production'
})

//先保存地址
// window.localStorage.setItem('beforeLoginUrl', window.location.href)
// //去author页面
// alert(window.location.host+'/#/author')
// window.location.href = window.location.host+'/#/author'
//首次进入都要token
// let tokenStr = GetQueryString('token')?GetQueryString('token'):getStore('token');
if(GetQueryString('token')){
  setStore('token',GetQueryString('token'))
}



router.beforeEach((to, from, next) => {
  //如果是去登录页面的，不用通过检测
  if(to.path == '/login' || to.path == '/register' || to.path == '/forget'){
    next()
    return false
  }
  if(to.path == '/author' && store.state.user.id){
    // 用户使用后退返回到授权页，则默认回到首页
    next('/')
    return false
  }
  if(to.path != '/author' && !store.state.user.id){
    // 第一次登陆，user.id因为在vuex中，所以第一次进来一定是空的
    setStore('beforeLoginUrl',to.fullPath)
    next('/author')
    return false
  }
  next()
})





new Vue({
	router,
	store,
}).$mount('#app')

//
//
//
//
//
