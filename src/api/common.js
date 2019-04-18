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
