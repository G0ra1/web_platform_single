// api
import { request } from '@platform/main'
export function test (params) {
  return request({
      url: `/irm/roles/list`,
      method: 'post',
      data: params
  })
}

export function list (params) {
  return request({
      url: `/portal/portalContentBanners/list`,
      method: 'post',
      data: params
  })
}
export function add (params) {
  return request({
      url: `/portal/portalContentBanners`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/portal/portalContentBanners`,
      method: 'put',
      data: params
  })
}
// 设置首页
export function setHomePage (id) {
  return request({
      url: `/portal/portalContentBanners/${id}`,
      method: 'put',
  })
}
export function del (id) {
  return request({
      url: `/portal/portalContentBanners/${id}`,
      method: 'delete',
  })
}
export function details (id) {
  return request({
      url: `/portal/portalContentBanners/${id}`,
      method: 'get',
  })
}
// 门户
export function portalPortalLists (params) {
  return request({
      url: `/portal/portalPortal/lists`,
      method: 'post',
      data: params
  })
}
// 栏目类型
export function portalPartTypeLists (params) {
  return request({
      url: `/portal/portalPartType/lists`,
      method: 'post',
      data: params
  })
}
// 所属栏目
export function portalPartLists (params) {
  return request({
      url: `/portal/portalPart/lists`,
      method: 'post',
      data: params
  })
}



