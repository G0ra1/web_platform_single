// api
import { request } from '@platform/main'


export function  query (params) {
  return request({
      url: `cts/ctsFsend/page`,
      method: 'post',
      data: params
  })
}
// 全部联系人收藏
export function  collectMan (params) {
  return request({
      url: `cts/ctsLinkman`,
      method: 'post',
      data: params
  })
}

