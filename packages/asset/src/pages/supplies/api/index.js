// api
import { request } from '@platform/main'
// 新建接口
export function create(params) {
  return request({
    url: `/asset/supplies`,
    method: 'post',
    data: params
  })
}
// 删除接口
export function del(id) {
  return request({
    url: `/asset/supplies/${id}`,
    method: 'delete',
  })
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/asset/supplies`,
    method: 'put',
    data: params
  })
}
// 详情接口
export function details(id) {
  return request({
    url: `/asset/supplies/${id}`,
    method: 'get',
  })
}
// 查询接口
export function query(data) {
  return request({
    url: `/asset/supplies/list`,
    method: 'post',
    data
  })
}

// 获取上级任务
export function getUpTask(taskLevel) {
  return request({
    url: `/asset/supplies/getUpTask/${taskLevel}`,
    method: 'get',
  })
}

// 获取上级任务
export function getChildTask(parentId) {
  return request({
    url: `/asset/supplies/getChildTask/${parentId}`,
    method: 'post',
  })
}
export function historyList(data) {
  return request({
    url: `/asset/supplies/list`,
    method: 'post',
    data
  })
}
export function recover(data) {
  return request({
    url: `/asset/supplies/recover`,
    method: 'post',
    data
  })
}
export function getTreeTask(level) {
  return request({
    url: `/asset/supplies/getTreeTask/${level}`,
    method: 'get',
  })
}


// 组织机构列表
export function  mdmOrgList(params) {
  return request({
      url: `/main/mdmOrg/list`,
      method: 'post',
      data: params
  })
}
//物资类型字典
export function itemType() {
  return request({
    url: `/dict/dictItem/list?dictCode=asset_type`,
    method: "get",
  });
}