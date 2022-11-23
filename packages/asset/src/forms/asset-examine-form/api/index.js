// api
import { request } from '@platform/main'
// 新建接口
export function create(params) {
  return request({
    url: `/asset/viewer`,
    method: 'post',
    data: params
  })
}
// 删除接口
export function del(id) {
  return request({
    url: `/asset/viewer/${id}`,
    method: 'delete',
  })
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/asset/viewer`,
    method: 'put',
    data: params
  })
}
// 查询接口
export function query(data) {
  return request({
    url: `/asset/viewer/list`,
    method: 'post',
    data
  })
}

//  获取详情
export function details(id) {
  return request({
    url: `/asset/viewer/${id}`,
    method: 'get',
  })
}

