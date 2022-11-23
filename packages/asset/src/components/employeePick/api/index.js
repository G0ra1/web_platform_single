// api
import { request } from '@platform/main'

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

