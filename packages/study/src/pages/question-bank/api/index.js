// api
import { request } from '@platform/main'
export function studyExamDatabaseDefList (params) {
  return request({
      url: `/study/studyExamDatabaseDef/list`,
      method: 'post',
      data: params
  })
}
export function studyExamDatabaseDefLists (params) {
  return request({
      url: `/study/studyExamDatabaseDef/lists`,
      method: 'post',
      data: params
  })
}

export function creatStudyExamDatabaseDef (params) {
  return request({
      url: `/study/studyExamDatabaseDef`,
      method: 'post',
      data: params
  })
}
export function editStudyExamDatabaseDef (params) {
  return request({
      url: `/study/studyExamDatabaseDef`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/study/studyExamDatabaseDef/${id}`,
      method: 'delete',
  })
}

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/main/dictItem/list?dictCode=${id}`,
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
// 批量导题
export function creatBatchAddQuestion (params) {
  return request({
      url: `/study/studyExamQuestionDef/batchAddQuestion`,
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