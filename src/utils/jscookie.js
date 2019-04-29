/**
 * Created by zhy on 2019/3/19.
 */
const MSM_TOKEN = 'Admin-Token';
const MSM_USERID = 'User-Id';
const MSM_ACTIVITY_ID = 'Activity-Id';
const MSM_PARENT_ID = 'Parent-Id';
const MSM_UNION = 'Union-Id';
const MSM_OPEN_ID = 'Open-Id';
const MSM_HOSPITAL_ID = 'Hospital-Id';


export function setHospitalId(value) {
  if(!value) return;
  return window.sessionStorage.setItem(MSM_HOSPITAL_ID,value);
}

export function getHospitalId() {
  return window.sessionStorage.getItem(MSM_HOSPITAL_ID);
}

export function setToken(value) {
  if(!value) return;
  window.sessionStorage.setItem(MSM_TOKEN,value);
}

export function getToken() {
  return window.sessionStorage.getItem(MSM_TOKEN);
}

export function removeToken() {
  window.sessionStorage.removeItem(MSM_TOKEN);
}

export function setUserId(value) {
  if(!value) return;
  window.sessionStorage.setItem(MSM_USERID,value);
}

export function getUserId() {
  return window.sessionStorage.getItem(MSM_USERID);
}

export function setActivityId(value) {
  if(!value) return;
  window.sessionStorage.setItem(MSM_ACTIVITY_ID,value);
}

export function getActivityId() {
  return window.sessionStorage.getItem(MSM_ACTIVITY_ID);
}

export function setParentId(value) {
  if(!value) return;
  window.sessionStorage.setItem(MSM_PARENT_ID,value);
}

export function getParentId() {
  return window.sessionStorage.getItem(MSM_PARENT_ID);
}

export function setUnionId(value) {
  if(!value) return;
  window.sessionStorage.setItem(MSM_UNION,value);
}

export function getUnionId() {
  return window.sessionStorage.getItem(MSM_UNION);
}

export function setOpenId(value) {
  if(!value) return;
  window.sessionStorage.setItem(MSM_OPEN_ID,value);
}

export function getOpenId() {
  return window.sessionStorage.getItem(MSM_OPEN_ID);
}

