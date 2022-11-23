import { request } from '@platform/main'

export function query(params) {
  return request({
    url: `/study/studyExamPaperDef/list`,
      method: 'post',
      data: params
  })
}

export function detail(id) {
  return request({
      url: `/study/studyExamPaperDef/getPaper/${id}`,
      method: 'get',
  })
}

//  查看详情
export function studyExamPaperDetail(id) {
  return request({
      url: `/study/studyExamPaperDef/${id}`,
      method: 'get',
  })
}

//  查看历史版本
export function hisListFor(id) {
  return request({
      url: `/study/studyExamPaperHis/hisListFor/${id}`,
      method: 'get',
  })
}

//  查看调整情况
export function adjListFor(id) {
  return request({
      url: `/study/studyExamPaperAdj/adjListFor/${id}`,
      method: 'get',
  })
}


// 启用停用接口
export function isEnable(id) {
  return request({
      url: `/study/studyExamPaperDef/isEnable/${id}`,
      method: 'put',
  })
}

// 调整详情
export function studyExamPaperAdjDetail(id) {
  return request({
      url: `/study/studyExamPaperAdj/${id}`,
      method: 'get',
  })
}

// 历史详情
export function studyExamPaperHisDetail(id) {
  return request({
      url: `/study/studyExamPaperHis/${id}`,
      method: 'get',
  })
}

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/dict/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}

 
//试卷台账删除
export function del (id) {
  return request({
      url: `/study/studyExamPaperDef/delete/${id}`,
      method: 'delete',
  })
}

//调整记录删除
export function adjDel (id) {
  return request({
      url: `/study/studyExamPaperAdj/delete/${id}`,
      method: 'delete',
  })
}

 