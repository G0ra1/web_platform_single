import { Request,request } from '@platform/main'

// 获取字典
// export function getDict(key: string): Promise<Array<any>> {
//     return new Request<object, Array<any>>(
//         `/labour/eosDict/dictType/${key}`,
//         'get'
//     ).send()
// }


//调用获取采购合同
export function getPurchaseContract (key: string) {
    return request({
        url: `/purchasecontract/purchase/contract/${key}`,
        method: 'get',
    })
  }
//计算虚拟订单结算单内容
export function countAllCostForSettle (data:any) {
    return request({
        url: `/labour/api/countAllCostForSettle`,
        method: 'post',
        data
    })
  }

//获取所有结算记录
export function getByVirtualPurchaseId (key: string) {
  return request({
      url: `/labour/labourVirtualPurchaseSettle/getByVirtualPurchaseId/${key}`,
      method: 'get',
  })
}


