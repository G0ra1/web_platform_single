// api
import { request } from '@platform/main'
// 新建接口
export function create(params) {
  return request({
    url: `/mdm/item`,
    method: 'post',
    data: params
  })
}
// 删除接口
export function del(id) {
  return request({
    url: `/mdm/item/${id}`,
    method: 'delete',
  })
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/mdm/item`,
    method: 'put',
    data: params
  })
}
// 查询接口
export function query(data) {
  return request({
    url: `/mdm/item/list`,
    method: 'post',
    data
  })
}

// 获取上级任务
export function getUpTask(taskLevel) {
  return request({
    url: `/mdm/item/getUpTask/${taskLevel}`,
    method: 'get',
  })
}

// 获取上级任务
export function getChildTask(parentId) {
  return request({
    url: `/mdm/item/getChildTask/${parentId}`,
    method: 'post',
  })
}
export function historyList(data) {
  return request({
    url: `/mdm/itemHistory/list`,
    method: 'post',
    data
  })
}
export function recover(data) {
  return request({
    url: `/mdm/itemHistory/recover`,
    method: 'post',
    data
  })
}
export function getTreeTask(level) {
  return request({
    url: `/mdm/item/getTreeTask/${level}`,
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
// 获取仓库详情
export function getItem(id) {
  return request({
    url: `/mdm/item/${id}`,
    method: 'get',
  })
}
// 保存仓库货架
export function saveShelfs(data) {
  return request({
    url: `/mdm/item/saveShelfs`,
    method: 'post',
    data
  })
}

export function itemClassifyList(data) {
  return request({
    url: `/mdm/itemClassify/list`,
    method: 'post',
    data
  })
}
export function creatItemClassify(data) {
  return request({
    url: `/mdm/itemClassify`,
    method: 'post',
    data
  })
}
export function editItemClassify(data) {
  return request({
    url: `/mdm/itemClassify`,
    method: 'put',
    data
  })
}
export function delItemClassify(id) {
  return request({
    url: `/mdm/itemClassify/${id}`,
    method: 'delete',
  })
}





