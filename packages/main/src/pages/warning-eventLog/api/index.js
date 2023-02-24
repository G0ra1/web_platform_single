// api
import { request } from "@platform/main"
export function msgAllPage (params) {
  return request({
      url: `/main/mainAllPage`,
      method: 'post',
      data: params
  })
}
// 设置已读
export function editRead (params) {
  return request({
      url: `/main/editRead/${params}`,
      method: 'put',
      data: params
  })
}

export function detail (id) {
  return request({
      url: `/main/detail/${id}`,
      method: 'get',
  })
}
export function del (id) {
  return request({
      url: `/main/del/${id}`,
      method: 'delete',
  })
}