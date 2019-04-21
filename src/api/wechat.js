import request from "@/utils/request";
import {getUserId} from "@/utils/jscookie";

export async function signShare() {
  return request('/rest/user/getSign',{
    method:'POST',
    body:{
      url:encodeURIComponent(window.location.href.split("#")[0])
    }
  })
}
