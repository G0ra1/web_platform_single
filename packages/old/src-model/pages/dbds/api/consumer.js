// api
import { request } from '@platform/main'

export function consumerPage(params) {
  return request({
    url: `/main/consumer/page`,
    method: "post",
    data: params
  });
}
export function add(params) {
  return request({
    url: `/main/consumer`,
    method: "post",
    data: params
  });
}
export function edit(params) {
  return request({
    url: `/main/consumer`,
    method: "put",
    data: params
  });
}
export function consumerdel(id) {
  return request({
    url: `/main/consumer/${id}`,
    method: "delete"
  });
}
export function changeConsumerStatus(id) {
  return request({
    url: `/main/consumer/changeStatus?mqId=${id}`,
    method: "get",
  });
}

export function consumerDetails(id) {
  return request({
    url: `/main/consumer/detailId/${id}`,
    method: "get"
  });
}

// 消息模板
export function tmpList (params) {
  return request({
      url: `/main/tmp/page`,
      method: 'post',
      data: params
  })
}



