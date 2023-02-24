// api
import { request } from '@platform/main'

// 组织机构列表
export function queryList(params) {
  return request({
    url: `/smm/smmHebooilClient/page`,
    method: 'post',
    data: params
  })
}


