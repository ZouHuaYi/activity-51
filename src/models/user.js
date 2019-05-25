import {
  rewardUser,
  poolProductList,
  getDefaultAddress,
  orderPlace,
  addAddress,
  setDefaultAddress,
  awardPlace,
} from '@/api/common';
import { Toast} from 'antd-mobile';
import router from 'umi/router';


export default {
  namespace:'user',
  state:{
    ordeInitData:5,
    rewardData:null,
    orderList:null,
    defaultAddress:null,
  },
  effects:{
    // 获取用户信息
    *getUserCenterData({},{call,put}){
      const response = yield call(rewardUser);

      if(response.messageCode==900){
        yield put({
          type:'saveRewardData',
          data:response.data
        })
      }else {
        Toast.info(response.message?response.message:'无法获取数据', 2);
      }
    },
    // 获取积分数的活动
    *getPlaceOrder({},{call,put}){
      const response = yield call(poolProductList);
      console.log(response);
      if(response.messageCode==900){
        yield put({
          type: 'saveOrderList',
          data:response.data,
        })
      }else {
        Toast.info(response.message?response.message:'无法获取活动订单数据', 2);
      }
    },
    // 兑换奖品的函数
    *postAwardPlace({formData},{call,put}){
      Toast.loading('正在提货',10);
      const response = yield call(awardPlace,formData);
      Toast.hide();
      if(response.messageCode==900){
        // 下单成功
        Toast.info('提货成功', 2);
        setTimeout(()=>{
          router.goBack();
        },2000)
      }else {
        Toast.info(response.message?response.message:'无法生成订单', 2);
      }
    },
    // 获取用户默认地址
    *getDefaultAddressData({},{call,put}){
      const response = yield call(getDefaultAddress);
      if(response.messageCode==900){
        yield put({
          type:'saveDefaultData',
          data:response.data
        })
      }else {
        Toast.info(response.message?response.message:'无法获取地址信息', 2);
      }
    },
    // 下单接口
    *orderPlace({formData},{call,put}){
      Toast.loading('正在提货',10);
      const response = yield call(orderPlace,formData);
      Toast.hide();
      if(response.messageCode==900){
        // 下单成功
        Toast.info('提货成功', 2);
        setTimeout(()=>{
          router.goBack();
        },2000)
      }else {
        Toast.info(response.message?response.message:'无法生成订单', 2);
      }
    },
    // 设置默认地址
    *setAddressDefault({params},{call,put}){
        const response = yield call(setDefaultAddress,params);
        if(response.messageCode==900){
          router.goBack();
        }else {
          Toast.info(response.message?response.message:'设置默认地址失败啦', 2);
        }

    },
    // 添加地址的函数
    *addAddressFun({addressInfoData},{put,call}){
      Toast.loading('正在保存',10);
      const response =  yield call(addAddress,addressInfoData);
      Toast.hide();
      if(response.messageCode==900){
        // 添加成功
        yield put({
          type:'setAddressDefault',
          params:{addressId:response.data.id}
        })
        //router.goBack();
      }else {
        Toast.info(response.message?response.message:'保存失败，请重试！', 2);
      }
    },
  },
  reducers:{
    saveRewardData(state,action){
      return {
        ...state,
        rewardData:action.data
      }
    },
    saveOrderList(state,action){
      return{
        ...state,
        orderList:action.data
      }
    },
    saveDefaultData(state,action){
      return{
        ...state,
        defaultAddress:action.data
      }
    }
  }
}
