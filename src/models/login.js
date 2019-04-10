/**
 * Created by zhy on 2019/4/10.
 */
import {loginApi,sendCOde} from '@/api/login'
import { Toast} from 'antd-mobile';

export default{
    namespace:'login',
    state:{
        passworldStatus:false,
        verifyDisable:true,
        verifyText:'获取验证码',
    },
    effects:{
        *loginFun({phoneAndCode},{call,put}){
            const response = yield call(loginApi,phoneAndCode);
            console.log(response,phoneAndCode)
        },
        *sendCodeFun({phone},{call,put}){
            console.log(phone)
            const response = yield call(sendCOde,phone);
            if(response.messageCode==900){
                Toast.info('验证码发送成功', 2);
                put({type:'changeVerifyDisable', disabled:false});
                let tim = 59;
                let t = setInterval(()=>{
                    tim--;
                    put({type:'changeVerifyText',text:`${tim}s后重试`});
                    if(tim===0){
                        clearInterval(t);
                        put({type:'changeVerifyText',text:`重新获取`});
                    }
                },1000)
            }else {
                Toast.info(response.message?response.message:'验证码发送失败', 2);
            }

        }
    },
    reducers:{
        changeVerifyText(state,action){
            return {
                ...state,
                verifyText:action.text
            }
        },
        changeVerifyDisable(state,action){
            return{
                ...state,
                verifyDisable:action.disabled
            }
        }
    },
}