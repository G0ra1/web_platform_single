// api/main
import { request } from "@platform/main"
export function tmpList(params) {
  return request({
    url: `/main/tmp/page`,
    method: 'post',
    data: params
  })
}

export function creatTmp(params) {
  return request({
    url: `/main/tmp`,
    method: 'post',
    data: params
  })
}
export function editTmp(params) {
  return request({
    url: `/main/tmp`,
    method: 'put',
    data: params
  })
}

export function del(id) {
  return request({
    url: `/main/tmp/${id}`,
    method: 'delete',
  })
}
// 模板消息发送
export function sendMessage(params) {
  return request({
    url: `/main/tmp/send`,
    method: 'post',
    data: params
  })
}