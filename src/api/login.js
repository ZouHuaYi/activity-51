/**
 * Created by zhy on 2019/4/10.
 */
import request from '@/utils/request';

// 验证码登录
export async function loginApi(params) {
    return request('/rest/user/login_by_code',{
        method:"POST",
        body:{
            phone:params.phone,
            code:params.code,
            avatar:params.avatar
        }
    })
}

// 发送验证码
export async function sendCOde(phone) {
    return request('/rest/user/send_code',{
        method:'POST',
        body:{
            phone: phone,
            type:5,
        }
    })
}

// 微信绑定用户
export async function bindWxchatApi({unionId,id}) {
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
export async function checkUnionId({code}) {
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

// 微信分享签名
export async function wechatSiginal() {
  return request('/rest/user/getSign',{
    method:'POST',
    body:{
      uri:encodeURIComponent(window.location.href.split("#")[0])
    }
  })
}

// 设置密码
export async function improvePassword({password}) {
  return request('/rest/user/improve_password',{
    method:'POST',
    body:{
      password:password
    }
  })
}


export async function bindParent(params) {

}


export async function saveAvter(params) {

}
