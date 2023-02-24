import { Request,request } from '@platform/main'

export function getPurchaseList(){
    return new Request(
        `/purchasecontract/purchase/contract/list`,
        'post',
    ).send()
}
// 获取需求计划
export function getLabourPlan(id:any){
    return new Request(
        `/labour/labourPlan/${id}`,
        'get',
    ).send()
}
