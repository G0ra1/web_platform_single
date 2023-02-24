import { request } from '@platform/main'

//需求计划详情信息
export function getPlanDetail(id: string) {
  return request({
    url: `/labour/labourPlan/${id}`,
    method: 'get',
  })
}
