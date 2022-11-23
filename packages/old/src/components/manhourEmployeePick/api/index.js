// api
import { request } from '@platform/main'
// 新建接口
export function create(params) {
  return request({
    url: `/manhour/task`,
    method: 'post',
    data: params
  })
}
// 删除接口
export function del(id) {
  return request({
    url: `/manhour/task/${id}`,
    method: 'delete',
  })
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/manhour/task`,
    method: 'put',
    data: params
  })
}
// 查询接口
export function query(data) {
  return request({
    url: `/manhour/task/list`,
    method: 'post',
    data
  })
}



// 项目查询
export function projectList(data) {
  return request({
    url: `/manhour/project/list`,
    method: 'post',
    data
  })
}
// 通过级别查询任务
export function getUpTask(taskLevel) {
  return request({
    url: `/manhour/task/getUpTask/${taskLevel}`,
    method: 'get',
  })
}

// 获取下级任务
export function getChildTask(parentId) {
  return request({
    url: `/manhour/task/getChildTask/${parentId}`,
    method: 'get',
  })
}


// 组织机构列表
export function rightList(params) {
  return request({
    url: `/main/mdmOrg/list`,
    method: 'post',
    data: params
  })
}
// 通过组织id查询所有岗位
export function allPostList(params) {
  return request({
    url: `/main/mdmPost/org/all`,
    method: 'post',
    data: params
  })
}
// 人员列表
export function empLists(params) {
  return request({
    url: `/main/mdmUser/lists`,
    method: 'post',
    data: params
  })
}
// 批量获取用户信息
export function mdmUserGetByIds(params) {
  return request({
    url: `/main/mdmUser/getByIds`,
    method: "get",
    params,
  });
}

