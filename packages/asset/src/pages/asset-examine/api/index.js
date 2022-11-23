// api
import { request } from '@platform/main'
// 新建接口
export function create(params) {
  return request({
    url: `/asset/viewer`,
    method: 'post',
    data: params
  })
}
// 删除接口
export function del(id) {
  return request({
    url: `/asset/viewer/${id}`,
    method: 'delete',
  })
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/asset/viewer`,
    method: 'put',
    data: params
  })
}
// 查询接口
export function query(data) {
  return request({
    url: `/asset/viewer/list`,
    method: 'post',
    data
  })
}

// 获取上级任务
export function getUpTask(taskLevel) {
  return request({
    url: `/asset/task/getUpTask/${taskLevel}`,
    method: 'post',
  })
}

// 获取上级任务
export function getChildTask(parentId) {
  return request({
    url: `/asset/task/getChildTask/${parentId}`,
    method: 'post',
  })
}
export function historyList(data) {
  return request({
    url: `/asset/taskHistory/list`,
    method: 'post',
    data
  })
}
export function recover(data) {
  return request({
    url: `/asset/taskHistory/recover`,
    method: 'post',
    data
  })
}
//  获取详情
export function details(id) {
  return request({
    url: `/asset/viewer/${id}`,
    method: 'get',
  })
}