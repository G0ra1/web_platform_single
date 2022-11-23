import { request } from '@platform/main'
// 查询流程分类
export function query (data = {}) {
  return request({
      url: `/wf/wfprocdeftype/list`,
      method: 'post',
      data
  });
}
// 查询流程不分页分类
export function queryAll (data = {}) {
  return request({
      url: `/wf/wfprocdeftype/lists`,
      method: 'post',
      data
  });
}

//创建流程分类
export function create (data) {
  return request({
      url: `/wf/wfprocdeftype/save`,
      method: 'post',
      data
  });
}

// 修改流程分类
export function modify (data) {
  return request({
      url: `/wf/wfprocdeftype`,
      method: 'put',
      data
  });
}

// 删除流程分类
export function del (id) {
  return request({
      url: `/wf/wfprocdeftype/${id}`,
      method: 'delete'
  });
}