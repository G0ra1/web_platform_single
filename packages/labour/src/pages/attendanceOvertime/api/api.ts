import { request } from '@platform/main'

//采购合同详情信息
export function getSuppUserContractWork(id: string) {
  return request({
    url: `/labour/labourAttendance/getSuppUserContractWork?suppUserId=${id}`,
    method: 'get',
  })
}