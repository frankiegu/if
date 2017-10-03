let orderStatus = {
    '0':'未支付',
    '1':'已支付',
    '2':'已失效',
    '3':'交易成功'
}

let payStatus = {
    all:{status:2,name:'全部'},
    unpaid:{status:0,name:'未支付'},
    paid:{status:1,name:'已支付'}
}



export {
    orderStatus,payStatus
}
