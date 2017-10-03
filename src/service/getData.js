import fetch from '../config/fetch'
import {baseUrl} from '../config/env'


/**
 * 创建临时数据
 */
const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

/**
 * 获取首页默认地址
 */

var category = (type,query,data) => fetch(type, "/category",query,data)
var product = (type,query,data) => fetch(type, "/product",query,data)
var order = (type,query,data) => fetch(type, "/order",query,data)
var getOrderByUserId = (type,query,data) => fetch(type, "/order/by_user",query,data)
var event = (type,query,data) => fetch(type, "/event",query,data)
var token = (type,query,data) => fetch(type, "/token",query,data)
var getToken = () => {
  window.location.href = baseUrl+'/getCode'
}
var getCode = () => {
  let url = window.location.href
  url = url.replace(/#/, "@")
  window.location.href = baseUrl+'/getCode?url='+url
}
var test = (type,query,data) => fetch(type, "/test",query,data)
var app = (type,query,data) => fetch(type, "/app",query,data)
var getOrderByPayStatus = (type,query,data) => fetch(type, "/order/pay_status",query,data)
var getOrderByOrderStatus = (type,query,data) => fetch(type, "/order/order_status",query,data)
var banner = (type,query,data) => fetch(type, "/banner",query,data)
var coupon = (type,query,data) => fetch(type, "/coupon",query,data)
var userCoupon = (type,query,data) => fetch(type, "/userCoupon",query,data)
var getCouponByDate = (type,query,data) => fetch(type, "/coupon/by_date",query,data)
var getCouponsMark = (type,query,data) => fetch(type, "/coupon/mark",query,data)
var getStoreInfo = (type,query,data) => fetch(type, "/system/store",query,data)
var user = (type,query,data) => fetch(type, "/user",query,data)
var pay = (type,query,data) => fetch(type, "/pay",query,data)
var getPreOrder = (type,query,data) => fetch(type, "/pay/pre_order",query,data)
var userCouponCheck = (type,query,data) => fetch(type, "/userCoupon/check",query,data)
var verifyToken = (type,query,data) => fetch(type, "/token/verify",query,data)
var getVerifyCode = (type,query,data) => fetch(type, "/user/verify_code",query,data)
var loginIn = (type,query,data) => fetch(type, "/user/login",query,data)
/**
 * 以下Api接口不需要进行反向代理
 */

var sendLogin = (code, mobile, validate_token) => setpromise(login.userInfo);

export {test,category,product,order,event,getOrderByUserId,token,getToken,verifyToken,
  app,getCode,getOrderByPayStatus,getOrderByOrderStatus,banner,coupon,userCoupon,
  getCouponByDate,getCouponsMark,getStoreInfo,user,pay,getPreOrder,
  userCouponCheck,getVerifyCode,loginIn
}
