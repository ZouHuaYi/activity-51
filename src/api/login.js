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

export async function sendCOde(phone) {
    return request('/rest/user/send_code',{
        method:'POST',
        body:{
            phone: phone,
            type:5,
        }
    })
}