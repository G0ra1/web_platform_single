// api
import { request } from '@platform/main'
export function studyCheckList (params) {
  return request({
      url: `/study/studyUserApply/list`,
      method: 'post',
      data: params
  })
}

export function updateYesEmp (params) {
  return request({
      url: `/study/studyUserApply`,
      method: 'put',
      data: params
  })
}

// 组织机构列表
export function  rightList(params) {
  return request({
      url: `/main/mdmOrg/list`,
      method: 'post',
      data: params
  })
}