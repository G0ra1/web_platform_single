// api
import { request } from '@platform/main'

// /portalTheme/list
export function queryAll (params = {}) {
  return request({
    url: `/portal/portalTheme/lists`,
    method: 'post',
    data: params
  })
}

// /portalTheme/list
export function add (params) {
  return request({
    url: `/portal/portalTheme`,
    method: 'post',
    data: params
  })
}

// /portalTheme/list
export function edit (params) {
  return request({
    url: `/portal/portalTheme`,
    method: 'put',
    data: params
  })
}

// /portalTheme/list
export function del (params) {
  return request({
    url: `/portal/portalTheme/${params}`,
    method: 'delete'
  })
}


// /portalTheme/list /portalTheme/switchTheme/{id}
export function switchTheme (params) {
  return request({
    url: `/portal/portalTheme/switchTheme/${params}`,
    method: 'get'
  })
}

