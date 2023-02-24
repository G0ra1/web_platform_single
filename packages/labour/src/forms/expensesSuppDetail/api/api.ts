import { request } from '@platform/main'

//需求计划详情信息
export function getPlanDetail(id: string) {
  return request({
    url: `/labour/labourPlan/${id}`,
    method: 'get',
  })
}

//虚拟订单详情信息
export function getVirtualPurchase(params: object) {
  return request({
    url: `/labour/labourVirtualPurchase/getByPlanIdSuppOrgId`,
    method: 'get',
    params: params
  })
}

//人员进离场信息
export function getPersonMobilizationList(params: object) {
  return request({
    url: `/labour/personMobilization/list`,
    method: 'POST',
    data: params
  })
}