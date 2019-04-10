/**
 * Created by zhy on 2019/4/10.
 */
import request from '@/utils/request';

export async function loginApi(params) {
    return request('/rest/user/login_by_code',{
        method:"POST",
        body:{
            phone:params.phone,
            code:params.code,
        }
    })
}

export async function sendCOde(params) {
    return request('/rest/user/send_code',{
        method:'POST',
        body:{
            phone: params.phone,
            type:5,
        }
    })
}

export async function bindWxchatApi(params) {
  return request('/rest/user/open_bind_unbundled',{
    method:'POST',
    body:{
      wechat: params.unionId,
      unionId:params.unionId,
      id:params.id,
      action:0,
    }
  })
}

export async function bindParent(params) {

}

export async function saveAvter(params) {

}
