// api
import { request } from '@platform/main'


// 获取仓库详情
export function getWarehouse(id) {
  return request({
    url: `/asset/warehouse/${id}`,
    method: 'get',
  })
}


