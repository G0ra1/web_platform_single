// api
import { request } from '@platform/main'



export function getItemClassify(id) {
  return request({
    url: `/mdm/itemClassify/${id}`,
    method: 'get',
  })
}
export function getItem(id) {
  return request({
    url: `/mdm/item/${id}`,
    method: 'get',
  })
}

export function delSku(id) {
  return request({
    url: `/mdm/item/deleteLine/${id}`,
    method: 'delete',
  })
}
export function delUnit(id) {
  return request({
    url: `/mdm/item/deleteUnit/${id}`,
    method: 'delete',
  })
}






