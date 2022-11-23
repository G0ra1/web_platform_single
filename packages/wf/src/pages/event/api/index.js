// api
import { request } from '@platform/main'

// 查询流程分类
export function query (data = {}) {
  return request({
      url: `/wf/wfevent/list`,
      method: 'post',
      data
  });
}

// 查询流程分类
export function queryAll (data = {}) {
  return request({
      url: `/wf/wfevent/lists`,
      method: 'post',
      data
  });
}

//创建流程分类
export function create (data) {
  return request({
      url: `/wf/wfevent/save`,
      method: 'post',
      data
  });
}

// 修改流程分类
export function modify (data) {
  return request({
      url: `/wf/wfevent`,
      method: 'put',
      data
  });
}

// 删除流程分类
export function del (id) {
  return request({
      url: `/wf/wfevent/${id}`,
      method: 'delete'
  });
}
// 通过id查询事件管理
export function queryById (id) {
  return request({
      // url: `/button/login?username=${data.username}&password=${data.password}`,
      url: `/wf/wfevent/${id}`,
      method: 'get',
  });
}