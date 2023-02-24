import { Request,request } from '@platform/main'


//调用获取需求计划
export function getPlan (key: string) {
    return request({
        url: `/labour/labourPlan/${key}`,
        method: 'get',
    })
  }