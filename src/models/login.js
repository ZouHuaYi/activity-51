/**
 * Created by zhy on 2019/4/10.
 */
import {loginApi,sendCOde} from '@/api/login'
import { Toast} from 'antd-mobile';
import { delay } from '@/utils/utils';
import {getToken,setToken} from "../utils/jscookie";

export default{
    namespace:'login',
    state:{
        passworldStatus:false,
        verifyDisable:false,
        verifyText:'获取验证码',
        sendCodeAbleClick:true,
    },
    effects:{
        *bindWxChatUnion(){

        },
        *loginFun({phoneAndCode},{call,put}){
            const response = yield call(loginApi,phoneAndCode);
            if(response.messageCode==900){
              // 登陆成功 绑定 微信
              setToken(response.data.token);


            }

        },
        *sendCodeFun({phone},{call,put}){
            yield put({type:'changeVerifyDisable', disabled:false});
            const response = yield call(sendCOde,phone);
            if(response.messageCode==900){
                Toast.info('验证码发送成功', 2);
                yield put({type:'changeSendCodeClick',sendDisable:false});
                let tim = 59;
                while (tim>0){
                  tim--;
                  yield call(delay,1000);
                  yield put({type:'changeVerifyText',text:`${tim}s后重试`});
                }

              yield put({type:'changeSendCodeClick',sendDisable:true});
              yield put({type:'changeVerifyText',text:`重新获取`});
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
        },
        changeSendCodeClick(state,action){
          return{
            ...state,
            sendCodeAbleClick:action.sendDisable,
          }
        },
    },
}
