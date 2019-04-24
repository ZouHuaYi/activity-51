import {addAddress,getRaffleData,drawRaffle} from '@/api/common';
import { Toast,Modal} from 'antd-mobile';
import router from 'umi/router';

export default {
  namespace:'global',
  state:{
    raffleData:null,
    prizeData:{},
  },
  effects:{
    // 获取抽奖奖品的数据
    *getRaffleData({callback},{put,call}){
      const response = yield call(getRaffleData);
      if(response.messageCode!==900){
       yield put({
          type: 'saveRaffleData',
          data:response.data,
        });
        callback&&callback();
      }else {
        Toast.info(response.message?response.message:'保存失败，请重试！', 2);
      }
    },
    // 中奖请求
    *awardPrize({callback},{put,call,select}){
      const response = yield call(drawRaffle);
      if(response.messageCode==900){
        yield put({
          type: 'savePrizeData',
          data: response.data,
        })
        const raffleData = yield select(state => state.global.raffleData);
        (raffleData.awardList).forEach((item,key)=>{
          if(item.id===response.data.id){
            callback&&callback(key);
            return;
          }
        })

      }else {

        Modal.alert('温馨提示',response.message?response.message:'你已经抽过奖了。',[
          {text:'取消',onPress:()=>{}},
          {text:'确定',onPress:()=>{}}
        ])

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
          // dispatch({
          //   type:'getRaffleData'
          // })
        }
      })
    }

  }
}
