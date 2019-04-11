
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
