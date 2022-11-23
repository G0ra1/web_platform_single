// api
import { request } from '@platform/main'
export function test (params) {
  return request({
      url: `/irm/roles/list`,
      method: 'post',
      data: params
  })
}

export function portalPortalList (params) {
  return request({
      url: `/portal/portalPortal/list`,
      method: 'post',
      data: params
  })
}
export function add (params) {
  return request({
      url: `/portal/portalPortal`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/portal/portalPortal`,
      method: 'put',
      data: params
  })
}
// 设置首页
export function setHomePage (id) {
  return request({
      url: `/portal/portalPortal/${id}`,
      method: 'put',
  })
}
export function del (id) {
  return request({
      url: `/portal/portalPortal/${id}`,
      method: 'delete',
  })
}
export function details (id) {
  return request({
      url: `/portal/portalPortal/${id}`,
      method: 'get',
  })
}



