/**
 * Created by zhy on 2019/3/19.
 */
const MSM_TOKEN = 'Admin-Token';
const MSM_USERID = 'User-Id';

export function setToken(value) {
  return window.sessionStorage.setItem(MSM_TOKEN,value);
}

export function getToken() {
  return window.sessionStorage.getItem(MSM_TOKEN);
}

export function setUserId(value) {
  return window.sessionStorage.setItem(MSM_USERID,value);
}

export function getUserId() {
  return window.sessionStorage.getItem(MSM_USERID);
}
