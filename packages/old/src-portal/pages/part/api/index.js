// api
import { request } from '@platform/main'

// 查询栏目列表
export function query(params) {
  return request({
    url: `/portal/portalPart/list`,
    method: 'post',
    data: params
  })
}

// 查询模板列表
export function queryAll(params) {
  return request({
    url: `/portal/portalPart/lists`,
    method: 'post',
    data: params
  })
}

// 新增模板
export function create(params) {
  return request({
    url: `/portal/portalPart`,
    method: 'post',
    data: params
  })
}
// 编辑模板
export function edit(params) {
  return request({
    url: `/portal/portalPart`,
    method: 'put',
    data: params
  })
}
// 删除模板
export function del(ids) {
  return request({
    url: `/portal/portalPart/${ids}`,
    method: 'delete'
  })
}
// 栏目类型
export function portalPartTypeLists(params) {
  return request({
    url: `/portal/portalPartType/lists`,
    method: 'post',
    data: params
  })
}
//字典 
export function dictItemLists(dictCode) {
  return request({
    url: `/main/dictItem/list?dictCode=${dictCode}`,
    method: 'get',
  })
}



//树形字典 
export function treeDict(dictCode) {
  return request({
    url: `/main/dictTree/childList/${dictCode}`,
    method: 'get',
  })
}
// 创建任务
export function createManual(data) {
  return request({
    url: `center/todo/create/manual`,
    method: 'post',
    data
  })
}
// 列表视图
export function todoListView(params) {
  return request({
    url: `center/todo/list/view`,
    method: 'get',
    params
  })
}
// 创建任务
export function todoUpdata(data) {
  return request({
    url: `center/todo/update`,
    method: 'put',
    data
  })
}
// 任务详情
export function todoDetail(id) {
  return request({
    url: `center/todo/detail/${id}`,
    method: 'get',
  })
}
export function tododel(id) {
  return request({
    url: `center/todo/del/${id}`,
    method: 'delete',
  })
}
export function todofinish(id, params) {
  return request({
    url: `center/todo/finish/${id}`,
    method: 'put',
    params
  })
}


