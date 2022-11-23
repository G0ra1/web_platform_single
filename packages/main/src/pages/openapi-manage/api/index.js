// api
import { request } from '@platform/main'
// 查询接口
export function query(data) {
    return request({
        url: `/main/interfaces/list`,
        method: 'post',
        data
    })
}

// 查询树形
export function queryAPP() {
    return request({
        url: `/main/dictItem/list?dictCode=APP_NAME`,
        method: 'get'
    })
    // return request({
    //     url: `/main/mdmApp/tree`,
    //     method: 'post',
    //     data: {}
    // })
}

// 查询详情
export function queryDetail (id) {
    return request({
        url: `/main/interfaces/${id}`,
        method: 'get'
    })
}

// 根据子系统code获取ctl /interfaces/getCtlClazzBySysCode
export function queryCtl (sysCode) {
    return request({
        url: `/main/interfaces/getCtlClazzBySysCode`,
        method: 'get',
        params: {
            sysCode
        }
    })
}

// 获取历史
export function queryHis (data) {
    return request({
        url: `/main/interfaceshis/list`,
        method: 'post',
        data
    })
}
// export function queryById(id) {
//     return request({
//         url: `/mso/msodefType/${id}`,
//         method: 'get'
//     })
// }
