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

// 人员列表
export function empLists(params) {
  return request({
    url: `/main/mdmUser/lists`,
    method: 'post',
    data: params
  })
}

