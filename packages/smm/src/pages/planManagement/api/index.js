// api
import { request } from '@platform/main'

// 
export function detailForm(id) {
    return request({
        url: `/smm//smmHboilSellPlan/${id}`,
        method: 'get',
    })
}

// 


//字典 
export function dictItemLists(dictCode) {
    return request({
        url: `/main/dictItem/list?dictCode=${dictCode}`,
        method: 'get',
    })
}
export function creat(params) {
    return request({
        url: `/smm/smmHboilSellPlan`,
        method: 'post',
        data: params
    })
}
// 修改 资源
export function edit(params) {
    return request({
        url: `/smm/smmHboilSellPlan`,
        method: 'put',
        data: params
    })
}
// 删除
export function del(id) {
    return request({
        url: `/smm/smmHboilSellPlan/${id}`,
        method: 'delete',
    })
}
