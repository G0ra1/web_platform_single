// api
import { request } from '@platform/main'
export function query (params) {
  return request({
      url: `/study/studyExamPaperDef/getPaperList`,
      method: 'post',
      data: params
  })
}

//获取待阅试卷详情
export function markPaperDetail (id) {
  return request({
      url: `/study/studyExamPaperDef/markPaperDetail/${id}`,
      method: 'get',
  })
}


export function savePaper (params) {
  return request({
      url: `/study/studyExamPaperDef/teacherMarking`,
      method: 'put',
      data: params
  })
}

//获取已阅试卷详情
export function markedPaperDetail (id) {
  return request({
      url: `/study/studyExamPaperDef/markedPaperDetail/${id}`,
      method: 'get',
  })
}
