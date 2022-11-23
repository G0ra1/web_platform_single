// api
import { request } from '@platform/main'
export function test(params) {
  return request({
    url: `/irm/roles/list`,
    method: 'post',
    data: params
  })
}

export function list(params) {
  return request({
    url: `/main/job/page`,
    method: 'post',
    data: params
  })
}
export function add(params) {
  return request({
    url: `/main/job`,
    method: 'post',
    data: params
  })
}
export function edit(params) {
  return request({
    url: `/main/job`,
    method: 'put',
    data: params
  })
}
export function del(id) {
  return request({
    url: `/main/job/${id}`,
    method: 'delete',
  })
}
export function details(id) {
  return request({
    url: `/main/job/${id}`,
    method: 'get',
  })
}

export function changeStatus(id) {
  return request({
    url: `/main/job/changeStatus?jobId=${id}`,
    method: 'get',
  })
}

// 查询表达式是否有效
export function checkCronExpressionIsValid(cronExpression) {
  return request({
    url: `/main/job/checkCronExpressionIsValid?cronExpression=${cronExpression}`,
    method: 'get',
  })
}

// 查询近十次执行
export function queryCronExpression(cronExpression) {
  return request({
    url: `/main/job/queryCronExpression?cronExpression=${cronExpression}`,
    method: 'get',
  })
}

// 立即执行一次
export function jobRun(jobId) {
  return request({
    url: `/main/job/run?jobId=${jobId}`,
    method: 'get',
  })
}

//字典 日志管理中调用
export function dictItemLists(id) {
  return request({
    url: `/main/dictItem/list?dictCode=${id}`,
    method: 'get',
  })
}
// 获取消息生产者
export function producerPage(params) {
  return request({
    url: `/main/producer/page`,
    method: "post",
    data: params
  });
}
// 获取消息生产者详情
export function producerDetails(id) {
  return request({
    url: `/main/producer/detailId/${id}`,
    method: "get"
  });
}
export function queryApp(data) {
  return request({
    url: `/main/mdmApp/tree`,
    method: 'post',
    data
  })
}











