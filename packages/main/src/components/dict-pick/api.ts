// import { request } from '@platform/main'
import { request, Request } from '@platform/main'

export function dictType(data: any) {
    return new Request(
        `/main/dictType/page`,
        'post',
        data
    ).send()
}
export function dictItemLists(code: string) {
    return new Request(
        `/main/dictItem/list?dictCode=${code}`,
        'get',
    ).send()
}