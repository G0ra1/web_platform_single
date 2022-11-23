// api
import { request } from '@platform/main'


export function getItemClassify(id) {
  return request({
    url: `/mdm/itemClassify/${id}`,
    method: 'get',
  })
}

export function itemClassifyList(data) {
  return request({
    url: `/mdm/itemClassify/list`,
    method: 'post',
    data
  })
}

