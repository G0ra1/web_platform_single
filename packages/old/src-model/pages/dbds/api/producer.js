// api
import { request } from '@platform/main'

export function producerPage(params) {
  return request({
    url: `/main/producer/page`,
    method: "post",
    data: params
  });
}
export function add(params) {
  return request({
    url: `/main/producer`,
    method: "post",
    data: params
  });
}
export function edit(params) {
  return request({
    url: `/main/producer`,
    method: "put",
    data: params
  });
}
export function producerdel(id) {
  return request({
    url: `/main/producer/${id}`,
    method: "delete"
  });
}
export function changeProducerStatus(id) {
  return request({
    url: `/main/producer/changeStatus?mqId=${id}`,
    method: "get",
  });
}

export function producerDetails(id) {
  return request({
    url: `/main/producer/detailId/${id}`,
    method: "get"
  });
}

export function producerSend(params) {
  return request({
    url: `/main/producer/send`,
    method: "post",
    data: params
  });
}




