import request from "@/utils/request";
import {getUserId,getOpenId,getActivityId} from "@/utils/jscookie";

export async function signShare() {
  return request('/rest/user/getSign',{
    method:'POST',
    body:{
      url:encodeURIComponent(window.location.href.split("#")[0])
    }
  })
}

// 微信绑定用户
export async function bindWechatApi({unionId,id}) {
  return request('/rest/user/open_bind_unbundled',{
    method:'POST',
    body:{
      wechat: unionId,
      unionId:unionId,
      id:id,
      action:0,
    }
  })
}

// 微信授权 获取微信绑定的用户信息
export async function getUnionId({code}) {
  return request('/rest/user/getUnionId',{
    method:'POST',
    body:{
      code:code
    }
  })
}

// 通过token 来获取用户信息的函数
export async function toTokenGatUserData({token}) {
  return request('/rest/user/token',{
    method:'POST',
    body:{
      token:token
    }
  })
}

// 获取微信图像的api 需要openid
export async function getAvater(params) {
  return request('/rest/user/getWechatUserInfo',{
    method:'POST',
    body:{
      openid:params
    }
  })
}

// 生成微信抽奖定单
export async function createOrder() {
  return request('/rest/activity/paid/draw/order/place',{
    method:'POST',
    body:{
      activityId:getActivityId()
    }
  })
}

// 微信支付签名
export async function paySign(params) {
  return request('/rest/activity/paid/draw/buy/order',{
    method:'POST',
    body:{
      orderNumber:params.orderNumber,   // 支付订单号
      payType:6,
      transactionType:1,
      openid: getOpenId()
    }
  })
}




