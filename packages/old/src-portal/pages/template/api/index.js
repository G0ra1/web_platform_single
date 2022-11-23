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

// 删除整个模板
export function deleteTemplate (params) {
  return request({
      url: `/portal/portaltemplate/deleteTemplate`,
      method: 'delete',
      data: params
  })
}
// 查询模板版本列表
export function queryVersion (params) {
  return request({
      url: `/portal/portaltemplate/templateVersions`,
      method: 'post',
      data: params
  })
}
// 生效版本/portaltemplate/updateVersion
export function updateVersion (params) {
  return request({
      url: `/portal/portaltemplate/updateVersion`,
      method: 'put',
      data: params
  })
}
// 删除模板某个版本
export function delVersion (ids) {
  return request({
      url: `/portal/portaltemplate/${ids}`,
      method: 'delete'
  })
}