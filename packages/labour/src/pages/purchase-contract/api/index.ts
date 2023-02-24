import { Request } from '@platform/main'

export function getPurchaseContractList(){
    return new Request(
        `/purchasecontract/purchase/contract/list`,
        'post',
    ).send()
}