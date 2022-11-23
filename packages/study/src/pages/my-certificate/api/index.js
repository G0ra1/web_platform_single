// api
import { request } from '@platform/main'
export function query (params) {
  return request({
      url: `/study/studyUser/getCertificate`,
      method: 'post',
      data: params
  })
}
export function querys (params) {
  return request({
      url: `/study/studyCertificateDef/lists`,
      method: 'post',
      data: params
  })
}

export function creat (params) {
  return request({
      url: `/study/studyCertificateDef`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/study/studyCertificateDef`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/study/studyCertificateDef/${id}`,
      method: 'delete',
  })
}

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/dict/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}
// 题目列表
export function studyExamQuestionDeffList (params) {
  return request({
      url: `/study/studyExamQuestionDef/list`,
      method: 'post',
      data: params
  })
}
export function studyExamQuestionDeffLists (params) {
  return request({
      url: `/study/studyExamQuestionDef/lists`,
      method: 'post',
      data: params
  })
}
// 新增题目
export function creatStudyExamQuestionDef (params) {
  return request({
      url: `/study/studyExamQuestionDef`,
      method: 'post',
      data: params
  })
}
// 修改题目
export function editStudyExamQuestionDef (params) {
  return request({
    url: `/study/studyExamQuestionDef`,
    method: 'put',
    data: params
  })
}
// 删除题目
export function delExamQuestion (id) {
  return request({
      url: `/study/studyExamQuestionDef/${id}`,
      method: 'delete',
  })
}