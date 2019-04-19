import request from "@/utils/request";
import {getUserId} from "@/utils/jscookie"


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

// 获取抽奖奖品数据的接口
export async function getRaffleData() {
  return request('/rest/activity/details',{
    method:"POST",
    body: {
      activityId:19
    }
  })
}

// 抽奖接口
export async function drawRaffle() {
  return request('/rest/activity/user/draw/award',{
    method:"POST",
    body: {
      activityId:19
    }
  })
}
