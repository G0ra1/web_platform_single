import { Request } from '@platform/main'

export function getlabourWorkOrderInfoList() {
    return new Request(
        `/labour/labourWorkOrderInfo/list`,
        'post',
    ).send()
}