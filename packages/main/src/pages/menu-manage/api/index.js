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

// 资源列表
export function query(data) {
    return request({
        url: `/main/mdmMenu/treeList`,
        method: 'post',
        data
    })
}


  // 新建 资源
  export function creatApp (params) {
    return request({
        url: `/main/mdmMenu`,
        method: 'post',
        data: params
    })
  }
  // 修改 资源
export function editApp (params) {
    return request({
        url: `/main/mdmMenu`,
        method: 'put',
        data: params
    })
  }
  // 删除
export function del(id) {
    return request({
      url: `/main/mdmMenu/${id}`,
      method: 'delete',
  })
  }
