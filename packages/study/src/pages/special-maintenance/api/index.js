// api
import { request } from '@platform/main'
// 新建接口
export function create(params) {
  return request({
    url: `/manhour/workHour`,
    method: 'post',
    data: params
  })
}
// 删除接口
export function del(id) {
  return request({
    url: `/study/studySpecialApply/${id}`,
    method: 'delete',
  })
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/manhour/workHour`,
    method: 'put',
    data: params
  })
}
// 查询接口
export function query(data) {
  return request({
    url: `/study/studySpecialApply/pageList`,
    method: 'post',
    data
  })
}

