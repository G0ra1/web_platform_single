// api
import { request } from '@platform/main'


// 
export function create(data) {
  return request({
    url: `/main/mdmCpts`,
    method: 'post',
    data
  })
}


// 编辑
export function edit(data) {
  return request({
    url: `/main/mdmCpts`,
    method: 'put',
    data
  })
}

// 查询
export function queryById(id) {
  return request({
    url: `/main/mdmCpts/${id}`,
    method: 'get'
  })
}