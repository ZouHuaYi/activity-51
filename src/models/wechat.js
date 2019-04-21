import {signShare} from '@/api/wechat';
import {Toast} from 'antd-mobile';

export default {
  namespace:'wechat',
  state:{

  },
  effects:{
    // 获取签名然后分享出去
    signHandle: function* (_, {put, call}) {
      const response = yield call(signShare, _);
      if(response.messageCode==900){
        // 执行分享函数
        yield call({
          type:'shareWechat',
          sign:response.data,
        })
      }else {
        Toast.info(response.message?response.message:'密码设置失败', 2);
      }
    },
    // 分享出去的动作
    *shareWechat({sign},{put,call}){

    }
  },
  reducers:{



  }
}
