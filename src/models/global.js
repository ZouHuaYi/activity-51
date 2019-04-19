import {addAddress,getRaffleData} from '@/api/common';
import { Toast} from 'antd-mobile';
import router from 'umi/router';

export default {
  namespace:'global',
  state:{
    raffleData:{}
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
    },
    // 获取抽奖奖品的数据
    *getRaffleData({},{put,call}){
      const response = yield call(getRaffleData);
      if(response.messageCode==900){
        put({
          type: 'saveRaffleData',
          data:response.data,
        })
      }else {
        Toast.info(response.message?response.message:'保存失败，请重试！', 2);
      }
    },
  },
  reducers:{
    saveRaffleData(state,action){
      return{
        ...state,
        raffleData:action.data
      }
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(location.pathname==='/'||location.pathname==='/index.html'){
          // 执行获取数据
          dispatch({
            type:'getRaffleData'
          })
        }
      })
    }

  }
}
