import { request } from '@platform/main'

//采购合同详情信息
export function getPurchaseDetail(id: string) {
  return request({
    url: `/purchasecontract/purchase/contract/${id}`,
    method: 'get',
  })
}
