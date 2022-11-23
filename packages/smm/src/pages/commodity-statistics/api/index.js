// api
import { request } from '@platform/main'
// 查询树形
export function suppFillCommodityGetList(data) {
    return request({
        url: `/supp/suppFillCommodity/getList`,
        method: 'post',
        data
    })
}


export function suppCommodityItemList(data) {
    return request({
        url: `/supp/suppCommodityItem/list`,
        method: 'post',
        data
    })
}
