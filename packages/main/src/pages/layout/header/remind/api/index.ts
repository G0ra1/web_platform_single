import { request } from '@platform/main'

export function queryLinkMan (data: any) {
    return request({
        url: `/cts/ctsLinkman/page`,
        method: 'post',
        data: {
            page: {
                current: 1,
                size: 999
            },
            ...data
        }
    })
}


export function queryMsg (data: any) {
    return request({
        url: `/main/msgPage`,
        method: 'post',
        data: {
            page: {
                current: 1,
                size: 999
            },
            ...data
        }
    })
}