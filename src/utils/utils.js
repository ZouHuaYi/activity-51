
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

// 去除class
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
