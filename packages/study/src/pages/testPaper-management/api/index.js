// api
import { request } from '@platform/main'
// 新建接口
export function create(params) {
  return request({
    url: `/manhour/workHour`,
    method: 'post',
    data: params
  })
}
// 删除接口
export function del(id) {
  return request({
    url: `/study/studySpecialApply/${id}`,
    method: 'delete',
  })
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/manhour/workHour`,
    method: 'put',
    data: params
  })
}
// 查询接口
export function query(data) {
  return request({
    url: `/study/studyExamPaperApply/list`,
    method: 'post',
    data
  })
}

//字典 日志管理中调用
export function dictItemLists(id) {
  return request({
    url: `/dict/dictItem/list?dictCode=${id}`,
    method: 'get',
  })
}
// 查询接口
export function querys(data) {
  return request({
    url: `/study/studyExamPaperApply/lists`,
    method: 'post',
    data
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