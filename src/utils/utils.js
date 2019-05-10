import {getActivityId,getParentId,getUserId,getHospitalId} from './jscookie';

// 时间延时
export const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve,timeout)
  })

}

// 判断对象的方法
export function isObject(val) {
  return val != null && typeof val === "object" && Array.isArray(val) === false;
}

// 获取url的值 传递过来的值
export function getQueryString(name) {
  return window.location.href.match(new RegExp("[?&]" + name + "=([^#?&]+)", "i")) ? decodeURIComponent(RegExp.$1) : "";
};

export function browerType() {
  const ua = navigator.userAgent.toLowerCase();
  const app = /meishangmei/i;
  const wx = /MicroMessenger/i;
  return  app.test(ua) ? 'isApp' : (wx.test(ua) ? 'isWechat' : 'isWeb');
}

// 添加class
export function addClass(obj, sClass) {
  var aClass = obj.className.split(' ');
  if (!obj.className) {
    obj.className = sClass;
    return;
  }
  for (var i = 0; i < aClass.length; i++) {
    if (aClass[i] === sClass) return;
  }
  obj.className += ' ' + sClass;
}

//去除class类名
export function removeClass(obj, sClass) {
  var aClass = obj.className.split(' ');
  if (!obj.className) return;
  for (var i = 0; i < aClass.length; i++) {
    if (aClass[i] === sClass) {
      aClass.splice(i, 1);
      obj.className = aClass.join(' ');
      break;
    }
  }
}

// 角度换算成角度的方法
export function changeAnge(value) {
  return (Math.PI/180)*value;
}

// 时间格式化的写法
export function formatTime (fmt,time) {
  let timer = new Date(time*1000);
  let o = {
    "M+": timer.getMonth() + 1,    //月份
    "d+": timer.getDate(),         //日
    "H+": timer.getHours(),        //小时
    "m+": timer.getMinutes(),      //分
    "s+": timer.getSeconds(),      //秒
    "S":  timer.getMilliseconds()  //毫秒
  };
  if (/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (timer.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o){
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

// 倒计时转化
export function counterTime(fmt,timestamp) {
  const nowTime = new Date();
  const endTime = new Date(timestamp);
  const t = endTime.getTime()-nowTime.getTime();
  if(t<0){
    return -1;
  }
  const day = Math.floor(t/1000/60/60/24);
  const hours = Math.floor(t/1000/60/60%24);
  let o = {
    "d+": day,         //日
    "H+": hours,        //小时
    "m+": Math.floor(t/1000/60%60),      //分
    "s+": Math.floor(t/1000%60),      //秒
    // "S":  timer.getMilliseconds()  //毫秒
  };

  for (var k in o){
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return {fmt,day,hours};
}

// 清空分享链接的函数
export function clearPath() {
  const pathName = new URL(''+window.location.href);
  return `${pathName.origin}${pathName.pathname}?inviterId=${getUserId()||getParentId()}&activity=${getActivityId()}`;
}

// 画布的像素比的获取
export function getPixelRatio (context) {
  const backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
}



// 微信支付

export function jsSdk(signData,success,fail) {
  // 判断微信的WeixinJSBridge
  if (typeof WeixinJSBridge == "undefined"){
    if(document.addEventListener){
      document.addEventListener('WeixinJSBridgeReady', ()=>{onBridgeReady(signData,success,fail)}, false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', ()=>{onBridgeReady(signData,success,fail)});
      document.attachEvent('onWeixinJSBridgeReady', ()=>{onBridgeReady(signData,success,fail)});
    }
  }else{
    onBridgeReady(signData,success,fail);
  }
}

function onBridgeReady(payOption,success,fail) {
  // 触发微信支付
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      appId: payOption.appid, //公众号名称，由商户传入
      timeStamp: payOption.timestamp+'', //时间戳，自1970年以来的秒数
      nonceStr: payOption.noncestr, //随机串
      package: payOption.package,    //prepay_id用等式的格式
      signType: 'MD5',   //微信签名方式：
      paySign: payOption.sign,     //微信签名
    },
    function(res){
      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
        // 支付成功 返回成功页
        success&&success()
      } else{
        //  取消支付或者其他情况 get_brand_wcpay_request:cancel get_brand_wcpay_request:fail
        fail&&fail('支付取消了')
      }
    }
  );
}



