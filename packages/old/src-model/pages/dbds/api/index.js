// api
import { request } from '@platform/main'
export function test(params) {
  return request({
    url: `/main/dbds/currentDs`,
    method: "post",
    data: params
  });
}

export function list(params) {
  return request({
    url: `/main/dbds/page`,
    method: "post",
    data: params
  });
}
export function add(params) {
  return request({
    url: `/main/dbds`,
    method: "post",
    data: params
  });
}
export function edit(params) {
  return request({
    url: `/main/dbds`,
    method: "put",
    data: params
  });
}

export function del(id) {
  return request({
    url: `/main/dbds/${id}`,
    method: "delete"
  });
}
export function details(id) {
  return request({
    url: `/main/dbds/${id}`,
    method: "get"
  });
}
// 获取子系统
export function dictItemLists(data) {
  return request({
    url: `/main/dictItem/list?dictCode=${data.code}`,
    method: "get"
  });
}
// 测试链接

export function check(params) {
  return request({
    url: `/main/dbds/check`,
    method: "post",
    data: params
  });
}

// 获取所有数据源
export function dbdsCurrentDs() {
  return request({
    url: `/main/dbds/list`,
    method: "get"
  });
}

export function fileDsList(params) {
  return request({
    url: `/main/fileDs/list`,
    method: "post",
    data: params
  });
}

// 获取详情
export function fileDsDetails(id) {
  return request({
    url: `/main/fileDs/${id}`,
    method: "get"
  });
}
