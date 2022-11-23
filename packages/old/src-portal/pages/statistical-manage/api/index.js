// api
import { request } from '@platform/main'
export function test (params) {
  return request({
      url: `/irm/roles/list`,
      method: 'post',
      data: params
  })
}

// 用户访问量
export function portalPortalHis (params) {
  return request({
      url: `/portal/PortalStatistics/portalPortalHis`,
      method: 'post',
      data: params
  })
}
//新闻数量
export function portalNewsNumber (params) {
  return request({
      url: `/portal/PortalStatistics/portalNewsNumber`,
      method: 'post',
      data: params
  })
}
// 栏目点击量 
export function portalPartHis (params) {
  return request({
      url: `/portal/PortalStatistics/portalPartHis`,
      method: 'post',
      data: params
  })
}
export function add (params) {
  return request({
      url: `/portal/portalContentNews`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/portal/portalContentNews`,
      method: 'put',
      data: params
  })
}
// 设置首页
export function setHomePage (id) {
  return request({
      url: `/portal/portalContentNews/${id}`,
      method: 'put',
  })
}
export function del (id) {
  return request({
      url: `/portal/portalContentNews/${id}`,
      method: 'delete',
  })
}
export function details (id) {
  return request({
      url: `/portal/portalContentNews/${id}`,
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








