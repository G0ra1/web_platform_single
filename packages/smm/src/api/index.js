// api
import { request } from '@platform/main'




//字典 
export function dictItemLists(dictCode) {
    return request({
        url: `/main/dictItem/list?dictCode=${dictCode}`,
        method: 'get',
    })
}
//树形字典 
export function treeDict(dictCode) {
    return request({
        url: `/main/dictTree/childList/${dictCode}`,
        method: 'get',
    })
}
// 创建任务
export function createManual(data) {
    return request({
        url: `center/todo/create/manual`,
        method: 'post',
        data
    })
}
// 列表视图
export function todoListView(params) {
    return request({
        url: `center/todo/list/view`,
        method: 'get',
        params
    })
}
// 创建任务
export function todoUpdata(data) {
    return request({
        url: `center/todo/update`,
        method: 'put',
        data
    })
}
// 任务详情
export function todoDetail(id) {
    return request({
        url: `center/todo/detail/${id}`,
        method: 'get',
    })
}
// 热内完成
export function todofinish(id, params) {
    return request({
        url: `center/todo/finish/${id}`,
        method: 'put',
        params
    })
}
export function tododel(id) {
    return request({
        url: `center/todo/del/${id}`,
        method: 'delete',
    })
}


export function commonStationList(data = {}) {
    return request({
        url: `/smm/commonStation/list`,
        method: 'post',
        data
    })
}
export function commomPgtCustomList(data = {}) {
    return request({
        url: `/smm/commomPgtCustom/list`,
        method: 'post',
        data
    })
}
export function commonCustomList(data = {}) {
    return request({
        url: `/smm/commonCustom/list`,
        method: 'post',
        data
    })
}
export function portalContentNews(data = {}) {
    return request({
        url: `/portal/portalContentNews/list`,
        method: 'post',
        data
    })
}
export function portalContentFiles(data = {}) {
    return request({
        url: `/portal/portalContentFiles/list`,
        method: 'post',
        data
    })
}



