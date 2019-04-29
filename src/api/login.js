/**
 * Created by zhy on 2019/4/10.
 */
import request from '@/utils/request';
import {getActivityId,getParentId,getOpenId,getHospitalId} from '@/utils/jscookie';


// 验证码登录
export async function loginApi(params) {
    return request('/rest/user/login_by_code',{
        method:"POST",
        body:{
           ...params,
          activityId:getActivityId()||'',
          inviterId:getParentId()||'',
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


// 设置密码
export async function improvePassword({password}) {
  return request('/rest/user/improve_password',{
    method:'POST',
    body:{
      password:password,
      openid:getOpenId(),
    }
  })
}

// 绑定活动套餐
export async function bindActivityParent() {
  return request('/rest/team/bind/token',{
    method:'POST',
    body:{
      pId:getParentId()||'',
      hospitalId:getHospitalId()||'',
    }
  })
}
