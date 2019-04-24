import 'lib-flexible'

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};



// export function onRouteChange({ location, routes, action }) {
//   console.log(location.pathname,action);
// }

// 改写整个应用的 render方法 在做权限的时候可以使用
// export function render(oldRender) {
//   setTimeout(oldRender, 500);
// }
//


