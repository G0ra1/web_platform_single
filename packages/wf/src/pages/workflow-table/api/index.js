// api
import { request } from '@platform/main'

// 草稿
export function draftList(params) {
  return request({
    url: `/wf/wftodotask/draftList`,
    method: 'post',
    data: params
  })
}
// 待办
export function wftodotaskList(params) {
  return request({
    url: `/wf/wftodotask/list`,
    method: 'post',
    data: params
  })
}
// 已办
export function wfdonetaskList(params) {
  return request({
    url: `/wf/wfdonetask/list`,
    method: 'post',
    data: params
  })
}
// 转办
export function forwardedTaskList(params) {
  return request({
    url: `/wf/forwardedTask/list`,
    method: 'post',
    data: params
  })
}
// 委托的待办
export function delegationTaskList(params) {
  return request({
    url: `/wf/delegationTask/list`,
    method: 'post',
    data: params
  })
}
// 收到的传阅
export function myinduplicatetaskList(params) {
  return request({
    url: `/wf/myinduplicatetask/list`,
    method: 'post',
    data: params
  })
}
// 发出的传阅
export function wfmyoutduplicatetaskList(params) {
  return request({
    url: `/wf/wfmyoutduplicatetask/list`,
    method: 'post',
    data: params
  })
}
// 收到的知会
export function receiveNotifyTaskList(params) {
  return request({
    url: `/wf/receiveNotifyTask/list`,
    method: 'post',
    data: params
  })
}
// 发起的流程
export function wfmydrafttaskList(params) {
  return request({
    url: `/wf/wfmydrafttask/list`,
    method: 'post',
    data: params
  })
}
// 发出的知会
export function wfSendNotifyTaskList(params) {
  return request({
    url: `/wf/wfSendNotifyTask/list `,
    method: 'post',
    data: params
  })
}


export function del(data) {
  return request({
    url: `/wf/wfEngine/deleteProcess`,
    method: 'post',
    data
  })
}



