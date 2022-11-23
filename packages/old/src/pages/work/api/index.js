// api
import { request } from '@platform/main'

export function getAuthSys (params) {
  return request({
      url: `/getAuthSys`,
      method: 'get',
  })
}
export function getAuthRes (params) {
  return request({
      url: `/getAuthRes`,
      method: 'get',
      params: {
        system: params
      }
  })
}
  
