import {browerType,getQueryString} from "@/utils/utils";
import 'lib-flexible'

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};



export function onRouteChange({ location, routes, action }) {
  console.log(location.pathname,action);
}

// 改写整个应用的 render方法 在做权限的时候可以使用
export function render(oldRender) {
  setTimeout(oldRender, 500);
}



if(browerType()==='isWechat'){
  const code = getQueryString('code');
  if(code){
    // 获取到微信值后微信登录执行


  }else {
    const appid = 'wx594f420067cba83d';
    const backUrl = encodeURIComponent(window.location.href);
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  }
}

// window.g_app._store.dispatch({
//   type:'login/test'
// })
