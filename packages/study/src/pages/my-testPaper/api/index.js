// api
import { request } from '@platform/main'
export function query (params) {
  return request({
      url: `/study/studyUser/getPaper`,
      method: 'post',
      data: params
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

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/dict/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}