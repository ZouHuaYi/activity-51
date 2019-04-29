import {
  signShare,
  getUnionId,
  getAvater,
}from '@/api/wechat';
import {Toast} from 'antd-mobile';
import {setUserId,setToken,setUnionId,setOpenId} from "@/utils/jscookie";
import wx from "weixin-js-sdk";
import {clearPath} from '@/utils/utils'

export default {
  namespace:'wechat',
  state:{
  },
  effects:{
    // 通过 code 获取用户信息
    *getUnionId({code},{call,put}){
      const response = yield call(getUnionId,code);
      if(response.messageCode==900||response.messageCode==132){
         if(response.data.isLogined==1){
           // 用户绑定了微信
           setToken(response.data.token);
           setUserId(response.data.user.id);
         }
        setUnionId(response.data.unionid);
        setOpenId(response.data.openid);
      }
      yield put({
        type:'signHandle'
      })
    },
    //
    // 获取签名然后分享出去
    *signHandle(_, {put, call}) {
      const response = yield call(signShare, _);
      if(response.messageCode==900){
        // 执行分享函数
        yield put({
          type:'shareWechat',
          sign:response.data,
        })
      }else {
        Toast.info(response.message?response.message:'密码设置失败', 2);
      }
    },
    // 分享出去的动作
    *shareWechat({sign},{put,call}){
      const {appId,timestamp,nonceStr,signature} = sign;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(() => {
        const imgurl = window.location.protocol +"//" +document.domain +"/activity/sharelogo.jpg?t="+Math.random();
        const title = '火得一塌糊涂的艺术家同款面膜免费领，限时8天，多一秒无！！！';
        const desc = 'hi，girl西班牙艺术家同款玻尿酸面膜!\n全球首款艺术面膜上市抢首发，这次给你一款装饰公寓的面膜，一个旅途路上的伴侣及拿得出手的精致礼物。';
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: clearPath(), // 分享链接
          imgUrl: imgurl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: clearPath(), // 分享链接
          imgUrl: imgurl, // 分享图标
          type: "", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function(res) {
            // 用户确认分享后执行的回调函数
            console.log(res);
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: clearPath(), // 分享链接
          imgUrl: imgurl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    }
  },
  reducers:{


  }
}
