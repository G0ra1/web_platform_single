import { request } from '@platform/main'

// 类型新增
export function typeCreate(data: any) {
    return request({
        url: `/portal/favoritesType`,
        method: 'post',
        data
    })
}
// 类型新增
export function typeEdit(data: any) {
    return request({
        url: `/portal/favoritesType`,
        method: 'put',
        data
    })
}
// 类型详情
export function typeDetails(id: string) {
    return request({
        url: `/portal/favoritesType/${id}`,
        method: 'get',
    })
}
// 类型删除
export function typeDel(id: string) {
    return request({
        url: `/portal/favoritesType/${id}`,
        method: 'delete',
    })
}

// 获取所有收藏类型
export function typeList(data: any) {
    return request({
        url: `/portal/favoritesType/list`,
        method: 'post',
        data: {}
    })
}


// 链接新增
export function create(data: any) {
    return request({
        url: `/portal/favoritesContent`,
        method: 'post',
        data
    })
}
// 链接编辑
export function edit(data: any) {
    return request({
        url: `/portal/favoritesContent`,
        method: 'put',
        data
    })
}
// 链接详情
export function details(id: string) {
    return request({
        url: `/portal/favoritesContent/${id}`,
        method: 'get',
    })
}
// 类型删除
export function del(id: string) {
    return request({
        url: `/portal/favoritesContent/${id}`,
        method: 'delete',
    })
}

// 获取所有收藏
export function list(data: any) {
    return request({
        url: `/portal/favoritesContent/list`,
        method: 'post',
        data: {}
    })
}


