// api
import { request } from '@platform/main'


export function  query (params) {
  return request({
      url: `cts/ctsLinkman/page`,
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

// 全部联系人取消收藏
export function  cancelCollectMan (id) {
  return request({
      url: `cts/ctsLinkman/${id}`,
      method: 'delete',
     
  })
}

// 插入联系人
export function  saveBatch (params) {
  return request({
      url: `cts//ctsLinkman/saveBatch`,
      method: 'post',
      data: params
  })
}
