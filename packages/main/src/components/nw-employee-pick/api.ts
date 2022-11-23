// import { request } from '@platform/main'
import { request } from '@platform/main'

export function queryOrg (data: any) {
    return request({
        url: `/main/mdmOrg/list`,
        method: 'post',
        data
    })
}
export function queryUsers (data: any) {
    return request({
        url: `/main/mdmUser/list`,
        method: 'post',
        data
    })
}