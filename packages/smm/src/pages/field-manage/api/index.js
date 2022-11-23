// api
import { request } from '@platform/main'
// 查询树形
export function queryApp(data) {
    return request({
        url: `/main/mdmApp/tree`,
        method: 'post',
        data
    })
}

export function getNewest(data) {
    return request({
        url: `/supp/suppFillCommodity/getNewest`,
        method: 'get',
        data
    })
}

// 资源列表
export function query(data) {
    return request({
        url: `/supp/suppPurchaseProgressLookup/list`,
        method: 'post',
        data
    })
}


// 新建 资源
export function creatApp(params) {
    return request({
        url: `/supp/purchaseProgress`,
        method: 'post',
        data: params
    })
}
// 修改 资源
export function editApp(params) {
    return request({
        url: `/supp/suppPurchaseProgressLookup`,
        method: 'put',
        data: params
    })
}
// 删除
export function del(id) {
    return request({
        url: `/supp/purchaseProgress/${id}`,
        method: 'delete',
    })
}
// 详情
export function details(id) {
    return request({
        url: `/supp/purchaseProgress/${id}`,
        method: 'get',
    })
}


export function suppCommodityItemList(data) {
    return request({
        url: `/supp/suppCommodityItem/list`,
        method: 'post',
        data
    })
}

// 组织机构列表
export function rightList(params) {
    return request({
        url: `/main/mdmOrg/list`,
        method: 'post',
        data: params
    })
}
