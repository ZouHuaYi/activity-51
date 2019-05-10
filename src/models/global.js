import {addAddress,getRaffleData,drawRaffle,payFinishReward,cancelOrder,invitation} from '@/api/common';
import {createOrder,paySign} from "@/api/wechat";
import { Toast,Modal} from 'antd-mobile';
import router from 'umi/router';
import {jsSdk} from "@/utils/utils";
import {setBooking} from "@/utils/jscookie";


let loopNumber = 0;


export default {
  namespace:'global',
  state:{
    raffleData:null,
    prizeData:{},
  },
  effects:{
    // 获取抽奖奖品的数据
    *getRaffleData({callback},{put,call}){
      Toast.loading('正在加载',20);
      const response = yield call(getRaffleData);
      Toast.hide();
      if(response.messageCode!==900){
        try {
          const expandContent = JSON.parse(response.data.expandContent);
          setBooking(expandContent.booking);
        }catch (e) { }

       yield put({
          type: 'saveRaffleData',
          data:response.data,
        });
       // 微信签名部分
        window.g_app._store.dispatch({
          type:'wechat/signHandle',
        })
        callback&&callback();
      }else {
        Toast.info(response.message?response.message:'保存失败，请重试！', 2);
      }
    },
    // 免费抽奖走的支付部分 中奖请求
    *awardPrize({callback},{put,call,select}){
      const response = yield call(drawRaffle);
      let raffleData = {};
      const that = this;
      if(response.messageCode==900){
        yield put({
          type: 'savePrizeData',
          data: response.data,
        })
         raffleData = yield select(state => state.global.raffleData);
        (raffleData.awardList).forEach((item,key)=>{
          if(item.id===response.data.awardId){
            callback&&callback(key);
            if(raffleData.inviteForm==1){// 绑定用户
              invitation();
            }
            return;
          }
        })
      }else if(response.messageCode==1520){
        raffleData = yield select(state => state.global.raffleData);
        Modal.alert('温馨提示',response.message||'你需要付费抽奖！',[
          {text:'取消',onPress:()=>{}},
          {text:'确定',onPress:()=>{
           return  new Promise(async (resolve)=>{
                // 这里购买抽奖
                resolve();
                if(response.data>0){
                  Toast.loading('正在调起支付',20);
                  const payOrder =  await createOrder();
                  Toast.hide();
                  if(payOrder.messageCode==900){
                    const sign = await paySign({orderNumber:payOrder.data.orderNumber});
                    // 唤醒微信支付 签名成功后
                    if(sign.messageCode==900){
                      jsSdk(sign.data,()=>{
                        // 支付成功
                        Toast.info('支付成功', 2);
                        Toast.loading('准备抽奖',20);
                        loopNumber = 0;
                        // 轮询获取该数据
                        finishRewardLoop(payOrder.data.orderNumber, function (resPay){
                          console.log('你进来了啊')
                          window.g_app._store.dispatch({
                            type:'global/savePrizeData',
                            data:resPay.data,
                          })
                          Toast.hide();
                          // 获取中奖的位置
                          (raffleData.awardList).forEach((item,key)=>{
                            if(item.id===resPay.data.awardId){
                              callback&&callback(key);
                              if(raffleData.inviteForm==1){// 绑定用户
                                invitation();
                              }
                              return;
                            }
                          })
                        })
                      },()=>{
                        // 支付失败或者取消的时候
                        Toast.info('支付失败', 2);
                        cancelOrder({orderNumber:payOrder.data.orderNumber});
                      })

                    }else {
                      Toast.info(sign.message?sign.message:'微信签名失败', 2);
                    }
                  }else {
                    Toast.info(payOrder.message?payOrder.message:'无法生成定单', 2);
                  }
                }else {
                  Modal.alert('你今天付费购买抽奖次数超过5次',[
                    {text:'取消',onPress:()=>{}},
                    {text:'确定',onPress:()=>{}}
                  ])
                }
            })
          }}
        ])
      }else {
        Modal.alert('温馨提示',response.message||'你已经抽过奖啦！',[
          {text:'取消',onPress:()=>{}},
          {text:'确定',onPress:()=>{}}
        ])
      }
    },
    // 拼团时候走的支付部分 调起微信支付的函数
    *wechatPayFun(_,{call,put}){
      Toast.loading('正在调起支付',20);
      const res = yield call(drawRaffle);
      if(res.messageCode==1520){
        const response = yield call(createOrder,_);
        if(response.messageCode==900){
          const sign = yield call(paySign,{orderNumber:response.data.orderNumber});
          Toast.hide();
          if(sign.messageCode==900){
            console.log('准备支付钱了')
            jsSdk(sign.data,()=>{
              // 绑定
              invitation();
              router.push('/user');
            },()=>{
              Toast.info('支付失败', 2);
              // 取消支付的时候，删除支付订单
              cancelOrder({orderNumber:response.data.orderNumber});
            })
          }else {
            Toast.info(sign.message?sign.message:'微信签名失败', 2);
          }
        }else {
          Toast.info(sign.message?sign.message:'无法下单', 2);
        }
      }else {
        Toast.info('你已经参加拼团啦！', 2);
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


// 获取奖品的函数
function finishRewardLoop(orderNumber,callback) {
  payFinishReward({orderNumber:orderNumber}).then((resPay)=>{
    if(resPay.messageCode==900){
      if(resPay.data.awardId){
        console.log('我走回调函数了')
        callback&&callback(resPay);
      }else {
        if(loopNumber>50){
          Toast.hide();
          Toast.info('超时支付，订单已取消，钱款已原路退回', 2);
          return;
        }
        setTimeout(()=>{
          loopNumber++;
          finishRewardLoop(orderNumber,callback);
        },500);
      }
    }else {
      Toast.hide();
      Toast.info(resPay.message||'无法抽奖', 2);
    }
  }).catch(()=>{
    Toast.hide();
  })
}
