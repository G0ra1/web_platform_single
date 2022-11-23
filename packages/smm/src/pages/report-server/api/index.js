// api
import { request } from '@platform/main'
// 资源列表
export function query(data) {
    return request({
        url: `/supp/suppPurchaseProgressLookup/list`,
        method: 'post',
        data
    })
}
