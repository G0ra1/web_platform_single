import { request } from '@platform/main'

//需求计划详情信息
export function getPlanDetail(id: string) {
  return request({
    url: `/labour/labourPlan/${id}`,
    method: 'get',
  })
}

//修改人力动员数据
export function personMobilizationPUT(params: object) {
  return request({
    url: `/labour/personMobilization`,
    method: 'PUT',
    data: params
  })
}