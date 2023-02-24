// api
import { request } from '@platform/main'

// 查询接口
export function query(data: any) {
    return request({
        url: `/main/mdmCpts/list`,
        method: 'post',
        data
    })
}

export function queryAll(data: any) {
    return request({
        url: `/main/mdmCpts/lists`,
        method: 'post',
        data
    })
}

export function create(data: any) {
    return request({
      url: `/main/mdmCpts`,
      method: 'post',
      data
    })
}

// 编辑
export function del(id: string) {
    return request({
      url: `/main/mdmCpts/${id}`,
      method: 'delete'
    })
}

export function unLinkWf(id: string) {
    return request({
        url: `/main/mdmCpts/clearWfInfoById/${id}`,
        method: 'put'
    })
}