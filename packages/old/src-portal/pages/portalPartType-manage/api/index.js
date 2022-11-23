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
      url: `/portal/portalPartType/list`,
      method: 'post',
      data: params
  })
}
export function add (params) {
  return request({
      url: `/portal/portalPartType`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/portal/portalPartType`,
      method: 'put',
      data: params
  })
}
export function del (id) {
  return request({
      url: `/portal/portalPartType/${id}`,
      method: 'delete',
  })
}
export function details (id) {
  return request({
      url: `/portal/portalPartType/${id}`,
      method: 'get',
  })
}



