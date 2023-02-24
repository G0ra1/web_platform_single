import Purchase from '../data/model/Purchase'
import { Request } from '@platform/main'



//根据需求计划id 查询订单详情
export function updateVirtualOrder(purchaseDto: Purchase): Promise<boolean> {
    return new Request<object, boolean>(
        `/labour/labourVirtualPurchase/associatedPurchaseContract`,
        'post',
        purchaseDto
    ).send()
}


