import {getActivityId,getParentId} from './jscookie';

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


export function clearPath() {
  const url = window.location.href.split("#")[0];
  return `${url}#/activity=${getActivityId()}&inviterId=${getParentId()}`;
}
