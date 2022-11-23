// api
import { request } from '@platform/main'
export function query (params) {
  return request({
      url: `/study/studyExamPaperDef/list`,
      method: 'post',
      data: params
  })
}
export function querys (params) {
  return request({
      url: `/study/studyExamPaperDef/lists`,
      method: 'post',
      data: params
  })
}

export function creat(params) {
  return request({
      url: `/study/studyExamPaperDef`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/study/studyExamPaperDef`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/study/studyExamPaperDef/${id}`,
      method: 'delete',
  })
}
// 根据试卷id查询详情
export function detail (id) {
  return request({
      url: `/study/studyExamPaperDef/${id}`,
      method: 'get',
  })
}
// 根据试卷id查询详情
export function multiDetail (id) {
  return request({
      url: `/study/studyExamPaperDef/listByIds/${id}`,
      method: 'get',
  })
}
// 试卷选择题目
export function paperChooseQuestion (params) {
  return request({
      url: `/study/studyExamPaperDef/paperChooseQuestion`,
      method: 'put',
      data: params
  })
}

// 试卷选择题目
export function paperaddRule (params) {
  return request({
      url: `/study/studyExamPaperDef/addRule`,
      method: 'put',
      data: params
  })
}

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/dict/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}
// 查看随机试卷规则
export function getRule (id) {
  return request({
      url: `/study/studyExamPaperDef/getRule/${id}`,
      method: 'get',
  })
}
// 查看多个题库详情
export function listByIds (id) {
  return request({
      url: `/study/studyExamDatabaseDef/listByIds/${id}`,
      method: 'get',
  })
}


//试卷发布
export function releasePaper (id) {
  return request({
    url: `/study/studyExamPaperDef/releasePaper/${id}`,
    method: 'get',
  })
}