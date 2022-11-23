// api
import { request } from '@platform/main';

// 查询接口
export function query(data) {
  return request({
    url: `/asset/purchaseApply/detailLists`,
    method: "post",
    data,
  });
}

export function historyList(data) {
  return request({
    url: `/asset/warehouseHistory/list`,
    method: "post",
    data,
  });
}
export function recover(data) {
  return request({
    url: `/asset/warehouseHistory/recover`,
    method: "post",
    data,
  });
}
export function getTreeTask(level) {
  return request({
    url: `/asset/purchaseApply/getTreeTask/${level}`,
    method: "get",
  });
}

// 组织机构列表
export function mdmOrgList(params) {
  return request({
    url: `/main/mdmOrg/list`,
    method: "post",
    data: params,
  });
}

export function itemType() {
  return request({
    url: `/main/dictItem/list?dictCode=asset_type`,
    method: "get",
  });
}
