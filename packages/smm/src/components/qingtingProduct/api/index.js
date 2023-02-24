// api
import { request } from '@platform/main'

export function queryList(params) {
  return request({
    url: `/smm/smmHebooilNglClient/page`,
    method: 'post',
    data: params
  })
}


