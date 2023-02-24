import { Request, request } from '@platform/main'

//字典 调用
export function getDict(key: string) {
  return request({
    url: `/main/dictItem/list?dictCode=${key}`,
    method: "get",
  });
}
// 获取仓库详情
export function getWarehouse(id: string) {
  return request({
    url: `/asset/warehouse/${id}`,
    method: "get",
  });
}


