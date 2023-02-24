import { Request,request } from '@platform/main'



//获取所有结算记录
export function getByVirtualPurchaseId (key: string) {
    return request({
        url: `/labour/labourVirtualPurchaseSettle/getByVirtualPurchaseId/${key}`,
        method: 'get',
    })
}

//反结算操作
export function settleReverse (key: string) {
    return request({
        url: `/labour/api/settleReverse/${key}`,
        method: 'get',
    })
}

