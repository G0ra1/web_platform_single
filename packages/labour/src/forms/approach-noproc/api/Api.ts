import { request } from '@platform/main'


//需求计划-人员推荐
export function getLabourPlanReferralList(params: object) {
  return request({
    url: `/labour/labourPlanReferral/list`,
    method: 'POST',
    data: params
  })
}