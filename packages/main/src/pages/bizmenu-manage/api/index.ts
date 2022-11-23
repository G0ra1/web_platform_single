// api
import { request } from '@platform/main'

// 查询接口
export function query(data: any) {
    return request({
        url: `/main/mdmBizMenu/list`,
        method: 'post',
        data
    })
}

export function queryAll(data: any) {
    return request({
        url: `/main/mdmBizMenu/list`,
        method: 'post',
        data
    })
}

export function create(data: any) {
    return request({
      url: `/main/mdmBizMenu`,
      method: 'post',
      data
    })
}

export function edit(data: any) {
    return request({
      url: `/main/mdmBizMenu`,
      method: 'put',
      data
    })
}
// 编辑
export function del(id: string) {
    return request({
      url: `/main/mdmBizMenu/${id}`,
      method: 'delete'
    })
  }