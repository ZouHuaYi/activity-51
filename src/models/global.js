import {addAddress} from '@/api/common';
import { Toast} from 'antd-mobile';
import router from 'umi/router';

export default {
  namespace:'global',
  state:{

  },
  effects:{
    // 添加地址的函数
    *addAddressFun({addressInfoData},{put,call}){
      Toast.loading('正在保存',10);
      const response =  yield call(addAddress,addressInfoData);
      Toast.hide();
      if(response.messageCode==900){
        // 添加成功
        router.goBack();
      }else {
        Toast.info(response.message?response.message:'保存失败，请重试！', 2);
      }
    }
  },
  reducers:{

  }
}
