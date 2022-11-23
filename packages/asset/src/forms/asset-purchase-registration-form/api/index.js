// api
import { request } from '@platform/main'

// 获取仓库详情
export function getWarehouse(id) {
  return request({
    url: `/asset/warehouse/${id}`,
    method: "get",
  });
}

export function getUser() {
  return request({
    url: `/asset/assetLoginUser/getUser`,
    method: "post",
  });
}

export function getItem(id) {
  return request({
    url: `/mdm/item/${id}`,
    method: "get",
  });
}
export function dictItemLists(id) {
  return request({
    url: `/main/dictItem/list?dictCode=${id}`,
    method: "get",
  });
}

export function getPurchaseApply(id) {
  return request({
    url: `/asset/purchaseApply/${id}`,
    method: "get",
  });
}
export function fileinfo(ids) {
  return request({
    url: `/file/fileinfo/getByIds?ids=${ids}`,
    method: "get",
  });
}
export function getApplyList() {
  return request({
    url: `/asset/purchaseRegister/getApplyList`,
    method: "post",
    data: {},
  });
}
