/**
 * Created by zhy on 2019/4/10.
 */
import {loginApi,sendCOde,improvePassword} from '@/api/login'
import { Toast} from 'antd-mobile';
import {setToken,getToken,setUserId,getUserId} from "@/utils/jscookie";
import {delay} from "@/utils/utils";
import router from 'umi/router';


export default{
    namespace:'login',
    state:{
        passwordStatus:false,
        verifyDisable:false,
        verifyText:'获取验证码',
        sendCodeAbleClick:true,
        userInfo:{}
    },
    effects:{
        *loginFun({phoneAndCode},{call,put}){
            Toast.loading('正在发送',10);
            const response = yield call(loginApi,phoneAndCode);
            Toast.hide();
            if(response.messageCode==900){
              // 登陆成功 绑定 微信
              setToken(response.data.token);
              setUserId(response.data.id);
              yield put({type:'saveUserInfo',data:response.data});
              router.replace('/');
            }else if(response.messageCode==129){
              // 没有密码的时候
              setToken(response.data.token);
              setUserId(response.data.id);
              yield put({type:'changePasswordStatus',status:true});
              yield put({type:'saveUserInfo',data:response.data});
            }else {
              Toast.info(response.message?response.message:'登录失败', 2);
            }
        },
        *sendCodeFun({phone},{call,put}){
            Toast.loading('正在发送',10);
            yield put({type:'changeSendCodeClick',sendDisable:false});
            Toast.hide();
            const response = yield call(sendCOde,phone);
            if(response.messageCode==900){
                Toast.info('验证码发送成功', 2);
                yield put({type:'changeVerifyDisable', disabled:false});
                let tim = 59;
                while (tim>0){
                  tim--;
                  yield call(delay,1000);
                  yield put({type:'changeVerifyText',text:`${tim}s后重试`});
                }
                yield put({type:'changeVerifyText',text:`重新获取`});
            }else {
                Toast.info(response.message?response.message:'验证码发送失败', 2);
            }
            yield put({type:'changeSendCodeClick',sendDisable:true});
        },
        *improvePasswordFun({password},{call,put}){
            Toast.loading('正在发送',10);
            const response = yield call(improvePassword,password);
            Toast.hide();
            if(response.messageCode==900){
              // 设置成功后 绑定 微信 绑定父级
              router.replace('/');
            }else {
              Toast.info(response.message?response.message:'密码设置失败', 2);
            }
        },
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
        changePasswordStatus(state,action){
          return{
            ...state,
            passwordStatus: action.status
          }
        },
        saveUserInfo(state,action){
            return{
              ...state,
              userInfo:action.data
            }
        }
    },
}
