// api
import { request } from '@platform/main'
export function test ({url,params,dsReq,headers}) {
  return request({
      url: url,
      method: dsReq,
      data: params,
      headers,
  })
}

export function portalDsList (params) {
  return request({
      url: `/portal/portalDs/list`,
      method: 'post',
      data: params
  })
}
export function portalDsLists (params) {
  return request({
      url: `/portal/portalDs/lists`,
      method: 'post',
      data: params
  })
}
export function add (params) {
  return request({
      url: `/portal/portalDs`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/portal/portalDs`,
      method: 'put',
      data: params
  })
}
export function del (id) {
  return request({
      url: `/portal/portalDs/${id}`,
      method: 'delete',
  })
}
export function details (id) {
  return request({
      url: `/portal/portalDs/${id}`,
      method: 'get',
  })
}



