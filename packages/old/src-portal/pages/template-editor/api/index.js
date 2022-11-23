// api
import { request } from '@platform/main'

// 查询模板列表
export function query (params) {
  return request({
      url: `/portal/portaltemplate/list`,
      method: 'post',
      data: params
  })
}
// 查询模板
export function queryById (id) {
  return request({
      url: `/portal/portaltemplate/${id}`,
      method: 'get'
  })
}

// 新增模板
export function create (params) {
  return request({
      url: `/portal/portaltemplate`,
      method: 'post',
      data: params
  })
}
// 编辑模板
export function edit (params) {
  return request({
      url: `/portal/portaltemplate`,
      method: 'put',
      data: params
  })
}
// 删除模板
export function del (id) {
  return request({
      url: `/portal/portaltemplate/${id}`,
      method: 'delete',
      data: params
  })
}
// 删除模板版本
export function delByVersion (params) {
  return request({
      url: `/portal/portaltemplate/deleteTemplate`,
      method: 'delete',
      data: params
  })
}