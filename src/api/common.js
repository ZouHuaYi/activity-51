import request from "@/utils/request";
import {getUserId,getActivityId,getParentId} from "@/utils/jscookie"


// 添加地址
export async function addAddress({area,receivePhone,receiveName,address}) {
  return request('/rest/address/add',{
    method:"POST",
    body:{
      userId:getUserId(),
      area:area,
      receivePhone:receivePhone,
      receiveName:receiveName,
      address:address,
    }
  })
}

// 获取首页详情的函数
export async function getRaffleData() {
  return request('/rest/activity/details',{
    method:"POST",
    body: {
      activityId:getActivityId()
    }
  })
}

// 抽奖接口
export async function drawRaffle() {
  return request('/rest/activity/user/draw/award',{
    method:"POST",
    body: {
      activityId:getActivityId(),
      inviterId:getParentId()||'',
    }
  })
}

// 获取用户活动获得奖励信息以及判断用户是否已抽奖
export async function rewardUser() {
  return request('/rest/activity/user/reward',{
    method:"POST",
    body: {
      activityId:getActivityId()
    }
  })
}

// 活动积分可兑换奖品列表
export async function poolProductList() {
  return request('/rest/activity/integral/pool/productList',{
    method:"POST",
    body: {
      activityId:getActivityId()
    }
  })
}

// 获取用默认地址
export async function getDefaultAddress() {
  return request('/rest/address/get_default',{
    method:'POST',
    body:{
      userId:getUserId(),

    }
  })
}

// 设置默认地址的api
export async function setDefaultAddress(params) {
  return request('/rest/address/set_default',{
    method:'POST',
    body:{
      userId:getUserId(),
      addressId:params.addressId,
    }
  })
}

// 用户提取积分兑换生成订单
export async function orderPlace(params) {
  return request('/rest/activity/order/place',{
    method:"POST",
    body: {
      activityId:getActivityId(),
      addressId:params.addressId,
      productType:params.productType,
      productOrPackageId:params.productOrPackageId,
      productCount:params.productCount,
    }
  })
}

// 用户 提取其他的奖品生成订单
export async function awardPlace(params) {
  return request('/rest/activity/award/order/place',{
    method:"POST",
    body:{
      userAwardId:params.id,
      addressId:params.addressId,
    }
  })
}


// 用户绑定
export async function invitation() {
  return request('/rest/activity/user/invitation',{
    method:"POST",
    body: {
      activityId:getActivityId(),
      inviterId:getParentId()||'',
    }
  })
}

// 支付后获取奖品
export async function payFinishReward(params) {
  return request('/rest/activity/user/paid/draw/award',{
    method:'POST',
    body:{
      activityId:getActivityId(),
      orderNumber:params.orderNumber,
    }
  })
}

// 取消订单的接口
export async function cancelOrder(params) {
  return request('/rest/activity/paid/order/cancell',{
    method:'POST',
    body:{
      activityId:getActivityId(),
      orderNumber:params.orderNumber
    }
  })
}

// 获取拼团人数
export async function getPersonNumber() {
  return request('/rest/activity/can/tuan/count',{
    method:'POST',
    body:{
      activityId:getActivityId(),
    }
  })
}
