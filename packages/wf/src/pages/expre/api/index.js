// api
import { request } from '@platform/main'

// 查询流程分类
export function query (data = {}) {
  return request({
      url: `/wf/wfexpre/list`,
      method: 'post',
      data
  });
}

//创建流程分类
export function create (data) {
  return request({
      url: `/wf/wfexpre/save`,
      method: 'post',
      data
  });
}

// 修改流程分类
export function modify (data) {
  return request({
      url: `/wf/wfexpre`,
      method: 'put',
      data
  });
}
// 详情事件管理
export function queryId(id) {
  return request({
      url: `/wf/wfexpre/${id}`,
      method: 'get'
  });
}
// 删除流程分类
export function del (id) {
  return request({
      url: `/wf/wfexpre/${id}`,
      method: 'delete'
  });
}