// api
import { request } from '@platform/main'

export function fileDsList(params) {
  return request({
    url: `/main/fileDs/list`,
    method: "post",
    data: params
  });
}
export function add(params) {
  return request({
    url: `/main/fileDs`,
    method: "post",
    data: params
  });
}
export function edit(params) {
  return request({
    url: `/main/fileDs`,
    method: "put",
    data: params
  });
}
export function fileDsdel(id) {
  return request({
    url: `/main/fileDs/${id}`,
    method: "delete"
  });
}
export function setDefault(id) {
  return request({
    url: `/main/fileDs/setDefault/${id}/1`,
    method: "put",
  });
}

export function details(id) {
  return request({
    url: `/main/fileDs/${id}`,
    method: "get"
  });
}
// 测试链接

export function fileDsConnect(params) {
  return request({
    url: `/main/fileDs/connect`,
    method: "post",
    data: params
  });
}

// 获取所有数据源
export function dbdsCurrentDs() {
  return request({
    url: `/main/fileDs/list`,
    method: "get"
  });
}

