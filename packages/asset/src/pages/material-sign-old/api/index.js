// api
import { request } from '@platform/main'
// 新建接口
export function create(params) {
  return request({
    url: `/asset/materialSign`,
    method: 'post',
    data: params
  })
}
// 删除接口
export function del(id) {
  return request({
    url: `/asset/materialSign/${id}`,
    method: 'delete',
  })
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/asset/materialSign`,
    method: 'put',
    data: params
  })
}
// 查询接口
export function query(data) {
  return request({
    url: `/asset/materialSign/list`,
    method: 'post',
    data
  })
}

// 获取上级任务
export function getUpTask(taskLevel) {
  return request({
    url: `/asset/materialSign/getUpTask/${taskLevel}`,
    method: 'get',
  })
}

// 获取上级任务
export function getChildTask(parentId) {
  return request({
    url: `/asset/materialSign/getChildTask/${parentId}`,
    method: 'post',
  })
}
export function historyList(data) {
  return request({
    url: `/asset/warehouseHistory/list`,
    method: 'post',
    data
  })
}
export function recover(data) {
  return request({
    url: `/asset/warehouseHistory/recover`,
    method: 'post',
    data
  })
}
export function getTreeTask(level) {
  return request({
    url: `/asset/materialSign/getTreeTask/${level}`,
    method: 'get',
  })
}


// 组织机构列表
export function mdmOrgList(params) {
  return request({
    url: `/main/mdmOrg/list`,
    method: 'post',
    data: params
  })
}

export function fileinfo(ids) {
  return request({
    url: `/main/fileinfo/getByIds?ids=${ids}`,
    method: "get",
  });
}
export function getpurchaseRegister(id) {
  return request({
    url: `/asset/materialSign/${id}`,
    method: "get",
  });
}


export function wuziType() {
  return request({
    url: `/main/dictItem/list?dictCode=asset_wzly`,
    method: "get",
  });
}
