import {addAddress,getRaffleData,drawRaffle} from '@/api/common';
import { Toast} from 'antd-mobile';
import router from 'umi/router';

export default {
  namespace:'global',
  state:{
    raffleData:null,
    prizeData:{},
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
      if(response.messageCode!==900){
       yield put({
          type: 'saveRaffleData',
          data:response.data,
        })
      }else {
        Toast.info(response.message?response.message:'保存失败，请重试！', 2);
      }
    },
    // 中奖请求
    *awardPrize(_,{put,call}){
      const response = yield call(drawRaffle);
      if(response.messageCode!==900){
        yield put({
          type: 'savePrizeData',
          data:response,
        })
      }else {
        Toast.info(response.message?response.message:'保存失败，请重试！', 2);
      }
    }
  },
  reducers:{
    saveRaffleData(state,action){
      return{
        ...state,
        raffleData:action.data
      }
    },
    savePrizeData(state,action){
      return{
        ...state,
        prizeData:action.data
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
