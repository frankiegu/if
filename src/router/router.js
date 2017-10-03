import App from '../App'
const show = r => require.ensure([], () => r(require('../page/show/show')), 'show')
const book = r => require.ensure([], () => r(require('../page/book/book')), 'book')
const product = r => require.ensure([], () => r(require('../page/product/product')), 'product')
const calendar = r => require.ensure([], () => r(require('../page/calendar/calendar')), 'calendar')
const settlement = r => require.ensure([], () => r(require('../page/settlement/settlement')), 'settlement')
const waterfall = r => require.ensure([], () => r(require('../page/waterfall/waterfall')), 'waterfall')
const specpage = r => require.ensure([], () => r(require('../page/specpage/specpage')), 'specpage')
const category = r => require.ensure([], () => r(require('../page/category/category')), 'category')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const user = r => require.ensure([], () => r(require('../page/user/user')), 'user')
const myCoupon = r => require.ensure([], () => r(require('../page/user/coupon')), 'user')
const activity = r => require.ensure([], () => r(require('../page/activity/activity')), 'activity')
const coupon = r => require.ensure([], () => r(require('../page/activity/coupon')), 'activity')
const pay = r => require.ensure([], () => r(require('../page/pay/pay')), 'pay')
const couponCheck = r => require.ensure([], () => r(require('../page/user/couponCheck')), 'couponCheck')
const author = r => require.ensure([], () => r(require('../page/author/author')), 'author')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/login/register')), 'register')
const forget = r => require.ensure([], () => r(require('../page/login/forget')), 'forget')

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //测试
    {
      name:'home',
      path: '/',
      component: show
    },
    {
      name:'book',
      path: '/book',
      component: book
    },
    {
      name:'product',
      path: '/product/id/:id',
      component: product
    },
    {
      name:'waterfall',
      path: '/waterfall/:categoryId',
      component: waterfall
    },
    {
      name:'category',
      path: '/category/:id',
      component: category,
      meta: { keepAlive: true }
    },
    {
      name:'category',
      path: '/category',
      component: category
    },
    {
      name:'specpage',
      path: '/specpage',
      component: specpage
    },
    {
      name:'calendar',
      path: '/calendar',
      component: calendar
    },
    {
      name:'settlement',
      path: '/settlement',
      component: settlement
    },
    {
      name:'order',
      path: '/order',
      component: order
    },
    {
      name:'user',
      path: '/user',
      component: user
    },
    {
      name:'myCoupon',
      path: '/coupon',
      component: myCoupon
    },
    {
      name:'coupon',
      path: '/coupon/:id',
      component: coupon
    },
    {
      name:'activity',
      path: '/activity',
      component: activity
    },
    {
      name:'pay',
      path: '/pay',
      component: pay
    },
    {
      name:'couponCheck',
      path: '/couponCheck/:id',
      component: couponCheck
    },
    {
      name:'author',
      path: '/author',
      component: author
    },
    {
      name:'login',
      path: '/login',
      component: login
    },
    {
      name:'register',
      path: '/register',
      component: register
    },
    {
      name:'forget',
      path: '/forget',
      component: forget
    }
  ]
}]
