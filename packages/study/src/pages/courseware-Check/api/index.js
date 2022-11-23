// api
import { request } from '@platform/main'
export function studyCheckList (params) {
  return request({
      url: `/study/studyUserLearnApply/pageList `,
      method: 'post',
      data: params
  })
}

export function updateYesEmp (params) {
  return request({
      url: `/study/studyUserLearnApply/dealApply`,
      method: 'put',
      data: params
  })
}

export function detail (id) {
  return request({
      url: `/study/studyUserLearnApply/${id}`,
      method: 'get',
  })
}

