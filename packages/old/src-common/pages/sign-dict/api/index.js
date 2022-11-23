// api
import { request } from '@platform/main'

//字典 日志管理中调用
export function dictItemLists(data) {
    return request({
        url: `/main/dictItem/list?dictCode=${data.code}`,
        method: 'get',
    })
}
export function dictItemPage(params) {
    return request({
        url: `/main/dictItem/page`,
        method: 'post',
        data: params
    })
}

export function creatDictItem(params) {
    return request({
        url: `/main/dictItem`,
        method: 'post',
        data: params
    })
}
export function editDictItem(params) {
    return request({
        url: `/main/dictItem`,
        method: 'put',
        data: params
    })
}
export function delDictItem(id) {
    return request({
        url: `/main/dictItem/${id}`,
        method: 'delete',
    })
}
export function detailCode(code) {
    return request({
        url: `/main/dictType/detailCode/${code}`,
        method: 'get',
    })
}