// api
import { request } from '@platform/main'


//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/main/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}


export function studyteachers (params) {
  return request({
      url: `/study/studyUser/teacher/getPaper`,
      method: 'post',
      data: params
  })
}
// 查详情列表
export function studyteachersDetail (params) {
  return request({
      url: `/study/studyUser/teacher/getPaper/detail`,
      method: 'post',
      data: params
  })
}

// 阅卷
export function studyGetMarking (params) {
  return request({
      url: `/study/studyUser/teacher/getMarking`,
      method: 'post',
      data: params
  })
}


// 阅卷提交
export function studyMarking (params) {
  return request({
      url: `/study/studyUser/teacher/marking`,
      method: 'post',
      data: params
  })
}